import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative rounded-full w-9 h-9 hover:bg-white/10 transition-colors ${className || ""}`}
      title={theme === "dark" ? "Skift til lyst tema" : "Skift til mørkt tema"}
      aria-label="Skift farvetema"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0 text-amber-400" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100 text-blue-300" />
      <span className="sr-only">Skift farvetema</span>
    </Button>
  );
}

export default ThemeToggle;
