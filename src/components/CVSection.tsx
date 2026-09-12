import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cvItems, CVCategory } from "@/data/cvData";
import SkillsSection from "./SkillsSection";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Briefcase, GraduationCap, HeartHandshake, Printer } from "lucide-react";

export default function CVSection() {
  const [selectedCategory, setSelectedCategory] = useState<CVCategory>("all");

  const categories = useMemo(() => [
    { id: "all" as CVCategory, label: "Alle", icon: Sparkles, count: cvItems.length },
    { id: "it" as CVCategory, label: "IT & Digitalisering", icon: Briefcase, count: cvItems.filter(i => i.category === "it").length },
    { id: "uddannelse" as CVCategory, label: "Uddannelse", icon: GraduationCap, count: cvItems.filter(i => i.category === "uddannelse").length },
    { id: "omsorg" as CVCategory, label: "Omsorg & Formidling", icon: HeartHandshake, count: cvItems.filter(i => i.category === "omsorg").length },
  ], []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return cvItems;
    return cvItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="cv" className="py-6 space-y-12">
      {/* Faglige Kompetencer */}
      <SkillsSection />

      {/* Profil & Erfaring */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Erfaring & Uddannelsesforløb
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Ambitiøs profil med en stærk og alsidig baggrund inden for IT, dataanalyse og formidling. Klik på et kort for at dykke ned i detaljerne, eller download det komplette CV som selvstændigt PDF-dokument.
          </p>
          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-2 rounded-full border-primary/30 hover:border-primary text-xs md:text-sm hover:bg-primary/5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-primary" />
              <span>Hent / Print CV (Standalone PDF med interaktivt indeks)</span>
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
    </section>
  );
}
