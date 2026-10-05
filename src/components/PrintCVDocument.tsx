import React from "react";
import { cvItems } from "@/data/cvData";
import { skillCategories } from "./SkillsSection";
import { projectsData } from "@/data/projectsData";

export default function PrintCVDocument() {
  const uddannelser = cvItems.filter((item) => item.category === "uddannelse");
  const erhverv = cvItems.filter((item) => item.category === "it" || item.category === "omsorg");

  return (
    <div className="bg-white text-slate-900 font-sans p-6 text-[9.5pt] leading-relaxed max-w-[210mm] mx-auto print:p-0 print:max-w-none print:text-[9pt]">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-3 mb-4">
        <div className="flex justify-between items-baseline">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 font-serif">
            Can Kurt
          </h1>
          <span className="text-xs font-semibold text-slate-600 tracking-wider uppercase">
            Curriculum Vitae
          </span>
        </div>
        
        <p className="text-sm font-semibold text-slate-800 mt-1">
          Kandidatstuderende i Digital Transformation & IT-konsulent
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[8.5pt] text-slate-600 font-medium">
          <span>København, Danmark</span>
          <span>•</span>
          <a href="tel:+4528701213" className="hover:underline text-slate-700" aria-label="Telefon: +45 28 70 12 13">
            +45 28 70 12 13
          </a>
          <span>•</span>
          <a href="mailto:cankurtcvr@gmail.com" className="hover:underline text-slate-700" aria-label="Email: cankurtcvr@gmail.com">
            cankurtcvr@gmail.com
          </a>
          <span>•</span>
          <a href="https://linkedin.com/in/canxkurt" target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-700" aria-label="LinkedIn profil">
            linkedin.com/in/canxkurt
          </a>
          <span>•</span>
          <a href="https://github.com/CanKurtcvr" target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-700" aria-label="GitHub profil">
            github.com/CanKurtcvr
          </a>
        </div>
      </header>

      {/* Profil Resumé */}
      <section className="mb-4">
        <h2 className="text-[10pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">
          Profil & Fagligt Fokus
        </h2>
        <p className="text-[9pt] text-slate-800 text-justify leading-relaxed">
          Ambitiøs IT-konsulent og kandidatstuderende med en stærk profil i krydsfeltet mellem digitalisering, dataanalyse og forretningsprocesser. Dokumenteret erfaring fra komplekse datasaneringsprojekter i den finansielle sektor (Danske Bank / EY), praktisk erfaring med moderne webarkitektur samt veludviklede formidlingsevner og situationsfornemmelse opbygget gennem certificeret tolkevirksomhed og omsorgsarbejde.
        </p>
      </section>

      {/* Faglige Nøglekompetencer & IT-Uddannelse - Placering øverst for maksimal synlighed */}
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
          Faglige Nøglekompetencer & IT-Uddannelse
        </h2>

        {/* Akademisk IT-Fundament under IT-kompetencer */}
        <div className="mb-2 bg-slate-100/90 px-2.5 py-1.5 rounded border border-slate-200 text-[8.5pt]">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-bold text-slate-950">Kandidatuddannelse (Kand.):</span>{" "}
              <span className="text-slate-800 font-medium">Digital Transformation</span>{" "}
              <span className="text-slate-500 font-mono text-[7.5pt]">(RUC, 2026 - Nu)</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Bacheloruddannelse (BSc):</span>{" "}
              <span className="text-slate-800 font-medium">Informatik & Virksomhedsstudier</span>{" "}
              <span className="text-slate-500 font-mono text-[7.5pt]">(RUC, 2021 - 2024)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[8.5pt]">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="bg-slate-50 p-2 rounded border border-slate-200">
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

      {/* Erhvervserfaring */}
      <section className="mb-4">
        <h2 className="text-[10pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
          Erhvervserfaring
        </h2>
        
        <div className="space-y-3">
          {erhverv.map((item) => (
            <article 
              key={item.id} 
              className="break-inside-avoid border-b border-slate-200/70 pb-2.5 last:border-b-0"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10pt]">
                  {item.title}
                </h3>
                <span className="text-[8.5pt] font-semibold text-slate-600 font-mono">
                  {item.period}
                </span>
              </div>
              
              <div className="text-[8.5pt] font-semibold text-slate-700 mb-1">
                {item.organization}
              </div>
              
              <p className="text-[8.5pt] text-slate-800 leading-snug mb-1">
                {item.description}
              </p>

              {/* Danske Bank specifikke bullets */}
              {item.id === "danske-bank-it" && (
                <ul className="list-disc pl-4 space-y-0.5 text-[8.5pt] text-slate-700">
                  <li>
                    <strong>Sagsrekonstruktion:</strong> Rekonstruerede det fulde økonomiske og juridiske sagsforløb for kunder gennem grundig analyse af retsbøger, forlig og renteberegninger i forbindelse med inkasso-oprydning.
                  </li>
                  <li>
                    <strong>Kompleks datavalidering:</strong> Validering af indbetalinger, renter og rentepauser i avancerede Excel-modeller for over 400 kunder med høje krav til dataintegritet.
                  </li>
                  <li>
                    <strong>Onboarding & Vidensdeling:</strong> Fungerede som <em>floorwalker</em> og udarbejdede procesoplæg til sidemandsoplæring af nye konsulenter i teamet.
                  </li>
                </ul>
              )}

              {/* Tolk Danmark specifikke bullets */}
              {item.id === "tolk-danmark" && (
                <ul className="list-disc pl-4 space-y-0.5 text-[8.5pt] text-slate-700">
                  <li>
                    <strong>Certificeret tolkning:</strong> Formidling af præcis simultan- og konsekutiv tolkning mellem dansk og engelsk.
                  </li>
                  <li>
                    <strong>Etik & Diskretion:</strong> Tolkning ved kritiske samtaler og møder i offentligt og privat regi under streng tavshedspligt og terminologisk præcision.
                  </li>
                </ul>
              )}

              {/* Andre roller */}
              {item.id !== "danske-bank-it" && item.id !== "tolk-danmark" && item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-0.5 text-[8.5pt] text-slate-700">
                  {item.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Uddannelse */}
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
          Uddannelse
        </h2>

        <div className="space-y-2.5">
          {uddannelser.map((edu) => (
            <article 
              key={edu.id} 
              className="break-inside-avoid border-b border-slate-200/70 pb-2 last:border-b-0"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10pt]">
                  {edu.title}
                </h3>
                <span className="text-[8.5pt] font-semibold text-slate-600 font-mono">
                  {edu.period}
                </span>
              </div>
              
              <div className="text-[8.5pt] font-semibold text-slate-700 mb-1">
                {edu.organization}
              </div>

              <p className="text-[8.5pt] text-slate-800 leading-snug mb-1">
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

      {/* Udvalgte Projekter - Strømlinet med mindre tekst */}
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[10pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
          Udvalgte Projekter & Tekniske Showcases
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {projectsData.slice(0, 4).map((proj) => (
            <article 
              key={proj.id} 
              className="break-inside-avoid pb-1 border-b border-slate-100"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-900 text-[8.5pt] truncate max-w-[190px]">
                  {proj.shortTitle || proj.title}
                </h3>
                <span className="text-[7pt] text-slate-500 font-medium">
                  {proj.category.split(" ")[0]}
                </span>
              </div>

              <p className="text-[8pt] text-slate-700 leading-tight mt-0.5 line-clamp-2">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-1">
                {proj.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[6.5pt] bg-slate-100 text-slate-600 font-mono px-1 py-0.2 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Referencer */}
      <footer className="pt-2.5 border-t border-slate-300 text-[8pt] text-slate-600 flex justify-between items-center break-inside-avoid">
        <p>
          <strong>Referencer:</strong> Udtalelser og kontaktpersoner fra Danske Bank, EY / M-Networks, TolkDanmark m.fl. fremsendes gerne ved henvendelse.
        </p>
      </footer>
    </div>
  );
}
