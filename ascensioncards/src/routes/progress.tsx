import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useAscension } from "@/lib/ascension/store";
import { XpHeader } from "@/components/ascension/XpHeader";
import { BottomNav } from "@/components/ascension/BottomNav";
import { dayKeyOffset, effectiveStreak, todayKey } from "@/lib/ascension/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress & History — Ascension" },
      {
        name: "description",
        content:
          "The last 28 days of completions, longest streaks per card and your recent history — kept on your device, with no shaming.",
      },
      { property: "og:title", content: "Progress & History — Ascension" },
      {
        property: "og:description",
        content: "28 days of habit history, longest streaks and recent completions.",
      },
    ],
  }),
  component: ProgressScreen,
});

const DAYS = 28;

function ProgressScreen() {
  const { state, ready } = useAscension();
  if (!ready)
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading…</div>
    );

  const cards = state.cards.filter((c) => !c.archived);
  const days = Array.from({ length: DAYS }, (_, i) => dayKeyOffset(i - (DAYS - 1)));
  const perDay = days.map((day) => ({
    day,
    count: cards.filter((c) => c.history.includes(day)).length,
  }));
  const today = todayKey();
  const recent = cards
    .flatMap((c) => c.history.map((day) => ({ day, title: c.title })))
    .sort((a, b) => (a.day < b.day ? 1 : -1))
    .slice(0, 12);

  return (
    <div className="min-h-dvh pb-24">
      <XpHeader xp={state.xp} freezes={state.freezes} />
      <main className="mx-auto max-w-md space-y-6 px-4 pt-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl text-primary">Progress</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Missed days simply stay empty. Nothing is lost from your record.
            </p>
          </div>
          <Link
            to="/settings"
            aria-label="Settings"
            className="press-pop grid size-11 shrink-0 place-items-center rounded-md border border-border/70 text-muted-foreground"
          >
            <Settings className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <section>
          <h2 className="font-display text-sm text-primary">Last 28 days</h2>
          <ul className="mt-2 grid grid-cols-7 gap-1.5" aria-label="Completions per day">
            {perDay.map(({ day, count }) => (
              <li
                key={day}
                title={`${day}: ${count} completion${count === 1 ? "" : "s"}`}
                className={cn(
                  "aspect-square rounded-sm border border-border/60",
                  count === 0 && "bg-secondary/40",
                  count === 1 && "bg-primary/35",
                  count === 2 && "bg-primary/60",
                  count >= 3 && "bg-primary",
                  day === today && "ring-1 ring-primary",
                )}
              >
                <span className="sr-only">
                  {day}: {count} completions
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-sm text-primary">Streaks by card</h2>
          <ul className="mt-2 space-y-2">
            {cards.map((card) => (
              <li
                key={card.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-card/50 px-3 py-2"
              >
                <Link
                  to="/card/$cardId"
                  params={{ cardId: card.id }}
                  className="min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="block truncate text-sm font-medium">{card.title}</span>
                  <span className="block text-[11px] text-muted-foreground">
                    now {effectiveStreak(card)} · best {card.longestStreak} · {card.totalCompletions}{" "}
                    total
                  </span>
                </Link>
                <span className="shrink-0 font-display text-lg">{effectiveStreak(card)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-sm text-primary">Recent history</h2>
          {recent.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Nothing recorded yet. Your first completion starts the ledger.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {recent.map((entry, i) => (
                <li
                  key={`${entry.day}-${entry.title}-${i}`}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border/50 pb-1.5 text-xs"
                >
                  <span className="truncate">{entry.title}</span>
                  <span className="shrink-0 text-muted-foreground">{entry.day}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
