import { Link } from "@tanstack/react-router";
import { CalendarCheck, Layers, Globe2, Sparkles, LineChart } from "lucide-react";
import { haptic } from "@/lib/ascension/haptics";

const ITEMS = [
  { to: "/", label: "Today", Icon: CalendarCheck },
  { to: "/cards", label: "Cards", Icon: Layers },
  { to: "/world", label: "World", Icon: Globe2 },
  { to: "/character", label: "Character", Icon: Sparkles },
  { to: "/progress", label: "Progress", Icon: LineChart },
] as const;

/** Thumb-zone navigation: 48px+ targets, bottom anchored, safe-area aware. */
export function BottomNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-1 py-1.5">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              onClick={() => haptic("tick")}
              className="press-pop flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors"
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-primary" }}
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
