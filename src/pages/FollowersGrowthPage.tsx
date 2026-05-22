import React, { useMemo, useState, useEffect } from "react";
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
  AreaChart,
  Area,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import {
  FiChevronDown,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowDown,
  FiAlertTriangle,
  FiTarget,
  FiZap,
  FiUsers,
  FiActivity,
  FiAward,
  FiCpu,
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";
import { BsRobot, BsStars, BsLightningChargeFill, BsGraphUpArrow } from "react-icons/bs";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type FGPlatform = "instagram" | "youtube" | "twitter";
type FGRange = "7 Days" | "30 Days" | "90 Days" | "6 Months" | "1 Year";
type FGPoint = { label: string; value: number };
type SpikePoint = { label: string; change: number; reason: string };

// ─────────────────────────────────────────────
// EXISTING DATA (unchanged)
// ─────────────────────────────────────────────
const baseLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const generateSeries = (multiplier: number): FGPoint[] =>
  baseLabels.map((label, idx) => ({
    label,
    value: Math.round((100 + idx * 15) * multiplier * (0.8 + idx * 0.07)),
  }));

const followersSeries: Record<FGPlatform, Record<FGRange, FGPoint[]>> = {
  instagram: {
    "7 Days": generateSeries(1.4),
    "30 Days": generateSeries(1.8),
    "90 Days": generateSeries(2.1),
    "6 Months": generateSeries(2.5),
    "1 Year": generateSeries(2.9),
  },
  youtube: {
    "7 Days": generateSeries(1.0),
    "30 Days": generateSeries(1.3),
    "90 Days": generateSeries(1.6),
    "6 Months": generateSeries(1.9),
    "1 Year": generateSeries(2.1),
  },
  twitter: {
    "7 Days": generateSeries(0.7),
    "30 Days": generateSeries(0.9),
    "90 Days": generateSeries(1.1),
    "6 Months": generateSeries(1.3),
    "1 Year": generateSeries(1.5),
  },
};

const spikeData: SpikePoint[] = [
  { label: "Mon", change: 120, reason: "Reel Boost" },
  { label: "Tue", change: -35, reason: "Normal churn" },
  { label: "Wed", change: 210, reason: "Viral Post" },
  { label: "Thu", change: 80, reason: "Trend" },
  { label: "Fri", change: 15, reason: "Steady growth" },
  { label: "Sat", change: 260, reason: "Collab" },
  { label: "Sun", change: -10, reason: "Weekend drop" },
];

const significantSpikes = [
  { date: "Wed", change: "+210", tag: "Viral Post" },
  { date: "Sat", change: "+260", tag: "Collab" },
  { date: "Tue", change: "-35", tag: "Trend" },
];

const platformComparisonBase = [
  { key: "instagram" as FGPlatform, name: "Instagram", followers: 12540, avgDailyGrowth: 230, bestDay: "Jul 12" },
  { key: "youtube" as FGPlatform, name: "YouTube", followers: 8481, avgDailyGrowth: 180, bestDay: "Sep 15" },
  { key: "twitter" as FGPlatform, name: "Twitter", followers: 4507, avgDailyGrowth: 95, bestDay: "Jun 3" },
];

// ─────────────────────────────────────────────
// INTELLIGENCE DATA LAYER
// ─────────────────────────────────────────────

// Acquisition Funnel per platform+range
interface AcquisitionData {
  newFollowers: number;
  retained: number;
  lost: number;
  net: number;
  retentionPct: number;
  lossPct: number;
  aiNote: string;
}

const acquisitionData: Record<FGPlatform, Record<FGRange, AcquisitionData>> = {
  instagram: {
    "7 Days":   { newFollowers: 860, retained: 790, lost: 70,  net: 720, retentionPct: 91.9, lossPct: 8.1,  aiNote: "Retention healthy at 92%. Small churn from inactive followers purged by the algorithm." },
    "30 Days":  { newFollowers: 3200, retained: 2880, lost: 320, net: 2880, retentionPct: 90.0, lossPct: 10.0, aiNote: "90% monthly retention. Focus on consistent posting to reduce churn below 8%." },
    "90 Days":  { newFollowers: 8400, retained: 7476, lost: 924, net: 7476, retentionPct: 89.0, lossPct: 11.0, aiNote: "Retention slightly declining at 89%. Engagement drops after week 6 need attention." },
    "6 Months": { newFollowers: 15200, retained: 13528, lost: 1672, net: 13528, retentionPct: 89.0, lossPct: 11.0, aiNote: "Strong 6-month retention. Reels uploaded in month 3 doubled acquisition pace." },
    "1 Year":   { newFollowers: 28400, retained: 24396, lost: 4004, net: 24396, retentionPct: 85.9, lossPct: 14.1, aiNote: "Annual churn at 14% is normal. Consistent content prevents long-tail follower loss." },
  },
  youtube: {
    "7 Days":   { newFollowers: 540, retained: 480, lost: 60,  net: 480, retentionPct: 88.9, lossPct: 11.1, aiNote: "YouTube subscriber retention is strong at 89%. Long-form content drives loyal retention." },
    "30 Days":  { newFollowers: 2100, retained: 1848, lost: 252, net: 1848, retentionPct: 88.0, lossPct: 12.0, aiNote: "Monthly retention at 88%. Subscribers who arrive via Shorts have 6% lower retention." },
    "90 Days":  { newFollowers: 5600, retained: 4872, lost: 728, net: 4872, retentionPct: 87.0, lossPct: 13.0, aiNote: "Solid 90-day retention. Live streams in week 8 re-engaged 340 at-risk subscribers." },
    "6 Months": { newFollowers: 9800, retained: 8428, lost: 1372, net: 8428, retentionPct: 86.0, lossPct: 14.0, aiNote: "Retention dips at month 4. Upload consistency is the primary retention lever on YouTube." },
    "1 Year":   { newFollowers: 18200, retained: 15288, lost: 2912, net: 15288, retentionPct: 84.0, lossPct: 16.0, aiNote: "84% annual retention is above platform average of 78%. Keep long-form series going." },
  },
  twitter: {
    "7 Days":   { newFollowers: 340, retained: 289, lost: 51,  net: 289, retentionPct: 85.0, lossPct: 15.0, aiNote: "Twitter churn is higher at 15%. Thread quality and reply engagement are key retention drivers." },
    "30 Days":  { newFollowers: 1200, retained: 996, lost: 204, net: 996, retentionPct: 83.0, lossPct: 17.0, aiNote: "17% monthly churn on Twitter is common. Daily posting dramatically improves follower stickiness." },
    "90 Days":  { newFollowers: 3100, retained: 2511, lost: 589, net: 2511, retentionPct: 81.0, lossPct: 19.0, aiNote: "Twitter retention at 81% over 90 days. Viral threads in week 5 recovered 120 at-risk followers." },
    "6 Months": { newFollowers: 5400, retained: 4212, lost: 1188, net: 4212, retentionPct: 78.0, lossPct: 22.0, aiNote: "22% churn over 6 months. Boosting replies and quote-tweet engagement will improve retention." },
    "1 Year":   { newFollowers: 9200, retained: 6992, lost: 2208, net: 6992, retentionPct: 76.0, lossPct: 24.0, aiNote: "Annual Twitter retention at 76% is below Instagram. Shift to thread-first strategy to improve." },
  },
};

// Unfollow Intelligence
interface UnfollowData {
  worstDay: string;
  lost: number;
  cause: string;
  causes: string[];
  aiNote: string;
}

const unfollowData: Record<FGPlatform, Record<FGRange, UnfollowData>> = {
  instagram: {
    "7 Days":   { worstDay: "Tuesday", lost: 120, cause: "Low posting consistency", causes: ["3-day posting gap", "Weak story engagement", "Audience inactive window"], aiNote: "3-day inactivity caused follower decline. Posting daily Stories prevents passive churn." },
    "30 Days":  { worstDay: "Week 2", lost: 280, cause: "Content format shift", causes: ["Switch from Reels to static posts", "Engagement dropped 34%", "Reach fell below baseline"], aiNote: "Content format shift away from Reels triggered a 280-follower drop. Return to Reels." },
    "90 Days":  { worstDay: "Month 2", lost: 640, cause: "Posting gap > 5 days", causes: ["5-day posting break", "Algorithm de-prioritised account", "Reactivation took 12 days"], aiNote: "Extended posting break in month 2 caused a compounding unfollow spike. Batch-schedule content." },
    "6 Months": { worstDay: "Month 4", lost: 980, cause: "Niche pivot content", causes: ["Topic change from tech to lifestyle", "Core audience mismatch", "New content had 42% lower saves"], aiNote: "Niche pivot content caused 980 unfollows. Keep core content themes consistent." },
    "1 Year":   { worstDay: "Q3 Week 2", lost: 1420, cause: "Long hiatus period", causes: ["21-day posting absence", "Algorithm reset", "Account reach dropped 67%"], aiNote: "21-day hiatus is your largest unfollow driver. Plan content in advance to avoid gaps." },
  },
  youtube: {
    "7 Days":   { worstDay: "Thursday", lost: 72, cause: "Long gap between uploads", causes: ["10-day upload gap", "Subscribers unsubscribed passively", "New algorithm cycle missed"], aiNote: "10-day upload gap caused passive unsubscribes. Maintain weekly upload minimum." },
    "30 Days":  { worstDay: "Week 3", lost: 185, cause: "Low video quality week", causes: ["3 low-retention videos in a row", "Average watch time fell to 28%", "YouTube reduced distribution"], aiNote: "Three consecutive low-retention videos triggered algorithm suppression and 185 unsubscribes." },
    "90 Days":  { worstDay: "Month 2", lost: 520, cause: "Topic mismatch in content", causes: ["Off-niche video went viral but attracted wrong audience", "Unsubscribe rate 3x higher than normal"], aiNote: "Off-niche viral video attracted audience that unsubscribed quickly. Niche targeting matters." },
    "6 Months": { worstDay: "Month 5", lost: 890, cause: "Reduced upload frequency", causes: ["Monthly uploads dropped from 8 to 3", "Algorithm ranking fell", "Impressions down 44%"], aiNote: "Upload frequency drop from 8 to 3/month caused compounding subscriber loss." },
    "1 Year":   { worstDay: "Q2", lost: 1640, cause: "Extended upload hiatus", causes: ["18-day upload break", "Search ranking drops", "Subscriber memory decay after 14 days"], aiNote: "Subscribers forget channels after 14 days of silence. Content calendars are essential." },
  },
  twitter: {
    "7 Days":   { worstDay: "Friday", lost: 58, cause: "Reduced tweet frequency", causes: ["No tweets for 2 days", "Engagement window missed", "Follower feed refresh cleared account"], aiNote: "2-day tweet gap causes significant churn on Twitter. Post at minimum once daily." },
    "30 Days":  { worstDay: "Week 4", lost: 190, cause: "Low engagement threads", causes: ["Thread quality declined", "Average replies per thread fell 60%", "No viral moment this month"], aiNote: "Without a viral thread this month, passive unfollow rate increased by 190." },
    "90 Days":  { worstDay: "Month 3", lost: 470, cause: "Controversial tweet backlash", causes: ["Single high-exposure tweet misinterpreted", "Mass unfollows in 6-hour window", "Brand accounts unfollowed"], aiNote: "Controversy spike caused 470 unfollows. Tone and clarity in high-reach tweets matters most." },
    "6 Months": { worstDay: "Month 5", lost: 820, cause: "Niche drift and inactivity", causes: ["Topic breadth increased", "Audience cohesion weakened", "Posting frequency halved"], aiNote: "Niche drift combined with reduced posting caused 820 unfollows across 6 months." },
    "1 Year":   { worstDay: "Q3", lost: 1380, cause: "Platform algorithm change", causes: ["Twitter algorithm deprioritised non-paid accounts", "Organic reach fell 51%", "New followers harder to retain"], aiNote: "Platform algorithm change in Q3 reduced organic retention significantly. Boost with threads." },
  },
};

// Growth Momentum
interface MomentumData {
  state: "Weak" | "Stable" | "Accelerating" | "Explosive";
  pct: number;
  direction: "up" | "down";
  aiNote: string;
}

const momentumData: Record<FGPlatform, Record<FGRange, MomentumData>> = {
  instagram: {
    "7 Days":   { state: "Accelerating", pct: 24, direction: "up", aiNote: "Growth accelerating after increased Reel uploads this week." },
    "30 Days":  { state: "Accelerating", pct: 18, direction: "up", aiNote: "Monthly growth momentum at +18% vs last month. Carousel posts are new drivers." },
    "90 Days":  { state: "Stable",       pct: 8,  direction: "up", aiNote: "Stable 90-day growth. No major spikes but consistent week-on-week gains." },
    "6 Months": { state: "Accelerating", pct: 31, direction: "up", aiNote: "6-month momentum is strongest of the year — Reels algorithm boost is working." },
    "1 Year":   { state: "Stable",       pct: 5,  direction: "up", aiNote: "Annual growth stable. Q3 was your fastest quarter — replicate that content mix." },
  },
  youtube: {
    "7 Days":   { state: "Stable",       pct: 3,  direction: "up", aiNote: "Stable week — no viral content but baseline growth is healthy." },
    "30 Days":  { state: "Accelerating", pct: 14, direction: "up", aiNote: "Shorts are driving acceleration this month. Long-form is lagging behind." },
    "90 Days":  { state: "Stable",       pct: 6,  direction: "up", aiNote: "90-day stability with minor acceleration in month 3 from series content." },
    "6 Months": { state: "Stable",       pct: 9,  direction: "up", aiNote: "Solid mid-year growth. Shorts contributed 62% of all subscriber gains." },
    "1 Year":   { state: "Accelerating", pct: 22, direction: "up", aiNote: "Annual momentum up 22%. YouTube Shorts strategy launched in Q2 was the catalyst." },
  },
  twitter: {
    "7 Days":   { state: "Weak",         pct: 12, direction: "down", aiNote: "Growth momentum weak this week — no viral thread. Reconnect with trending topics." },
    "30 Days":  { state: "Stable",       pct: 4,  direction: "up",   aiNote: "Month-on-month growth is stable at +4%. Thread consistency is maintaining baseline." },
    "90 Days":  { state: "Weak",         pct: 8,  direction: "down", aiNote: "90-day momentum declining due to algorithm changes. Focus on reply engagement." },
    "6 Months": { state: "Stable",       pct: 7,  direction: "up",   aiNote: "Stable 6-month growth despite algorithm headwinds. Thread virality is key driver." },
    "1 Year":   { state: "Stable",       pct: 11, direction: "up",   aiNote: "Annual growth stable. April viral thread remains your best single growth moment." },
  },
};

// Viral Impact
interface ViralEvent {
  date: string;
  growth: number;
  content: string;
  views: string;
  followersGained: number;
  aiNote: string;
}

const viralEvents: Record<FGPlatform, Record<FGRange, ViralEvent>> = {
  instagram: {
    "7 Days":   { date: "Wednesday", growth: 210, content: "AI Tools Reel", views: "120K", followersGained: 180, aiNote: "Growth spike linked to a 45-second AI tools reel. Short hooks under 3s drove 78% completion rate." },
    "30 Days":  { date: "Week 2 Sat", growth: 580, content: "Carousel: 10 Growth Hacks", views: "340K", followersGained: 490, aiNote: "Carousel saved 3.4x more than average. Saves directly correlate to follower conversion on Instagram." },
    "90 Days":  { date: "Month 2 Wed", growth: 1240, content: "Behind-the-scenes Reel", views: "820K", followersGained: 1090, aiNote: "Authentic behind-the-scenes content triggered a share cascade — 8.2K shares led to 1,090 followers." },
    "6 Months": { date: "Month 4 Fri", growth: 2100, content: "Collab Reel w/ @bigcreator", views: "2.1M", followersGained: 1860, aiNote: "Collaboration content has 4.2x higher follower conversion than solo content for your account." },
    "1 Year":   { date: "Q3 Week 1", growth: 3800, content: "Trending Audio Reel", views: "4.4M", followersGained: 3240, aiNote: "Trending audio usage amplified Reel distribution by 6x. Monitor trending audio weekly." },
  },
  youtube: {
    "7 Days":   { date: "Tuesday", growth: 180, content: "How I Edit in 1 Hour Short", views: "88K", followersGained: 152, aiNote: "YouTube Short on editing workflow drove 152 new subs. Educational Shorts convert at 1.7% rate." },
    "30 Days":  { date: "Week 3 Mon", growth: 420, content: "Creator Tech Stack Video", views: "210K", followersGained: 370, aiNote: "Long-form tech stack video had 68% average view duration — highest converting video this month." },
    "90 Days":  { date: "Month 2 Thu", growth: 980, content: "Viral Productivity Short", views: "1.2M", followersGained: 860, aiNote: "Productivity Short hit 1.2M views via Shorts shelf. Subscribe rate from Shorts is 0.07% — above avg." },
    "6 Months": { date: "Month 3 Sat", growth: 1740, content: "AI Tools Full Tutorial", views: "2.4M", followersGained: 1580, aiNote: "AI Tools tutorial series launched in month 3 drove sustained subscriber growth for 6 weeks." },
    "1 Year":   { date: "Q2 Month 5", growth: 3200, content: "Beginner Series Launch", views: "5.1M", followersGained: 2840, aiNote: "Series launch created subscription intent. Playlist completion drives 3.1x higher subscriber rate." },
  },
  twitter: {
    "7 Days":   { date: "Monday", growth: 140, content: "AI Productivity Thread", views: "48K", followersGained: 118, aiNote: "Thread reached 48K impressions via quote-tweets. Top-performing threads have 3+ data points." },
    "30 Days":  { date: "Week 1 Thu", growth: 310, content: "Career advice thread (10 rules)", views: "180K", followersGained: 268, aiNote: "Career content drives 2.4x more follows than tech content for your audience segment." },
    "90 Days":  { date: "Month 2 Tue", growth: 740, content: "Contrarian Tech Opinion Thread", views: "620K", followersGained: 640, aiNote: "Contrarian opinion thread sparked 1,400 replies and reached 620K impressions through amplification." },
    "6 Months": { date: "Month 4 Wed", growth: 1280, content: "10,000 follower milestone thread", views: "940K", followersGained: 1100, aiNote: "Milestone celebration content generates community sharing — a reliable follower acceleration event." },
    "1 Year":   { date: "Q2", growth: 2400, content: "Viral Productivity Breakdown", views: "2.8M", followersGained: 2140, aiNote: "Q2 productivity breakdown was retweeted by 3 accounts > 100K. Network effects drove peak growth." },
  },
};

// Retention Curve
const retentionCurve: Record<FGPlatform, { month: string; retention: number }[]> = {
  instagram: [
    { month: "M1", retention: 100 }, { month: "M2", retention: 91 }, { month: "M3", retention: 84 },
    { month: "M4", retention: 79 }, { month: "M5", retention: 74 }, { month: "M6", retention: 70 },
  ],
  youtube: [
    { month: "M1", retention: 100 }, { month: "M2", retention: 88 }, { month: "M3", retention: 80 },
    { month: "M4", retention: 74 }, { month: "M5", retention: 69 }, { month: "M6", retention: 65 },
  ],
  twitter: [
    { month: "M1", retention: 100 }, { month: "M2", retention: 83 }, { month: "M3", retention: 73 },
    { month: "M4", retention: 65 }, { month: "M5", retention: 59 }, { month: "M6", retention: 54 },
  ],
};

const retentionNote: Record<FGPlatform, string> = {
  instagram: "Retention stable across 6 months at 70%. Reel-acquired followers retain 14% better than story-acquired.",
  youtube: "YouTube retention healthy at 65% over 6 months. Long-form series subscribers retain 22% better than Shorts subscribers.",
  twitter: "Twitter retention at 54% over 6 months is expected given platform churn norms. Daily posting improves this by up to 18%.",
};

// Platform Contribution Matrix
interface PlatformContrib {
  name: string; color: string;
  growth: number; contributionPct: number;
  retention: number; bestDay: string;
}

const platformContrib: Record<FGRange, PlatformContrib[]> = {
  "7 Days":   [
    { name: "Instagram", color: "#EC4899", growth: 720,  contributionPct: 52, retention: 91, bestDay: "Sat" },
    { name: "YouTube",   color: "#F97316", growth: 420,  contributionPct: 31, retention: 87, bestDay: "Wed" },
    { name: "Twitter",   color: "#3B82F6", growth: 240,  contributionPct: 17, retention: 82, bestDay: "Fri" },
  ],
  "30 Days":  [
    { name: "Instagram", color: "#EC4899", growth: 2880, contributionPct: 54, retention: 90, bestDay: "Sat" },
    { name: "YouTube",   color: "#F97316", growth: 1540, contributionPct: 29, retention: 88, bestDay: "Wed" },
    { name: "Twitter",   color: "#3B82F6", growth: 900,  contributionPct: 17, retention: 83, bestDay: "Tue" },
  ],
  "90 Days":  [
    { name: "Instagram", color: "#EC4899", growth: 7200, contributionPct: 56, retention: 89, bestDay: "Sat" },
    { name: "YouTube",   color: "#F97316", growth: 3800, contributionPct: 29, retention: 87, bestDay: "Thu" },
    { name: "Twitter",   color: "#3B82F6", growth: 1900, contributionPct: 15, retention: 81, bestDay: "Tue" },
  ],
  "6 Months": [
    { name: "Instagram", color: "#EC4899", growth: 13200, contributionPct: 57, retention: 89, bestDay: "Sat" },
    { name: "YouTube",   color: "#F97316", growth: 6800,  contributionPct: 29, retention: 86, bestDay: "Wed" },
    { name: "Twitter",   color: "#3B82F6", growth: 3200,  contributionPct: 14, retention: 78, bestDay: "Fri" },
  ],
  "1 Year":   [
    { name: "Instagram", color: "#EC4899", growth: 24000, contributionPct: 58, retention: 86, bestDay: "Sat" },
    { name: "YouTube",   color: "#F97316", growth: 12000, contributionPct: 29, retention: 84, bestDay: "Wed" },
    { name: "Twitter",   color: "#3B82F6", growth: 5200,  contributionPct: 13, retention: 76, bestDay: "Mon" },
  ],
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const formatK = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);

const CardWrap: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)] ${className}`}>
    {children}
  </div>
);

const SectionLabel: React.FC<{ icon: React.ReactNode; title: string; sub: string; gradient?: string }> = ({
  icon, title, sub, gradient = "from-blue-500 to-indigo-600",
}) => (
  <div className="mb-5 flex items-center gap-3">
    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-sm text-white text-sm`}>
      {icon}
    </div>
    <div>
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <p className="text-[11px] text-slate-500">{sub}</p>
    </div>
  </div>
);

