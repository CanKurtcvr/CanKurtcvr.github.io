export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  tags: string[];
  highlights: string[];
  previewImage?: string;
  titleEn?: string;
  shortTitleEn?: string;
  categoryEn?: string;
  descriptionEn?: string;
  tagsEn?: string[];
  highlightsEn?: string[];
  featured?: boolean;
  statusLabel?: string;
  statusLabelEn?: string;
  actionTextEn?: string;
  actionText?: string;
  demoId?: "debt-simulator" | "process-visualizer" | "compliance-inspector";
  gameId?: string;
  href?: string;
  downloadUrl?: string;
  githubUrl?: string;
  iconName: "TrendingDown" | "Workflow" | "Scale" | "Sparkles" | "Eye" | "Box" | "FileSpreadsheet" | "Gamepad2";
  iconColor: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "strength-conditioning-tracking",
    featured: true,
    statusLabel: "Live webapp",
    statusLabelEn: "Live web app",
    title: "Strength & Conditioning Tracking (SCT)",
    shortTitle: "SCT trænings- og sundhedsapp",
    titleEn: "Strength & Conditioning Tracking (SCT)",
    shortTitleEn: "SCT training and health app",
    category: "Sundhed & Træning",
    categoryEn: "Health & Fitness",
    description: "En dansk, mobilvenlig webapp, der samler styrketræning, mobilitet og genoptræning, kostregistrering, madplaner og personlig progression. Appen forklarer sine anbefalinger og indeholder tydelige forbehold om, at den ikke erstatter sundhedsfaglig rådgivning.",
    descriptionEn: "A Danish, mobile-first web app bringing strength training, mobility and rehabilitation, nutrition logging, meal planning, and personal progress tracking together. It explains its recommendations and clearly states that it does not replace professional healthcare advice.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "PWA", "WCAG 2.2 AA", "Træning & sundhed"],
    tagsEn: ["Next.js", "React", "TypeScript", "Supabase", "PWA", "WCAG 2.2 AA", "Fitness & health"],
    highlights: [
      "Træningsprogrammer og træningslog med offline-gemning",
      "Kostlog, makromål og ugentlig madplan med indkøbsliste",
      "Fremskridtsdashboard, mobilitet/genoptræning og mulighed for skrivebeskyttet deling med træner eller fysioterapeut",
      "Kildekoden er i et privat repository"
    ],
    highlightsEn: [
      "Training plans and workout logging with offline support",
      "Nutrition logging, macro goals, and weekly meal plans with shopping lists",
      "Progress dashboard, mobility/rehabilitation, and read-only sharing with a coach or physiotherapist",
      "The source code is in a private repository"
    ],
    actionText: "Åbn SCT-webappen",
    actionTextEn: "Open the SCT app",
    href: "https://strength-conditioning-tracking-sct.vercel.app/",
    githubUrl: "https://github.com/NassimElH01/Strength-Conditioning-Tracking-SCT-",
    iconName: "Workflow",
    iconColor: "text-emerald-500"
  },
  {
    id: "24support-julekalender",
    title: "24Support Julekalender 2026",
    shortTitle: "Interaktiv julekalender",
    titleEn: "24Support Christmas Calendar 2026",
    shortTitleEn: "Interactive Christmas calendar",
    category: "Freelance & Webudvikling",
    categoryEn: "Freelance & Web Development",
    description: "En komplet digital julekalender udviklet for 24Support. Åbn demoen for at prøve kalenderens design og interaktioner med eksempelindhold. Den fulde løsning bruger en separat Node.js-server til datostyring og et loginbeskyttet adminværktøj.",
    descriptionEn: "A complete digital Christmas calendar created for 24Support. Open the demo to try the calendar design and interactions with sample content. The full solution uses a separate Node.js server for date control and a login-protected admin tool.",
    tags: ["Freelance", "HTML", "CSS", "JavaScript", "Accessibility", "Responsive Design"],
    tagsEn: ["Freelance", "HTML", "CSS", "JavaScript", "Accessibility", "Responsive Design"],
    highlights: [
      "Designede en skalerbar 16:9-oplevelse med danske byhuse, animationer, snefald og interaktioner",
      "Udviklede 24 interaktive låger med tastaturbetjening og gemt demo-fremdrift",
      "Den offentlige portfolio-demo bruger kun eksempelindhold; produktionsversionens admin/API hostes separat"
    ],
    highlightsEn: [
      "Designed a responsive 16:9 experience with Danish townhouses, animation, snowfall, and interactions",
      "Built 24 interactive doors with keyboard support and saved demo progress",
      "The public portfolio demo uses sample content only; the production admin/API is hosted separately"
    ],
    actionText: "Åbn kalenderdemo",
    actionTextEn: "Open calendar demo",
    href: "/freelance/24support-julekalender/index.html",
    previewImage: "/freelance/24support-julekalender/preview.png",
    githubUrl: "https://github.com/NassimElH01",
    iconName: "Sparkles",
    iconColor: "text-red-500"
  },
  {
    id: "ss-rengoringservice-website",
    title: "S&S Rengøringsservice Website",
    shortTitle: "S&S hjemmeside",
    category: "Freelance & Webudvikling",
    description: "Freelance webarbejde for S&S Rengøringsservice med fokus på en enkel, professionel og mobilvenlig hjemmeside, der præsenterer virksomhedens serviceydelser tydeligt.",
    tags: ["Freelance", "Webdesign", "HTML/CSS", "Responsive Design", "Business Website"],
    highlights: [
      "Omsatte virksomhedens behov til en klar og serviceorienteret webstruktur",
      "Arbejdede med visuel præsentation, indhold og en mobilvenlig brugeroplevelse",
      "Forbandt virksomhedens serviceprofil med en mere professionel digital tilstedeværelse"
    ],
    actionText: "Besøg hjemmeside",
    href: "https://ss.ssrengoringsservice.dk/",
    iconName: "Workflow",
    iconColor: "text-emerald-500"
  },
  {
    id: "royal-unibrew-project",
    title: "Royal Unibrew OT Cyber Security & Data-Driven PMO",
    shortTitle: "OT Security & PMO Case",
    category: "Digital Transformation",
    description: "Bachelor project focused on OT cybersecurity and data-driven project management in an industrial environment, combining operational security with governance and stakeholder-oriented reporting.",
    tags: ["Cybersecurity", "OT", "PMO", "Data-driven Management", "Royal Unibrew"],
    highlights: [
      "Analysed OT security risk in a production-oriented business context",
      "Connected project governance with operational reporting and decision support",
      "Produced a research-based digitalisation and security case grounded in real operations"
    ],
    actionText: "Se projektprofil",
    githubUrl: "https://github.com/NassimElH01",
    iconName: "Workflow",
    iconColor: "text-blue-500"
  },
  {
    id: "data-integration-visualizer",
    title: "Data Integration & Process Optimization Case",
    shortTitle: "Data Integration & Process Design",
    category: "Digital Transformation",
    description: "Academic assignment focused on business and technology integration, process design, and improved information flow across systems and stakeholders.",
    tags: ["Data Integration", "Business IT", "Process Design", "Stakeholder Alignment"],
    highlights: [
      "Explored how system and process design can improve business value and control",
      "Worked across data flows, governance challenges, and operational needs",
      "Combined project thinking with practical digital transformation frameworks"
    ],
    actionText: "Se case",
    githubUrl: "https://github.com/NassimElH01",
    iconName: "Scale",
    iconColor: "text-indigo-500"
  },
  {
    id: "ibm-data-analytics",
    title: "IBM Data Analytics & Cybersecurity Capstone",
    shortTitle: "IBM Data Analytics Project",
    category: "AI & Data Analytics",
    description: "Applied analytics and cybersecurity project work using structured learning and evidence-based decision support across business and technical domains.",
    tags: ["IBM Data Analytics", "Cybersecurity", "Machine Learning", "Data Analysis"],
    highlights: [
      "Applied analytical methods to real-world business and technical datasets",
      "Strengthened skills in data interpretation, reporting, and technical problem solving",
      "Connected data work with security awareness and risk-oriented thinking"
    ],
    actionText: "Se projekt",
    githubUrl: "https://github.com/NassimElH01",
    iconName: "Sparkles",
    iconColor: "text-amber-500"
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
    githubUrl: "https://github.com/NassimElH01",
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
    githubUrl: "https://github.com/NassimElH01",
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
    githubUrl: "https://github.com/NassimElH01",
    iconName: "Box",
    iconColor: "text-cyan-500"
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
    githubUrl: "https://github.com/NassimElH01",
    iconName: "FileSpreadsheet",
    iconColor: "text-emerald-500"
  },
  {
    id: "arcade-games",
    title: "Canvas Arcade State Machines",
    shortTitle: "Canvas Arcade (TypeScript)",
    category: "Full Stack & Web App",
    description: "En række klassiske arkadespil (Blackjack med casinoregler, Snake med input-kø og collision detection, Pong med vektor-refleksion) bygget fra bunden med ren TypeScript og HTML5 Canvas.",
    tags: ["TypeScript", "Canvas API", "Framer Motion", "State Management"],
    highlights: [
      "Deterministiske spil-loops uafhængige af framerate",
      "Lokale highscore-systemer med localStorage-persistens",
      "Responsive canvas-layouts tilpasset mobil og desktop"
    ],
    actionText: "Gå til spilarkaden",
    gameId: "snake",
    githubUrl: "https://github.com/NassimElH01",
    iconName: "Gamepad2",
    iconColor: "text-purple-500"
  }
];
