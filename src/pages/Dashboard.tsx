import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "recharts";

import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

import {
  FiBell,
  FiClock,
  FiSend,
  FiCheckSquare,
  FiChevronDown,
  FiEdit3,
  FiMail,
  FiBriefcase,
  FiTwitter as FiTwitterIcon,
  FiInstagram as FiInstagramIcon,
  FiYoutube as FiYoutubeIcon,
  FiHeadphones,
  FiShare2,
} from "react-icons/fi";

import profileAvatar from "../assets/profile-avatar.png";
import youtubeLogo from "../assets/youtube.png";
import instaLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";

import Dock from "../components/Dock";

// ----------------------------
// Sample Chart Data
// ----------------------------
const sampleSeries = [
  { date: "Mar", value: 10000 },
  { date: "Apr", value: 12000 },
  { date: "May", value: 13000 },
  { date: "Jun", value: 12500 },
  { date: "Jul", value: 14000 },
  { date: "Aug", value: 16000 },
];

// ----------------------------
// Active Promotion: mock bar data per platform + range
// ----------------------------
type PromotionPlatform = "instagram" | "youtube" | "twitter";
type PromotionRange = "1 Day" | "30 Days" | "90 Days";

interface PromoBarPoint {
  hour: string;
  value: number;
}

const promoBarData: Record<PromotionPlatform, Record<PromotionRange, PromoBarPoint[]>> = {
  instagram: {
    "1 Day": [
      { hour: "13", value: 22000 },
      { hour: "14", value: 34000 },
      { hour: "15", value: 48000 },
      { hour: "16", value: 52000 },
      { hour: "17", value: 46000 },
      { hour: "18", value: 41000 },
      { hour: "19", value: 39000 },
      { hour: "20", value: 42000 },
    ],
    "30 Days": [
      { hour: "13", value: 28000 },
      { hour: "14", value: 36000 },
      { hour: "15", value: 51000 },
      { hour: "16", value: 54000 },
      { hour: "17", value: 50000 },
      { hour: "18", value: 47000 },
      { hour: "19", value: 43000 },
      { hour: "20", value: 45000 },
    ],
    "90 Days": [
      { hour: "13", value: 32000 },
      { hour: "14", value: 38000 },
      { hour: "15", value: 52000 },
      { hour: "16", value: 56000 },
      { hour: "17", value: 52000 },
      { hour: "18", value: 49000 },
      { hour: "19", value: 46000 },
      { hour: "20", value: 48000 },
    ],
  },
  youtube: {
    "1 Day": [
      { hour: "13", value: 18000 },
      { hour: "14", value: 26000 },
      { hour: "15", value: 36000 },
      { hour: "16", value: 40000 },
      { hour: "17", value: 37000 },
      { hour: "18", value: 34000 },
      { hour: "19", value: 31000 },
      { hour: "20", value: 33000 },
    ],
    "30 Days": [
      { hour: "13", value: 20000 },
      { hour: "14", value: 29000 },
      { hour: "15", value: 38000 },
      { hour: "16", value: 42000 },
      { hour: "17", value: 39000 },
      { hour: "18", value: 36000 },
      { hour: "19", value: 33000 },
      { hour: "20", value: 35000 },
    ],
    "90 Days": [
      { hour: "13", value: 23000 },
      { hour: "14", value: 31000 },
      { hour: "15", value: 40000 },
      { hour: "16", value: 44000 },
      { hour: "17", value: 41000 },
      { hour: "18", value: 38000 },
      { hour: "19", value: 36000 },
      { hour: "20", value: 38000 },
    ],
  },
  twitter: {
    "1 Day": [
      { hour: "13", value: 14000 },
      { hour: "14", value: 20000 },
      { hour: "15", value: 26000 },
      { hour: "16", value: 30000 },
      { hour: "17", value: 28000 },
      { hour: "18", value: 25000 },
      { hour: "19", value: 23000 },
      { hour: "20", value: 24000 },
    ],
    "30 Days": [
      { hour: "13", value: 17000 },
      { hour: "14", value: 23000 },
      { hour: "15", value: 29000 },
      { hour: "16", value: 32000 },
      { hour: "17", value: 30000 },
      { hour: "18", value: 27000 },
      { hour: "19", value: 25000 },
      { hour: "20", value: 26000 },
    ],
    "90 Days": [
      { hour: "13", value: 19000 },
      { hour: "14", value: 25000 },
      { hour: "15", value: 31000 },
      { hour: "16", value: 34000 },
      { hour: "17", value: 32000 },
      { hour: "18", value: 29000 },
      { hour: "19", value: 27000 },
      { hour: "20", value: 28000 },
    ],
  },
};

