import React from "react";
import { cvItems } from "@/data/cvData";
import { skillCategories } from "./SkillsSection";

export default function PrintCVDocument() {
  const uddannelser = cvItems.filter((item) => item.category === "uddannelse");
  const erhverv = cvItems.filter((item) => item.category === "it" || item.category === "omsorg");

  return (
    <div className="bg-white text-black font-sans p-2 text-[10.5pt] leading-relaxed max-w-[210mm] mx-auto print:p-0">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-4 mb-5">
        <div className="flex justify-between items-baseline">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 font-serif">
            Can Kurt
          </h1>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
            Curriculum Vitae
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
      <section className="mb-5">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
          Profil & Fagligt Fokus
        </h2>
        <p className="text-[10pt] text-slate-800 text-justify leading-normal">
          Ambitiøs og alsidig IT-konsulent og kandidatstuderende med stærke kompetencer i krydsfeltet mellem teknologi, dataanalyse og forretningsprocesser. Dokumenteret erfaring fra komplekse datasaneringsprojekter i den finansielle sektor (Danske Bank / EY), praktisk erfaring med moderne webudvikling samt veludviklede formidlingsevner og situationsfornemmelse opbygget gennem certificeret tolkevirksomhed og omsorgsarbejde.
        </p>
      </section>

      {/* Faglige Nøglekompetencer */}
      <section className="mb-5">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
          Faglige Nøglekompetencer & Værktøjer
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[9.5pt]">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <p className="font-bold text-slate-900 text-[9pt]">
                {cat.title}:
              </p>
              <p className="text-slate-700 leading-tight">
                {cat.skills.join(", ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Erhvervserfaring */}
      <section className="mb-5">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
          Erhvervserfaring & Stillinger
        </h2>
        
        <div className="space-y-4">
          {erhverv.map((item) => (
            <article key={item.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10.5pt]">
                  {item.title}
                </h3>
                <span className="text-[9pt] font-medium text-slate-600">
                  {item.period}
                </span>
              </div>
              
              <div className="text-[9.5pt] font-semibold text-slate-700 mb-1">
                {item.organization}
              </div>
              
              <p className="text-[9.5pt] text-slate-800 leading-snug mb-1.5">
                {item.description}
              </p>

              {/* Special in-depth details for Danske Bank */}
              {item.id === "danske-bank-it" && (
                <div className="mt-1.5 bg-slate-50 p-2.5 rounded border border-slate-200 text-[9pt]">
                  <p className="font-semibold text-slate-900 mb-1">
                    Kontekst: Inkasso-oprydningen og datavalidering (Slutkunde: Danske Bank · Kontraktør: EY · Ansættelse: M-Networks)
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700">
                    <li>
                      <strong>Sagsrekonstruktion:</strong> Rekonstruerede det fulde økonomiske og juridiske sagsforløb for kunder gennem grundig granskning af retsbøger, forlig, renteberegninger og kontoudskrifter.
                    </li>
                    <li>
                      <strong>Kompleks databehandling:</strong> Håndterede manuel validering af indbetalinger, udbetalinger, renter og rentepauser i avancerede Excel-modeller for over 400 kunder.
                    </li>
                    <li>
                      <strong>Onboarding & Vidensdeling:</strong> Fungerede som <em>floorwalker</em> og udarbejdede præsentationer til sidemandsoplæring af nye konsulenter.
                    </li>
                    <li>
                      <strong>Fleksibilitet & Kvalitet:</strong> Løste selvstændigt opgaver digitalt med skarp fokus på dataintegritet og overholdelse af regulatoriske retningslinjer.
                    </li>
                  </ul>
                </div>
              )}

              {/* Special in-depth details for Tolk Danmark */}
              {item.id === "tolk-danmark" && (
                <div className="mt-1 text-[9pt] text-slate-700">
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>
                      Officielt certificeret tolk (Tolke-ID: 20045) for TolkDanmark.
                    </li>
                    <li>
                      Simultan- og konsekutiv tolkning mellem dansk og engelsk ved kritiske møder i det offentlige og private regi med krav om neutralitet, tavshedspligt og præcision.
                    </li>
                  </ul>
                </div>
              )}

              {/* Bullets for other roles */}
              {item.id !== "danske-bank-it" && item.id !== "tolk-danmark" && item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-0.5 text-[9pt] text-slate-700 mt-1">
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
          Uddannelse
        </h2>

        <div className="space-y-3.5">
          {uddannelser.map((edu) => (
            <article key={edu.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-950 text-[10.5pt]">
                  {edu.title}
                </h3>
                <span className="text-[9pt] font-medium text-slate-600">
                  {edu.period}
                </span>
              </div>
              
              <div className="text-[9.5pt] font-semibold text-slate-700 mb-1">
                {edu.organization}
              </div>

              <p className="text-[9.5pt] text-slate-800 leading-snug mb-1">
                {edu.description}
              </p>

              {edu.bullets && edu.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-0.5 text-[9pt] text-slate-700">
                  {edu.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Referencer */}
      <section className="pt-3 border-t border-slate-300 text-[8.5pt] text-slate-600 flex justify-between items-center break-inside-avoid">
        <p>
          <strong>Referencer:</strong> Udtalelser og kontaktpersoner fra Danske Bank, EY / M-Networks, TolkDanmark m.fl. oplyses gerne ved henvendelse.
        </p>
        <p className="italic text-slate-500">
          Opdateret {new Date().toLocaleDateString("da-DK", { month: "long", year: "numeric" })}
        </p>
      </section>
    </div>
  );
}
