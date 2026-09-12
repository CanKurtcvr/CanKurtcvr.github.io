import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { calendarMonth, downloadIcs } from "@/lib/ascension/calendar";
import type { HabitCard } from "@/lib/ascension/types";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function HabitCalendar({ cards }: { cards: HabitCard[] }) {
  const [offset, setOffset] = useState(0);
  const month = calendarMonth(cards, offset);
  const busiest = Math.max(1, ...month.days.map((d) => d.kept.length));

  return (
    <section className="rounded-md border border-border bg-card/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <CalendarDays className="size-4 text-primary" aria-hidden="true" />
        <h2 className="font-display text-sm">Your calendar of kept days</h2>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOffset(offset - 1)}
            aria-label="Previous month"
            className="press-pop rounded-sm border border-border/70 p-1"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOffset(offset + 1)}
            disabled={offset >= 0}
            aria-label="Next month"
            className="press-pop rounded-sm border border-border/70 p-1 disabled:opacity-40"
          >
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-1 text-[11px] text-muted-foreground">
        {month.label} · {month.keptDays} days kept · {month.totalKeeps} rites · {month.xp} XP earned
        this month. Every rite you keep writes itself here and grows the streak automatically.
      </p>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={`${d}-${i}`} className="text-[10px] uppercase text-muted-foreground">
            {d}
          </span>
        ))}
        {month.days.map((day) => {
          const strength = day.kept.length / busiest;
          return (
            <div
              key={day.key}
              title={day.inMonth ? `${day.key}${day.kept.length ? ` · ${day.kept.join(", ")}` : " · nothing kept"}` : ""}
              className={`aspect-square rounded-sm border text-[10px] leading-none ${
                !day.inMonth
                  ? "border-transparent"
                  : day.isToday
                    ? "border-primary"
                    : "border-border/60"
              } grid place-items-center`}
              style={
                day.inMonth && day.kept.length
                  ? { backgroundColor: `hsl(var(--primary) / ${0.18 + strength * 0.62})` }
                  : undefined
              }
            >
              {day.inMonth ? day.day : ""}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => downloadIcs(cards)}
        className="press-pop mt-3 inline-flex items-center gap-1.5 rounded-sm border border-border/70 px-3 py-1.5 text-[11px] font-semibold text-primary"
      >
        <Download className="size-3.5" aria-hidden="true" />
        Add to my calendar app
      </button>
      <p className="mt-1 text-[10px] text-muted-foreground">
        Downloads every kept day plus a daily reminder for each rite — import it into Apple
        Calendar, Google Calendar or Outlook.
      </p>
    </section>
  );
}
