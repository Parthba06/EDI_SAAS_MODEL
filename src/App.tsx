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
import EngagementPage from "./pages/EngagementPage";
import FollowersGrowthPage from "./pages/FollowersGrowthPage";
import AudienceDemographicsPage from "./pages/AudienceDemographicsPage";
import HashtagAnalyticsPage from "./pages/HashtagAnalyticsPage";
import EarningsDashboardPage from "./pages/EarningsDashboardPage";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  const AppShell = () => {
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "/home";

    useEffect(() => {
      const root = document.documentElement;
      if (isHome) {
        root.classList.remove("dark");
        return;
      }
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      window.localStorage.setItem("theme", theme);
    }, [theme, isHome]);

    const toggleTheme = () => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
      <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
        <Toaster />
        <Sonner />


        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/engagement" element={<EngagementPage />} />
            <Route path="/followers-growth" element={<FollowersGrowthPage />} />
            <Route path="/audience-demographics" element={<AudienceDemographicsPage />} />
            <Route path="/hashtag-analytics" element={<HashtagAnalyticsPage />} />
            <Route path="/earnings" element={<EarningsDashboardPage />} />
          </Route>
          <Route path="/" element={<Index />} />
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
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <AppShell />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}; 

export default App;
