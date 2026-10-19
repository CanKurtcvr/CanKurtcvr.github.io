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
    description: "Videreuddannelse med fokus på digital omstilling, IT-strategi, socio-teknisk systemdesign og forretningsmæssig procesoptimering.",
    descriptionEn: "Master's program focusing on digital transformation, IT strategy, socio-technical systems design, and business process optimization.",
    tags: ["Digital Transformation", "It-strategi", "Socio-teknisk Design", "RUC"],
    tagsEn: ["Digital Transformation", "IT Strategy", "Socio-technical Design", "RUC"],
    bullets: [
      "Strategisk planlægning og styring af digitale omstillingsprocesser i private og offentlige organisationer.",
      "Analyse, modellering og integration af komplekse IT-systemer, enterprise-arkitektur og forretningsprocesser.",
      "Teknologiledelse, UX/UI research, socio-teknisk systemdesign og digital forandringsledelse."
    ],
    bulletsEn: [
      "Strategic planning and governance of digital transformation initiatives in public and private sector organizations.",
      "Analysis, modeling, and integration of complex IT systems, enterprise architecture, and core business workflows.",
      "Technology management, UX/UI research, socio-technical systems design, and organizational change management."
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
    descriptionEn: "Interdisciplinary degree combining computer science, software programming, database design, corporate finance, and business administration.",
    tags: ["Informatik", "Virksomhedsstudier", "Programmering", "UX-design", "Dataanalyse"],
    tagsEn: ["Computer Science", "Business Studies", "Programming", "UX Design", "Data Analysis"],
    bullets: [
      "Softwareudvikling (Python, JavaScript, SQL), datamodellering og relational databasedesign.",
      "Projektstyring, bogholderi, økonomistyring, forretningsforståelse og kvantitativ dataanalyse.",
      "Menneske-maskine interaktion (HCI), brugertest, UX-design og socio-teknisk brugerforskning."
    ],
    bulletsEn: [
      "Software engineering (Python, JavaScript, SQL), data modeling, and relational database design.",
      "Project management, managerial accounting, corporate finance, business strategy, and quantitative analysis.",
      "Human-Computer Interaction (HCI), usability testing, UX design, and user-centered system design."
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
    description: "Ansvarlig for fejlretning og rekonstruktion af komplekse kundesager, analyse af stordata i Excel samt onboarding i forbindelse med gældssanering og inkasso-oprydning.",
    descriptionEn: "Responsible for complex financial case reconstruction, large-scale data analysis in Excel, and consultant onboarding during bank-wide debt and collections remediation projects.",
    tags: ["Dataanalyse", "Sagsrekonstruktion", "Excel", "Onboarding", "FinTech"],
    tagsEn: ["Data Analysis", "Case Reconstruction", "Excel", "Onboarding", "FinTech"],
    bullets: [
      "Sagsrekonstruktion af over 400 komplekse gældssager gennem analyse af juridiske aktstykker, retsbøger og bankudskrifter.",
      "Validering og opbygning af finansielle beregningsmodeller i Excel med nul-tolerance over for fejl i renter og afdrag.",
      "Udarbejdelse af procesvejledninger samt onboarding og sidemandsoplæring af 10+ nye konsulenter i teamet (floorwalker)."
    ],
    bulletsEn: [
      "Reconstructed financial histories for 400+ complex debt cases through rigorous audit of legal filings, court records, and ledger statements.",
      "Validated and constructed financial calculation models in Excel with zero tolerance for errors in interest and principal amortization.",
      "Authored process guides and served as floorwalker, onboarding and training 10+ new consultants on the project."
    ]
  },

  // --- PLEJE & OMSORG ---
  {
    id: "kaerbo-omsorgscenter",
    title: "Plejehjælper",
    titleEn: "Care Assistant",
    organization: "Kærbo Omsorgscenter, Ishøj",
    organizationEn: "Kærbo Care Center, Ishøj",
    period: "Jun. 2024 - Sep. 2024",
    periodEn: "Jun. 2024 - Sep. 2024",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Hjælp til ældre borgere med daglige rutiner, personlig pleje, aktivisering og digital journalføring.",
    descriptionEn: "Assisting elderly residents with daily care, personal assistance, social activities, and digital healthcare documentation.",
    tags: ["Ældrepleje", "Journalføring", "Omsorg", "Empati"],
    tagsEn: ["Elderly Care", "Documentation", "Caregiving", "Empathy"],
    bullets: [
      "Strukturering af daglige plejerutiner og skabelse af trygge rammer for beboerne med høj situationsfornemmelse.",
      "Præcis digital journalføring og tværfaglig overlevering til sygeplejersker og sundhedsfagligt personale.",
      "Høj grad af tålmodighed, empati og professionel borgerkontakt i udfordrende situationer."
    ],
    bulletsEn: [
      "Structured daily care routines to maintain a calm, secure environment for residents with high situational awareness.",
      "Accurate digital medical journal documentation and interdisciplinary handovers to nurses and healthcare staff.",
      "Demonstrated patience, empathy, and professional resident interaction in challenging health situations."
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
    descriptionEn: "Provides administrative support and personal care for vulnerable citizens, de-escalating complex social situations with calm professionalism.",
    tags: ["Socialt arbejde", "Administration", "Empati", "Konfliktnedtrapning"],
    tagsEn: ["Social Work", "Administration", "Empathy", "De-escalation"],
    bullets: [
      "Relationsarbejde og konfliktnedtrapning med borgere i sårbare og uforudsigelige livssituationer.",
      "Fastholdelse af trygge, rolige rammer under tilspidsede episoder.",
      "Dokumentation, journalføring og administrativ opfølgning i fagsystemer."
    ],
    bulletsEn: [
      "Built trust and de-escalated conflicts with residents experiencing complex social and personal crises.",
      "Maintained a secure, stable environment during high-stress situations through active listening and de-escalation.",
      "Conducted digital recordkeeping and administrative follow-up in institutional care software."
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
    descriptionEn: "Delivering precise interpretation and communication in critical public and private meetings with strict adherence to ethics and confidentiality.",
    tags: ["Sprog", "Kommunikation", "Etik", "Diskretion"],
    tagsEn: ["Languages", "Communication", "Ethics", "Discretion"],
    bullets: [
      "Simultan- og konsekutiv tolkning mellem parter i offentlige myndigheder, retssager og sundhedssektoren.",
      "Sikring af fuldstændig neutralitet, tavshedspligt og terminologisk præcision under pres.",
      "Hurtig omstillingsevne til komplekse juridiske, tekniske og sociale kontekster."
    ],
    bulletsEn: [
      "Simultaneous and consecutive interpretation across municipal agencies, legal proceedings, and medical consultations.",
      "Ensured total neutrality, strict confidentiality, and precise domain terminology under pressure.",
      "Demonstrated rapid adaptability to complex legal, technical, and social context settings."
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
    descriptionEn: "Supported classroom teaching and acted as dedicated support educator for students with academic and social challenges.",
    tags: ["Undervisning", "Pædagogik", "Klasseledelse"],
    tagsEn: ["Teaching", "Pedagogy", "Classroom Management"],
    bullets: [
      "Individuel faglig støtte, differentieret undervisning og inklusionsarbejde i folkeskolen.",
      "Tæt samarbejde med lærere, pædagoger og forældre om elevernes faglige og sociale trivsel."
    ],
    bulletsEn: [
      "Provided targeted academic support and inclusion efforts for students requiring special assistance.",
      "Collaborated closely with teachers, parents, and school management to foster student well-being."
    ]
  },
  {
    id: "red-barnet-ungdom",
    title: "Lektiehjælper",
    titleEn: "Volunteer Homework Tutor",
    organization: "Red Barnet Ungdom",
    organizationEn: "Save the Children Youth",
    period: "Mar. 2025 - Nuværende",
    periodEn: "Mar. 2025 - Present",
    type: "Frivilligt arbejde",
    typeEn: "Volunteer Work",
    category: "omsorg",
    description: "Frivillig mentor med fokus på faglig indlæring, motivation og selvtillid hos skoleelever.",
    descriptionEn: "Volunteer mentor focusing on academic support, learning motivation, and confidence building for young students.",
    tags: ["Frivilligt", "Mentorskab", "Formidling"],
    tagsEn: ["Volunteer", "Mentorship", "Teaching"],
    bullets: [
      "Styrkelse af elevers faglige niveau i matematik, dansk og sprogfag.",
      "Opbygning af strukturerede studievaner, motivation og faglig selvtillid."
    ],
    bulletsEn: [
      "Strengthened students' core proficiencies in mathematics, Danish, and languages.",
      "Helped students develop structured study habits, academic motivation, and confidence."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
