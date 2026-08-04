import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; // Ikon fra lucide-react, som følger med shadcn

export default function CVDetail() {
  // useParams griber fat i ID'et fra URL'en (f.eks. "danske-bank" eller "ruc")
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til forsiden
        </Link>
      </Button>
      
      <div className="space-y-6">
        <h1 className="text-4xl font-bold capitalize">
          {id?.replace(/-/g, ' ')}
        </h1>
        
        {/* Her kan du senere tilføje et if/else statement baseret på 'id' 
            for at vise specifikke n8n workflows, certifikater eller videoer */}
        
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-12 text-center text-muted-foreground flex flex-col items-center justify-center min-h-[400px]">
          <p>Tom skabelon for: {id}</p>
          <p className="text-sm mt-2">Klar til videopræsentation eller uddannelsesbeviser.</p>
        </div>
      </div>
    </div>
  );
}
