import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Archive, Check, Flame, Trophy } from "lucide-react";
import { useAscension, useMotionAllowed } from "@/lib/ascension/store";
import { artFor } from "@/lib/ascension/art";
import { rarityFor, daysToNextTier, tierProgress, AUTOMATICITY_DAYS } from "@/lib/ascension/rarity";
import { effectiveStreak, isCompletedToday } from "@/lib/ascension/progress";
import { RarityBadge } from "@/components/ascension/RarityBadge";
import { BottomNav } from "@/components/ascension/BottomNav";
import { haptic } from "@/lib/ascension/haptics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/card/$cardId")({
  head: () => ({
    meta: [
      { title: "Habit Card — Ascension" },
      {
        name: "description",
        content:
          "Card detail: streak history, longest streak, total completions and progress toward the 66-day automaticity milestone.",
      },
      { property: "og:title", content: "Habit Card — Ascension" },
      {
        property: "og:description",
        content: "Streak history and rarity progress for a single habit card.",
      },
    ],
  }),
  component: CardDetail,
});

function CardDetail() {
  const { cardId } = Route.useParams();
  const { state, ready, complete, archiveCard } = useAscension();
  const motion = useMotionAllowed();
  const card = state.cards.find((c) => c.id === cardId);

  if (!ready) return <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading…</div>;

  if (!card) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-xl">This card isn't in your collection</h1>
          <Link to="/" className="mt-4 inline-block text-sm text-primary underline">
            Back to collection
          </Link>
        </div>
      </div>
    );
  }

  const streak = effectiveStreak(card);
  const tier = rarityFor(streak);
  const next = daysToNextTier(streak);
  const done = isCompletedToday(card);
  const recent = card.history.slice(-28);

  return (
    <div className="min-h-dvh pb-28">
      <div className="relative">
        <img
          src={artFor(card.art)}
          alt={`Portrait artwork for ${card.title}`}
          width={768}
          height={1024}
          className="h-[52vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
        <div className={cn("absolute inset-0 opacity-25", `texture-${tier.id}`)} aria-hidden="true" />
        <Link
          to="/cards"
          aria-label="Back to collection"
          className="press-pop absolute left-3 top-3 grid size-12 place-items-center rounded-md border border-border/70 bg-background/70 backdrop-blur"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <div className="absolute inset-x-4 bottom-4">
          <RarityBadge tier={tier} size="md" className="bg-background/70" />
          <h1 className="mt-2 font-display text-3xl leading-tight">{card.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
        </div>
      </div>

      <main className="mx-auto max-w-md space-y-5 px-4 pt-5">
        <blockquote className="rounded-md border-l-2 border-primary/60 bg-card/50 px-4 py-3 text-sm italic text-muted-foreground">
          “{card.quote}”
          <footer className="mt-1 not-italic">— {card.author}</footer>
        </blockquote>

        <section className="grid grid-cols-3 gap-2 text-center">
          <Stat icon={<Flame className="size-4" />} label="Current" value={`${streak}d`} />
          <Stat icon={<Trophy className="size-4" />} label="Longest" value={`${card.longestStreak}d`} />
          <Stat icon={<Check className="size-4" />} label="Total" value={`${card.totalCompletions}`} />
        </section>

        <section className="rounded-md border border-border bg-card/50 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-display text-sm text-primary">{tier.label} · {tier.note}</h2>
            <span className="text-xs text-muted-foreground">
              {next ? `${next.days}d to ${next.tier.label}` : "Top tier"}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${Math.round(tierProgress(streak) * 100)}%`,
                backgroundColor: `var(--rarity-${tier.id})`,
              }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {streak >= AUTOMATICITY_DAYS
              ? "Past the 66-day median for automaticity — this one mostly runs itself now."
              : `${AUTOMATICITY_DAYS - streak} days from the 66-day automaticity milestone.`}
          </p>
        </section>

        <section>
          <h2 className="font-display text-sm text-primary">Last four weeks</h2>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => {
              const day = new Date();
              day.setDate(day.getDate() - (27 - i));
              const key = `${day.getFullYear()}-${`${day.getMonth() + 1}`.padStart(2, "0")}-${`${day.getDate()}`.padStart(2, "0")}`;
              const hit = recent.includes(key);
              return (
                <div
                  key={key}
                  title={key}
                  aria-label={`${key}: ${hit ? "completed" : "not completed"}`}
                  className={cn(
                    "aspect-square rounded-sm border",
                    hit ? "border-primary/60 bg-primary/70" : "border-border/60 bg-secondary/50",
                  )}
                />
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Missed days simply reset the current streak. Your history and longest streak stay.
          </p>
        </section>

        <button
          type="button"
          disabled={done}
          onPointerUp={() => {
            const result = complete(card.id);
            if (result) haptic(result.tierChanged ? "thud" : "tick");
          }}
          className={cn(
            "press-pop flex min-h-14 w-full items-center justify-center gap-2 rounded-md text-base font-semibold",
            done ? "border border-border bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground",
            motion && !done && "transition-transform",
          )}
        >
          <Check className="size-5" aria-hidden="true" />
          {done ? "Completed today" : "Complete today"}
        </button>

        <button
          type="button"
          onPointerUp={() => archiveCard(card.id)}
          className="press-pop flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-border text-sm text-muted-foreground"
        >
          <Archive className="size-4" aria-hidden="true" />
          Retire this card
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card/50 px-2 py-3">
      <div className="flex items-center justify-center gap-1 text-primary">{icon}</div>
      <p className="mt-1 font-display text-lg">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}
