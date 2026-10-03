import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cvItems, CVCategory } from "@/data/cvData";
import SkillsSection from "./SkillsSection";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Briefcase, GraduationCap, HeartHandshake, Printer } from "lucide-react";
import { Language, translations } from "@/lib/translations";

export default function CVSection({ language = "da" }: { language?: Language }) {
  const t = translations[language].cvSection;
  const [selectedCategory, setSelectedCategory] = useState<CVCategory>("all");

  const categories = useMemo(() => [
    { id: "all" as CVCategory, label: t.all, icon: Sparkles, count: cvItems.length },
    { 
      id: "it" as CVCategory, 
      label: t.it,
      icon: Briefcase, 
      count: cvItems.filter(i => i.category === "it" || i.tags.includes("Informatik") || i.tags.includes("Digital Transformation")).length 
    },
    { id: "uddannelse" as CVCategory, label: t.education, icon: GraduationCap, count: cvItems.filter(i => i.category === "uddannelse").length },
    { id: "omsorg" as CVCategory, label: t.care, icon: HeartHandshake, count: cvItems.filter(i => i.category === "omsorg").length },
  ], [t]);
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return cvItems;
    if (selectedCategory === "it") {
      return cvItems.filter(item => item.category === "it" || item.tags.includes("Informatik") || item.tags.includes("Digital Transformation"));
    }
    return cvItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="cv" className="py-6 space-y-12">
      <section aria-labelledby="profile-overview-title" className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8 md:p-10">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent/70" />
        <div className="relative z-10 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{t.profileEyebrow}</p>
              <h2 id="profile-overview-title" className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                {t.profileTitle}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {t.profileDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label={language === "da" ? "Faglige fokusområder" : "Areas of expertise"}>
              {t.profileCapabilities.map((capability) => (
                <span key={capability} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/75">
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-1">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t.profileProofLabel}</p>
            <div className="divide-y divide-border/80">
              {t.profileHighlights.map((highlight, index) => (
                <article key={highlight.label} className="grid grid-cols-[2rem_1fr] gap-3 py-4 first:pt-3 last:pb-1">
                  <span aria-hidden="true" className="pt-0.5 font-mono text-xs font-semibold text-accent/80">0{index + 1}</span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{highlight.label}</p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground sm:text-base">{highlight.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{highlight.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Profil & Erfaring */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{language === "da" ? "Karriere & uddannelse" : "Career & education"}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground md:text-base">
            {t.description}
          </p>
          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-2 rounded-full border-primary/30 hover:border-primary text-xs md:text-sm hover:bg-primary/5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-primary" />
              <span>{t.print}</span>
            </Button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <Button
                key={cat.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={`gap-2 rounded-full text-xs md:text-sm transition-all ${
                  isActive ? "bg-accent text-accent-foreground hover:bg-accent/90" : "hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {cat.count}
                </span>
              </Button>
            );
          })}
        </div>
        
        {/* Experience Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Link
                  to={`/cv/${item.id}`}
                  state={{ cvData: item }}
                  className="block h-full transition-transform hover:-translate-y-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                >
                  <Card className="h-full hover:border-primary/50 hover:shadow-md cursor-pointer transition-colors flex flex-col justify-between">
                    <CardHeader className="space-y-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium">
                          {item.period}
                        </span>
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-foreground/80">
                        {item.organization}
                      </CardDescription>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <SkillsSection language={language} />
    </section>
  );
}
