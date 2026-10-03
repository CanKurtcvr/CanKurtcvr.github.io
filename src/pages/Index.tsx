import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import CVSection from "@/components/CVSection";
import WeatherSection from "@/components/WeatherSection";
import NewsSection from "@/components/NewsSection";
import GamesSection from "@/components/GamesSection";
import ProjectsSection from "@/components/ProjectsSection";

import PrintCVDocument from "@/components/PrintCVDocument";
import { Language, translations } from "@/lib/translations";

type TabType = "cv" | "weather" | "news" | "games" | "projects";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("cv");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem("profile-language");
    return savedLanguage === "en" ? "en" : "da";
  });
  const t = translations[language];

  useEffect(() => {
    window.localStorage.setItem("profile-language", language);
  }, [language]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") as TabType | null;
    const gameParam = params.get("game");
    if (tabParam && ["cv", "weather", "news", "games", "projects"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    if (gameParam) {
      setSelectedGame(gameParam);
    }
  }, []);

  const handleNavigateToGame = (gameId: string) => {
    setSelectedGame(gameId);
    setActiveTab("games");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToProjects = () => {
    setSelectedGame(null);
    setActiveTab("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== "games") {
      setSelectedGame(null);
    }
  };

  const handlePrintCV = () => {
    setActiveTab("cv");
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:min-h-0 transition-colors duration-300">
      {/* Screen View: Interactive Portfolio */}
      <div className="print:hidden max-w-4xl mx-auto bg-card shadow-xl min-h-screen border-x border-border/40">
        <Header
          onPrintCV={handlePrintCV}
          onNavigateToProjects={handleNavigateToProjects}
          language={language}
          onLanguageChange={setLanguage}
        />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} language={language} />
        
        <main 
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="p-3 sm:p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "cv" && <CVSection language={language} />}
              {activeTab === "projects" && <ProjectsSection language={language} onNavigateToGame={handleNavigateToGame} />}
              {activeTab === "games" && <GamesSection language={language} selectedGame={selectedGame} onSelectGame={setSelectedGame} />}
              {activeTab === "weather" && <WeatherSection language={language} />}
              {activeTab === "news" && <NewsSection language={language} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-border py-6 px-4 sm:px-8 text-center text-xs sm:text-sm text-muted-foreground space-y-1">
          <p>© {new Date().getFullYear()} Nassim Hassani</p>
          <p className="text-xs text-muted-foreground/70">{t.footer}</p>
        </footer>
      </div>

      {/* Print View: Complete In-Depth Curriculum Vitae Document */}
      <div className="hidden print:block w-full">
        <PrintCVDocument />
      </div>
    </div>
  );
};

export default Index;
