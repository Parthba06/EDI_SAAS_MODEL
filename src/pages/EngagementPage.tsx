import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import {
  FiChevronDown,
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiClock,
  FiActivity,
  FiAward,
  FiAlertCircle,
  FiCheckCircle,
  FiPlay,
  FiHash,
  FiArrowDown,
  FiCpu,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { BsRobot, BsStars, BsLightningChargeFill } from "react-icons/bs";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type Platform = "instagram" | "youtube" | "twitter";
type Range = "1 Day" | "7 Days" | "30 Days" | "90 Days" | "1 Year";
type Interval = "daily" | "weekly" | "monthly";

interface TimePoint { label: string; value: number; }
interface MetricBreakdownPoint { period: string; likes: number; comments: number; shares: number; saves: number; }

interface HealthScores {
  total: number; likes: number; comments: number; saves: number; consistency: number;
  label: "Weak" | "Growing" | "Strong" | "Elite";
  aiNote: string;
}

interface PostingWindow {
  peak: string; bestSlot: string; weakSlot: string; missed: number; aiNote: string;
}

interface ContentTypeRow {
  type: string; engagement: string; saves: string; score: number;
}

interface FunnelStep { label: string; value: number; }

interface GoalData {
  target: number; current: number; dailyTarget: number; projected: number; aiNote: string;
}

// ─────────────────────────────────────────────
// EXISTING DATA (unchanged)
// ─────────────────────────────────────────────
const baseSeries: TimePoint[] = [
  { label: "Mon", value: 120 }, { label: "Tue", value: 150 },
  { label: "Wed", value: 180 }, { label: "Thu", value: 170 },
  { label: "Fri", value: 210 }, { label: "Sat", value: 260 },
  { label: "Sun", value: 240 },
];
const scaleSeries = (m: number): TimePoint[] =>
  baseSeries.map((p, idx) => ({ label: p.label, value: Math.round(p.value * m * (0.8 + idx * 0.05)) }));

const lineData: Record<Platform, Record<Interval, TimePoint[]>> = {
  instagram: { daily: baseSeries, weekly: scaleSeries(1.2), monthly: scaleSeries(1.6) },
  youtube:   { daily: scaleSeries(0.9), weekly: scaleSeries(1.1), monthly: scaleSeries(1.4) },
  twitter:   { daily: scaleSeries(0.7), weekly: scaleSeries(0.9), monthly: scaleSeries(1.1) },
};

const breakdownData: Record<Platform, MetricBreakdownPoint[]> = {
  instagram: [
    { period: "Jan", likes: 4200, comments: 600, shares: 280, saves: 190 },
    { period: "Feb", likes: 4600, comments: 720, shares: 310, saves: 220 },
    { period: "Mar", likes: 5100, comments: 810, shares: 350, saves: 260 },
    { period: "Apr", likes: 5300, comments: 860, shares: 370, saves: 290 },
  ],
  youtube: [
    { period: "Jan", likes: 3200, comments: 480, shares: 210, saves: 130 },
    { period: "Feb", likes: 3400, comments: 520, shares: 230, saves: 150 },
    { period: "Mar", likes: 3700, comments: 590, shares: 250, saves: 170 },
    { period: "Apr", likes: 3900, comments: 630, shares: 270, saves: 190 },
  ],
  twitter: [
    { period: "Jan", likes: 2100, comments: 380, shares: 190, saves: 90 },
    { period: "Feb", likes: 2300, comments: 410, shares: 200, saves: 100 },
    { period: "Mar", likes: 2500, comments: 440, shares: 210, saves: 110 },
    { period: "Apr", likes: 2700, comments: 470, shares: 220, saves: 120 },
  ],
};

const topPosts = [
  { id: 1, platform: "Instagram", title: "Behind the scenes of my latest reel", thumbColor: "bg-gradient-to-tr from-pink-500 to-yellow-400", score: 94, likes: 12450, comments: 742 },
  { id: 2, platform: "YouTube", title: "How I script & shoot in one day", thumbColor: "bg-red-500", score: 91, likes: 18420, comments: 988 },
  { id: 3, platform: "Twitter", title: "Thread: My 10 content workflows", thumbColor: "bg-slate-800", score: 88, likes: 6420, comments: 380 },
  { id: 4, platform: "Instagram", title: "Day in the life of a creator", thumbColor: "bg-indigo-500", score: 86, likes: 10230, comments: 512 },
];

const metricsConfig = [
  { key: "likes", label: "Likes", color: "#2563EB" },
  { key: "comments", label: "Comments", color: "#10B981" },
  { key: "shares", label: "Shares", color: "#F59E0B" },
  { key: "saves", label: "Saves", color: "#6366F1" },
  { key: "views", label: "Views", color: "#EC4899" },
] as const;

// ─────────────────────────────────────────────
// INTELLIGENCE DATA LAYER
// ─────────────────────────────────────────────

// Health Scores
const healthScores: Record<Platform, Record<Interval, HealthScores>> = {
  instagram: {
    daily:   { total: 87, likes: 92, comments: 84, saves: 95, consistency: 78, label: "Strong", aiNote: "High save rate but posting consistency reduced total score." },
    weekly:  { total: 79, likes: 85, comments: 76, saves: 88, consistency: 67, label: "Strong", aiNote: "Engagement peaks on weekends. Mid-week content needs improvement." },
    monthly: { total: 72, likes: 78, comments: 70, saves: 82, consistency: 58, label: "Strong", aiNote: "Monthly consistency is your weakest pillar. Aim for 5+ posts/week." },
  },
  youtube: {
    daily:   { total: 64, likes: 71, comments: 68, saves: 60, consistency: 57, label: "Growing", aiNote: "Comment engagement is strong but save rate is below average for YouTube." },
    weekly:  { total: 70, likes: 76, comments: 73, saves: 65, consistency: 66, label: "Growing", aiNote: "Weekly output is improving. Consistent upload schedule boosts algorithm reach." },
    monthly: { total: 75, likes: 80, comments: 77, saves: 72, consistency: 71, label: "Strong", aiNote: "Strong monthly performance. Shorts are pulling more saves than long-form." },
  },
  twitter: {
    daily:   { total: 55, likes: 60, comments: 72, saves: 38, consistency: 50, label: "Growing", aiNote: "Comment-heavy content works well. Save rate is low — add value-packed threads." },
    weekly:  { total: 61, likes: 65, comments: 78, saves: 45, consistency: 56, label: "Growing", aiNote: "Threads generate high comment engagement but low saves. Add resource links." },
    monthly: { total: 48, likes: 52, comments: 65, saves: 33, consistency: 42, label: "Growing", aiNote: "Monthly volume is inconsistent. Viral threads mask the underlying posting gaps." },
  },
};

// Posting Windows
const postingWindows: Record<Platform, Record<Interval, PostingWindow>> = {
  instagram: {
    daily:   { peak: "7 PM – 9 PM", bestSlot: "Saturday 8 PM", weakSlot: "Thursday Morning", missed: 3, aiNote: "Engagement increases 27% between 7–9 PM on weekdays." },
    weekly:  { peak: "6 PM – 10 PM", bestSlot: "Friday 7 PM", weakSlot: "Wednesday 11 AM", missed: 2, aiNote: "Friday evening posts gather 32% more saves than weekday mornings." },
    monthly: { peak: "Weekends", bestSlot: "Sunday 8 PM", weakSlot: "Monday Morning", missed: 5, aiNote: "Weekend posts account for 48% of your monthly engagement despite 30% of total posts." },
  },
  youtube: {
    daily:   { peak: "12 PM – 3 PM", bestSlot: "Tuesday 1 PM", weakSlot: "Sunday Morning", missed: 2, aiNote: "Lunch-hour uploads see 19% more initial views within the first 3 hours." },
    weekly:  { peak: "Tue & Thu", bestSlot: "Thursday 2 PM", weakSlot: "Saturday AM", missed: 1, aiNote: "Posting Tue & Thu keeps your weekly watch-time rank stable in recommendations." },
    monthly: { peak: "Mid-month", bestSlot: "15th–18th", weakSlot: "End of month", missed: 4, aiNote: "Mid-month uploads get 23% more suggested video impressions algorithmically." },
  },
  twitter: {
    daily:   { peak: "9 AM – 11 AM", bestSlot: "Monday 9 AM", weakSlot: "Friday Afternoon", missed: 4, aiNote: "Morning tweets are seen 41% more than afternoon posts in the tech niche." },
    weekly:  { peak: "Weekday Mornings", bestSlot: "Tuesday 9 AM", weakSlot: "Saturday", missed: 3, aiNote: "Tuesday morning threads generate 2x more replies than weekend content." },
    monthly: { peak: "Start of month", bestSlot: "1st–3rd", weakSlot: "Last week", missed: 6, aiNote: "Month-start content rides algorithm momentum from high-frequency users." },
  },
};

// Heatmap data (7 days × 24 hours) — engagement intensity 0–4
const generateHeatmap = (platform: Platform, interval: Interval): number[][] => {
  const seed: Record<Platform, number> = { instagram: 1.2, youtube: 0.9, twitter: 0.8 };
  const mult: Record<Interval, number> = { daily: 1, weekly: 1.15, monthly: 1.3 };
  const s = seed[platform] * mult[interval];
  return Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => {
      const isPeak = (day >= 4 && hour >= 18 && hour <= 22);
      const isMorning = (hour >= 8 && hour <= 10);
      const base = isPeak ? 3.5 : isMorning ? 2.5 : hour < 6 ? 0.3 : 1.5;
      return Math.min(4, Math.round(base * s * (0.7 + Math.random() * 0.6)));
    })
  );
};

