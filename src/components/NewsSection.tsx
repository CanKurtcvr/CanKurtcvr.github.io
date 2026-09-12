import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  source: string;
}

const demoNews: Article[] = [
  {
    title: "AI og LLM: Gennembrud i ræsonnering og softwarearkitektur",
    description: "Nye modeller demonstrerer stærke evner inden for autonom kodefejlretning, arkitekturdesign og matematisk problemløsning.",
    urlToImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    url: "https://news.ycombinator.com/",
    source: "Hacker News / Tech Community"
  },
  {
    title: "Fremtidens IT-infrastruktur og Cloud Transformation",
    description: "Virksomheder accelererer overgangen til serverless, edge computing og hybride cloud-miljøer for øget modstandsdygtighed.",
    urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    url: "https://www.technologyreview.com/",
    source: "MIT Technology Review"
  },
  {
    title: "Rumfart og satellitkommunikation i eksplosiv udvikling",
    description: "Næste generations opsendelser udvider globale bredbåndsnetværk og muliggør direkte satellit-til-mobil kommunikation.",
    urlToImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
    url: "https://arstechnica.com/space/",
    source: "Ars Technica"
  },
  {
    title: "Cybersikkerhed og digital suverænitet i EU",
    description: "Stigende fokus på NIS2, GDPR og beskyttelse af kritisk samfundsinfrastruktur mod avancerede cybertrusler.",
    urlToImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    url: "https://www.eff.org/",
    source: "Electronic Frontier Foundation"
  },
  {
    title: "Grøn omstilling og energieffektiv computing",
    description: "Datacentre investerer massivt i vedvarende energi, direkte vandkøling og chiparkitekturer med minimalt energiforbrug.",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    url: "https://www.theverge.com/tech",
    source: "The Verge Tech"
  },
  {
    title: "Kvanteteknologi: Fra laboratoriet til praktisk kryptering",
    description: "Forskere opnår nye milepæle inden for post-kvante-kryptografi og simulation af komplekse molekyler.",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    url: "https://www.wired.com/",
    source: "Wired"
  }
];

const NewsSection = () => {
  const [news, setNews] = useState<Article[]>(demoNews);
  const [loading, setLoading] = useState(false);

  const refreshNews = () => {
    setLoading(true);
    // Shuffle the demo news
    setTimeout(() => {
      setNews([...demoNews].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Teknologi & Nyheder</h2>
          <p className="text-sm text-muted-foreground">Aktuelle overskrifter og emner fra tech-verdenen</p>
        </div>
        <Button
          onClick={refreshNews}
          disabled={loading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Opdater
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group bg-card rounded-xl overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-sm">
                  {article.source}
                </div>
              </div>
              
              <div className="p-5 space-y-2">
                <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Læs artiklen hos kilden
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default NewsSection;
