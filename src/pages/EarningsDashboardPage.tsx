import React, { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart2,
  DollarSign,
  Briefcase,
  TrendingDown,
  Layers,
  Award,
  Users,
  Target,
  Percent,
  Sliders,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Flame,
  ArrowRight,
  Check,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Info
} from "lucide-react";

// --- Types & Data Models ---

type EarnPlatform = "youtube" | "instagram" | "twitter";
type EarnRange = "7 Days" | "30 Days" | "90 Days" | "This Month" | "This Year";
type BrandTier = "seed" | "series_a" | "growth" | "enterprise";

interface MonetizationInsight {
  id: number;
  title: string;
  category: "Opportunity" | "Risk" | "Efficiency" | "Audience";
  explanation: string;
  impactLevel: "High" | "Medium" | "Low";
  impactValue: string;
  confidence: number;
  trend: "up" | "down" | "flat";
  recommendation: string;
}

interface ContentCorrelationPoint {
  format: string;
  value: number; // Percentage or value based on selection
  color: string;
}

interface AudienceSegment {
  demographic: string;
  purchasingPower: "High" | "Medium" | "Low";
  affiliateCTR: string;
  sponsorCompatibility: number; // 0 to 100
  barValue: number;
}

interface AnomalyAlert {
  id: number;
  type: "spike" | "drop";
  metric: string;
  change: string;
  explanation: string;
  time: string;
}

interface ForecastPoint {
  label: string;
  actual?: number;
  projected?: number;
  lowerBound?: number;
  upperBoundBound?: number;
}

// --- High-Fidelity Mock Database ---

const INSIGHTS_FEED: MonetizationInsight[] = [
  {
    id: 1,
    title: "Sponsorship Premium Opportunity",
    category: "Opportunity",
    explanation: "Educational AI reels are generating 2.8x stronger sponsorship engagement than generic entertainment content. High-retention technical audiences support premium brand pricing.",
    impactLevel: "High",
    impactValue: "+34% Sponsorship Value",
    confidence: 91,
    trend: "up",
    recommendation: "Pivot secondary slots towards live workflow tutorials to justify a 25% pricing increase on upcoming deal renewals."
  },
  {
    id: 2,
    title: "Affiliate Conversion Spike",
    category: "Efficiency",
    explanation: "Long-form step-by-step dev tutorials produce 4.1x higher affiliate click-through-rates compared to carousels. Audiences purchase productivity software directly when tools are demonstrated in-use.",
    impactLevel: "High",
    impactValue: "+42% Affiliate Conversion",
    confidence: 94,
    trend: "up",
    recommendation: "Place custom deep links in video descriptions at exactly the 2-minute mark when audience retention is at its peak."
  },
  {
    id: 3,
    title: "Upload Time Optimization",
    category: "Efficiency",
    explanation: "Late-night uploads (11 PM - 2 AM) correlate with a 14% drop in active affiliate conversions, as passive mobile viewers show high scrolling activity but extremely low buying intent.",
    impactLevel: "Medium",
    impactValue: "-14% Buying Intent",
    confidence: 86,
    trend: "down",
    recommendation: "Reschedule technical posts to publish between 6 PM - 8 PM when developer audiences demonstrate high purchasing responsiveness."
  },
  {
    id: 4,
    title: "Target Demographic Match",
    category: "Audience",
    explanation: "Your highest earning audience segment is users aged 22–30 interested in developer productivity tools. They represent 68% of total subscription affiliate payouts.",
    impactLevel: "High",
    impactValue: "Top Revenue Driver",
    confidence: 97,
    trend: "flat",
    recommendation: "Focus brand partnership pitches toward developer tools, IDE utilities, and hosting startups."
  }
];

