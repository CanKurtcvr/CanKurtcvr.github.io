import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, FileSpreadsheet, ArrowRight, ExternalLink } from "lucide-react";

const BusinessProjectsSection = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Projekt 1: Restaurant Menukort */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                Webløsning
              </Badge>
              <Utensils className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle>Digitalt Menukort</CardTitle>
            <CardDescription>Demo-case: Memo's Pizzeria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Et moderne, responsivt menukort designet til restauranter. Gør det nemt for kunder at se udvalget på mobilen.
              Inkluderer kategorisering, allergimærkning og billedvisning.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-secondary px-2 py-1 rounded-md">React</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Tailwind CSS</span>
              <span className="bg-secondary px-2 py-1 rounded-md">QR Integration</span>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Se Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Projekt 2: Excel Skabeloner */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Excel & Data
              </Badge>
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle>Økonomistyring & Revision</CardTitle>
            <CardDescription>Skabeloner til revisorer og privatøkonomi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Avancerede Excel-løsninger med automatiserede beregninger, makroer og dashboards. 
              Specialdesignet til at lette arbejdsgangen for revisorer eller give overblik over privatforbruget.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-secondary px-2 py-1 rounded-md">VBA / Macro</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Dashboards</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Automatisering</span>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Se Eksempler <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default BusinessProjectsSection;
