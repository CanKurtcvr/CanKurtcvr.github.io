import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Heart, Globe, Car, Languages } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CVSection = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Profile */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded-full" />
          Profil
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Fagligt stærk og alsidig profil med baggrund inden for IT, analyse og formidling.
          Jeg trives i roller med stort ansvar, hvor jeg kan bringe min tekniske forståelse og menneskelige empati i spil.
          Mit mål er at finde en langsigtet arbejdsplads med en sund balance mellem professionalisme og et godt kollegialt fællesskab.
          Til holdet bidrager jeg med et bredt kompetencespænd og et stort drive for at skabe resultater.
        </p>
      </motion.section>

      {/* Education */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-accent" />
          Uddannelse
        </h2>
        
        <div className="space-y-6">
          {/* ITU Kandidat removed here */}
          
          <div className="relative pl-6 border-l-2 border-accent/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent/60" />
            <h3 className="font-semibold text-foreground">Bachelor i IT og Virksomhedsstudier</h3>
            <p className="text-sm text-accent mb-2">Roskilde Universitet | 2021 – 2024</p>
            <p className="text-muted-foreground text-sm">
              Fokus på programmering, dataanalyse, hjemmeside-design og IT-sikkerhed.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-accent" />
          Relevant Erfaring
        </h2>
        
        <div className="space-y-6">
          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-semibold text-foreground">Tolk (Deltid)</h3>
              <span className="text-sm text-accent">2024 – I dag</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 italic">Tolk Danmark</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Dansk-Engelsk tolkning ved kommunale møder med fokus på præcision og etik</li>
              <li>Facilitering af kommunikation for borgere i København og omegn</li>
              <li>Stærke kompetencer i at håndtere følsomme situationer professionelt</li>
            </ul>
          </div>
          
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-semibold text-foreground">IT-Konsulent (Fuldtid)</h3>
              <span className="text-sm text-accent">2022 – 2023</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 italic">Danske Bank (via EY / M Networks)</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Try Hire-forløb:</strong> Ansvarlig for fejlretning i komplekse kundesager</li>
              <li>Analyse og behandling af store datasæt via avancerede Excel-løsninger</li>
              <li>Sikring af lovpligtig dokumentation og korrekt kompensation til kunder</li>
              <li>Ansvarlig for oplæring og onboarding af nye kolleger i teamet</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Volunteering */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-6 text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent" />
          Frivilligt Arbejde
        </h2>
        
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="font-semibold text-foreground">Lektiehjælper / Mentor</h3>
            <span className="text-sm text-accent">2024 – I dag</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2 italic">Red Barnet Ungdom</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Frivillig mentor for en dreng i 5. klasse</li>
            <li>Støtte til faglig læring og styrkelse af elevens motivation og selvtillid</li>
          </ul>
        </div>
      </motion.section>

      {/* Additional Info */}
      <motion.section variants={item} className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          Yderligere Information
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Languages className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm">Sprog</h4>
              <p className="text-sm text-muted-foreground">
                Dansk (Modersmål), Engelsk (Flydende), Tysk (Kendskab)
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm">Kørekort</h4>
              <p className="text-sm text-muted-foreground">Kategori B (Almindelig bil)</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default CVSection;
