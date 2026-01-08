import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "./games/SnakeGame";
import PongGame from "./games/PongGame";
import BlackjackGame from "./games/BlackjackGame";

type GameType = "snake" | "pong" | "blackjack";

const games = [
  { id: "snake" as GameType, label: "🐍 Snake", emoji: "🐍" },
  { id: "pong" as GameType, label: "🏓 Pong", emoji: "🏓" },
  { id: "blackjack" as GameType, label: "🃏 Blackjack", emoji: "🃏" },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Pause & Play</h2>
        <p className="text-sm text-muted-foreground">Take a break with some classic games</p>
      </div>

      {/* Game Selection */}
      <div className="flex flex-wrap gap-3">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(activeGame === game.id ? null : game.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeGame === game.id
                ? "bg-accent text-accent-foreground shadow-lg scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {game.label}
          </button>
        ))}
      </div>

      {/* Game Area */}
      <AnimatePresence mode="wait">
        {activeGame && (
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <h3 className="text-xl font-display font-bold text-center mb-6 text-foreground">
              {games.find((g) => g.id === activeGame)?.label}
            </h3>
            
            {activeGame === "snake" && <SnakeGame />}
            {activeGame === "pong" && <PongGame />}
            {activeGame === "blackjack" && <BlackjackGame />}
          </motion.div>
        )}
      </AnimatePresence>

      {!activeGame && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-4">🎮</p>
          <p>Select a game above to start playing</p>
        </div>
      )}
    </motion.div>
  );
};

export default GamesSection;
