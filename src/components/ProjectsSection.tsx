import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Gamepad2,
  Eye,
  Box,
  FileSpreadsheet,
  ExternalLink,
  ArrowRight,
  Download,
  Github,
  TrendingDown,
  Workflow,
  Scale,
  Play,
  SlidersHorizontal,
} from "lucide-react";

import { projectsData, ProjectItem } from "@/data/projectsData";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { DebtSimulator } from "@/components/projects/DebtSimulator";
import { ProcessVisualizer } from "@/components/projects/ProcessVisualizer";
import { ComplianceInspector } from "@/components/projects/ComplianceInspector";
import { Language, translations } from "@/lib/translations";

const iconMap = {
  Sparkles,
  Eye,
  Box,
  FileSpreadsheet,
  Gamepad2,
  TrendingDown,
  Workflow,
  Scale,
};

interface ProjectsSectionProps {
  language?: Language;
  onNavigateToGame?: (gameId: string) => void;
}

export default function ProjectsSection({ language = "da", onNavigateToGame }: ProjectsSectionProps) {
  const t = translations[language].projectsSection;
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [activeProjectDemo, setActiveProjectDemo] = useState<ProjectItem | null>(null);

  const categories = [
    { value: "Alle", label: t.all },
    { value: "Freelance & Webudvikling", label: language === "da" ? "Freelance & Webudvikling" : "Freelance & Web Development" },
    { value: "FinTech & Dataanalyse", label: language === "da" ? "FinTech & Dataanalyse" : "FinTech & Data Analysis" },
    { value: "Digital Transformation", label: "Digital Transformation" },
    { value: "AI & Data Analytics", label: "AI & Data Analytics" },
    { value: "Legal Tech & AI", label: "Legal Tech & AI" },
    { value: "Sundhed & Træning", label: language === "da" ? "Sundhed & Træning" : "Health & Fitness" },
    { value: "Full Stack & Web App", label: "Full Stack & Web App" },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Alle") return projectsData;
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          {t.title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {t.description}
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const Icon = iconMap[project.iconName] || Sparkles;
          const isInteractiveDemo = Boolean(project.demoId);
          const title = language === "en" ? project.titleEn || project.title : project.title;
          const category = language === "en" ? project.categoryEn || project.category : project.category;
          const description = language === "en" ? project.descriptionEn || project.description : project.description;
          const highlights = language === "en" ? project.highlightsEn || project.highlights : project.highlights;
          const tags = language === "en" ? project.tagsEn || project.tags : project.tags;
          const actionText = language === "en" ? project.actionTextEn || project.actionText : project.actionText;

          return (
            <Card
              key={project.id}
              className="flex flex-col justify-between overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              {project.previewImage && (
                <img
                  src={project.previewImage}
                  alt={title}
                  className="aspect-video w-full border-b border-border/50 object-cover"
                  loading="lazy"
                />
              )}
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-muted/80 group-hover:bg-accent/10 transition-colors">
                      <Icon className={`w-5 h-5 ${project.iconColor}`} />
                    </div>
                    <span className="min-w-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider break-words">
                      {category}
                    </span>
                  </div>

                  {isInteractiveDemo ? (
                    <Badge variant="default" className="text-xs font-semibold bg-primary/15 text-primary border-primary/30">
                      <Play className="w-3 h-3 mr-1 fill-current" /> {t.interactive}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs font-normal">
                      {t.featured}
                    </Badge>
                  )}
                </div>

                <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors">
                  {title}
                </CardTitle>

                <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Highlights */}
                <div className="space-y-1.5 bg-muted/40 p-3 rounded-lg border border-border/50 text-xs">
                  <p className="font-semibold text-foreground/90 mb-1">{t.highlights}</p>
                  <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
                    {highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {project.demoId ? (
                    <Button
                      size="sm"
                      onClick={() => setActiveProjectDemo(project)}
                      className="gap-1.5 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {actionText || t.openDemo}
                    </Button>
                  ) : project.downloadUrl ? (
                    <Button asChild size="sm" className="gap-1.5 w-full sm:w-auto">
                      <a href={project.downloadUrl} download>
                        <Download className="w-4 h-4" />
                        {actionText}
                      </a>
                    </Button>
                  ) : project.gameId && onNavigateToGame ? (
                    <Button
                      size="sm"
                      onClick={() => onNavigateToGame(project.gameId!)}
                      className="gap-1.5 w-full sm:w-auto"
                    >
                      {actionText}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : project.href ? (
                    <Button asChild size="sm" className="gap-1.5 w-full sm:w-auto">
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {actionText}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  ) : null}

                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <a
                      href={project.githubUrl || "https://github.com/NassimElH01"}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t.github}
                    >
                      <Github className="w-4 h-4" />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Project Modal */}
      {activeProjectDemo && (
        <ProjectModal
          isOpen={Boolean(activeProjectDemo)}
          onClose={() => setActiveProjectDemo(null)}
          title={activeProjectDemo.title}
          category={activeProjectDemo.category}
          description={activeProjectDemo.description}
        >
          {activeProjectDemo.demoId === "debt-simulator" && <DebtSimulator />}
          {activeProjectDemo.demoId === "process-visualizer" && <ProcessVisualizer />}
          {activeProjectDemo.demoId === "compliance-inspector" && <ComplianceInspector />}
        </ProjectModal>
      )}
    </section>
  );
}
