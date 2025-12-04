import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";

// Types

type DemPlatform = "instagram" | "youtube" | "twitter";
type DemRange = "7 Days" | "30 Days" | "90 Days" | "6 Months" | "1 Year";

type GenderKey = "male" | "female" | "other";

interface GenderDatum {
  name: string;
  key: GenderKey;
  value: number;
}

interface AgeDatum {
  range: string;
  value: number;
}

interface CountryDatum {
  code: string;
  name: string;
  percent: number;
}

interface CityDatum {
  name: string;
  percent: number;
}

interface LanguageDatum {
  name: string;
  percent: number;
  trend: number; // positive or negative
}

// Data per platform/range (placeholder but structured)

const genderData: Record<DemPlatform, Record<DemRange, GenderDatum[]>> = {
  instagram: {
    "7 Days": [
      { name: "Male", key: "male", value: 52 },
      { name: "Female", key: "female", value: 44 },
      { name: "Other", key: "other", value: 4 },
    ],
    "30 Days": [
      { name: "Male", key: "male", value: 50 },
      { name: "Female", key: "female", value: 46 },
      { name: "Other", key: "other", value: 4 },
    ],
    "90 Days": [
      { name: "Male", key: "male", value: 48 },
      { name: "Female", key: "female", value: 48 },
      { name: "Other", key: "other", value: 4 },
    ],
    "6 Months": [
      { name: "Male", key: "male", value: 47 },
      { name: "Female", key: "female", value: 49 },
      { name: "Other", key: "other", value: 4 },
    ],
    "1 Year": [
      { name: "Male", key: "male", value: 45 },
      { name: "Female", key: "female", value: 51 },
      { name: "Other", key: "other", value: 4 },
    ],
  },
  youtube: {
    "7 Days": [
      { name: "Male", key: "male", value: 60 },
      { name: "Female", key: "female", value: 36 },
      { name: "Other", key: "other", value: 4 },
    ],
    "30 Days": [
      { name: "Male", key: "male", value: 59 },
      { name: "Female", key: "female", value: 37 },
      { name: "Other", key: "other", value: 4 },
    ],
    "90 Days": [
      { name: "Male", key: "male", value: 58 },
      { name: "Female", key: "female", value: 38 },
      { name: "Other", key: "other", value: 4 },
    ],
    "6 Months": [
      { name: "Male", key: "male", value: 57 },
      { name: "Female", key: "female", value: 39 },
      { name: "Other", key: "other", value: 4 },
    ],
    "1 Year": [
      { name: "Male", key: "male", value: 55 },
      { name: "Female", key: "female", value: 41 },
      { name: "Other", key: "other", value: 4 },
    ],
  },
  twitter: {
    "7 Days": [
      { name: "Male", key: "male", value: 65 },
      { name: "Female", key: "female", value: 30 },
      { name: "Other", key: "other", value: 5 },
    ],
    "30 Days": [
      { name: "Male", key: "male", value: 64 },
      { name: "Female", key: "female", value: 31 },
      { name: "Other", key: "other", value: 5 },
    ],
    "90 Days": [
      { name: "Male", key: "male", value: 63 },
      { name: "Female", key: "female", value: 32 },
      { name: "Other", key: "other", value: 5 },
    ],
    "6 Months": [
      { name: "Male", key: "male", value: 62 },
      { name: "Female", key: "female", value: 33 },
      { name: "Other", key: "other", value: 5 },
    ],
    "1 Year": [
      { name: "Male", key: "male", value: 60 },
      { name: "Female", key: "female", value: 35 },
      { name: "Other", key: "other", value: 5 },
    ],
  },
};

const ageBuckets = ["13–17", "18–24", "25–34", "35–44", "45–54", "55+"];

const ageData: Record<DemPlatform, AgeDatum[]> = {
  instagram: [
    { range: "13–17", value: 8 },
    { range: "18–24", value: 38 },
    { range: "25–34", value: 32 },
    { range: "35–44", value: 14 },
    { range: "45–54", value: 5 },
    { range: "55+", value: 3 },
  ],
  youtube: [
    { range: "13–17", value: 6 },
    { range: "18–24", value: 30 },
    { range: "25–34", value: 35 },
    { range: "35–44", value: 16 },
    { range: "45–54", value: 8 },
    { range: "55+", value: 5 },
  ],
  twitter: [
    { range: "13–17", value: 4 },
    { range: "18–24", value: 26 },
    { range: "25–34", value: 36 },
    { range: "35–44", value: 20 },
    { range: "45–54", value: 9 },
    { range: "55+", value: 5 },
  ],
};

