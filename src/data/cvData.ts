export type CVCategory = "all" | "it" | "uddannelse" | "omsorg";

export interface CVItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: "Uddannelse" | "Erfaring" | "Frivilligt arbejde";
  category: "it" | "uddannelse" | "omsorg";
  description: string;
  tags: string[];
  bullets?: string[];
}

export const cvItems: CVItem[] = [
  // --- UDDANNELSER ---
  {
    id: "ruc-kandidat",
    title: "Kandidat i Digital Transformation",
    organization: "Roskilde Universitet (RUC)",
    period: "Start Sep. 2026",
    type: "Uddannelse",
    category: "uddannelse",
    description: "Videreuddannelse med fokus på digital omstilling, teknologi, strategisk ledelse og it-systemer i organisationer.",
    tags: ["Digital Transformation", "It-strategi", "RUC"],
    bullets: [
      "Strategisk planlægning og styring af digitale omstillingsprocesser i private og offentlige organisationer.",
      "Analyse og integration af komplekse IT-systemer og forretningsprocesser.",
      "Teknologiledelse, UX og socio-teknisk systemdesign."
    ]
  },
  {
    id: "ruc-bachelor",
    title: "Bachelor i Informatik og Virksomhedsstudier",
    organization: "Roskilde Universitet",
    period: "Sep. 2021 - Jun. 2024",
    type: "Uddannelse",
    category: "uddannelse",
    description: "Tværfaglig uddannelse der kombinerer datalogi, programmering, databasedesign, regnskab og organisatorisk udvikling.",
    tags: ["Informatik", "Virksomhedsstudier", "UX-design", "Dataanalyse"],
    bullets: [
      "Grundlæggende programmering (Python, JavaScript, SQL) og datamodellering.",
      "Projektstyring, bogholderi, økonomistyring og forretningsforståelse.",
      "Menneske-maskine interaktion (HCI), UX-design og brugerresearch."
    ]
  },

  // --- IT ERFARING ---
  {
    id: "danske-bank-it",
    title: "IT-konsulent (fuldtid)",
    organization: "Danske Bank (via EY / M Networks)",
    period: "Jun. 2022 - Dec. 2023",
    type: "Erfaring",
    category: "it",
    description: "Ansvarlig for fejlretning i komplekse kundesager, analyse af store datamængder i Excel og onboarding i forbindelse med gældssanering og inkasso-oprydning.",
    tags: ["Dataanalyse", "Fejlretning", "Excel", "Onboarding"],
    bullets: [
      "Sagsrekonstruktion af komplekse økonomiske forløb gennem analyse af juridiske aktstykker og bankudskrifter.",
      "Håndtering og validering af data for mere end 400 kunder i avancerede Excel-modeller.",
      "Udarbejdelse af præsentationer og onboarding af nye konsulenter i teamet (floorwalker)."
    ]
  },

  // --- PLEJE & OMSORG ---
  {
    id: "kaerbo-omsorgscenter",
    title: "Plejehjælper",
    organization: "Kærbo Omsorgscenter, Ishøj",
    period: "Jun. 2026 - Sep. 2026",
    type: "Erfaring",
    category: "omsorg",
    description: "Hjælp til ældre borgere med daglige rutiner, personlig pleje, aktivisering og digital journalføring.",
    tags: ["Ældrepleje", "Journalføring", "Omsorg", "Empati"],
    bullets: [
      "Strukturering af daglige plejerutiner og skabelse af trygge rammer for beboerne.",
      "Præcis journalføring og tværfaglig overlevering til sygeplejersker og kollegaer.",
      "Høj grad af situationsfornemmelse, tålmodighed og menneskelig kontakt."
    ]
  },
  {
    id: "forsorgshjemmet-absalon",
    title: "Omsorgsmedarbejder (Vikariat)",
    organization: "Forsorgshjemmet Absalon",
    period: "Jan. 2024 - Nuværende",
    type: "Erfaring",
    category: "omsorg",
    description: "Yder administrativ støtte og personlig omsorg til socialt udsatte borgere og håndterer komplekse sociale situationer med ro og empati.",
    tags: ["Socialt arbejde", "Administration", "Empati", "Konflikthåndtering"],
    bullets: [
      "Relationsarbejde med borgere i sårbare og uforudsigelige livssituationer.",
      "Konfliktnedtrapning og fastholdelse af rolige, trygge rammer.",
      "Dokumentation og administrativ opfølgning i fagsystemer."
    ]
  },

  // --- ØVRIGE ERFARINGER ---
  {
    id: "tolk-danmark",
    title: "Tolk (Vikariat)",
    organization: "Tolk Danmark",
    period: "Feb. 2024 - Nuværende",
    type: "Erfaring",
    category: "omsorg",
    description: "Formidler præcis tolkning og kommunikation ved kritiske møder med fokus på etik, diskretion og professionalisme.",
    tags: ["Sprog", "Kommunikation", "Etik", "Diskretion"],
    bullets: [
      "Simultan- og konsekutiv tolkning mellem parter i offentlige og private instanser.",
      "Sikring af fuldstændig neutralitet, tavshedspligt og præcision i terminologi.",
      "Hurtig omstillingsevne til skiftende faglige kontekster."
    ]
  },
  {
    id: "ole-romer-skole",
    title: "Pædagogmedhjælper",
    organization: "Ole-Rømer skolen - Høje Taastrup",
    period: "Aug. 2019 - Okt. 2021",
    type: "Erfaring",
    category: "omsorg",
    description: "Understøttede undervisning og agerede støttepædagog for elever med faglige og sociale udfordringer.",
    tags: ["Undervisning", "Pædagogik", "Klasseledelse"],
    bullets: [
      "Individuel faglig støtte og inklusionsarbejde i folkeskoleregi.",
      "Tæt samarbejde med lærere, forældre og ledelse omkring elevernes trivsel."
    ]
  },
  {
    id: "red-barnet-ungdom",
    title: "Lektiehjælper",
    organization: "Red Barnet Ungdom",
    period: "Mar. 2025 - Nuv.",
    type: "Frivilligt arbejde",
    category: "omsorg",
    description: "Frivillig mentor med fokus på faglig indlæring, motivation og selvtillid hos skoleelever.",
    tags: ["Frivilligt", "Mentorskab", "Formidling"],
    bullets: [
      "Styrkelse af elevens faglige niveau i matematik og sprogfag.",
      "Opbygning af gode studievaner og motivation for skolegang."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
