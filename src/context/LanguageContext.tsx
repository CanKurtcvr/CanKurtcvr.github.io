import React, { createContext, useContext, useState } from "react";

export type Language = "da" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  da: {
    // Header
    "header.title": "Kandidatstuderende i Digital Transformation & IT-konsulent",
    "header.quote": '"Udvikling er mit mindset – IT og forretning er mine værktøjer."',
    "header.location": "København, Danmark",
    "header.printDanish": "Hent / Print CV (Dansk)",
    "header.printEnglish": "Download CV (English)",
    "header.contact": "Kontakt mig",
    "header.copied": "kopieret til udklipsholder!",

    // Tabs
    "nav.cv": "CV & Erfaring",
    "nav.projects": "Projekter & Tools",
    "nav.games": "Spil & Arkade",
    "nav.weather": "Vejr",
    "nav.news": "Nyheder",

    // CV Section
    "cv.skillsTitle": "Faglige Kompetencer",
    "cv.experienceTitle": "Erfaring & Uddannelsesforløb",
    "cv.experienceSubtitle": "Ambitiøs profil med en stærk og alsidig baggrund inden for IT, dataanalyse og formidling. Klik på et kort for at dykke ned i detaljerne, eller hent det komplette CV som PDF.",
    "cv.downloadDa": "Hent / Print CV (Dansk PDF)",
    "cv.downloadEn": "Download CV (English PDF)",
    "cv.catAll": "Alle",
    "cv.catIT": "IT & Digitalisering",
    "cv.catEdu": "Uddannelse",
    "cv.catCare": "Omsorg & Formidling",

    // Games Section
    "games.choose": "Vælg et spil",
    "games.subtitle": "Tag en hurtig udfordring eller træd ind i Ascension Cards for en mere dybdegående rejse.",
    "games.back": "Tilbage til spil",
    "games.playNow": "Spil nu →",

    // Projects Section
    "projects.title": "Udvalgte Projekter & Værktøjer",
    "projects.subtitle": "Udforsk interaktive web-apps, finansielle simuleringsværktøjer og tekniske showcases.",

    // General
    "footer.rights": "© 2026 Can Kurt",
    "footer.subtitle": "Kandidatstuderende i Digital Transformation · Roskilde Universitet",
  },
  en: {
    // Header
    "header.title": "MSc Student in Digital Transformation & IT Consultant",
    "header.quote": '"Growth is my mindset – IT and business are my tools."',
    "header.location": "Copenhagen, Denmark",
    "header.printDanish": "Print CV (Danish)",
    "header.printEnglish": "Download CV (English)",
    "header.contact": "Contact Me",
    "header.copied": "copied to clipboard!",

    // Tabs
    "nav.cv": "CV & Experience",
    "nav.projects": "Projects & Tools",
    "nav.games": "Games & Arcade",
    "nav.weather": "Weather",
    "nav.news": "News",

    // CV Section
    "cv.skillsTitle": "Professional Skills",
    "cv.experienceTitle": "Experience & Education",
    "cv.experienceSubtitle": "Ambitious profile with a strong and versatile background in IT, data analysis, and communication. Click on any card for details, or download the full CV as a PDF.",
    "cv.downloadDa": "Download CV (Danish PDF)",
    "cv.downloadEn": "Download CV (English PDF)",
    "cv.catAll": "All",
    "cv.catIT": "IT & Digitalization",
    "cv.catEdu": "Education",
    "cv.catCare": "Care & Communication",

    // Games Section
    "games.choose": "Choose your game",
    "games.subtitle": "Pick a short challenge or enter Ascension Cards for a slower, more reflective journey.",
    "games.back": "Back to games",
    "games.playNow": "Play now →",

    // Projects Section
    "projects.title": "Featured Projects & Tools",
    "projects.subtitle": "Explore interactive web applications, financial simulation tools, and technical showcases.",

    // General
    "footer.rights": "© 2026 Can Kurt",
    "footer.subtitle": "MSc Student in Digital Transformation · Roskilde University",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage");
    return saved === "en" || saved === "da" ? saved : "da";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const t = (key: string, defaultText?: string): string => {
    return translations[language]?.[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
