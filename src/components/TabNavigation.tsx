import { motion } from "framer-motion";
import { FileText, Cloud, Newspaper, Gamepad2, Briefcase } from "lucide-react";
import { Language, translations } from "@/lib/translations";

type TabType = "cv" | "weather" | "news" | "games" | "projects";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
}

const TabNavigation = ({ activeTab, onTabChange, language }: TabNavigationProps) => {
  const t = translations[language].tabs;
  const tabs = [
    { id: "cv" as TabType, label: t.cv, icon: FileText },
    { id: "projects" as TabType, label: t.projects, icon: Briefcase },
    { id: "games" as TabType, label: t.games, icon: Gamepad2 },
    { id: "weather" as TabType, label: t.weather, icon: Cloud },
    { id: "news" as TabType, label: t.news, icon: Newspaper },
  ];
  return (
    <nav className="sticky top-0 z-40 border-b border-border/80 bg-card/95 backdrop-blur-md" aria-label={language === "da" ? "Hovednavigation" : "Main navigation"}>
      <div className="mx-auto max-w-6xl overflow-x-auto px-2 sm:px-6 lg:px-10">
        <div className="flex min-w-max overflow-x-auto" role="tablist" aria-orientation="horizontal">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 px-4 sm:px-5 py-4 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;
