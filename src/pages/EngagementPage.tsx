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
} from "recharts";

import { FiChevronDown } from "react-icons/fi";

// Types

type Platform = "instagram" | "youtube" | "twitter";
type Range = "1 Day" | "7 Days" | "30 Days" | "90 Days" | "1 Year";
type Interval = "daily" | "weekly" | "monthly";

interface TimePoint {
  label: string;
  value: number;
}

interface MetricBreakdownPoint {
  period: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

// Sample datasets per platform / range / interval

const baseSeries: TimePoint[] = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 150 },
  { label: "Wed", value: 180 },
  { label: "Thu", value: 170 },
  { label: "Fri", value: 210 },
  { label: "Sat", value: 260 },
  { label: "Sun", value: 240 },
];

const scaleSeries = (multiplier: number): TimePoint[] =>
  baseSeries.map((p, idx) => ({
    label: p.label,
    value: Math.round(p.value * multiplier * (0.8 + idx * 0.05)),
  }));

const lineData: Record<Platform, Record<Interval, TimePoint[]>> = {
  instagram: {
    daily: baseSeries,
    weekly: scaleSeries(1.2),
    monthly: scaleSeries(1.6),
  },
  youtube: {
    daily: scaleSeries(0.9),
    weekly: scaleSeries(1.1),
    monthly: scaleSeries(1.4),
  },
  twitter: {
    daily: scaleSeries(0.7),
    weekly: scaleSeries(0.9),
    monthly: scaleSeries(1.1),
  },
};

// Metric breakdown dataset

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

// Top posts placeholder

const topPosts = [
  {
    id: 1,
    platform: "Instagram",
    title: "Behind the scenes of my latest reel",
    thumbColor: "bg-gradient-to-tr from-pink-500 to-yellow-400",
    score: 94,
    likes: 12450,
    comments: 742,
  },
  {
    id: 2,
    platform: "YouTube",
    title: "How I script & shoot in one day",
    thumbColor: "bg-red-500",
    score: 91,
    likes: 18420,
    comments: 988,
  },
  {
    id: 3,
    platform: "Twitter",
    title: "Thread: My 10 content workflows",
    thumbColor: "bg-slate-800",
    score: 88,
    likes: 6420,
    comments: 380,
  },
  {
    id: 4,
    platform: "Instagram",
    title: "Day in the life of a creator",
    thumbColor: "bg-indigo-500",
    score: 86,
    likes: 10230,
    comments: 512,
  },
];

// Metric cards config

const metricsConfig = [
  { key: "likes", label: "Likes", color: "#2563EB" },
  { key: "comments", label: "Comments", color: "#10B981" },
  { key: "shares", label: "Shares", color: "#F59E0B" },
  { key: "saves", label: "Saves", color: "#6366F1" },
  { key: "views", label: "Views", color: "#EC4899" },
] as const;

const EngagementPage: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [range, setRange] = useState<Range>("30 Days");
  const [interval, setInterval] = useState<Interval>("daily");

  const mainSeries = useMemo(() => lineData[platform][interval], [platform, interval]);
  const breakdown = useMemo(() => breakdownData[platform], [platform]);

  const handleRangeClick = () => {
    const options: Range[] = ["1 Day", "7 Days", "30 Days", "90 Days", "1 Year"]; 
    const current = options.indexOf(range);
    const next = current === -1 ? 0 : (current + 1) % options.length;
    setRange(options[next]);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="rounded-xl bg-white px-6 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.05)] flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Engagement Analytics</h1>
            <p className="mt-1 text-sm text-slate-500">Deep insights into post performance across all platforms.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRangeClick}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              <span>{range}</span>
              <FiChevronDown className="text-[10px]" />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.35)]"
            >
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.35)]"
            >
              <span>Export PNG</span>
            </button>
          </div>
        </div>

        {/* Tabs + Interval filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F6F7] px-2 py-1">
            {([
              { id: "instagram", label: "Instagram" },
              { id: "youtube", label: "YouTube" },
              { id: "twitter", label: "Twitter" },
            ] as const).map((p) => {
              const selected = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
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

          <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            {([
              { id: "daily", label: "Daily" },
              { id: "weekly", label: "Weekly" },
              { id: "monthly", label: "Monthly" },
            ] as const).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setInterval(f.id)}
                className={
                  "px-3 py-1 rounded-full " +
                  (interval === f.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900")
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main line chart card */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Engagement over time</h2>
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
                <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2.4}
                  dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#2563EB" }}
                  activeDot={{ r: 5 }}
                  fill="url(#engGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric breakdown cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metricsConfig.map((metric) => (
            <div
              key={metric.key}
              className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {metric.key === "views" ? "120.4K" : "24.5K"}
                  </p>
                </div>
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: metric.key === "shares" ? "#FEF3C7" : "#ECFDF3",
                    color: metric.key === "shares" ? "#C2410C" : "#15803D",
                  }}
                >
                  +12.4%
                </span>
              </div>

              <div className="mt-3 h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mainSeries}>
                    <XAxis dataKey="label" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ display: "none" }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metric.color}
                      strokeWidth={1.6}
                      dot={false}
                      isAnimationActive
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced breakdown + Top posts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Engagement breakdown chart */}
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Engagement breakdown</h2>
                <p className="mt-1 text-xs text-slate-500">Distribution of likes, comments, shares and saves by month.</p>
              </div>
              <div className="text-xs text-slate-500">Last 4 months</div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown} stackOffset="none" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                  />
                  <Bar dataKey="likes" stackId="a" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="comments" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="shares" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="saves" stackId="a" fill="#6366F1" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top posts */}
          <div className="col-span-2 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Top performing posts</h2>
                <p className="mt-1 text-xs text-slate-500">Posts with the highest engagement score in the selected range.</p>
              </div>
              <div className="text-xs text-slate-500">Scroll to explore</div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {topPosts.map((post) => (
                <div
                  key={post.id}
                  className="min-w-[220px] flex-shrink-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-14 w-14 rounded-xl ${post.thumbColor}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{post.title}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{post.platform}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      <p>Engagement score</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">{post.score}/100</p>
                    </div>
                    <div className="text-right">
                      <p>Likes · Comments</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">
                        {post.likes.toLocaleString()} · {post.comments.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    View post
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementPage;
