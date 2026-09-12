import type { Focus, HabitCard } from "./types";
import { effectiveStreak } from "./progress";

export interface WorldArea {
  id: string;
  name: string;
  /** the domain's standing in the world, shown as flavour */
  blurb: string;
  glyph: string;
  focus: Focus;
}

/** Six themed domains of the Ascension world, each fed by a kind of habit. */
export const WORLD_AREAS: WorldArea[] = [
  {
    id: "vitality",
    name: "Vitality",
    blurb: "Terraced training grounds and mountain roads.",
    glyph: "✹",
    focus: "body",
  },
  {
    id: "serenity",
    name: "Serenity",
    blurb: "Still water gardens where the air stays quiet.",
    glyph: "❍",
    focus: "body",
  },
  {
    id: "reflection",
    name: "Reflection",
    blurb: "Lantern halls for sitting with your own thoughts.",
    glyph: "◐",
    focus: "mind",
  },
  {
    id: "wisdom",
    name: "Wisdom",
    blurb: "The long archive, shelf after patient shelf.",
    glyph: "❖",
    focus: "mind",
  },
  {
    id: "creativity",
    name: "Creativity",
    blurb: "Open workshops, half-finished and alive.",
    glyph: "✧",
    focus: "mind",
  },
  {
    id: "focus",
    name: "Focus",
    blurb: "Map rooms where tomorrow is drawn at dusk.",
    glyph: "✦",
    focus: "strategy",
  },
  {
    id: "kinship",
    name: "Kinship",
    blurb: "Rope bridges and hearths between the islands.",
    glyph: "❥",
    focus: "mind",
  },
  {
    id: "courage",
    name: "Courage",
    blurb: "A bare rock of open arches and small fears.",
    glyph: "⟁",
    focus: "body",
  },
  {
    id: "abundance",
    name: "Abundance",
    blurb: "A granary of small sums and an honest ledger.",
    glyph: "◈",
    focus: "strategy",
  },
];

/** Stable, deterministic assignment of a card to one of the areas of its focus. */
export function areaForCard(card: HabitCard): WorldArea {
  const pool = WORLD_AREAS.filter((a) => a.focus === card.focus);
  const list = pool.length ? pool : WORLD_AREAS;
  let hash = 0;
  for (const ch of card.id) hash = (hash * 31 + ch.charCodeAt(0)) % 100_000;
  return list[hash % list.length] as WorldArea;
}

export interface AreaStats {
  area: WorldArea;
  cards: HabitCard[];
  completions: number;
  streakDays: number;
  /** 0-1 how far this domain has been restored */
  growth: number;
}

const AREA_TARGET = 60;

export function areaStats(cards: HabitCard[]): AreaStats[] {
  return WORLD_AREAS.map((area) => {
    const owned = cards.filter((c) => !c.archived && areaForCard(c).id === area.id);
    const completions = owned.reduce((n, c) => n + c.totalCompletions, 0);
    const streakDays = owned.reduce((n, c) => n + effectiveStreak(c), 0);
    return {
      area,
      cards: owned,
      completions,
      streakDays,
      growth: Math.min(1, completions / AREA_TARGET),
    };
  });
}

export function growthLabel(growth: number): string {
  if (growth === 0) return "Dormant";
  if (growth < 0.25) return "Stirring";
  if (growth < 0.5) return "Growing";
  if (growth < 0.8) return "Flourishing";
  if (growth < 1) return "Radiant";
  return "Restored";
}
