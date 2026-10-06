import { useState } from "react";
import { Shield, Sparkles, Hand, ArrowLeft } from "lucide-react";

type Hero = "spiderman" | "wolverine";

export default function WebShooterGame() {
  const [hero, setHero] = useState<Hero | null>(null);

  if (!hero) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 text-slate-100 shadow-2xl">
        <div className="mb-6 sm:mb-8 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
          <h3 className="text-xl sm:text-2xl font-bold">Vælg din helt / Choose your hero</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Kameraet og dine kræfter aktiveres efter du har valgt en helt.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setHero("spiderman")}
            className="group rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/70 to-slate-900 p-5 sm:p-6 text-left transition hover:-translate-y-1 hover:border-rose-400 active:scale-95"
          >
            <Shield className="mb-6 sm:mb-8 h-8 w-8 sm:h-10 sm:w-10 text-rose-400 transition group-hover:scale-110" />
            <h4 className="text-lg sm:text-xl font-bold">Spider-Man</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Brug edderkoppe-gestus (pegefinger + lillefinger) til at skyde spind.
            </p>
            <span className="mt-4 sm:mt-6 inline-block text-xs sm:text-sm font-semibold text-rose-300">
              Spil som Spider-Man →
            </span>
          </button>

          <button
            type="button"
            onClick={() => setHero("wolverine")}
            className="group rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/70 to-slate-900 p-5 sm:p-6 text-left transition hover:-translate-y-1 hover:border-amber-400 active:scale-95"
          >
            <Hand className="mb-6 sm:mb-8 h-8 w-8 sm:h-10 sm:w-10 text-amber-300 transition group-hover:scale-110" />
            <h4 className="text-lg sm:text-xl font-bold">Wolverine</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Knyt din næve for at udløse Wolverines adamantium-kløer.
            </p>
            <span className="mt-4 sm:mt-6 inline-block text-xs sm:text-sm font-semibold text-amber-300">
              Spil som Wolverine →
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex items-center justify-between w-full max-w-4xl px-2">
        <button
          type="button"
          onClick={() => setHero(null)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground bg-card border border-border rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Skift helt
        </button>
        <span className="text-xs font-medium text-muted-foreground">
          Brug kamera på mobil eller computer
        </span>
      </div>

      <div className="w-full aspect-[4/3] sm:aspect-video min-h-[320px] max-h-[75vh] overflow-hidden rounded-xl border border-slate-800 bg-[#0f0f18] shadow-2xl relative">
        <iframe
          title={`${hero === "spiderman" ? "Spider-Man Web Shooter" : "Wolverine Claws"} game`}
          src={`${import.meta.env.BASE_URL}games/web-shooter/index.html?hero=${hero}`}
          className="h-full w-full border-0"
          allow="camera; microphone 'none'"
        />
      </div>
    </div>
  );
}
