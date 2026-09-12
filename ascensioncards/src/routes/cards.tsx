import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useAscension, useMotionAllowed } from "@/lib/ascension/store";
import { HabitCardTile } from "@/components/ascension/HabitCardTile";
import { XpHeader } from "@/components/ascension/XpHeader";
import { BottomNav } from "@/components/ascension/BottomNav";
import { NewCardSheet } from "@/components/ascension/NewCardSheet";
import { haptic } from "@/lib/ascension/haptics";
import type { HabitCard } from "@/lib/ascension/types";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Habit Cards — Ascension" },
      {
        name: "description",
        content:
          "Your full collection of habit cards, each with its portrait, quote, streak and rarity tier from Common to Ascended.",
      },
      { property: "og:title", content: "Habit Cards — Ascension" },
      {
        property: "og:description",
        content: "Every habit you keep, held as a collectible card that rises in rarity.",
      },
    ],
  }),
  component: CollectionScreen,
});

function CollectionScreen() {
  const { state, ready, complete } = useAscension();
  const motion = useMotionAllowed();
  const [toast, setToast] = useState<string | null>(null);
  const [xpPop, setXpPop] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">
        Unsealing your collection…
      </div>
    );
  }

  function onComplete(card: HabitCard) {
    const result = complete(card.id);
    if (!result) return;
    haptic(result.tierChanged ? "thud" : "tick");
    setXpPop(true);
    window.setTimeout(() => setXpPop(false), 400);
    const parts = [`+${result.xpGained} XP`];
    if (result.tierChanged) parts.push(`${card.title} rose in rarity`);
    if (result.drop) parts.push(`${result.drop.label} found`);
    if (result.freezeUsed) parts.push("streak freeze spent");
    setToast(parts.join(" · "));
    window.setTimeout(() => setToast(null), 2600);
  }

  const active = state.cards.filter((c) => !c.archived);

  return (
    <div className="min-h-dvh pb-24">
      <XpHeader xp={state.xp} freezes={state.freezes} pulsing={xpPop} />

      <main className="mx-auto max-w-md px-4 pt-4">
        <h2 className="font-display text-xl text-primary">The collection</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          {active.length} card{active.length === 1 ? "" : "s"} bound
        </p>
        <div className="grid grid-cols-2 gap-3">
          {active.map((card) => (
            <HabitCardTile key={card.id} card={card} onComplete={onComplete} motion={motion} />
          ))}
        </div>

        <button
          type="button"
          onPointerUp={() => {
            haptic("tick");
            setSheetOpen(true);
          }}
          className="press-pop mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-dashed border-border text-sm font-medium text-muted-foreground"
        >
          <Plus className="size-4" aria-hidden="true" />
          Forge a new card
        </button>
      </main>

      {toast && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-24 z-40 mx-auto w-fit max-w-[90vw] rounded-md border border-primary/40 bg-card px-4 py-2 text-center text-sm shadow-[var(--shadow-card)]"
        >
          {toast}
        </div>
      )}

      <NewCardSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      <BottomNav />
    </div>
  );
}
