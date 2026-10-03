import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, Github, Printer, Copy, Check, Briefcase } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Language, translations, getLanguageLabel } from "@/lib/translations";

import ContactDialog from "./ContactDialog";

interface HeaderProps {
  onPrintCV?: () => void;
  onNavigateToProjects?: () => void;
  language?: Language;
  onLanguageChange?: (language: Language) => void;
}

const Header = ({ onPrintCV, onNavigateToProjects, language = "da", onLanguageChange }: HeaderProps = {}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const t = translations[language];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} ${language === "da" ? "kopieret til udklipsholder!" : "copied to clipboard!"}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = () => {
    if (onPrintCV) {
      onPrintCV();
    } else {
      window.print();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-header text-header-foreground"
      style={{ background: "var(--gradient-header)" }}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-20 flex flex-wrap justify-end items-center gap-2 px-3 sm:px-6 pt-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {(["da", "en"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onLanguageChange?.(lang)}
              className={`rounded-full px-2 py-1 text-[10px] font-semibold transition-colors ${
                language === lang ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
              }`}
              aria-label={`Switch language to ${lang.toUpperCase()}`}
            >
              {getLanguageLabel(lang)}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrint}
          className="text-header-foreground/70 hover:text-header-foreground hover:bg-white/10 gap-1.5 text-xs md:text-sm"
          title={language === "da" ? "Udskriv eller gem som PDF" : "Print or save as PDF"}
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.printButton}</span>
        </Button>
        <ThemeToggle />
      </div>
      
      <div className="relative z-10 px-6 pb-12 pt-4 md:pb-16 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/80 p-1 shadow-xl overflow-hidden">
            <div className="w-full h-full rounded-full bg-header flex items-center justify-center text-4xl font-display font-bold text-accent select-none">
              NH
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3"
        >
          Nassim Hassani
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base md:text-lg text-header-foreground/80 mb-2 font-medium max-w-2xl mx-auto"
        >
          {t.heroTitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-sm md:text-base text-header-foreground/60 mb-5 italic"
        >
          {t.heroQuote}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.47, duration: 0.5 }}
          className="mx-auto mb-5 inline-flex rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
        >
          {t.heroAvailability}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5 }}
          className="mb-6 flex flex-wrap justify-center gap-2.5"
        >
          <ContactDialog language={language} />
          {onNavigateToProjects && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToProjects}
              className="gap-2 rounded-full border-white/20 bg-white/5 font-semibold text-header-foreground hover:bg-white/10 hover:text-header-foreground"
            >
              <Briefcase className="w-4 h-4" />
              <span>{t.projectsCta}</span>
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-sm md:text-base"
        >
          <span className="flex items-center gap-1.5 text-header-foreground/60">
            <MapPin className="w-4 h-4 text-accent/80" />
            {t.location}
          </span>
          
          <div className="flex items-center gap-1">
            <a
              href="tel:+4524770784"
              className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +45 24 77 07 84
            </a>
            <button
              onClick={() => copyToClipboard("+4524770784", language === "da" ? "Telefonnummer" : "Phone number")}
              className="p-1 text-header-foreground/40 hover:text-accent transition-colors"
              title={language === "da" ? "Kopiér telefonnummer" : "Copy phone number"}
              aria-label={language === "da" ? "Kopiér telefonnummer" : "Copy phone number"}
            >
              {copiedField === (language === "da" ? "Telefonnummer" : "Phone number") ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <a
              href="mailto:naselh01@gmail.com"
              className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              naselh01@gmail.com
            </a>
            <button
              onClick={() => copyToClipboard("naselh01@gmail.com", language === "da" ? "Email" : "Email")}
              className="p-1 text-header-foreground/40 hover:text-accent transition-colors"
              title={language === "da" ? "Kopiér email" : "Copy email"}
              aria-label={language === "da" ? "Kopiér email" : "Copy email"}
            >
              {copiedField === "Email" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          
          <a
            href="https://www.linkedin.com/in/nassim-hassani-63835a220"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>

          <a
            href="https://github.com/NassimElH01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
