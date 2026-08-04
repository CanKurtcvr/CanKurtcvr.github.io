import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CVDetail() {
  // useLocation griber den data, vi sendte fra CVSection
  const location = useLocation();
  const cvData = location.state?.cvData;

  // Hvis man tilgår URL'en direkte uden at have klikket på et kort, sendes man til forsiden
  if (!cvData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til forsiden
        </Link>
      </Button>
      
      <div className="space-y-8">
        {/* CV Data Sektionen */}
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
        
        {/* Den "blanke" kasse til dit fremtidige indhold */}
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50 dark:bg-slate-900/20">
          <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-300">
            Ekstra Kontekst
          </h3>
          <p className="text-muted-foreground max-w-md">
            Denne sektion er klar til at blive udvidet. Her kan du tilføje en videopræsentation for din tid som {cvData.title.toLowerCase()}, fremvise uddannelsesbeviser eller linke til n8n workflows.
          </p>
        </div>
      </div>
    </div>
  );
}
