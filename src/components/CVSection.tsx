import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cvItems, CVCategory } from "@/data/cvData";
import SkillsSection from "./SkillsSection";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Briefcase, GraduationCap, HeartHandshake, Printer, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CVSection() {
  const [selectedCategory, setSelectedCategory] = useState<CVCategory>("all");
  const { language, t } = useLanguage();

  const isEn = language === "en";

  const categories = useMemo(() => [
    { id: "all" as CVCategory, label: t("cv.catAll", "Alle"), icon: Sparkles, count: cvItems.length },
    { 
      id: "it" as CVCategory, 
      label: t("cv.catIT", "IT & Digitalisering"),
      icon: Briefcase, 
      count: cvItems.filter(i => i.category === "it" || i.tags.includes("Informatik") || i.tags.includes("Digital Transformation")).length 
    },
    { id: "uddannelse" as CVCategory, label: t("cv.catEdu", "Uddannelse"), icon: GraduationCap, count: cvItems.filter(i => i.category === "uddannelse").length },
    { id: "omsorg" as CVCategory, label: t("cv.catCare", "Omsorg & Formidling"), icon: HeartHandshake, count: cvItems.filter(i => i.category === "omsorg").length },
  ], [t]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return cvItems;
    if (selectedCategory === "it") {
      return cvItems.filter(item => item.category === "it" || item.tags.includes("Informatik") || item.tags.includes("Digital Transformation"));
    }
    return cvItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handlePrint = (lang: "da" | "en") => {
    window.print();
  };

  return (
    <section id="cv" className="py-6 space-y-12">
      {/* Faglige Kompetencer */}
      <SkillsSection />

      {/* Profil & Erfaring */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-display font-bold text-foreground">
            {t("cv.experienceTitle", "Erfaring & Uddannelsesforløb")}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {t("cv.experienceSubtitle", "Ambitiøs profil med en stærk og alsidig baggrund inden for IT, dataanalyse og formidling. Klik på et kort for at dykke ned i detaljerne, eller hent det komplette CV som PDF.")}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePrint("da")}
              className="gap-2 rounded-full border-primary/30 hover:border-primary text-xs md:text-sm hover:bg-primary/5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-primary" />
              <span>{t("cv.downloadDa", "Hent / Print CV (Dansk PDF)")}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePrint("en")}
              className="gap-2 rounded-full border-primary/30 hover:border-primary text-xs md:text-sm hover:bg-primary/5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span>{t("cv.downloadEn", "Download CV (English PDF)")}</span>
            </Button>
          </div>
        </div>

        {/* Filter Chips */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
          role="group"
          aria-label="Filtrer CV efter kategori"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <Button
                key={cat.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`gap-2 rounded-full text-xs md:text-sm transition-all ${
                  isActive ? "bg-accent text-accent-foreground hover:bg-accent/90" : "hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
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
            {filteredItems.map((item) => {
              const title = isEn && item.titleEn ? item.titleEn : item.title;
              const org = isEn && item.organizationEn ? item.organizationEn : item.organization;
              const period = isEn && item.periodEn ? item.periodEn : item.period;
              const type = isEn && item.typeEn ? item.typeEn : item.type;
              const desc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
              const tags = isEn && item.tagsEn ? item.tagsEn : item.tags;

              return (
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
                            {type}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-medium">
                            {period}
                          </span>
                        </div>
                        <CardTitle className="text-lg md:text-xl font-bold">
                          {title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-foreground/80">
                          {org}
                        </CardDescription>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed pt-1">
                          {desc}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((tag) => (
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
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
