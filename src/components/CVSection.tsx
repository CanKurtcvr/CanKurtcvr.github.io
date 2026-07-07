import React from "react";
import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, User, Globe, Star, Car, Heart } from "lucide-react";

const profileText =
  "Fagligt stærk og alsidig profil med baggrund inden for IT, analyse og formidling. Jeg trives i roller med stort ansvar, hvor jeg kan bringe min tekniske forståelse og menneskelige empati i spil. Mit mål er at finde en langsigtet arbejdsplads med en sund balance mellem professionalisme og et godt kollegialt fællesskab. Til holdet bidrager jeg med et bredt kompetencespænd og et stort drive for at skabe resultater.";

const educationData = [
  {
    period: "Sep. 2021 – Jun. 2024",
    title: "Bachelor i Informatik og Virksomhedsstudier",
    institution: "Roskilde Universitet",
    description: "Fokus på programmering (Java, Python), dataanalyse, bogføring, UX-design og organisatorisk filosofi.",
  }
];

const experienceData = [
  {
    period: "Feb. 2024 – Nuværende",
    title: "Tolk (Vikariat)",
    company: "Tolk Danmark",
    tasks: [
      "Formidler præcis dansk-engelsk kommunikation ved kritiske møder med fokus på etik og professionalisme.",
    ],
  },
  {
    period: "Jan. 2024 – Nuværende",
    title: "Omsorgsmedarbejder (Vikariat)",
    company: "Forsorgshjemmet Absalon",
    tasks: [
      "Yder administrativ støtte og personlig omsorg til udsatte borgere og håndterer komplekse sociale situationer med ro og empati.",
    ],
  },
  {
    period: "Jun. 2022 – Dec. 2023",
    title: "IT-konsulent (fuldtid)",
    company: "Danske Bank (via EY / M Networks)",
    tasks: [
      "Håndterede fejlretning i komplekse kundesager, analyserede store datamængder i Excel og stod for teknisk onboarding.",
    ],
  },
  {
    period: "Okt. 2021 – Maj 2022",
    title: "Lagermedarbejder",
    company: "Lyreco",
    tasks: [
      "Fysisk arbejde med pluk, effektiv pakning og logistik under stramme deadlines.",
    ],
  },
  {
    period: "Aug. 2019 – Okt. 2021",
    title: "Pædagogmedhjælper",
    company: "Ole Rømer Skolen - Høje Taastrup",
    tasks: [
      "Understøttede undervisning og agerede støttepædagog for elever med sociale udfordringer.",
    ],
  },
];

const volunteerData = [
  {
    period: "Marts 2025 – Nuværende",
    title: "Frivillig Lektiehjælper",
    company: "Red Barnet Ungdom",
    tasks: [
      "Hjælper børn og unge med lektielæsning og skaber et trygt og motiverende læringsrum."
    ],
  }
];

const skills = ["Java", "Python", "Dataanalyse (Excel)", "Bogføring", "UX-design"];
const languages = ["Dansk (Modersmål)", "Engelsk (Flydende)", "Tysk (Samtaleniveau)"];

export const CVSection = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:border-none print:shadow-none print:bg-transparent">
      
      <div className="flex flex-col md:flex-row">
        
        {/* Venstre Kolonne - Sidebar profil */}
        <div className="md:w-1/3 bg-gray-50 p-6 md:p-8 border-r border-gray-100 print:bg-transparent print:border-r-2 print:border-gray-200">
          
          {/* Header kun synlig i Print PDF, da appens main header er skjult */}
          <div className="hidden print:block mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Can Kurt</h1>
            <p className="text-lg text-blue-600 font-semibold tracking-wide">IT, Analyse & Formidling</p>
          </div>

          {/* Kontakt */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              <User className="w-5 h-5 text-blue-600" />
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 font-medium">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                +45 28 70 12 13
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                cankurtcvr@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-gray-400" />
                linkedin.com/in/canxkurt
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                København, Danmark
              </li>
            </ul>
          </div>

          {/* Profil */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              <Star className="w-5 h-5 text-blue-600" />
              Profil
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {profileText}
            </p>
          </div>

          {/* IT Kompetencer */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Kompetencer
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md font-semibold shadow-sm print:shadow-none print:border-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Sprog */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Sprog
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              {languages.map((lang, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          {/* Andet */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              <Car className="w-5 h-5 text-blue-600" />
              Andet
            </h3>
            <p className="text-sm text-gray-700 font-medium">
              Kørekort: Kategori B (Egen bil)
            </p>
          </div>
        </div>

        {/* Højre Kolonne - Hovedindhold */}
        <div className="md:w-2/3 p-6 md:p-10">
          
          {/* Erhvervserfaring */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-8">
              <Briefcase className="w-7 h-7 text-blue-600 print:text-gray-800" />
              Erhvervserfaring
            </h3>
            
            {/* Timeline Wrapper */}
            <div className="border-l-2 border-gray-200 pl-6 space-y-8 print:border-gray-300">
              {experienceData.map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full -left-[32px] top-1.5 print:border-gray-600"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1.5">
                    <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                    <span className="text-xs font-bold tracking-wide text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md print:bg-transparent print:text-gray-600 print:p-0">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-3">{item.company}</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {item.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Uddannelse */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-8">
              <GraduationCap className="w-7 h-7 text-blue-600 print:text-gray-800" />
              Uddannelse
            </h3>
            <div className="border-l-2 border-gray-200 pl-6 space-y-8 print:border-gray-300">
              {educationData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full -left-[32px] top-1.5 print:border-gray-600"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1.5">
                    <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                    <span className="text-xs font-bold tracking-wide text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md print:bg-transparent print:text-gray-600 print:p-0">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-3">{item.institution}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frivilligt Arbejde */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-8">
              <Heart className="w-7 h-7 text-blue-600 print:text-gray-800" />
              Frivilligt Arbejde
            </h3>
            <div className="border-l-2 border-gray-200 pl-6 space-y-8 print:border-gray-300">
              {volunteerData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full -left-[32px] top-1.5 print:border-gray-600"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1.5">
                    <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                    <span className="text-xs font-bold tracking-wide text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md print:bg-transparent print:text-gray-600 print:p-0">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-3">{item.company}</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {item.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CVSection;
