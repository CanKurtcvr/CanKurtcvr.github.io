import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, Github, Printer, Copy, Check, Briefcase, ArrowDownRight, Sparkles } from "lucide-react";
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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative isolate overflow-hidden bg-header text-header-foreground"
      style={{ background: "var(--gradient-header)" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-48 h-[32rem] w-[32rem] rounded-full border border-white/[0.07] md:right-8 md:top-[-25rem] md:h-[54rem] md:w-[54rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl md:right-[12%] md:top-16" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex min-h-16 items-center justify-between border-b border-white/10 py-3">
          <a href="/" className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Nassim Hassani">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground">NH</span>
            <span className="text-sm font-semibold tracking-wide text-white">NASSIM HASSANI<span className="ml-2 hidden font-normal text-white/45 sm:inline">/ PORTFOLIO</span></span>
          </a>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
              {(["da", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange?.(lang)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide transition-colors ${
                    language === lang ? "bg-white/15 text-white" : "text-white/55 hover:text-white"
                  }`}
                  aria-label={`Switch language to ${lang.toUpperCase()}`}
                  aria-pressed={language === lang}
                >
                  {getLanguageLabel(lang)}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="hidden gap-1.5 text-xs text-white/65 hover:bg-white/10 hover:text-white sm:inline-flex"
              title={language === "da" ? "Udskriv eller gem som PDF" : "Print or save as PDF"}
            >
              <Printer className="h-3.5 w-3.5" />
              {t.printButton}
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <div className="grid items-center gap-10 py-12 sm:py-16 md:grid-cols-[1.25fr_0.75fr] md:gap-12 md:py-20">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.4 }}
              className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs"
            >
              <span className="h-px w-7 bg-accent" />
              {t.heroEyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            >
              {t.heroHeadline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base"
            >
              {t.heroQuote}
            </motion.p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-white/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t.heroAvailability}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-white/40" />
                {t.location}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <ContactDialog language={language} />
              {onNavigateToProjects && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNavigateToProjects}
                  className="gap-2 rounded-full border-white/20 bg-white/[0.04] px-5 font-semibold text-white hover:bg-white/10 hover:text-white"
                >
                  <Briefcase className="h-4 w-4" />
                  {t.projectsCta}
                  <ArrowDownRight className="h-3.5 w-3.5" />
                </Button>
              )}
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs text-white/55">
              <a href="mailto:naselh01@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <Mail className="h-3.5 w-3.5" /> naselh01@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/nassim-hassani-63835a220" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a href="https://github.com/NassimElH01" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a href="tel:+4524770784" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <Phone className="h-3.5 w-3.5" /> +45 24 77 07 84
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard("naselh01@gmail.com", "Email")}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                title={language === "da" ? "Kopiér email" : "Copy email"}
                aria-label={language === "da" ? "Kopiér email" : "Copy email"}
              >
                {copiedField === "Email" ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            aria-label={t.heroFocusTitle}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-3 rotate-[-4deg] rounded-[2rem] border border-white/10" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm sm:p-7">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> {t.heroFocusTitle}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/55">2026 — 2028</span>
              </div>
              <div className="my-8 flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 via-white/[0.04] to-transparent">
                <span className="font-display text-8xl font-bold tracking-[-0.1em] text-white/90">NH<span className="text-accent">.</span></span>
              </div>
              <p className="text-xs font-medium text-white/45">{t.heroTitle}</p>
              <div className="mt-5 space-y-3">
                {t.heroFocusAreas.map((area, index) => (
                  <div key={area} className="flex items-center gap-3 border-t border-white/[0.08] pt-3">
                    <span className="font-mono text-[10px] text-accent/80">0{index + 1}</span>
                    <span className="text-sm font-medium text-white/85">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
