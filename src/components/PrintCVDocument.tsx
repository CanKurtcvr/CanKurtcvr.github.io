import React from "react";

interface PrintCVDocumentProps {
  language?: "da" | "en";
}

export default function PrintCVDocument({ language = "da" }: PrintCVDocumentProps) {
  const isEn = language === "en";

  const competencyRows = isEn
    ? [
        {
          domain: "Development & Programming",
          tools:
            "TypeScript, JavaScript (ES6+), React, Java, Tailwind, SQL & Databases, Three.js (WebGL), Git & GitHub, Prompt Engineering, LLM Integration, RAG, AI-driven Agentic Workflows.",
        },
        {
          domain: "Data Analysis & Systems",
          tools:
            "Advanced Excel, Data Modeling, Big Data Troubleshooting, KPI & Budget Management, REST APIs, Case Reconstruction, Quality Assurance.",
        },
        {
          domain: "Digitalization & Strategy",
          tools:
            "Digital Transformation, IT Strategy & Leadership, UX/UI Research, Business Analysis, Process Optimization, Onboarding & Training, Systems Thinking.",
        },
        {
          domain: "Communication & Languages",
          tools:
            "Danish (Native), English (Fluent), Professional Interpreting, Cross-disciplinary Dialogue, Empathetic Leadership, Conflict De-escalation, Presentation Skills.",
        },
      ]
    : [
        {
          domain: "Udvikling & Programmering",
          tools:
            "TypeScript, JavaScript (ES6+), React, Java, Tailwind, SQL & Databaser, Three.js (WebGL), Git & GitHub, Prompt Engineering, LLM Integration, RAG, AI-driven Agentic Workflows.",
        },
        {
          domain: "Dataanalyse & Systemer",
          tools:
            "Avanceret Excel, Datamodellering, Fejlretning i stordata, KPI- & Budgetstyring, REST API'er, Sagsrekonstruktion, Kvalitetssikring.",
        },
        {
          domain: "Digitalisering & Strategi",
          tools:
            "Digital Transformation, IT-strategi & Ledelse, UX/UI Research, Forretningsanalyse, Procesoptimering, Onboarding & Oplæring, Systemisk tænkning.",
        },
        {
          domain: "Formidling & Sprog",
          tools:
            "Dansk (Modersmål), Engelsk (Flydende), Professionel tolkning, Tværfaglig dialog, Empatisk ledelse, Konfliktnedtrapning, Præsentationsteknik.",
        },
      ];

  const experiences = isEn
    ? [
        {
          title: "IT Consultant (Full-time)",
          org: "Danske Bank (via EY / M Networks)",
          period: "Jun. 2022 – Dec. 2023",
          bullets: [
            "Scope of Role: Responsible for troubleshooting complex customer cases, analyzing large datasets in Excel, and technical onboarding during bank-wide debt restructuring and collections remediation.",
            "Case Reconstruction: Reconstructed the complete financial and legal case history for more than 400 customers through in-depth auditing of court records, settlements, interest calculations, and bank statements.",
            "Complex Data Validation: Validated payments, disbursements, interest accruals, and interest moratoriums in advanced Excel financial models.",
            "Onboarding & Knowledge Sharing: Served as floorwalker responsible for training, domain support, and authoring process documentation for peer training of new consultants.",
            "Independent Execution: Operated in a strictly regulated banking environment with a constant focus on data integrity, confidentiality, and regulatory compliance.",
          ],
        },
        {
          title: "Interpreter (Freelance)",
          org: "Tolk Danmark",
          period: "Feb. 2024 – Present",
          bullets: [
            "Scope of Role: Facilitates precise interpretation and communication at critical meetings with a strong focus on ethics, discretion, and professionalism.",
            "Certified Interpretation: Delivers accurate simultaneous and consecutive interpretation (Danish–English) for public and private institutions, including schools, municipalities, and social crisis meetings.",
            "Ethics & Discretion: Ensures complete impartiality, strict confidentiality, and high precision across legal, medical, and social terminology, including interpretation at court hearings.",
          ],
        },
        {
          title: "Care & Support Worker (Temporary)",
          org: "Forsorgshjemmet Absalon",
          period: "Mar. 2024 – Present",
          bullets: [
            "Provides administrative support, relationship building, and personal care for vulnerable citizens.",
            "Handles complex and emotionally demanding social situations with calm composure, empathy, de-escalation, and accurate documentation in specialized case systems.",
          ],
        },
        {
          title: "Care Assistant",
          org: "Kærbo Care Center, Ishøj",
          period: "Jun. 2026 – Sep. 2026",
          bullets: [
            "Direct assistance to elderly residents with daily routines, personal care, social activation, and digital care recordkeeping.",
            "Demonstrates high situational awareness, patience, and precise interdisciplinary handovers to nurses and colleagues.",
          ],
        },
        {
          title: "Teaching Assistant & Mentor",
          org: "Ole-Rømer School & Save the Children Youth",
          period: "Aug. 2019 – Oct. 2021 / Mar. 2025 – Present",
          bullets: [
            "Support educator for students with academic and social challenges, as well as volunteer mentor focusing on academic tutoring in mathematics and languages, structured study habits, motivation, and well-being.",
          ],
        },
      ]
    : [
        {
          title: "IT-konsulent (fuldtid)",
          org: "Danske Bank (via EY / M Networks)",
          period: "Jun. 2022 – Dec. 2023",
          bullets: [
            "Arbejdsområde: Ansvarlig for fejlretning i komplekse kundesager, analyse af store datamængder i Excel og teknisk onboarding i forbindelse med gældssanering og inkasso-oprydning.",
            "Sagsrekonstruktion: Rekonstruerede det fulde økonomiske og juridiske sagsforløb for mere end 400 kunder gennem dybdegående granskning af retsbøger, forlig, renteberegninger og bankudskrifter.",
            "Kompleks datavalidering: Validering af indbetalinger, udbetalinger, renter og rentepauser i avancerede Excel-modeller.",
            "Onboarding & Vidensdeling: Fungerede som floorwalker med ansvar for oplæring, faglig support og udarbejdelse af procesoplæg til sidemandsoplæring af nye konsulenter.",
            "Selvstændig opgaveløsning: Arbejdede i et stærkt reguleret miljø med konstant fokus på dataintegritet, fortrolighed og overholdelse af gældende lovgivning.",
          ],
        },
        {
          title: "Tolk (Vikariat)",
          org: "Tolk Danmark",
          period: "Feb. 2024 – Nuværende",
          bullets: [
            "Arbejdsområde: Formidler præcis tolkning og kommunikation ved kritiske møder med fokus på etik, diskretion og professionalisme.",
            "Certificeret tolkning: Formidling af præcis simultan- og konsekutiv tolkning (Dansk–Engelsk) ved møder i offentlige og private instanser, herunder skoler, kommuner og sociale krisemøder.",
            "Etik & Diskretion: Sikring af fuldstændig neutralitet, streng overholdelse af tavshedspligt og høj præcision inden for juridisk, lægelig og social terminologi. Arbejdet indebærer bl.a tolkning til retsmøder.",
          ],
        },
        {
          title: "Omsorgsmedarbejder (Vikariat)",
          org: "Forsorgshjemmet Absalon",
          period: "Mar. 2024 – Nuværende",
          bullets: [
            "Yder administrativ støtte, relationel opbygning og omsorg for udsatte borgere.",
            "Håndterer komplekse og følelsesmæssigt krævende sociale situationer med ro, empati, de-eskalering og præcis dokumentation i fagsystemer.",
          ],
        },
        {
          title: "Plejehjælper",
          org: "Kærbo Omsorgscenter, Ishøj",
          period: "Jun. 2026 – Sep. 2026",
          bullets: [
            "Direkte hjælp til ældre borgere med daglige rutiner, personlig pleje, aktivisering og digital journalføring.",
            "Udviser høj grad af situationsfornemmelse, tålmodighed samt præcis tværfaglig overlevering til sygeplejersker og kolleger.",
          ],
        },
        {
          title: "Pædagogmedhjælper & Mentor",
          org: "Ole-Rømer Skolen & Red Barnet Ungdom",
          period: "Aug. 2019 – Okt. 2021 / Mar. 2025 – Nuværende",
          bullets: [
            "Støttepædagog for elever med faglige og sociale udfordringer samt frivillig mentor med fokus på faglig indlæring i matematik og sprogfag, opbygning af gode studievaner, motivation og trivsel.",
          ],
        },
      ];

  const showcaseRows = isEn
    ? [
        {
          name: "FinTech Debt Simulator",
          stack: "FinTech — TypeScript, Recharts, Financial Modeling",
          desc: "Interactive calculation model developed to simulate complex debt restructuring scenarios, interest moratoriums, principal haircuts, and creditor recovery rates.",
        },
        {
          name: "Process Value Stream Visualizer",
          stack: "Digital Transformation — BPMN, STP, ROI Analysis",
          desc: "BPMN process architecture comparing manual As-Is workflows with automated To-Be STP (Straight-Through Processing) workflows and calculating FTE savings.",
        },
        {
          name: "AI Legal Compliance Auditor",
          stack: "Legal Tech — Compliance, GDPR, Contract Audit",
          desc: "Intelligent compliance scanner screening legal contracts against statutory limitation laws, credit agreement regulations, and GDPR with dynamic risk scoring and 1-click remediation.",
        },
        {
          name: "Ascension Cards (Habit RPG)",
          stack: "Full Stack Web App — React 19, TanStack, Three.js, TypeScript",
          desc: "Immersive habit tracker and RPG platform built with modern web architecture, collectible cards, streaks, XP progression, and 3D WebGL visualization.",
        },
      ]
    : [
        {
          name: "FinTech Debt Simulator",
          stack: "FinTech — TypeScript, Recharts, Finansiel Modellering",
          desc: "Interaktiv beregningsmodel udviklet til simulering af komplekse gældssaneringsforløb, rentepauser (moratorium), akkordnedslag og kreditor-recovery rates.",
        },
        {
          name: "Process Value Stream Visualizer",
          stack: "Digital Transformation — BPMN, STP, ROI Analyse",
          desc: "BPMN-procesarkitektur der sammenligner manuelle As-Is arbejdsgange med automatiseret To-Be STP (Straight-Through Processing) workflow og beregner FTE-besparelser.",
        },
        {
          name: "AI Legal Compliance Auditor",
          stack: "Legal Tech — Compliance, GDPR, Kontrakt-Audit",
          desc: "Intelligent compliance-scanner der screener juridiske kontrakter mod Forældelsesloven, Kreditaftaleloven og GDPR med dynamisk risikoscore og 1-klik remediation.",
        },
        {
          name: "Ascension Cards (Habit RPG)",
          stack: "Full Stack Web App — React 19, TanStack, Three.js, TypeScript",
          desc: "Fordybende habit tracker og RPG-platform bygget med moderne webarkitektur, samlekort, streaks, XP-progression og 3D WebGL-visualisering.",
        },
      ];

  return (
    <div
      className="bg-white text-slate-900 p-8 text-[11pt] leading-[1.55] max-w-[210mm] mx-auto print:p-0 print:max-w-none"
      style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
    >
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-[21pt] font-normal text-slate-900 mb-3">Can Kurt</h1>
        <p className="text-[13.5pt] font-normal text-slate-800 mb-2">
          {isEn
            ? "MSc Student in Digital Transformation & IT Consultant"
            : "Kandidatstuderende i Digital Transformation & IT-konsulent"}
        </p>
        <div className="text-[9.5pt] text-slate-700 leading-[1.65]">
          <div>
            {isEn ? "Copenhagen, Denmark" : "København, Danmark"} &middot;{" "}
            {isEn ? "Mobile" : "Mobil"}: +45 28 70 12 13 &middot;{" "}
            {isEn ? "Email" : "Mail"}:{" "}
            <a href="mailto:cankurtcvr@gmail.com" className="text-[#1155cc] underline">
              cankurtcvr@gmail.com
            </a>
          </div>
          <div>
            &middot; LinkedIn:{" "}
            <a href="https://linkedin.com/in/canxkurt" className="text-[#1155cc] underline">
              linkedin.com/in/canxkurt
            </a>{" "}
            &middot; Github:{" "}
            <a href="https://github.com/CanKurtcvr" className="text-[#1155cc] underline">
              github.com/CanKurtcvr
            </a>{" "}
            &middot;
          </div>
          <div>
            {isEn ? "Website/Portfolio" : "Hjemmeside/Portefølje"}:{" "}
            <a href="https://cankurtcvr.github.io" className="text-[#1155cc] underline">
              cankurtcvr.github.io
            </a>
          </div>
        </div>
      </header>

      {/* Profil & Fagligt Fokus */}
      <section className="mb-8">
        <h2 className="text-[18pt] font-normal text-slate-900 mb-2">
          {isEn ? "Profile & Professional Focus" : "Profil & Fagligt Fokus"}
        </h2>
        <div className="my-3">
          <div className="border-t border-slate-700 w-full mb-2.5" />
          <div className="border-t border-slate-700 w-16" />
        </div>
        <div className="italic text-slate-800 space-y-1.5 leading-[1.6]">
          {isEn ? (
            <>
              <p>
                Ambitious IT consultant and Master&apos;s student with a strong profile at the
                intersection of digitalization, data analysis, and business processes.
              </p>
              <p>
                Proven track record from complex data remediation projects in the financial sector
                (Danske Bank / EY).
              </p>
              <p>
                Hands-on experience with modern web architecture as well as strong communication
                skills and situational awareness built through certified interpretation and care work.
              </p>
            </>
          ) : (
            <>
              <p>
                Ambitiøs IT-konsulent og kandidatstuderende med en stærk profil i krydsfeltet mellem
                digitalisering, dataanalyse og forretningsprocesser.
              </p>
              <p>
                Dokumenteret erfaring fra komplekse data-saneringsprojekter i den finansielle sektor
                (Danske Bank / EY).
              </p>
              <p>
                Praktisk erfaring med moderne webarkitektur samt veludviklede formidlingsevner og
                situationsfornemmelse opbygget gennem certificeret tolkevirksomhed og
                omsorgsarbejde.
              </p>
            </>
          )}
        </div>
        <div className="my-4">
          <div className="border-t border-slate-700 w-full mb-2.5" />
          <div className="border-t border-slate-700 w-16" />
        </div>
      </section>

      {/* Faglige Nøglekompetencer & IT-Uddannelsesfundament */}
      <section className="mb-8">
        <h2 className="text-[18pt] font-normal text-slate-900 mb-2 leading-tight">
          {isEn ? (
            <>
              Core Competencies &amp;
              <br />
              Academic IT Foundation
            </>
          ) : (
            <>
              Faglige Nøglekompetencer &amp;
              <br />
              IT-Uddannelsesfundament
            </>
          )}
        </h2>
        <div className="my-3">
          <div className="border-t border-slate-700 w-full mb-2.5" />
          <div className="border-t border-slate-700 w-16" />
        </div>

        <ul className="list-disc pl-8 space-y-2.5 mb-6 text-slate-800">
          <li>
            {isEn ? (
              <>
                Master&apos;s Degree (MSc / Cand.it): Digital Transformation
                <br />
                (Roskilde University, 2026 – Expected graduation 2028)
              </>
            ) : (
              <>
                Kandidatuddannelse (Cand.it): Digital Transformation
                <br />
                (Roskilde Universitet, 2026 – Forventet afsluttet 2028)
              </>
            )}
          </li>
          <li>
            {isEn ? (
              <>
                Bachelor&apos;s Degree (BSc): Computer Science &amp; Business Studies
                <br />
                (Roskilde University, 2021 – 2024)
              </>
            ) : (
              <>
                Bacheloruddannelse (BSc): Informatik &amp; Virksomhedsstudier
                <br />
                (Roskilde Universitet, 2021 – 2024)
              </>
            )}
          </li>
        </ul>

        <table className="w-full border-collapse border border-slate-200 text-[10.5pt] my-4">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-200 p-2.5 text-left font-normal text-slate-900 w-[47%]">
                {isEn ? "Competency Domain" : "Kompetencedomæne"}
              </th>
              <th className="border border-slate-200 p-2.5 text-left font-normal text-slate-900 w-[53%]">
                {isEn ? "Technology Toolkit & Methods" : "Teknologisk Værktøjskasse & Metoder"}
              </th>
            </tr>
          </thead>
          <tbody>
            {competencyRows.map((row) => (
              <tr key={row.domain}>
                <td className="border border-slate-200 p-2.5 align-top text-slate-800">
                  {row.domain}
                </td>
                <td className="border border-slate-200 p-2.5 align-top text-slate-800">
                  {row.tools}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Erhvervserfaring */}
      <section className="mb-8">
        <h2 className="text-[18pt] font-normal text-slate-900 mb-3">
          {isEn ? "Professional Experience" : "Erhvervserfaring"}
        </h2>
        <div className="space-y-5">
          {experiences.map((exp) => (
            <article key={exp.title} className="space-y-1.5">
              <h3 className="text-[14pt] font-normal text-slate-900">{exp.title}</h3>
              <p className="text-[10.5pt] text-slate-800">
                {exp.org} | <em>{exp.period}</em>
              </p>
              <ul className="list-disc pl-8 space-y-1 text-slate-800">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Uddannelse */}
      <section className="mb-8">
        <h2 className="text-[18pt] font-normal text-slate-900 mb-3">
          {isEn ? "Education" : "Uddannelse"}
        </h2>
        <div className="space-y-5">
          <article className="space-y-1.5">
            <h3 className="text-[14pt] font-normal text-slate-900">
              {isEn ? "MSc in Digital Transformation" : "Kandidat i Digital Transformation"}
            </h3>
            <p className="text-[10.5pt] text-slate-800">
              {isEn ? "Roskilde University (RUC)" : "Roskilde Universitet (RUC)"} |{" "}
              <em>Start Sep. 2026</em>
            </p>
            <p className="text-slate-800">
              {isEn
                ? "Master's program focusing on strategic planning and governance of digital transformation processes in private and public organizations, analysis and integration of complex IT systems, business processes, technology leadership, and socio-technical systems design."
                : "Videreuddannelsen fokuserer på strategisk planlægning og styring af digitale omstillingsprocesser i private og offentlige organisationer, analyse og integration af komplekse IT-systemer, forretningsprocesser, teknologiledelse og socio-teknisk systemdesign."}
            </p>
          </article>

          <article className="space-y-1.5">
            <h3 className="text-[14pt] font-normal text-slate-900">
              {isEn
                ? "BSc in Computer Science and Business Studies"
                : "Bachelor i Informatik og Virksomhedsstudier"}
            </h3>
            <p className="text-[10.5pt] text-slate-800">
              {isEn ? "Roskilde University (RUC)" : "Roskilde Universitet (RUC)"} |{" "}
              <em>Sep. 2021 – Jun. 2024</em>
            </p>
            <p className="text-slate-800">
              {isEn
                ? "Interdisciplinary degree combining computer science and programming (Python, JavaScript, SQL), data modeling, database design, financial accounting, managerial economics, project management, and human-computer interaction (HCI/UX). Bachelor's thesis written on cybersecurity."
                : "Tværfaglig uddannelse der kombinerer datalogi og programmering (Python, JavaScript, SQL), datamodellering, databasedesign, regnskab, økonomistyring, projektledelse samt menneske-maskine interaktion (HCI/UX). Bachelorprojektet blev skrevet om cybersikkerhed."}
            </p>
          </article>
        </div>
      </section>

      {/* Udvalgte Projekter & Tekniske Showcases */}
      <section className="mb-8">
        <h2 className="text-[18pt] font-normal text-slate-900 mb-3">
          {isEn
            ? "Featured Projects & Technical Showcases"
            : "Udvalgte Projekter & Tekniske Showcases"}
        </h2>
        <table className="w-full border-collapse border border-slate-200 text-[10.5pt] my-4">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-200 p-2.5 text-left font-normal text-slate-900 w-[28%]">
                {isEn ? "Project Name" : "Projektnavn"}
              </th>
              <th className="border border-slate-200 p-2.5 text-left font-normal text-slate-900 w-[31%]">
                {isEn ? "Domain & Tech Stack" : "Domæne & Teknologisk Stak"}
              </th>
              <th className="border border-slate-200 p-2.5 text-left font-normal text-slate-900 w-[41%]">
                {isEn ? "Description & Technical Highlights" : "Beskrivelse & Tekniske Højdepunkter"}
              </th>
            </tr>
          </thead>
          <tbody>
            {showcaseRows.map((proj) => (
              <tr key={proj.name}>
                <td className="border border-slate-200 p-2.5 align-top text-slate-800">
                  {proj.name}
                </td>
                <td className="border border-slate-200 p-2.5 align-top text-slate-800">
                  {proj.stack}
                </td>
                <td className="border border-slate-200 p-2.5 align-top text-slate-800">
                  {proj.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Referencer */}
      <section>
        <h2 className="text-[18pt] font-normal text-slate-900 mb-2">
          {isEn ? "References" : "Referencer"}
        </h2>
        <ul className="list-disc pl-8 text-slate-800">
          <li>
            {isEn
              ? "Recommendations and referee contact details from Danske Bank, EY / M-Networks, Tolk Danmark, Forsorgshjemmet Absalon, and others are gladly provided upon request."
              : "Udtalelser og kontaktpersoner fra Danske Bank, EY / M-Networks, TolkDanmark, Forsorgerhjemmet Absalon m.fl. fremsendes gerne ved henvendelse."}
          </li>
        </ul>
      </section>
    </div>
  );
}
