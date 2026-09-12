import type { AscensionState, HabitCard } from "./types";

export const XP_PER_COMPLETION = 20;

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dayKeyOffset(days: number, from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return todayKey(d);
}

export function daysBetween(a: string, b: string): number {
  const ms = new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime();
  return Math.round(ms / 86_400_000);
}

export function isCompletedToday(card: HabitCard, today = todayKey()): boolean {
  return card.lastCompleted === today;
}

/** XP required to reach the given level (1-indexed). */
export function xpForLevel(level: number): number {
  return Math.round(60 * Math.pow(level - 1, 1.45));
}

export function levelFromXp(xp: number): { level: number; into: number; span: number } {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level += 1;
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return { level, into: xp - base, span: Math.max(1, next - base) };
}

export interface RewardDrop {
  id: string;
  label: string;
  detail: string;
}

const DROPS: RewardDrop[] = [
  { id: "emberdust", label: "Emberdust", detail: "A warm shimmer settles on the card." },
  { id: "moonleaf", label: "Moonleaf", detail: "A pale glow traces the frame." },
  { id: "gilded-edge", label: "Gilded Edge", detail: "The card's border takes on gold." },
  { id: "starfall", label: "Starfall", detail: "Faint stars drift behind the art." },
  { id: "frost-sigil", label: "Frost Sigil", detail: "A quiet rime edges the portrait." },
];

/** Variable reward: roughly a 1-in-4 chance, better odds on longer streaks. */
export function rollDrop(streak: number, random = Math.random): RewardDrop | null {
  const chance = Math.min(0.45, 0.22 + streak * 0.002);
  if (random() > chance) return null;
  return DROPS[Math.floor(random() * DROPS.length) % DROPS.length] ?? null;
}

export interface CompletionResult {
  card: HabitCard;
  xpGained: number;
  drop: RewardDrop | null;
  tierChanged: boolean;
  freezeUsed: boolean;
}

/**
 * Applies a completion. Missing days break the current streak but never the
 * history or longest streak; an available freeze covers a single missed day.
 */
export function completeCard(
  card: HabitCard,
  opts: { today?: string; freezesAvailable?: number; random?: () => number } = {},
): CompletionResult | null {
  const today = opts.today ?? todayKey();
  if (card.lastCompleted === today) return null;

  const previousStreak = card.streak;
  let freezeUsed = false;
  let streak = 1;

  if (card.lastCompleted) {
    const gap = daysBetween(card.lastCompleted, today);
    if (gap === 1) {
      streak = card.streak + 1;
    } else if (gap === 2 && (opts.freezesAvailable ?? 0) > 0) {
      streak = card.streak + 1;
      freezeUsed = true;
    }
  }

  const next: HabitCard = {
    ...card,
    streak,
    longestStreak: Math.max(card.longestStreak, streak),
    totalCompletions: card.totalCompletions + 1,
    lastCompleted: today,
    history: [...card.history, today],
  };

  const xpGained = XP_PER_COMPLETION + Math.min(30, Math.floor(streak / 3) * 2);
  const drop = rollDrop(streak, opts.random);
  if (drop && !next.effects.includes(drop.id)) next.effects = [...next.effects, drop.id];

  return {
    card: next,
    xpGained,
    drop,
    freezeUsed,
    tierChanged: tierIndex(previousStreak) !== tierIndex(streak),
  };
}

function tierIndex(streak: number): number {
  if (streak >= 90) return 4;
  if (streak >= 66) return 3;
  if (streak >= 30) return 2;
  if (streak >= 7) return 1;
  return 0;
}

/** Streak shown in the UI: stale streaks read as 0 without rewriting history. */
export function effectiveStreak(card: HabitCard, today = todayKey()): number {
  if (!card.lastCompleted) return 0;
  const gap = daysBetween(card.lastCompleted, today);
  return gap <= 1 ? card.streak : 0;
}

export function totalCompletions(state: AscensionState): number {
  return state.cards.reduce((sum, c) => sum + c.totalCompletions, 0);
}