const countriesData: CountryDatum[] = [
  { code: "IN", name: "India", percent: 45 },
  { code: "US", name: "United States", percent: 18 },
  { code: "GB", name: "United Kingdom", percent: 9 },
  { code: "CA", name: "Canada", percent: 6 },
  { code: "AE", name: "UAE", percent: 5 },
  { code: "AU", name: "Australia", percent: 4 },
  { code: "DE", name: "Germany", percent: 3 },
  { code: "FR", name: "France", percent: 3 },
  { code: "SG", name: "Singapore", percent: 3 },
  { code: "BR", name: "Brazil", percent: 2 },
];

const citiesData: CityDatum[] = [
  { name: "Mumbai", percent: 14 },
  { name: "Delhi", percent: 11 },
  { name: "Bangalore", percent: 9 },
  { name: "Pune", percent: 6 },
  { name: "Hyderabad", percent: 5 },
  { name: "Chennai", percent: 4 },
  { name: "Kolkata", percent: 4 },
  { name: "Ahmedabad", percent: 3 },
];

const languageData: LanguageDatum[] = [
  { name: "English", percent: 65, trend: 4.2 },
  { name: "Hindi", percent: 22, trend: 1.1 },
  { name: "Marathi", percent: 10, trend: -0.4 },
  { name: "Tamil", percent: 3, trend: 0.2 },
];

// Heatmap 24x7 activity (hours x days)

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, i) => i);

const buildHeatmap = (multiplier: number) => {
  return days.map(() =>
    hours.map(() => Math.max(0, Math.min(4, Math.round(Math.random() * 4 * multiplier))))
  );
};

const deviceBreakdown = [
  { label: "Mobile (iOS)", value: 42, icon: "📱" },
  { label: "Mobile (Android)", value: 38, icon: "📱" },
  { label: "Desktop", value: 15, icon: "💻" },
  { label: "Tablet", value: 5, icon: "📟" },
];

const genderColors: Record<GenderKey, string> = {
  male: "#3B82F6",
  female: "#EC4899",
  other: "#8B5CF6",
};

