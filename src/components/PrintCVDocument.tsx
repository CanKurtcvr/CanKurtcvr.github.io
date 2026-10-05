import React from "react";
import { cvItems } from "@/data/cvData";
import { skillCategories } from "./SkillsSection";
import { projectsData } from "@/data/projectsData";

interface PrintCVDocumentProps {
  language?: "da" | "en";
}

export default function PrintCVDocument({ language = "da" }: PrintCVDocumentProps) {
  const isEn = language === "en";

  const uddannelser = cvItems.filter((item) => item.category === "uddannelse");
  const erhverv = cvItems.filter((item) => item.category === "it" || item.category === "omsorg");

  return (
    <div className="bg-white text-slate-900 font-sans p-6 text-[9pt] leading-relaxed max-w-[210mm] mx-auto print:p-0 print:max-w-none print:text-[8.5pt]">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-2.5 mb-3">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-serif">
            Can Kurt
          </h1>
          <span className="text-xs font-semibold text-slate-600 tracking-wider uppercase">
            Curriculum Vitae ({isEn ? "English" : "Dansk"})
          </span>
        </div>
        
        <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
          {isEn
            ? "MSc Student in Digital Transformation & IT Consultant"
            : "Kandidatstuderende i Digital Transformation & IT-konsulent"}
        </p>

        <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 mt-1.5 text-[8pt] text-slate-600 font-medium">
          <span>{isEn ? "Copenhagen, Denmark" : "København, Danmark"}</span>
          <span>•</span>
          <span>+45 28 70 12 13</span>
          <span>•</span>
          <span>cankurtcvr@gmail.com</span>
          <span>•</span>
          <span>linkedin.com/in/canxkurt</span>
          <span>•</span>
          <span>github.com/CanKurtcvr</span>
        </div>
      </header>

      {/* Profil Resumé */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
          {isEn ? "Profile & Focus" : "Profil & Fagligt Fokus"}
        </h2>
        <p className="text-[8.5pt] text-slate-800 text-justify leading-relaxed">
          {isEn
            ? "Ambitious IT consultant and master's student with a strong profile bridging digital transformation, data analysis, and business processes. Proven track record from complex data remediation projects in the financial sector (Danske Bank / EY), hands-on experience with modern web architecture, and highly developed communication skills built through certified interpretation and caregiving."
            : "Ambitiøs IT-konsulent og kandidatstuderende med en stærk profil i krydsfeltet mellem digitalisering, dataanalyse og forretningsprocesser. Dokumenteret erfaring fra komplekse datasaneringsprojekter i den finansielle sektor (Danske Bank / EY), praktisk erfaring med moderne webarkitektur samt veludviklede formidlingsevner og situationsfornemmelse opbygget gennem certificeret tolkevirksomhed og omsorgsarbejde."}
        </p>
      </section>

      {/* Faglige Nøglekompetencer & IT-Uddannelse */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
          {isEn ? "Core Competencies & Academic IT Foundation" : "Faglige Nøglekompetencer & IT-Uddannelse"}
        </h2>

        <div className="mb-1.5 bg-slate-100/90 px-2 py-1 rounded border border-slate-200 text-[8pt]">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-bold text-slate-950">{isEn ? "Master's Degree (MSc):" : "Kandidatuddannelse (Kand.):"}</span>{" "}
              <span className="text-slate-800 font-medium">{isEn ? "Digital Transformation" : "Digital Transformation"}</span>{" "}
              <span className="text-slate-500 font-mono text-[7.5pt]">(RUC, 2026 - {isEn ? "Now" : "Nu"})</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">{isEn ? "Bachelor's Degree (BSc):" : "Bacheloruddannelse (BSc):"}</span>{" "}
              <span className="text-slate-800 font-medium">{isEn ? "Computer Science & Business" : "Informatik & Virksomhedsstudier"}</span>{" "}
              <span className="text-slate-500 font-mono text-[7.5pt]">(RUC, 2021 - 2024)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[8pt]">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="bg-slate-50 p-1.5 rounded border border-slate-200">
              <p className="font-bold text-slate-900 text-[8pt] mb-0.5">
                {cat.title}
              </p>
              <p className="text-slate-700 leading-snug text-[7.5pt]">
                {cat.skills.join(", ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Erhvervserfaring */}
      <section className="mb-3">
        <h2 className="text-[9.5pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2">
          {isEn ? "Professional Experience" : "Erhvervserfaring"}
        </h2>
        
        <div className="space-y-2">
          {erhverv.map((item) => {
            const title = isEn && item.titleEn ? item.titleEn : item.title;
            const org = isEn && item.organizationEn ? item.organizationEn : item.organization;
            const period = isEn && item.periodEn ? item.periodEn : item.period;
            const desc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
            const bullets = isEn && item.bulletsEn ? item.bulletsEn : item.bullets;

            return (
              <article
                key={item.id}
                className="break-inside-avoid border-b border-slate-200/70 pb-2 last:border-b-0"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-950 text-[9pt]">
                    {title}
                  </h3>
                  <span className="text-[8pt] font-semibold text-slate-600 font-mono">
                    {period}
                  </span>
                </div>

                <div className="text-[8pt] font-semibold text-slate-700 mb-0.5">
                  {org}
                </div>

                <p className="text-[8pt] text-slate-800 leading-snug mb-1">
                  {desc}
                </p>

                {bullets && bullets.length > 0 && (
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[7.5pt] text-slate-700">
                    {bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Uddannelse */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2">
          {isEn ? "Education" : "Uddannelse"}
        </h2>

        <div className="space-y-2">
          {uddannelser.map((edu) => {
            const title = isEn && edu.titleEn ? edu.titleEn : edu.title;
            const org = isEn && edu.organizationEn ? edu.organizationEn : edu.organization;
            const period = isEn && edu.periodEn ? edu.periodEn : edu.period;
            const desc = isEn && edu.descriptionEn ? edu.descriptionEn : edu.description;
            const bullets = isEn && edu.bulletsEn ? edu.bulletsEn : edu.bullets;

            return (
              <article
                key={edu.id}
                className="break-inside-avoid border-b border-slate-200/70 pb-1.5 last:border-b-0"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-950 text-[9pt]">
                    {title}
                  </h3>
                  <span className="text-[8pt] font-semibold text-slate-600 font-mono">
                    {period}
                  </span>
                </div>

                <div className="text-[8pt] font-semibold text-slate-700 mb-0.5">
                  {org}
                </div>

                <p className="text-[8pt] text-slate-800 leading-snug mb-0.5">
                  {desc}
                </p>

                {bullets && bullets.length > 0 && (
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[7.5pt] text-slate-700">
                    {bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Udvalgte Projekter */}
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-[9.5pt] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
          {isEn ? "Featured Projects & Technical Showcases" : "Udvalgte Projekter & Tekniske Showcases"}
        </h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {projectsData.slice(0, 4).map((proj) => (
            <article 
              key={proj.id} 
              className="break-inside-avoid pb-0.5 border-b border-slate-100"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-900 text-[8pt] truncate max-w-[190px]">
                  {proj.shortTitle || proj.title}
                </h3>
                <span className="text-[6.5pt] text-slate-500 font-medium">
                  {proj.category.split(" ")[0]}
                </span>
              </div>

              <p className="text-[7.5pt] text-slate-700 leading-tight mt-0.5 line-clamp-2">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-0.5">
                {proj.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[6pt] bg-slate-100 text-slate-600 font-mono px-1 py-0.2 rounded"
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
      <footer className="pt-2 border-t border-slate-300 text-[7.5pt] text-slate-600 flex justify-between items-center break-inside-avoid">
        <p>
          <strong>{isEn ? "References:" : "Referencer:"}</strong>{" "}
          {isEn
            ? "References and contacts from Danske Bank, EY / M-Networks, Interpreter Denmark, etc. are available upon request."
            : "Udtalelser og kontaktpersoner fra Danske Bank, EY / M-Networks, TolkDanmark m.fl. fremsendes gerne ved henvendelse."}
        </p>
      </footer>
    </div>
  );
}
