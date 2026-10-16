export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  tags: string[];
  highlights: string[];
  actionText?: string;
  demoId?: "debt-simulator" | "process-visualizer" | "compliance-inspector";
  gameId?: string;
  href?: string;
  downloadUrl?: string;
  githubUrl?: string;
  iconName:
    | "TrendingDown"
    | "Workflow"
    | "Scale"
    | "Sparkles"
    | "Eye"
    | "Box"
    | "FileSpreadsheet"
    | "Gamepad2"
    | "Brain"
    | "Bot"
    | "Compass"
    | "Smartphone"
    | "Globe";
  iconColor: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "ai-job-search",
    title: "AI Job Search Framework — Claude Code Workflows",
    shortTitle: "AI Job Search Framework",
    category: "AI & Automation",
    description: "AI-powered jobansøgningsrammeværk bygget på Claude Code. Demonstrerer praktisk integration af LLM-workflows til automatiseret analyse, dokumentgenerering og interviewtræning.",
    tags: ["Claude Code", "AI Workflows", "Prompt Engineering", "LLM Automation"],
    highlights: [
      "Automatisk vurdering og relevansscoring af jobopslag",
      "Skræddersyet tilpasning af CV og automatisk skrivning af ansøgningsbreve",
      "Struktureret interviewforberedelse med AI-vejledning"
    ],
    actionText: "Udforsk AI-workflow",
    href: "https://github.com/CanKurtcvr/ai-job-search",
    githubUrl: "https://github.com/CanKurtcvr/ai-job-search",
    iconName: "Bot",
    iconColor: "text-indigo-500"
  },
  {
    id: "the-straight-path",
    title: "The Straight Path (TSP) — 3D Game Development",
    shortTitle: "The Straight Path (TSP)",
    category: "Game Dev & 3D",
    description: "Game development projekt i TypeScript, der demonstrerer interaktive oplevelser, 3D-grafik og moderne spilarkitektur. (1 Star ⭐ – under aktiv udvikling)",
    tags: ["TypeScript", "3D Grafik", "WebGL", "Game Development", "Interactive Design"],
    highlights: [
      "Type-sikker spilarkitektur og tilstandsstyring i TypeScript",
      "Fokus på 3D-grafik, rumlig navigation og interaktive oplevelser",
      "Open-source repository under aktiv udvikling på GitHub"
    ],
    actionText: "Se projekt på GitHub",
    href: "https://github.com/CanKurtcvr/The-Straight-Path",
    githubUrl: "https://github.com/CanKurtcvr/The-Straight-Path",
    iconName: "Compass",
    iconColor: "text-amber-500"
  },
  {
    id: "portfolio-website",
    title: "Personlig Portfolio & Interaktiv Showcase Website",
    shortTitle: "Personlig Portfolio (React/TS)",
    category: "Full Stack & Web App",
    description: "Moderne, fuldt responsiv portfolio-hjemmeside bygget med React, TypeScript, Vite, Tailwind CSS og shadcn-ui. Forener interaktive simulatorer, 3D/Canvas-spil og dynamisk CV.",
    tags: ["TypeScript", "React", "Vite", "Tailwind CSS", "shadcn-ui"],
    highlights: [
      "Komponent-baseret arkitektur med React 18, TypeScript og lazy-loaded bundles",
      "Modern UI med Tailwind CSS, shadcn-ui og tosproget (DA/EN) understøttelse",
      "Optimeret performance med Vite og integrerede live-demos"
    ],
    actionText: "Se kildekode",
    href: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    githubUrl: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    iconName: "Globe",
    iconColor: "text-sky-500"
  },
  {
    id: "debt-simulator",
    title: "FinTech Debt Restructuring & Cash Flow Simulator",
    shortTitle: "Gældssanering & Akkord Simulator",
    category: "FinTech & Dataanalyse",
    description: "Interaktiv finansiel beregningsmodel til simulering af komplekse gældssanerings- og akkordforhandlinger. Modellerer amortisation, rentepauser (moratorium), akkordnedslag og kreditors genvindingsgrad i realtid.",
    tags: ["FinTech", "Recharts", "Finansiel Modellering", "Amortisation", "TypeScript", "Banksystemer"],
    highlights: [
      "Realtids kalkulation af renteakkumulering, akkordnedslag og henstandsperioder",
      "Advarselssystem mod negativ amortisation og uholdbare gældsspiraler",
      "Dynamisk visualisering af restgældskurve og eksport af amortisationsplan til CSV"
    ],
    actionText: "Åbn interaktiv simulator",
    demoId: "debt-simulator",
    githubUrl: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    iconName: "TrendingDown",
    iconColor: "text-emerald-500"
  },
  {
    id: "process-visualizer",
    title: "Enterprise Process & Value Stream Visualizer",
    shortTitle: "Procesoptimering & STP Workflow",
    category: "Digital Transformation",
    description: "Interaktiv procesarkitektur-model der sammenligner manuelle legacy processer (As-Is) med hændelsesdrevet automatisering (To-Be). Beregner frigjorte årsværk (FTEs), gennemløbstid og økonomisk ROI med live simulation.",
    tags: ["Digital Transformation", "BPMN & Lean", "Straight-Through Processing", "Business Architecture", "ROI Modellering"],
    highlights: [
      "Side-by-side sammenligning af As-Is manuel sagsbehandling og To-Be STP-arkitektur",
      "Dynamisk beregning af årlig omkostningsbesparelse, frigjorte FTEs og fejlreduktion",
      "Interaktiv trin-inspektion med flaskehalsanalyse og animeret flow-simulation"
    ],
    actionText: "Kør procesvisualisering",
    demoId: "process-visualizer",
    githubUrl: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    iconName: "Workflow",
    iconColor: "text-blue-500"
  },
  {
    id: "compliance-inspector",
    title: "AI Legal Compliance & Contract Clause Auditor",
    shortTitle: "AI Kontrakt- & Compliance Auditor",
    category: "AI & Automation",
    description: "Intelligent kontrakt- og klausulinspektor der screener juridiske dokumenter mod præceptive regler i dansk ret (Forældelsesloven, Kreditaftaleloven, GDPR/DPA). Tilbyder live risikoscoring og 1-klik remediation.",
    tags: ["Legal Tech", "Compliance & GDPR", "Forældelsesloven", "Kreditaftaleloven", "Klausul Remediation"],
    highlights: [
      "Automatisk identifikation af lovstridige forældelses- og rentevilkår",
      "Realtids compliance-scoreberegning (0-100) med dynamisk risikoklassificering",
      "Interaktiv remediationsmotor med forslag til lovmedholdige klausulformuleringer"
    ],
    actionText: "Test compliance audit",
    demoId: "compliance-inspector",
    githubUrl: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    iconName: "Scale",
    iconColor: "text-indigo-500"
  },
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
    category: "AI & Automation",
    description: "Real-time gestusgenkendelse direkte via webkameraet uden krav om ekstern backend. Algoritmen genkender håndbevægelser med lav latency til at affyre Spider-Man spindelvæv eller aktivere Wolverine-kløer.",
    tags: ["Computer Vision", "Camera API", "HTML5 Canvas", "WebGL", "MediaPipe"],
    highlights: [
      "100% lokal inferens på klienten (fuldt privatlivsbeskyttende)",
      "Realtids sporing af håndled og fingre i browseren",
      "Dynamisk canvas-rendering synkroniseret med 60 FPS videostream"
    ],
    actionText: "Test kamerastyring live",
    gameId: "web-shooter",
    githubUrl: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    iconName: "Eye",
    iconColor: "text-rose-500"
  },
  {
    id: "flight-world-3d",
    title: "FlightWorld 3D — Procedural WebGL Simulation",
    shortTitle: "FlightWorld 3D (WebGL Sim)",
    category: "Game Dev & 3D",
    description: "Interaktiv 3D-flyvesimulation med Three.js. Indeholder dynamisk tredjepersons kameraføring, svævende procedurale øer, stemningsfulde lyskilder og partikelsystemer optimeret til høj performance.",
    tags: ["Three.js", "WebGL", "3D Matematik", "TypeScript", "Shaders"],
    highlights: [
      "Specialdesignet flyvefysik og jævn kameradæmpning",
      "Procedural placering af 3D-modeller og naturmiljøer",
      "Performance-optimeret renderingloop med frustum culling"
    ],
    actionText: "Se 3D simulation",
    gameId: "ascension-cards",
    githubUrl: "https://github.com/CanKurtcvr/CanKurtcvr.github.io",
    iconName: "Box",
    iconColor: "text-cyan-500"
  },
  {
    id: "arcade-games",
    title: "Snake & Canvas Arcade State Machines",
    shortTitle: "Snake & Canvas Arcade (TS)",
    category: "Game Dev & 3D",
    description: "Klassisk Snake-spil og arkadespil (Blackjack med casinoregler, Snake med input-kø og collision detection, Pong med vektor-refleksion) bygget til demonstration af game mechanics i TypeScript og HTML5 Canvas.",
    tags: ["TypeScript", "Game Mechanics", "Canvas API", "Framer Motion", "State Management"],
    highlights: [
      "Deterministiske spil-loops uafhængige af framerate og præcis collision detection",
      "Lokale highscore-systemer med localStorage-persistens",
      "Dedikeret Snake-repository samt integreret spilarkade til mobil og desktop"
    ],
    actionText: "Spil Snake i arkaden",
    gameId: "snake",
    githubUrl: "https://github.com/CanKurtcvr/snake",
    iconName: "Gamepad2",
    iconColor: "text-purple-500"
  },
  {
    id: "got-games-on-your-phone",
    title: "Got Games On Your Phone — Java Mobile Game Dev",
    shortTitle: "Got Games On Your Phone (Java)",
    category: "Game Dev & 3D",
    description: "Mobil game development projekt udviklet i Java med fokus på objektorienteret spilarkitektur, mobile game mechanics og interaktivt design.",
    tags: ["Java", "Mobile Game Dev", "OOP", "Game Mechanics"],
    highlights: [
      "Objektorienteret spilarkitektur og tilstandsstyring i Java",
      "Implementering af mobile spilmekanikker og responsive kontroller",
      "Open-source spilkildekode tilgængelig på GitHub"
    ],
    actionText: "Se Java-projekt på GitHub",
    href: "https://github.com/CanKurtcvr/gotgamesonyourphone-",
    githubUrl: "https://github.com/CanKurtcvr/gotgamesonyourphone-",
    iconName: "Smartphone",
    iconColor: "text-orange-500"
  },
  {
    id: "budget-model",
    title: "Finansiel Budget- & Likviditetsmodel",
    shortTitle: "Finansiel Budgetmodel (Excel)",
    category: "FinTech & Dataanalyse",
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
  }
];
