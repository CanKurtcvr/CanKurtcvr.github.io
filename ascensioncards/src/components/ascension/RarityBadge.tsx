import type { RarityTier } from "@/lib/ascension/rarity";
import { cn } from "@/lib/utils";

/** Rarity is always colour + glyph + texture + written label. */
export function RarityBadge({
  tier,
  className,
  size = "sm",
}: {
  tier: RarityTier;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-display uppercase tracking-[0.18em]",
        size === "sm" ? "text-[10px]" : "text-xs",
        `texture-${tier.id}`,
        className,
      )}
      style={{
        color: `var(--rarity-${tier.id})`,
        borderColor: `color-mix(in oklab, var(--rarity-${tier.id}) 60%, transparent)`,
      }}
    >
      <span aria-hidden="true">{tier.glyph}</span>
      {tier.label}
    </span>
  );
}
