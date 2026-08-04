import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cvItems = [
  {
    id: "forsorgshjemmet-absalon",
    title: "Omsorgsmedarbejder (Vikariat)",
    organization: "Forsorgshjemmet Absalon",
    period: "Jan. 2024 - Nuværende",
    type: "Erfaring",
    description: "Yder administrativ støtte og personlig omsorg til udsatte borgere og håndterer komplekse sociale situationer med ro og empati.",
    tags: ["Socialt arbejde", "Administration", "Empati"]
  },
  {
    id: "tolk-danmark",
    title: "Tolk (Vikariat)",
    organization: "Tolk Danmark",
    period: "Feb. 2024 - Nuværende",
    type: "Erfaring",
    description: "Formidler præcis dansk-engelsk kommunikation ved kritiske møder med fokus på etik og professionalisme.",
    tags: ["Sprog", "Kommunikation", "Etik"]
  },
  {
    id: "danske-bank-it",
    title: "IT-konsulent (fuldtid)",
    organization: "Danske Bank (via EY / M Networks)",
    period: "Jun. 2022 - Dec. 2023",
    type: "Erfaring",
    description: "Ansvarlig for fejlretning i komplekse kundesager, analyse af store datamængder i Excel og onboarding.",
    tags: ["Dataanalyse", "Fejlretning", "Onboarding"]
  },
  {
    id: "ruc-bachelor",
    title: "Bachelor i Informatik og Virksomhedsstudier",
    organization: "Roskilde Universitet",
    period: "Sep. 2021 - Jun. 2024",
    type: "Uddannelse",
    description: "Lærte programmering, bogholderi dataanalyse, UX-design og organisatorisk filosofi.",
    tags: ["Informatik", "Virksomhedsstudier", "UX-design"]
  },
  {
    id: "lyreco-lager",
    title: "Lagermedarbejder",
    organization: "Lyreco",
    period: "Okt. 2021 - Maj 2022",
    type: "Erfaring",
    description: "Fysisk arbejde med pluk, effektiv pakning og logistik under stramme deadlines.",
    tags: ["Logistik", "Effektivitet"]
  },
  {
    id: "ole-romer-skole",
    title: "Pædagogmedhjælper",
    organization: "Ole-Rømer skolen - Høje Taastrup",
    period: "Aug. 2019 - Okt. 2021",
    type: "Erfaring",
    description: "Understøttede undervisning og agerede støttepædagog for elever med sociale udfordringer.",
    tags: ["Undervisning", "Pædagogik"]
  },
  {
    id: "red-barnet-ungdom",
    title: "Lektiehjælper",
    organization: "Red Barnet Ungdom",
    period: "Mar. 2025 - Nuv.",
    type: "Frivilligt arbejde",
    description: "Frivillig mentor for elev i 5. klasse med fokus på faglig indlæring og selvtillid.",
    tags: ["Mentorskab", "Formidling"]
  }
];

export default function CVSection() {
  return (
    <section id="cv" className="py-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Profil & Erfaring</h2>
        <p className="text-center text-muted-foreground mb-8">
          Ambitiøs profil med en stærk og alsidig baggrund inden for IT, analyse og formidling. Klik på et kort for at dykke ned i detaljerne.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvItems.map((item) => (
            /* Vi sender hele 'item'-objektet med over til detaljesiden via 'state' */
            <Link key={item.id} to={`/cv/${item.id}`} state={{ cvData: item }} className="block transition-transform hover:-translate-y-1">
              <Card className="h-full hover:border-primary/50 hover:shadow-md cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{item.type}</Badge>
                    <span className="text-xs text-muted-foreground font-medium">{item.period}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base text-foreground/80 font-medium">
                    {item.organization}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
