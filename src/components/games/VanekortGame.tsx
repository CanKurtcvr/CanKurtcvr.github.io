import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, CheckCircle, Zap, Shield, Trophy, Star } from "lucide-react";

// De 10 eksempelkort
const initialHabits = [
  { id: "1", title: "Klassisk Tænkning", description: "Læs 10 minutters historie, filosofi eller personlig udvikling.", streak: 0, lastCompleted: null },
  { id: "2", title: "Jern & Vilje", description: "Gennemfør dagens styrketræning og hold de 105 kg ved lige.", streak: 0, lastCompleted: null },
  { id: "3", title: "Kode Kata", description: "Brug 30 minutter på at bygge noget i React eller opsæt et n8n workflow.", streak: 0, lastCompleted: null },
  { id: "4", title: "RUC Pensum", description: "Læs op på materialet til Kandidaten i Digital Transformation.", streak: 0, lastCompleted: null },
  { id: "5", title: "Strategisk Sejr", description: "Vind en match i League of Legends, Hearthstone eller WoW.", streak: 0, lastCompleted: null },
  { id: "6", title: "Omsorgs-refleksion", description: "Tag et øjeblik til at reflektere over en god interaktion fra plejehjemmet eller Forsorgshjemmet Absalon.", streak: 0, lastCompleted: null },
  { id: "7", title: 'Tolkens Skarphed', description: "Hold sprogøret skarpt: Læs eller lyt til en kompleks engelsk tekst.", streak: 0, lastCompleted: null },
  { id: "8", title: "Wolt Hustle", description: "Tag en aktiv kurer-vagt i byen.", streak: 0, lastCompleted: null },
  { id: "9", title: "Forberedelse til Red Barnet", description: "Planlæg materialet til den næste lektiehjælps-session.", streak: 0, lastCompleted: null },
  { id: "10", title: "Mester-systemet", description: "Gennemgå morgendagens rutine, ligesom Alexander den Store ville have planlagt sit næste træk.", streak: 0, lastCompleted: null }
];

// Hjælpefunktioner til dato-tjek
const getToday = () => new Date().toISOString().split('T')[0];
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export default function Vanekort() {
  // Hent fra localStorage eller brug start-kortene
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("vanekort-data");
    if (saved) return JSON.parse(saved);
    return initialHabits;
  });

  // Gem til localStorage hver gang state ændrer sig
  useEffect(() => {
    localStorage.setItem("vanekort-data", JSON.stringify(habits));
  }, [habits]);

  // Logikken for kortenes sjældenhed
  const getRarityInfo = (streak: number) => {
    if (streak >= 90) return { label: "Legendary", color: "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600", icon: <Star className="h-4 w-4" /> };
    if (streak >= 30) return { label: "Epic", color: "border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-600", icon: <Trophy className="h-4 w-4" /> };
    if (streak >= 7) return { label: "Rare", color: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-600", icon: <Shield className="h-4 w-4" /> };
    return { label: "Common", color: "border-slate-300 bg-slate-50 dark:bg-slate-800 text-slate-500", icon: <CheckCircle className="h-4 w-4" /> };
  };

  const handleComplete = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const today = getToday();
        if (habit.lastCompleted === today) return habit; // Allerede klaret i dag

        const yesterday = getYesterday();
        // Hvis man glemmer en dag (og det hverken er i går eller i dag man sidst trykkede), nulstilles streak'en
        const isStreakAlive = habit.lastCompleted === yesterday || habit.lastCompleted === today;
        const newStreak = isStreakAlive ? habit.streak + 1 : 1;

        return { ...habit, streak: newStreak, lastCompleted: today };
      }
      return habit;
    }));
  };

  // Cheat-funktion så du kan teste farveskiftet!
  const addTenDays = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        return { ...habit, streak: habit.streak + 10, lastCompleted: getToday() };
      }
      return habit;
    }));
  };

  // Nulstil alt for at starte forfra
  const resetAll = () => {
    setHabits(initialHabits);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="text-yellow-500" /> Daglig Quest Log
          </h2>
          <p className="text-muted-foreground mt-2">
            Kortene opgraderes over tid: Common ➔ Rare (7 dage) ➔ Epic (30 dage) ➔ Legendary (90 dage).
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetAll} className="text-xs">
          Nulstil Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map(habit => {
          const isDoneToday = habit.lastCompleted === getToday();
          const rarity = getRarityInfo(habit.streak);

          return (
            <Card key={habit.id} className={`transition-all duration-300 border-2 ${rarity.color} ${isDoneToday ? 'opacity-75 scale-[0.98]' : 'hover:shadow-lg'}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="flex items-center gap-1 font-semibold">
                    {rarity.icon} {rarity.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md">
                    <Flame className="h-4 w-4" /> {habit.streak}
                  </div>
                </div>
                <CardTitle className="text-xl">{habit.title}</CardTitle>
                <CardDescription className="text-sm font-medium">
                  {habit.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex gap-2">
                <Button 
                  onClick={() => handleComplete(habit.id)} 
                  disabled={isDoneToday}
                  className="w-full flex-1"
                  variant={isDoneToday ? "secondary" : "default"}
                >
                  {isDoneToday ? "Klaret for i dag!" : "Fuldfør Quest"}
                </Button>
                
                {/* DEV KNAP: Klik på denne for lynhurtigt at give kortet +10 dage og se det ændre farve */}
                <Button 
                  onClick={() => addTenDays(habit.id)} 
                  variant="outline"
                  title="Dev cheat: +10 dage"
                  className="px-3"
                >
                  +10
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
