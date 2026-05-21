// src/pages/CreatorComparisonPage.tsx
import React, { useMemo, useState } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "motion/react";
import {
  FiSearch,
  FiPlus,
  FiTrendingUp,
  FiTrendingDown,
  FiZap,
  FiAward,
  FiClock,
  FiHash,
  FiStar,
  FiTarget,
  FiActivity,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiCalendar,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCpu,
  FiLayers,
  FiBarChart2,
  FiUsers,
  FiGlobe,
  FiPlay,
  FiBookOpen,
  FiRefreshCw,
} from "react-icons/fi";
import {
  BsLightningChargeFill,
  BsStars,
  BsRobot,
  BsGraphUpArrow,
} from "react-icons/bs";

// ─── Reusable Card Shell ───
const CardShell: React.FC<{
  className?: string;
  children: React.ReactNode;
  delay?: number;
}> = ({ className = "", children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)] ${className}`}
  >
    {children}
  </motion.div>
);

// ─── Animated Number ───
const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({
  value,
  suffix = "",
}) => {
  const [displayed, setDisplayed] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <span>
      {displayed.toLocaleString()}
      {suffix}
    </span>
  );
};

// ─── Radial Progress ───
const RadialProgress: React.FC<{
  value: number;
  label: string;
  color: string;
  size?: number;
}> = ({ value, label, color, size = 90 }) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-bold text-gray-900">{value}%</span>
      </div>
      <span className="text-[11px] font-medium text-gray-500 text-center leading-tight mt-1">{label}</span>
    </div>
  );
};

// ─── Dummy Data ───
const USER_PROFILE = {
  name: "Your Channel",
  handle: "@yourchannel",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=YC&backgroundColor=3b82f6&textColor=ffffff",
  followers: 35543,
  engagementRate: 4.8,
  avgLikes: 2450,
  avgComments: 187,
  postingFrequency: "5x/week",
  growth: 12.4,
  consistencyScore: 87,
};

const COMPETITOR_PROFILE = {
  name: "TechGuru Pro",
  handle: "@techgurupro",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TG&backgroundColor=8b5cf6&textColor=ffffff",
  followers: 89200,
  engagementRate: 6.2,
  avgLikes: 5840,
  avgComments: 342,
  postingFrequency: "7x/week",
  growth: 18.7,
  consistencyScore: 94,
};

const GROWTH_DATA = [
  { month: "Jan", user: 18000, competitor: 42000 },
  { month: "Feb", user: 20500, competitor: 48000 },
  { month: "Mar", user: 22000, competitor: 52000 },
  { month: "Apr", user: 24800, competitor: 58000 },
  { month: "May", user: 28000, competitor: 65000 },
  { month: "Jun", user: 30200, competitor: 72000 },
  { month: "Jul", user: 32500, competitor: 78000 },
  { month: "Aug", user: 35543, competitor: 89200 },
];

const ENGAGEMENT_DATA = [
  { month: "Jan", user: 3.2, competitor: 4.8 },
  { month: "Feb", user: 3.5, competitor: 5.1 },
  { month: "Mar", user: 3.8, competitor: 5.4 },
  { month: "Apr", user: 4.0, competitor: 5.8 },
  { month: "May", user: 4.2, competitor: 5.6 },
  { month: "Jun", user: 4.5, competitor: 6.0 },
  { month: "Jul", user: 4.6, competitor: 6.1 },
  { month: "Aug", user: 4.8, competitor: 6.2 },
];

const AI_INSIGHTS = [
  {
    icon: <FiTrendingUp className="text-blue-500" />,
    title: "Posting Frequency Gap",
    text: "Competitor posts 3x more short-form content during peak audience activity windows. Increasing your output by 40% could yield a significant engagement lift.",
    severity: "high" as const,
  },
  {
    icon: <FiActivity className="text-amber-500" />,
    title: "Consistency Drop Detected",
    text: "Your engagement rate drops significantly after inconsistent posting intervals. Maintaining a steady 5-day schedule could improve retention by 22%.",
    severity: "medium" as const,
  },
  {
    icon: <FiPlay className="text-emerald-500" />,
    title: "Content Format Opportunity",
    text: "Educational reels are outperforming entertainment content by 47% in your niche. Consider shifting 30% of content to tutorial-style formats.",
    severity: "high" as const,
  },
  {
    icon: <FiEye className="text-purple-500" />,
    title: "Hook & CTA Analysis",
    text: "Your competitor gains higher retention through shorter hooks (under 3s) and stronger CTA captions. Average watch time increases 34% with optimized hooks.",
    severity: "medium" as const,
  },
];

const CONTENT_MATRIX = [
  { type: "Reels / Shorts", icon: <FiPlay size={14} />, user: 52, competitor: 88 },
  { type: "Tutorials", icon: <FiBookOpen size={14} />, user: 78, competitor: 55 },
  { type: "Stories", icon: <FiLayers size={14} />, user: 40, competitor: 72 },
  { type: "Long-form Video", icon: <FiBarChart2 size={14} />, user: 65, competitor: 45 },
  { type: "Threads / Carousels", icon: <FiMessageCircle size={14} />, user: 30, competitor: 82 },
];

const AGE_DATA = [
  { name: "18-24", user: 35, competitor: 28 },
  { name: "25-34", user: 40, competitor: 42 },
  { name: "35-44", user: 15, competitor: 20 },
  { name: "45+", user: 10, competitor: 10 },
];

const GENDER_USER = [
  { name: "Male", value: 62 },
  { name: "Female", value: 33 },
  { name: "Other", value: 5 },
];
const GENDER_COMPETITOR = [
  { name: "Male", value: 58 },
  { name: "Female", value: 38 },
  { name: "Other", value: 4 },
];

const PIE_COLORS = ["#3b82f6", "#f472b6", "#94a3b8"];

const GEO_DATA = [
  { region: "India", user: 45, competitor: 52 },
  { region: "USA", user: 22, competitor: 18 },
  { region: "UK", user: 12, competitor: 10 },
  { region: "Canada", user: 8, competitor: 7 },
  { region: "Other", user: 13, competitor: 13 },
];

const RANKING_SCORES = [
  { label: "Engagement Score", value: 72, percentile: "Top 15%", color: "#3b82f6" },
  { label: "Growth Velocity", value: 58, percentile: "Top 28%", color: "#8b5cf6" },
  { label: "Posting Consistency", value: 87, percentile: "Top 8%", color: "#10b981" },
  { label: "Audience Loyalty", value: 65, percentile: "Top 20%", color: "#f59e0b" },
  { label: "Viral Potential", value: 43, percentile: "Top 35%", color: "#ef4444" },
];

const AI_RECOMMENDATIONS = [
  {
    icon: <FiCalendar className="text-blue-500" />,
    title: "Optimal Posting Time",
    text: "Post educational AI reels between 7PM–9PM IST for a projected 28% engagement increase.",
    tag: "Timing",
  },
  {
    icon: <FiHash className="text-purple-500" />,
    title: "Hashtag Strategy",
    text: "Use #TechTips, #AITools, #CreatorEconomy to tap into trending discovery feeds this week.",
    tag: "Hashtags",
  },
  {
    icon: <FiPlay className="text-emerald-500" />,
    title: "Content Format",
    text: "Switch to 60-second tutorial reels. Competitors see 2.3x higher completion rates with this format.",
    tag: "Format",
  },
  {
    icon: <FiTarget className="text-rose-500" />,
    title: "Growth Opportunity",
    text: "Collaborate with creators in the 10K-50K range. Cross-promotions yield 40% follower conversion in your niche.",
    tag: "Growth",
  },
];

// ─── Platform type ───
type Platform = "instagram" | "youtube" | "twitter";
type ChartMetric = "followers" | "engagement" | "views" | "reach";

// ═══════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════
const CreatorComparisonPage: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [chartMetric, setChartMetric] = useState<ChartMetric>("followers");
  const [searchValue, setSearchValue] = useState("");

  // AI Gap Analysis state
  const [gapAnalyzing, setGapAnalyzing] = useState(false);
  const [gapRevealed, setGapRevealed] = useState<number[]>([]);
  const [gapDone, setGapDone] = useState(false);

  const triggerGapAnalysis = () => {
    setGapRevealed([]);
    setGapDone(false);
    setGapAnalyzing(true);
    // Simulate AI processing then reveal one by one
    setTimeout(() => {
      setGapAnalyzing(false);
      AI_INSIGHTS.forEach((_, i) => {
        setTimeout(() => {
          setGapRevealed((prev) => [...prev, i]);
          if (i === AI_INSIGHTS.length - 1) setGapDone(true);
        }, 600 * (i + 1));
      });
    }, 2000);
  };

  // AI Recommendation state
  const [recAnalyzing, setRecAnalyzing] = useState(false);
  const [recRevealed, setRecRevealed] = useState<number[]>([]);
  const [recDone, setRecDone] = useState(false);

  const triggerRecommendations = () => {
    setRecRevealed([]);
    setRecDone(false);
    setRecAnalyzing(true);
    setTimeout(() => {
      setRecAnalyzing(false);
      AI_RECOMMENDATIONS.forEach((_, i) => {
        setTimeout(() => {
          setRecRevealed((prev) => [...prev, i]);
          if (i === AI_RECOMMENDATIONS.length - 1) setRecDone(true);
        }, 500 * (i + 1));
      });
    }, 1800);
  };

  // Chart data based on metric toggle
  const chartData = useMemo(() => {
    if (chartMetric === "followers") return GROWTH_DATA;
    if (chartMetric === "engagement") return ENGAGEMENT_DATA;
    // views & reach use tweaked follower data
    return GROWTH_DATA.map((d) => ({
      ...d,
      user: Math.round(d.user * 2.5),
      competitor: Math.round(d.competitor * 2.8),
    }));
  }, [chartMetric]);



  const platforms: { id: Platform; label: string }[] = [
    { id: "instagram", label: "Instagram" },
    { id: "youtube", label: "YouTube" },
    { id: "twitter", label: "Twitter / X" },
  ];

  const metricToggles: { id: ChartMetric; label: string }[] = [
    { id: "followers", label: "Followers" },
    { id: "engagement", label: "Engagement" },
    { id: "views", label: "Views" },
    { id: "reach", label: "Reach" },
  ];

  // Severity colors for AI insights
  const severityStyle = (s: "high" | "medium") =>
    s === "high"
      ? "border-blue-200 bg-blue-50/40"
      : "border-amber-200 bg-amber-50/30";

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* ═══════════════════════════════════════════════
            SECTION 1 — HERO / HEADER
        ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white px-7 py-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Creator Intelligence Comparison
              </h1>
              <p className="mt-1.5 text-sm text-gray-500 max-w-md">
                Analyze competitors, identify growth gaps, and discover AI-powered strategic insights.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search / Add Competitor */}
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <FiSearch className="text-gray-400" />
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-44 bg-transparent text-sm outline-none placeholder:text-gray-400"
                  placeholder="Add competitor..."
                />
                <button className="rounded-lg bg-blue-500 p-1.5 text-white hover:bg-blue-600 transition-colors">
                  <FiPlus size={14} />
                </button>
              </div>

              {/* Platform pills */}
              <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F6F7] px-1.5 py-1 text-[12px] font-medium">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                      selectedPlatform === p.id
                        ? "bg-white text-blue-600 shadow-sm font-semibold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* AI Status */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-semibold text-emerald-700">
                <motion.div
                  className="h-2 w-2 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                AI Analysis Active
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════
            SECTION 2 — CREATOR PROFILE COMPARISON CARDS
        ═══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            { profile: USER_PROFILE, label: "You", isUser: true },
            { profile: COMPETITOR_PROFILE, label: "Competitor", isUser: false },
          ].map(({ profile, label, isUser }, idx) => (
            <CardShell key={label} delay={idx * 0.15} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              {/* Badge */}
              {isUser && profile.growth > 10 && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <FiTrendingUp size={11} /> Growth Advantage
                </div>
              )}
              {!isUser && COMPETITOR_PROFILE.engagementRate > USER_PROFILE.engagementRate && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-2.5 py-1 text-[10px] font-bold text-purple-700">
                  <FiAward size={11} /> Higher Engagement
                </div>
              )}
              {!isUser && COMPETITOR_PROFILE.growth > USER_PROFILE.growth && (
                <div className="absolute top-12 right-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  <BsGraphUpArrow size={10} /> Fastest Growing
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-14 w-14 rounded-full border-2 border-gray-100 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">{profile.name}</h3>
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{profile.handle}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Followers", value: profile.followers, icon: <FiUsers size={13} className="text-blue-400" /> },
                  { label: "Engagement Rate", value: profile.engagementRate, suffix: "%", icon: <FiActivity size={13} className="text-emerald-400" /> },
                  { label: "Avg Likes", value: profile.avgLikes, icon: <FiHeart size={13} className="text-rose-400" /> },
                  { label: "Avg Comments", value: profile.avgComments, icon: <FiMessageCircle size={13} className="text-purple-400" /> },
                  { label: "Posting Freq", value: profile.postingFrequency, isText: true, icon: <FiCalendar size={13} className="text-amber-400" /> },
                  { label: "Growth", value: profile.growth, suffix: "%", icon: <FiTrendingUp size={13} className="text-emerald-400" /> },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-xl bg-gray-50/80 p-3 group-hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {metric.icon}
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{metric.label}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {(metric as any).isText ? (
                        String(metric.value)
                      ) : (
                        <AnimatedNumber value={Number(metric.value)} suffix={metric.suffix || ""} />
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Consistency Score bar */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-gray-500">Consistency Score</span>
                  <span className="text-xs font-bold text-gray-900">{profile.consistencyScore}/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: isUser ? "linear-gradient(90deg, #3b82f6, #60a5fa)" : "linear-gradient(90deg, #8b5cf6, #a78bfa)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${profile.consistencyScore}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </CardShell>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════
            SECTION 3 — GROWTH COMPARISON VISUALIZATION
        ═══════════════════════════════════════════════ */}
        <CardShell delay={0.2} className="!p-0 overflow-hidden">
          <div className="p-7 pb-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-gray-900">Growth Comparison</h2>
                <p className="mt-1 text-xs text-gray-500">Track performance trends side by side</p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F6F7] p-1 text-[11px] font-medium">
                {metricToggles.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setChartMetric(m.id)}
                    className={`rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                      chartMetric === m.id
                        ? "bg-white text-blue-600 shadow-sm font-semibold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <div className="h-2 w-5 rounded-full bg-blue-500" /> You
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <div className="h-2 w-5 rounded-full bg-purple-400" /> Competitor
              </div>
            </div>
          </div>

          <div className="h-[320px] w-full px-2 pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", fontWeight: 600 }} />
                <Area type="monotone" dataKey="user" name="You" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gradUser)" dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2.5 }} />
                <Area type="monotone" dataKey="competitor" name="Competitor" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#gradComp)" dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#fff", stroke: "#8b5cf6", strokeWidth: 2.5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardShell>

        {/* ═══════════════════════════════════════════════
            SECTION 4 — AI GROWTH GAP ANALYSIS
        ═══════════════════════════════════════════════ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-200">
                <BsRobot className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">AI Growth Gap Analysis</h2>
                <p className="text-[11px] text-gray-400 font-medium">Analyze both channels to identify strategic gaps</p>
              </div>
            </div>
            <button
              onClick={triggerGapAnalysis}
              disabled={gapAnalyzing}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm transition-all duration-300 ${
                gapAnalyzing
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : gapDone
                  ? "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200"
              }`}
            >
              {gapAnalyzing ? (
                <>
                  <motion.div
                    className="h-3.5 w-3.5 rounded-full border-2 border-gray-300 border-t-gray-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  Analyzing channels...
                </>
              ) : gapDone ? (
                <><FiRefreshCw size={13} /> Re-analyze</>
              ) : (
                <><BsStars size={13} /> Show me Gaps</>
              )}
            </button>
          </motion.div>

          {/* AI Processing indicator */}
          {gapAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    className="h-10 w-10 rounded-full border-[3px] border-blue-200 border-t-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <BsRobot className="absolute inset-0 m-auto text-blue-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">AI is analyzing both channels...</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Comparing posting patterns, engagement metrics, content formats, and audience behavior</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full rounded-full bg-blue-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* Empty state when not yet analyzed */}
          {!gapAnalyzing && gapRevealed.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-10 text-center"
            >
              <BsRobot className="mx-auto text-3xl text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-500">Click "Show me Gaps" to analyze both channels</p>
              <p className="text-[11px] text-gray-400 mt-1">AI will compare metrics and reveal strategic gaps one by one</p>
            </motion.div>
          )}

          {/* Revealed insights */}
          {gapRevealed.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {AI_INSIGHTS.map((insight, i) => {
                if (!gapRevealed.includes(i)) return null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-md cursor-default ${severityStyle(insight.severity)}`}
                  >
                    <motion.div
                      className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-400/30"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                        {insight.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-gray-900">{insight.title}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${insight.severity === 'high' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
                            {insight.severity === 'high' ? 'Critical' : 'Moderate'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{insight.text}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {gapDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400"
            >
              <FiCpu size={11} />
              <span>Analysis complete · {AI_INSIGHTS.length} gaps identified · Generated by AI Strategy Engine</span>
            </motion.div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
            SECTION 5 — CONTENT TYPE PERFORMANCE MATRIX
        ═══════════════════════════════════════════════ */}
        <CardShell delay={0.15}>
          <h2 className="text-base font-bold text-gray-900 mb-1">Content Type Performance</h2>
          <p className="text-xs text-gray-500 mb-6">Side-by-side content format analysis</p>

          <div className="space-y-4">
            {CONTENT_MATRIX.map((item, i) => {
              const userWins = item.user > item.competitor;
              return (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-gray-100 p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.type}</span>
                    {userWins && (
                      <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        You lead
                      </span>
                    )}
                    {!userWins && (
                      <span className="ml-auto text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                        Competitor leads
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-medium text-gray-400">You</span>
                        <span className="text-[10px] font-bold text-gray-700">{item.user}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.user}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-medium text-gray-400">Competitor</span>
                        <span className="text-[10px] font-bold text-gray-700">{item.competitor}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-purple-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.competitor}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardShell>

        {/* ═══════════════════════════════════════════════
            SECTION 6 — AUDIENCE OVERLAP & DEMOGRAPHICS
        ═══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Gender Split */}
          <CardShell delay={0.1}>
            <h2 className="text-sm font-bold text-gray-900 mb-1">Gender Distribution</h2>
            <p className="text-[11px] text-gray-500 mb-4">Audience gender comparison</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "You", data: GENDER_USER },
                { label: "Competitor", data: GENDER_COMPETITOR },
              ].map(({ label, data }) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold text-gray-500 text-center mb-2">{label}</p>
                  <div className="h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data} innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value" strokeWidth={0}>
                          {data.map((_, index) => (
                            <Cell key={index} fill={PIE_COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-3 mt-2">
                    {data.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-1 text-[10px] text-gray-500">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                        {d.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardShell>

          {/* Geographic Regions */}
          <CardShell delay={0.15}>
            <h2 className="text-sm font-bold text-gray-900 mb-1">Geographic Reach</h2>
            <p className="text-[11px] text-gray-500 mb-4">Top audience regions</p>
            <div className="space-y-3">
              {GEO_DATA.map((geo, i) => (
                <div key={geo.region}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <FiGlobe size={12} className="text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">{geo.region}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-semibold">
                      <span className="text-blue-600">{geo.user}%</span>
                      <span className="text-gray-300">vs</span>
                      <span className="text-purple-500">{geo.competitor}%</span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    <motion.div
                      className="rounded-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${geo.user}%` }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                    />
                    <motion.div
                      className="rounded-full bg-purple-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${geo.competitor}%` }}
                      transition={{ duration: 0.7, delay: i * 0.1 + 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI Overlap Insight */}
            <div className="mt-5 rounded-xl bg-blue-50/60 border border-blue-100 p-3.5 flex items-start gap-2.5">
              <BsStars className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                78% audience overlap detected in the Indian tech creator niche. Consider differentiated content to capture unique segments.
              </p>
            </div>
          </CardShell>
        </div>

        {/* Age Distribution */}
        <CardShell delay={0.1}>
          <h2 className="text-sm font-bold text-gray-900 mb-1">Age Distribution</h2>
          <p className="text-[11px] text-gray-500 mb-5">Audience age group comparison</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGE_DATA} barGap={4}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="user" name="You" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="competitor" name="Competitor" fill="#c4b5fd" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-5 mt-3">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <div className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> You
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <div className="h-2.5 w-2.5 rounded-sm bg-purple-300" /> Competitor
            </div>
          </div>
        </CardShell>

        {/* ═══════════════════════════════════════════════
            SECTION 7 — VIRAL CONTENT BREAKDOWN
        ═══════════════════════════════════════════════ */}
        <CardShell delay={0.1} className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 shadow-md shadow-rose-200">
                <BsLightningChargeFill className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Viral Content Breakdown</h2>
                <p className="text-[11px] text-gray-400">Competitor's top-performing content analysis</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Content preview */}
              <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <FiPlay className="text-rose-400" />
                  <span className="text-[10px] font-semibold text-rose-300 uppercase tracking-wide">Top Reel</span>
                </div>
                <h4 className="text-sm font-bold leading-snug mb-4">
                  "5 AI Tools That Will Replace Your Job in 2025"
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Views</span>
                    <span className="font-bold">2.4M</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Likes</span>
                    <span className="font-bold">142K</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Comments</span>
                    <span className="font-bold">8.7K</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Shares</span>
                    <span className="font-bold">34K</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Retention</span>
                    <span className="font-bold text-emerald-400">78%</span>
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Posting Time", value: "7:30 PM IST", sub: "Peak activity window" },
                    { label: "Hashtags Used", value: "12 tags", sub: "#AI #Tech #Future" },
                    { label: "Retention Score", value: "78%", sub: "Top 5% of niche" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl bg-gray-50 p-3.5">
                      <p className="text-[10px] font-medium text-gray-400 mb-1">{m.label}</p>
                      <p className="text-sm font-bold text-gray-900">{m.value}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* AI viral explanation */}
                <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BsRobot className="text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">AI Viral Analysis</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    This content performed exceptionally due to a <strong>short-hook delivery</strong> (1.8s), strong <strong>curiosity trigger</strong> in the title,
                    optimized <strong>posting timing</strong> during peak hours, and strategic use of <strong>fear-of-missing-out</strong> psychology.
                    The 12-hashtag strategy maximized discovery across explore and search feeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardShell>

        {/* ═══════════════════════════════════════════════
            SECTION 8 — CREATOR RANKING & SCORES
        ═══════════════════════════════════════════════ */}
        <CardShell delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <FiAward className="text-amber-500" size={18} />
            <div>
              <h2 className="text-base font-bold text-gray-900">Creator Ranking & Scores</h2>
              <p className="text-[11px] text-gray-500">Your percentile ranking among tech creators</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
            {RANKING_SCORES.map((score, i) => (
              <motion.div
                key={score.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <RadialProgress value={score.value} label={score.label} color={score.color} />
                </div>
                <span className="mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${score.color}15`, color: score.color }}>
                  {score.percentile}
                </span>
              </motion.div>
            ))}
          </div>
        </CardShell>

        {/* ═══════════════════════════════════════════════
            SECTION 9 — AI RECOMMENDATION ENGINE
        ═══════════════════════════════════════════════ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-200">
                <FiZap className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">AI Recommendation Engine</h2>
                <p className="text-[11px] text-gray-400 font-medium">Get personalized growth strategies based on analysis</p>
              </div>
            </div>
            <button
              onClick={triggerRecommendations}
              disabled={recAnalyzing}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm transition-all duration-300 ${
                recAnalyzing
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : recDone
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-200"
              }`}
            >
              {recAnalyzing ? (
                <>
                  <motion.div
                    className="h-3.5 w-3.5 rounded-full border-2 border-gray-300 border-t-gray-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  Generating strategies...
                </>
              ) : recDone ? (
                <><FiRefreshCw size={13} /> Regenerate</>
              ) : (
                <><FiZap size={13} /> Generate Recommendations</>
              )}
            </button>
          </motion.div>

          {/* AI Processing indicator */}
          {recAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-teal-50/60 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    className="h-10 w-10 rounded-full border-[3px] border-emerald-200 border-t-emerald-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <FiZap className="absolute inset-0 m-auto text-emerald-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">AI is crafting your growth strategy...</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Analyzing trends, timing patterns, content performance, and audience preferences</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full rounded-full bg-emerald-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {!recAnalyzing && recRevealed.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-10 text-center"
            >
              <FiZap className="mx-auto text-3xl text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-500">Click "Generate Recommendations" to get AI strategies</p>
              <p className="text-[11px] text-gray-400 mt-1">Personalized content, timing, and growth recommendations will appear here</p>
            </motion.div>
          )}

          {/* Revealed recommendations */}
          {recRevealed.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {AI_RECOMMENDATIONS.map((rec, i) => {
                if (!recRevealed.includes(i)) return null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="group relative rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-lg p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-blue-50/0 to-white/0 group-hover:from-blue-50/30 group-hover:via-indigo-50/20 group-hover:to-white/10 transition-all duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white shadow-sm transition-colors">
                            {rec.icon}
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">{rec.title}</h4>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {rec.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{rec.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {recDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400"
            >
              <FiCpu size={11} />
              <span>Strategy generated · {AI_RECOMMENDATIONS.length} recommendations · AI Strategy Engine</span>
            </motion.div>
          )}
        </div>

        {/* Bottom spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default CreatorComparisonPage;
