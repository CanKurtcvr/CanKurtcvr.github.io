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
import { 
  Utensils, 
  FileSpreadsheet, 
  ArrowRight, 
  ExternalLink, 
  Pizza, 
  Download, 
  ShoppingCart,
  Star,
  TrendingUp,
  TrendingDown,
  Wallet,
  Drumstick, // Ikon til kylling/tilbehør
  GlassWater // Ikon til drikkevarer
} from "lucide-react";
import { toast } from "sonner"; // Vi bruger toast til at vise demo-besked

const BusinessProjectsSection = () => {

  // Funktion til at vise demo-advarsel
  const handleOrderClick = () => {
    toast.info("Dette er en demo", {
      description: "Funktionen til at bestille mad er deaktiveret i denne visning."
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* ==========================================
            PROJEKT 1: RESTAURANT MENUKORT
           ========================================== */}
        <Card className="hover:shadow-xl transition-all duration-300 border-orange-100 group">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-background rounded-t-xl">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 shadow-sm">
                Web App
              </Badge>
              <Utensils className="h-5 w-5 text-orange-400 group-hover:text-orange-600 transition-colors" />
            </div>
            <CardTitle>Digitalt Menukort</CardTitle>
            <CardDescription>Demo-case: Memo's Pizzeria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-sm text-muted-foreground">
              Et moderne "Mobile First" menukort. Kunder scanner en QR-kode og får en app-lignende oplevelse direkte i browseren uden download. 
              Øger mersalg gennem visuel appel.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-secondary px-2.5 py-1 rounded-full font-medium">React</span>
              <span className="bg-secondary px-2.5 py-1 rounded-full font-medium">Tailwind</span>
              <span className="bg-secondary px-2.5 py-1 rounded-full font-medium">Framer Motion</span>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-200 dark:shadow-none">
                  Prøv App Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[380px] h-[85vh] p-0 overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col">
                
                {/* Mobile Frame Header */}
                <div className="bg-orange-600 p-4 text-white sticky top-0 z-20 shadow-md shrink-0">
                  <div className="flex justify-between items-center mb-4">
                     <span className="font-bold text-lg">Memo's Pizzeria</span>
                     <div className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
                     </div>
                  </div>
                  {/* Fake Categories Navigation */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">Pizzaer</span>
                    <span className="bg-orange-700 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">Tilbehør</span>
                    <span className="bg-orange-700 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">Drikkevarer</span>
                  </div>
                </div>

                {/* Mobile Content (Scrollable) */}
                <div className="p-4 space-y-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-950 pb-20">
                  
                  {/* --- SECTION: PIZZAER --- */}
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Pizza className="h-3 w-3" /> Klassiske Pizzaer
                    </div>
                    
                    <div className="space-y-3">
                      {/* Pizza 1 */}
                      <MenuItem 
                        title="4. Memo's Special" 
                        price="110,-" 
                        desc="Tomat, mozzarella, kebab, salat, dressing, chili."
                        icon={<Pizza className="h-8 w-8 text-orange-400" />}
                        color="bg-orange-100"
                        rating={5}
                      />
                      {/* Pizza 2 */}
                      <MenuItem 
                        title="3. Pepperoni" 
                        price="95,-" 
                        desc="Tomat, mozzarella, ægte italiensk pepperoni."
                        icon={<Pizza className="h-8 w-8 text-red-400" />}
                        color="bg-red-50"
                        rating={4}
                      />
                      {/* Pizza 3 */}
                      <MenuItem 
                        title="12. Hawaii" 
                        price="90,-" 
                        desc="Tomat, mozzarella, skinke, ananas."
                        icon={<Pizza className="h-8 w-8 text-yellow-500" />}
                        color="bg-yellow-50"
                        rating={4}
                      />
                      {/* Pizza 4 */}
                      <MenuItem 
                        title="22. Meat Lover" 
                        price="115,-" 
                        desc="Kødstrimler, pepperoni, bacon, cocktailpølser."
                        icon={<Pizza className="h-8 w-8 text-rose-400" />}
                        color="bg-rose-50"
                        rating={5}
                      />
                    </div>
                  </div>

                  {/* --- SECTION: TILBEHØR --- */}
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2 border-t pt-4">
                      <Drumstick className="h-3 w-3" /> Tilbehør & Snacks
                    </div>
                    <div className="space-y-3">
                      <MenuItem 
                        title="Pomfritter" 
                        price="45,-" 
                        desc="Sprøde pommes frites med remoulade."
                        icon={<Drumstick className="h-8 w-8 text-yellow-600" />}
                        color="bg-yellow-100"
                        rating={4}
                      />
                       <MenuItem 
                        title="Hot Wings (6 stk)" 
                        price="59,-" 
                        desc="Krydrede kyllingevinger med BBQ dip."
                        icon={<Drumstick className="h-8 w-8 text-orange-700" />}
                        color="bg-orange-200"
                        rating={5}
                      />
                    </div>
                  </div>

                  {/* --- SECTION: DRIKKEVARER --- */}
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2 border-t pt-4">
                      <GlassWater className="h-3 w-3" /> Drikkevarer
                    </div>
                    <div className="space-y-3">
                       <MenuItem 
                        title="Coca Cola 1.5L" 
                        price="45,-" 
                        desc="Original Taste."
                        icon={<GlassWater className="h-8 w-8 text-slate-700" />}
                        color="bg-slate-200"
                        rating={5}
                      />
                       <MenuItem 
                        title="Gazoz" 
                        price="25,-" 
                        desc="Klassisk tyrkisk sodavand."
                        icon={<GlassWater className="h-8 w-8 text-green-600" />}
                        color="bg-green-100"
                        rating={5}
                      />
                    </div>
                  </div>

                </div>
                
                {/* Mobile Bottom Bar */}
                <div className="bg-white dark:bg-slate-900 border-t p-4 shrink-0 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] z-20">
                  <Button 
                    className="w-full bg-slate-900 text-white hover:bg-slate-800 mb-2"
                    onClick={handleOrderClick}
                  >
                    Bestil Online
                  </Button>
                  <p className="text-[10px] text-center text-red-500 font-medium bg-red-50 dark:bg-red-950/30 py-1 rounded">
                    ⚠️ Demo-version: Bestilling er ikke muligt.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* ==========================================
            PROJEKT 2: EXCEL LØSNINGER
           ========================================== */}
        <Card className="hover:shadow-xl transition-all duration-300 border-green-100 group">
          <CardHeader className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background rounded-t-xl">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 shadow-sm">
                Business Intelligence
              </Badge>
              <FileSpreadsheet className="h-5 w-5 text-green-500 group-hover:text-green-700 transition-colors" />
            </div>
            <CardTitle>Økonomistyring & Data</CardTitle>
            <CardDescription>Skabeloner til revisorer og privatøkonomi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-sm text-muted-foreground">
              Skræddersyede Excel-dashboards, der forvandler rå data til overblik. 
              Indeholder automatiserede VBA-makroer, grafer og budgetstyring, der gør hverdagen nemmere.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-secondary px-2.5 py-1 rounded-full font-medium">Excel VBA</span>
              <span className="bg-secondary px-2.5 py-1 rounded-full font-medium">Dashboards</span>
              <span className="bg-secondary px-2.5 py-1 rounded-full font-medium">Automation</span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200 dark:shadow-none">
                  Se Dashboard Demo <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-green-700 text-xl">
                    <FileSpreadsheet className="h-6 w-6" /> Privatøkonomi Dashboard 2025
                  </DialogTitle>
                  <DialogDescription>
                    Her er et eksempel på, hvordan et professionelt budgetark ser ud.
                  </DialogDescription>
                </DialogHeader>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-100 dark:border-green-900">
                    <div className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1">
                      Indtægter <TrendingUp className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-700 mt-1">24.500 kr.</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-100 dark:border-red-900">
                    <div className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1">
                      Udgifter <TrendingDown className="h-3 w-3 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-700 mt-1">18.200 kr.</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1">
                      Opsparing <Wallet className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700 mt-1">6.300 kr.</div>
                  </div>
                </div>

                {/* Table Demo */}
                <div className="border rounded-md overflow-hidden bg-white dark:bg-black shadow-inner">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Faktisk</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Husleje & Forbrug</TableCell>
                        <TableCell>8.500 kr.</TableCell>
                        <TableCell>8.450 kr.</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">OK</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mad & Indkøb</TableCell>
                        <TableCell>3.000 kr.</TableCell>
                        <TableCell>3.450 kr.</TableCell>
                        <TableCell className="text-right">
                           <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Overskredet</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Transport</TableCell>
                        <TableCell>1.200 kr.</TableCell>
                        <TableCell>1.200 kr.</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">OK</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Download Section */}
                <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium">Vil du prøve arket selv?</p>
                    <p className="text-muted-foreground">Hent min skabelon gratis og kom i gang.</p>
                  </div>
                  
                  {/* DOWNLOAD LINK: Forventer at filen ligger i /public mappen */}
                  <Button asChild variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                    <a href="/budget-skabelon.xlsx" download="CanKurt_Budget_Skabelon.xlsx" className="gap-2">
                      <Download className="h-4 w-4" /> Download Excel
                    </a>
                  </Button>
                </div>

              </DialogContent>
            </Dialog>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

// Hjælpekomponent til menukort items for at holde koden ren
const MenuItem = ({ title, price, desc, icon, color, rating }: any) => (
  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-3">
    <div className={`h-20 w-20 ${color} rounded-lg flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div className="flex flex-col flex-1 justify-between">
      <div>
        <div className="flex justify-between items-start">
           <h4 className="font-bold text-sm">{title}</h4>
           <span className="font-bold text-sm text-orange-600">{price}</span>
        </div>
        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight mt-1">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
         <div className="flex text-yellow-400">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className={`h-3 w-3 ${i < rating ? 'fill-current' : 'text-gray-200'}`} />
           ))}
         </div>
         <Button size="icon" className="h-6 w-6 rounded-full bg-slate-900 text-white hover:bg-orange-600 transition-colors">
           <span className="text-xs">+</span>
         </Button>
      </div>
    </div>
  </div>
);

export default BusinessProjectsSection;
