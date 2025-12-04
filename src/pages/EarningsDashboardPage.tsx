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

type EarnPlatform = "instagram" | "youtube" | "twitter";
type EarnRange = "7 Days" | "30 Days" | "90 Days" | "This Month" | "This Year";
type Interval = "daily" | "weekly" | "monthly";

type RevenuePoint = { label: string; total: number; youtube: number; instagram: number; twitter: number; sponsorships: number };

type PlatformBreakdown = {
  platform: EarnPlatform | "sponsorships";
  name: string;
  revenue: number;
  rpm?: number;
  cpm?: number;
  views?: number;
  impressions?: number;
  trend: number;
};

type Sponsorship = {
  id: number;
  brand: string;
  dealName: string;
  amount: number;
  deadline: string;
  status: "Active" | "Completed" | "Pending";
};

type ForecastPoint = { label: string; actual?: number; projected: number; lower: number; upper: number };

type TopPost = {
  id: number;
  title: string;
  platform: string;
  earnings: number;
  engagementScore: number;
  thumbColor: string;
};

type Payment = {
  date: string;
  platform: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  txnId: string;
};

// Mock data

const baseLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const buildRevenuePoints = (mult: number): RevenuePoint[] =>
  baseLabels.map((label, idx) => {
    const youtube = 1200 * mult * (0.9 + idx * 0.05);
    const instagram = 800 * mult * (0.95 + idx * 0.04);
    const twitter = 300 * mult * (0.85 + idx * 0.03);
    const sponsorships = 500 * mult * (0.8 + (idx % 3) * 0.2);
    const total = youtube + instagram + twitter + sponsorships;
    return {
      label,
      total,
      youtube,
      instagram,
      twitter,
      sponsorships,
    };
  });

const revenueData: Record<EarnRange, RevenuePoint[]> = {
  "7 Days": buildRevenuePoints(1),
  "30 Days": buildRevenuePoints(1.4),
  "90 Days": buildRevenuePoints(1.8),
  "This Month": buildRevenuePoints(1.6),
  "This Year": buildRevenuePoints(2.4),
};

const platformBreakdown: PlatformBreakdown[] = [
  {
    platform: "youtube",
    name: "YouTube",
    revenue: 12540,
    rpm: 150,
    views: 145000,
    trend: 12,
  },
  {
    platform: "instagram",
    name: "Instagram",
    revenue: 8240,
    trend: 7,
  },
  {
    platform: "twitter",
    name: "Twitter",
    revenue: 2180,
    impressions: 82000,
    trend: -5,
  },
  {
    platform: "sponsorships",
    name: "Sponsorships",
    revenue: 15200,
    trend: 18,
  },
];

const initialSponsorships: Sponsorship[] = [
  { id: 1, brand: "Notion", dealName: "Notion workspace walkthrough", amount: 45000, deadline: "Feb 10, 2025", status: "Active" },
  { id: 2, brand: "Adobe", dealName: "Premiere Pro editing series", amount: 68000, deadline: "Mar 01, 2025", status: "Pending" },
  { id: 3, brand: "Skillshare", dealName: "Skillshare course shoutout", amount: 32000, deadline: "Jan 28, 2025", status: "Completed" },
];

const buildForecast = (): ForecastPoint[] => {
  const labels = ["Today", "+7d", "+14d", "+21d", "+30d"];
  return labels.map((label, idx) => {
    const base = 42000 + idx * 4500;
    const projected = base * (1 + idx * 0.04);
    const spread = projected * 0.1;
    return {
      label,
      actual: idx === 0 ? 42000 : undefined,
      projected,
      lower: projected - spread,
      upper: projected + spread,
    };
  });
};

