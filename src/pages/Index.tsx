import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import CVSection from "@/components/CVSection";
import WeatherSection from "@/components/WeatherSection";
import NewsSection from "@/components/NewsSection";
import GamesSection from "@/components/GamesSection";
import ProjectsSection from "@/components/ProjectsSection";

type TabType = "cv" | "weather" | "news" | "games" | "projects";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("cv");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleNavigateToGame = (gameId: string) => {
    setSelectedGame(gameId);
    setActiveTab("games");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== "games") {
      setSelectedGame(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:min-h-0 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-card shadow-xl min-h-screen print:shadow-none print:max-w-none print:w-full print:m-0 border-x border-border/40">
        
        {/* Header skjules ved print */}
        <div className="print:hidden">
          <Header />
        </div>
        
        {/* Navigation skjules ved print */}
        <div className="print:hidden">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        
        <main 
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="p-4 sm:p-6 md:p-8 print:p-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="print:block"
            >
              {activeTab === "cv" && <CVSection />}
              {activeTab === "projects" && <ProjectsSection onNavigateToGame={handleNavigateToGame} />}
              {activeTab === "games" && <GamesSection selectedGame={selectedGame} onSelectGame={setSelectedGame} />}
              {activeTab === "weather" && <WeatherSection />}
              {activeTab === "news" && <NewsSection />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer skjules ved print */}
        <footer className="border-t border-border py-6 px-8 text-center text-xs sm:text-sm text-muted-foreground print:hidden space-y-1">
          <p>© {new Date().getFullYear()} Can Kurt</p>
          <p className="text-xs text-muted-foreground/70">Kandidatstuderende i Digital Transformation · Roskilde Universitet</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
