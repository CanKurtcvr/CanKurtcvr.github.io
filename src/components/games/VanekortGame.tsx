import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, CheckCircle, Zap, Shield, Trophy, Star, ImageIcon, X } from "lucide-react";

// De 9 RPG-inspirerede vanekort, der matcher dine billedfiler
const initialHabits = [
  {
    id: "1",
    title: "The Bodybuilder",
    description: "Krav: Gennemfør ugens planlagte styrketræninger og hold kroppen i gang.",
    quote: "Det er en skam for et menneske at blive gammelt uden at indse det fulde potentiale, dets krop er i stand til.",
    quoteAuthor: "Sokrates",
    imageUrl: "/cards/TheBodybuilder.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "2",
    title: "The Philosopher",
    description: "Krav: Brug mindst 30 minutter dagligt på at læse en bog eller lytte til en lærerig podcast.",
    quote: "Jeg har intet særligt talent. Jeg er kun lidenskabeligt nysgerrig.",
    quoteAuthor: "Albert Einstein",
    imageUrl: "/cards/ThePhilosopher.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "3",
    title: "The Meditator",
    description: "Krav: Tag 10 minutter til meditation, mindfulness eller dyb refleksion dagligt.",
    quote: "Et stille sind er som blikstille vand, der afspejler alt omkring sig.",
    quoteAuthor: "Japansk Zen-ordsprog",
    imageUrl: "/cards/TheMeditator.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "4",
    title: "The Masterchef",
    description: "Krav: Tilbered et sundt og nærende måltid fra bunden af friske råvarer.",
    quote: "Lad mad være din medicin.",
    quoteAuthor: "Hippokrates",
    imageUrl: "/cards/TheMasterchef.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "5",
    title: "The Runner",
    description: "Krav: Få pulsen op eller gå mindst 10.000 skridt i løbet af dagen.",
    quote: "Smerte er uundgåeligt. Lidelse er valgfrit.",
    quoteAuthor: "Haruki Murakami",
    imageUrl: "/cards/TheRunner.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "6",
    title: "The Musician",
    description: "Krav: Brug tid på at øve et instrument, et sprog eller en anden kreativ hobby.",
    quote: "Musikken ligger ikke i noderne, men i stilheden imellem dem.",
    quoteAuthor: "Wolfgang Amadeus Mozart",
    imageUrl: "/cards/TheMusician.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "8",
    title: "The Philanthropist",
    description: "Krav: Gør en god gerning, hjælp en anden, eller udfør frivilligt arbejde.",
    quote: "Find dig selv ved at tjene andre.",
    quoteAuthor: "Mahatma Gandhi",
    imageUrl: "/cards/ThePhilanthropist.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "9",
    title: "The Advisor",
    description: "Krav: Track dagens forbrug systematisk eller tag et bevidst valg om at spare op.",
    quote: "Spar op før du bruger.",
    quoteAuthor: "Warren Buffett",
    imageUrl: "/cards/TheAdvisor.png",
    streak: 0,
    lastCompleted: null
  },
  {
    id: "10",
    title: "The Strategist",
    description: "Krav: Brug 5 minutter om aftenen på at planlægge morgendagens vigtigste opgaver.",
    quote: "Der er intet umuligt for den, der vil prøve.",
    quoteAuthor: "Alexander den Store",
    imageUrl: "/cards/TheStrategist.png",
    streak: 0,
    lastCompleted: null
  }
];

