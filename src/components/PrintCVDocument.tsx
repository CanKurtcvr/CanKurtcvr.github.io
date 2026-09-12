import React from "react";
import { cvItems } from "@/data/cvData";
import { skillCategories } from "./SkillsSection";
import { projectsData } from "@/data/projectsData";

export default function PrintCVDocument() {
  const uddannelser = cvItems.filter((item) => item.category === "uddannelse");
  const erhverv = cvItems.filter((item) => item.category === "it" || item.category === "omsorg");
  const projects = projectsData;

  return (
    <div className="bg-white text-slate-950 font-sans p-2 text-[10pt] leading-relaxed max-w-[210mm] mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-4 mb-4">
        <div className="flex justify-between items-baseline">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 font-serif">
            Can Kurt
          </h1>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
            Curriculum Vitae • Standalone Document
          </span>
        </div>
        
        <p className="text-sm font-semibold text-slate-800 mt-1">
          Kandidatstuderende i Digital Transformation & IT-konsulent
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[9pt] text-slate-600 font-medium">
          <span>København, Danmark</span>
          <span>•</span>
          <span>Tlf: +45 28 70 12 13</span>
          <span>•</span>
          <span>Email: cankurtcvr@gmail.com</span>
          <span>•</span>
          <span>LinkedIn: linkedin.com/in/canxkurt</span>
          <span>•</span>
          <span>GitHub: github.com/CanKurtcvr</span>
        </div>
      </header>

      {/* Profil Resumé */}
      <section className="mb-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
          Profil & Fagligt Fokus
        </h2>
        <p className="text-[9.5pt] text-slate-850 text-justify leading-relaxed">
          Ambitiøs IT-konsulent og kandidatstuderende med en stærk profil i krydsfeltet mellem digitalisering, dataanalyse og forretningsprocesser. Dokumenteret erfaring fra komplekse datasaneringsprojekter i den finansielle sektor (Danske Bank / EY), praktisk erfaring med moderne webarkitektur samt veludviklede formidlingsevner og situationsfornemmelse opbygget gennem certificeret tolkevirksomhed og omsorgsarbejde.
        </p>
      </section>

      {/* Interaktiv Indholdsoversigt / Dokument-Indeks (Standalone Navigation) */}
      <section id="cv-index" className="mb-5 bg-slate-50 border border-slate-300 rounded-lg p-3 break-inside-avoid">
        <div className="flex justify-between items-center mb-2 border-b border-slate-200 pb-1">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Indholdsoversigt & Dokument-Indeks
          </h2>
          <span className="text-[8pt] text-slate-500 italic">
            Klik på et element for at springe direkte til uddybende detaljer i dokumentet
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-[8.5pt]">
          {/* Kolonne 1: Erhvervserfaring */}
          <div>
            <p className="text-[8pt] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Erhvervserfaring</span>
              <span className="font-normal text-slate-400">Periode</span>
            </p>
            <ul className="space-y-1">
              {erhverv.map(item => (
                <li key={item.id} className="flex justify-between items-baseline gap-1">
                  <a 
                    href={`#sec-${item.id}`}
                    className="text-blue-900 hover:text-blue-700 hover:underline font-medium truncate"
                    title={`Gå til detaljer for ${item.title}`}
                  >
                    → {item.title} <span className="text-slate-500 font-normal">({item.organization.split(" ")[0]})</span>
                  </a>
                  <span className="text-[7.5pt] text-slate-500 shrink-0 font-mono">
                    {item.period.split(" - ")[0]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolonne 2: Uddannelse & Færdigheder */}
          <div>
            <p className="text-[8pt] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Uddannelse & Færdigheder</span>
              <span className="font-normal text-slate-400">Periode</span>
            </p>
            <ul className="space-y-1">
              {uddannelser.map(edu => (
                <li key={edu.id} className="flex justify-between items-baseline gap-1">
                  <a 
                    href={`#sec-${edu.id}`}
                    className="text-blue-900 hover:text-blue-700 hover:underline font-medium truncate"
                    title={`Gå til detaljer for ${edu.title}`}
                  >
                    → {edu.title}
                  </a>
                  <span className="text-[7.5pt] text-slate-500 shrink-0 font-mono">
                    {edu.period.split(" - ")[0]}
                  </span>
                </li>
              ))}
              <li className="pt-1.5 border-t border-slate-200 mt-1">
                <a 
                  href="#sec-kompetencer" 
                  className="text-blue-900 hover:text-blue-700 hover:underline font-semibold block truncate"
                  title="Gå til faglige kompetencer og værktøjer"
                >
                  → Faglige Nøglekompetencer
                </a>
              </li>
            </ul>
          </div>

          {/* Kolonne 3: Udvalgte Projekter */}
          <div>
            <p className="text-[8pt] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Udvalgte Projekter</span>
              <span className="font-normal text-slate-400">Teknologi</span>
            </p>
            <ul className="space-y-1">
              {projects.map(proj => (
                <li key={proj.id} className="flex justify-between items-baseline gap-1">
                  <a 
                    href={`#sec-proj-${proj.id}`}
                    className="text-blue-900 hover:text-blue-700 hover:underline font-medium truncate"
                    title={`Gå til projekt ${proj.title}`}
                  >
                    → {proj.shortTitle}
                  </a>
                  <span className="text-[7.5pt] text-slate-500 shrink-0 font-mono">
                    {proj.tags[0]}
                  </span>
                </li>
              ))}
              <li className="pt-1.5 border-t border-slate-200 mt-1">
                <a 
                  href="#sec-projekter" 
                  className="text-blue-900 hover:text-blue-700 hover:underline font-semibold block truncate"
                  title="Gå til projektsektionen"
                >
                  → Se Alle Projekter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Faglige Nøglekompetencer */}
      <section id="sec-kompetencer" className="mb-5 break-inside-avoid scroll-mt-6">
        <div className="flex justify-between items-baseline border-b border-slate-300 pb-1 mb-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Faglige Nøglekompetencer & Værktøjer
          </h2>
          <a href="#cv-index" className="text-[8pt] text-blue-700 hover:underline" title="Tilbage til oversigten">
            ↑ Tilbage til indeks
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[9pt]">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="bg-slate-50/70 p-2 rounded border border-slate-200">
              <p className="font-bold text-slate-900 text-[8.5pt] mb-0.5">
                {cat.title}
              </p>
              <p className="text-slate-700 leading-snug">
                {cat.skills.join(", ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dybdegående Erhvervserfaring */}
      <section className="mb-5">
        <div className="flex justify-between items-baseline border-b border-slate-300 pb-1 mb-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Erhvervserfaring — Dybdegående Stillingsbeskrivelser
          </h2>
          <a href="#cv-index" className="text-[8pt] text-blue-700 hover:underline" title="Tilbage til oversigten">
            ↑ Tilbage til indeks
          </a>
        </div>
        
        <div className="space-y-4">
          {erhverv.map((item) => (
            <article 
              key={item.id} 
              id={`sec-${item.id}`} 
              className="break-inside-avoid scroll-mt-6 border-b border-slate-200/80 pb-3.5 last:border-b-0"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10.5pt]">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[8.5pt] font-semibold text-slate-600 font-mono">
                    {item.period}
                  </span>
                  <a href="#cv-index" className="text-[7.5pt] font-medium text-blue-700 hover:underline" title="Tilbage til oversigten">
                    ↑ Indeks
                  </a>
                </div>
              </div>
              
              <div className="text-[9pt] font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>{item.organization}</span>
                <span className="text-[8pt] text-slate-500 font-normal italic">
                  Kategori: {item.category === "it" ? "IT & Konsulentarbejde" : "Omsorg & Formidling"}
                </span>
              </div>
              
              <p className="text-[9pt] text-slate-800 leading-snug mb-1.5">
                {item.description}
              </p>

              {/* Special in-depth details for Danske Bank */}
              {item.id === "danske-bank-it" && (
                <div className="mt-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-[8.5pt]">
                  <p className="font-bold text-slate-900 mb-1">
                    Kontekst & Arkitektur: Inkasso-oprydningen og datavalidering (Slutkunde: Danske Bank · Kontraktør: EY · Ansættelse: M-Networks)
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700">
                    <li>
                      <strong>Sagsrekonstruktion:</strong> Rekonstruerede det fulde økonomiske og juridiske sagsforløb for kunder gennem grundig granskning af retsbøger, forlig, renteberegninger og kontoudskrifter for at sikre korrekt gældssanering.
                    </li>
                    <li>
                      <strong>Kompleks databehandling:</strong> Håndterede manuel validering af indbetalinger, udbetalinger, renter og rentepauser i avancerede Excel-modeller for over 400 kunder.
                    </li>
                    <li>
                      <strong>Onboarding & Vidensdeling:</strong> Fungerede som <em>floorwalker</em> og udarbejdede præsentationer og arbejdsgange til sidemandsoplæring af nye konsulenter i teamet.
                    </li>
                    <li>
                      <strong>Fleksibilitet & Kvalitet:</strong> Løste selvstændigt opgaver digitalt med fokus på dataintegritet, fortrolighed og overholdelse af regulatoriske retningslinjer.
                    </li>
                  </ul>
                </div>
              )}

              {/* Special in-depth details for Tolk Danmark */}
              {item.id === "tolk-danmark" && (
                <div className="mt-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-[8.5pt]">
                  <p className="font-bold text-slate-900 mb-1">
                    Certificering & Nøgleopgaver: Tolk hos TolkDanmark (Tolke-ID: 20045)
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700">
                    <li>
                      <strong>Certificeret virksomhed:</strong> Formidling af præcis simultan- og konsekutiv tolkning mellem dansk og engelsk.
                    </li>
                    <li>
                      <strong>Høj etisk standard:</strong> Tolkning ved kritiske samtaler, forhandlinger og møder i offentligt og privat regi under streng tavshedspligt, fuld neutralitet og præcision i terminologi.
                    </li>
                  </ul>
                </div>
              )}

              {/* Bullets for other roles */}
              {item.id !== "danske-bank-it" && item.id !== "tolk-danmark" && item.bullets && item.bullets.length > 0 && (
                <div className="mt-1.5">
                  <ul className="list-disc pl-4 space-y-0.5 text-[8.5pt] text-slate-700">
                    {item.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Dybdegående Uddannelse */}
      <section className="mb-4 break-inside-avoid">
        <div className="flex justify-between items-baseline border-b border-slate-300 pb-1 mb-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Uddannelse — Fagligt Indhold & Kompetencemål
          </h2>
          <a href="#cv-index" className="text-[8pt] text-blue-700 hover:underline" title="Tilbage til oversigten">
            ↑ Tilbage til indeks
          </a>
        </div>

        <div className="space-y-3.5">
          {uddannelser.map((edu) => (
            <article 
              key={edu.id} 
              id={`sec-${edu.id}`} 
              className="break-inside-avoid scroll-mt-6 border-b border-slate-200/80 pb-3 last:border-b-0"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10.5pt]">
                  {edu.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[8.5pt] font-semibold text-slate-600 font-mono">
                    {edu.period}
                  </span>
                  <a href="#cv-index" className="text-[7.5pt] font-medium text-blue-700 hover:underline" title="Tilbage til oversigten">
                    ↑ Indeks
                  </a>
                </div>
              </div>
              
              <div className="text-[9pt] font-semibold text-slate-700 mb-1">
                {edu.organization}
              </div>

              <p className="text-[9pt] text-slate-800 leading-snug mb-1.5">
                {edu.description}
              </p>

              {edu.bullets && edu.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-0.5 text-[8.5pt] text-slate-700">
                  {edu.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Udvalgte Projekter & Tekniske Showcases */}
      <section id="sec-projekter" className="mb-5">
        <div className="flex justify-between items-baseline border-b border-slate-300 pb-1 mb-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Udvalgte Projekter & Tekniske Showcases
          </h2>
          <a href="#cv-index" className="text-[8pt] text-blue-700 hover:underline" title="Tilbage til oversigten">
            ↑ Tilbage til indeks
          </a>
        </div>

        <div className="space-y-3.5">
          {projects.map((proj) => (
            <article 
              key={proj.id} 
              id={`sec-proj-${proj.id}`} 
              className="break-inside-avoid scroll-mt-6 border-b border-slate-200/80 pb-3.5 last:border-b-0"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10.5pt]">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[8pt] font-semibold text-slate-600 font-mono">
                    {proj.category}
                  </span>
                  <a href="#cv-index" className="text-[7.5pt] font-medium text-blue-700 hover:underline" title="Tilbage til oversigten">
                    ↑ Indeks
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 my-1.5">
                {proj.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[7.5pt] bg-slate-100 text-slate-700 font-mono px-1.5 py-0.2 rounded border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[9pt] text-slate-800 leading-snug mb-1.5">
                {proj.description}
              </p>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[8.5pt]">
                <p className="font-bold text-slate-900 mb-1 text-[8pt] uppercase tracking-wide">
                  Tekniske Højdepunkter & Løsningsarkitektur:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                  {proj.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Referencer */}
      <section className="pt-3 border-t border-slate-300 text-[8pt] text-slate-600 flex justify-between items-center break-inside-avoid">
        <p>
          <strong>Referencer:</strong> Udtalelser og kontaktpersoner fra Danske Bank, EY / M-Networks, TolkDanmark m.fl. oplyses gerne ved henvendelse.
        </p>
        <p className="italic text-slate-500">
          Standalone CV-dokument • Genereret via cankurtcvr.github.io
        </p>
      </section>
    </div>
  );
}