const topPosts: TopPost[] = [
  {
    id: 1,
    title: "Day in the life vlog",
    platform: "YouTube",
    earnings: 12540,
    engagementScore: 92,
    thumbColor: "bg-gradient-to-tr from-sky-500 to-indigo-500",
  },
  {
    id: 2,
    title: "10 hooks that always work",
    platform: "Instagram Reels",
    earnings: 8420,
    engagementScore: 88,
    thumbColor: "bg-gradient-to-tr from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "Thread: How I plan content",
    platform: "Twitter",
    earnings: 2180,
    engagementScore: 81,
    thumbColor: "bg-slate-900",
  },
  {
    id: 4,
    title: "Editing workflow breakdown",
    platform: "YouTube",
    earnings: 7540,
    engagementScore: 86,
    thumbColor: "bg-gradient-to-tr from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    title: "Brand deal behind the scenes",
    platform: "Instagram",
    earnings: 6120,
    engagementScore: 84,
    thumbColor: "bg-gradient-to-tr from-amber-500 to-orange-500",
  },
];

const payments: Payment[] = [
  { date: "Jan 12, 2025", platform: "YouTube", amount: 5200, status: "Paid", txnId: "TXN87125" },
  { date: "Jan 05, 2025", platform: "Instagram", amount: 1200, status: "Paid", txnId: "TXN87111" },
  { date: "Dec 29, 2024", platform: "Twitter", amount: 750, status: "Paid", txnId: "TXN87088" },
  { date: "Dec 22, 2024", platform: "Sponsorship", amount: 21000, status: "Paid", txnId: "TXN87055" },
  { date: "Dec 18, 2024", platform: "YouTube", amount: 4800, status: "Pending", txnId: "TXN87039" },
  { date: "Dec 10, 2024", platform: "Instagram", amount: 900, status: "Failed", txnId: "TXN87001" },
];

const statusBadgeClass = (status: Payment["status"]): string => {
  if (status === "Paid") return "bg-emerald-50 text-emerald-700";
  if (status === "Pending") return "bg-amber-50 text-amber-700";
  return "bg-rose-50 text-rose-700";
};

