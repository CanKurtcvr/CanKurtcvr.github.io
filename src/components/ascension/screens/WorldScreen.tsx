import { lazy, Suspense } from "react";
import { ScrollText } from "lucide-react";
import { useAscension } from "@/lib/ascension/store";
import { XpHeader } from "@/components/ascension/XpHeader";
import type { AscensionSubTab } from "../BottomNav";

// ⚡ Bolt: Lazy load heavy 3D AscensionGame (Three.js world) on demand so 2D habit card screens load instantly without downloading 3D assets
const AscensionGame3D = lazy(() => import("@/components/ascension3d/AscensionGame").then(m => ({ default: m.AscensionGame })));

interface WorldScreenProps {
  onNavigate: (tab: AscensionSubTab) => void;
}

export function WorldScreen({ onNavigate }: WorldScreenProps) {
  const { state, ready } = useAscension();

  return (
    <div className="space-y-3">
      <XpHeader xp={state.xp} freezes={state.freezes} />
      <div className="mx-auto max-w-4xl space-y-3 px-1 pt-2">
        <div className="flex justify-between items-center gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold text-primary">The Archipelago</h2>
            <p className="text-xs text-muted-foreground">
              Fifteen sanctuaries in the sky, each woken by the quest that keeps it. Fly with W,A,S,D / Arrows.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("campaign")}
            className="press-pop inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <ScrollText className="size-3.5 text-primary" aria-hidden="true" />
            <span>Campaign</span>
          </button>
        </div>

        {ready ? (
          <div className="rounded-xl overflow-hidden border border-border/80 shadow-lg bg-slate-950 min-h-[580px]">
            <Suspense
              fallback={
                <div className="grid min-h-[580px] place-items-center text-sm text-muted-foreground animate-pulse">
                  Indlæser 3D verdenen...
                </div>
              }
            >
              <AscensionGame3D />
            </Suspense>
          </div>
        ) : (
          <div className="grid min-h-[560px] place-items-center rounded-xl border border-border text-sm text-muted-foreground">
            Unsealing the archipelago…
          </div>
        )}
      </div>
    </div>
  );
}
