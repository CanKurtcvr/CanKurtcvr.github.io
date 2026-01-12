import { motion } from "framer-motion";
import { FileText, Cloud, Newspaper, Gamepad2, Briefcase } from "lucide-react";

type TabType = "cv" | "weather" | "news" | "games" | "projects";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "cv" as TabType, label: "My CV", icon: FileText },
  { id: "projects" as TabType, label: "Erhvervsprojekter", icon: Briefcase },
  { id: "weather" as TabType, label: "Weather", icon: Cloud },
  { id: "news" as TabType, label: "News", icon: Newspaper },
  { id: "games" as TabType, label: "Games", icon: Gamepad2 },
];

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm md:text-base font-medium transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
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
