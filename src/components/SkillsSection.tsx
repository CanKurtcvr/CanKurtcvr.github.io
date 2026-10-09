import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Cpu, Languages, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

export interface SkillCategory {
  title: string;
  icon: typeof Code2;
  description: string;
  skills: string[];
  color: string;
}

export const getSkillCategories = (isEn: boolean): SkillCategory[] => [
  {
    title: isEn ? "Development & Programming" : "Udvikling & Programmering",
    icon: Code2,
    color: "text-blue-500",
    description: isEn
      ? "Modern web engineering, frontend architecture, and interactive web applications."
      : "Moderne webudvikling, frontend-arkitektur og interaktive systemer.",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Tailwind CSS",
      "Python",
      "SQL & Databases",
      "Three.js (WebGL)",
      "HTML5 & CSS3",
      "Git & GitHub"
    ]
  },
  {
    title: isEn ? "Data Analysis & Systems" : "Dataanalyse & Systemer",
    icon: Database,
    color: "text-emerald-500",
    description: isEn
      ? "Data validation, troubleshooting, and financial case reconstruction."
      : "Datavalidering, fejlretning og håndtering af komplekse datasæt.",
    skills: [
      isEn ? "Advanced Excel" : "Avanceret Excel",
      isEn ? "Data Modeling" : "Datamodellering",
      isEn ? "Big Data Troubleshooting" : "Fejlretning i stordata",
      isEn ? "KPI & Budgeting" : "KPI & Budgetstyring",
      "REST APIs",
      isEn ? "Case Reconstruction" : "Sagsrekonstruktion",
      isEn ? "Quality Assurance" : "Kvalitetssikring"
    ]
  },
  {
    title: isEn ? "Digitalization & Strategy" : "Digitalisering & Strategi",
    icon: Cpu,
    color: "text-amber-500",
    description: isEn
      ? "IT strategy, digital transformation, and bridging technology with business strategy."
      : "IT-strategi, digital omstilling og bindeled mellem forretning og teknik.",
    skills: [
      isEn ? "MSc: Digital Transformation (RUC)" : "Kandidat: Digital Transformation (RUC)",
      isEn ? "BSc: Computer Science & Business (RUC)" : "Bachelor: Informatik & Virksomhedsstudier (RUC)",
      "Digital Transformation",
      isEn ? "IT Strategy & Leadership" : "IT-strategi & Ledelse",
      "UX/UI Research",
      isEn ? "Business Analysis" : "Forretningsanalyse",
      isEn ? "Process Optimization" : "Procesoptimering",
      isEn ? "Onboarding & Training" : "Onboarding & Oplæring",
      isEn ? "Socio-technical Systems" : "Systemisk tænkning"
    ]
  },
  {
    title: isEn ? "Communication & Languages" : "Formidling & Sprog",
    icon: Languages,
    color: "text-purple-500",
    description: isEn
      ? "Professional interpretation, stakeholder relations, and high ethical standards."
      : "Præcis tolkning, relationsopbygning og professionel etik.",
    skills: [
      isEn ? "Danish (Native)" : "Dansk (Modersmål)",
      isEn ? "English (Fluent)" : "Engelsk (Flydende)",
      isEn ? "Professional Interpreting" : "Professionel tolkning",
      isEn ? "Cross-disciplinary Dialogue" : "Tværfaglig dialog",
      isEn ? "Empathetic Leadership" : "Empatisk ledelse",
      isEn ? "Conflict De-escalation" : "Konfliktnedtrapning",
      isEn ? "Presentation Skills" : "Præsentationsteknik"
    ]
  }
];

export const skillCategories = getSkillCategories(false);

// ⚡ Bolt: Memoize SkillsSection to prevent unnecessary re-renders when switching category filters in parent CVSection
const SkillsSection = memo(function SkillsSection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const categories = useMemo(() => getSkillCategories(isEn), [isEn]);

  return (
    <div className="mb-12 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-display font-bold text-foreground">
          {isEn ? "Core Competencies & Tools" : "Faglige Kompetencer & Værktøjer"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isEn
            ? "An overview of my technical toolkit, analytical background, and business acumen."
            : "Et overblik over min tekniske værktøjskasse, analytiske profil og forretningsforståelse."}
        </p>
      </div>

      {/* Akademisk IT-Uddannelsesfundament */}
      <div className="p-4 md:p-5 rounded-xl border border-primary/25 bg-primary/5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm md:text-base">
            <div className="p-1.5 rounded-md bg-primary/15 text-primary">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span>{isEn ? "Academic IT & Business Foundation" : "Akademisk IT-Uddannelsesfundament"}</span>
          </div>
          <Badge variant="outline" className="border-primary/40 text-primary text-xs font-semibold">
            RUC
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-background/80 border border-border/60 space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-foreground">
                {isEn ? "MSc in Digital Transformation" : "Kandidat i Digital Transformation"}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                {isEn ? "Starts Sep. 2026" : "Start 2026"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isEn
                ? "Roskilde University (RUC) — Focus on IT strategy, digital process optimization, socio-technical system design, and technology leadership."
                : "Roskilde Universitet (RUC) — Fokus på IT-strategi, digital procesoptimering, socioteknisk systemdesign og teknologiledelse."}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-background/80 border border-border/60 space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-foreground">
                {isEn ? "BSc in Computer Science & Business Studies" : "Bachelor i Informatik & Virksomhedsstudier"}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">2021 - 2024</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isEn
                ? "Roskilde University (RUC) — Interdisciplinary integration of computer science, programming (Python, JS, SQL), data modeling, business economics, and UX."
                : "Roskilde Universitet (RUC) — Tværfaglig kobling af datalogi, programmering (Python, JavaScript, SQL), datamodellering, forretningsøkonomi og UX."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.title} className="hover:border-primary/40 transition-colors shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-muted">
                    <Icon className={`w-4 h-4 ${category.color}`} />
                  </div>
                  <span>{category.title}</span>
                </CardTitle>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-slate-100 dark:bg-slate-800/80 text-foreground/90 font-medium px-2.5 py-1 rounded-md border border-border/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

export default SkillsSection;
