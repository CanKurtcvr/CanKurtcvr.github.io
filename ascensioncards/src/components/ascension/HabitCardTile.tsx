import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Flame } from "lucide-react";
import type { HabitCard } from "@/lib/ascension/types";
import { artFor } from "@/lib/ascension/art";
import { rarityFor, daysToNextTier } from "@/lib/ascension/rarity";
import { effectiveStreak, isCompletedToday } from "@/lib/ascension/progress";
import { RarityBadge } from "./RarityBadge";
import { SparkBurst, type Burst } from "./Sparks";
import { cn } from "@/lib/utils";

export function HabitCardTile({
  card,
  onComplete,
  motion,
}: {
  card: HabitCard;
  onComplete: (card: HabitCard, point: { x: number; y: number }) => void;
  motion: boolean;
}) {
  const streak = effectiveStreak(card);
  const tier = rarityFor(streak);
  const next = daysToNextTier(streak);
  const done = isCompletedToday(card);
  const [burst, setBurst] = useState<Burst | null>(null);
  const [popping, setPopping] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  // Inputs are never blocked by a running animation — each tap is handled at once.
  function handleTap(e: React.PointerEvent<HTMLButtonElement>) {
    const rect = wrapper.current?.getBoundingClientRect();
    const point = rect
      ? { x: e.clientX - rect.left, y: e.clientY - rect.top }
      : { x: 0, y: 0 };
    setBurst({ id: Date.now(), ...point });
    setPopping(true);
    window.setTimeout(() => setPopping(false), 200);
    onComplete(card, point);
  }

  return (
    <div
      ref={wrapper}
      className={cn(
        "rarity-frame relative overflow-hidden shadow-[var(--shadow-card)]",
        tier.frameClass,
        motion && popping && "animate-pop",
      )}
    >
      <Link
        to="/card/$cardId"
        params={{ cardId: card.id }}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={`${card.title}, ${tier.label}, ${streak} day streak. Open details.`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={artFor(card.art)}
            alt=""
            width={768}
            height={1024}
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
          <div className={cn("absolute inset-0 opacity-40", `texture-${tier.id}`)} aria-hidden="true" />
          <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-2">
            <RarityBadge tier={tier} className="bg-background/70 backdrop-blur-sm" />
            <span className="inline-flex items-center gap-1 rounded-sm border border-border/70 bg-background/70 px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm">
              <Flame className="size-3.5 text-primary" aria-hidden="true" />
              {streak}
              <span className="sr-only">day streak</span>
            </span>
          </div>
          <div className="absolute inset-x-3 bottom-2">
            <h3 className="font-display text-base leading-tight">{card.title}</h3>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{card.description}</p>
          </div>
        </div>
      </Link>

      <div className="space-y-2 px-3 pb-3 pt-2">
        <blockquote className="text-[11px] italic leading-snug text-muted-foreground">
          “{card.quote}”
          <footer className="mt-0.5 not-italic opacity-80">— {card.author}</footer>
        </blockquote>
        <button
          type="button"
          onPointerUp={handleTap}
          disabled={done}
          aria-label={done ? `${card.title} completed today` : `Complete ${card.title}`}
          className={cn(
            "press-pop flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold",
            done
              ? "border border-border/70 bg-secondary text-muted-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          <Check className="size-4" aria-hidden="true" />
          {done ? "Done today" : "Complete"}
        </button>
        {next && (
          <p className="text-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {next.days} day{next.days === 1 ? "" : "s"} to {next.tier.label}
          </p>
        )}
      </div>

      <SparkBurst burst={burst} enabled={motion} />
    </div>
  );
}
