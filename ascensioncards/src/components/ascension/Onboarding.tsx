import { useMemo, useRef, useState } from "react";
import { Check, Compass, Dumbbell, BrainCircuit } from "lucide-react";
import type { Focus } from "@/lib/ascension/types";
import { useAscension, useMotionAllowed } from "@/lib/ascension/store";
import { STARTER_BY_FOCUS } from "@/lib/ascension/seed";
import { artFor } from "@/lib/ascension/art";
import { haptic } from "@/lib/ascension/haptics";
import { SparkBurst, type Burst } from "./Sparks";
import { RarityBadge } from "./RarityBadge";
import { rarityFor } from "@/lib/ascension/rarity";
import { cn } from "@/lib/utils";

const FOCUSES: { id: Focus; label: string; blurb: string; Icon: typeof Compass }[] = [
  { id: "body", label: "Body", blurb: "Movement, strength, rest", Icon: Dumbbell },
  { id: "mind", label: "Mind", blurb: "Stillness, reading, focus", Icon: BrainCircuit },
  { id: "strategy", label: "Strategy", blurb: "Planning, order, craft", Icon: Compass },
];

export function Onboarding() {
  const { state, chooseFocus, finishOnboarding, complete } = useAscension();
  const motion = useMotionAllowed();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [burst, setBurst] = useState<Burst | null>(null);
  const [xpPop, setXpPop] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const starter = useMemo(() => {
    if (!state.focus) return null;
    const id = STARTER_BY_FOCUS[state.focus];
    return state.cards.find((c) => c.id === id) ?? state.cards[0] ?? null;
  }, [state.focus, state.cards]);

  function pick(focus: Focus) {
    haptic("tick");
    chooseFocus(focus);
    setStep(2);
  }

  function firstCompletion(e: React.PointerEvent<HTMLButtonElement>) {
    if (!starter) return;
    const rect = stage.current?.getBoundingClientRect();
    setBurst({
      id: Date.now(),
      x: rect ? e.clientX - rect.left : 0,
      y: rect ? e.clientY - rect.top : 0,
    });
    haptic("ascend");
    complete(starter.id);
    setXpPop(true);
    setStep(3);
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-8 pt-10">
      <p className="text-center text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        Step {step} of 3
      </p>

      {step === 1 && (
        <section className="mt-10 flex flex-1 flex-col">
          <h1 className="font-display text-3xl leading-tight text-primary">
            What are you building?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick a path. It sets your opening deck — you can add any habit later.
          </p>
          <div className="mt-8 space-y-3">
            {FOCUSES.map(({ id, label, blurb, Icon }) => (
              <button
                key={id}
                type="button"
                onPointerUp={() => pick(id)}
                className="press-pop grid min-h-16 w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-md border border-border bg-card px-4 py-3 text-left"
              >
                <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-display text-lg">{label}</span>
                  <span className="block text-xs text-muted-foreground">{blurb}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && starter && (
        <section ref={stage} className="relative mt-8 flex flex-1 flex-col">
          <h2 className="font-display text-2xl text-primary">Your first card</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            One tap is all a day ever takes.
          </p>
          <div className="mt-6 overflow-hidden rounded-md border-2 border-border bg-card">
            <div className="relative aspect-[3/4] w-full">
              <img
                src={artFor(starter.art)}
                alt=""
                width={768}
                height={1024}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute inset-x-3 bottom-3">
                <RarityBadge tier={rarityFor(0)} className="bg-background/70" />
                <h3 className="mt-1 font-display text-xl">{starter.title}</h3>
                <p className="text-xs text-muted-foreground">{starter.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-6">
            <button
              type="button"
              onPointerUp={firstCompletion}
              className="press-pop min-h-14 w-full rounded-md bg-primary text-base font-semibold text-primary-foreground"
            >
              Complete it now
            </button>
          </div>
          <SparkBurst burst={burst} enabled={motion} />
        </section>
      )}

      {step === 3 && starter && (
        <section className="relative mt-8 flex flex-1 flex-col">
          <div className="flex items-center gap-2 text-primary">
            <Check className="size-5" aria-hidden="true" />
            <h2 className="font-display text-2xl">Day one is yours</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {starter.title} is alive. Sixty-five more days and it turns Legendary — the point
            where the research says a habit runs itself.
          </p>

          <div className="mt-6 rounded-md border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Experience</p>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full w-1/3 rounded-full bg-primary", motion && xpPop && "animate-pop")}
              />
            </div>
            <p className="mt-3 text-sm">
              <span className="font-display text-primary">+20 XP</span> · first tile of your world
              has surfaced.
            </p>
          </div>

          <div className="mt-6 rounded-md border border-border/70 bg-card/50 p-4">
            <p className="font-display text-sm text-primary">Next three</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>1. Complete a second card today</li>
              <li>2. Add a habit of your own</li>
              <li>3. Return tomorrow to set the streak</li>
            </ul>
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              onPointerUp={() => {
                haptic("thud");
                finishOnboarding();
              }}
              className="press-pop min-h-14 w-full rounded-md bg-primary text-base font-semibold text-primary-foreground"
            >
              Enter the collection
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
