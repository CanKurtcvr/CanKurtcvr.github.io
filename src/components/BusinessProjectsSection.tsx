import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Utensils, FileSpreadsheet, ArrowRight, ExternalLink, Pizza, DollarSign } from "lucide-react";

const BusinessProjectsSection = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Projekt 1: Restaurant Menukort */}
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
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
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <p className="text-sm text-muted-foreground flex-1">
              Et moderne, responsivt menukort designet til restauranter. Gør det nemt for kunder at se udvalget på mobilen via QR-kode.
              Løsningen inkluderer kategorisering, allergimærkning og billedvisning.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-secondary px-2 py-1 rounded-md">React</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Tailwind CSS</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Mobile First</span>
            </div>
            
            {/* Modal for Memo's Pizzeria Demo */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4" variant="outline">
                  Se Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-orange-600">
                    <Pizza className="h-5 w-5" /> Memo's Pizzeria
                  </DialogTitle>
                  <DialogDescription>
                    Live preview af hvordan menukortet ser ud på en mobiltelefon.
                  </DialogDescription>
                </DialogHeader>
                
                {/* Demo Content: Fake Menu */}
                <div className="border rounded-lg p-4 bg-background mt-2 shadow-inner">
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">Pizzaer</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">1. Margherita</h4>
                        <p className="text-xs text-muted-foreground">Tomatsauce, mozzarella, frisk basilikum</p>
                      </div>
                      <span className="font-bold">85,-</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">2. Vesuvio</h4>
                        <p className="text-xs text-muted-foreground">Tomatsauce, mozzarella, skinke</p>
                      </div>
                      <span className="font-bold">90,-</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">3. Pepperoni</h4>
                        <p className="text-xs text-muted-foreground">Tomatsauce, mozzarella, pepperoni, oregano</p>
                      </div>
                      <span className="font-bold">95,-</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">4. Memo's Special</h4>
                        <p className="text-xs text-muted-foreground">Tomatsauce, mozzarella, kebab, salat, dressing</p>
                        <Badge variant="secondary" className="text-[10px] mt-1">Populær</Badge>
                      </div>
                      <span className="font-bold">110,-</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t text-center">
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">Bestil Online</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Projekt 2: Excel Skabeloner */}
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
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
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <p className="text-sm text-muted-foreground flex-1">
              Skræddersyede Excel-løsninger der effektiviserer arbejdsgange. 
              Indeholder automatiserede beregninger for revisorer samt budget-dashboards til styring af personlig økonomi.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-secondary px-2 py-1 rounded-md">VBA / Macro</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Dashboards</span>
              <span className="bg-secondary px-2 py-1 rounded-md">Automatisering</span>
            </div>

            {/* Modal for Excel Demo */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4" variant="outline">
                  Se Eksempler <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-green-700">
                    <FileSpreadsheet className="h-5 w-5" /> Privatøkonomi Dashboard
                  </DialogTitle>
                  <DialogDescription>
                    Eksempel på automatisk budgetberegning og kategorisering.
                  </DialogDescription>
                </DialogHeader>

                {/* Demo Content: Fake Excel Table */}
                <div className="border rounded-md overflow-hidden bg-white dark:bg-black mt-2">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Budgetteret</TableHead>
                        <TableHead>Faktisk</TableHead>
                        <TableHead className="text-right">Difference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Husleje & Forbrug</TableCell>
                        <TableCell>8.500 kr.</TableCell>
                        <TableCell>8.450 kr.</TableCell>
                        <TableCell className="text-right text-green-600">+50 kr.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mad & Indkøb</TableCell>
                        <TableCell>3.000 kr.</TableCell>
                        <TableCell>3.250 kr.</TableCell>
                        <TableCell className="text-right text-red-600">-250 kr.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Transport</TableCell>
                        <TableCell>1.200 kr.</TableCell>
                        <TableCell>1.200 kr.</TableCell>
                        <TableCell className="text-right text-green-600">0 kr.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Opsparing</TableCell>
                        <TableCell>2.000 kr.</TableCell>
                        <TableCell>2.500 kr.</TableCell>
                        <TableCell className="text-right text-green-600">+500 kr.</TableCell>
                      </TableRow>
                      <TableRow className="bg-muted/20 font-bold">
                        <TableCell>I alt denne måned</TableCell>
                        <TableCell>14.700 kr.</TableCell>
                        <TableCell>15.400 kr.</TableCell>
                        <TableCell className="text-right text-green-600">+700 kr.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  * Dette er et interaktivt eksempel. Den fulde version indeholder grafer og makroer.
                </div>
              </DialogContent>
            </Dialog>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default BusinessProjectsSection;
