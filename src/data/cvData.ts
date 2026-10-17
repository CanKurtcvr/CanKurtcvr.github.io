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
    description: "Kandidatuddannelse med fokus på strategisk ledelse af digital omstilling, enterprise-arkitektur, socio-teknisk systemdesign og datadrevet procesoptimering.",
    descriptionEn: "Master's program focusing on strategic digital transformation management, enterprise architecture, socio-technical systems design, and data-driven process optimization.",
    tags: ["Digital Transformation", "IT-strategi", "Enterprise Arkitektur", "Socio-teknisk Design", "Forandringsledelse"],
    tagsEn: ["Digital Transformation", "IT Strategy", "Enterprise Architecture", "Socio-technical Design", "Change Management"],
    bullets: [
      "Strategisk planlægning, gevinstrealisering og styring af digitale omstillingsprocesser i komplekse organisationer.",
      "Analyse, modellering og integration af IT-systemer, enterprise-arkitektur samt forretningsmæssige workflows.",
      "Teknologiledelse, UX/UI research, socio-teknisk systemdesign samt organisatorisk forandringsledelse."
    ],
    bulletsEn: [
      "Strategic planning, value realization, and governance of digital transformation initiatives in complex organizations.",
      "Analysis, modeling, and integration of enterprise IT systems, core architecture, and core business workflows.",
      "Technology management, UX/UI research, socio-technical systems design, and organizational change management."
    ]
  },
  {
    id: "ruc-bachelor",
    title: "Bachelor i Informatik og Virksomhedsstudier",
    titleEn: "BSc in Computer Science & Business Studies",
    organization: "Roskilde Universitet (RUC)",
    organizationEn: "Roskilde University (RUC)",
    period: "Sep. 2021 - Jun. 2024",
    periodEn: "Sep. 2021 - Jun. 2024",
    type: "Uddannelse",
    typeEn: "Education",
    category: "uddannelse",
    description: "Tværfaglig uddannelse der kombinerer datalogi, softwarearkitektur, databasedesign, virksomhedsøkonomi og organisatorisk udvikling.",
    descriptionEn: "Interdisciplinary degree combining computer science, software architecture, database design, corporate finance, and business administration.",
    tags: ["Informatik", "Virksomhedsstudier", "Softwareudvikling", "SQL & Databaser", "UX/HCI", "Dataanalyse"],
    tagsEn: ["Computer Science", "Business Studies", "Software Engineering", "SQL & Databases", "UX/HCI", "Data Analysis"],
    bullets: [
      "Softwareudvikling og datamodellering i Python, JavaScript (ES6+) og SQL med fokus på relationelle databaser.",
      "Projektstyring, regnskab, økonomistyring, forretningsforståelse og kvantitativ dataanalyse.",
      "Menneske-maskine interaktion (HCI), brugertests, prototypeudvikling og brugercentreret systemdesign."
    ],
    bulletsEn: [
      "Software engineering and data modeling in Python, JavaScript (ES6+), and SQL with focus on relational databases.",
      "Project management, managerial accounting, corporate finance, business strategy, and quantitative data analysis.",
      "Human-Computer Interaction (HCI), usability testing, rapid prototyping, and user-centered system design."
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
    description: "Ansvarlig for rekonstruktion af komplekse finansielle sager, stordataanalyse i Excel samt onboarding og faglig sparring under bankdækkende gældssaneringsprojekter.",
    descriptionEn: "Led financial case reconstruction, large-scale data analysis in Excel, and consultant onboarding during bank-wide debt remediation and collections projects.",
    tags: ["FinTech", "Dataanalyse", "Sagsrekonstruktion", "Avanceret Excel", "Kvalitetssikring", "Onboarding"],
    tagsEn: ["FinTech", "Data Analysis", "Case Reconstruction", "Advanced Excel", "Quality Assurance", "Onboarding"],
    bullets: [
      "Gennemførte sagsrekonstruktion og auditerede over 400 komplekse gældssager ud fra juridiske aktstykker, retsbøger og kontoudskrifter.",
      "Opbyggede og validerede finansielle beregningsmodeller i Excel med nul-tolerance over for fejl i renter, afdrag og gebyrer.",
      "Udarbejde procesvejledninger og fungerede som floorwalker med ansvar for onboarding og sidemandsoplæring af 10+ nye konsulenter."
    ],
    bulletsEn: [
      "Reconstructed and audited financial histories for 400+ complex debt cases through rigorous inspection of legal filings, court records, and ledger accounts.",
      "Built and validated financial calculation models in Excel with zero tolerance for errors in interest, principal amortization, and fee structures.",
      "Authored standardized process guides and served as team floorwalker, onboarding and training 10+ new consultants."
    ]
  },

  // --- PLEJE & OMSORG & FORMIDLING ---
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
    description: "Håndtering af daglige plejerutiner, personlig assistancement, aktivisering af beboere og digital journalføring i sundhedsfaglige systemer.",
    descriptionEn: "Assisting elderly residents with daily care routines, personal support, social activation, and digital healthcare journal documentation.",
    tags: ["Ældrepleje", "Sundhedsdokumentation", "Omsorg", "Empati", "Situationsfornemmelse"],
    tagsEn: ["Elderly Care", "Healthcare Documentation", "Caregiving", "Empathy", "Situational Awareness"],
    bullets: [
      "Strukturerede og udførte daglige plejerutiner med fokus på tryghed, ro og høj situationsfornemmelse.",
      "Præcis og rettidig digital journalføring samt tværfaglig overlevering til sygeplejersker og sundhedspersonale.",
      "Håndterede komplekse og følsomme situationer med tålmodighed, empati og professionel borgerkontakt."
    ],
    bulletsEn: [
      "Structured and delivered daily care routines maintaining a calm, secure environment with high situational awareness.",
      "Executed precise digital healthcare documentation and interdisciplinary shift handovers to nursing staff.",
      "Demonstrated patience, empathy, and professional communication in sensitive healthcare situations."
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
    description: "Yder administrativ støtte, støttepædagogisk omsorg og de-eskalering for socialt udsatte borgere i tilspidsede situationer.",
    descriptionEn: "Provides administrative support, personal care, and conflict de-escalation for vulnerable citizens in high-stress social settings.",
    tags: ["Socialt arbejde", "Konfliktnedtrapning", "Administration", "Krisesituationer", "Empati"],
    tagsEn: ["Social Work", "De-escalation", "Administration", "Crisis Management", "Empathy"],
    bullets: [
      "Etablerede relationer og anvendte konfliktnedtrapning med borgere i komplekse og uforudsigelige livssituationer.",
      "Opretholdt trygge og rolige rammer under tilspidsede episoder gennem aktiv lytning og overblik.",
      "Udførte løbende dokumentation, journalføring og administrativ opfølgning i fagsystemer."
    ],
    bulletsEn: [
      "Built trust and de-escalated conflicts with residents experiencing complex social and personal crises.",
      "Maintained a calm, secure environment during high-stress situations through active listening and situational control.",
      "Conducted digital recordkeeping and administrative follow-up in core institutional software."
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
    description: "Simultan- og konsekutiv tolkning ved kritiske møder i offentlige og private myndigheder med høj vægt på etik, tavshedspligt og præcision.",
    descriptionEn: "Delivering precise simultaneous and consecutive interpretation in critical public and legal meetings with strict ethical adherence.",
    tags: ["Sprog & Tolkning", "Kommunikation", "Etik & Diskretion", "Juridisk Terminologi"],
    tagsEn: ["Languages & Interpretation", "Communication", "Ethics & Discretion", "Legal Terminology"],
    bullets: [
      "Udførte præcis simultan- og konsekutiv tolkning mellem parter i offentlige instanser, retssager og sundhedssektoren.",
      "Sikrede fuldstændig neutralitet, tavshedspligt og fagspecifik terminologisk præcision under højt pres.",
      "Demonstrerede hurtig omstillingsevne til komplekse juridiske, tekniske og sociale sammenhænge."
    ],
    bulletsEn: [
      "Provided simultaneous and consecutive interpretation across municipal agencies, legal proceedings, and medical consultations.",
      "Ensured strict neutrality, confidentiality, and exact domain terminology under high pressure.",
      "Demonstrated rapid adaptability across complex legal, technical, and social context domains."
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
    description: "Understøttede klasseundervisning og agerede støttepædagog for elever med faglige og sociale udfordringer.",
    descriptionEn: "Supported classroom teaching and acted as dedicated support educator for students with academic and social challenges.",
    tags: ["Undervisning", "Pædagogik", "Klasseledelse", "Inklusion"],
    tagsEn: ["Teaching", "Pedagogy", "Classroom Management", "Inclusion"],
    bullets: [
      "Leverede individuel faglig støtte, fællesskabsopbygning og inklusionsinitiativer i folkeskolen.",
      "Samarbejdede tæt med lærere, pædagoger og forældre om elevernes faglige udvikling og trivsel."
    ],
    bulletsEn: [
      "Delivered targeted academic support, community building, and inclusion initiatives in primary education.",
      "Collaborated closely with teachers, educators, and parents to support student growth and well-being."
    ]
  },
  {
    id: "red-barnet-ungdom",
    title: "Lektiehjælper & Mentor",
    titleEn: "Volunteer Homework Tutor & Mentor",
    organization: "Red Barnet Ungdom",
    organizationEn: "Save the Children Youth",
    period: "Mar. 2025 - Nuværende",
    periodEn: "Mar. 2025 - Present",
    type: "Frivilligt arbejde",
    typeEn: "Volunteer Work",
    category: "omsorg",
    description: "Frivillig mentor med fokus på faglig indlæring, studievaner og opbygning af selvtillid hos børn og unge.",
    descriptionEn: "Volunteer mentor focusing on academic support, study habits, and confidence building for young students.",
    tags: ["Frivilligt Arbejde", "Mentorskab", "Formidling", "Matematik & Sprog"],
    tagsEn: ["Volunteer Work", "Mentorship", "Teaching", "Mathematics & Languages"],
    bullets: [
      "Styrkede elevers faglige niveau i matematik, dansk og sprogfag gennem struktureret lektiehjælp.",
      "Hjulpere elever med at opbygge gode studievaner, motivation og faglig selvtillid."
    ],
    bulletsEn: [
      "Strengthened students' core proficiencies in mathematics, Danish, and language skills.",
      "Helped young students build structured study habits, academic motivation, and confidence."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
