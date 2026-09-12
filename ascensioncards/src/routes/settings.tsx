import { createFileRoute } from "@tanstack/react-router";
import { useAscension } from "@/lib/ascension/store";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/ascension/BottomNav";
import { clearState } from "@/lib/ascension/storage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Ascension" },
      {
        name: "description",
        content:
          "Reduced motion, offline data, streak freezes and starting over. Ascension keeps everything on your device.",
      },
      { property: "og:title", content: "Settings — Ascension" },
      { property: "og:description", content: "Motion, offline data and streak freeze settings." },
    ],
  }),
  component: SettingsScreen,
});

function SettingsScreen() {
  const { state, ready, setReducedMotion, reset } = useAscension();
  if (!ready) return <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-dvh pb-24">
      <main className="mx-auto max-w-md space-y-5 px-4 pt-8">
        <h1 className="font-display text-2xl text-primary">Settings</h1>

        <section className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-border bg-card/50 px-4 py-3">
          <label htmlFor="reduced-motion" className="min-w-0">
            <span className="block text-sm font-medium">Reduced motion</span>
            <span className="block text-xs text-muted-foreground">
              Replace spring pops and particles with instant fades.
            </span>
          </label>
          <Switch
            id="reduced-motion"
            checked={state.reducedMotion}
            onCheckedChange={setReducedMotion}
          />
        </section>

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <h2 className="text-sm font-medium">Streak freezes</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            You hold {state.freezes}. A freeze quietly covers one missed day so a single lapse
            never erases your progress. More are earned as you level.
          </p>
        </section>

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <h2 className="text-sm font-medium">Your data</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Everything is stored on this device and works with no connection. Nothing is uploaded.
          </p>
          <button
            type="button"
            onPointerUp={() => {
              void clearState();
              reset();
            }}
            className="press-pop mt-3 min-h-12 w-full rounded-md border border-destructive/50 text-sm font-medium text-destructive"
          >
            Start over
          </button>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
