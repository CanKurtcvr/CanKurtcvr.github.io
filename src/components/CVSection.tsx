import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cvItems = [
  {
    id: "danske-bank-it-consultant",
    title: "IT Consultant",
    organization: "Danske Bank (via EY / M Networks)",
    period: "Jun 2022 - Dec 2023",
    type: "Erfaring",
    tags: ["IT Support", "Workflows", "Automation"]
  },
  {
    id: "forsorgshjemmet-absalon",
    title: "Care Worker",
    organization: "Forsorgshjemmet Absalon",
    period: "Jan 2024 - Present",
    type: "Erfaring",
    tags: ["Socialt arbejde", "Ansvar"]
  },
  {
    id: "tolkdanmark-interpreter",
    title: "Danish-to-English Interpreter",
    organization: "TolkDanmark",
    period: "Feb 2024 - Present",
    type: "Erfaring",
    tags: ["Sprog", "Kommunikation"]
  },
  {
    id: "ruc-bsc",
    title: "BSc in Informatics and Business Studies",
    organization: "Roskilde University",
    period: "Sep 2021 - Jun 2024",
    type: "Uddannelse",
    tags: ["Informatics", "Business"]
  },
  {
    id: "red-barnet-ungdom",
    title: "Homework Tutor & Mentor",
    organization: "Red Barnet Ungdom",
    period: "Mar 2025 - Present",
    type: "Frivillig",
    tags: ["Undervisning", "Mentorskab"]
  }
];

export default function CVSection() {
  return (
    <section id="cv" className="py-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Erfaring & Uddannelse</h2>
        <p className="text-center text-muted-foreground mb-8">Klik på et segment for at se mere uddybende materiale.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvItems.map((item) => (
            <Link key={item.id} to={`/cv/${item.id}`} className="block transition-transform hover:-translate-y-1">
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
