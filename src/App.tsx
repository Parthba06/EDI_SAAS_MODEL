import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const AppShell = () => {
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "/home";

    return (
      <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
        <Toaster />
        <Sonner />

        {/* Global theme switcher (hidden on homepage) */}
        {!isHome && (
          <button
            onClick={toggleTheme}
            className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium shadow-card hover:shadow-glow transition-[background,box-shadow,transform] duration-200 hover:-translate-y-0.5"
          >
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]"
            >
              {theme === "dark" ? "☾" : "☼"}
            </span>
            <span className="hidden sm:inline">
              {theme === "dark" ? "Dark" : "Light"} mode
            </span>
          </button>
        )}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/insights" element={<Insights />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}; 

export default App;
