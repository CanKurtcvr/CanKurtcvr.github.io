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
    title: "Kandidat i Digital Transformation (MSc)",
    titleEn: "MSc in Digital Transformation",
    organization: "Roskilde Universitet (RUC)",
    organizationEn: "Roskilde University (RUC)",
    period: "Start Sep. 2026",
    periodEn: "Starts Sep. 2026",
    type: "Uddannelse",
    typeEn: "Education",
    category: "uddannelse",
    description: "Videreuddannelse med fokus på strategisk planlægning af digitale omstillingsprocesser, enterprise-arkitektur, integration af komplekse IT-systemer og socio-teknisk systemdesign.",
    descriptionEn: "Master's program focusing on strategic digital transformation management, enterprise architecture, complex IT systems integration, and socio-technical systems design.",
    tags: ["Digital Transformation", "IT-strategi", "Enterprise-arkitektur", "Socio-teknisk Design", "RUC"],
    tagsEn: ["Digital Transformation", "IT Strategy", "Enterprise Architecture", "Socio-technical Design", "RUC"],
    bullets: [
      "Strategisk planlægning og governance af digitale omstillingsinitiativer i både private virksomheder og offentlige organisationer.",
      "Analyse, modellering og integration af komplekse enterprise IT-systemer, datastrukturer og kerneforretningsgange.",
      "Teknologiledelse, UX/UI research, socio-teknisk systemdesign og organisatorisk digital forandringsledelse."
    ],
    bulletsEn: [
      "Strategic planning and governance of digital transformation initiatives across private and public sector organizations.",
      "Analysis, modeling, and integration of complex enterprise IT systems, data structures, and core business workflows.",
      "Technology management, UX/UI research, socio-technical systems design, and organizational digital change management."
    ]
  },
  {
    id: "ruc-bachelor",
    title: "Bachelor i Informatik og Virksomhedsstudier (BSc)",
    titleEn: "BSc in Computer Science & Business Studies",
    organization: "Roskilde Universitet (RUC)",
    organizationEn: "Roskilde University (RUC)",
    period: "Sep. 2021 - Jun. 2024",
    periodEn: "Sep. 2021 - Jun. 2024",
    type: "Uddannelse",
    typeEn: "Education",
    category: "uddannelse",
    description: "Tværfaglig uddannelse der kombinerer datalogi, programmering (Python, JavaScript, SQL), datamodellering, regnskab, økonomistyring og HCI/UX-design.",
    descriptionEn: "Interdisciplinary degree combining computer science, software engineering (Python, JavaScript, SQL), data modeling, corporate finance, and HCI/UX design.",
    tags: ["Informatik", "Virksomhedsstudier", "Programmering", "UX-design", "Dataanalyse", "RUC"],
    tagsEn: ["Computer Science", "Business Studies", "Programming", "UX Design", "Data Analysis", "RUC"],
    bullets: [
      "Softwareudvikling (Python, JavaScript ES6+, SQL), datamodellering og relationelt databasedesign.",
      "Projektstyring, regnskabsanalyse, økonomistyring, forretningsstrategi og kvantitativ dataanalyse.",
      "Menneske-maskine interaktion (HCI), brugertest, UX/UI-design og socio-teknisk brugerforskning."
    ],
    bulletsEn: [
      "Software engineering (Python, JavaScript ES6+, SQL), data modeling, and relational database design.",
      "Project management, financial analysis, corporate finance, business strategy, and quantitative data analysis.",
      "Human-Computer Interaction (HCI), usability testing, UX/UI design, and user-centered system design."
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
    description: "Ansvarlig for rekonstruktion af komplekse kundesager, opbygning af automatiserede beregningsmodeller i Excel samt onboarding af konsulenter i forbindelse med bankdækkende gældssanering.",
    descriptionEn: "Responsible for complex financial case reconstruction, automated Excel financial model building, and consultant onboarding in a bank-wide debt remediation initiative.",
    tags: ["Dataanalyse", "Sagsrekonstruktion", "Excel", "Onboarding", "FinTech", "Danske Bank"],
    tagsEn: ["Data Analysis", "Case Reconstruction", "Excel", "Onboarding", "FinTech", "Danske Bank"],
    bullets: [
      "Sagsrekonstruktion af over 400 komplekse gældssager gennem dybdegående analyse af juridiske aktstykker, retsbøger, forlig og kontoudskrifter.",
      "Validering og opbygning af finansielle beregningsmodeller i Excel med nul-tolerance over for fejl i renter, afdrag og moratorium-perioder.",
      "Udarbejdelse af strukturede procesvejledninger (SOPs) samt fungeret som floorwalker med ansvar for onboarding og oplæring af 10+ nye konsulenter."
    ],
    bulletsEn: [
      "Reconstructed financial and legal histories for 400+ complex debt cases through rigorous audit of court filings, legal settlements, and loan ledgers.",
      "Validated and built financial calculation models in Excel with zero-tolerance error thresholds for interest rate rules, amortizations, and moratoria.",
      "Authored structured Standard Operating Procedures (SOPs) and served as floorwalker, onboarding and training 10+ new consultants on the project."
    ]
  },

  // --- PLEJE & OMSORG / FORMJDLING ---
  {
    id: "tolk-danmark",
    title: "Tolk (Vikariat / Freelance)",
    titleEn: "Interpreter (Freelance / Temporary)",
    organization: "Tolk Danmark",
    organizationEn: "Interpreter Denmark (Tolk Danmark)",
    period: "Feb. 2024 - Nuværende",
    periodEn: "Feb. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Formidler præcis simultan- og konsekutiv tolkning ved kritiske møder inden for offentlige myndigheder, retssager og sundhedssektoren med fokus på etik og diskretion.",
    descriptionEn: "Delivering precise simultaneous and consecutive interpretation during critical public, legal, and medical proceedings with strict adherence to ethics and confidentiality.",
    tags: ["Sprog", "Kommunikation", "Etik", "Diskretion", "Tolkevirksomhed"],
    tagsEn: ["Languages", "Communication", "Ethics", "Discretion", "Interpretation"],
    bullets: [
      "Simultan- og konsekutiv tolkning mellem parter i offentlige myndigheder, retssager og sundhedssektoren.",
      "Sikring af fuldstændig neutralitet, tavshedspligt og terminologisk præcision under tilspidsede og følsomme samtaler.",
      "Hurtig omstillingsevne til komplekse juridiske, tekniske og socialfaglige kontekster."
    ],
    bulletsEn: [
      "Simultaneous and consecutive interpretation across municipal agencies, court proceedings, and healthcare consultations.",
      "Ensured absolute neutrality, strict confidentiality, and precise domain terminology under high-pressure scenarios.",
      "Demonstrated rapid adaptability to complex legal, technical, and social work domain contexts."
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
    description: "Yder administrativ støtte og personlig omsorg til socialt udsatte borgere, håndterer tilspidsede situationer med ro og empati samt udfører digital journalføring.",
    descriptionEn: "Provides administrative support and personal care for vulnerable citizens, de-escalates high-stress situations with empathy, and manages digital case journaling.",
    tags: ["Socialt arbejde", "Administration", "Empati", "Konfliktnedtrapning", "Journalføring"],
    tagsEn: ["Social Work", "Administration", "Empathy", "De-escalation", "Documentation"],
    bullets: [
      "Relationsarbejde og konfliktnedtrapning med borgere i sårbare og uforudsigelige livssituationer.",
      "Fastholdelse af trygge, rolige rammer under tilspidsede episoder gennem aktiv lytning og de-eskalering.",
      "Dokumentation, journalføring og administrativ opfølgning i fagsystemer med høj præcision."
    ],
    bulletsEn: [
      "Built trust and de-escalated conflicts with residents experiencing complex social and personal crises.",
      "Maintained a secure, stable environment during high-stress situations through active listening and de-escalation.",
      "Conducted digital recordkeeping and administrative follow-up in institutional care software."
    ]
  },
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
    description: "Håndtering af daglige plejerutiner, personlig omsorg, tværfaglig overlevering til sundhedsfagligt personale og digital journalføring.",
    descriptionEn: "Managed daily care routines, resident well-being, interdisciplinary handovers to healthcare staff, and accurate digital medical journal documentation.",
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
    id: "ole-romer-skole",
    title: "Pædagogmedhjælper & Mentor",
    titleEn: "Teaching Assistant & Mentor",
    organization: "Ole-Rømer Skolen - Høje Taastrup",
    organizationEn: "Ole-Rømer School - Høje Taastrup",
    period: "Aug. 2019 - Okt. 2021",
    periodEn: "Aug. 2019 - Oct. 2021",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Understøttede undervisning og agerede støttepædagog for elever med faglige og sociale udfordringer.",
    descriptionEn: "Supported classroom teaching and acted as dedicated support educator for students with academic and social challenges.",
    tags: ["Undervisning", "Pædagogik", "Klasseledelse", "Mentorskap"],
    tagsEn: ["Teaching", "Pedagogy", "Classroom Management", "Mentorship"],
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
    title: "Frivillig Lektiehjælper",
    titleEn: "Volunteer Homework Tutor",
    organization: "Red Barnet Ungdom",
    organizationEn: "Save the Children Youth",
    period: "Mar. 2025 - Nuværende",
    periodEn: "Mar. 2025 - Present",
    type: "Frivilligt arbejde",
    typeEn: "Volunteer Work",
    category: "omsorg",
    description: "Frivillig mentor med fokus på faglig indlæring, motivation og opbygning af selvtillid hos skoleelever.",
    descriptionEn: "Volunteer mentor focusing on academic support, learning motivation, and confidence building for young students.",
    tags: ["Frivilligt", "Mentorskab", "Formidling", "Red Barnet"],
    tagsEn: ["Volunteer", "Mentorship", "Teaching", "Save the Children"],
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