// Content types per platform
const contentBreakdown: Record<Platform, ContentTypeRow[]> = {
  instagram: [
    { type: "Reels", engagement: "High", saves: "Very High", score: 94 },
    { type: "Carousel", engagement: "Very High", saves: "High", score: 91 },
    { type: "Stories", engagement: "Medium", saves: "Low", score: 68 },
    { type: "Post", engagement: "Medium", saves: "Medium", score: 72 },
  ],
  youtube: [
    { type: "Shorts", engagement: "Very High", saves: "High", score: 92 },
    { type: "Long-form Video", engagement: "High", saves: "Very High", score: 88 },
    { type: "Lives", engagement: "Very High", saves: "Low", score: 76 },
  ],
  twitter: [
    { type: "Threads", engagement: "Very High", saves: "Medium", score: 89 },
    { type: "Tweets", engagement: "Medium", saves: "Low", score: 64 },
    { type: "Polls", engagement: "High", saves: "Low", score: 70 },
  ],
};

const contentAiNote: Record<Platform, string> = {
  instagram: "Reels generate 2.1× more saves and 34% higher reach than static posts.",
  youtube: "Shorts drive 3× more new subscribers per view than long-form videos.",
  twitter: "Threads receive 2.8× more replies and profile clicks than standalone tweets.",
};

