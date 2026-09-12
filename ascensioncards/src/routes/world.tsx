import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { useAscension } from "@/lib/ascension/store";
import { XpHeader } from "@/components/ascension/XpHeader";
import { BottomNav } from "@/components/ascension/BottomNav";
import { AscensionGame } from "@/components/ascension3d/AscensionGame";

export const Route = createFileRoute("/world")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Ascension Archipelago — Fly Your Habit World" },
      {
        name: "description",
        content:
          "Fly a floating world of six sanctuaries, meet their keepers, and keep the real-life rite each one asks of you. Your streaks light the islands.",
      },
      { property: "og:title", content: "Ascension Archipelago — Fly Your Habit World" },
      {
        property: "og:description",
        content: "Six floating sanctuaries, one per domain, lit by the habits you keep.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WorldScreen,
});

function WorldScreen() {
  const { state, ready } = useAscension();

  return (
    <div className="min-h-dvh pb-24">
      <XpHeader xp={state.xp} freezes={state.freezes} />
      <main className="mx-auto max-w-3xl space-y-3 px-3 pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl text-primary">The archipelago</h1>
            <p className="text-xs text-muted-foreground">
              Fifteen sanctuaries in the sky, each woken by the quest that keeps it.
            </p>
          </div>
          <Link
            to="/campaign"
            className="press-pop inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border/70 px-3 py-2 text-xs"
          >
            <ScrollText className="size-3.5" aria-hidden="true" />
            Campaign
          </Link>
        </div>

        {ready ? (
          <AscensionGame />
        ) : (
          <div className="grid min-h-[560px] place-items-center rounded-2xl border border-border text-sm text-muted-foreground">
            Unsealing the archipelago…
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
