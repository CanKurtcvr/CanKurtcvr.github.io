import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Gamepad2, Eye, Box, FileSpreadsheet, ExternalLink, ArrowRight, Download, Github } from "lucide-react";

interface ProjectsSectionProps {
  onNavigateToGame?: (gameId: string) => void;
}

export default function ProjectsSection({ onNavigateToGame }: ProjectsSectionProps) {
  const projects = [
    {
      id: "ascension-cards",
      title: "Ascension Cards — Habit RPG",
      category: "Full Stack & Web App",
      description: "En fordybende, kortbaseret habit tracker og rollespilsoplevelse bygget med TanStack Start, Nitro og moderne webteknologier. Gør personlig udvikling og daglige rutiner til et spil med samlekort, streaks og XP-progression.",
      icon: Sparkles,
      iconColor: "text-amber-500",
      tags: ["React 19", "TanStack Start", "Nitro", "Tailwind CSS", "TypeScript", "SSR"],
      highlights: [
        "Arkitektur med TanStack Start & Nitro server engine",
        "Interaktive samlekort med sjældenhedsgrader og dynamisk statistik",
        "Gamification med streaks, quests og inventory-system"
      ],
      actionText: "Udforsk Ascension Cards",
      gameId: "ascension-cards",
      href: "/ascensioncards/"
    },
    {
      id: "web-shooter",
      title: "Superhero Hand Powers — Browser Computer Vision",
      category: "AI & Computer Vision",
      description: "Real-time gestusgenkendelse direkte via webkameraet uden krav om ekstern backend. Algoritmen genkender håndbevægelser med lav latency til at affyre Spider-Man spindelvæv eller aktivere Wolverine-kløer.",
      icon: Eye,
      iconColor: "text-rose-500",
      tags: ["Computer Vision", "Camera API", "HTML5 Canvas", "WebGL", "MediaPipe"],
      highlights: [
        "100% lokal inferens på klienten (fuldt privatlivsbeskyttende)",
        "Realtids sporing af håndled og fingre i browseren",
        "Dynamisk canvas-rendering synkroniseret med 60 FPS videostream"
      ],
      actionText: "Test kamerastyring live",
      gameId: "web-shooter"
    },
    {
      id: "flight-world-3d",
      title: "FlightWorld 3D — Procedural WebGL Simulation",
      category: "3D Grafik & WebGL",
      description: "Interaktiv 3D-flyvesimulation med Three.js. Indeholder dynamisk tredjepersons kameraføring, svævende procedurale øer, stemningsfulde lyskilder og partikelsystemer optimeret til høj performance.",
      icon: Box,
      iconColor: "text-cyan-500",
      tags: ["Three.js", "WebGL", "3D Matematik", "TypeScript", "Shaders"],
      highlights: [
        "Specialdesignet flyvefysik og jævn kameradæmpning",
        "Procedural placering af 3D-modeller og naturmiljøer",
        "Performance-optimeret renderingloop med frustum culling"
      ],
      actionText: "Se 3D simulation",
      gameId: "ascension-cards"
    },
    {
      id: "budget-model",
      title: "Finansiel Budget- & Likviditetsmodel",
      category: "Dataanalyse & Forretnings-IT",
      description: "Omfattende økonomistyrings- og budgetmodel udviklet i Microsoft Excel. Designet til datadrevet likviditetsstyring, visualisering af pengestrømme og månedlig opfølgning for både privatøkonomi og mindre virksomheder.",
      icon: FileSpreadsheet,
      iconColor: "text-emerald-500",
      tags: ["Excel Modellering", "Datavalidering", "Finansiel Analyse", "KPI Dashboard"],
      highlights: [
        "Automatiserede beregninger af faste omkostninger og rådighedsbeløb",
        "Strukturerede tabeller med indbygget datavalidering mod tastefejl",
        "Visuel oversigt over forbrugsmønstre og opsparingskvoter"
      ],
      actionText: "Hent skabelon (Excel)",
      downloadUrl: "/budget-skabelon.xlsx"
    },
    {
      id: "arcade-games",
      title: "Canvas Arcade State Machines",
      category: "Frontend Arkitektur",
      description: "En række klassiske arkadespil (Blackjack med casinoregler, Snake med input-kø og collision detection, Pong med vektor-refleksion) bygget fra bunden med ren TypeScript og HTML5 Canvas.",
      icon: Gamepad2,
      iconColor: "text-purple-500",
      tags: ["TypeScript", "Canvas API", "Framer Motion", "State Management"],
      highlights: [
        "Deterministiske spil-loops uafhængige af framerate",
        "Lokale highscore-systemer med localStorage-persistens",
        "Responsive canvas-layouts tilpasset mobil og desktop"
      ],
      actionText: "Gå til spilarkaden",
      gameId: "snake"
    }
  ];

  return (
    <section id="projects" className="py-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Projekter & Tekniske Showcases
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Et udvalg af mine projekter inden for webudvikling, interaktive 3D-systemer, computer vision og forretnings-IT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card 
              key={project.id}
              className="flex flex-col justify-between hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-muted/80 group-hover:bg-accent/10 transition-colors">
                      <Icon className={`w-5 h-5 ${project.iconColor}`} />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Fremhævet
                  </Badge>
                </div>

                <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>

                <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Highlights */}
                <div className="space-y-1.5 bg-muted/40 p-3 rounded-lg border border-border/50 text-xs">
                  <p className="font-semibold text-foreground/90 mb-1">Tekniske højdepunkter:</p>
                  <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
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
                  {project.downloadUrl ? (
                    <Button asChild size="sm" className="gap-1.5 w-full sm:w-auto">
                      <a href={project.downloadUrl} download>
                        <Download className="w-4 h-4" />
                        {project.actionText}
                      </a>
                    </Button>
                  ) : project.gameId && onNavigateToGame ? (
                    <Button 
                      size="sm" 
                      onClick={() => onNavigateToGame(project.gameId!)}
                      className="gap-1.5 w-full sm:w-auto"
                    >
                      {project.actionText}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : project.href ? (
                    <Button asChild size="sm" className="gap-1.5 w-full sm:w-auto">
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {project.actionText}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  ) : null}

                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <a 
                      href="https://github.com/CanKurtcvr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Se kildekode på GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
