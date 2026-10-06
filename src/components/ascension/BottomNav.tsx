import React from "react";
import { CalendarCheck, Layers, Globe2, Sparkles, LineChart, ScrollText } from "lucide-react";
import { haptic } from "@/lib/ascension/haptics";

export type AscensionSubTab = "today" | "cards" | "world" | "campaign" | "character" | "progress" | "settings";

const ITEMS = [
  { id: "today" as const, label: "Today", Icon: CalendarCheck },
  { id: "cards" as const, label: "Cards", Icon: Layers },
  { id: "world" as const, label: "3D World", Icon: Globe2 },
  { id: "campaign" as const, label: "Campaign", Icon: ScrollText },
  { id: "character" as const, label: "Hero", Icon: Sparkles },
  { id: "progress" as const, label: "Progress", Icon: LineChart },
] as const;

export function BottomNav({
  activeTab,
  onSelectTab,
}: {
  activeTab: AscensionSubTab;
  onSelectTab: (tab: AscensionSubTab) => void;
}) {
  return (
    <nav
      aria-label="Ascension Navigation"
      className="sticky bottom-0 z-30 border-t border-border/80 bg-card/98 py-1 backdrop-blur-md mt-4 rounded-b-xl shadow-lg"
    >
      <ul className="mx-auto flex max-w-xl items-center justify-between px-1 gap-0.5 overflow-x-auto">
        {ITEMS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <li key={id} className="flex-1 min-w-[50px]">
              <button
                type="button"
                onClick={() => {
                  haptic("tick");
                  onSelectTab(id);
                }}
                className={`press-pop flex min-h-[44px] w-full flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 text-[10px] sm:text-[11px] font-medium transition-colors ${
                  active
                    ? "text-primary font-bold bg-primary/10 shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <Icon className={`size-4 sm:size-4.5 transition-transform ${active ? "scale-110 text-primary" : ""}`} aria-hidden="true" />
                <span className="truncate max-w-[56px] text-center">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
