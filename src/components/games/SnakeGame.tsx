import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TILE_SIZE = 20;
const TILE_COUNT = 20;
const CANVAS_SIZE = TILE_SIZE * TILE_COUNT;

interface Position {
  x: number;
  y: number;
}

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("snakeHighScore") || "0");
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameRef = useRef({
    playerX: 10,
    playerY: 10,
    velocityX: 0,
    velocityY: 0,
    trail: [] as Position[],
    tail: 5,
    appleX: 15,
    appleY: 15,
    inputQueue: [] as Position[],
  });

  const resetGame = useCallback(() => {
    const game = gameRef.current;
    game.playerX = 10;
    game.playerY = 10;
    game.velocityX = 0;
    game.velocityY = 0;
    game.trail = [];
    game.tail = 5;
    game.appleX = Math.floor(Math.random() * TILE_COUNT);
    game.appleY = Math.floor(Math.random() * TILE_COUNT);
    game.inputQueue = [];
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const game = gameRef.current;

    // Process input
    if (game.inputQueue.length > 0) {
      const nextMove = game.inputQueue.shift()!;
      game.velocityX = nextMove.x;
      game.velocityY = nextMove.y;
    }

    // Move player
    game.playerX += game.velocityX;
    game.playerY += game.velocityY;

    // Wrap around
    if (game.playerX < 0) game.playerX = TILE_COUNT - 1;
    if (game.playerX > TILE_COUNT - 1) game.playerX = 0;
    if (game.playerY < 0) game.playerY = TILE_COUNT - 1;
    if (game.playerY > TILE_COUNT - 1) game.playerY = 0;

    // Draw background
    ctx.fillStyle = "hsl(220, 30%, 12%)";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = "hsl(220, 30%, 15%)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * TILE_SIZE, 0);
      ctx.lineTo(i * TILE_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * TILE_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * TILE_SIZE);
      ctx.stroke();
    }

    // Check collision and draw snake
    ctx.fillStyle = "hsl(142, 71%, 45%)";
    for (let i = 0; i < game.trail.length; i++) {
      ctx.fillRect(
        game.trail[i].x * TILE_SIZE + 1,
        game.trail[i].y * TILE_SIZE + 1,
        TILE_SIZE - 2,
        TILE_SIZE - 2
      );

      if (game.trail[i].x === game.playerX && game.trail[i].y === game.playerY) {
        if (game.velocityX !== 0 || game.velocityY !== 0) {
          setIsGameOver(true);
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snakeHighScore", score.toString());
          }
        }
      }
    }

    game.trail.push({ x: game.playerX, y: game.playerY });
    while (game.trail.length > game.tail) {
      game.trail.shift();
    }

    // Draw apple
    ctx.fillStyle = "hsl(0, 84%, 60%)";
    ctx.beginPath();
    ctx.arc(
      game.appleX * TILE_SIZE + TILE_SIZE / 2,
      game.appleY * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Check apple collision
    if (game.appleX === game.playerX && game.appleY === game.playerY) {
      game.tail++;
      setScore((s) => s + 1);
      game.appleX = Math.floor(Math.random() * TILE_COUNT);
      game.appleY = Math.floor(Math.random() * TILE_COUNT);
    }
  }, [score, highScore]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(gameLoop, 100);
    return () => clearInterval(interval);
  }, [isPlaying, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying && !isGameOver) return;
      
      if (isGameOver) {
        resetGame();
        return;
      }

      const game = gameRef.current;
      const lastMoveX = game.inputQueue.length > 0 ? game.inputQueue[game.inputQueue.length - 1].x : game.velocityX;
      const lastMoveY = game.inputQueue.length > 0 ? game.inputQueue[game.inputQueue.length - 1].y : game.velocityY;

      let nextX = 0, nextY = 0;
      switch (e.key) {
        case "ArrowLeft": nextX = -1; nextY = 0; break;
        case "ArrowUp": nextX = 0; nextY = -1; e.preventDefault(); break;
        case "ArrowRight": nextX = 1; nextY = 0; break;
        case "ArrowDown": nextX = 0; nextY = 1; e.preventDefault(); break;
        default: return;
      }

      if ((lastMoveX !== 0 && nextX === -lastMoveX) || (lastMoveY !== 0 && nextY === -lastMoveY)) {
        return;
      }

      if (game.inputQueue.length < 2) {
        game.inputQueue.push({ x: nextX, y: nextY });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isGameOver, resetGame]);

  // Draw initial state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "hsl(220, 30%, 12%)";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (isGameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.fillStyle = "white";
      ctx.font = "bold 28px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 10);
      ctx.font = "16px Inter, sans-serif";
      ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 20);
      ctx.fillText("Press any arrow key to restart", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 50);
    } else if (!isPlaying) {
      ctx.fillStyle = "hsl(32, 95%, 55%)";
      ctx.font = "bold 20px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Press Start to Play", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    }
  }, [isGameOver, isPlaying, score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-6 text-lg font-display font-semibold">
        <span className="text-success">Score: {score}</span>
        <span className="text-muted-foreground">High Score: {highScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="rounded-lg border-4 border-muted shadow-xl"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          {isGameOver ? "Play Again" : "Start Game"}
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Use <kbd className="px-2 py-1 bg-muted rounded text-xs">Arrow Keys</kbd> to control
      </p>
    </motion.div>
  );
};

export default SnakeGame;