const ANOMALY_ALERTS: AnomalyAlert[] = [
  {
    id: 1,
    type: "spike",
    metric: "Affiliate Revenue",
    change: "+48% Spike",
    explanation: "Sudden spike in conversion efficiency driven by your viral 'No-code workflow engine' tutorial posted on Tuesday.",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "drop",
    metric: "Ad-Sense Revenue",
    change: "-18% Decline",
    explanation: "Revenue dropped 18% due to lower audience retention in entertainment-focused weekend shorts.",
    time: "Yesterday"
  }
];

const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  { demographic: "Tech Professionals (22-30)", purchasingPower: "High", affiliateCTR: "8.4%", sponsorCompatibility: 95, barValue: 95 },
  { demographic: "Engineering Managers (31-40)", purchasingPower: "High", affiliateCTR: "6.2%", sponsorCompatibility: 91, barValue: 91 },
  { demographic: "CS Students (18-21)", purchasingPower: "Medium", affiliateCTR: "4.1%", sponsorCompatibility: 72, barValue: 72 },
  { demographic: "Tech Enthusiasts (40+)", purchasingPower: "Medium", affiliateCTR: "2.8%", sponsorCompatibility: 64, barValue: 64 }
];

const CONTENT_CORRELATION_DATA: Record<string, ContentCorrelationPoint[]> = {
  sponsorship: [
    { format: "Educational Tutorials", value: 92, color: "#3B82F6" },
    { format: "Instagram Reels", value: 78, color: "#EC4899" },
    { format: "Shorts & Clips", value: 45, color: "#EF4444" },
    { format: "Threads & Posts", value: 38, color: "#10B981" },
    { format: "Carousels", value: 30, color: "#F59E0B" }
  ],
  affiliate: [
    { format: "Educational Tutorials", value: 96, color: "#3B82F6" },
    { format: "Carousels", value: 65, color: "#F59E0B" },
    { format: "Threads & Posts", value: 58, color: "#10B981" },
    { format: "Instagram Reels", value: 40, color: "#EC4899" },
    { format: "Shorts & Clips", value: 24, color: "#EF4444" }
  ],
  cpm: [
    { format: "Educational Tutorials", value: 98, color: "#3B82F6" },
    { format: "Threads & Posts", value: 70, color: "#10B981" },
    { format: "Carousels", value: 50, color: "#F59E0B" },
    { format: "Instagram Reels", value: 42, color: "#EC4899" },
    { format: "Shorts & Clips", value: 20, color: "#EF4444" }
  ]
};

const BRAND_PRICING_CONFIGS: Record<BrandTier, {
  name: string;
  reelPricing: number;
  storyPricing: number;
  packagePricing: number;
  readinessScore: number;
  compatibility: "Good" | "Excellent" | "Perfect";
  badgeColor: string;
  advisoryText: string;
}> = {
  seed: {
    name: "Seed-Stage Startup",
    reelPricing: 18000,
    storyPricing: 7000,
    packagePricing: 38000,
    readinessScore: 78,
    compatibility: "Good",
    badgeColor: "bg-cyan-50 text-cyan-600 border-cyan-200",
    advisoryText: "Seed startups prioritize direct user signups and raw brand awareness. Focus your pitch on high click-through rates and high conversion volumes."
  },
  series_a: {
    name: "Series-A Startup",
    reelPricing: 28000,
    storyPricing: 11000,
    packagePricing: 62000,
    readinessScore: 87,
    compatibility: "Excellent",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    advisoryText: "Series-A startups have fresh marketing budgets and prioritize product education. High save-rate educational content increases brand partnership value here."
  },
  growth: {
    name: "Growth-Stage SaaS",
    reelPricing: 38000,
    storyPricing: 16000,
    packagePricing: 88000,
    readinessScore: 92,
    compatibility: "Perfect",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    advisoryText: "Growth SaaS tools seek high-intent users with high customer lifetime value. Productivity-focused tech audiences attract maximum sponsorship ROI here."
  },
  enterprise: {
    name: "Enterprise Tech",
    reelPricing: 55000,
    storyPricing: 24000,
    packagePricing: 130000,
    readinessScore: 95,
    compatibility: "Perfect",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    advisoryText: "Enterprise tech looks for premium positioning, strict editorial compliance, and high authority. Your engagement consistency supports premium pricing tiers."
  }
};

