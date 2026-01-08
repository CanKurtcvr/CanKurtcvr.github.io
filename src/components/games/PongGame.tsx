import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const PADDLE_HEIGHT = 80;
const PADDLE_THICKNESS = 10;
const BALL_RADIUS = 8;

const PongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameRef = useRef({
    ballX: CANVAS_WIDTH / 2,
    ballY: CANVAS_HEIGHT / 2,
    ballSpeedX: 5,
    ballSpeedY: 2,
    paddle1Y: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2,
    paddle2Y: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2,
    upPressed: false,
    downPressed: false,
  });

  const ballReset = useCallback(() => {
    const game = gameRef.current;
    game.ballX = CANVAS_WIDTH / 2;
    game.ballY = CANVAS_HEIGHT / 2;
    game.ballSpeedX = -game.ballSpeedX;
    game.ballSpeedY = 2;
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const game = gameRef.current;

    // Player movement
    if (game.upPressed) game.paddle1Y -= 8;
    if (game.downPressed) game.paddle1Y += 8;

    // Keep player paddle in bounds
    if (game.paddle1Y < 0) game.paddle1Y = 0;
    if (game.paddle1Y > CANVAS_HEIGHT - PADDLE_HEIGHT) game.paddle1Y = CANVAS_HEIGHT - PADDLE_HEIGHT;

    // Computer AI
    const paddle2Center = game.paddle2Y + PADDLE_HEIGHT / 2;
    const computerSpeed = 3;
    if (paddle2Center < game.ballY - 35) {
      game.paddle2Y += computerSpeed;
    } else if (paddle2Center > game.ballY + 35) {
      game.paddle2Y -= computerSpeed;
    }

    // Keep computer paddle in bounds
    if (game.paddle2Y < 0) game.paddle2Y = 0;
    if (game.paddle2Y > CANVAS_HEIGHT - PADDLE_HEIGHT) game.paddle2Y = CANVAS_HEIGHT - PADDLE_HEIGHT;

    // Ball movement
    game.ballX += game.ballSpeedX;
    game.ballY += game.ballSpeedY;

    // Top/bottom bounce
    if (game.ballY < BALL_RADIUS || game.ballY > CANVAS_HEIGHT - BALL_RADIUS) {
      game.ballSpeedY = -game.ballSpeedY;
    }

    // Left side (player)
    if (game.ballX < PADDLE_THICKNESS + BALL_RADIUS) {
      if (game.ballY > game.paddle1Y && game.ballY < game.paddle1Y + PADDLE_HEIGHT) {
        game.ballSpeedX = -game.ballSpeedX;
        const deltaY = game.ballY - (game.paddle1Y + PADDLE_HEIGHT / 2);
        game.ballSpeedY = deltaY * 0.35;
      } else if (game.ballX < 0) {
        setComputerScore((s) => s + 1);
        ballReset();
      }
    }

    // Right side (computer)
    if (game.ballX > CANVAS_WIDTH - PADDLE_THICKNESS - BALL_RADIUS) {
      if (game.ballY > game.paddle2Y && game.ballY < game.paddle2Y + PADDLE_HEIGHT) {
        game.ballSpeedX = -game.ballSpeedX;
        const deltaY = game.ballY - (game.paddle2Y + PADDLE_HEIGHT / 2);
        game.ballSpeedY = deltaY * 0.35;
      } else if (game.ballX > CANVAS_WIDTH) {
        setPlayerScore((s) => s + 1);
        ballReset();
      }
    }

    // Draw
    ctx.fillStyle = "hsl(220, 30%, 12%)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Net
    ctx.strokeStyle = "hsl(220, 30%, 25%)";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player paddle
    ctx.fillStyle = "hsl(207, 90%, 54%)";
    ctx.fillRect(0, game.paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // Computer paddle
    ctx.fillStyle = "hsl(0, 84%, 60%)";
    ctx.fillRect(CANVAS_WIDTH - PADDLE_THICKNESS, game.paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // Ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(game.ballX, game.ballY, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }, [ballReset]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(gameLoop, 1000 / 60);
    return () => clearInterval(interval);
  }, [isPlaying, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        gameRef.current.upPressed = true;
        e.preventDefault();
      }
      if (e.key === "ArrowDown") {
        gameRef.current.downPressed = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") gameRef.current.upPressed = false;
      if (e.key === "ArrowDown") gameRef.current.downPressed = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPlaying) return;
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      gameRef.current.paddle1Y = mouseY - PADDLE_HEIGHT / 2;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [isPlaying]);

  const startGame = () => {
    const game = gameRef.current;
    game.ballX = CANVAS_WIDTH / 2;
    game.ballY = CANVAS_HEIGHT / 2;
    game.ballSpeedX = 5;
    game.ballSpeedY = 2;
    game.paddle1Y = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    game.paddle2Y = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    setPlayerScore(0);
    setComputerScore(0);
    setIsPlaying(true);
  };

  // Draw initial state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "hsl(220, 30%, 12%)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (!isPlaying) {
      ctx.fillStyle = "hsl(32, 95%, 55%)";
      ctx.font = "bold 20px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Press Start to Play", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-8 text-lg font-display font-semibold">
        <span className="text-weather-cool">Player: {playerScore}</span>
        <span className="text-destructive">Computer: {computerScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-lg border-4 border-muted shadow-xl cursor-none"
      />

      <button
        onClick={startGame}
        className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
      >
        {isPlaying ? "Restart" : "Start Game"}
      </button>

      <p className="text-sm text-muted-foreground">
        Control with <kbd className="px-2 py-1 bg-muted rounded text-xs">Mouse</kbd> or{" "}
        <kbd className="px-2 py-1 bg-muted rounded text-xs">↑</kbd>{" "}
        <kbd className="px-2 py-1 bg-muted rounded text-xs">↓</kbd>
      </p>
    </motion.div>
  );
};

export default PongGame;