// Funnel data
const funnelData: Record<Platform, Record<Interval, FunnelStep[]>> = {
  instagram: {
    daily:   [{ label: "Views", value: 120000 }, { label: "Likes", value: 24000 }, { label: "Comments", value: 4200 }, { label: "Shares", value: 2100 }, { label: "Saves", value: 900 }],
    weekly:  [{ label: "Views", value: 840000 }, { label: "Likes", value: 168000 }, { label: "Comments", value: 29400 }, { label: "Shares", value: 14700 }, { label: "Saves", value: 6300 }],
    monthly: [{ label: "Views", value: 3600000 }, { label: "Likes", value: 720000 }, { label: "Comments", value: 126000 }, { label: "Shares", value: 63000 }, { label: "Saves", value: 27000 }],
  },
  youtube: {
    daily:   [{ label: "Views", value: 85000 }, { label: "Likes", value: 12750 }, { label: "Comments", value: 3400 }, { label: "Shares", value: 1200 }, { label: "Saves", value: 680 }],
    weekly:  [{ label: "Views", value: 595000 }, { label: "Likes", value: 89250 }, { label: "Comments", value: 23800 }, { label: "Shares", value: 8400 }, { label: "Saves", value: 4760 }],
    monthly: [{ label: "Views", value: 2550000 }, { label: "Likes", value: 382500 }, { label: "Comments", value: 102000 }, { label: "Shares", value: 36000 }, { label: "Saves", value: 20400 }],
  },
  twitter: {
    daily:   [{ label: "Impressions", value: 65000 }, { label: "Likes", value: 8450 }, { label: "Replies", value: 2200 }, { label: "Retweets", value: 1100 }, { label: "Bookmarks", value: 430 }],
    weekly:  [{ label: "Impressions", value: 455000 }, { label: "Likes", value: 59150 }, { label: "Replies", value: 15400 }, { label: "Retweets", value: 7700 }, { label: "Bookmarks", value: 3010 }],
    monthly: [{ label: "Impressions", value: 1950000 }, { label: "Likes", value: 253500 }, { label: "Replies", value: 66000 }, { label: "Retweets", value: 33000 }, { label: "Bookmarks", value: 12900 }],
  },
};

const funnelAiNote: Record<Platform, string> = {
  instagram: "Strong view-to-like conversion (20%). Save conversion is your biggest drop — only 0.75% of viewers save.",
  youtube: "Like-to-comment ratio is excellent (26.7%). Shares are low — add explicit CTA to share in video descriptions.",
  twitter: "Retweet rate is healthy at 1.7%. Bookmark rate needs improvement — pin valuable threads for discoverability.",
};

// Goal data
const goalData: Record<Platform, Record<Interval, GoalData>> = {
  instagram: {
    daily:   { target: 5000, current: 3200, dailyTarget: 1800, projected: 6720, aiNote: "On current pace, you'll exceed daily target by 34%. Consider posting a Story today." },
    weekly:  { target: 35000, current: 21500, dailyTarget: 2214, projected: 37800, aiNote: "On track to exceed weekly target by 8%. Post 2 Reels this week to secure it." },
    monthly: { target: 150000, current: 89000, dailyTarget: 6333, projected: 142400, aiNote: "Slightly below monthly pace. Need 4 more Reels to hit the 150K target by month-end." },
  },
  youtube: {
    daily:   { target: 3500, current: 2100, dailyTarget: 1400, projected: 4410, aiNote: "Excellent pace — projected to hit 126% of today's engagement target." },
    weekly:  { target: 24500, current: 14000, dailyTarget: 1750, projected: 24500, aiNote: "Exactly on track for weekly goal. Publish a Short today to add a buffer." },
    monthly: { target: 105000, current: 58000, dailyTarget: 3824, projected: 92800, aiNote: "11.6% behind monthly target. Releasing 2 more Shorts this month could close the gap." },
  },
  twitter: {
    daily:   { target: 2000, current: 1150, dailyTarget: 850, projected: 2415, aiNote: "Morning thread drove 58% of today's engagement. Publish another afternoon thread." },
    weekly:  { target: 14000, current: 7800, dailyTarget: 1000, projected: 13650, aiNote: "2.5% short of weekly target. One viral thread this weekend could push you over." },
    monthly: { target: 60000, current: 29000, dailyTarget: 2100, projected: 46400, aiNote: "Below monthly pace by 22%. Post daily threads and engage replies to accelerate growth." },
  },
};

// Prediction formula
const computePrediction = (
  platform: Platform, contentType: string, hour: number, hashtags: number
): { reach: number; engagement: number; saves: number } => {
  const baseScores: Record<Platform, { reach: number; eng: number; saves: number }> = {
    instagram: { reach: 22, eng: 18, saves: 15 },
    youtube:   { reach: 18, eng: 14, saves: 12 },
    twitter:   { reach: 15, eng: 11, saves: 8 },
  };
  const b = baseScores[platform];
  const timeMult = (hour >= 18 && hour <= 22) ? 1.27 : (hour >= 8 && hour <= 11) ? 1.12 : 0.85;
  const contentBonus: Record<string, number> = {
    Reels: 1.3, Shorts: 1.25, Threads: 1.2, Carousel: 1.15,
    "Long-form Video": 1.1, Tweets: 0.9, Stories: 0.85, Lives: 1.0,
  };
  const cb = contentBonus[contentType] ?? 1.0;
  const hashBonus = Math.min(1.2, 1 + hashtags * 0.015);
  return {
    reach: Math.round(b.reach * timeMult * cb * hashBonus),
    engagement: Math.round(b.eng * timeMult * cb),
    saves: Math.round(b.saves * timeMult * cb * hashBonus),
  };
};

