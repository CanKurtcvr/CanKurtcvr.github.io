import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Github, Copy, Check, MessageSquare, ExternalLink, Clock } from "lucide-react";
import { toast } from "sonner";

interface ContactDialogProps {
  triggerClassName?: string;
}

export default function ContactDialog({ triggerClassName }: ContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`${label} er kopieret til udklipsholderen!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const mailtoSubject = encodeURIComponent("Henvendelse vedrørende stilling eller projekt");
  const mailtoBody = encodeURIComponent("Hej Can,\n\nJeg har set dit CV og portfolio på cankurtcvr.github.io og vil gerne høre mere om...");
  const mailtoUrl = `mailto:cankurtcvr@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={`gap-2 rounded-full font-semibold shadow-md transition-all hover:scale-105 ${triggerClassName || "bg-accent text-accent-foreground hover:bg-accent/90"}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ræk ud / Kontakt</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-2xl font-display font-bold">
            Lad os tage en uforpligtende snak
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Jeg er altid interesseret i spændende muligheder inden for IT-konsulentarbejde, digitalisering, analyse eller softwareudvikling.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {/* Email Option */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/60 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">cankurtcvr@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => copyToClipboard("cankurtcvr@gmail.com", "Email")}
                title="Kopiér email"
              >
                {copiedKey === "Email" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button asChild size="sm" variant="outline" className="h-8 gap-1 text-xs">
                <a href={mailtoUrl}>
                  Send mail
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>

          {/* Phone Option */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/60 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Telefon</p>
                <p className="text-sm font-medium text-foreground">+45 28 70 12 13</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => copyToClipboard("+4528701213", "Telefonnummer")}
                title="Kopiér telefonnummer"
              >
                {copiedKey === "Telefonnummer" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button asChild size="sm" variant="outline" className="h-8 gap-1 text-xs">
                <a href="tel:+4528701213">
                  Ring op
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button asChild variant="outline" className="w-full gap-2 justify-start h-11 text-xs sm:text-sm">
              <a href="https://linkedin.com/in/canxkurt" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>LinkedIn profil</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full gap-2 justify-start h-11 text-xs sm:text-sm">
              <a href="https://github.com/CanKurtcvr" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 shrink-0" />
                <span>GitHub profil</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground border-t border-border">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>Svarer typisk inden for 24 timer</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
