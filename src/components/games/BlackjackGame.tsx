import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  value: string;
  suit: string;
  weight: number;
  color: "red" | "black";
}

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const value of VALUES) {
    for (const suit of SUITS) {
      let weight = parseInt(value);
      if (["J", "Q", "K"].includes(value)) weight = 10;
      if (value === "A") weight = 11;
      const color = suit === "♥" || suit === "♦" ? "red" : "black";
      deck.push({ value, suit, weight, color });
    }
  }
  return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getPoints = (hand: Card[]): number => {
  let points = hand.reduce((sum, card) => sum + card.weight, 0);
  let aces = hand.filter((card) => card.value === "A").length;
  while (points > 21 && aces > 0) {
    points -= 10;
    aces--;
  }
  return points;
};

const CardComponent = ({ card, hidden = false }: { card: Card; hidden?: boolean }) => (
  <motion.div
    initial={{ scale: 0.8, rotateY: 180 }}
    animate={{ scale: 1, rotateY: 0 }}
    className={`w-14 h-20 rounded-lg flex flex-col items-center justify-center font-bold shadow-md ${
      hidden
        ? "bg-header text-header-foreground border-2 border-accent"
        : "bg-card border border-border"
    } ${!hidden && card.color === "red" ? "text-destructive" : "text-foreground"}`}
  >
    {hidden ? (
      <span className="text-2xl">?</span>
    ) : (
      <>
        <span className="text-lg">{card.value}</span>
        <span className="text-xl">{card.suit}</span>
      </>
    )}
  </motion.div>
);

const BlackjackGame = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [message, setMessage] = useState("Press 'Deal' to start");
  const [showDealerCards, setShowDealerCards] = useState(false);

  const startGame = useCallback(() => {
    const newDeck = shuffleDeck(createDeck());
    const pHand = [newDeck.pop()!, newDeck.pop()!];
    const dHand = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setGameState("playing");
    setShowDealerCards(false);
    setMessage("Hit or Stand?");

    if (getPoints(pHand) === 21) {
      setMessage("Blackjack! You win! 🎉");
      setGameState("ended");
      setShowDealerCards(true);
    }
  }, []);

  const hit = useCallback(() => {
    if (gameState !== "playing" || deck.length === 0) return;

    const newCard = deck.pop()!;
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    setDeck([...deck]);

    if (getPoints(newHand) > 21) {
      setMessage("Bust! Dealer wins 😢");
      setGameState("ended");
      setShowDealerCards(true);
    }
  }, [gameState, deck, playerHand]);

  const stand = useCallback(() => {
    if (gameState !== "playing") return;

    let currentDeck = [...deck];
    let currentDealerHand = [...dealerHand];

    while (getPoints(currentDealerHand) < 17 && currentDeck.length > 0) {
      currentDealerHand.push(currentDeck.pop()!);
    }

    setDealerHand(currentDealerHand);
    setDeck(currentDeck);
    setShowDealerCards(true);
    setGameState("ended");

    const dealerScore = getPoints(currentDealerHand);
    const playerScore = getPoints(playerHand);

    if (dealerScore > 21) {
      setMessage("Dealer busts! You win! 🎉");
    } else if (playerScore > dealerScore) {
      setMessage("You win! 🎉");
    } else if (dealerScore > playerScore) {
      setMessage("Dealer wins 😢");
    } else {
      setMessage("Push! It's a tie 🤝");
    }
  }, [gameState, deck, dealerHand, playerHand]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6"
    >
      {/* Table */}
      <div className="w-full max-w-md bg-success/90 rounded-2xl p-6 border-4 border-success shadow-xl">
        {/* Dealer */}
        <div className="mb-6">
          <p className="text-accent-foreground/80 text-sm mb-2">Dealer</p>
          <div className="flex gap-2 min-h-[80px] items-center">
            <AnimatePresence>
              {dealerHand.map((card, i) => (
                <CardComponent
                  key={`dealer-${i}`}
                  card={card}
                  hidden={i === 1 && !showDealerCards}
                />
              ))}
            </AnimatePresence>
          </div>
          <p className="text-accent-foreground/60 text-sm mt-2">
            Score: {showDealerCards ? getPoints(dealerHand) : `${dealerHand[0]?.weight || 0} + ?`}
          </p>
        </div>

        <div className="border-t border-accent-foreground/20 my-4" />

        {/* Player */}
        <div>
          <p className="text-accent-foreground/80 text-sm mb-2">You</p>
          <div className="flex gap-2 min-h-[80px] items-center">
            <AnimatePresence>
              {playerHand.map((card, i) => (
                <CardComponent key={`player-${i}`} card={card} />
              ))}
            </AnimatePresence>
          </div>
          <p className="text-accent-foreground/60 text-sm mt-2">
            Score: {getPoints(playerHand)}
          </p>
        </div>

        {/* Message */}
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-accent-foreground font-display font-bold text-lg mt-4"
        >
          {message}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={startGame}
          disabled={gameState === "playing"}
          className="px-6 py-2 bg-weather-warm text-foreground rounded-lg font-medium hover:bg-weather-warm/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Deal
        </button>
        <button
          onClick={hit}
          disabled={gameState !== "playing"}
          className="px-6 py-2 bg-weather-cool text-accent-foreground rounded-lg font-medium hover:bg-weather-cool/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hit
        </button>
        <button
          onClick={stand}
          disabled={gameState !== "playing"}
          className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Stand
        </button>
      </div>
    </motion.div>
  );
};

export default BlackjackGame;
