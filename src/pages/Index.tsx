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
          <p>© {new Date().getFullYear()} Venlige hilsener, Can Kurt</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
