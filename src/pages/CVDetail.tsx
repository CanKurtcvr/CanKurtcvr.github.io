import { useLocation, Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Briefcase, User, Phone, CheckCircle2, Film, BookOpen, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CVDetail() {
  const location = useLocation();
  const { id } = useParams();
  const cvData = location.state?.cvData;

  if (!cvData) {
    return <Navigate to="/" replace />;
  }

  // Specielt indhold for Kandidatuddannelsen (RUC)
  const renderKandidatContent = () => (
    <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Kursusbeskrivelse
          </CardTitle>
          <CardDescription>
            Officiel oversigt over uddannelsens faglige indhold og kompetencemål.
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
            Officielt Tolke-ID
          </CardTitle>
          <CardDescription>
            Identifikation og certificering udstedt af TolkDanmark for professionel virke.
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
            Gode stunder fra Kærbo Omsorgscenter
          </CardTitle>
          <CardDescription>
            Herunder er tre sjove videoklip fra min tid med borgerne Oluf, Poul-Erik og Peter. Videoerne deles med fuldt samtykke fra dem alle tre.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <h3 className="font-semibold text-base">Oluf</h3>
            <div className="overflow-hidden rounded-lg border bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-contain">
                <source src="/gemini_generated_video_5E4FD344.mp4" type="video/mp4" />
                Din browser understøtter ikke video-tagget.
              </video>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">Poul-Erik</h3>
            <div className="overflow-hidden rounded-lg border bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-contain">
                <source src="/gemini_generated_video_82CE1AEF.mp4" type="video/mp4" />
                Din browser understøtter ikke video-tagget.
              </video>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">Peter</h3>
            <div className="overflow-hidden rounded-lg border bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-contain">
                <source src="/gemini_generated_video_AB45BC40.mp4" type="video/mp4" />
                Din browser understøtter ikke video-tagget.
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
            Sagens Kerne: Inkasso-oprydningen
          </CardTitle>
          <CardDescription>
            Arbejdet relaterede sig til en af de største it- og dataskandaler i dansk finanshistorie.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <p className="font-semibold mb-2">Baggrund for projektet:</p>
            <p className="mb-3">
              I 2022 kom det frem, at systemfejl havde ført til uretmæssig inddrivelse af gæld. Som følge af oprydningsarbejdet slettede banken gæld for over 20 milliarder kroner hos inkassokunder.
            </p>
            <a 
              href="https://nyheder.tv2.dk/2022-08-31-danske-bank-har-slettet-gaeld-for-over-20-milliarder-kroner-hos-inkassokunder-viser-laekkede-dokumenter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Læs TV2's dækning af sagen her <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Nøgleopgaver & Ansvarsområder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5 marker:text-slate-400">
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
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ansættelsesstruktur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Projektet krævede ekstern ekspertise og blev faciliteret gennem en treparts-struktur for at sikre uafhængig databehandling og konsulentbistand.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">Slutkunde</Badge> Danske Bank
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Kontraktør</Badge> EY (Ernst & Young)
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Ansættelse</Badge> M-Networks
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Kontaktperson
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="font-semibold text-base">Kim Nilsson Nilsson</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+4527113728" className="hover:text-primary transition-colors">+45 27 11 37 28</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+4531138577" className="hover:text-primary transition-colors">+45 31 13 85 77</a>
                </div>
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
          <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til forsiden
        </Link>
      </Button>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {cvData.title}
          </h1>
          <h2 className="text-2xl text-muted-foreground mb-4">
            {cvData.organization} <span className="text-base font-normal ml-2">({cvData.period})</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border">
            {cvData.description}
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
        ) : (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50 dark:bg-slate-900/20 mt-8">
            <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Ekstra Kontekst
            </h3>
            <p className="text-muted-foreground max-w-md">
              Denne sektion er klar til at blive udvidet. Her kan du tilføje en videopræsentation for din tid som {cvData.title.toLowerCase()}, fremvise uddannelsesbeviser eller linke til relevante projekter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
