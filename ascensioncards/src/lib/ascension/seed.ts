import type { Focus, HabitCard } from "./types";

type CardSeed = Omit<
  HabitCard,
  "streak" | "longestStreak" | "totalCompletions" | "lastCompleted" | "history" | "effects" | "archived"
>;

const SEEDS: CardSeed[] = [
  {
    id: "runner",
    title: "The Runner",
    description: "Move your body outdoors, however briefly.",
    quote: "The road gives back exactly what you spend on it.",
    author: "Highland Courier's Creed",
    focus: "body",
    art: "runner",
  },
  {
    id: "ironbound",
    title: "The Ironbound",
    description: "One set of honest strength work.",
    quote: "Stone yields to the hand that returns.",
    author: "Forgewright Halden",
    focus: "body",
    art: "ironbound",
  },
  {
    id: "springbearer",
    title: "The Springbearer",
    description: "Drink deeply before the day takes you.",
    quote: "Small waters carve the deepest valleys.",
    author: "Song of the Clearwell",
    focus: "body",
    art: "springbearer",
  },
  {
    id: "meditator",
    title: "The Meditator",
    description: "Sit and breathe for a few quiet minutes.",
    quote: "Stillness is not absence. It is attention without hurry.",
    author: "The Lantern Sutras",
    focus: "mind",
    art: "meditator",
  },
  {
    id: "scribe",
    title: "The Scribe",
    description: "Read pages that are yours to choose.",
    quote: "A page a night outlasts a shelf bought in a day.",
    author: "Archivist Wren",
    focus: "mind",
    art: "scribe",
  },
  {
    id: "alchemist",
    title: "The Alchemist",
    description: "Tend one small thing you keep putting off.",
    quote: "Order is a potion brewed in minutes, not hours.",
    author: "Notes of the Green Workshop",
    focus: "mind",
    art: "alchemist",
  },
  {
    id: "cartographer",
    title: "The Cartographer",
    description: "Plan tomorrow before tonight ends.",
    quote: "No one is lost who drew the map at dusk.",
    author: "Chartwright Emel",
    focus: "strategy",
    art: "cartographer",
  },
];

export const STARTER_BY_FOCUS: Record<Focus, string> = {
  body: "runner",
  mind: "meditator",
  strategy: "cartographer",
};

export function blankCard(seed: CardSeed): HabitCard {
  return {
    ...seed,
    streak: 0,
    longestStreak: 0,
    totalCompletions: 0,
    lastCompleted: null,
    history: [],
    effects: [],
    archived: false,
  };
}

/** Deck for a chosen focus: its three cards first, then a companion from elsewhere. */
export function deckForFocus(focus: Focus): HabitCard[] {
  const own = SEEDS.filter((s) => s.focus === focus);
  const others = SEEDS.filter((s) => s.focus !== focus).slice(0, 2);
  const starter = STARTER_BY_FOCUS[focus];
  const ordered = [...own, ...others].sort((a, b) =>
    a.id === starter ? -1 : b.id === starter ? 1 : 0,
  );
  return ordered.map(blankCard);
}

export function allSeeds(): CardSeed[] {
  return SEEDS;
}