// Content type options per platform
const contentOptions: Record<Platform, string[]> = {
  instagram: ["Reels", "Carousel", "Post", "Stories"],
  youtube: ["Shorts", "Long-form Video", "Lives"],
  twitter: ["Threads", "Tweets", "Polls"],
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const CardWrap: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${className}`}>
    {children}
  </div>
);

const SectionLabel: React.FC<{ icon: React.ReactNode; title: string; sub: string }> = ({ icon, title, sub }) => (
  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm text-white text-sm">
      {icon}
    </div>
    <div>
      <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      <p className="text-[11px] text-slate-500">{sub}</p>
    </div>
  </div>
);

const ScorePill: React.FC<{ label: "Weak" | "Growing" | "Strong" | "Elite" }> = ({ label }) => {
  const styles: Record<string, string> = {
    Weak: "bg-red-50 text-red-500",
    Growing: "bg-amber-50 text-amber-600",
    Strong: "bg-emerald-50 text-emerald-700",
    Elite: "bg-blue-50 text-blue-600",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${styles[label]}`}>{label}</span>
  );
};

const MiniBar: React.FC<{ value: number; color: string }> = ({ value, color }) => (
  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  </div>
);

const heatColor = (v: number): string => {
  if (v === 0) return "#f1f5f9";
  if (v === 1) return "#dbeafe";
  if (v === 2) return "#93c5fd";
  if (v === 3) return "#3b82f6";
  return "#1d4ed8";
};

const scoreColor = (score: number): string => {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#3b82f6";
  if (score >= 55) return "#f59e0b";
  return "#ef4444";
};

const formatBig = (v: number): string => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return String(v);
};

