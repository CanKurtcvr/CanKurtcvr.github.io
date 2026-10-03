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
  const profileIcons = [Briefcase, Briefcase, GraduationCap];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return cvItems;
    if (selectedCategory === "it") {
      return cvItems.filter(item => item.category === "it" || item.tags.includes("Informatik") || item.tags.includes("Digital Transformation"));
    }
    return cvItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="cv" className="py-6 space-y-12">
      <section aria-labelledby="profile-overview-title" className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-5 sm:p-7">
        <div className="relative z-10 space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t.profileEyebrow}</p>
            <h2 id="profile-overview-title" className="max-w-3xl text-2xl font-display font-bold leading-tight text-foreground sm:text-3xl">
              {t.profileTitle}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.profileDescription}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {t.profileHighlights.map((highlight, index) => {
              const Icon = profileIcons[index] ?? GraduationCap;
              return (
                <article key={highlight.label} className="rounded-xl border border-border/70 bg-background/75 p-4 shadow-xs">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{highlight.label}</span>
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold leading-snug text-foreground">{highlight.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{highlight.detail}</p>
                  <p className="mt-3 text-[11px] font-medium text-primary">{highlight.period}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profil & Erfaring */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-display font-bold text-foreground">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
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
