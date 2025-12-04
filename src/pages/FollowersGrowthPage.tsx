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

type FGPlatform = "instagram" | "youtube" | "twitter";
type FGRange = "7 Days" | "30 Days" | "90 Days" | "6 Months" | "1 Year";

type FGPoint = { label: string; value: number };

type SpikePoint = { label: string; change: number; reason: string };

// Base time labels for simplicity
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

// Spike analysis data (per day change)

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

// Comparison table data

const platformComparison = [
  {
    key: "instagram" as FGPlatform,
    name: "Instagram",
    followers: 12540,
    avgDailyGrowth: 230,
    bestDay: "Jul 12",
  },
  {
    key: "youtube" as FGPlatform,
    name: "YouTube",
    followers: 8481,
    avgDailyGrowth: 180,
    bestDay: "Sep 15",
  },
  {
    key: "twitter" as FGPlatform,
    name: "Twitter",
    followers: 4507,
    avgDailyGrowth: 95,
    bestDay: "Jun 3",
  },
];

const FollowersGrowthPage: React.FC = () => {
  const [range, setRange] = useState<FGRange>("30 Days");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<FGPlatform, boolean>>({
    instagram: true,
    youtube: true,
    twitter: false,
  });

  const activePlatforms = useMemo(
    () => (Object.entries(selectedPlatforms).filter(([, v]) => v).map(([k]) => k) as FGPlatform[]),
    [selectedPlatforms]
  );

  const togglePlatform = (p: FGPlatform) => {
    setSelectedPlatforms((prev) => ({ ...prev, [p]: !prev[p] }));
  };

  const cycleRange = () => {
    const options: FGRange[] = ["7 Days", "30 Days", "90 Days", "6 Months", "1 Year"]; 
    const current = options.indexOf(range);
    const next = current === -1 ? 0 : (current + 1) % options.length;
    setRange(options[next]);
  };

  const totalFollowers = 12540 + 8481 + 4507;
  const newFollowers = 860; // placeholder
  const highestSpikeDay = "Saturday";
  const unfollowers = 0;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER SECTION */}
        <div className="rounded-xl bg-white px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Followers Growth</h1>
            <p className="mt-1 text-sm text-slate-500">Track follower gains, losses, and trends across platforms.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Range selector */}
            <button
              type="button"
              onClick={cycleRange}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              <span>{range}</span>
              <FiChevronDown className="text-[10px]" />
            </button>

            {/* Platform compare toggle */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F7] px-3 py-1 text-[11px] font-medium text-slate-600">
              {([
                { id: "instagram", label: "Instagram" },
                { id: "youtube", label: "YouTube" },
                { id: "twitter", label: "Twitter" },
              ] as const).map((p) => {
                const selected = selectedPlatforms[p.id];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={
                      "px-2.5 py-1 rounded-full transition-colors " +
                      (selected
                        ? "bg-white text-sky-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-900")
                    }
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN CHART: Followers over time */}
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
              <LineChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="igFG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ytFG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="twFG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
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
                  formatter={(value: any, _name, props: any) => {
                    const platformKey = props.dataKey as FGPlatform;
                    const label =
                      platformKey === "instagram"
                        ? "Instagram"
                        : platformKey === "youtube"
                        ? "YouTube"
                        : "Twitter";
                    return [`${value.toLocaleString?.() ?? value} followers`, label];
                  }}
                />

                {activePlatforms.includes("instagram") && (
                  <Line
                    type="monotone"
                    dataKey={(d: any) => followersSeries.instagram[range].find((p) => p.label === d.label)?.value}
                    name="instagram"
                    stroke="#EC4899"
                    strokeWidth={2.2}
                    dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#EC4899" }}
                    activeDot={{ r: 5 }}
                    fill="url(#igFG)"
                  />
                )}
                {activePlatforms.includes("youtube") && (
                  <Line
                    type="monotone"
                    dataKey={(d: any) => followersSeries.youtube[range].find((p) => p.label === d.label)?.value}
                    name="youtube"
                    stroke="#F97316"
                    strokeWidth={2.2}
                    dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#F97316" }}
                    activeDot={{ r: 5 }}
                    fill="url(#ytFG)"
                  />
                )}
                {activePlatforms.includes("twitter") && (
                  <Line
                    type="monotone"
                    dataKey={(d: any) => followersSeries.twitter[range].find((p) => p.label === d.label)?.value}
                    name="twitter"
                    stroke="#3B82F6"
                    strokeWidth={2.2}
                    dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#3B82F6" }}
                    activeDot={{ r: 5 }}
                    fill="url(#twFG)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FOLLOWERS INSIGHT METRICS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{
            key: "total",
            title: "Total Followers",
            value: totalFollowers.toLocaleString(),
            delta: "+12.4%",
            positive: true,
          }, {
            key: "new",
            title: "New Followers",
            value: newFollowers.toLocaleString(),
            delta: "+8.1%",
            positive: true,
          }, {
            key: "spike",
            title: "Highest Spike Day",
            value: highestSpikeDay,
            delta: "Peak",
            positive: true,
          }, {
            key: "unfollowers",
            title: "Unfollowers",
            value: unfollowers === 0 ? "N/A" : `${unfollowers}`,
            delta: "Stable",
            positive: true,
          }].map((card) => (
            <div
              key={card.key}
              className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">{card.title}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{card.value}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] text-sky-500">
                  ●
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span
                  className={
                    "inline-flex items-center rounded-full px-2 py-0.5 font-semibold " +
                    (card.positive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600")
                  }
                >
                  {card.delta}
                </span>
                <span>vs previous period</span>
              </div>
            </div>
          ))}
        </div>

        {/* SPIKE ANALYSIS SECTION */}
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                    formatter={(value: any, _name, props: any) => {
                      const point = props.payload as SpikePoint;
                      const sign = point.change >= 0 ? "+" : "";
                      return [`${sign}${point.change} followers`, point.reason];
                    }}
                  />
                  <Bar
                    dataKey="change"
                    radius={[6, 6, 0, 0]}
                    fill="#22C55E"
                    shape={(props: any) => {
                      const { x, y, width, height, payload } = props;
                      const positive = payload.change >= 0;
                      const color = positive ? "#22C55E" : "#EF4444";
                      const topY = positive ? y : y + height;
                      const barHeight = Math.abs(height);
                      return (
                        <rect
                          x={x}
                          y={topY}
                          width={width}
                          height={barHeight}
                          rx={6}
                          ry={6}
                          fill={color}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Most significant spikes list + AI Insights */}
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
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI INSIGHTS WIDGET */}
            <div className="rounded-2xl bg-[#EFF6FF] p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[12px] font-semibold text-white">
                  AI
                </div>
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

        {/* PLATFORM COMPARISON TABLE */}
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
                {platformComparison.map((row) => (
                  <tr key={row.key} className="border-b border-slate-50 last:border-0">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                          {row.name[0]}
                        </div>
                        <span className="text-slate-900">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-slate-900">{row.followers.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        +{row.avgDailyGrowth}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-slate-900">{row.bestDay}</td>
                    <td className="py-2 pr-4 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-[#008CFF] px-5 py-2.5 text-[11px] font-medium text-white hover:bg-[#0077E6] transition shadow-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersGrowthPage;
