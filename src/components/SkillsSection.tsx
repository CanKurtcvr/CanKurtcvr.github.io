import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Cpu, Languages, BrainCircuit } from "lucide-react";
import { Language, translations } from "@/lib/translations";

export interface SkillCategory {
  title: string;
  icon: typeof Code2;
  description: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "PMO & Projektledelse",
    icon: Code2,
    color: "text-blue-500",
    description: "Project coordination, governance, reporting, and stakeholder-driven execution.",
    skills: [
      "PRINCE2 Foundation & Practitioner",
      "Agile Project Management",
      "Stakeholder Management",
      "Azure DevOps Governance",
      "Reporting & Dashboarding",
      "Project Coordination",
      "Change & Process Support"
    ]
  },
  {
    title: "Data, BI & Analyse",
    icon: Database,
    color: "text-emerald-500",
    description: "Turning data into decisions through analysis, dashboards, and business insight.",
    skills: [
      "Power BI",
      "Data Analysis",
      "BI & KPI reporting",
      "Excel Modelling",
      "ProjectFlow Reporting",
      "Data-driven Decision Support",
      "Process Visualization"
    ]
  },
  {
    title: "Digitalisering & AI",
    icon: Cpu,
    color: "text-amber-500",
    description: "Digital transformation and business-technology alignment with a practical AI lens.",
    skills: [
      "Digital Transformation",
      "AI & Generative AI",
      "Technology Strategy",
      "Business & IT Alignment",
      "Process Optimization",
      "Cybersecurity",
      "IT Governance"
    ]
  },
  {
    title: "Programmering & Web",
    icon: Code2,
    color: "text-cyan-500",
    description: "Practical programming skills used to build interactive web experiences, data workflows, and prototypes.",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "HTML & CSS",
      "Python",
      "SQL",
      "Tailwind CSS",
      "Git & GitHub"
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    color: "text-rose-500",
    description: "Applied AI skills spanning generative AI, machine learning, computer vision, and responsible digitalisation.",
    skills: [
      "Generative AI & Prompt Engineering",
      "Machine Learning",
      "AI-assisted Analysis",
      "Computer Vision",
      "Data Preparation",
      "Model Evaluation",
      "AI Governance & Ethics",
      "IBM AI / Data Projects"
    ]
  },
  {
    title: "Sprog & Kommunikation",
    icon: Languages,
    color: "text-purple-500",
    description: "Clear communication, cross-cultural collaboration, and service mindset.",
    skills: [
      "Danish (Native)",
      "English (Fluent)",
      "Arabic (Fluent)",
      "German (Working proficiency)",
      "Professional Communication",
      "Stakeholder Engagement",
      "Documentation & Presentation"
    ]
  }
];

export default function SkillsSection({ language = "da" }: { language?: Language }) {
  const isDanish = language === "da";
  return (
    <div className="mb-12 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-display font-bold text-foreground">
          {isDanish ? "Faglige Kompetencer & Værktøjer" : "Professional Skills & Tools"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isDanish
            ? "Et overblik over min tekniske værktøjskasse, analytiske profil og forretningsforståelse."
            : "An overview of my technical toolkit, analytical profile, and business understanding."}
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
                  <span>{isDanish ? category.title : ({
                    "PMO & Projektledelse": "PMO & Project Management",
                    "Data, BI & Analyse": "Data, BI & Analytics",
                    "Digitalisering & AI": "Digitalisation & AI",
                    "Programmering & Web": "Programming & Web",
                    "AI & Machine Learning": "AI & Machine Learning",
                    "Sprog & Kommunikation": "Languages & Communication"
                  }[category.title] || category.title)}</span>
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
