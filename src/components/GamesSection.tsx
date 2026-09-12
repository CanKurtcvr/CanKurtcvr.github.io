import { useState } from "react";
import { ArrowLeft, CircleDot, Gamepad2, Grid3X3, Target } from "lucide-react";
import BlackjackGame from "./games/BlackjackGame";
import PongGame from "./games/PongGame";
import SnakeGame from "./games/SnakeGame";
import WebShooterGame from "./games/WebShooterGame";
import { VanekortGame } from "./games/VanekortGame";
import { AscensionGame } from "./ascension/AscensionGame";
import { Button } from "@/components/ui/button";
import { Sparkles, Compass } from "lucide-react";

const games = [
  { id: "ascension-cards", title: "Ascension Cards", description: "Turn daily habits into collectible cards, quests, and character progress.", icon: Gamepad2, tone: "from-amber-500/20 to-indigo-500/20" },
  { id: "blackjack", title: "Blackjack", description: "Test your luck and judgment against the dealer.", icon: CircleDot, tone: "from-emerald-500/20 to-teal-500/20" },
  { id: "pong", title: "Pong", description: "A focused arcade duel against the machine.", icon: Target, tone: "from-cyan-500/20 to-blue-500/20" },
  { id: "snake", title: "Snake", description: "Grow carefully, move deliberately, stay alive.", icon: Grid3X3, tone: "from-lime-500/20 to-green-500/20" },
  { id: "web-shooter", title: "Superhero Hand Powers", description: "Choose Spider-Man or Wolverine, then use your camera-powered ability.", icon: Gamepad2, tone: "from-rose-500/20 to-purple-500/20" },
] as const;

interface GamesSectionProps {
  selectedGame?: string | null;
  onSelectGame?: (gameId: string | null) => void;
}

export default function GamesSection({ selectedGame: controlledGame, onSelectGame }: GamesSectionProps = {}) {
  const [internalGame, setInternalGame] = useState<string | null>(null);
  const [ascensionSubView, setAscensionSubView] = useState<"cards" | "world">("cards");
  const selectedGame = controlledGame !== undefined ? controlledGame : internalGame;
  const setSelectedGame = (id: string | null) => {
    if (onSelectGame) {
      onSelectGame(id);
    } else {
      setInternalGame(id);
    }
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "ascension-cards":
        return (
          <div className="space-y-6">
            <div className="flex justify-center items-center gap-2 bg-muted/60 p-1.5 rounded-full max-w-sm mx-auto border border-border/80 shadow-xs">
              <Button
                variant={ascensionSubView === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setAscensionSubView("cards")}
                className="flex-1 rounded-full text-xs sm:text-sm font-semibold gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>RPG Vanekort</span>
              </Button>
              <Button
                variant={ascensionSubView === "world" ? "default" : "ghost"}
                size="sm"
                onClick={() => setAscensionSubView("world")}
                className="flex-1 rounded-full text-xs sm:text-sm font-semibold gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-sky-500" />
                <span>3D Flight World</span>
              </Button>
            </div>

            {ascensionSubView === "cards" ? <VanekortGame /> : <AscensionGame />}
          </div>
        );
      case "blackjack": return <BlackjackGame />;
      case "pong": return <PongGame />;
      case "snake": return <SnakeGame />;
      case "web-shooter": return <WebShooterGame />;
      default: return null;
    }
  };

  if (selectedGame) {
    const game = games.find((item) => item.id === selectedGame);
    return (
      <section id="games" className="py-12">
        <div className="container mx-auto px-4">
          <button
            type="button"
            onClick={() => setSelectedGame(null)}
            className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to games
          </button>
          <h2 className="mb-2 text-3xl font-bold text-center">{game?.title}</h2>
          <p className="mb-8 text-center text-muted-foreground">{game?.description}</p>
          {renderGame()}
        </div>
      </section>
    );
  }

  return (
    <section id="games" className="py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Gamepad2 className="h-7 w-7" />
          </div>
          <h2 className="text-4xl font-bold">Choose your game</h2>
          <p className="mt-3 text-muted-foreground">
            Pick a short challenge or enter Ascension Cards for a slower, more reflective journey.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map(({ id, title, description, icon: Icon, tone }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedGame(id)}
              className={`group rounded-2xl border border-border bg-gradient-to-br ${tone} p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <Icon className="mb-8 h-8 w-8 text-foreground transition group-hover:scale-110" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              <span className="mt-6 inline-block text-sm font-semibold text-primary">Play now →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
