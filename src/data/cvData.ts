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
    description: "Videreuddannelse med fokus på strategisk planlægning og governance af digitale omstillingsprocesser, enterprise architecture, analysering af komplekse IT-systemer og socio-teknisk systemdesign.",
    descriptionEn: "Master's program focusing on strategic governance of digital transformation, enterprise architecture, complex IT systems integration, and socio-technical system design.",
    tags: ["Digital Transformation", "IT-strategi", "Enterprise Architecture", "Socio-teknisk Design", "RUC"],
    tagsEn: ["Digital Transformation", "IT Strategy", "Enterprise Architecture", "Socio-technical Design", "RUC"],
    bullets: [
      "Strategisk planlægning og governance af digitale omstillingsprocesser i private og offentlige organisationer.",
      "Analyse, datamodellering og integration af komplekse IT-systemer, enterprise-arkitektur og forretningsprocesser.",
      "Teknologiledelse, UX/UI research, socio-teknisk systemdesign og digital forandringsledelse."
    ],
    bulletsEn: [
      "Strategic planning and governance of digital transformation initiatives in public and private sector organizations.",
      "Analysis, data modeling, and integration of complex IT systems, enterprise architecture, and core business workflows.",
      "Technology management, UX/UI research, socio-technical systems design, and organizational change management."
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
    description: "Tværfaglig uddannelse der kombinerer datalogi og programmering, datamodellering, regnskab, økonomistyring, projektledelse og HCI/UX-design.",
    descriptionEn: "Interdisciplinary degree combining computer science and software development, data modeling, financial accounting, corporate finance, project management, and HCI/UX design.",
    tags: ["Informatik", "Virksomhedsstudier", "Programmering", "UX-design", "Dataanalyse", "SQL"],
    tagsEn: ["Computer Science", "Business Studies", "Programming", "UX Design", "Data Analysis", "SQL"],
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
    description: "Drev kompleks sagsrekonstruktion, stordatanalyse og onboarding i forbindelse med bankdækkende gældssanering og inkasso-oprydning.",
    descriptionEn: "Led complex financial case reconstruction, large-scale data auditing, and consultant onboarding during a bank-wide debt and collections remediation program.",
    tags: ["Dataanalyse", "Sagsrekonstruktion", "Excel", "Onboarding", "FinTech", "Procesoptimering"],
    tagsEn: ["Data Analysis", "Case Reconstruction", "Excel", "Onboarding", "FinTech", "Process Optimization"],
    bullets: [
      "Sagsrekonstruktion af over 400 komplekse gældssager gennem dybdegående analyse af juridiske aktstykker, retsbøger, renteberegninger og bankudskrifter.",
      "Opbygning og validering af finansielle beregningsmodeller i Excel til opgørelse af rentepauser (moratorium) med nul-tolerance over for fejl.",
      "Agerede floorwalker med ansvar for faglig support, udarbejdelse af procesvejledninger samt onboarding og sidemandsoplæring af 10+ nye konsulenter."
    ],
    bulletsEn: [
      "Reconstructed complete financial histories for 400+ complex debt cases through rigorous audit of court filings, settlements, interest calculations, and ledger statements.",
      "Built and verified financial calculation models in Excel to evaluate interest moratoriums and repayment schedules with zero tolerance for errors.",
      "Served as floorwalker, authoring standard operating procedures, training 10+ new consultants, and facilitating team knowledge transfer."
    ]
  },

  // --- PLEJE & OMSORG / ØVRIGE ---
  {
    id: "tolk-danmark",
    title: "Tolk (Vikariat)",
    titleEn: "Certified Interpreter (Freelance / Temporary)",
    organization: "Tolk Danmark",
    organizationEn: "Interpreter Denmark (Tolk Danmark)",
    period: "Feb. 2024 - Nuværende",
    periodEn: "Feb. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Leverer præcis simultan- og konsekutiv tolkning i offentlige myndigheder, retssager og sundhedssektoren med fokus på juridisk/faglig terminologi, diskretion og absolut neutralitet.",
    descriptionEn: "Delivering precise simultaneous and consecutive interpretation across municipal agencies, legal court proceedings, and healthcare consultations with strict confidentiality and terminology precision.",
    tags: ["Simultantolkning", "Kommunikation", "Juridisk Terminologi", "Etik \& Diskretion"],
    tagsEn: ["Simultaneous Interpretation", "Communication", "Legal Terminology", "Ethics \& Discretion"],
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
    id: "forsorgshjemmet-absalon",
    title: "Omsorgsmedarbejder (Vikariat)",
    titleEn: "Care & Support Worker (Temporary)",
    organization: "Forsorgshjemmet Absalon",
    organizationEn: "Absalon Care Shelter (Forsorgshjemmet Absalon)",
    period: "Jan. 2024 - Nuværende",
    periodEn: "Jan. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Yder administrativ og social støtte til udsatte borgere, håndterer akutte situationer med de-eskalering og sikrer struktureret digital sagsjournalføring i fagsystemer.",
    descriptionEn: "Providing administrative support and personal care for vulnerable individuals, managing crisis situations through active de-escalation, and maintaining structured digital casework records.",
    tags: ["Socialt arbejde", "Konfliktnedtrapning", "Digital Journalføring", "Empati"],
    tagsEn: ["Social Work", "De-escalation", "Digital Documentation", "Empathy"],
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
    description: "Sikrede trygge rammer for ældre borgere gennem daglig omsorg, aktivisering og præcis digital sundhedsjournalføring og tværfaglig overlevering.",
    descriptionEn: "Supported elderly residents with daily care, structured routines, electronic health record (EHR) documentation, and interdisciplinary handovers.",
    tags: ["Ældrepleje", "EHR Journalføring", "Omsorg", "Empati"],
    tagsEn: ["Elderly Care", "EHR Documentation", "Caregiving", "Empathy"],
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
    title: "Pædagogmedhjælper \& Mentor",
    titleEn: "Teaching Assistant \& Volunteer Mentor",
    organization: "Ole-Rømer skolen / Red Barnet Ungdom",
    organizationEn: "Ole-Rømer School / Save the Children Youth",
    period: "2019 - Nuværende",
    periodEn: "2019 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Faglig støttepædagog og frivillig lektiehjælper med fokus på matematik, dansk og opbygning af strukturerede studievaner og selvtillid hos børn og unge.",
    descriptionEn: "Provided targeted academic support in mathematics and Danish, helping young students develop structured study habits and academic confidence.",
    tags: ["Undervisning", "Pædagogik", "Mentorskab", "Formidling"],
    tagsEn: ["Teaching", "Pedagogy", "Mentorship", "Communication"],
    bullets: [
      "Individuel faglig støtte, differentieret undervisning og inklusionsarbejde i folkeskolen.",
      "Frivillig mentor hos Red Barnet Ungdom med fokus på matematik, dansk og opbygning af studievaner.",
      "Tæt samarbejde med lærere, pædagoger og forældre om elevers faglige og sociale trivsel."
    ],
    bulletsEn: [
      "Provided targeted academic support and inclusion efforts for students requiring special assistance.",
      "Volunteer mentor at Save the Children Youth focusing on core proficiencies and study techniques.",
      "Collaborated closely with teachers, parents, and school management to foster student well-being."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
