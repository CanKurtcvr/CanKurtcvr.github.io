import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const demoNews: Article[] = [
  {
    title: "SpaceX Successfully Launches New Starship Prototype",
    description: "The massive rocket achieved orbit for the first time in a historic test flight from Texas.",
    urlToImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    title: "New AI Model Breaks Coding Benchmarks",
    description: "Tech giants release a new open-source model capable of writing complex software instantly.",
    urlToImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    title: "Global Markets Rally Following Tech Earnings",
    description: "Major indices hit record highs as semiconductor demand continues to surge worldwide.",
    urlToImage: "https://images.unsplash.com/photo-1611974765215-fadbf172b886?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    title: "Sustainable Energy: A Breakthrough in Solar Efficiency",
    description: "Scientists discover a new material that boosts solar panel efficiency by 40%.",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    title: "The Future of Remote Work: Trends for 2025",
    description: "Companies are embracing hybrid models as employees demand more flexibility in their work arrangements.",
    urlToImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    url: "#"
  },
  {
    title: "Quantum Computing Reaches New Milestone",
    description: "Researchers achieve quantum advantage in complex optimization problems, opening new possibilities.",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    url: "#"
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
          <h2 className="text-2xl font-display font-bold text-foreground">Trending Tech News</h2>
          <p className="text-sm text-muted-foreground">Top headlines from around the world</p>
        </div>
        <Button
          onClick={refreshNews}
          disabled={loading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
            
            <div className="p-5">
              <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Read More
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
