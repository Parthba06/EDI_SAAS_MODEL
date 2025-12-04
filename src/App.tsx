import { useEffect } from "react";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 🔥 ADDED ROUTE
import AuthCallback from "./pages/AuthCallback";

// 🔥 ADDED PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const AppShell = () => {
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "/home";

    useEffect(() => {
      const root = document.documentElement;
      if (isHome) {
        root.classList.remove("dark");
        return;
      }
      root.classList.add("dark");
    }, [isHome]);

    return (
      <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
        <Toaster />
        <Sonner />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* REQUIRED FOR GOOGLE OAUTH → Supabase redirect here */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* PROTECTED ROUTES WRAPPED WITH "ProtectedRoute" */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/engagement"
              element={
                <ProtectedRoute>
                  <EngagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/followers-growth"
              element={
                <ProtectedRoute>
                  <FollowersGrowthPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audience-demographics"
              element={
                <ProtectedRoute>
                  <AudienceDemographicsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hashtag-analytics"
              element={
                <ProtectedRoute>
                  <HashtagAnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/earnings"
              element={
                <ProtectedRoute>
                  <EarningsDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <Insights />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 */}
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