const getToday = () => new Date().toISOString().split('T')[0];
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export function VanekortGame() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("vanekort-data");
    if (saved) return JSON.parse(saved);
    return initialHabits;
  });

  // Tilføjet state til at holde styr på det billede, der skal poppe op
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("vanekort-data", JSON.stringify(habits));
  }, [habits]);

  const getRarityInfo = (streak: number) => {
    if (streak >= 90) return { label: "Legendary", color: "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600", icon: <Star className="h-4 w-4" /> };
    if (streak >= 30) return { label: "Epic", color: "border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-600", icon: <Trophy className="h-4 w-4" /> };
    if (streak >= 7) return { label: "Rare", color: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-600", icon: <Shield className="h-4 w-4" /> };
    return { label: "Common", color: "border-slate-300 bg-slate-50 dark:bg-slate-800 text-slate-500", icon: <CheckCircle className="h-4 w-4" /> };
  };

  const handleComplete = (id: string) => {
    setHabits((prev: any[]) => prev.map(habit => {
      if (habit.id === id) {
        const today = getToday();
        if (habit.lastCompleted === today) return habit;

        const yesterday = getYesterday();
        const isStreakAlive = habit.lastCompleted === yesterday || habit.lastCompleted === today;
        const newStreak = isStreakAlive ? habit.streak + 1 : 1;

        return { ...habit, streak: newStreak, lastCompleted: today };
      }
      return habit;
    }));
  };

  const addTenDays = (id: string) => {
    setHabits((prev: any[]) => prev.map(habit => {
      if (habit.id === id) {
        return { ...habit, streak: habit.streak + 10, lastCompleted: getToday() };
      }
      return habit;
    }));
  };

  const resetAll = () => {
    setHabits(initialHabits);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="text-yellow-500" /> Daglig Quest Log
          </h2>
          <p className="text-muted-foreground mt-2">
            Kortene opgraderes over tid: Common ➔ Rare (7 dage) ➔ Epic (30 dage) ➔ Legendary (90 dage). Klik på billederne for at se dem tæt på.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetAll} className="text-xs">
          Nulstil Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {habits.map(habit => {
          const isDoneToday = habit.lastCompleted === getToday();
          const rarity = getRarityInfo(habit.streak);

          return (
            <Card key={habit.id} className={`flex flex-col transition-all duration-300 border-2 overflow-hidden ${rarity.color} ${isDoneToday ? 'opacity-75 scale-[0.98]' : 'hover:shadow-lg'}`}>
              <CardHeader className="pb-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="flex items-center gap-1 font-semibold">
                    {rarity.icon} {rarity.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md">
                    <Flame className="h-4 w-4" /> {habit.streak}
                  </div>
                </div>
                
                {/* Opdateret Billede med aspect-[2/3] og knap til popup */}
                <div 
                  className="w-full aspect-[2/3] bg-slate-900 rounded-md mb-4 overflow-hidden border border-slate-300 dark:border-slate-700 relative flex items-center justify-center cursor-pointer group"
                  onClick={() => habit.imageUrl && setSelectedImage(habit.imageUrl)}
                >
                  {habit.imageUrl ? (
                    <img 
                      src={habit.imageUrl} 
                      alt={habit.title} 
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('fallback-visible');
                      }}
                    />
                  ) : null}
                  
                  {/* Et lille ikon der viser at man kan klikke */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="bg-black/60 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold backdrop-blur-sm">
                      Forstør
                    </div>
                  </div>

                  <div className="fallback-text flex flex-col items-center justify-center text-slate-400 absolute z-[-1]">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-xs font-medium">Billede mangler</span>
                  </div>
                </div>

                <CardTitle className="text-xl mb-1">{habit.title}</CardTitle>
                <CardDescription className="text-sm font-medium">
                  {habit.description}
                </CardDescription>

                <div className="mt-auto pt-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-md border-l-4 border-orange-400 dark:border-orange-500">
                    <p className="text-xs italic text-slate-700 dark:text-slate-300">"{habit.quote}"</p>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">— {habit.quoteAuthor}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 flex gap-2 mt-auto">
                <Button 
                  onClick={() => handleComplete(habit.id)} 
                  disabled={isDoneToday}
                  className="w-full flex-1"
                  variant={isDoneToday ? "secondary" : "default"}
                >
                  {isDoneToday ? "Klaret for i dag!" : "Fuldfør Quest"}
                </Button>
                
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

      {/* Fullscreen Image Modal / Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl w-full flex justify-center">
            <img 
              src={selectedImage} 
              alt="Kort forstørret" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
            <button 
              className="absolute top-2 right-2 md:-top-4 md:-right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
