import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-bold font-display text-accent">404</h1>
        <h2 className="text-2xl font-semibold">Siden blev ikke fundet</h2>
        <p className="text-muted-foreground">
          Siden du leder efter findes desværre ikke eller er flyttet.
        </p>
        <div>
          <Button asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
