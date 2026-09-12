export type Focus = "body" | "mind" | "strategy";

export type RarityId = "common" | "rare" | "epic" | "legendary" | "ascended";

export interface HabitCard {
  id: string;
  title: string;
  description: string;
  quote: string;
  author: string;
  focus: Focus;
  /** key into the bundled art map */
  art: string;
  streak: number;
  longestStreak: number;
  totalCompletions: number;
  /** ISO date (yyyy-mm-dd) of the last completion */
  lastCompleted: string | null;
  /** ISO dates of every completion, newest last */
  history: string[];
  /** unlocked cosmetic effects from variable rewards */
  effects: string[];
  archived: boolean;
}

export interface AscensionState {
  onboarded: boolean;
  focus: Focus | null;
  xp: number;
  freezes: number;
  reducedMotion: boolean;
  cards: HabitCard[];
}
