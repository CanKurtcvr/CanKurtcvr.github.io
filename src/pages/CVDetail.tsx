import { useLocation, Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Briefcase, User, CheckCircle2, Film, BookOpen, BadgeCheck, FileQuestion } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCVItemById } from "@/data/cvData";
import { useLanguage } from "@/context/LanguageContext";

export default function CVDetail() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isEn = language === "en";

  const rawCvData = location.state?.cvData || (id ? getCVItemById(id) : undefined);

  if (!rawCvData) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <FileQuestion className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold">
          {isEn ? "Experience not found" : "Erfaring ikke fundet"}
        </h1>
        <p className="text-muted-foreground">
          {isEn
            ? "The requested experience entry could not be found."
            : "Den ønskede profil eller erfaring kunne desværre ikke findes."}
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isEn ? "Back to overview" : "Tilbage til oversigten"}
          </Link>
        </Button>
      </div>
    );
  }

  const title = isEn && rawCvData.titleEn ? rawCvData.titleEn : rawCvData.title;
  const organization = isEn && rawCvData.organizationEn ? rawCvData.organizationEn : rawCvData.organization;
  const period = isEn && rawCvData.periodEn ? rawCvData.periodEn : rawCvData.period;
  const type = isEn && rawCvData.typeEn ? rawCvData.typeEn : rawCvData.type;
  const description = isEn && rawCvData.descriptionEn ? rawCvData.descriptionEn : rawCvData.description;
  const bullets = isEn && rawCvData.bulletsEn ? rawCvData.bulletsEn : rawCvData.bullets;

  // Specielt indhold for Kandidatuddannelsen (RUC)
  const renderKandidatContent = () => (
    <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {isEn ? "Course Description & Objectives" : "Kursusbeskrivelse"}
          </CardTitle>
          <CardDescription>
            {isEn
              ? "Official curriculum overview and academic competencies."
              : "Officiel oversigt over uddannelsens faglige indhold og kompetencemål."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-2">
            <img 
              src="/Screenshot 2026-08-05 at 21.00.42.png" 
              alt="Kursusbeskrivelse for Digital Transformation på RUC" 
              className="max-w-full h-auto max-h-[800px] object-contain rounded-md shadow-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Specielt indhold for Tolk Danmark
  const renderTolkContent = () => (
    <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-blue-600" />
            {isEn ? "Official Interpreter ID" : "Officielt Tolke-ID"}
          </CardTitle>
          <CardDescription>
            {isEn
              ? "Official certification and identification issued by TolkDanmark."
              : "Identifikation og certificering udstedt af TolkDanmark for professionel virke."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-6">
            <img 
              src="/TOLK.jpg" 
              alt="Mit officielle Tolke-ID fra TolkDanmark" 
              className="max-w-full h-auto max-h-[400px] object-contain rounded-md shadow-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Specielt indhold for Kærbo Omsorgscenter
  const renderKaerboContent = () => (
    <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            {isEn ? "Moments from Kærbo Care Center" : "Gode stunder fra Kærbo Omsorgscenter"}
          </CardTitle>
          <CardDescription>
            {isEn
              ? "Video clips recorded with residents Oluf, Poul-Erik, and Peter (shared with full consent)."
              : "Herunder er tre sjove videoklip fra min tid med borgerne Oluf, Poul-Erik og Peter. Videoerne deles med fuldt samtykke fra dem alle tre."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <h3 className="font-semibold text-base">Oluf</h3>
            <div className="overflow-hidden rounded-lg border bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-contain">
                <source src="/gemini_generated_video_5E4FD344.mp4" type="video/mp4" />
                {isEn ? "Your browser does not support the video tag." : "Din browser understøtter ikke video-tagget."}
              </video>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">Poul-Erik</h3>
            <div className="overflow-hidden rounded-lg border bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-contain">
                <source src="/gemini_generated_video_82CE1AEF.mp4" type="video/mp4" />
                {isEn ? "Your browser does not support the video tag." : "Din browser understøtter ikke video-tagget."}
              </video>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">Peter</h3>
            <div className="overflow-hidden rounded-lg border bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-contain">
                <source src="/gemini_generated_video_AB45BC40.mp4" type="video/mp4" />
                {isEn ? "Your browser does not support the video tag." : "Din browser understøtter ikke video-tagget."}
              </video>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Specielt indhold for Danske Bank
  const renderDanskeBankContent = () => (
    <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-l-4 border-l-blue-600 dark:border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            {isEn ? "Project Scope: Debt Remediation" : "Sagens Kerne: Inkasso-oprydningen"}
          </CardTitle>
          <CardDescription>
            {isEn
              ? "The remediation project resolved complex data errors during bank-wide debt recalculation."
              : "Arbejdet relaterede sig til en af de største it- og dataskandaler i dansk finanshistorie."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-semibold mb-2">
              {isEn ? "Project Background:" : "Baggrund for projektet:"}
            </p>
            <p className="mb-3">
              {isEn
                ? "In 2022, system errors were identified in legacy debt collection software. As part of the remediation effort, the bank canceled over DKK 20 billion in debt for collection clients."
                : "I 2022 kom det frem, at systemfejl havde ført til uretmæssig inddrivelse af gæld. Som følge af oprydningsarbejdet slettede banken gæld for over 20 milliarder kroner hos inkassokunder."}
            </p>
            <a 
              href="https://nyheder.tv2.dk/2022-08-31-danske-bank-har-slettet-gaeld-for-over-20-milliarder-kroner-hos-inkassokunder-viser-laekkede-dokumenter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {isEn ? "Read news coverage of the case here" : "Læs TV2's dækning af sagen her"} <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            {isEn ? "Key Responsibilities & Highlights" : "Nøgleopgaver & Ansvarsområder"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5 marker:text-slate-400">
            {isEn ? (
              <>
                <li>
                  <strong>Case Reconstruction:</strong> Reconstructed full financial histories for 400+ debt collection clients by analyzing legal filings, court records, and ledger statements.
                </li>
                <li>
                  <strong>Complex Data Validation:</strong> Handled data entry and validation of payments, interest rates, and interest freezes in advanced Excel models with zero error tolerance.
                </li>
                <li>
                  <strong>Onboarding & Floorwalking:</strong> Authored training guides and served as floorwalker, onboarding and training 10+ new consultants on the project.
                </li>
                <li>
                  <strong>Digital Workflow:</strong> Managed fully digitized cases requiring secure remote handling and legal verification.
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Sagsrekonstruktion:</strong> Opbyggede det fulde sagsforløb for kunden med dyb indsigt i bankdokumenter, juridiske aktstykker, forlig og retsmøder for at sikre en korrekt sagsbehandling.
                </li>
                <li>
                  <strong>Kompleks databehandling:</strong> Håndterede manuel indtastning og validering af indbetalinger, udbetalinger, renter og rentepauser i avancerede Excel-ark for mere end 400 kunder.
                </li>
                <li>
                  <strong>Onboarding & Præsentation:</strong> Udarbejdede og fremlagde præsentationer samt fungerede som <em>floorwalker</em> for at sikre en effektiv og tryg oplæring af nyansatte kollegaer.
                </li>
                <li>
                  <strong>Fleksibel opgaveløsning:</strong> Udførte selvstændigt hjemmearbejde med de sager, der udelukkende kunne behandles digitalt og ikke krævede fysisk dokumentation.
                </li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isEn ? "Employment Structure" : "Ansættelsesstruktur"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {isEn
                ? "The project required external expertise and operated through a tripartite structure to ensure independent audit and consulting."
                : "Projektet krævede ekstern ekspertise og blev faciliteret gennem en treparts-struktur for at sikre uafhængig databehandling og konsulentbistand."}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">{isEn ? "End Client" : "Slutkunde"}</Badge> Danske Bank
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">{isEn ? "Contractor" : "Kontraktør"}</Badge> EY (Ernst & Young)
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">{isEn ? "Employer" : "Ansættelse"}</Badge> M-Networks
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              {isEn ? "References & Contact" : "Referencer & Kontakt"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? "Detailed documentation and contact details for managers and colleagues are available upon request."
                  : "Uddybende dokumentation for sagsarbejdet samt kontaktinformation til tidligere kollegaer og ledere fremsendes gerne efter aftale."}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                {isEn ? "References available upon request" : "Referencer oplyses ved henvendelse"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> {isEn ? "Back to home" : "Tilbage til forsiden"}
        </Link>
      </Button>
      
      <div className="space-y-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary">{type}</Badge>
            <span className="text-sm text-muted-foreground font-medium">{period}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">
            {organization}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border">
            {description}
          </p>
        </div>
        
        {/* Vælg indhold baseret på ID fra URL'en */}
        {id === 'danske-bank-it' ? (
          renderDanskeBankContent()
        ) : id === 'kaerbo-omsorgscenter' ? (
          renderKaerboContent()
        ) : id === 'tolk-danmark' ? (
          renderTolkContent()
        ) : id === 'ruc-kandidat' ? (
          renderKandidatContent()
        ) : bullets && bullets.length > 0 ? (
          <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {isEn ? "Key Tasks & Learnings" : "Nøgleopgaver & Læringspunkter"}
                </CardTitle>
                <CardDescription>
                  {isEn
                    ? "Core responsibilities and domain expertise built during this position."
                    : "Væsentlige ansvarsområder og faglige kompetencer opbygget i forløbet."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300 list-disc pl-5 marker:text-primary">
                  {bullets.map((bullet, index) => (
                    <li key={index} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[250px] bg-slate-50/50 dark:bg-slate-900/20 mt-8">
            <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-300">
              {isEn ? "Additional Documentation" : "Yderligere Dokumentation"}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {isEn
                ? "Certificates and recommendation letters are available upon request."
                : "Relevante certifikater og udtalelser for denne stilling kan fremsendes ved henvendelse."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
