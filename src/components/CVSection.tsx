import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cvItems } from "@/data/cvData";

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