const FORECASTING_SERIES = [
  { label: "Today", actual: 42000, projected: 42000, lowerBound: 42000, upperBoundBound: 42000 },
  { label: "Day 5", actual: 44100, projected: 44100, lowerBound: 44100, upperBoundBound: 44100 },
  { label: "Day 10", actual: 46900, projected: 46900, lowerBound: 46900, upperBoundBound: 46900 },
  { label: "Day 15", projected: 49500, lowerBound: 48100, upperBoundBoundBound: 51200 },
  { label: "Day 20", projected: 52000, lowerBound: 49900, upperBoundBoundBound: 54600 },
  { label: "Day 25", projected: 55200, lowerBound: 52400, upperBoundBoundBound: 58500 },
  { label: "Day 30", projected: 58800, lowerBound: 55100, upperBoundBoundBound: 62900 }
];

// --- Main Page Component ---

const EarningsDashboardPage: React.FC = () => {
  // Navigation filters
  const [platform, setPlatform] = useState<EarnPlatform>("youtube");
  const [range, setRange] = useState<EarnRange>("30 Days");

  // Feature 1 interactive state
  const [correlationMetric, setCorrelationMetric] = useState<string>("sponsorship");
  const [anomalyFeed, setAnomalyFeed] = useState<AnomalyAlert[]>(ANOMALY_ALERTS);

  // Feature 2 interactive state
  const [activeBrandTier, setActiveBrandTier] = useState<BrandTier>("series_a");

  // Live ticking state for cash flows
  const [liveEarnings, setLiveEarnings] = useState({
    youtube: 12540.10,
    instagram: 8240.05,
    sponsorships: 27460.10,
  });

  const [isEarningsFlashing, setIsEarningsFlashing] = useState(false);

  // Micro-fluctuations loop for cash flows
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEarnings(prev => {
        const ytInc = Math.random() > 0.3 ? (Math.random() * 0.45 + 0.08) : 0;
        const igInc = Math.random() > 0.4 ? (Math.random() * 0.30 + 0.05) : 0;
        const spInc = Math.random() > 0.5 ? (Math.random() * 0.85 + 0.15) : 0;
        
        if (ytInc > 0 || igInc > 0 || spInc > 0) {
          setIsEarningsFlashing(true);
          const t = setTimeout(() => setIsEarningsFlashing(false), 500);
        }
        
        return {
          youtube: prev.youtube + ytInc,
          instagram: prev.instagram + igInc,
          sponsorships: prev.sponsorships + spInc,
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Simulated auto-deal generator & alerts
  const LIVE_SPONSOR_DEALS = [
    { metric: "Sponsorship Premium", change: "+₹1,200", explanation: "Micro-deal secured from Notion affiliate trigger event.", type: "spike" },
    { metric: "Vercel Partnership", change: "+₹8,500", explanation: "Series-A SaaS startup sponsored story bundle package.", type: "spike" },
    { metric: "Claude API Affiliate", change: "+₹450", explanation: "Conversion spike on step-by-step developer tutorial.", type: "spike" },
    { metric: "Supabase Integration", change: "+₹4,200", explanation: "Indie sponsor conversion trigger on database overview clip.", type: "spike" }
  ];

  useEffect(() => {
    const alertInterval = setInterval(() => {
      const randomDeal = LIVE_SPONSOR_DEALS[Math.floor(Math.random() * LIVE_SPONSOR_DEALS.length)];
      setAnomalyFeed(prev => {
        const filtered = prev.filter(x => x.id < 1000000); // clear past simulator ones to limit size
        return [
          {
            id: Date.now(),
            type: "spike",
            metric: randomDeal.metric,
            change: `${randomDeal.change} Credit`,
            explanation: randomDeal.explanation,
            time: "Just now"
          },
          ...filtered.slice(0, 2)
        ];
      });
    }, 9000); // deal alert every 9s

    return () => clearInterval(alertInterval);
  }, []);

  // Derived sponsorship pricing metrics with active computing fluctuations
  const activePricingConfig = useMemo(() => {
    const base = BRAND_PRICING_CONFIGS[activeBrandTier];
    const offsetPercent = Math.sin(Date.now() / 3000) * 0.005; // ±0.5%
    const priceOffset = (price: number) => Math.round(price * (1 + offsetPercent));
    
    return {
      ...base,
      readinessScore: Math.min(100, Math.max(50, base.readinessScore + (Math.sin(Date.now() / 4000) > 0 ? 1 : 0))),
      reelPricing: priceOffset(base.reelPricing),
      storyPricing: priceOffset(base.storyPricing),
      packagePricing: priceOffset(base.packagePricing)
    };
  }, [activeBrandTier, liveEarnings]);

  const correlationSeries = useMemo(() => {
    return CONTENT_CORRELATION_DATA[correlationMetric];
  }, [correlationMetric]);

  // Forecast data with active confidence envelopes that calculate in real-time
  const forecastingData = useMemo(() => {
    return FORECASTING_SERIES.map((item, idx) => {
      if (item.projected === undefined) return item;
      const offset = Math.sin(Date.now() / 2000 + idx) * 80;
      return {
        ...item,
        projected: Math.round(item.projected + offset),
        lowerBound: item.lowerBound ? Math.round(item.lowerBound + offset * 0.9) : undefined,
        upperBoundBound: item.upperBoundBound ? Math.round(item.upperBoundBound + offset * 1.1) : undefined,
      };
    });
  }, [liveEarnings]);

  const handleDismissAlert = (id: number) => {
    setAnomalyFeed((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F9F9FA] px-6 py-8 text-slate-800 font-sans">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* --- PREMIUM INTEL DASHBOARD HEADER --- */}
        <div className="flex flex-col gap-5 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600">
              <DollarSign className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Monetization & Sponsorship Intelligence</h1>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Business Advisory</span>
                </div>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                AI sponsorship valuation models, purchasing segments, revenue correlation vectors, and smart pricing assistants.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Selector */}
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 text-[11px] font-medium text-slate-600">
              {([
                { id: "instagram", label: "Instagram" },
                { id: "youtube", label: "YouTube" },
                { id: "twitter", label: "Twitter/X" },
              ] as const).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={
                    "px-3.5 py-1.5 rounded-full transition-all duration-200 " +
                    (platform === p.id
                      ? "bg-white text-emerald-600 shadow-sm font-semibold"
                      : "text-slate-600 hover:text-slate-900")
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Time range selector */}
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 text-[11px] font-medium text-slate-600">
              {([
                { id: "7 Days" },
                { id: "30 Days" },
                { id: "90 Days" },
              ] as const).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRange(r.id)}
                  className={
                    "px-3 py-1.5 rounded-full transition-all duration-200 " +
                    (range === r.id
                      ? "bg-white text-emerald-600 shadow-sm font-semibold"
                      : "text-slate-500 hover:text-slate-800")
                  }
                >
                  {r.id}
                </button>
              ))}
            </div>

            {/* Export options */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm active:scale-95 transition"
            >
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* --- DOCK PANEL 1: REVENUE OVERVIEW & ANOMALY DETECTOR --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          {/* Main revenue indicator summary card */}
          <div className="bg-white border border-gray-200/60 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Net Income</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`text-3xl font-extrabold tracking-tight tabular-nums transition-all duration-300 ${
                  isEarningsFlashing ? "text-emerald-600 font-black scale-105" : "text-slate-900"
                }`}>
                  ₹{(liveEarnings.youtube + liveEarnings.instagram + liveEarnings.sponsorships).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+14.2%</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Estimations across last 30 days active period</p>
            </div>

            <div className="space-y-2 mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" />YouTube</span>
                <span className="font-semibold text-slate-700 tabular-nums">
                  ₹{liveEarnings.youtube.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-pink-500" />Instagram</span>
                <span className="font-semibold text-slate-700 tabular-nums">
                  ₹{liveEarnings.instagram.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Sponsorships</span>
                <span className="font-semibold text-slate-700 tabular-nums">
                  ₹{liveEarnings.sponsorships.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Module 1E: Revenue Change & Anomaly Alert Detector */}
          <div className="lg:col-span-3 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <AlertCircle className="h-4 w-4 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">AI Anomaly & Revenue Change Detection</h3>
                  <p className="text-[10px] text-slate-400">Algorithmic scanning for sudden spikes or monetization gaps.</p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
                Active Scan
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {anomalyFeed.map((alert) => (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-3.5 border rounded-xl relative overflow-hidden transition-all duration-300 ${
                      alert.type === "spike"
                        ? "border-emerald-100 bg-emerald-50/20 text-emerald-800 hover:bg-emerald-50/40"
                        : "border-rose-100 bg-rose-50/20 text-rose-800 hover:bg-rose-50/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex rounded-full p-0.5 ${
                          alert.type === "spike" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-500"
                        }`}>
                          {alert.type === "spike" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        </span>
                        <span className="text-xs font-bold">{alert.metric}</span>
                      </div>
                      <button
                        onClick={() => handleDismissAlert(alert.id)}
                        className="text-[10px] text-slate-400 hover:text-slate-600 bg-white border border-slate-100 hover:border-slate-200 rounded px-1.5 py-0.5 shadow-sm active:scale-95 transition"
                      >
                        Dismiss
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold tracking-tight">{alert.change}</span>
                        <span className="text-[9px] text-slate-400">{alert.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                        {alert.explanation}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {anomalyFeed.length === 0 && (
                  <div className="col-span-2 py-8 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/40">
                    <ShieldCheck className="h-6 w-6 text-slate-300 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-600">All Systems Nominal</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">No monetization drops or revenue anomalies detected in your index.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* --- CORE WORKSPACE: BENTO GRID INTERFACES --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* LEFT/CENTER DOUBLE GRID COLUMN (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* FEATURE 1: AI MONETIZATION INSIGHTS ENGINE (INSIGHT FEED) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden relative">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">AI Monetization Insights Feed</h3>
                    <p className="text-[10px] text-slate-400">Actionable recommendations converting raw social analytics into business intelligence.</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-600 uppercase">
                  Advisory Engine
                </span>
              </div>

              {/* Stacked AI Insight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INSIGHTS_FEED.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 border border-slate-100 rounded-xl bg-gradient-to-tr from-slate-50/30 to-white hover:border-slate-200 transition duration-300 relative group overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="rounded bg-slate-900 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                          {insight.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span>Confidence: <strong>{insight.confidence}%</strong></span>
                          <span className={`inline-flex rounded-full p-0.5 ${
                            insight.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                          }`}>
                            {insight.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : insight.trend === "down" ? <ArrowDownRight className="h-3.5 w-3.5" /> : <Globe className="h-3 w-3" />}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {insight.title}
                      </h4>
                      <p className="mt-2 text-[11px] text-slate-600 leading-relaxed font-medium bg-white/70 border border-slate-100/50 rounded-lg p-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                        {insight.explanation}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 uppercase font-bold text-[9px]">Potential Impact</span>
                        <span className="font-extrabold text-emerald-600">{insight.impactValue}</span>
                      </div>
                      <div className="text-[10px] bg-emerald-500/5 border border-emerald-500/10 text-emerald-700 p-2 rounded-lg leading-normal flex items-start gap-1">
                        <Check className="h-3 w-3 shrink-0 mt-0.5" />
                        <span><strong>Rec:</strong> {insight.recommendation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTENT-TO-REVENUE CORRELATION MATRIX (Module 1C) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-blue-600" />
                    <span>Content Format Monetization Correlation</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Click toggles to animate conversion value and profitability indices across formats.
                  </p>
                </div>

                {/* Correlation Metrics Selector */}
                <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-[10px] font-semibold text-slate-600">
                  {([
                    { id: "sponsorship", label: "Sponsorship Attraction" },
                    { id: "affiliate", label: "Affiliate CTR" },
                    { id: "cpm", label: "CPM Efficiency" },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCorrelationMetric(m.id)}
                      className={
                        "px-2.5 py-1 rounded-md transition-all duration-200 " +
                        (correlationMetric === m.id
                          ? "bg-white text-slate-900 shadow-sm font-bold"
                          : "text-slate-500 hover:text-slate-800")
                      }
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Correlation bar displays */}
              <div className="space-y-4">
                {correlationSeries.map((row) => (
                  <div key={row.format} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                      <span>{row.format}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{row.value}%</span>
                        <span className="text-[9px] text-slate-400">Monetization Quotient</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.value}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Explanatory AI Callout */}
              <div className="mt-6 pt-4 border-t border-slate-100 rounded-xl bg-slate-50/60 p-3.5 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[9px] font-bold text-blue-900 uppercase">AI Format Advisory</span>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-medium">
                    {correlationMetric === "sponsorship" && "Sponsors pay a premium for educational content because it maps directly to higher engagement quality and brand trust values."}
                    {correlationMetric === "affiliate" && "Carousels work well for fast summaries, but high-intent educational tutorials attract 4.1x stronger conversion because viewers watch tools in action."}
                    {correlationMetric === "cpm" && "Educational tutorials demonstrate long watch depth, maintaining consistent audience retention metrics which raises CPM pricing on premium ad inventory."}
                  </p>
                </div>
              </div>
            </div>

            {/* REVENUE FORECASTING ACCELERATOR CHART (Module 2G) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span>AI Revenue & Sponsorship Forecasting</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Projections for the next 30 days based on active engagement growth trends (TradingView confidence envelope).
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 9, fontWeight: 500 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 9, fontWeight: 500 }}
                      tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: 12,
                        fontSize: 11
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="upperBoundBound"
                      stroke="none"
                      fill="#38BDF8"
                      fillOpacity={0.05}
                      name="Confidence Ceiling"
                    />
                    <Area
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="none"
                      fill="#38BDF8"
                      fillOpacity={0.05}
                      name="Confidence Floor"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#0F172A"
                      strokeWidth={2.5}
                      dot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#0F172A" }}
                      connectNulls
                      name="Actual Earnings"
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="#38BDF8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fill="url(#forecastGrad)"
                      name="AI Projections"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 leading-normal">
                <p>
                  Current growth projections project a <span className="font-semibold text-emerald-600">38% higher sponsorship revenue</span> next quarter.
                </p>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Trajectory Confirmed
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (1/3 width on desktop) - SPONSOR VALUE, RADIAL SCORES, PRICING ASSISTANT */}
          <div className="space-y-6">
            
            {/* SPONSORSHIP READINESS SCORE & RADIAL METER (Module 2C) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-center relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-left">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">Sponsorship Readiness</h3>
                  <p className="text-[9px] text-slate-400">Advertiser compatibility metrics</p>
                </div>
              </div>

              {/* Radial score ring */}
              <div className="relative h-28 w-28 mx-auto my-4 flex items-center justify-center">
                <svg className="h-full w-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#F1F5F9"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#2563EB"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 46}
                    initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - activePricingConfig.readinessScore / 100) }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {activePricingConfig.readinessScore}
                  </span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Index Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mt-4 pt-4 border-t border-slate-100 text-left">
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">Audience Trust</span>
                  <span className="text-xs font-bold text-slate-800">High (92%)</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">Advert Compatibility</span>
                  <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-bold ${activePricingConfig.badgeColor}`}>
                    {activePricingConfig.compatibility}
                  </span>
                </div>
              </div>
            </div>

            {/* FEATURE 2: SPONSORSHIP INTELLIGENCE ENGINE & PRICING ASSISTANT (Module 2A + 2F) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
              
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-blue-500" />
                  <span>Sponsorship Pricing Assistant</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Select brand funding tiers to recalculate optimal partnership rates dynamically.
                </p>
              </div>

              {/* Interactive Brand Tier Selectors */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-lg bg-slate-100 text-[9px] font-bold text-slate-500 mb-4">
                {(["seed", "series_a", "growth", "enterprise"] as BrandTier[]).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setActiveBrandTier(tier)}
                    className={`py-1.5 rounded transition text-center uppercase tracking-wide ${
                      activeBrandTier === tier
                        ? "bg-white text-slate-900 shadow-sm font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tier.replace("_", " ")}
                  </button>
                ))}
              </div>

              {/* Dynamic estimated values */}
              <div className="space-y-3.5">
                <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Suggested Reel Price</span>
                    <span className="text-base font-extrabold text-slate-900 tracking-tight">
                      ₹{activePricingConfig.reelPricing.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold italic">Per Video</span>
                </div>

                <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Story Campaign Bundle</span>
                    <span className="text-base font-extrabold text-slate-900 tracking-tight">
                      ₹{activePricingConfig.storyPricing.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold italic">Per Story</span>
                </div>

                <div className="p-3 border border-blue-100 rounded-xl bg-blue-50/20 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-blue-800 block">Premium Package Package</span>
                    <span className="text-base font-extrabold text-blue-900 tracking-tight">
                      ₹{activePricingConfig.packagePricing.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-blue-700 font-bold">Bundle Deal</span>
                </div>
              </div>

              {/* Advisory comment */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 text-[10px] text-slate-500 leading-relaxed font-medium">
                <strong>AI Advisory:</strong> {activePricingConfig.advisoryText}
              </div>
            </div>

            {/* AUDIENCE MONETIZATION INTELLIGENCE (Module 1D) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Audience Purchasing Power</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Breakdown of demographic responsiveness and sponsorship compatibility.
                </p>
              </div>

              <div className="space-y-4">
                {AUDIENCE_SEGMENTS.map((row) => (
                  <div key={row.demographic} className="p-3 border border-slate-100 rounded-xl bg-slate-50/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-700">{row.demographic}</span>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                        Compatibility: {row.sponsorCompatibility}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Purchasing Power: <strong className="text-slate-800">{row.purchasingPower}</strong></span>
                      <span>Affiliate CTR: <strong className="text-slate-800">{row.affiliateCTR}</strong></span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.barValue}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BRAND MATCHING INTELLIGENCE (Module 2D) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Target className="h-4 w-4 text-indigo-600" />
                  <span>Ideal Brand Sponsorship Matching</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  AI-identified industries showing highest compatibility scores with your audience.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { category: "Productivity Tools", score: 96, tags: ["Notion", "Linear", "Raycast"], color: "from-blue-500 to-cyan-400" },
                  { category: "Developer SaaS", score: 92, tags: ["Vercel", "Supabase", "GitHub"], color: "from-purple-500 to-indigo-500" },
                  { category: "AI Tools & LLM APIs", score: 88, tags: ["OpenAI", "Gemini", "Claude"], color: "from-emerald-500 to-teal-400" },
                  { category: "FinTech & Payments", score: 70, tags: ["Stripe", "Razorpay"], color: "from-amber-500 to-orange-400" }
                ].map((item) => (
                  <div key={item.category} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.color}`} />
                        <span className="text-[11px] font-bold text-slate-700">{item.category}</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-indigo-600">{item.score}% Match</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[9px] bg-white border border-slate-100 rounded px-1.5 py-0.5 font-bold text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EarningsDashboardPage;
