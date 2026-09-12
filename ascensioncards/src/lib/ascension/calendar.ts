import type { HabitCard } from "./types";
import { todayKey, XP_PER_COMPLETION } from "./progress";

export interface CalendarDay {
  key: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  /** cards kept on this day */
  kept: string[];
  xp: number;
}

export interface CalendarMonth {
  label: string;
  year: number;
  month: number;
  days: CalendarDay[];
  keptDays: number;
  totalKeeps: number;
  xp: number;
}

function keyOf(y: number, m: number, d: number): string {
  return `${y}-${`${m + 1}`.padStart(2, "0")}-${`${d}`.padStart(2, "0")}`;
}

/** A Monday-first month grid, filled from every card's completion history. */
export function calendarMonth(cards: HabitCard[], monthOffset = 0, from = new Date()): CalendarMonth {
  const anchor = new Date(from.getFullYear(), from.getMonth() + monthOffset, 1);
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const today = todayKey(from);

  const byDay = new Map<string, string[]>();
  for (const card of cards) {
    for (const day of card.history) {
      const list = byDay.get(day) ?? [];
      if (!list.includes(card.title)) list.push(card.title);
      byDay.set(day, list);
    }
  }

  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    days.push({ key: `pad-${i}`, day: 0, inMonth: false, isToday: false, kept: [], xp: 0 });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    const key = keyOf(year, month, d);
    const kept = byDay.get(key) ?? [];
    days.push({
      key,
      day: d,
      inMonth: true,
      isToday: key === today,
      kept,
      xp: kept.length * XP_PER_COMPLETION,
    });
  }
  while (days.length % 7 !== 0) {
    days.push({ key: `tail-${days.length}`, day: 0, inMonth: false, isToday: false, kept: [], xp: 0 });
  }

  const real = days.filter((d) => d.inMonth);
  return {
    label: anchor.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
    year,
    month,
    days,
    keptDays: real.filter((d) => d.kept.length > 0).length,
    totalKeeps: real.reduce((n, d) => n + d.kept.length, 0),
    xp: real.reduce((n, d) => n + d.xp, 0),
  };
}

function icsDate(key: string): string {
  return key.replace(/-/g, "");
}

function nextDay(key: string): string {
  const d = new Date(`${key}T00:00:00`);
  d.setDate(d.getDate() + 1);
  return icsDate(todayKey(d));
}

function escapeText(value: string): string {
  return value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

/**
 * An .ics file any calendar app can import: every day you kept a rite as an
 * all-day entry, plus a daily repeating reminder for each live card.
 */
export function habitsToIcs(cards: HabitCard[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ascension//Habit Rites//EN",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Ascension — rites kept",
  ];

  for (const card of cards) {
    for (const day of card.history) {
      lines.push(
        "BEGIN:VEVENT",
        `UID:${card.id}-${day}@ascension`,
        `DTSTART;VALUE=DATE:${icsDate(day)}`,
        `DTEND;VALUE=DATE:${nextDay(day)}`,
        `SUMMARY:✔ ${escapeText(card.title)}`,
        `DESCRIPTION:${escapeText(`Rite kept · +${XP_PER_COMPLETION} XP`)}`,
        "END:VEVENT",
      );
    }
    if (!card.archived) {
      lines.push(
        "BEGIN:VEVENT",
        `UID:${card.id}-daily@ascension`,
        `DTSTART;VALUE=DATE:${icsDate(todayKey())}`,
        `DTEND;VALUE=DATE:${nextDay(todayKey())}`,
        "RRULE:FREQ=DAILY",
        `SUMMARY:${escapeText(card.title)}`,
        `DESCRIPTION:${escapeText(card.description || "Keep this rite today.")}`,
        "END:VEVENT",
      );
    }
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(cards: HabitCard[]): void {
  const blob = new Blob([habitsToIcs(cards)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ascension-rites.ics";
  a.click();
  URL.revokeObjectURL(url);
}