const EarningsDashboardPage: React.FC = () => {
  const [platform, setPlatform] = useState<EarnPlatform>("youtube");
  const [range, setRange] = useState<EarnRange>("30 Days");
  const [interval, setInterval] = useState<Interval>("daily");
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>(initialSponsorships);
  const [newDeal, setNewDeal] = useState<Omit<Sponsorship, "id">>({
    brand: "",
    dealName: "",
    amount: 0,
    deadline: "",
    status: "Pending",
  });
  const [showNewDeal, setShowNewDeal] = useState(false);

  const rangeOptions: EarnRange[] = ["7 Days", "30 Days", "90 Days", "This Month", "This Year"];

  const revenueSeries = useMemo(() => revenueData[range], [range]);
  const forecastSeries = useMemo(() => buildForecast(), [range, platform]);

  const totalRevenue = useMemo(() => revenueSeries.reduce((sum, p) => sum + p.total, 0), [revenueSeries]);

  const handleRangeClick = () => {
    const idx = rangeOptions.indexOf(range);
    const next = idx === -1 ? 0 : (idx + 1) % rangeOptions.length;
    setRange(rangeOptions[next]);
  };

  const addNewSponsorship = () => {
    if (!newDeal.brand || !newDeal.dealName) return;
    setSponsorships((prev) => [
      { id: Date.now(), ...newDeal },
      ...prev,
    ]);
    setNewDeal({ brand: "", dealName: "", amount: 0, deadline: "", status: "Pending" });
    setShowNewDeal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Earnings Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Track your estimated revenue, sponsorships, and future projections.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Platform selector */}
            <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F6F7] px-2 py-1 text-[11px] font-medium text-slate-600">
              {([
                { id: "instagram", label: "Instagram" },
                { id: "youtube", label: "YouTube" },
                { id: "twitter", label: "Twitter" },
              ] as const).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={
                    "px-3 py-1.5 rounded-full transition-colors " +
                    (platform === p.id
                      ? "bg-white text-sky-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900")
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Range selector */}
            <button
              type="button"
              onClick={handleRangeClick}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              <span>{range}</span>
              <FiChevronDown className="text-[10px]" />
            </button>

            {/* Export buttons */}
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
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* MAIN REVENUE CHART */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Revenue over time</h2>
              <p className="mt-1 text-xs text-slate-500">Stripe-style overview of your earnings from all sources.</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
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

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                  formatter={(value: any, _name, props: any) => {
                    const p = props.payload as RevenuePoint;
                    const split = `YT: ₹${Math.round(p.youtube).toLocaleString()} | IG: ₹${Math.round(p.instagram).toLocaleString()} | TW: ₹${Math.round(p.twitter).toLocaleString()} | Spon: ₹${Math.round(p.sponsorships).toLocaleString()}`;
                    return [`₹${Math.round(value).toLocaleString()} (total)\n${split}`, "Revenue"];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#2563EB"
                  strokeWidth={2.4}
                  dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#2563EB" }}
                  activeDot={{ r: 5 }}
                  fill="url(#revGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{
            title: "Total Revenue",
            value: totalRevenue,
            delta: +14.2,
            note: "vs previous period",
          }, {
            title: "YouTube Earnings",
            value: 12540,
            delta: +12.4,
            note: "RPM ₹150 · CPM ₹420",
          }, {
            title: "Instagram Earnings",
            value: 8240,
            delta: +7.1,
            note: "Reels & bonuses",
          }, {
            title: "Sponsorship Earnings",
            value: 15200,
            delta: +18.8,
            note: "Last 30 days",
          }].map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">{card.title}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">₹{Math.round(card.value).toLocaleString()}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] text-sky-500">
                  ₹
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span
                  className={
                    "inline-flex items-center rounded-full px-2 py-0.5 font-semibold " +
                    (card.delta >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")
                  }
                >
                  {card.delta >= 0 ? `↑ +${card.delta}%` : `↓ ${Math.abs(card.delta)}%`}
                </span>
                <span>{card.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BREAKDOWN SECTION */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Earnings by platform chart */}
          <div className="col-span-2 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Earnings by platform</h2>
                <p className="mt-1 text-xs text-slate-500">Stacked view of revenue from all sources.</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="youtube" stackId="a" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="instagram" stackId="a" fill="#F97316" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="twitter" stackId="a" fill="#0EA5E9" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="sponsorships" stackId="a" fill="#10B981" radius={[0, 0, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform breakdown table */}
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
            <h2 className="text-sm font-semibold text-slate-900">Platform breakdown</h2>
            <p className="mt-1 text-xs text-slate-500">Revenue, RPM/CPM, and views.</p>

            <div className="mt-3 space-y-3 text-xs">
              {platformBreakdown.map((p) => (
                <div key={p.name} className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                        {p.name[0]}
                      </div>
                      <span className="text-slate-900">{p.name}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">Revenue: ₹{p.revenue.toLocaleString()}</p>
                    {p.rpm && (
                      <p className="text-[11px] text-slate-500">RPM ₹{p.rpm}</p>
                    )}
                    {p.views && (
                      <p className="text-[11px] text-slate-500">{p.views.toLocaleString()} views</p>
                    )}
                    {p.impressions && (
                      <p className="text-[11px] text-slate-500">{p.impressions.toLocaleString()} impressions</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold " +
                        (p.trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")
                      }
                    >
                      {p.trend >= 0 ? `↑ +${p.trend}%` : `↓ ${Math.abs(p.trend)}%`}
                    </span>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SPONSORSHIP TRACKER & FORECAST */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sponsorship tracker */}
          <div className="col-span-2 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Sponsorships overview</h2>
                <p className="mt-1 text-xs text-slate-500">Track brand deals, amounts, and deadlines.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white"
                onClick={() => setShowNewDeal(true)}
              >
                + New sponsorship
              </button>
            </div>

            {showNewDeal && (
              <div className="mb-4 grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-4 text-[11px] md:grid-cols-2">
                <input
                  placeholder="Brand"
                  value={newDeal.brand}
                  onChange={(e) => setNewDeal((d) => ({ ...d, brand: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none focus:border-sky-400"
                />
                <input
                  placeholder="Deal name"
                  value={newDeal.dealName}
                  onChange={(e) => setNewDeal((d) => ({ ...d, dealName: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none focus:border-sky-400"
                />
                <input
                  placeholder="Amount (₹)"
                  type="number"
                  value={newDeal.amount || ""}
                  onChange={(e) => setNewDeal((d) => ({ ...d, amount: Number(e.target.value) || 0 }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none focus:border-sky-400"
                />
                <input
                  placeholder="Deadline (e.g. Feb 10, 2025)"
                  value={newDeal.deadline}
                  onChange={(e) => setNewDeal((d) => ({ ...d, deadline: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none focus:border-sky-400"
                />
                <select
                  value={newDeal.status}
                  onChange={(e) => setNewDeal((d) => ({ ...d, status: e.target.value as Sponsorship["status"] }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none focus:border-sky-400"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-full px-3 py-1.5 text-[11px] text-slate-600 hover:bg-slate-200"
                    onClick={() => setShowNewDeal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-sky-600"
                    onClick={addNewSponsorship}
                  >
                    Save deal
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto text-xs">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="py-2 pr-4">Brand</th>
                    <th className="py-2 pr-4">Deal name</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Deadline</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorships.map((s) => (
                    <tr key={s.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-2 pr-4">{s.brand}</td>
                      <td className="py-2 pr-4">{s.dealName}</td>
                      <td className="py-2 pr-4">₹{s.amount.toLocaleString()}</td>
                      <td className="py-2 pr-4">{s.deadline}</td>
                      <td className="py-2 pr-4">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                            (s.status === "Active"
                              ? "bg-emerald-50 text-emerald-600"
                              : s.status === "Completed"
                              ? "bg-slate-100 text-slate-700"
                              : "bg-amber-50 text-amber-700")
                          }
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white"
                        >
                          View deal
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forecasting section */}
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
            <h2 className="text-sm font-semibold text-slate-900">AI revenue forecast</h2>
            <p className="mt-1 text-xs text-slate-500">Projected earnings for the next 30 days.</p>

            <div className="mt-3 h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#0F172A"
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#0F172A" }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#38BDF8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 space-y-1 text-[11px] text-slate-700">
              <p>
                Your revenue is expected to increase by <span className="font-semibold">18%</span> next month.
              </p>
              <p>
                Projected earnings: <span className="font-semibold">₹58,000–₹64,000</span>.
              </p>
              <p>
                Sponsorships contribute an estimated <span className="font-semibold">40%</span> of next month’s total.
              </p>
            </div>
          </div>
        </div>

        {/* MOST PROFITABLE CONTENT */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify_between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Most profitable content</h2>
              <p className="mt-1 text-xs text-slate-500">Top posts ranked by earnings and engagement.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
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
                    <p>Earnings</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">₹{post.earnings.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p>Engagement score</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{post.engagementScore}/100</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white"
                >
                  View analytics
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT HISTORY */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
          <h2 className="text-sm font-semibold text-slate-900">Payment history</h2>
          <p className="mt-1 text-xs text-slate-500">Payouts from platforms and sponsorships.</p>

          <div className="mt-3 overflow-x-auto text-xs">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Platform</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.txnId} className="border-b border-slate-50 last:border-0">
                    <td className="py-2 pr-4">{p.date}</td>
                    <td className="py-2 pr-4">{p.platform}</td>
                    <td className="py-2 pr-4">₹{p.amount.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <span className={"inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold " + statusBadgeClass(p.status)}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{p.txnId}</td>
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

export default EarningsDashboardPage;
