import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Cpu, Languages } from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: typeof Code2;
  description: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Udvikling & Programmering",
    icon: Code2,
    color: "text-blue-500",
    description: "Moderne webudvikling, frontend-arkitektur og interaktive systemer.",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Tailwind CSS",
      "Python",
      "SQL & Databaser",
      "Three.js (WebGL)",
      "HTML5 & CSS3",
      "Git & GitHub"
    ]
  },
  {
    title: "Dataanalyse & Systemer",
    icon: Database,
    color: "text-emerald-500",
    description: "Datavalidering, fejlretning og håndtering af komplekse datasæt.",
    skills: [
      "Avanceret Excel",
      "Datamodellering",
      "Fejlretning i stordata",
      "KPI & Budgetstyring",
      "REST API'er",
      "Sagsrekonstruktion",
      "Kvalitetssikring"
    ]
  },
  {
    title: "Digitalisering & Strategi",
    icon: Cpu,
    color: "text-amber-500",
    description: "IT-strategi, digital omstilling og bindeled mellem forretning og teknik.",
    skills: [
      "Digital Transformation",
      "IT-strategi & Ledelse",
      "UX/UI Research",
      "Forretningsanalyse",
      "Procesoptimering",
      "Onboarding & Oplæring",
      "Systemisk tænkning"
    ]
  },
  {
    title: "Formidling & Sprog",
    icon: Languages,
    color: "text-purple-500",
    description: "Præcis tolkning, relationsopbygning og professionel etik.",
    skills: [
      "Dansk (Modersmål)",
      "Engelsk (Flydende)",
      "Professionel tolkning",
      "Tværfaglig dialog",
      "Empatisk ledelse",
      "Konfliktnedtrapning",
      "Præsentationsteknik"
    ]
  }
];

export default function SkillsSection() {
  return (
    <div className="mb-12 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-display font-bold text-foreground">
          Faglige Kompetencer & Værktøjer
        </h3>
        <p className="text-sm text-muted-foreground">
          Et overblik over min tekniske værktøjskasse, analytiske profil og forretningsforståelse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category) => {
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
}