const engagementLabel = (s: string): string => {
  const map: Record<string, string> = {
    "Very High": "text-emerald-600 bg-emerald-50",
    "High": "text-blue-600 bg-blue-50",
    "Medium": "text-amber-600 bg-amber-50",
    "Low": "text-slate-500 bg-slate-100",
  };
  return map[s] ?? "text-slate-500 bg-slate-100";
};

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
const EngagementPage: React.FC = () => {
  // ── existing state ──────────────────────────
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [range, setRange] = useState<Range>("30 Days");
  const [interval, setInterval] = useState<Interval>("daily");

  // ── new state ───────────────────────────────
  const [predicting, setPredicting] = useState(false);
  const [predDone, setPredDone] = useState(false);
  const [predContent, setPredContent] = useState("Reels");
  const [predHour, setPredHour] = useState(20); // 8 PM
  const [predHashtags, setPredHashtags] = useState(10);
  const [predResult, setPredResult] = useState<{ reach: number; engagement: number; saves: number } | null>(null);

  // ── existing computed ────────────────────────
  const mainSeries = useMemo(() => lineData[platform][interval], [platform, interval]);
  const breakdown = useMemo(() => breakdownData[platform], [platform]);

  // ── intelligence computed ────────────────────
  const health = useMemo(() => healthScores[platform][interval], [platform, interval]);
  const window_ = useMemo(() => postingWindows[platform][interval], [platform, interval]);
  const heatmap = useMemo(() => generateHeatmap(platform, interval), [platform, interval]);
  const content = useMemo(() => contentBreakdown[platform], [platform]);
  const funnel = useMemo(() => funnelData[platform][interval], [platform, interval]);
  const goal = useMemo(() => goalData[platform][interval], [platform, interval]);

  const funnelConversions = useMemo(() => {
    return funnel.slice(1).map((step, i) => ({
      from: funnel[i].label,
      to: step.label,
      pct: ((step.value / funnel[i].value) * 100).toFixed(1),
    }));
  }, [funnel]);

  // dynamic content options reset when platform changes
  const availableContent = useMemo(() => contentOptions[platform], [platform]);

  // AI insights — dynamically derived
  const aiInsights = useMemo(() => {
    const topContent = content[0];
    const peakDay = window_.bestSlot;
    const goalStatus = goal.projected >= goal.target ? "on track" : "behind";
    const heatPeak = "Weekend evenings";
    return [
      {
        icon: <FiTrendingUp />,
        color: "text-blue-500",
        bg: "bg-blue-50 border-blue-100",
        text: `${topContent.type} are your highest-performing content type on ${platform} with an engagement score of ${topContent.score}/100.`,
        tag: "Content",
      },
      {
        icon: <FiClock />,
        color: "text-purple-500",
        bg: "bg-purple-50 border-purple-100",
        text: `${peakDay} is your peak posting slot. Missing this window costs you an estimated ${window_.missed * 8}% weekly reach.`,
        tag: "Timing",
      },
      {
        icon: <FiActivity />,
        color: "text-emerald-500",
        bg: "bg-emerald-50 border-emerald-100",
        text: `${heatPeak} show the highest audience activity. Scheduling posts at ${window_.peak} maximises first-hour engagement velocity.`,
        tag: "Audience",
      },
      {
        icon: <FiTarget />,
        color: "text-amber-500",
        bg: "bg-amber-50 border-amber-100",
        text: `You are ${goalStatus} on your ${interval} goal. Projected to reach ${formatBig(goal.projected)} against a target of ${formatBig(goal.target)}.`,
        tag: "Goals",
      },
      {
        icon: <BsStars />,
        color: "text-indigo-500",
        bg: "bg-indigo-50 border-indigo-100",
        text: `Engagement health is at ${health.total}/100 (${health.label}). ${health.aiNote}`,
        tag: "Health",
      },
    ];
  }, [platform, interval, content, window_, goal, health]);

  // ── existing handlers ────────────────────────
  const handleRangeClick = () => {
    const options: Range[] = ["1 Day", "7 Days", "30 Days", "90 Days", "1 Year"];
    const current = options.indexOf(range);
    const next = current === -1 ? 0 : (current + 1) % options.length;
    setRange(options[next]);
  };

  const runPrediction = () => {
    setPredDone(false);
    setPredResult(null);
    setPredicting(true);
    setTimeout(() => {
      setPredicting(false);
      setPredResult(computePrediction(platform, predContent, predHour, predHashtags));
      setPredDone(true);
    }, 1800);
  };

  // when platform changes, reset pred content to first available
  React.useEffect(() => {
    setPredContent(contentOptions[platform][0]);
    setPredDone(false);
    setPredResult(null);
  }, [platform]);

  // days row
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen bg-[#f7f9fc] px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* ═══════════════════════════════════════
            EXISTING: Header
        ═══════════════════════════════════════ */}
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Engagement Intelligence Center</h1>
            <p className="mt-1 text-sm text-slate-500">Deep insights into post performance across all platforms.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleRangeClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#e8f4ff] px-3 py-1.5 text-xs font-medium text-slate-700">
              <span>{range}</span><FiChevronDown className="text-[10px]" />
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#008CFF] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#0077E6] transition shadow-sm">
              <span>Export CSV</span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#008CFF] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#0077E6] transition shadow-sm">
              <span>Export PNG</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            EXISTING: Tabs + Interval filters
        ═══════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f9] px-2 py-1">
            {([{ id: "instagram", label: "Instagram" }, { id: "youtube", label: "YouTube" }, { id: "twitter", label: "Twitter" }] as const).map((p) => (
              <button key={p.id} type="button" onClick={() => setPlatform(p.id)}
                className={"px-3 py-1.5 rounded-full text-xs font-medium transition-colors " + (platform === p.id ? "bg-white text-[#008cff] shadow-sm" : "text-slate-600 hover:text-slate-900")}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f9] px-2 py-1 text-xs font-medium text-slate-600">
            {([{ id: "daily", label: "Daily" }, { id: "weekly", label: "Weekly" }, { id: "monthly", label: "Monthly" }] as const).map((f) => (
              <button key={f.id} type="button" onClick={() => setInterval(f.id)}
                className={"px-3 py-1 rounded-full " + (interval === f.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900")}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            EXISTING: Main line chart
        ═══════════════════════════════════════ */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Engagement over time</h2>
              <p className="mt-1 text-xs text-slate-500">Track total interactions across likes, comments, shares and saves.</p>
            </div>
            <div className="text-xs text-slate-500">Platform: <span className="font-semibold text-slate-900 capitalize">{platform}</span></div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mainSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="engGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#0F172A", fontWeight: 600 }} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.4}
                  dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#2563EB" }} activeDot={{ r: 5 }} fill="url(#engGradient)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            EXISTING: Metric cards
        ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metricsConfig.map((metric) => (
            <div key={metric.key} className="flex flex-col rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{metric.key === "views" ? "120.4K" : "24.5K"}</p>
                </div>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: metric.key === "shares" ? "#FEF3C7" : "#ECFDF3", color: metric.key === "shares" ? "#C2410C" : "#15803D" }}>
                  +12.4%
                </span>
              </div>
              <div className="mt-3 h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mainSeries}>
                    <XAxis dataKey="label" hide /><YAxis hide />
                    <Tooltip contentStyle={{ display: "none" }} />
                    <Line type="monotone" dataKey="value" stroke={metric.color} strokeWidth={1.6} dot={false} isAnimationActive />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            EXISTING: Breakdown chart + Top posts
        ═══════════════════════════════════════ */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Engagement breakdown</h2>
                <p className="mt-1 text-xs text-slate-500">Distribution of likes, comments, shares and saves by month.</p>
              </div>
              <div className="text-xs text-slate-500">Last 4 months</div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown} stackOffset="none" margin={{ top: 16, right: 16, left: 0, bottom: 12 }} barCategoryGap="20%" barGap={2}>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, boxShadow: "0 8px 20px rgba(15,23,42,0.08)", padding: 12, fontSize: 12 }} labelStyle={{ color: "#0F172A", fontWeight: 600, marginBottom: 4 }} />
                  <Bar dataKey="likes" stackId="a" fill="#3B82F6" radius={[6, 6, 0, 0]} isAnimationActive />
                  <Bar dataKey="comments" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} isAnimationActive />
                  <Bar dataKey="shares" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} isAnimationActive />
                  <Bar dataKey="saves" stackId="a" fill="#EC4899" radius={[0, 0, 6, 6]} isAnimationActive />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-2 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Top performing posts</h2>
                <p className="mt-1 text-xs text-slate-500">Posts with the highest engagement score in the selected range.</p>
              </div>
              <div className="text-xs text-slate-500">Scroll to explore</div>
            </div>
            <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 no-scrollbar">
              {topPosts.map((post) => (
                <div key={post.id} className="min-w-[240px] flex-shrink-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={`h-14 w-14 rounded-xl ${post.thumbColor}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-semibold text-slate-900">{post.title}</p>
                          <p className="mt-1 text-sm text-slate-500">{post.platform}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[13px] text-slate-700">
                        <div><p>Engagement score</p><p className="mt-0.5 font-medium text-slate-700">{post.score}/100</p></div>
                        <div className="text-right"><p>Likes · Comments</p><p className="mt-0.5 font-medium text-slate-700">{post.likes.toLocaleString()} · {post.comments.toLocaleString()}</p></div>
                      </div>
                    </div>
                    <button type="button" className="mt-4 inline-flex items-center justify-center rounded-full bg-[#008CFF] px-5 py-2.5 text-[11px] font-medium text-white hover:bg-[#0077E6] transition shadow-sm">
                      View post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            INTELLIGENCE DIVIDER
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 border-t border-slate-200" />
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
            <BsLightningChargeFill className="text-blue-500" />
            ENGAGEMENT INTELLIGENCE CENTER
          </div>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* ═══════════════════════════════════════
            NEW SECTION 1: Engagement Health Score
        ═══════════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiAward />} title="Engagement Health Score" sub="Composite score calculated from your account metrics and posting behaviour" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Score ring */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-8">
              <div className="relative mb-4">
                <svg width={120} height={120} className="-rotate-90">
                  <circle cx={60} cy={60} r={50} fill="none" stroke="#f1f5f9" strokeWidth={8} />
                  <motion.circle cx={60} cy={60} r={50} fill="none" stroke={scoreColor(health.total)}
                    strokeWidth={8} strokeDasharray={314} strokeLinecap="round"
                    initial={{ strokeDashoffset: 314 }}
                    animate={{ strokeDashoffset: 314 - (health.total / 100) * 314 }}
                    transition={{ duration: 1.2, ease: "easeOut" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">{health.total}</span>
                  <span className="text-[10px] text-slate-400 font-medium">/100</span>
                </div>
              </div>
              <ScorePill label={health.label} />
              <p className="mt-3 text-center text-xs text-slate-500 max-w-[200px] leading-relaxed">
                {health.aiNote}
              </p>
            </div>

            {/* Sub-scores */}
            <div className="space-y-4">
              {[
                { label: "Likes Performance", value: health.likes, color: "#3b82f6" },
                { label: "Comments Engagement", value: health.comments, color: "#10b981" },
                { label: "Save Efficiency", value: health.saves, color: "#6366f1" },
                { label: "Posting Consistency", value: health.consistency, color: "#f59e0b" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-600">{m.label}</span>
                    <span className="text-xs font-bold text-slate-800">{m.value}</span>
                  </div>
                  <MiniBar value={m.value} color={m.color} />
                </div>
              ))}
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════════
            NEW SECTION 2 + 3: Posting Window + Heatmap (row)
        ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Posting Window */}
          <CardWrap>
            <SectionLabel icon={<FiClock />} title="Best Posting Window" sub="Optimal posting times derived from your historical performance" />

            <div className="space-y-3">
              {[
                { label: "Peak Audience Window", value: window_.peak, icon: <FiSun size={13} className="text-amber-500" />, bg: "bg-amber-50 border-amber-100" },
                { label: "Highest Engagement Slot", value: window_.bestSlot, icon: <BsLightningChargeFill size={12} className="text-blue-500" />, bg: "bg-blue-50 border-blue-100" },
                { label: "Weakest Time Slot", value: window_.weakSlot, icon: <FiMoon size={13} className="text-slate-400" />, bg: "bg-slate-50 border-slate-200" },
                { label: "Missed Opportunities", value: `${window_.missed} slots this ${interval}`, icon: <FiAlertCircle size={13} className="text-rose-400" />, bg: "bg-rose-50 border-rose-100" },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between rounded-xl border p-3.5 ${item.bg}`}>
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-xs font-medium text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3.5 flex items-start gap-2.5">
              <BsRobot className="text-blue-500 mt-0.5 shrink-0 text-sm" />
              <p className="text-[11px] text-blue-800 leading-relaxed">{window_.aiNote}</p>
            </div>
          </CardWrap>

          {/* Heatmap */}
          <CardWrap>
            <SectionLabel icon={<FiActivity />} title="Audience Activity Heatmap" sub="Engagement intensity by day × hour — darker = higher activity" />

            <div className="overflow-x-auto">
              <div className="min-w-[460px]">
                {/* Hour labels */}
                <div className="flex mb-1 pl-8">
                  {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
                    <div key={h} className="flex-1 text-center text-[9px] text-slate-400 font-medium">
                      {h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}
                    </div>
                  ))}
                </div>

                {DAYS.map((day, di) => (
                  <div key={day} className="flex items-center gap-1 mb-0.5">
                    <span className="w-7 text-[10px] text-slate-400 font-medium shrink-0">{day}</span>
                    <div className="flex flex-1 gap-[2px]">
                      {heatmap[di].map((val, hi) => (
                        <div key={hi} title={`${day} ${hi}:00 — intensity ${val}`}
                          className="flex-1 rounded-[2px]"
                          style={{ height: 18, backgroundColor: heatColor(val) }} />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="mt-3 flex items-center gap-2 justify-end">
                  <span className="text-[9px] text-slate-400">Low</span>
                  {[0, 1, 2, 3, 4].map((v) => (
                    <div key={v} className="h-3 w-4 rounded-sm" style={{ backgroundColor: heatColor(v) }} />
                  ))}
                  <span className="text-[9px] text-slate-400">High</span>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3 flex items-start gap-2.5">
              <BsStars className="text-emerald-500 mt-0.5 shrink-0 text-sm" />
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Weekend evening activity is 34% stronger than weekday mornings on{" "}
                <span className="font-semibold capitalize">{platform}</span>. Prioritise{" "}
                {window_.peak} posting windows.
              </p>
            </div>
          </CardWrap>
        </div>

        {/* ═══════════════════════════════════════
            NEW SECTION 4: Content Performance Breakdown
        ═══════════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiPlay />} title="Content Performance Breakdown" sub={`Best-performing content formats on ${platform} · ${interval} view`} />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Content Type</th>
                  <th className="pb-3 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Engagement</th>
                  <th className="pb-3 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Saves</th>
                  <th className="pb-3 text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Score</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {content.map((row, i) => (
                    <motion.tr key={`${platform}-${row.type}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-1.5 py-0.5 rounded-full">Top</span>}
                          <span className="font-medium text-slate-800">{row.type}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${engagementLabel(row.engagement)}`}>
                          {row.engagement}
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${engagementLabel(row.saves)}`}>
                          {row.saves}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16">
                            <MiniBar value={row.score} color={scoreColor(row.score)} />
                          </div>
                          <span className="text-xs font-bold text-slate-800 w-6 text-right">{row.score}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl bg-purple-50 border border-purple-100 p-3.5 flex items-start gap-2.5">
            <BsRobot className="text-purple-500 mt-0.5 shrink-0 text-sm" />
            <p className="text-[11px] text-purple-800 leading-relaxed">{contentAiNote[platform]}</p>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════════
            NEW SECTION 5: Engagement Funnel
        ═══════════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiArrowDown />} title="Engagement Funnel" sub={`Conversion rates through each interaction stage · ${interval} · ${platform}`} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Funnel visualization */}
            <div className="flex flex-col items-center gap-1">
              {funnel.map((step, i) => {
                const maxW = 100;
                const w = maxW - i * 16;
                return (
                  <React.Fragment key={step.label}>
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.5 }}
                      className="relative flex items-center justify-between rounded-xl px-5 py-3"
                      style={{
                        width: `${w}%`,
                        backgroundColor: `hsl(${220 - i * 20}, ${85 - i * 8}%, ${58 + i * 6}%)`,
                      }}>
                      <span className="text-[11px] font-semibold text-white">{step.label}</span>
                      <span className="text-xs font-bold text-white">{formatBig(step.value)}</span>
                    </motion.div>
                    {i < funnel.length - 1 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <FiArrowDown size={10} />
                        <span className="font-semibold">{funnelConversions[i]?.pct}%</span>
                        <span>conversion</span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Conversion details */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Conversion Rates</p>
              {funnelConversions.map((c, i) => (
                <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-slate-500">{c.from} → {c.to}</span>
                    <span className="text-xs font-bold text-slate-800">{c.pct}%</span>
                  </div>
                  <MiniBar value={parseFloat(c.pct)} color={parseFloat(c.pct) > 15 ? "#10b981" : parseFloat(c.pct) > 5 ? "#3b82f6" : "#f59e0b"} />
                </div>
              ))}

              <div className="mt-4 rounded-xl bg-indigo-50 border border-indigo-100 p-3.5 flex items-start gap-2.5">
                <BsRobot className="text-indigo-500 mt-0.5 shrink-0 text-sm" />
                <p className="text-[11px] text-indigo-800 leading-relaxed">{funnelAiNote[platform]}</p>
              </div>
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════════
            NEW SECTION 6: Prediction Engine
        ═══════════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiCpu />} title="Engagement Prediction Engine" sub="Enter your content details to get an AI-powered performance forecast" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Content Type</label>
                <div className="flex flex-wrap gap-2">
                  {availableContent.map((ct) => (
                    <button key={ct} onClick={() => { setPredContent(ct); setPredDone(false); setPredResult(null); }}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${predContent === ct ? "bg-blue-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {ct}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Posting Time — {predHour}:00 ({predHour < 12 ? `${predHour}AM` : predHour === 12 ? "12PM" : `${predHour - 12}PM`})
                </label>
                <input type="range" min={0} max={23} value={predHour} onChange={(e) => { setPredHour(+e.target.value); setPredDone(false); setPredResult(null); }}
                  className="w-full accent-blue-500" />
                <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                  <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>11 PM</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Hashtag Count — {predHashtags}
                </label>
                <input type="range" min={0} max={30} value={predHashtags} onChange={(e) => { setPredHashtags(+e.target.value); setPredDone(false); setPredResult(null); }}
                  className="w-full accent-blue-500" />
                <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                  <span>0</span><span>10</span><span>20</span><span>30</span>
                </div>
              </div>

              <button onClick={runPrediction} disabled={predicting}
                className={`w-full rounded-xl py-3 text-xs font-bold transition-all ${predicting ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200"}`}>
                {predicting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div className="h-3 w-3 rounded-full border-2 border-slate-300 border-t-slate-500"
                      animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                    Calculating prediction...
                  </span>
                ) : "⚡ Predict Performance"}
              </button>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {predicting && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="rounded-2xl border border-blue-100 bg-blue-50/60 p-8 flex flex-col items-center gap-4">
                    <motion.div className="h-12 w-12 rounded-full border-[3px] border-blue-200 border-t-blue-500"
                      animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-800">AI is analysing your inputs...</p>
                      <p className="text-[11px] text-slate-500 mt-1">Checking historical performance, timing patterns & audience behaviour</p>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
                      <motion.div className="h-full bg-blue-500 rounded-full" initial={{ width: "0%" }}
                        animate={{ width: "100%" }} transition={{ duration: 1.8, ease: "easeInOut" }} />
                    </div>
                  </motion.div>
                )}

                {predDone && predResult && (
                  <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCheckCircle className="text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Prediction Ready</span>
                    </div>
                    {[
                      { label: "Expected Reach", value: `+${predResult.reach}%`, color: "text-blue-700", bar: predResult.reach, barColor: "#3b82f6" },
                      { label: "Predicted Engagement", value: `+${predResult.engagement}%`, color: "text-emerald-700", bar: predResult.engagement, barColor: "#10b981" },
                      { label: "Expected Saves", value: `+${predResult.saves}%`, color: "text-purple-700", bar: predResult.saves, barColor: "#6366f1" },
                    ].map((r) => (
                      <div key={r.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-slate-600 font-medium">{r.label}</span>
                          <span className={`text-sm font-bold ${r.color}`}>{r.value}</span>
                        </div>
                        <MiniBar value={Math.min(r.bar * 2.5, 100)} color={r.barColor} />
                      </div>
                    ))}
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <FiCpu size={10} /> Forecast based on your {platform} historical data · {predContent} at {predHour}:00
                    </p>
                  </motion.div>
                )}

                {!predicting && !predDone && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">
                    <FiZap className="mx-auto text-3xl text-slate-300 mb-3" />
                    <p className="text-sm font-semibold text-slate-400">Configure inputs and click Predict</p>
                    <p className="text-[11px] text-slate-400 mt-1">Get reach, engagement & save forecasts</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════════
            NEW SECTION 7: Goal Tracker
        ═══════════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiTarget />} title="Engagement Goal Tracker" sub={`${interval.charAt(0).toUpperCase() + interval.slice(1)} target progress · ${platform}`} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Progress ring */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6">
              <div className="relative mb-4">
                <svg width={110} height={110} className="-rotate-90">
                  <circle cx={55} cy={55} r={46} fill="none" stroke="#f1f5f9" strokeWidth={7} />
                  <motion.circle cx={55} cy={55} r={46} fill="none"
                    stroke={goal.current / goal.target >= 1 ? "#10b981" : "#3b82f6"}
                    strokeWidth={7} strokeDasharray={289} strokeLinecap="round"
                    initial={{ strokeDashoffset: 289 }}
                    animate={{ strokeDashoffset: 289 - Math.min((goal.current / goal.target), 1) * 289 }}
                    transition={{ duration: 1.2, ease: "easeOut" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-900">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-600">
                {formatBig(goal.current)} / {formatBig(goal.target)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {goal.current >= goal.target ? "✅ Target reached!" : `${formatBig(goal.target - goal.current)} remaining`}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              {[
                { label: "Daily Target Needed", value: formatBig(goal.dailyTarget), icon: <FiClock size={12} className="text-blue-400" /> },
                { label: "Projected Total", value: formatBig(goal.projected), icon: <FiTrendingUp size={12} className="text-emerald-500" /> },
                { label: "Projected vs Target", value: `${Math.round((goal.projected / goal.target) * 100)}%`, icon: <FiTarget size={12} className="text-indigo-400" /> },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="text-xs text-slate-600 font-medium">{s.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Projection bar */}
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 h-full flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-3">Pace Track</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-slate-500">Current</span>
                        <span className="text-[11px] font-bold text-blue-600">{formatBig(goal.current)}</span>
                      </div>
                      <MiniBar value={(goal.current / goal.target) * 100} color="#3b82f6" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-slate-500">Projected</span>
                        <span className="text-[11px] font-bold text-emerald-600">{formatBig(goal.projected)}</span>
                      </div>
                      <MiniBar value={Math.min((goal.projected / goal.target) * 100, 100)} color="#10b981" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-slate-500">Target</span>
                        <span className="text-[11px] font-bold text-slate-600">{formatBig(goal.target)}</span>
                      </div>
                      <MiniBar value={100} color="#e2e8f0" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3 flex items-start gap-2">
                  <BsRobot className="text-blue-500 shrink-0 mt-0.5 text-sm" />
                  <p className="text-[10px] text-blue-800 leading-relaxed">{goal.aiNote}</p>
                </div>
              </div>
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════════
            NEW SECTION 8: AI Insights Panel
        ═══════════════════════════════════════ */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm text-white text-sm">
                <BsRobot />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-800">AI Insights Panel</h2>
                <p className="text-[11px] text-slate-500">Dynamically generated from your account analytics · {platform} · {interval}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <motion.div className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }} />
              Live · Updated now
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aiInsights.map((insight, i) => (
              <motion.div key={`${platform}-${interval}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-4 hover:shadow-md transition-shadow cursor-default ${insight.bg}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 shrink-0 ${insight.color} text-sm`}>{insight.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${insight.color} bg-white/60`}>{insight.tag}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <FiCpu size={10} />
            <span>Insights computed from live account data · Engagement Intelligence Engine · {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default EngagementPage;
