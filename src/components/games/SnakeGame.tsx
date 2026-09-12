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

  const handleDirection = useCallback((nextX: number, nextY: number) => {
    if (!isPlaying && !isGameOver) {
      resetGame();
      return;
    }
    if (isGameOver) {
      resetGame();
      return;
    }

    const game = gameRef.current;
    const lastMoveX = game.inputQueue.length > 0 ? game.inputQueue[game.inputQueue.length - 1].x : game.velocityX;
    const lastMoveY = game.inputQueue.length > 0 ? game.inputQueue[game.inputQueue.length - 1].y : game.velocityY;

    if ((lastMoveX !== 0 && nextX === -lastMoveX) || (lastMoveY !== 0 && nextY === -lastMoveY)) {
      return;
    }

    if (game.inputQueue.length < 2) {
      game.inputQueue.push({ x: nextX, y: nextY });
    }
  }, [isPlaying, isGameOver, resetGame]);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 20) {
      if (absX > absY) {
        handleDirection(dx > 0 ? 1 : -1, 0);
      } else {
        handleDirection(0, dy > 0 ? 1 : -1);
      }
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying && !isGameOver) return;
      
      if (isGameOver) {
        resetGame();
        return;
      }

      switch (e.key) {
        case "ArrowLeft": handleDirection(-1, 0); break;
        case "ArrowUp": handleDirection(0, -1); e.preventDefault(); break;
        case "ArrowRight": handleDirection(1, 0); break;
        case "ArrowDown": handleDirection(0, 1); e.preventDefault(); break;
        default: return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isGameOver, resetGame, handleDirection]);

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
      ctx.fillText("Tryk på en piletast for at genstarte", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 50);
    } else if (!isPlaying) {
      ctx.fillStyle = "hsl(32, 95%, 55%)";
      ctx.font = "bold 20px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Tryk på Start for at spille", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    }
  }, [isGameOver, isPlaying, score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-between w-full px-2 text-base md:text-lg font-display font-semibold">
        <span className="text-emerald-500 font-bold">Point: {score}</span>
        <span className="text-muted-foreground">Bedste score: {highScore}</span>
      </div>

      <div className="relative w-full flex justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-xl border-4 border-border shadow-xl max-w-full h-auto touch-none bg-slate-950"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-sm"
        >
          {isGameOver ? "Spil igen" : isPlaying ? "Genstart" : "Start Spil"}
        </button>
      </div>

      {/* Touch D-Pad for mobile */}
      <div className="flex flex-col items-center gap-1.5 pt-2 select-none sm:hidden">
        <button
          type="button"
          onClick={() => handleDirection(0, -1)}
          className="w-14 h-12 rounded-lg bg-card border border-border flex items-center justify-center active:bg-accent active:text-accent-foreground text-foreground shadow-xs"
          aria-label="Op"
        >
          ▲
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleDirection(-1, 0)}
            className="w-14 h-12 rounded-lg bg-card border border-border flex items-center justify-center active:bg-accent active:text-accent-foreground text-foreground shadow-xs"
            aria-label="Venstre"
          >
            ◀
          </button>
          <div className="w-14 h-12 rounded-lg border border-dashed border-border/60 flex items-center justify-center text-xs text-muted-foreground font-mono">
            D-Pad
          </div>
          <button
            type="button"
            onClick={() => handleDirection(1, 0)}
            className="w-14 h-12 rounded-lg bg-card border border-border flex items-center justify-center active:bg-accent active:text-accent-foreground text-foreground shadow-xs"
            aria-label="Højre"
          >
            ▶
          </button>
        </div>
        <button
          type="button"
          onClick={() => handleDirection(0, 1)}
          className="w-14 h-12 rounded-lg bg-card border border-border flex items-center justify-center active:bg-accent active:text-accent-foreground text-foreground shadow-xs"
          aria-label="Ned"
        >
          ▼
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Styr med <kbd className="px-1.5 py-0.5 bg-muted rounded text-[11px] font-mono">Piletaster</kbd> eller swipe / D-Pad på mobil
      </p>
    </motion.div>
  );
};

export default SnakeGame;
