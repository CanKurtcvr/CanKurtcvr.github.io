import { createFileRoute } from "@tanstack/react-router";
import { useAscension } from "@/lib/ascension/store";
import { levelFromXp, effectiveStreak } from "@/lib/ascension/progress";
import { rarityFor, RARITY_TIERS } from "@/lib/ascension/rarity";
import { XpHeader } from "@/components/ascension/XpHeader";
import { BottomNav } from "@/components/ascension/BottomNav";
import { RarityBadge } from "@/components/ascension/RarityBadge";

export const Route = createFileRoute("/character")({
  head: () => ({
    meta: [
      { title: "Character & Progress — Ascension" },
      {
        name: "description",
        content:
          "Your level, total completions, collected relics and how your habit cards are spread across the rarity tiers.",
      },
      { property: "og:title", content: "Character & Progress — Ascension" },
      {
        property: "og:description",
        content: "Level, completions and rarity spread across your habit card collection.",
      },
    ],
  }),
  component: CharacterScreen,
});

function CharacterScreen() {
  const { state, ready } = useAscension();
  if (!ready) return <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading…</div>;

  const { level, into, span } = levelFromXp(state.xp);
  const cards = state.cards.filter((c) => !c.archived);
  const completions = cards.reduce((n, c) => n + c.totalCompletions, 0);
  const relics = Array.from(new Set(cards.flatMap((c) => c.effects)));

  return (
    <div className="min-h-dvh pb-24">
      <XpHeader xp={state.xp} freezes={state.freezes} />
      <main className="mx-auto max-w-md space-y-5 px-4 pt-5">
        <h1 className="font-display text-2xl text-primary">Your ascent</h1>

        <section className="grid grid-cols-3 gap-2 text-center">
          <Box label="Level" value={`${level}`} />
          <Box label="XP" value={`${state.xp}`} />
          <Box label="Completions" value={`${completions}`} />
        </section>
        <p className="text-xs text-muted-foreground">
          {span - into} XP to level {level + 1}.
        </p>

        <section>
          <h2 className="font-display text-sm text-primary">Rarity spread</h2>
          <ul className="mt-2 space-y-2">
            {RARITY_TIERS.map((tier) => {
              const owned = cards.filter((c) => rarityFor(effectiveStreak(c)).id === tier.id);
              return (
                <li
                  key={tier.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-card/50 px-3 py-2"
                >
                  <div className="min-w-0">
                    <RarityBadge tier={tier} />
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {tier.min}
                      {tier.max === null ? "+" : `–${tier.max}`} days · {tier.note}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-lg">{owned.length}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-sm text-primary">Relics found</h2>
          {relics.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Nothing yet. Completions occasionally turn one up.
            </p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-2">
              {relics.map((r) => (
                <li
                  key={r}
                  className="rounded-sm border border-primary/40 bg-card px-2 py-1 text-xs capitalize"
                >
                  {r.replace("-", " ")}
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

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card/50 px-2 py-3">
      <p className="font-display text-xl">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}