// ----------------------------
// Heatmaps (Most active time) - GitHub-style 7 x 21 grid per platform
// ----------------------------
type HeatLevel = 0 | 1 | 2 | 3 | 4;

type HeatmapGrid = HeatLevel[][]; // [rows][cols] => 7 x N

const instagramHeatmap: HeatmapGrid = [
  [0, 0, 1, 2, 1, 0, 0, 1, 2, 3, 4, 3, 2, 1, 1, 0, 0, 1, 2, 2, 1],
  [0, 1, 1, 2, 2, 1, 0, 1, 3, 4, 4, 3, 2, 2, 1, 0, 1, 2, 3, 2, 1],
  [0, 1, 2, 3, 3, 2, 1, 2, 3, 4, 4, 4, 3, 2, 2, 1, 1, 3, 4, 3, 2],
  [0, 0, 1, 2, 3, 2, 1, 1, 2, 3, 4, 3, 2, 2, 1, 1, 0, 2, 3, 2, 1],
  [0, 0, 1, 1, 2, 1, 0, 0, 1, 2, 3, 2, 1, 1, 0, 0, 0, 1, 2, 1, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
];

const youtubeHeatmap: HeatmapGrid = [
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 2, 2, 2, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 1, 2, 3, 3, 2, 2, 1, 1, 0, 1, 2, 2, 1, 0],
  [0, 1, 1, 2, 2, 2, 1, 1, 3, 3, 4, 3, 2, 2, 1, 1, 1, 2, 3, 2, 1],
  [0, 1, 1, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1],
  [0, 0, 1, 1, 2, 1, 0, 0, 1, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
];

const twitterHeatmap: HeatmapGrid = [
  [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 2, 2, 1, 0, 1, 2, 3, 2, 2, 1, 1, 0, 1, 2, 2, 1, 0],
  [0, 1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1],
  [0, 0, 1, 1, 2, 1, 1, 0, 1, 2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
];

const heatLevelToColor = (level: HeatLevel): string => {
  // 0 = empty, 1-4 = increasing blue intensity
  switch (level) {
    case 0:
      return "#EEF2FF"; // very light
    case 1:
      return "#DBEAFE";
    case 2:
      return "#BFDBFE";
    case 3:
      return "#60A5FA";
    case 4:
    default:
      return "#1D4ED8"; // strongest blue
  }
};

// ----------------------------
// TYPES
// ----------------------------
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

interface PlatformCardProps {
  logo: string;
  platform: string;
  followers: string;
  delta: string;
  comments: string;
  likes: string;
}

interface CardShellProps {
  className?: string;
  children: React.ReactNode;
}

// ----------------------------
// CardShell - wrapper for content cards
// ----------------------------
const CardShell: React.FC<CardShellProps> = ({ className = "", children }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] ${className}`}
    >
      {children}
    </div>
  );
};

// ----------------------------
// SectionHeader
// ----------------------------
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, right }) => (
  <div className="mb-4 flex items-start justify-between gap-4">
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-1 text-[12px] text-slate-500">{subtitle}</p>}
    </div>

    {right && <div className="flex items-center gap-2 text-xs text-slate-500">{right}</div>}
  </div>
);

// ----------------------------
// PlatformCard
// ----------------------------
const PlatformCard: React.FC<PlatformCardProps> = ({ logo, platform, followers, delta, comments, likes }) => (
  <div className="flex flex-col rounded-2xl bg-white px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-slate-100">
    <div className="flex items-center gap-3">
      <img src={logo} alt={platform} className="h-8 w-8 object-contain" />
      <span className="text-sm font-semibold text-slate-900">{platform}</span>
    </div>

    <div className="mt-4 flex items-baseline gap-2">
      <div className="text-2xl font-bold text-slate-900">{followers}</div>
      <span className="inline-flex items-center rounded-full bg-[#E5F2FF] px-2.5 py-0.5 text-[11px] font-semibold text-sky-600">
        {delta}
      </span>
    </div>

    <p className="mt-1 text-xs text-slate-500">Subscribers</p>

    <div className="mt-4 flex justify-between text-xs text-slate-600">
      <div>
        <p className="text-slate-500">Comments</p>
        <p className="mt-1 font-semibold text-slate-900">{comments}</p>
      </div>
      <div>
        <p className="text-slate-500">Likes</p>
        <p className="mt-1 font-semibold text-slate-900">{likes}</p>
      </div>
    </div>
  </div>
);

// ----------------------------
// Small dropdown mimic (1 Day pill)
// ----------------------------
const Dropdown: React.FC<{
  value: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => {
  const [firstLine, ...rest] = value.split(" ");
  const secondLine = rest.join(" ");

  const handleClick = () => {
    if (!options || options.length === 0) return;
    const currentIndex = options.indexOf(value);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % options.length;
    onChange(options[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex flex-col items-center justify-center rounded-full bg-[#F5F6F7] px-4 py-1.5 text-[11px] font-medium text-slate-700 shadow-[0_0_0_1px_rgba(148,163,184,0.25)] hover:shadow-[0_0_0_1px_rgba(148,163,184,0.4)] transition-shadow"
    >
      <span className="leading-tight">{firstLine}</span>
      <span className="mt-0.5 flex items-center gap-1 leading-tight text-[10px] text-slate-600">
        <span>{secondLine}</span>
        <span className="text-[8px] text-slate-400">
          <FiChevronDown />
        </span>
      </span>
    </button>
  );
};

// ----------------------------
// MAIN DASHBOARD
// ----------------------------
export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [aiOpen, setAiOpen] = useState(false);
  const [metric, setMetric] = useState<"followers" | "engagement" | "reach" | "impressions">("followers");
  const [range, setRange] = useState<PromotionRange>("1 Day");
  const [engRange, setEngRange] = useState<"1 Day" | "30 Days">("1 Day");
  const [heatmapPlatform, setHeatmapPlatform] = useState<PromotionPlatform>("instagram");
  const [activePromoPlatform, setActivePromoPlatform] = useState<PromotionPlatform>("instagram");
  const [overviewRange, setOverviewRange] = useState<"1 Day" | "7 Days" | "30 Days" | "90 Days">("30 Days");
  const dockItems = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => navigate("/") },
    { icon: <VscArchive size={18} />, label: "Insights", onClick: () => navigate("/insights") },
    { icon: <VscAccount size={18} />, label: "Profile", onClick: () => navigate("/profile") },
    { icon: <VscSettingsGear size={18} className="rotate-90" />, label: "Settings", onClick: () => navigate("/settings") },
  ];

  // derived metrics
  const followersCount = useMemo(() => 35543, []);
  const followersDelta = useMemo(() => "+1800", []);
  const spending = useMemo(() => "₹5,000", []);
  const reach = useMemo(() => "1.5L", []);

  const activePromoBars = promoBarData[activePromoPlatform][range];

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-slate-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex w-full items-center justify-between px-6 py-4">
            <div className="flex w-full items-center gap-6">
              <div className="w-full max-w-2xl">
                <div className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2.5">
                  <span className="text-slate-400 text-sm">🔍</span>
                  <input placeholder="Search post, image or content" className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none" />
                </div>
              </div>

              <div className="ml-auto hidden items-center gap-5 lg:flex text-xs font-medium text-slate-600">
                <button className="flex items-center gap-2 hover:text-slate-900 transition-colors"><FiClock size={16} /> Set Reminder</button>
                <button className="flex items-center gap-2 hover:text-slate-900 transition-colors"><FiSend size={16} /> Schedule Post</button>
                <button className="flex items-center gap-2 hover:text-slate-900 transition-colors"><FiCheckSquare size={16} /> To-do list</button>
              </div>
            </div>

            <div className="ml-6 flex items-center gap-3">
              <button onClick={() => setAiOpen(true)} className="hidden items-center gap-2 rounded-full bg-sky-500 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] transition-shadow md:inline-flex">AI</button>

              <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                <FiBell size={18} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">12</span>
              </button>

              <div
                className="ml-2 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100"
              >
                <img src={profileAvatar} alt="User profile" className="h-9 w-9 object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <main className="flex-1 px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT COLUMN (8) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Overview: header + accounts + top post + summary stats */}
              <CardShell className="p-6">
                {/* Overview header */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Overview</h3>
                    <p className="mt-1 text-xs text-slate-500">SaaS analytics snapshot for your connected accounts</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                      <span className="text-slate-500">Range</span>
                      <button
                        type="button"
                        onClick={() => {
                          const options: ("1 Day" | "7 Days" | "30 Days" | "90 Days")[] = ["1 Day", "7 Days", "30 Days", "90 Days"];
                          const currentIndex = options.indexOf(overviewRange);
                          const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % options.length;
                          setOverviewRange(options[nextIndex]);
                        }}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-700 shadow-sm"
                      >
                        <span>{overviewRange}</span>
                        <FiChevronDown className="text-[10px]" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Last refreshed</div>
                      <div className="text-[11px] font-medium text-slate-600">20 sec ago</div>
                    </div>
                  </div>
                </div>

                {/* Connected accounts + Top post */}
                <div className="mt-6 grid grid-cols-12 gap-4">
                  {/* Platform cards (3 cols) */}
                  <div className="col-span-12 md:col-span-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[{
                      logo: youtubeLogo,
                      platform: "YouTube",
                    }, {
                      logo: twitterLogo,
                      platform: "Twitter",
                    }, {
                      logo: instaLogo,
                      platform: "Instagram",
                    }].map((item) => (
                      <button
                        key={item.platform}
                        type="button"
                        className="group text-left focus:outline-none"
                      >
                        <div className="flex flex-col rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition-transform group-hover:-translate-y-0.5">
                          <div className="flex items-center gap-3">
                            <img src={item.logo} alt={item.platform} className="h-8 w-8 object-contain" />
                            <span className="text-sm font-semibold text-slate-900">{item.platform}</span>
                          </div>

                          <div className="mt-4 flex items-baseline gap-2">
                            <div className="text-2xl font-bold text-slate-900">8,481</div>
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                              +8,481
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-slate-500">Subscribers</p>

                          <div className="mt-4 flex justify-between text-xs text-slate-600">
                            <div>
                              <p className="text-slate-500">Comments</p>
                              <p className="mt-1 font-semibold text-slate-900">4,507</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Likes</p>
                              <p className="mt-1 font-semibold text-slate-900">1,254,58</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Top Performing Post (1 wide card) */}
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Top Performing Post</h4>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">+145% ER</span>
                      </div>

                      <div className="mt-3 flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200" />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-sm font-semibold text-slate-900">How I edit my videos faster</p>
                          <p className="mt-1 text-[11px] text-slate-500">Instagram Reels · 24.5k views</p>
                          <p className="mt-1 text-[11px] text-slate-500">Engagement score: <span className="font-semibold text-slate-900">92/100</span></p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(56,189,248,0.35)] hover:bg-sky-600"
                      >
                        View performance
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary stats row */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                  {[{
                    label: "Total Followers",
                    value: followersCount.toLocaleString(),
                  }, {
                    label: "Engagement Rate",
                    value: "6.8%",
                  }, {
                    label: "Monthly Growth",
                    value: "+18.4%",
                  }, {
                    label: "Total Posts",
                    value: "1,245",
                  }].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] text-slate-500">{stat.label}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{stat.value}</p>
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] text-sky-500">
                          ●
                        </div>
                      </div>

                      <div className="mt-2 h-10 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={sampleSeries}>
                            <XAxis dataKey="date" hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ display: "none" }} />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#2563EB"
                              strokeWidth={1.8}
                              dot={false}
                              isAnimationActive
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </CardShell>

              {/* Engagement Chart */}
              <CardShell className="p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Engagement</h3>
                    <p className="mt-1 text-xs text-slate-500">Performance across channels</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                      <button className="px-3 py-1.5 rounded-full bg-white text-xs font-medium text-sky-600 shadow-sm">Instagram</button>
                      <button className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900">Youtube</button>
                      <button className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900">Twitter</button>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
                    >
                      <span className="text-xs">⟳</span>
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sampleSeries} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2D7FF9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2D7FF9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>

                      <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px" }}
                        labelStyle={{ color: "#1E293B" }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2563EB" 
                        fill="url(#colorEng)" 
                        strokeWidth={2.5}
                        dot={{ fill: "#2563EB", r: 4, strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 6 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div>Most recent increase <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">+16,487</span></div>
                  <div>Refreshed 20 sec ago</div>
                </div>
              </CardShell>
            </div>

            {/* RIGHT COLUMN (4) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Active Promotion */}
              <CardShell className="p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Active Promotion</h3>
                    <p className="mt-1 text-xs text-slate-500">Ad performance summary</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F6F7] p-1">
                      {([
                        { id: "instagram", label: "Instagram" },
                        { id: "youtube", label: "Youtube" },
                        { id: "twitter", label: "Twitter" },
                      ] as const).map((p) => {
                        const selected = activePromoPlatform === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setActivePromoPlatform(p.id)}
                            className={
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
                              (selected
                                ? "bg-white text-sky-600 shadow-sm"
                                : "text-slate-600 hover:text-slate-900")
                            }
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs"
                    >
                      ⟳
                    </button>
                  </div>
                </div>

                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activePromoBars} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                      <XAxis
                        dataKey="hour"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94A3B8", fontSize: 11 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94A3B8", fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                        labelStyle={{ color: "#1E293B" }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}
                        fill={
                          activePromoPlatform === "instagram"
                            ? "#2563EB"
                            : activePromoPlatform === "youtube"
                            ? "#38BDF8"
                            : "#60A5FA"
                        }
                        barSize={18}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500">Followers</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-lg font-bold text-slate-900">
                        {followersCount.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                        {followersDelta}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">In last 2 hr</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Spending</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{spending}</p>
                    <span className="mt-1 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                      3 days left
                    </span>
                  </div>

                  <div>
                    <p className="text-slate-500">Reach</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{reach}</p>
                    <p className="mt-1 text-xs text-slate-500">account reached</p>
                  </div>
                </div>
              </CardShell>

              {/* Most active Time */}
              <CardShell className="p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Most active Time</h3>
                    <p className="mt-1 text-xs text-slate-500">Activity heatmap</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                      {([
                        { id: "instagram", label: "Instagram" },
                        { id: "youtube", label: "Youtube" },
                        { id: "twitter", label: "Twitter" },
                      ] as const).map((p) => {
                        const selected = heatmapPlatform === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setHeatmapPlatform(p.id)}
                            className={
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
                              (selected
                                ? "bg-white text-sky-600 shadow-sm"
                                : "text-slate-600 hover:text-slate-900")
                            }
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#F7F9FC] p-3">
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${instagramHeatmap[0].length}, minmax(0, 1fr))` }}
                  >
                    {(heatmapPlatform === "instagram"
                      ? instagramHeatmap
                      : heatmapPlatform === "youtube"
                      ? youtubeHeatmap
                      : twitterHeatmap
                    ).map((row, rIndex) =>
                      row.map((level, cIndex) => (
                        <div
                          key={`${rIndex}-${cIndex}`}
                          className="w-3 h-3 rounded-[2px]"
                          style={{ backgroundColor: heatLevelToColor(level) }}
                        />
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-500">Most active time</p>
                    <p className="mt-1 font-semibold text-slate-900">12:00 PM - 1:45 PM</p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-500">Engagements</p>
                    <p className="mt-1 font-semibold text-slate-900">14,487</p>
                  </div>
                </div>
              </CardShell>
            </div>
          </div>
        </main>
      </div>

      {/* AI Drawer */}
      {aiOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setAiOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-96 border-l border-slate-100 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">AI Assistant</h3>
              <button onClick={() => setAiOpen(false)} className="text-sm text-slate-600 hover:text-slate-900">Close</button>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Suggestions, prompts and quick actions will appear here.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