const AudienceDemographicsPage: React.FC = () => {
  const [range, setRange] = useState<DemRange>("30 Days");
  const [platform, setPlatform] = useState<DemPlatform>("instagram");

  const genders = useMemo(() => genderData[platform][range], [platform, range]);
  const ages = useMemo(() => ageData[platform], [platform]);
  const heatmap = useMemo(() => buildHeatmap(platform === "instagram" ? 1.2 : platform === "youtube" ? 1.0 : 0.9), [platform, range]);

  const totalAudience = 12540; // placeholder aggregate

  const cycleRange = () => {
    const options: DemRange[] = ["7 Days", "30 Days", "90 Days", "6 Months", "1 Year"]; 
    const current = options.indexOf(range);
    const next = current === -1 ? 0 : (current + 1) % options.length;
    setRange(options[next]);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 rounded-xl bg-white px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Audience Demographics</h1>
            <p className="mt-1 text-sm text-slate-500">Understand who your audience is and when they’re active.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={cycleRange}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              <span>{range}</span>
              <FiChevronDown className="text-[10px]" />
            </button>

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

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#008CFF] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#0077E6] transition shadow-sm"
            >
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* TOP GRID: Gender + Age */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Gender split */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="h-56 w-full md:h-56 md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genders}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    cornerRadius={8}
                  >
                    {genders.map((entry) => (
                      <Cell key={entry.key} fill={genderColors[entry.key]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex-1 md:mt-0">
              <h2 className="text-sm font-semibold text-slate-900">Gender split</h2>
              <p className="mt-1 text-xs text-slate-500">Total audience: <span className="font-semibold text-slate-900">{totalAudience.toLocaleString()}</span></p>

              <div className="mt-3 space-y-2 text-xs">
                {genders.map((g) => (
                  <div key={g.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: genderColors[g.key] }}
                      />
                      <span className="text-slate-700">{g.name}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{g.value}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1 text-xs text-slate-600">
                <p>
                  Compared to previous period: <span className="font-semibold text-emerald-600">+3.2%</span> total audience.
                </p>
                <p>
                  Fastest growing: <span className="font-semibold text-slate-900">Female</span> segment.
                </p>
              </div>
            </div>
          </div>

          {/* Age distribution */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Age distribution</h2>
                <p className="mt-1 text-xs text-slate-500">Most of your audience is between 18–24.</p>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ages} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: any) => [`${value}%`, "Audience"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                    fill="#2563EB"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Countries + Cities */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top countries */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <h2 className="text-sm font-semibold text-slate-900">Top countries</h2>
            <p className="mt-1 text-xs text-slate-500">Where your audience is coming from.</p>

            <div className="mt-4 space-y-3 text-xs">
              {countriesData.map((c) => (
                <div key={c.code} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {/* Simple pseudo-flag via initials */}
                      🌐
                    </span>
                    <span className="text-slate-700">{c.name}</span>
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-sky-500"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-700">{c.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top cities */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <h2 className="text-sm font-semibold text-slate-900">Top cities</h2>
            <p className="mt-1 text-xs text-slate-500">Cities where your followers are most active.</p>

            <div className="mt-4 space-y-3 text-xs">
              {citiesData.map((city) => (
                <div key={city.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span className="text-slate-700">{city.name}</span>
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-indigo-500"
                        style={{ width: `${city.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-700">{city.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity heatmap full width */}
        <div className="rounded-2xl bg-white p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Audience activity by hour</h2>
              <p className="mt-1 text-xs text-slate-500">Detailed 24×7 view of hourly audience engagement.</p>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden">
            <div className="min-w-[640px]">
              {/* Heatmap grid */}
              <div className="flex gap-2">
                {/* Day labels */}
                <div className="flex flex-col justify-between py-1 text-[11px] text-slate-500">
                  {days.map((day) => (
                    <div key={day} className="h-6 flex items-center pr-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* 7x24 cells */}
                <div className="flex-1">
                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}>
                    {heatmap.map((row, dayIndex) =>
                      row.map((value, hourIndex) => {
                        const level = Math.max(0, Math.min(4, Math.round(value)));
                        const palette = ["#EFF6FF", "#BFDBFE", "#60A5FA", "#3B82F6", "#1D4ED8"];
                        const color = palette[level];
                        const hourLabel = `${hourIndex.toString().padStart(2, "0")}:00`;
                        const dayLabel = days[dayIndex];
                        const interactions = 300 + value * 250; // simple scaled placeholder
                        return (
                          <div
                            key={`${dayIndex}-${hourIndex}`}
                            className="h-6 w-6 rounded-[3px] transition-colors duration-150"
                            style={{ backgroundColor: color }}
                            title={`${dayLabel}, ${hourLabel} — Activity: ${Math.round(interactions).toLocaleString()} interactions`}
                          />
                        );
                      })
                    )}
                  </div>

                  {/* Hour labels */}
                  <div className="mt-3 flex justify-between text-[11px] text-slate-500">
                    {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Devices + Languages + AI insights */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Devices chart */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <h2 className="text-sm font-semibold text-slate-900">Device breakdown</h2>
            <p className="mt-1 text-xs text-slate-500">How your audience accesses your content.</p>

            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center">
              <div className="h-40 w-full md:h-40 md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceBreakdown}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {deviceBreakdown.map((d, idx) => (
                        <Cell
                          key={d.label}
                          fill={["#2563EB", "#0EA5E9", "#F59E0B", "#6366F1"][idx % 4]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #E2E8F0",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                {deviceBreakdown.map((d, idx) => (
                  <div key={d.label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span>{d.icon}</span>
                      <span className="text-slate-700">{d.label}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages table */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <h2 className="text-sm font-semibold text-slate-900">Language distribution</h2>
            <p className="mt-1 text-xs text-slate-500">Primary languages your audience speaks.</p>

            <div className="mt-3 space-y-3 text-xs">
              {languageData.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">{lang.name}</span>
                    <span className="font-semibold text-slate-900">{lang.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-sky-500"
                      style={{ width: `${lang.percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Trend</span>
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2 py-0.5 font-semibold " +
                        (lang.trend >= 0
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600")
                      }
                    >
                      {lang.trend >= 0 ? `↑ +${lang.trend}%` : `↓ ${lang.trend}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-2xl bg-[#EFF6FF] p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[12px] font-semibold text-white">
                AI
              </div>
              <h2 className="text-sm font-semibold text-slate-900">AI Insights About Your Audience</h2>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <p>Your audience is most active between <span className="font-semibold">6 PM – 10 PM</span>.</p>
              <p>
                Your fastest-growing segment is <span className="font-semibold">18–24 female users in India</span>.
              </p>
              <p>
                <span className="font-semibold">English</span> remains your dominant language at <span className="font-semibold">65%</span>.
              </p>
              <p>
                Your top 3 cities account for <span className="font-semibold">40% of your reach</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceDemographicsPage;