const MiniBar: React.FC<{ value: number; max?: number; color: string }> = ({ value, max = 100, color }) => (
  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
    <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
      initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }} />
  </div>
);

const momentumStyles: Record<string, { bg: string; text: string; border: string }> = {
  Weak:         { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-100" },
  Stable:       { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-100" },
  Accelerating: { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-100" },
  Explosive:    { bg: "bg-emerald-50",text: "text-emerald-700",border: "border-emerald-100" },
};

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
const FollowersGrowthPage: React.FC = () => {
  // ── EXISTING state ───────────────────────────
  const [range, setRange] = useState<FGRange>("30 Days");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<FGPlatform, boolean>>({
    instagram: true, youtube: true, twitter: false,
  });

  // ── derived primary platform (first active) for intelligence modules
  const [primaryPlatform, setPrimaryPlatform] = useState<FGPlatform>("instagram");

  // ── LIVE ticking metrics state
  const [liveMetrics, setLiveMetrics] = useState({
    instagram: 12540,
    youtube: 8481,
    twitter: 4507,
    newFollowers: 860,
    unfollowers: 48,
    avgGrowth: {
      instagram: 230,
      youtube: 180,
      twitter: 95,
    },
    growthToday: {
      instagram: 0,
      youtube: 0,
      twitter: 0,
    },
    lastUpdated: new Date()
  });

  // Ticking indicator states for flashing effect
  const [activeTicks, setActiveTicks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveMetrics((prev) => {
        // Platform increments
        const igInc = Math.random() > 0.4 ? (Math.random() > 0.85 ? 2 : 1) : 0;
        const ytInc = Math.random() > 0.6 ? 1 : 0;
        const twInc = Math.random() > 0.7 ? (Math.random() > 0.9 ? -1 : 1) : 0;

        // New followers / unfollowers fluctuations
        const totalNewInc = igInc + ytInc + (twInc > 0 ? twInc : 0);
        const totalUnfInc = (twInc < 0 ? 1 : 0) + (Math.random() > 0.96 ? 1 : 0);

        // Flash indicators
        const ticks: Record<string, boolean> = {};
        if (igInc !== 0) ticks.instagram = true;
        if (ytInc !== 0) ticks.youtube = true;
        if (twInc !== 0) ticks.twitter = true;

        if (Object.keys(ticks).length > 0) {
          setActiveTicks(ticks);
          setTimeout(() => setActiveTicks({}), 850);
        }

        return {
          instagram: prev.instagram + igInc,
          youtube: prev.youtube + ytInc,
          twitter: prev.twitter + twInc,
          newFollowers: prev.newFollowers + totalNewInc,
          unfollowers: prev.unfollowers + totalUnfInc,
          avgGrowth: {
            instagram: prev.avgGrowth.instagram + (Math.random() > 0.97 ? (Math.random() > 0.5 ? 1 : -1) : 0),
            youtube: prev.avgGrowth.youtube + (Math.random() > 0.97 ? (Math.random() > 0.5 ? 1 : -1) : 0),
            twitter: prev.avgGrowth.twitter + (Math.random() > 0.97 ? (Math.random() > 0.5 ? 1 : -1) : 0),
          },
          growthToday: {
            instagram: prev.growthToday.instagram + igInc,
            youtube: prev.growthToday.youtube + ytInc,
            twitter: prev.growthToday.twitter + twInc,
          },
          lastUpdated: new Date()
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const activePlatforms = useMemo(
    () => (Object.entries(selectedPlatforms).filter(([, v]) => v).map(([k]) => k) as FGPlatform[]),
    [selectedPlatforms]
  );

  const togglePlatform = (p: FGPlatform) => {
    setSelectedPlatforms((prev) => ({ ...prev, [p]: !prev[p] }));
    setPrimaryPlatform(p);
  };

  const cycleRange = () => {
    const options: FGRange[] = ["7 Days", "30 Days", "90 Days", "6 Months", "1 Year"];
    const current = options.indexOf(range);
    const next = current === -1 ? 0 : (current + 1) % options.length;
    setRange(options[next]);
  };

  const chartData = useMemo(() => {
    const base = baseLabels.map((label) => ({
      label,
      instagram: followersSeries.instagram[range].find((p) => p.label === label)?.value ?? 0,
      youtube: followersSeries.youtube[range].find((p) => p.label === label)?.value ?? 0,
      twitter: followersSeries.twitter[range].find((p) => p.label === label)?.value ?? 0,
    }));

    if (base.length > 0) {
      const lastIdx = base.length - 1;
      base[lastIdx].instagram += liveMetrics.growthToday.instagram;
      base[lastIdx].youtube += liveMetrics.growthToday.youtube;
      base[lastIdx].twitter += liveMetrics.growthToday.twitter;
    }
    return base;
  }, [range, liveMetrics]);

  const totalFollowers = liveMetrics.instagram + liveMetrics.youtube + liveMetrics.twitter;
  const newFollowers = liveMetrics.newFollowers;
  const highestSpikeDay = "Saturday";
  const unfollowers = liveMetrics.unfollowers;

  const platformComparisonBase = useMemo(() => [
    { key: "instagram" as FGPlatform, name: "Instagram", followers: liveMetrics.instagram, avgDailyGrowth: liveMetrics.avgGrowth.instagram, bestDay: "Jul 12" },
    { key: "youtube" as FGPlatform, name: "YouTube", followers: liveMetrics.youtube, avgDailyGrowth: liveMetrics.avgGrowth.youtube, bestDay: "Sep 15" },
    { key: "twitter" as FGPlatform, name: "Twitter", followers: liveMetrics.twitter, avgDailyGrowth: liveMetrics.avgGrowth.twitter, bestDay: "Jun 3" },
  ], [liveMetrics]);

  // ── INTELLIGENCE computed ────────────────────
  const acq   = useMemo(() => acquisitionData[primaryPlatform][range], [primaryPlatform, range]);
  const unf   = useMemo(() => unfollowData[primaryPlatform][range],    [primaryPlatform, range]);
  const mom   = useMemo(() => momentumData[primaryPlatform][range],    [primaryPlatform, range]);
  const viral = useMemo(() => viralEvents[primaryPlatform][range],     [primaryPlatform, range]);
  const ret   = useMemo(() => retentionCurve[primaryPlatform],         [primaryPlatform]);
  const contrib = useMemo(() => {
    const base = platformContrib[range];
    return base.map(p => {
      const key = p.name.toLowerCase() as FGPlatform;
      const extraGrowth = liveMetrics.growthToday[key] || 0;
      return {
        ...p,
        growth: p.growth + extraGrowth,
      };
    });
  }, [range, liveMetrics]);
  const retNote = useMemo(() => retentionNote[primaryPlatform],        [primaryPlatform]);

  const totalContribGrowth = contrib.reduce((a, c) => a + c.growth, 0);

  // AI Summary bullets
  const aiSummary = useMemo(() => [
    { label: "Growth", value: `+${mom.pct}%`, note: mom.aiNote.split(".")[0] },
    { label: "Main Driver", value: viral.content },
    { label: "Best Platform", value: contrib[0].name },
    { label: "Forecast", value: `+${formatK(Math.round(acq.net * 1.12))} followers` },
    { label: "Risk", value: `${unf.worstDay} unfollow spike` },
    { label: "Retention", value: `${acq.retentionPct}%` },
    { label: "Momentum", value: mom.state },
  ], [mom, viral, contrib, acq, unf]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* ═══════════════════════════════════
            EXISTING: HEADER
        ═══════════════════════════════════ */}
        <div className="rounded-xl bg-white px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Follower Growth Intelligence Center</h1>
            <p className="mt-1 text-sm text-slate-500">Track follower gains, losses, and trends across platforms.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={cycleRange}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
              <span>{range}</span><FiChevronDown className="text-[10px]" />
            </button>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F7] px-3 py-1 text-[11px] font-medium text-slate-600">
              {([{ id: "instagram", label: "Instagram" }, { id: "youtube", label: "YouTube" }, { id: "twitter", label: "Twitter" }] as const).map((p) => {
                const selected = selectedPlatforms[p.id];
                return (
                  <button key={p.id} type="button" onClick={() => togglePlatform(p.id)}
                    className={"px-2.5 py-1 rounded-full transition-colors " + (selected ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-900")}>
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            EXISTING: Main chart
        ═══════════════════════════════════ */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Followers over time</h2>
              <p className="mt-1 text-xs text-slate-500">Visualize follower trends and compare platforms.</p>
            </div>
            <div className="text-xs text-slate-500">Range: <span className="font-semibold text-slate-900">{range}</span></div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="igFG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} /><stop offset="95%" stopColor="#EC4899" stopOpacity={0} /></linearGradient>
                  <linearGradient id="ytFG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F97316" stopOpacity={0.3} /><stop offset="95%" stopColor="#F97316" stopOpacity={0} /></linearGradient>
                  <linearGradient id="twFG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                  formatter={(value: any, _name, props: any) => {
                    const platformKey = props.dataKey as FGPlatform;
                    const label = platformKey === "instagram" ? "Instagram" : platformKey === "youtube" ? "YouTube" : "Twitter";
                    return [`${value.toLocaleString?.() ?? value} followers`, label];
                  }} />
                {activePlatforms.includes("instagram") && <Line type="monotone" dataKey="instagram" name="instagram" stroke="#EC4899" strokeWidth={2.2} dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#EC4899" }} activeDot={{ r: 5 }} />}
                {activePlatforms.includes("youtube") && <Line type="monotone" dataKey="youtube" name="youtube" stroke="#F97316" strokeWidth={2.2} dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#F97316" }} activeDot={{ r: 5 }} />}
                {activePlatforms.includes("twitter") && <Line type="monotone" dataKey="twitter" name="twitter" stroke="#3B82F6" strokeWidth={2.2} dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#3B82F6" }} activeDot={{ r: 5 }} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ═══════════════════════════════════
            EXISTING: Metric cards
        ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{
            key: "total", title: "Total Followers", value: totalFollowers.toLocaleString(), delta: "+12.4%", positive: true, flashing: Object.values(activeTicks).some(Boolean)
          }, {
            key: "new", title: "New Followers", value: newFollowers.toLocaleString(), delta: "+8.1%", positive: true, flashing: Object.values(activeTicks).some(Boolean)
          }, {
            key: "spike", title: "Highest Spike Day", value: highestSpikeDay, delta: "Peak", positive: true, flashing: false
          }, {
            key: "unfollowers", title: "Unfollowers", value: unfollowers === 0 ? "N/A" : `${unfollowers}`, delta: "+1.2%", positive: false, flashing: activeTicks.twitter && liveMetrics.growthToday.twitter < 0
          }].map((card) => (
            <div key={card.key} className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">{card.title}</p>
                  <p className={`mt-2 text-lg font-bold text-slate-900 tabular-nums transition-all duration-500 ${card.flashing ? "text-emerald-600 font-black scale-[1.03] origin-left" : ""}`}>{card.value}</p>
                </div>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] transition-all duration-300 ${card.flashing ? "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" : "bg-slate-100 text-sky-500"}`}>
                  {card.flashing ? "⚡" : "●"}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className={"inline-flex items-center rounded-full px-2 py-0.5 font-semibold " + (card.positive ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600")}>
                  {card.delta}
                </span>
                <span>vs previous period</span>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════
            EXISTING: Spike analysis + AI summary
        ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Follower Spike Analysis</h2>
                <p className="mt-1 text-xs text-slate-500">Identify days with unusual follower activity.</p>
              </div>
              <div className="text-xs text-slate-500">Last 7 days</div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spikeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                    formatter={(value: any, _name, props: any) => {
                      const point = props.payload as SpikePoint;
                      const sign = point.change >= 0 ? "+" : "";
                      return [`${sign}${point.change} followers`, point.reason];
                    }} />
                  <Bar dataKey="change" radius={[6, 6, 0, 0]} fill="#0E5EFF"
                    shape={(props: any) => {
                      const { x, y, width, height, payload } = props;
                      const positive = payload.change >= 0;
                      const color = positive ? "#0E5EFF" : "#EF4444";
                      const topY = positive ? y : y + height;
                      const barHeight = Math.abs(height);
                      return <rect x={x} y={topY} width={width} height={barHeight} rx={6} ry={6} fill={color} />;
                    }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-1 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Most significant spikes</h3>
              <p className="mt-1 text-xs text-slate-500">Key days driving your follower changes.</p>
              <div className="mt-3 space-y-3 text-xs">
                {significantSpikes.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900">{item.date}</p>
                      <p className="text-slate-500">Change: {item.change}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#EFF6FF] p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[12px] font-semibold text-white">AI</div>
                <h3 className="text-sm font-semibold text-slate-900">AI Summary</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <p>Your follower growth increased by <span className="font-semibold">12%</span> this month.</p>
                <p>Most spikes occur between <span className="font-semibold">5 PM – 8 PM</span> on weekdays.</p>
                <p><span className="font-semibold">Instagram</span> is currently your fastest-growing platform.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            EXISTING: Platform comparison table
        ═══════════════════════════════════ */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Platform comparison</h2>
              <p className="mt-1 text-xs text-slate-500">Compare follower totals, growth rate, and best growth days.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs text-slate-600">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-2 pr-4">Platform</th>
                  <th className="py-2 pr-4">Total Followers</th>
                  <th className="py-2 pr-4">Avg Daily Growth</th>
                  <th className="py-2 pr-4">Best Growth Day</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {platformComparisonBase.map((row) => (
                  <tr key={row.key} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">{row.name[0]}</div>
                        <span className="text-slate-900">{row.name}</span>
                      </div>
                    </td>
                    <td className={`py-2 pr-4 text-slate-900 font-medium tabular-nums transition-colors duration-500 ${activeTicks[row.key] ? "text-emerald-600 font-bold" : ""}`}>
                      {row.followers.toLocaleString()}
                    </td>
                    <td className="py-2 pr-4"><span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">+{row.avgDailyGrowth}</span></td>
                    <td className="py-2 pr-4 text-slate-900">{row.bestDay}</td>
                    <td className="py-2 pr-4 text-right">
                      <button type="button" className="inline-flex items-center rounded-full bg-[#008CFF] px-5 py-2.5 text-[11px] font-medium text-white hover:bg-[#0077E6] transition shadow-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            INTELLIGENCE DIVIDER
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 border-t border-slate-200" />
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
            <BsLightningChargeFill className="text-blue-500" />
            FOLLOWER GROWTH INTELLIGENCE CENTER
          </div>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* ─────────────────────────────────────
            INTELLIGENCE PLATFORM SELECTOR NOTE
        ───────────────────────────────────── */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <FiActivity size={12} className="text-blue-400" />
          Intelligence modules showing data for:
          <div className="flex gap-1.5">
            {(["instagram", "youtube", "twitter"] as FGPlatform[]).map((p) => (
              <button key={p} onClick={() => setPrimaryPlatform(p)}
                className={`rounded-full px-3 py-1 capitalize font-medium transition-all ${primaryPlatform === p ? "bg-blue-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {p}
              </button>
            ))}
          </div>
          <span className="ml-1 text-slate-400">· Range: <span className="font-semibold text-slate-600">{range}</span></span>
        </div>

        {/* ═══════════════════════════════════
            NEW SECTION 1: Acquisition Funnel
        ═══════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiUsers />} title="Acquisition vs Loss Funnel" sub={`Follower journey analysis · ${primaryPlatform} · ${range}`} gradient="from-blue-500 to-indigo-600" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Funnel */}
            <div className="flex flex-col items-center gap-2">
              {[
                { label: "New Followers", value: acq.newFollowers, color: "#3b82f6", w: 100 },
                { label: "Retained Followers", value: acq.retained, color: "#10b981", w: 80 },
                { label: "Lost Followers", value: acq.lost, color: "#ef4444", w: 60 },
                { label: "Net Growth", value: acq.net, color: "#6366f1", w: 75 },
              ].map((step, i) => (
                <React.Fragment key={step.label}>
                  <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between rounded-xl px-5 py-3 text-white"
                    style={{ width: `${step.w}%`, backgroundColor: step.color }}>
                    <span className="text-[11px] font-semibold">{step.label}</span>
                    <span className="text-sm font-bold">{step.label === "Net Growth" ? `+${formatK(step.value)}` : formatK(step.value)}</span>
                  </motion.div>
                  {i < 3 && <div className="flex items-center gap-1 text-[10px] text-slate-400"><FiArrowDown size={10} /></div>}
                </React.Fragment>
              ))}
            </div>
            {/* Metrics */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Retention Rate", value: `${acq.retentionPct}%`, color: "#10b981", bg: "bg-emerald-50 border-emerald-100" },
                  { label: "Loss Rate", value: `${acq.lossPct}%`, color: "#ef4444", bg: "bg-red-50 border-red-100" },
                  { label: "Net Growth", value: `+${formatK(acq.net)}`, color: "#6366f1", bg: "bg-purple-50 border-purple-100" },
                  { label: "New Followers", value: formatK(acq.newFollowers), color: "#3b82f6", bg: "bg-blue-50 border-blue-100" },
                ].map((m) => (
                  <div key={m.label} className={`rounded-xl border p-4 ${m.bg}`}>
                    <p className="text-[10px] font-medium text-slate-500 mb-1">{m.label}</p>
                    <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex items-start gap-2.5">
                <BsRobot className="text-blue-500 mt-0.5 shrink-0 text-sm" />
                <p className="text-[11px] text-blue-800 leading-relaxed">{acq.aiNote}</p>
              </div>
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════
            NEW SECTION 2 + 3: Unfollow Intelligence + Momentum (row)
        ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Unfollow Intelligence */}
          <CardWrap>
            <SectionLabel icon={<FiAlertTriangle />} title="Unfollow Intelligence" sub={`Detected unfollow drivers · ${primaryPlatform} · ${range}`} gradient="from-rose-500 to-red-600" />
            <div className="flex items-center gap-4 mb-5 rounded-xl bg-red-50 border border-red-100 p-4">
              <div className="text-center shrink-0">
                <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-1">Worst Day</p>
                <p className="text-base font-bold text-red-700">{unf.worstDay}</p>
                <p className="text-[11px] text-red-600 font-semibold mt-0.5">−{formatK(unf.lost)}</p>
              </div>
              <div className="w-px h-12 bg-red-200 shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Primary Cause</p>
                <p className="text-sm font-bold text-slate-900">{unf.cause}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Contributing Factors</p>
              {unf.causes.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2.5 rounded-lg bg-slate-50 border border-slate-100 px-3.5 py-2.5">
                  <FiArrowDownRight size={13} className="text-rose-400 shrink-0" />
                  <span className="text-xs text-slate-700">{c}</span>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl bg-rose-50 border border-rose-100 p-3.5 flex items-start gap-2.5">
              <BsRobot className="text-rose-500 mt-0.5 shrink-0 text-sm" />
              <p className="text-[11px] text-rose-800 leading-relaxed">{unf.aiNote}</p>
            </div>
          </CardWrap>

          {/* Growth Momentum Meter */}
          <CardWrap>
            <SectionLabel icon={<BsGraphUpArrow />} title="Growth Momentum Meter" sub={`Period-over-period growth comparison · ${primaryPlatform}`} gradient="from-violet-500 to-purple-600" />
            <div className={`rounded-2xl border p-6 mb-5 ${momentumStyles[mom.state].bg} ${momentumStyles[mom.state].border}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Momentum State</p>
                  <p className={`text-2xl font-bold ${momentumStyles[mom.state].text}`}>{mom.state.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">vs Previous Period</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    {mom.direction === "up" ? <FiArrowUpRight className="text-emerald-500 text-lg" /> : <FiArrowDownRight className="text-red-500 text-lg" />}
                    <span className={`text-xl font-bold ${mom.direction === "up" ? "text-emerald-600" : "text-red-600"}`}>
                      {mom.direction === "up" ? "+" : "-"}{mom.pct}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Momentum bar */}
              <div className="h-3 w-full rounded-full bg-white/60 overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ backgroundColor: mom.state === "Weak" ? "#ef4444" : mom.state === "Stable" ? "#f59e0b" : mom.state === "Accelerating" ? "#3b82f6" : "#10b981" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(mom.pct * 2.5, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }} />
              </div>
            </div>
            {/* States legend */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["Weak", "Stable", "Accelerating", "Explosive"].map((s) => (
                <div key={s} className={`rounded-lg border p-2 text-center ${s === mom.state ? `${momentumStyles[s].bg} ${momentumStyles[s].border}` : "bg-slate-50 border-slate-100"}`}>
                  <p className={`text-[9px] font-bold ${s === mom.state ? momentumStyles[s].text : "text-slate-400"}`}>{s}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-violet-50 border border-violet-100 p-3.5 flex items-start gap-2.5">
              <BsRobot className="text-violet-500 mt-0.5 shrink-0 text-sm" />
              <p className="text-[11px] text-violet-800 leading-relaxed">{mom.aiNote}</p>
            </div>
          </CardWrap>
        </div>

        {/* ═══════════════════════════════════
            NEW SECTION 4: Viral Impact Detector
        ═══════════════════════════════════ */}
        <CardWrap className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full opacity-70" />
          <div className="relative z-10">
            <SectionLabel icon={<BsLightningChargeFill />} title="Viral Impact Detector" sub={`Content responsible for follower spikes · ${primaryPlatform} · ${range}`} gradient="from-amber-500 to-orange-600" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Dark card */}
              <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <FiZap className="text-amber-400" />
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">Top Growth Event</span>
                </div>
                <p className="text-sm font-bold leading-snug mb-4">"{viral.content}"</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Date", value: viral.date },
                    { label: "Views", value: viral.views },
                    { label: "Followers Gained", value: `+${viral.followersGained}` },
                    { label: "Net Growth Day", value: `+${viral.growth}` },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{m.label}</span>
                      <span className="font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Analysis */}
              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Follower Conversion", value: `${((viral.followersGained / parseInt(viral.views)) * 100).toFixed(2)}%`, bg: "bg-amber-50 border-amber-100", color: "text-amber-700" },
                    { label: "Growth Multiplier", value: `${(viral.growth / 50).toFixed(1)}x`, bg: "bg-blue-50 border-blue-100", color: "text-blue-700" },
                    { label: "Platform", value: primaryPlatform.charAt(0).toUpperCase() + primaryPlatform.slice(1), bg: "bg-slate-50 border-slate-200", color: "text-slate-700" },
                    { label: "Spike Magnitude", value: `Top ${viral.growth > 500 ? "1" : viral.growth > 200 ? "5" : "10"}%`, bg: "bg-purple-50 border-purple-100", color: "text-purple-700" },
                  ].map((m) => (
                    <div key={m.label} className={`rounded-xl border p-3.5 ${m.bg}`}>
                      <p className="text-[10px] font-medium text-slate-500 mb-1">{m.label}</p>
                      <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex items-start gap-2.5">
                  <BsRobot className="text-amber-600 mt-0.5 shrink-0 text-sm" />
                  <p className="text-[11px] text-amber-900 leading-relaxed">{viral.aiNote}</p>
                </div>
              </div>
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════
            NEW SECTION 5: Retention Curve
        ═══════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiTarget />} title="Audience Retention Curve" sub={`% of acquired followers still following over time · ${primaryPlatform}`} gradient="from-emerald-500 to-teal-600" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ret} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 12 }} formatter={(v: any) => [`${v}%`, "Retention"]} />
                  <Area type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={2.5} fill="url(#retGrad)"
                    dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Month Breakdown</p>
              {ret.map((m, i) => (
                <div key={m.month}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">{m.month}</span>
                    <span className="text-xs font-bold text-slate-900">{m.retention}%</span>
                  </div>
                  <MiniBar value={m.retention} color={m.retention > 85 ? "#10b981" : m.retention > 70 ? "#3b82f6" : "#f59e0b"} />
                </div>
              ))}
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3 flex items-start gap-2">
                <BsStars className="text-emerald-500 shrink-0 mt-0.5 text-sm" />
                <p className="text-[10px] text-emerald-800 leading-relaxed">{retNote}</p>
              </div>
            </div>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════
            NEW SECTION 6: Platform Contribution Matrix
        ═══════════════════════════════════ */}
        <CardWrap>
          <SectionLabel icon={<FiAward />} title="Platform Contribution Matrix" sub={`Which platform drives your follower growth · ${range}`} gradient="from-sky-500 to-blue-600" />
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Platform", "Net Growth", "Contribution", "Retention", "Best Day", "Share"].map((h) => (
                    <th key={h} className={`pb-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide ${h === "Share" || h === "Net Growth" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {contrib.map((row, i) => (
                    <motion.tr key={`${row.name}-${range}`}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                          <span className="font-semibold text-slate-800">{row.name}</span>
                          {i === 0 && <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">Top</span>}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="text-sm font-bold text-emerald-600">+{formatK(row.growth)}</span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-24">
                            <MiniBar value={row.contributionPct} color={row.color} />
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{row.contributionPct}%</span>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${row.retention > 88 ? "bg-emerald-50 text-emerald-700" : row.retention > 82 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                          {row.retention}%
                        </span>
                      </td>
                      <td className="py-3.5 text-xs font-medium text-slate-700">{row.bestDay}</td>
                      <td className="py-3.5 text-right">
                        <span className="text-xs font-bold text-slate-500">{formatK(row.growth)} / {formatK(totalContribGrowth)}</span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl bg-sky-50 border border-sky-100 p-3.5 flex items-start gap-2.5">
            <BsRobot className="text-sky-500 mt-0.5 shrink-0 text-sm" />
            <p className="text-[11px] text-sky-800 leading-relaxed">
              <span className="font-semibold">{contrib[0].name}</span> drives {contrib[0].contributionPct}% of your total follower growth this {range.toLowerCase()}.
              {contrib[0].name === "Instagram"
                ? " Double down on Reels to maintain this lead."
                : contrib[0].name === "YouTube"
                ? " Upload Shorts consistently to maintain YouTube's top position."
                : " Publish daily threads to sustain Twitter growth momentum."}
            </p>
          </div>
        </CardWrap>

        {/* ═══════════════════════════════════
            NEW SECTION 7: AI Intelligence Summary
        ═══════════════════════════════════ */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm text-white text-sm">
                <BsRobot />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">AI Growth Intelligence Summary</h2>
                <p className="text-[11px] text-slate-500">Dynamically generated from your follower data · {primaryPlatform} · {range}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <motion.div className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }} />
              Live · Updated now
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aiSummary.map((item, i) => (
              <motion.div key={`${primaryPlatform}-${range}-${i}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">{item.label}</p>
                <p className="text-sm font-bold text-slate-900 mb-1">{item.value}</p>
                {item.note && <p className="text-[10px] text-slate-500 leading-relaxed">{item.note}</p>}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { icon: <FiTrendingUp className="text-blue-500" />, bg: "bg-blue-50 border-blue-100", text: `${contrib[0].name} currently drives the majority of your follower growth at ${contrib[0].contributionPct}% contribution.` },
              { icon: <BsLightningChargeFill className="text-amber-500" />, bg: "bg-amber-50 border-amber-100", text: `Follower spikes originate from ${viral.content}. Replicate this content format to trigger growth events.` },
              { icon: <FiActivity className="text-emerald-500" />, bg: "bg-emerald-50 border-emerald-100", text: `Retention on ${primaryPlatform} is ${acq.retentionPct}% for ${range}. ${acq.retentionPct > 88 ? "Excellent retention — your content creates lasting audience loyalty." : "Improving posting consistency could push retention above 90%."}` },
              { icon: <BsGraphUpArrow className="text-violet-500" />, bg: "bg-violet-50 border-violet-100", text: `Growth momentum is ${mom.state.toLowerCase()} at ${mom.direction === "up" ? "+" : "-"}${mom.pct}% vs previous period. ${mom.aiNote}` },
            ].map((insight, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                className={`rounded-2xl border p-4 flex items-start gap-3 hover:shadow-sm transition-shadow ${insight.bg}`}>
                <div className="mt-0.5 shrink-0 text-sm">{insight.icon}</div>
                <p className="text-[11px] text-slate-700 leading-relaxed">{insight.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <FiCpu size={10} />
            <span>Insights computed from follower history · Growth Intelligence Engine · {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
};

export default FollowersGrowthPage;
