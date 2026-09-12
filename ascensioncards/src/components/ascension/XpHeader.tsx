import { Snowflake } from "lucide-react";
import { levelFromXp } from "@/lib/ascension/progress";
import { cn } from "@/lib/utils";

export function XpHeader({
  xp,
  freezes,
  pulsing,
}: {
  xp: number;
  freezes: number;
  pulsing?: boolean;
}) {
  const { level, into, span } = levelFromXp(xp);
  const pct = Math.round((into / span) * 100);

  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 bg-card/40 px-4 py-3">
      <div className="min-w-0">
        <div className="flex min-w-0 items-baseline gap-2">
          <h1 className="truncate font-display text-lg text-primary">Ascension</h1>
          <span className="shrink-0 text-xs text-muted-foreground">Level {level}</span>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Experience toward level ${level + 1}`}
        >
          <div
            className={cn(
              "h-full rounded-full bg-primary transition-[width] duration-500",
              pulsing && "animate-pop",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-border/70 px-2.5 py-1.5 text-xs text-muted-foreground">
        <Snowflake className="size-4 text-rarity-rare" aria-hidden="true" />
        <span>
          {freezes} <span className="sr-only">streak </span>freeze{freezes === 1 ? "" : "s"}
        </span>
      </div>
    </header>
  );
}
