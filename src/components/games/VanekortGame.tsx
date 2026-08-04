import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Define the Card Data Structure
interface HabitCard {
  id: string;
  title: string;
  mana: number;
  attack: number;
  defense: number;
  requirement: string;
  quote: string;
  author: string;
  currentProgress: number;
  targetProgress: number;
  unlocked: boolean;
}

export function VanekortGame() {
  const [deck, setDeck] = useState<HabitCard[]>([
    {
      id: 'bodybuilder',
      title: "The Bodybuilder",
      mana: 3,
      attack: 8,
      defense: 9,
      requirement: "Complete 5 workouts in a week",
      quote: "It is a shame for a man to grow old without realizing the full potential of which his body is capable.",
      author: "Socrates",
      currentProgress: 0,
      targetProgress: 5,
      unlocked: false
    }
    // Add more cards here later
  ]);

  const [manaPool, setManaPool] = useState(0);

  // Function to simulate real-world habit completion
  const logHabit = (cardId: string) => {
    setDeck(prevDeck => prevDeck.map(card => {
      if (card.id === cardId && card.currentProgress < card.targetProgress) {
        const newProgress = card.currentProgress + 1;
        const isNowUnlocked = newProgress >= card.targetProgress;
        
        // Reward the player with mana when a card is fully unlocked
        if (isNowUnlocked && !card.unlocked) {
          setManaPool(prev => prev + card.mana);
        }

        return { ...card, currentProgress: newProgress, unlocked: isNowUnlocked };
      }
      return card;
    }));
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Vanekort</h2>
        <p className="text-muted-foreground">Available Mana: {manaPool}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deck.map((card) => (
          <Card key={card.id} className={`w-80 border-2 ${card.unlocked ? 'border-amber-500 shadow-amber-500/50 shadow-lg' : 'border-slate-800 opacity-80'}`}>
            <CardHeader className="pb-2 flex flex-row justify-between items-center bg-slate-900 rounded-t-lg text-white">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                {card.mana}
              </div>
              <CardTitle className="text-lg uppercase tracking-wider">{card.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4 flex flex-col gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm font-medium text-center">
                REQ: {card.requirement}
              </div>

              {/* Habit Tracking UI */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{card.currentProgress} / {card.targetProgress}</span>
                </div>
                <Progress value={(card.currentProgress / card.targetProgress) * 100} className="h-2" />
                <Button 
                  onClick={() => logHabit(card.id)} 
                  disabled={card.unlocked}
                  className="w-full mt-2"
                  variant={card.unlocked ? "secondary" : "default"}
                >
                  {card.unlocked ? "Card Unlocked!" : "Log Habit"}
                </Button>
              </div>

              {/* Card Stats */}
              <div className="flex justify-between mt-2 font-bold text-lg">
                <div className="flex items-center gap-1 text-red-600">
                  <span>⚔️ {card.attack}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <span>🛡️ {card.defense}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t italic text-xs text-center flex-col p-4">
              <p>"{card.quote}"</p>
              <p className="font-semibold mt-1">- {card.author}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
