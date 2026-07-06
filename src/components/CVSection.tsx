import React from "react";

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
    period: "Marts 2025 – Nuværende",
    title: "Frivillig Lektiehjælper",
    company: "Red Barnet Ungdom",
    tasks: [
      "Hjælper børn og unge med lektielæsning og skaber et trygt og motiverende læringsrum."
    ],
  },
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

const additionalInfo = [
  {
    category: "Sprog",
    details: "Dansk (Modersmål), Engelsk (Flydende), Tysk (Samtaleniveau)",
  },
  {
    category: "Kørekort",
    details: "Kategori B (Siden 2019) – Egen bil til rådighed",
  },
  {
    category: "IT-kompetencer",
    details: "Java, Python, Dataanalyse (Excel), Bogføring, UX-design",
  }
];

export const CVSection = () => {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-2">CV</h2>

      {/* Uddannelse Sektion */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Uddannelse</h3>
        <div className="space-y-6">
          {educationData.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
              <div className="sm:w-3/4">
                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                <p className="text-md text-gray-600 font-medium">{item.institution}</p>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
              <div className="mt-2 sm:mt-0 sm:w-1/4 sm:text-right">
                <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Erhvervserfaring Sektion */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Erhvervserfaring & Frivilligt Arbejde</h3>
        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
              <div className="sm:w-3/4">
                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                <p className="text-md text-gray-600 font-medium">{item.company}</p>
                <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                  {item.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 sm:mt-0 sm:w-1/4 sm:text-right">
                <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yderligere Information Sektion */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Yderligere Information</h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          {additionalInfo.map((info, index) => (
            <div key={index} className="flex flex-col sm:flex-row">
              <span className="sm:w-1/4 font-semibold text-gray-900">{info.category}:</span>
              <span className="sm:w-3/4 text-gray-700">{info.details}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CVSection;
