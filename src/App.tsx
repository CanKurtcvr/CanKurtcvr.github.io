import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";

// ⚡ Bolt: Code-split secondary page routes to reduce main JS bundle loaded on initial landing
const CVDetail = lazy(() => import("./pages/CVDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={
                <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground text-sm animate-pulse">
                  Henter...
                </div>
              }>
                <Routes>
                  <Route path="/cv/:id" element={<CVDetail />} />
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
