import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import CVSection from "@/components/CVSection";
import { useLanguage } from "@/context/LanguageContext";

// ⚡ Bolt: Lazy load heavy non-default tabs to drastically reduce initial JS bundle size & improve initial page load time
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const GamesSection = lazy(() => import("@/components/GamesSection"));
const WeatherSection = lazy(() => import("@/components/WeatherSection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const PrintCVDocument = lazy(() => import("@/components/PrintCVDocument"));

const TabFallback = () => (
  <div className="flex items-center justify-center py-16 text-muted-foreground text-sm animate-pulse">
    Henter indhold...
  </div>
);

type TabType = "cv" | "weather" | "news" | "games" | "projects";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("cv");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [printLang, setPrintLang] = useState<"da" | "en">("da");
  const { language, t } = useLanguage();

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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== "games") {
      setSelectedGame(null);
    }
  };

  const handlePrintCV = (lang: "da" | "en" = language) => {
    setPrintLang(lang);
    setActiveTab("cv");
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:min-h-0 transition-colors duration-300">
      {/* Screen View: Interactive Portfolio */}
      <div className="print:hidden max-w-4xl mx-auto bg-card shadow-xl min-h-screen border-x border-border/40">
        <Header onPrintCV={handlePrintCV} />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main 
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="p-4 sm:p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<TabFallback />}>
                {activeTab === "cv" && <CVSection />}
                {activeTab === "projects" && <ProjectsSection onNavigateToGame={handleNavigateToGame} />}
                {activeTab === "games" && <GamesSection selectedGame={selectedGame} onSelectGame={setSelectedGame} />}
                {activeTab === "weather" && <WeatherSection />}
                {activeTab === "news" && <NewsSection />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-border py-6 px-8 text-center text-xs sm:text-sm text-muted-foreground space-y-1">
          <p>{t("footer.rights", "© 2026 Can Kurt")}</p>
          <p className="text-xs text-muted-foreground/70">{t("footer.subtitle", "Kandidatstuderende i Digital Transformation · Roskilde Universitet")}</p>
        </footer>
      </div>

      {/* Print View: Complete In-Depth Curriculum Vitae Document */}
      <div className="hidden print:block w-full">
        <Suspense fallback={null}>
          <PrintCVDocument language={printLang} />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
