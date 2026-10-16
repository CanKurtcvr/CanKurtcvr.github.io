import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Cpu, Languages, GraduationCap, Brain, Gamepad2, CheckCircle2, Target } from "lucide-react";
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
    title: isEn ? "Fullstack & Frontend Architecture" : "Fullstack & Frontend-udvikling",
    icon: Code2,
    color: "text-blue-500",
    description: isEn
      ? "Modern React architecture with TypeScript, responsive UI design, and performance optimization."
      : "Moderne React-arkitektur med TypeScript, komponent-baseret UI/UX design og performance-optimering.",
    skills: [
      "TypeScript",
      "React",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "shadcn-ui",
      "Vite",
      "HTML5 & CSS3",
      "Git & GitHub",
      "Clean Code"
    ]
  },
  {
    title: isEn ? "AI, Prompt Engineering & Automation" : "AI, Prompt Engineering & Automatisering",
    icon: Brain,
    color: "text-violet-500",
    description: isEn
      ? "Claude AI workflows, prompt engineering, RAG systems, and intelligent process automation."
      : "Integration af Claude AI i komplekse workflows, prompt engineering, RAG-systemer og automatisering.",
    skills: [
      "Claude & Claude Code",
      "Prompt Engineering",
      "LLM Workflows",
      "RAG Systems",
      "n8n Automation",
      "Lovable",
      isEn ? "AI Workflow Integration" : "AI-Workflow Integration"
    ]
  },
  {
    title: isEn ? "Game Development & 3D Graphics" : "Game Development & 3D-Grafik",
    icon: Gamepad2,
    color: "text-amber-500",
    description: isEn
      ? "Interactive 3D graphics in browser environments, game mechanics, and Java mobile game development."
      : "3D-grafik i browseren med WebGL/Three.js, spilmekanikker og Java-baseret mobil spiludvikling.",
    skills: [
      "WebGL",
      "Three.js (3D-grafik)",
      "Java (Mobile Game Dev)",
      "HTML5 Canvas API",
      "Game Mechanics & Loops",
      isEn ? "Interactive 3D Design" : "Interaktivt 3D-design"
    ]
  },
  {
    title: isEn ? "Banking Systems, Data & Project Leadership" : "Banksystemer, Data & Projektledelse",
    icon: Database,
    color: "text-emerald-500",
    description: isEn
      ? "Secure financial data processing, SQL databases, compliance, and agile project management."
      : "Sikker databehandling fra banksystemer, SQL-databaser, compliance, Agile workflow og teknisk projektstyring.",
    skills: [
      "SQL & Databases",
      isEn ? "Banking & Transaction Systems" : "Banksystemer & Transaktioner",
      isEn ? "Financial Compliance" : "Finansiel Compliance",
      isEn ? "Advanced Excel Modeling" : "Avanceret Excel-modellering",
      "Project Management",
      "Agile & Code Review",
      isEn ? "Onboarding & Mentoring" : "Onboarding & Mentoring",
      isEn ? "Danish & English (Fluent)" : "Dansk & Engelsk (Flydende)"
    ]
  }
];

export const skillCategories = getSkillCategories(false);

// ⚡ Bolt: Memoize SkillsSection to prevent unnecessary re-renders when switching category filters in parent CVSection
const SkillsSection = memo(function SkillsSection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const categories = useMemo(() => getSkillCategories(isEn), [isEn]);

  const rolePreferences = useMemo(
    () =>
      isEn
        ? [
            {
              title: "Full-stack Frontend Development",
              desc: "Modern React/TypeScript applications with clean architecture"
            },
            {
              title: "AI Integration & Automation",
              desc: "Implementing Claude and LLM workflows into digital products"
            },
            {
              title: "Game Development",
              desc: "Browser-based 3D/WebGL experiences or mobile games in Java/TypeScript"
            },
            {
              title: "Project Leadership",
              desc: "Mentoring, technical coordination, and agile management of engineering teams"
            }
          ]
        : [
            {
              title: "Full-stack Frontend Development",
              desc: "Moderne React/TypeScript applikationer med fokus på arkitektur og UX"
            },
            {
              title: "AI Integration & Automation",
              desc: "Implementering af AI-løsninger og LLM-workflows i digitale produkter"
            },
            {
              title: "Game Development",
              desc: "Browser-baserede (WebGL/Three.js) eller mobile spil i TypeScript og Java"
            },
            {
              title: "Project Leadership",
              desc: "Mentoring, onboarding og projektstyring af udviklerhold"
            }
          ],
    [isEn]
  );

  return (
    <div className="mb-12 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-2xl font-display font-bold text-foreground">
          {isEn ? "Core Competencies & Tech Stack" : "Faglige Kompetencer & Teknologier"}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isEn
            ? "Fullstack developer focused on frontend architecture, AI integrations, and game development — backed by experience from banking systems and digital transformation."
            : "Fullstack-udvikler med fokus på frontend-udvikling, AI-integrationer og game development — kombineret med erfaring fra banksystemer og digital transformation."}
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

      {/* Kompetencekategorier */}
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

      {/* Hvad jeg søger / Role Preferences */}
      <div className="p-4 md:p-5 rounded-xl border border-border/70 bg-muted/30 space-y-3">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm md:text-base">
          <div className="p-1.5 rounded-md bg-accent/15 text-accent">
            <Target className="w-4 h-4" />
          </div>
          <span>{isEn ? "What I Am Looking For — Focus Roles" : "Hvad jeg søger — Fokusområder & Roller"}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {rolePreferences.map((role) => (
            <div
              key={role.title}
              className="flex items-start gap-2.5 p-3 rounded-lg bg-background/80 border border-border/50"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">{role.title}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SkillsSection;
