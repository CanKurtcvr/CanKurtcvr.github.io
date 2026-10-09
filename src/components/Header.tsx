import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, Github, Printer, Copy, Check, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import ContactDialog from "./ContactDialog";

interface HeaderProps {
  onPrintCV?: (lang?: "da" | "en") => void;
}

const Header = ({ onPrintCV }: HeaderProps = {}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} ${t("header.copied", "kopieret til udklipsholder!")}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = (printLang: "da" | "en" = language) => {
    if (onPrintCV) {
      onPrintCV(printLang);
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
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Top action bar: Language Switcher, Theme toggle & Print Buttons */}
      <div className="relative z-20 flex flex-wrap justify-end items-center gap-2 px-4 sm:px-6 pt-4 max-w-4xl mx-auto">
        {/* Flag Language Switcher */}
        <div className="flex items-center bg-black/20 backdrop-blur-md rounded-full p-1 border border-white/10 mr-auto sm:mr-0">
          <button
            type="button"
            onClick={() => setLanguage("da")}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              language === "da"
                ? "bg-accent text-accent-foreground shadow-sm scale-105"
                : "text-header-foreground/70 hover:text-header-foreground hover:bg-white/10"
            }`}
            title="Skift til dansk"
            aria-label="Skift til dansk"
          >
            <span className="text-sm">🇩🇰</span>
            <span>DA</span>
          </button>

          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              language === "en"
                ? "bg-accent text-accent-foreground shadow-sm scale-105"
                : "text-header-foreground/70 hover:text-header-foreground hover:bg-white/10"
            }`}
            title="Switch to English"
            aria-label="Switch to English"
          >
            <span className="text-sm">🇬🇧</span>
            <span>EN</span>
          </button>
        </div>

        {/* Print / Download Buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePrint("da")}
          className="text-header-foreground/80 hover:text-header-foreground hover:bg-white/10 gap-1.5 text-xs"
          title="Print eller gem dansk CV som PDF"
        >
          <Printer className="w-3.5 h-3.5 text-accent" />
          <span className="hidden md:inline">{t("header.printDanish", "CV (Dansk)")}</span>
          <span className="inline md:hidden">CV 🇩🇰</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePrint("en")}
          className="text-header-foreground/80 hover:text-header-foreground hover:bg-white/10 gap-1.5 text-xs"
          title="Download or print English CV as PDF"
        >
          <Download className="w-3.5 h-3.5 text-accent" />
          <span className="hidden md:inline">{t("header.printEnglish", "CV (English)")}</span>
          <span className="inline md:hidden">CV 🇬🇧</span>
        </Button>

        <ThemeToggle />
      </div>
      
      <div className="relative z-10 px-6 pb-12 pt-4 md:pb-16 text-center max-w-4xl mx-auto">
        {/* Profile Image / Monogram */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/80 p-1 shadow-xl overflow-hidden">
            <div className="w-full h-full rounded-full bg-header flex items-center justify-center text-4xl font-display font-bold text-accent select-none">
              CK
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3"
        >
          Can Kurt
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base md:text-lg text-header-foreground/80 mb-2 font-medium max-w-2xl mx-auto"
        >
          {t("header.title", "Kandidatstuderende i Digital Transformation & IT-konsulent")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-sm md:text-base text-header-foreground/60 mb-5 italic"
        >
          {t("header.quote", '"Udvikling er mit mindset – IT og forretning er mine værktøjer."')}
        </motion.p>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <ContactDialog />
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-sm md:text-base"
        >
          <span className="flex items-center gap-1.5 text-header-foreground/60">
            <MapPin className="w-4 h-4 text-accent/80" />
            {t("header.location", "København, Danmark")}
          </span>
          
          <div className="flex items-center gap-1">
            <a
              href="tel:+4528701213"
              className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +45 28 70 12 13
            </a>
            <button
              onClick={() => copyToClipboard("+4528701213", "Telefonnummer")}
              className="p-1 text-header-foreground/40 hover:text-accent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              title={copiedField === "Telefonnummer" ? "Telefonnummer kopieret!" : "Kopiér telefonnummer"}
              aria-label={copiedField === "Telefonnummer" ? "Telefonnummer kopieret!" : "Kopiér telefonnummer"}
            >
              {copiedField === "Telefonnummer" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <a
              href="mailto:cankurtcvr@gmail.com"
              className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              cankurtcvr@gmail.com
            </a>
            <button
              onClick={() => copyToClipboard("cankurtcvr@gmail.com", "Email")}
              className="p-1 text-header-foreground/40 hover:text-accent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              title={copiedField === "Email" ? "Email kopieret!" : "Kopiér email"}
              aria-label={copiedField === "Email" ? "Email kopieret!" : "Kopiér email"}
            >
              {copiedField === "Email" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          
          <a
            href="https://linkedin.com/in/canxkurt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
            <span className="sr-only"> (åbner i et nyt vindue)</span>
          </a>

          <a
            href="https://github.com/CanKurtcvr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
            <span className="sr-only"> (åbner i et nyt vindue)</span>
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
