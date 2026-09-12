export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  tags: string[];
  highlights: string[];
  actionText?: string;
  gameId?: string;
  href?: string;
  downloadUrl?: string;
  githubUrl?: string;
  iconName: "Sparkles" | "Eye" | "Box" | "FileSpreadsheet" | "Gamepad2";
  iconColor: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "ascension-cards",
    title: "Ascension Cards — Habit RPG",
    shortTitle: "Ascension Cards (Habit RPG)",
    category: "Full Stack & Web App",
    description: "En fordybende, kortbaseret habit tracker og rollespilsoplevelse bygget med TanStack Start, Nitro og moderne webteknologier. Gør personlig udvikling og daglige rutiner til et spil med samlekort, streaks og XP-progression.",
    tags: ["React 19", "TanStack Start", "Nitro", "Tailwind CSS", "TypeScript", "SSR"],
    highlights: [
      "Arkitektur med TanStack Start & Nitro server engine",
      "Interaktive samlekort med sjældenhedsgrader og dynamisk statistik",
      "Gamification med streaks, quests og inventory-system"
    ],
    actionText: "Udforsk Ascension Cards",
    gameId: "ascension-cards",
    href: "/ascensioncards/",
    githubUrl: "https://github.com/CanKurtcvr",
    iconName: "Sparkles",
    iconColor: "text-amber-500"
  },
  {
    id: "web-shooter",
    title: "Superhero Hand Powers — Browser Computer Vision",
    shortTitle: "Superhero Hand Powers (Vision AI)",
    category: "AI & Computer Vision",
    description: "Real-time gestusgenkendelse direkte via webkameraet uden krav om ekstern backend. Algoritmen genkender håndbevægelser med lav latency til at affyre Spider-Man spindelvæv eller aktivere Wolverine-kløer.",
    tags: ["Computer Vision", "Camera API", "HTML5 Canvas", "WebGL", "MediaPipe"],
    highlights: [
      "100% lokal inferens på klienten (fuldt privatlivsbeskyttende)",
      "Realtids sporing af håndled og fingre i browseren",
      "Dynamisk canvas-rendering synkroniseret med 60 FPS videostream"
    ],
    actionText: "Test kamerastyring live",
    gameId: "web-shooter",
    githubUrl: "https://github.com/CanKurtcvr",
    iconName: "Eye",
    iconColor: "text-rose-500"
  },
  {
    id: "flight-world-3d",
    title: "FlightWorld 3D — Procedural WebGL Simulation",
    shortTitle: "FlightWorld 3D (WebGL Sim)",
    category: "3D Grafik & WebGL",
    description: "Interaktiv 3D-flyvesimulation med Three.js. Indeholder dynamisk tredjepersons kameraføring, svævende procedurale øer, stemningsfulde lyskilder og partikelsystemer optimeret til høj performance.",
    tags: ["Three.js", "WebGL", "3D Matematik", "TypeScript", "Shaders"],
    highlights: [
      "Specialdesignet flyvefysik og jævn kameradæmpning",
      "Procedural placering af 3D-modeller og naturmiljøer",
      "Performance-optimeret renderingloop med frustum culling"
    ],
    actionText: "Se 3D simulation",
    gameId: "ascension-cards",
    githubUrl: "https://github.com/CanKurtcvr",
    iconName: "Box",
    iconColor: "text-cyan-500"
  },
  {
    id: "budget-model",
    title: "Finansiel Budget- & Likviditetsmodel",
    shortTitle: "Finansiel Budgetmodel (Excel)",
    category: "Dataanalyse & Forretnings-IT",
    description: "Omfattende økonomistyrings- og budgetmodel udviklet i Microsoft Excel. Designet til datadrevet likviditetsstyring, visualisering af pengestrømme og månedlig opfølgning for både privatøkonomi og mindre virksomheder.",
    tags: ["Excel Modellering", "Datavalidering", "Finansiel Analyse", "KPI Dashboard"],
    highlights: [
      "Automatiserede beregninger af faste omkostninger og rådighedsbeløb",
      "Strukturerede tabeller med indbygget datavalidering mod tastefejl",
      "Visuel oversigt over forbrugsmønstre og opsparingskvoter"
    ],
    actionText: "Hent skabelon (Excel)",
    downloadUrl: "/budget-skabelon.xlsx",
    githubUrl: "https://github.com/CanKurtcvr",
    iconName: "FileSpreadsheet",
    iconColor: "text-emerald-500"
  },
  {
    id: "arcade-games",
    title: "Canvas Arcade State Machines",
    shortTitle: "Canvas Arcade (TypeScript)",
    category: "Frontend Arkitektur",
    description: "En række klassiske arkadespil (Blackjack med casinoregler, Snake med input-kø og collision detection, Pong med vektor-refleksion) bygget fra bunden med ren TypeScript og HTML5 Canvas.",
    tags: ["TypeScript", "Canvas API", "Framer Motion", "State Management"],
    highlights: [
      "Deterministiske spil-loops uafhængige af framerate",
      "Lokale highscore-systemer med localStorage-persistens",
      "Responsive canvas-layouts tilpasset mobil og desktop"
    ],
    actionText: "Gå til spilarkaden",
    gameId: "snake",
    githubUrl: "https://github.com/CanKurtcvr",
    iconName: "Gamepad2",
    iconColor: "text-purple-500"
  }
];
