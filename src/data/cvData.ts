export type CVCategory = "all" | "it" | "uddannelse" | "omsorg";

export interface CVItem {
  id: string;
  title: string;
  titleEn?: string;
  organization: string;
  organizationEn?: string;
  period: string;
  periodEn?: string;
  type: "Uddannelse" | "Erfaring" | "Frivilligt arbejde";
  typeEn?: string;
  category: "it" | "uddannelse" | "omsorg";
  description: string;
  descriptionEn?: string;
  tags: string[];
  tagsEn?: string[];
  bullets?: string[];
  bulletsEn?: string[];
}

export const cvItems: CVItem[] = [
  // --- UDDANNELSER ---
  {
    id: "ruc-kandidat",
    title: "Kandidat i Digital Transformation",
    titleEn: "MSc in Digital Transformation",
    organization: "Roskilde Universitet (RUC)",
    organizationEn: "Roskilde University (RUC)",
    period: "Start Sep. 2026",
    periodEn: "Starts Sep. 2026",
    type: "Uddannelse",
    typeEn: "Education",
    category: "uddannelse",
    description: "Videreuddannelse med fokus på digital omstilling, teknologi, strategisk ledelse og it-systemer i organisationer.",
    descriptionEn: "Master's program focused on digital transformation, technology management, strategic leadership, and organizational IT systems.",
    tags: ["Digital Transformation", "It-strategi", "RUC"],
    tagsEn: ["Digital Transformation", "IT Strategy", "RUC"],
    bullets: [
      "Strategisk planlægning og styring af digitale omstillingsprocesser i private og offentlige organisationer.",
      "Analyse og integration af komplekse IT-systemer og forretningsprocesser.",
      "Teknologiledelse, UX og socio-teknisk systemdesign."
    ],
    bulletsEn: [
      "Strategic planning and execution of digital transformation processes in private and public organizations.",
      "Analysis and integration of complex IT systems and business processes.",
      "Technology management, UX, and socio-technical system design."
    ]
  },
  {
    id: "ruc-bachelor",
    title: "Bachelor i Informatik og Virksomhedsstudier",
    titleEn: "BSc in Computer Science & Business Studies",
    organization: "Roskilde Universitet",
    organizationEn: "Roskilde University",
    period: "Sep. 2021 - Jun. 2024",
    periodEn: "Sep. 2021 - Jun. 2024",
    type: "Uddannelse",
    typeEn: "Education",
    category: "uddannelse",
    description: "Tværfaglig uddannelse der kombinerer datalogi, programmering, databasedesign, regnskab og organisatorisk udvikling.",
    descriptionEn: "Interdisciplinary degree combining computer science, software programming, database design, accounting, and business administration.",
    tags: ["Informatik", "Virksomhedsstudier", "UX-design", "Dataanalyse"],
    tagsEn: ["Computer Science", "Business Studies", "UX Design", "Data Analysis"],
    bullets: [
      "Grundlæggende programmering (Python, JavaScript, SQL) og datamodellering.",
      "Projektstyring, bogholderi, økonomistyring og forretningsforståelse.",
      "Menneske-maskine interaktion (HCI), UX-design og brugerresearch."
    ],
    bulletsEn: [
      "Core programming (Python, JavaScript, SQL) and data modeling.",
      "Project management, bookkeeping, financial management, and business acumen.",
      "Human-Computer Interaction (HCI), UX design, and user research."
    ]
  },

  // --- IT ERFARING ---
  {
    id: "danske-bank-it",
    title: "IT-konsulent (fuldtid)",
    titleEn: "IT Consultant (Full-time)",
    organization: "Danske Bank (via EY / M Networks)",
    organizationEn: "Danske Bank (via EY / M Networks)",
    period: "Jun. 2022 - Dec. 2023",
    periodEn: "Jun. 2022 - Dec. 2023",
    type: "Erfaring",
    typeEn: "Experience",
    category: "it",
    description: "Ansvarlig for fejlretning i komplekse kundesager, analyse af store datamængder i Excel og onboarding i forbindelse med gældssanering og inkasso-oprydning.",
    descriptionEn: "Responsible for resolving complex case errors, analyzing large data sets in Excel, and onboarding consultants during debt remediation and collections remediation projects.",
    tags: ["Dataanalyse", "Fejlretning", "Excel", "Onboarding"],
    tagsEn: ["Data Analysis", "Troubleshooting", "Excel", "Onboarding"],
    bullets: [
      "Sagsrekonstruktion af komplekse økonomiske forløb gennem analyse af juridiske aktstykker og bankudskrifter.",
      "Håndtering og validering af data for mere end 400 kunder i avancerede Excel-modeller.",
      "Udarbejdelse af præsentationer og onboarding af nye konsulenter i teamet (floorwalker)."
    ],
    bulletsEn: [
      "Case reconstruction of complex financial cases through thorough analysis of legal documents and bank statements.",
      "Handling and validating data for over 400 clients in advanced Excel financial models.",
      "Creating training guides and onboarding new consultants in the team (floorwalker)."
    ]
  },

  // --- PLEJE & OMSORG ---
  {
    id: "kaerbo-omsorgscenter",
    title: "Plejehjælper",
    titleEn: "Care Assistant",
    organization: "Kærbo Omsorgscenter, Ishøj",
    organizationEn: "Kærbo Care Center, Ishøj",
    period: "Jun. 2026 - Sep. 2026",
    periodEn: "Jun. 2026 - Sep. 2026",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Hjælp til ældre borgere med daglige rutiner, personlig pleje, aktivisering og digital journalføring.",
    descriptionEn: "Assisting elderly residents with daily routines, personal care, activities, and digital medical journal documentation.",
    tags: ["Ældrepleje", "Journalføring", "Omsorg", "Empati"],
    tagsEn: ["Elderly Care", "Documentation", "Caregiving", "Empathy"],
    bullets: [
      "Strukturering af daglige plejerutiner og skabelse af trygge rammer for beboerne.",
      "Præcis journalføring og tværfaglig overlevering til sygeplejersker og kollegaer.",
      "Høj grad af situationsfornemmelse, tålmodighed og menneskelig kontakt."
    ],
    bulletsEn: [
      "Structuring daily care routines and creating a safe, comfortable environment for residents.",
      "Accurate journal documentation and interdisciplinary handovers to nurses and colleagues.",
      "High situational awareness, patience, and empathetic communication."
    ]
  },
  {
    id: "forsorgshjemmet-absalon",
    title: "Omsorgsmedarbejder (Vikariat)",
    titleEn: "Care & Support Worker (Temporary)",
    organization: "Forsorgshjemmet Absalon",
    organizationEn: "Absalon Care Shelter",
    period: "Jan. 2024 - Nuværende",
    periodEn: "Jan. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Yder administrativ støtte og personlig omsorg til socialt udsatte borgere og håndterer komplekse sociale situationer med ro og empati.",
    descriptionEn: "Provides administrative support and personal care for vulnerable citizens, de-escalating complex social situations with calm and empathy.",
    tags: ["Socialt arbejde", "Administration", "Empati", "Konflikthåndtering"],
    tagsEn: ["Social Work", "Administration", "Empathy", "De-escalation"],
    bullets: [
      "Relationsarbejde med borgere i sårbare og uforudsigelige livssituationer.",
      "Konfliktnedtrapning og fastholdelse af rolige, trygge rammer.",
      "Dokumentation og administrativ opfølgning i fagsystemer."
    ],
    bulletsEn: [
      "Building trust and relationships with residents in vulnerable life situations.",
      "De-escalating conflicts and maintaining a calm, safe environment.",
      "Documentation and administrative follow-up in professional healthcare software."
    ]
  },

  // --- ØVRIGE ERFARINGER ---
  {
    id: "tolk-danmark",
    title: "Tolk (Vikariat)",
    titleEn: "Interpreter (Freelance)",
    organization: "Tolk Danmark",
    organizationEn: "Interpreter Denmark",
    period: "Feb. 2024 - Nuværende",
    periodEn: "Feb. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Formidler præcis tolkning og kommunikation ved kritiske møder med fokus på etik, diskretion og professionalisme.",
    descriptionEn: "Delivering precise interpretation and communication in critical meetings with strict adherence to ethics, confidentiality, and professionalism.",
    tags: ["Sprog", "Kommunikation", "Etik", "Diskretion"],
    tagsEn: ["Languages", "Communication", "Ethics", "Discretion"],
    bullets: [
      "Simultan- og konsekutiv tolkning mellem parter i offentlige og private instanser.",
      "Sikring af fuldstændig neutralitet, tavshedspligt og præcision i terminologi.",
      "Hurtig omstillingsevne til skiftende faglige kontekster."
    ],
    bulletsEn: [
      "Simultaneous and consecutive interpretation between parties in public and private sector meetings.",
      "Ensuring complete neutrality, strict confidentiality, and precise terminology.",
      "Rapid adaptability to diverse technical and medical contexts."
    ]
  },
  {
    id: "ole-romer-skole",
    title: "Pædagogmedhjælper",
    titleEn: "Teaching Assistant",
    organization: "Ole-Rømer skolen - Høje Taastrup",
    organizationEn: "Ole-Rømer School - Høje Taastrup",
    period: "Aug. 2019 - Okt. 2021",
    periodEn: "Aug. 2019 - Oct. 2021",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Understøttede undervisning og agerede støttepædagog for elever med faglige og sociale udfordringer.",
    descriptionEn: "Supported teaching and acted as dedicated support pedagogue for students with academic and social challenges.",
    tags: ["Undervisning", "Pædagogik", "Klasseledelse"],
    tagsEn: ["Teaching", "Pedagogy", "Classroom Management"],
    bullets: [
      "Individuel faglig støtte og inklusionsarbejde i folkeskoleregi.",
      "Tæt samarbejde med lærere, forældre og ledelse omkring elevernes trivsel."
    ],
    bulletsEn: [
      "Individual academic support and inclusion efforts in primary education.",
      "Close collaboration with teachers, parents, and management regarding student well-being."
    ]
  },
  {
    id: "red-barnet-ungdom",
    title: "Lektiehjælper",
    titleEn: "Volunteer Homework Tutor",
    organization: "Red Barnet Ungdom",
    organizationEn: "Save the Children Youth",
    period: "Mar. 2025 - Nuv.",
    periodEn: "Mar. 2025 - Present",
    type: "Frivilligt arbejde",
    typeEn: "Volunteer Work",
    category: "omsorg",
    description: "Frivillig mentor med fokus på faglig indlæring, motivation og selvtillid hos skoleelever.",
    descriptionEn: "Volunteer mentor focusing on academic learning, motivation, and confidence building for school children.",
    tags: ["Frivilligt", "Mentorskab", "Formidling"],
    tagsEn: ["Volunteer", "Mentorship", "Teaching"],
    bullets: [
      "Styrkelse af elevens faglige niveau i matematik og sprogfag.",
      "Opbygning af gode studievaner og motivation for skolegang."
    ],
    bulletsEn: [
      "Strengthening students' proficiency in mathematics and language subjects.",
      "Building effective study habits and motivation for school."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
