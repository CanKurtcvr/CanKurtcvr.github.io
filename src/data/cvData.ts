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
    description: "Videreuddannelse med fokus på strategisk planlægning, socio-teknisk systemdesign, enterprise-arkitektur og forretningsmæssig procesoptimering i komplekse organisationer.",
    descriptionEn: "Master's program focusing on strategic digital transformation, socio-technical systems design, enterprise architecture, and business process engineering in complex organizations.",
    tags: ["Digital Transformation", "IT-strategi", "Socio-teknisk Design", "Procesoptimering"],
    tagsEn: ["Digital Transformation", "IT Strategy", "Socio-technical Design", "Process Optimization"],
    bullets: [
      "Strategisk planlægning, governance og forandringsledelse af digitale omstillingsprocesser i private og offentlige virksomheder.",
      "Analyse, datamodellering og integration af komplekse IT-systemer, workflow-automatisering og enterprise-arkitektur.",
      "Teknologiledelse, UX/UI research, socio-teknisk systemdesign og værdikædeanalyse."
    ],
    bulletsEn: [
      "Strategic planning, governance, and change management of large-scale digital transformation initiatives across public and private sectors.",
      "Analysis, data modeling, and integration of complex IT systems, workflow automation, and enterprise architecture.",
      "Technology leadership, UX/UI research, socio-technical systems design, and value chain optimization."
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
    description: "Tværfaglig uddannelse der kombinerer datalogi, softwareudvikling (Python, JS, SQL), datamodellering, regnskab, økonomistyring og organisatorisk udvikling.",
    descriptionEn: "Interdisciplinary degree combining computer science, software engineering (Python, JS, SQL), data modeling, financial accounting, and organizational development.",
    tags: ["Informatik", "Virksomhedsstudier", "Programmering", "UX-design", "Dataanalyse"],
    tagsEn: ["Computer Science", "Business Studies", "Programming", "UX Design", "Data Analysis"],
    bullets: [
      "Softwarearkitektur (Python, JavaScript ES6+, SQL), relationel databasedesign og RESTful webservicer.",
      "Projektstyring, regnskabsanalyse, økonomistyring, forretningsstrategi og kvantitativ dataanalyse.",
      "Menneske-maskine interaktion (HCI), brugertest, UX-prototyping og socio-teknisk brugerforskning."
    ],
    bulletsEn: [
      "Software engineering (Python, JavaScript ES6+, SQL), relational database design, and RESTful web services.",
      "Project management, managerial accounting, corporate finance, business strategy, and quantitative data analysis.",
      "Human-Computer Interaction (HCI), usability testing, interactive UX prototyping, and user-centered system design."
    ]
  },

  // --- IT & CONSULTING ERFARING ---
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
    description: "Nøglerolle i bankens omfattende gældssanerings- og oprydningsprojekt. Ansvarlig for sagsrekonstruktion af komplekse kundesager, stordataanalyse i Excel og sidemandsoplæring af nye konsulenter.",
    descriptionEn: "Key role in bank-wide debt remediation and recovery project. Responsible for complex case reconstruction, large-scale data audit in Excel, and consultant onboarding.",
    tags: ["Dataanalyse", "Sagsrekonstruktion", "Excel", "Onboarding", "FinTech", "Compliance"],
    tagsEn: ["Data Analysis", "Case Reconstruction", "Excel", "Onboarding", "FinTech", "Compliance"],
    bullets: [
      "Gennemførte dybdegående sagsrekonstruktion og juridisk audit af mere end 400 komplekse gældssager ud fra retsbøger, forlig, renteberegninger og bankudskrifter.",
      "Udviklede og validerede finansielle beregningsmodeller i Excel med nul-tolerance over for fejl i renter, afdrag og rentepauser (moratorium).",
      "Fungerede som Floorwalker og udarbejdede strukturede procesvejledninger, der sikrede effektiv onboarding og oplæring af 10+ nye IT-konsulenter."
    ],
    bulletsEn: [
      "Executed comprehensive case reconstruction and legal audit for 400+ complex debt files utilizing court transcripts, settlement agreements, and interest ledgers.",
      "Validated and constructed financial calculation models in Excel with zero error tolerance across interest rates, principal amortizations, and payment moratoria.",
      "Served as Floorwalker and authored structured process guides, leading the onboarding and technical training for 10+ new IT consultants."
    ]
  },

  // --- FORMIPLING & SPROG ---
  {
    id: "tolk-danmark",
    title: "Certificeret Tolk (Vikariat)",
    titleEn: "Certified Interpreter (Freelance)",
    organization: "Tolk Danmark",
    organizationEn: "Interpreter Denmark",
    period: "Feb. 2024 - Nuværende",
    periodEn: "Feb. 2024 - Present",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Leverer professionel simultan- og konsekutiv tolkning ved kritiske retsmøder, offentlige instanser og i sundhedssektoren under strenge etiske retningslinjer.",
    descriptionEn: "Delivering professional simultaneous and consecutive interpretation in high-stakes legal proceedings, municipal agencies, and healthcare services under strict ethical standards.",
    tags: ["Sprog", "Kommunikation", "Etik", "Diskretion", "Jura & Sundhed"],
    tagsEn: ["Languages", "Communication", "Ethics", "Discretion", "Legal & Healthcare"],
    bullets: [
      "Udfører præcis simultan- og konsekutiv tolkning i komplekse juridiske, sociale og lægefaglige sammenhænge.",
      "Sikrer 100% opretholdelse af tavshedspligt, objektivitet og terminologisk præcision under pres.",
      "Hurtig omstillingsevne og høj kultur- og situationsfornemmelse i spændte samtalemiljøer."
    ],
    bulletsEn: [
      "Provides exact simultaneous and consecutive interpretation across complex legal, social, and medical environments.",
      "Ensures total adherence to confidentiality, absolute neutrality, and high domain terminology precision under pressure.",
      "Demonstrates rapid adaptability and keen situational awareness in high-stress dialogue settings."
    ]
  },

  // --- SOCIALT ARBEJDE & OMSORG ---
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
    description: "Yder administrativ støtte, pædagogisk guidning og personlig omsorg for socialt udsatte borgere samt håndterer komplekse situationer med konfliktdeeskalering og ro.",
    descriptionEn: "Provides administrative support, guidance, and personal care for vulnerable citizens, handling high-conflict situations with calm de-escalation and professionalism.",
    tags: ["Socialt arbejde", "Administration", "Konfliktnedtrapning", "Journalføring"],
    tagsEn: ["Social Work", "Administration", "De-escalation", "Documentation"],
    bullets: [
      "Opbygger trygge relationer og anvender aktiv konfliktnedtrapning over for borgere i akutte livskriser.",
      "Sikrer præcis og retvisende digital journalføring og sagsdokumentation i fagsystemer.",
      "Opretholder struktur, sikkerhed og rolige rammer på institutionen i uforudsigelige situationer."
    ],
    bulletsEn: [
      "Establishes trusting relations and applies active de-escalation techniques with residents in acute crisis.",
      "Maintains precise digital documentation and administrative case tracking in institutional social software.",
      "Ensures structural safety and a calm environment in dynamic, high-stress situations."
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
    description: "Hjælp til ældre borgere med daglige rutiner, personlig pleje, aktivisering og sundhedsfaglig digital journalføring.",
    descriptionEn: "Assisting elderly residents with daily routines, personal healthcare, social activities, and digital medical journal documentation.",
    tags: ["Ældrepleje", "Sundhedsjournal", "Omsorg", "Empati"],
    tagsEn: ["Elderly Care", "Medical Documentation", "Caregiving", "Empathy"],
    bullets: [
      "Strukturerer og udfører daglige plejeopgaver med høj empatisk og fagmæssig standard.",
      "Sikrer præcis digital journalføring samt professionel overlevering til sygeplejersker og læger.",
      "Skaber tryghed og livskvalitet for borgerne gennem udpræget tålmodighed og situationsfornemmelse."
    ],
    bulletsEn: [
      "Structured and executed daily personal care routines maintaining high empathetic and professional standards.",
      "Ensured precise digital medical documentation and interdisciplinary handovers to nursing staff.",
      "Created a safe and meaningful daily life for residents through high situational awareness and patience."
    ]
  },

  // --- FRIVILLIGT ARBEJDE & UNDERVISNING ---
  {
    id: "ole-romer-skole",
    title: "Pædagogmedhjælper & Mentor",
    titleEn: "Teaching Assistant & Mentor",
    organization: "Ole-Rømer skolen, Høje Taastrup",
    organizationEn: "Ole-Rømer School, Høje Taastrup",
    period: "Aug. 2019 - Okt. 2021",
    periodEn: "Aug. 2019 - Oct. 2021",
    type: "Erfaring",
    typeEn: "Experience",
    category: "omsorg",
    description: "Understøttede undervisningen og fungerede som dedikeret støttepædagog for elever med særlige faglige og sociale behov.",
    descriptionEn: "Supported classroom instruction and served as dedicated learning mentor for students facing academic and social challenges.",
    tags: ["Undervisning", "Inklusion", "Mentor", "Klasseledelse"],
    tagsEn: ["Teaching", "Inclusion", "Mentorship", "Classroom Management"],
    bullets: [
      "Ydede målrettet faglig støtte i folkeskoleregi med fokus på differentieret læring og inklusion.",
      "Tæt tværfagligt samarbejde med lærere og forældre omkring elevernes trivsel og faglige fremskridt."
    ],
    bulletsEn: [
      "Provided targeted academic guidance with focus on differentiated learning and student inclusion.",
      "Collaborated closely with teachers, parents, and school staff to advance student well-being and academic progress."
    ]
  },
  {
    id: "red-barnet-ungdom",
    title: "Frivillig Lektiehjælper & Mentor",
    titleEn: "Volunteer Homework Tutor & Mentor",
    organization: "Red Barnet Ungdom",
    organizationEn: "Save the Children Youth",
    period: "Mar. 2025 - Nuværende",
    periodEn: "Mar. 2025 - Present",
    type: "Frivilligt arbejde",
    typeEn: "Volunteer Work",
    category: "omsorg",
    description: "Frivillig mentor med fokus på faglig løft i matematik, dansk og sprogfag samt styrkelse af selvtillid og studievaner.",
    descriptionEn: "Volunteer mentor providing academic tutoring in mathematics, Danish, and foreign languages while building confidence and study habits.",
    tags: ["Frivilligt", "Mentorskab", "Matematik", "Sprog"],
    tagsEn: ["Volunteer", "Mentorship", "Mathematics", "Languages"],
    bullets: [
      "Styrker børns og unges faglige selvtillid og motivation gennem strukturerede lektiecafeer.",
      "Udvikler gode studieteknikker og pædagogiske læringsværktøjer tilpasset den enkelte elev."
    ],
    bulletsEn: [
      "Strengthens youth academic confidence and learning motivation through structured tutoring sessions.",
      "Develops personalized study techniques and educational tools tailored to individual student needs."
    ]
  }
];

export function getCVItemById(id: string): CVItem | undefined {
  return cvItems.find(item => item.id === id);
}
