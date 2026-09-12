import type { RarityId } from "./types";

export interface RarityTier {
  id: RarityId;
  label: string;
  /** dual-coding: a distinct glyph so rarity never relies on colour */
  glyph: string;
  min: number;
  max: number | null;
  /** css class carrying colour + frame geometry + texture */
  frameClass: string;
  textClass: string;
  note: string;
}

export const RARITY_TIERS: RarityTier[] = [
  {
    id: "common",
    label: "Common",
    glyph: "◇",
    min: 0,
    max: 6,
    frameClass: "frame-common",
    textClass: "text-rarity-common",
    note: "Beginning the loop",
  },
  {
    id: "rare",
    label: "Rare",
    glyph: "◆",
    min: 7,
    max: 29,
    frameClass: "frame-rare",
    textClass: "text-rarity-rare",
    note: "One week held",
  },
  {
    id: "epic",
    label: "Epic",
    glyph: "❖",
    min: 30,
    max: 65,
    frameClass: "frame-epic",
    textClass: "text-rarity-epic",
    note: "Approaching automaticity",
  },
  {
    id: "legendary",
    label: "Legendary",
    glyph: "✦",
    min: 66,
    max: 89,
    frameClass: "frame-legendary",
    textClass: "text-rarity-legendary",
    note: "66-day automaticity reached",
  },
  {
    id: "ascended",
    label: "Ascended",
    glyph: "✷",
    min: 90,
    max: null,
    frameClass: "frame-ascended",
    textClass: "text-rarity-ascended",
    note: "Long-term mastery",
  },
];

export function rarityFor(streak: number): RarityTier {
  const days = Math.max(0, streak);
  for (const tier of RARITY_TIERS) {
    if (tier.max === null || days <= tier.max) return tier;
  }
  return RARITY_TIERS[RARITY_TIERS.length - 1] as RarityTier;
}

/** Days remaining until the next rarity tier, or null at the top tier. */
export function daysToNextTier(streak: number): { days: number; tier: RarityTier } | null {
  const current = rarityFor(streak);
  const index = RARITY_TIERS.findIndex((t) => t.id === current.id);
  const next = RARITY_TIERS[index + 1];
  if (!next) return null;
  return { days: next.min - streak, tier: next };
}

/** Progress (0-1) through the current tier. */
export function tierProgress(streak: number): number {
  const tier = rarityFor(streak);
  if (tier.max === null) return 1;
  const span = tier.max - tier.min + 1;
  return Math.min(1, (streak - tier.min + 1) / span);
}

export const AUTOMATICITY_DAYS = 66;
