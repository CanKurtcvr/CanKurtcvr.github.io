import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import CVSection from "@/components/CVSection";
import WeatherSection from "@/components/WeatherSection";
import NewsSection from "@/components/NewsSection";
import GamesSection from "@/components/GamesSection";
import BusinessProjectsSection from "@/components/BusinessProjectsSection";

type TabType = "cv" | "weather" | "news" | "games" | "projects";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("cv");

  return (
    <div className="min-h-screen bg-background print:bg-white print:min-h-0">
      <div className="max-w-4xl mx-auto bg-card shadow-xl min-h-screen print:shadow-none print:max-w-none print:w-full print:m-0">
        
        {/* Header skjules ved print */}
        <div className="print:hidden">
          <Header />
        </div>
        
        {/* Navigation skjules ved print */}
        <div className="print:hidden">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        <main className="p-6 md:p-8 print:p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="print:block"
            >
              {activeTab === "cv" && <CVSection />}
              {activeTab === "projects" && <BusinessProjectsSection />}
              {activeTab === "weather" && <WeatherSection />}
              {activeTab === "news" && <NewsSection />}
              {activeTab === "games" && <GamesSection />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer skjules ved print */}
        <footer className="border-t border-border py-6 px-8 text-center text-sm text-muted-foreground print:hidden">
          <p>© {new Date().getFullYear()} Med Venlig Hilsen - Can Kurt </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
