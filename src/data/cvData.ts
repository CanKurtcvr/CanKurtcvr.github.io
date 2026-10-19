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
    description: "Kandidatuddannelse med fokus på strategisk ledelse af digitale omstilling, IT-arkitektur, socio-teknisk systemdesign og procesoptimering i komplekse organisationer.",
    descriptionEn: "Master's degree specializing in strategic digital transformation, enterprise IT architecture, socio-technical systems design, and business process optimization.",
    tags: ["Digital Transformation", "It-strategi", "Socio-teknisk Design", "Procesoptimering", "RUC"],
    tagsEn: ["Digital Transformation", "IT Strategy", "Socio-technical Design", "Process Optimization", "RUC"],
    bullets: [
      "Strategisk planlægning, governance og implementering af digitale transformationer i både private og offentlige virksomheder.",
      "Analyse, kravspecifikation og modellering af komplekse IT-systemer, enterprise-arkitektur og kerneforretningsgange.",
      "Teknologiledelse, UX/UI research, socio-teknisk systemdesign og organisatorisk forandringsledelse."
    ],
    bulletsEn: [
      "Strategic planning, governance, and execution of digital transformation initiatives across enterprise and public sector contexts.",
      "Analysis, requirements engineering, and modeling of complex IT systems, enterprise architecture, and operational workflows.",
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
    description: "Tværfaglig kombinationsuddannelse i datalogi, softwareudvikling, databasedesign, regnskab, økonomistyring og organisatorisk analyse.",
    descriptionEn: "Interdisciplinary combined degree bridging computer science, software engineering, database architecture, corporate finance, and business management.",
    tags: ["Informatik", "Virksomhedsstudier", "Programmering", "UX-design", "Dataanalyse", "SQL"],
    tagsEn: ["Computer Science", "Business Studies", "Programming", "UX Design", "Data Analysis", "SQL"],
    bullets: [
      "Softwareudvikling (Python, JavaScript, SQL), datamodellering og relationelt databasedesign.",
      "Projektstyring, bogholderi, økonomistyring, forretningsforståelse og kvantitativ datadrevet analyse.",
      "Menneske-maskine interaktion (HCI), brugertest, UX-design og brugercentreret systemudvikling."
    ],
    bulletsEn: [
      "Software engineering (Python, JavaScript, SQL), data modeling, and relational database system design.",
      "Project management, managerial accounting, corporate finance, business strategy, and quantitative data analysis.",
      "Human-Computer Interaction (HCI), usability engineering, UX design, and user-centered systems development."
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
    description: "Ansvarlig for rekonstruktion af komplekse finansielle kundesager, stordataanalyse i Excel og Onboarding/Sidemandsoplæring på bankens forretningskritiske gældssanerings- og inkassoprojekt.",
    descriptionEn: "Key responsible for complex financial case reconstruction, large-scale data analysis in Excel, and consultant onboarding during bank-wide debt and collections remediation projects.",
    tags: ["Dataanalyse", "Sagsrekonstruktion", "Excel", "Onboarding", "FinTech", "Processer"],
    tagsEn: ["Data Analysis", "Case Reconstruction", "Excel", "Onboarding", "FinTech", "Processes"],
    bullets: [
      "Genopbygning og sagsrekonstruktion af over 400 komplekse gældssager gennem analyse af juridiske aktstykker, retsbøger og kontoudskrifter.",
      "Validering og opbygning af finansielle beregningsmodeller i Excel med nul-tolerance over for fejl i renter, amortisering og afdrag.",
      "Udarbejdelse af procesvejledninger samt onboarding og sidemandsoplæring af 10+ nye konsulenter som faglig 'floorwalker'."
    ],
    bulletsEn: [
      "Reconstructed full financial and legal histories for 400+ complex debt cases through rigorous audit of court records, agreements, and bank ledgers.",
      "Validated and built financial calculation models in Excel with zero tolerance for errors in interest, amortization schedules, and principal calculations.",
      "Authored standard operating procedures and served as floorwalker, onboarding and training 10+ new consultants into the project team."
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
    description: "Strukturering af daglige plejerutiner, personlig omsorg og præcis digital journalføring i sundhedsfaglige systemer.",
    descriptionEn: "Structuring daily care routines, personal caregiving, and accurate digital recordkeeping in healthcare management systems.",
    tags: ["Ældrepleje", "Journalføring", "Omsorg", "Empati", "Situationsfornemmelse"],
    tagsEn: ["Elderly Care", "Documentation", "Caregiving", "Empathy", "Situational Awareness"],
    bullets: [
      "Skabelse af trygge, strukturerede rammer for beboerne med høj grad af nærvær og situationsfornemmelse.",
      "Præcis digital journalføring og tværfaglig overlevering til sygeplejersker og sundhedsfagligt personale.",
      "Høj grad af tålmodighed, empati og professionel borgerkontakt i pressede eller komplicerede situationer."
    ],
    bulletsEn: [
      "Established structured and calm environments for residents through active presence and high situational awareness.",
      "Accurate digital medical journal documentation and interdisciplinary handovers to nursing and healthcare teams.",
      "Demonstrated patience, empathy, and professional resident engagement under demanding clinical conditions."
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
    description: "Yder administrativ støtte og personlig omsorg til socialt udsatte borgere, håndterer tilspidsede episoder med konfliktnedtrapning og sikrer fyldestgørende sagsdokumentation.",
    descriptionEn: "Provides administrative support and personal care for vulnerable citizens, de-escalates high-stress social conflicts, and maintains precise case documentation in specialized platforms.",
    tags: ["Socialt Arbejde", "Administration", "Empati", "Konfliktnedtrapning", "Sagsbehandling"],
    tagsEn: ["Social Work", "Administration", "Empathy", "De-escalation", "Case Management"],
    bullets: [
      "Relationsarbejde og konfliktnedtrapning i samarbejde med borgere i sårbare og uforudsigelige livssituationer.",
      "Fastholdelse af trygge, rolige rammer under tilspidsede episoder gennem aktiv lytning og de-eskalering.",
      "Dokumentation, journalføring og administrativ opfølgning i fagsystemer med fokus på retsstilling og borgerens trivsel."
    ],
    bulletsEn: [
      "Built trust and de-escalated conflicts with residents experiencing severe personal and socio-economic crises.",
      "Maintained a calm, secure institutional environment during high-stress situations using proven de-escalation methods.",
      "Conducted digital recordkeeping and administrative follow-up in institutional care software."
    ]
  },

  // --- ØVRIGE ERFARINGER ---
  {
    id: "tolk-danmark",
    title: "Tolk (Vikariat / Freelance)",
    titleEn: "Interpreter (Freelance)",
    organization: "Tolk Danmark",
    organizationEn: "Interpreter Denmark",
    period: "Feb. 2024 - Nuværende",
    periodEn: "Feb. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Formidler præcis simultan- og konsekutiv tolkning ved kritiske møder med fuldstændig etik, neutralitet og juridisk/medicinsk terminologisk præcision.",
    descriptionEn: "Delivering precise simultaneous and consecutive interpretation in high-stakes settings with strict ethics, neutrality, and exact legal/medical terminology.",
    tags: ["Sprog", "Kommunikation", "Etik", "Diskretion", "Konsekutiv Tolkning"],
    tagsEn: ["Languages", "Communication", "Ethics", "Discretion", "Consecutive Interpreting"],
    bullets: [
      "Simultan- og konsekutiv tolkning mellem parter i offentlige myndigheder, retssager, kommuner og sundhedssektoren.",
      "Sikring af fuldstændig neutralitet, tavshedspligt og terminologisk præcision under højt pres.",
      "Hurtig omstillingsevne til komplekse juridiske, tekniske og socialfaglige kontekster."
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
    description: "Understøttede undervisning og agerede dedikeret støttepædagog for elever med faglige, sociale og trivselsmæssige udfordringer.",
    descriptionEn: "Supported classroom teaching and acted as dedicated support educator for students facing academic, social, or behavioral challenges.",
    tags: ["Undervisning", "Pædagogik", "Klasseledelse", "Inklusion"],
    tagsEn: ["Teaching", "Pedagogy", "Classroom Management", "Inclusion"],
    bullets: [
      "Individuel faglig støtte, differentieret undervisning og målrettet inklusionsarbejde i folkeskolen.",
      "Tæt samarbejde med lærere, pædagoger og forældre om elevernes faglige progression og sociale trivsel."
    ],
    bulletsEn: [
      "Provided targeted academic support and inclusion efforts for students requiring specialized assistance.",
      "Collaborated closely with teachers, parents, and school management to foster student well-being and development."
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
    description: "Frivillig mentor med fokus på faglig indlæring i matematik, dansk og sprogfag samt opbygning af selvtillid og studieteknik hos børn og unge.",
    descriptionEn: "Volunteer mentor focusing on academic proficiency in mathematics, languages, and study habits, building self-confidence in youth.",
    tags: ["Frivilligt", "Mentorskab", "Formidling", "Matematik"],
    tagsEn: ["Volunteer", "Mentorship", "Teaching", "Mathematics"],
    bullets: [
      "Styrkelse af elevers faglige niveau i matematik, dansk og engelsk.",
      "Opbygning af strukturerede studievaner, lyst til læring og faglig selvtillid."
    ],
    bulletsEn: [
      "Strengthened students' core proficiencies in mathematics, Danish, and English.",
      "Helped students develop structured study habits, academic motivation, and confidence."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
