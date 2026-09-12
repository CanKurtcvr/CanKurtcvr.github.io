import type { HabitCard } from "./types";
import { areaForCard, type WorldArea } from "./world";
import { questFor, type Chapter, type Quest } from "./campaign";
import { effectiveStreak, isCompletedToday, XP_PER_COMPLETION } from "./progress";

/** What the practice actually buys you outside the game, by domain. */
export const REAL_REWARDS: Record<string, string> = {
  vitality: "A body that trusts you: steadier energy in the afternoon and easier sleep at night.",
  serenity: "A quieter nervous system — fewer hours spent braced for nothing.",
  reflection: "You stop repeating the same week without noticing it.",
  wisdom: "Something you actually know, that nobody handed you.",
  creativity: "Finished work instead of ideas. A body of it, eventually.",
  focus: "Tomorrow already decided, so mornings stop costing you a decision.",
  kinship: "People who know what is going on with you, before it is a crisis.",
  courage: "The list of things you avoid gets shorter every week.",
  abundance: "Money that behaves, and one fewer thing you dread opening.",
};

export interface DailyGoal {
  card: HabitCard;
  area: WorldArea;
  quest: Quest;
  keptToday: boolean;
  streak: number;
  /** the rite the current chapter asks of you today */
  rite: string;
  /** the real-world reward for keeping this, plainly */
  realReward: string;
  /** the in-game reward the next chapter hands over */
  nextReward: string | null;
  /** the chapter this habit is working towards */
  nextChapter: Chapter | null;
  /** kept days still needed in this domain to open it */
  remaining: number;
  xpToday: number;
}

export interface DailyGoalSummary {
  goals: DailyGoal[];
  keptToday: number;
  total: number;
  xpToday: number;
  /** the goal closest to unlocking its next chapter */
  nearest: DailyGoal | null;
}

export function dailyGoals(cards: HabitCard[]): DailyGoalSummary {
  const live = cards.filter((c) => !c.archived);
  const goals: DailyGoal[] = live.map((card) => {
    const area = areaForCard(card);
    const quest = questFor(area.id);
    const domainCompletions = live
      .filter((c) => areaForCard(c).id === area.id)
      .reduce((n, c) => n + c.totalCompletions, 0);
    const open = quest.chapters.filter((c) => domainCompletions >= c.at);
    const next = quest.chapters.find((c) => domainCompletions < c.at) ?? null;
    const current = open[open.length - 1] ?? quest.chapters[0];
    const streak = effectiveStreak(card);
    const keptToday = isCompletedToday(card);
    return {
      card,
      area,
      quest,
      keptToday,
      streak,
      rite: (next ?? current)?.rite ?? current?.rite ?? "Keep it once today.",
      realReward: REAL_REWARDS[area.id] ?? "One day of proof that you do what you say.",
      nextReward: next?.reward ?? null,
      nextChapter: next,
      remaining: next ? Math.max(0, next.at - domainCompletions) : 0,
      xpToday: keptToday ? XP_PER_COMPLETION + Math.min(30, Math.floor(streak / 3) * 2) : 0,
    };
  });

  const open = goals.filter((g) => g.nextChapter);
  return {
    goals,
    keptToday: goals.filter((g) => g.keptToday).length,
    total: goals.length,
    xpToday: goals.reduce((n, g) => n + g.xpToday, 0),
    nearest: open.sort((a, b) => a.remaining - b.remaining)[0] ?? null,
  };
}
