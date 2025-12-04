import React, { useMemo, useRef, useState } from "react";
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
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";
import { generateAIHashtags as generateHashtags } from "../api/aiHashtagGenerator";



// Types

type HashPlatform = "instagram" | "youtube" | "twitter";
type HashRange = "7 Days" | "30 Days" | "90 Days";

type HashtagRow = {
  tag: string;
  rank: number;
  rankChange: number;
  reach: number;
  avgLikes: number;
  avgComments: number;
  postsUsed: number;
  difficulty: "Easy" | "Medium" | "Hard";
  sparkline: { label: string; value: number }[];
};

type BubblePoint = {
  tag: string;
  competition: number;
  reach: number;
  frequency: number;
  performance: number; // -1..1
};

type ImpactPoint = {
  tag: string;
  reach: number;
  likes: number;
  comments: number;
  saves: number;
};

type HashGroup = {
  name: string;
  hashtags: string[];
  performance: number;
  usage: number;
  gradient: string;
};

// Mock data per platform/range

const baseSparkline = [
  { label: "Mon", value: 20 },
  { label: "Tue", value: 32 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 40 },
  { label: "Fri", value: 36 },
  { label: "Sat", value: 50 },
  { label: "Sun", value: 44 },
];

const scaleSparkline = (mult: number) => baseSparkline.map(p => ({ ...p, value: Math.round(p.value * mult) }));

const hashtagTableData: Record<HashPlatform, Record<HashRange, HashtagRow[]>> = {
  instagram: {
    "7 Days": [
      {
        tag: "#travel",
        rank: 1,
        rankChange: +3,
        reach: 184_000,
        avgLikes: 4200,
        avgComments: 380,
        postsUsed: 18,
        difficulty: "Medium",
        sparkline: scaleSparkline(1.3),
      },
      {
        tag: "#reels",
        rank: 2,
        rankChange: +1,
        reach: 162_500,
        avgLikes: 3900,
        avgComments: 340,
        postsUsed: 20,
        difficulty: "Hard",
        sparkline: scaleSparkline(1.2),
      },
      {
        tag: "#contentcreator",
        rank: 3,
        rankChange: -1,
        reach: 132_400,
        avgLikes: 3100,
        avgComments: 260,
        postsUsed: 14,
        difficulty: "Medium",
        sparkline: scaleSparkline(1.05),
      },
      {
        tag: "#vlog",
        rank: 4,
        rankChange: +2,
        reach: 118_300,
        avgLikes: 2800,
        avgComments: 210,
        postsUsed: 10,
        difficulty: "Easy",
        sparkline: scaleSparkline(0.95),
      },
      {
        tag: "#indiatravel",
        rank: 5,
        rankChange: +4,
        reach: 102_900,
        avgLikes: 2500,
        avgComments: 190,
        postsUsed: 8,
        difficulty: "Easy",
        sparkline: scaleSparkline(0.9),
      },
    ],
    "30 Days": [],
    "90 Days": [],
  },
  youtube: {
    "7 Days": [],
    "30 Days": [],
    "90 Days": [],
  },
  twitter: {
    "7 Days": [],
    "30 Days": [],
    "90 Days": [],
  },
};

// Fill other ranges/platforms by copying base for now
["30 Days", "90 Days"].forEach((range) => {
  (['instagram', 'youtube', 'twitter'] as HashPlatform[]).forEach((p) => {
    if (hashtagTableData[p][range as HashRange].length === 0) {
      hashtagTableData[p][range as HashRange] = hashtagTableData.instagram["7 Days"].map((row, idx) => ({
        ...row,
        rank: idx + 1,
        reach: Math.round(row.reach * (p === "youtube" ? 0.8 : p === "twitter" ? 0.6 : 1)),
      }));
    }
  });
});

const bubbleData: BubblePoint[] = [
  { tag: "#travel", competition: 0.75, reach: 0.9, frequency: 60, performance: 0.6 },
  { tag: "#reels", competition: 0.9, reach: 0.85, frequency: 80, performance: 0.4 },
  { tag: "#contentcreator", competition: 0.55, reach: 0.7, frequency: 40, performance: 0.7 },
  { tag: "#indiatravel", competition: 0.4, reach: 0.65, frequency: 30, performance: 0.8 },
  { tag: "#vlog", competition: 0.5, reach: 0.6, frequency: 35, performance: 0.2 },
  { tag: "#cinematic", competition: 0.3, reach: 0.55, frequency: 20, performance: 0.5 },
];

const impactData: ImpactPoint[] = [
  { tag: "#travel", reach: 180, likes: 140, comments: 60, saves: 40 },
  { tag: "#reels", reach: 165, likes: 130, comments: 55, saves: 35 },
  { tag: "#contentcreator", reach: 140, likes: 110, comments: 48, saves: 28 },
  { tag: "#indiatravel", reach: 120, likes: 96, comments: 40, saves: 24 },
  { tag: "#vlog", reach: 110, likes: 88, comments: 38, saves: 22 },
  { tag: "#cinematic", reach: 100, likes: 82, comments: 34, saves: 20 },
  { tag: "#creator", reach: 95, likes: 78, comments: 30, saves: 18 },
  { tag: "#workflow", reach: 90, likes: 72, comments: 28, saves: 16 },
  { tag: "#editing", reach: 86, likes: 70, comments: 26, saves: 15 },
  { tag: "#behindthescenes", reach: 82, likes: 66, comments: 24, saves: 14 },
];

const hashtagGroups: HashGroup[] = [
  {
    name: "Travel Boost",
    hashtags: ["#travel", "#wanderlust", "#vacation", "#explore"],
    performance: 12.4,
    usage: 18,
    gradient: "from-sky-500 via-indigo-500 to-purple-500",
  },
  {
    name: "Reels Growth",
    hashtags: ["#reels", "#reelitfeelit", "#viral", "#shortvideo"],
    performance: 9.8,
    usage: 22,
    gradient: "from-pink-500 via-rose-500 to-orange-500",
  },
  {
    name: "Creator Brand",
    hashtags: ["#contentcreator", "#personalbrand", "#creatorlife", "#workflow"],
    performance: 7.1,
    usage: 15,
    gradient: "from-emerald-500 via-teal-500 to-sky-500",
  },
];

// Utility: difficulty color

const difficultyColor = (d: HashtagRow["difficulty"]): string => {
  switch (d) {
    case "Easy":
      return "bg-emerald-50 text-emerald-700";
    case "Medium":
      return "bg-amber-50 text-amber-700";
    case "Hard":
    default:
      return "bg-rose-50 text-rose-700";
  }
};

// Utility: bubble color by performance

const bubbleColor = (p: number): string => {
  if (p > 0.5) return "#22C55E"; // green
  if (p > 0.1) return "#FACC15"; // yellow
  if (p > -0.2) return "#FB923C"; // orange
  return "#EF4444"; // red
};

const HashtagAnalyticsPage: React.FC = () => {
  const [platform, setPlatform] = useState<HashPlatform>("instagram");
  const [range, setRange] = useState<HashRange>("30 Days");
  const [sortKey, setSortKey] = useState<"rank" | "reach" | "likes" | "difficulty">("rank");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [searchTopic, setSearchTopic] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiHashtags, setApiHashtags] = useState<string[]>([]);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<number>(0);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const rangeOptions: HashRange[] = ["7 Days", "30 Days", "90 Days"];

  const tableRows = useMemo(() => {
    const base = hashtagTableData[platform][range];
    const rows = [...base];
    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "rank") cmp = a.rank - b.rank;
      else if (sortKey === "reach") cmp = a.reach - b.reach;
      else if (sortKey === "likes") cmp = a.avgLikes - b.avgLikes;
      else if (sortKey === "difficulty") {
        const order = { Easy: 0, Medium: 1, Hard: 2 };
        cmp = order[a.difficulty] - order[b.difficulty];
      }
      return sortAsc ? cmp : -cmp;
    });
    return rows;
  }, [platform, range, sortKey, sortAsc]);

  const suggestedHashtags = useMemo(() => {
    return apiHashtags.length > 0 ? apiHashtags : [];
  }, [apiHashtags]);

  const handleHeaderSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc((prev) => !prev);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleGenerateHashtags = async () => {
  if (!searchTopic.trim()) return;

  console.log("Calling API with:", searchTopic);

  setIsGenerating(true);
  setLastGeneratedAt(Date.now());
  suggestionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const result = await generateHashtags(searchTopic);

    console.log("API RESULT:", result);

    setApiHashtags(result);
  } catch (error) {
    console.error("API ERROR:", error);
    setApiHashtags([]);
  } finally {
    setIsGenerating(false);
  }
};


  const copyToClipboard = (text: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedTag(text);
        setTimeout(() => setCopiedTag(null), 1000);
      }).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Hashtag Analytics</h1>
            <p className="mt-1 text-sm text-slate-500">Analyze hashtag performance and discover what drives reach.</p>
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
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
              <span>{range}</span>
              <button
                type="button"
                onClick={() => {
                  const idx = rangeOptions.indexOf(range);
                  const next = idx === -1 ? 0 : (idx + 1) % rangeOptions.length;
                  setRange(rangeOptions[next]);
                }}
                aria-label="Change date range"
              >
                <FiChevronDown className="text-[10px]" />
              </button>
            </div>

            {/* Export + AI buttons */}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#008CFF] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#0077E6] transition shadow-sm"
            >
              <span>Export</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#008CFF] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#0077E6] transition shadow-sm"
              onClick={() => {
                suggestionsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <span>Generate Hashtags with AI</span>
            </button>
          </div>
        </div>

        {/* HASHTAG PERFORMANCE TABLE */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Hashtag performance</h2>
              <p className="mt-1 text-xs text-slate-500">Understand which hashtags drive reach and engagement.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs text-slate-600">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-2 pr-4">Hashtag</th>
                  <th className="py-2 pr-4 cursor-pointer" onClick={() => handleHeaderSort("rank")}>Rank</th>
                  <th className="py-2 pr-4 cursor-pointer" onClick={() => handleHeaderSort("reach")}>Reach</th>
                  <th className="py-2 pr-4 cursor-pointer" onClick={() => handleHeaderSort("likes")}>Avg Likes</th>
                  <th className="py-2 pr-4">Avg Comments</th>
                  <th className="py-2 pr-4">Posts Used</th>
                  <th className="py-2 pr-4 cursor-pointer" onClick={() => handleHeaderSort("difficulty")}>Difficulty</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.tag}
                    className="border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50/60"
                  >
                    <td className="py-2 pr-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{row.tag}</span>
                      </div>
                      <div className="mt-1 h-8 w-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={row.sparkline}>
                            <XAxis dataKey="label" hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ display: "none" }} />
                            <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={1.4} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                    <td className="py-2 pr-4 align-top">
                      <div className="flex flex-col">
                        <span className="text-slate-900">{row.rank}</span>
                        <span
                          className={
                            "mt-0.5 text-[10px] font-medium " +
                            (row.rankChange >= 0 ? "text-emerald-600" : "text-rose-600")
                          }
                        >
                          {row.rankChange >= 0 ? `↑ ${row.rankChange}` : `↓ ${Math.abs(row.rankChange)}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 align-top text-slate-900">{row.reach.toLocaleString()}</td>
                    <td className="py-2 pr-4 align-top text-slate-900">{row.avgLikes.toLocaleString()}</td>
                    <td className="py-2 pr-4 align-top text-slate-900">{row.avgComments.toLocaleString()}</td>
                    <td className="py-2 pr-4 align-top text-slate-900">{row.postsUsed}</td>
                    <td className="py-2 pr-4 align-top">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                          difficultyColor(row.difficulty)
                        }
                      >
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="py-2 pr-4 align-top text-right">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-[#008CFF] px-5 py-2.5 text-[11px] font-medium text-white hover:bg-[#0077E6] transition shadow-sm"
                        onClick={() => copyToClipboard(row.tag)}
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HASHTAG GROUPS */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Hashtag groups</h2>
              <p className="mt-1 text-xs text-slate-500">Save and reuse high-performing combinations.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-[#008CFF] px-5 py-2.5 text-[11px] font-medium text-white hover:bg-[#0077E6] transition shadow-sm"
            >
              + Create new group
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {hashtagGroups.map((group) => (
              <button
                key={group.name}
                type="button"
                className="group flex flex-col rounded-2xl bg-gradient-to-tr p-[1px] text-left transition-transform hover:-translate-y-0.5 "
              >
                <div className={`flex h-full flex-col rounded-2xl bg-slate-950/80 bg-clip-padding p-4 text-slate-50 bg-gradient-to-tr ${group.gradient}`}>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/40 px-2 py-1 text-[11px]">
                      <span>🏷️</span>
                      <span>Group</span>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-200">+{group.performance}%</span>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold">{group.name}</h3>
                  <p className="mt-2 line-clamp-2 text-[11px] text-slate-100/90">
                    {group.hashtags.join(" ")}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-100/80">
                    <span>{group.usage} posts used</span>
                    <span className="rounded-full bg-slate-950/40 px-2 py-0.5 text-[10px] font-semibold text-sky-100">
                      Apply group
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* BUBBLE CHART: Hashtag Strength Map */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Hashtag strength map</h2>
              <p className="mt-1 text-xs text-slate-500">Reach vs competition, sized by usage frequency.</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid stroke="#E2E8F0" />
                <XAxis
                  dataKey="competition"
                  type="number"
                  name="Competition"
                  tickFormatter={(v) => `${Math.round(v * 100)}%`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                />
                <YAxis
                  dataKey="reach"
                  type="number"
                  name="Reach"
                  tickFormatter={(v) => `${Math.round(v * 100)}%`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                />
                <ZAxis dataKey="frequency" range={[60, 200]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(_value: number | string, _name: string, props: { payload?: BubblePoint }) => {
                    const payload = props.payload ?? ({} as BubblePoint);
                    return [
                      `Reach: ${Math.round(payload.reach * 100)}% | Competition: ${Math.round(
                        payload.competition * 100
                      )}% | Uses: ${payload.frequency}`,
                      payload.tag,
                    ];
                  }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Scatter
                  data={bubbleData}
                  shape={(props: unknown) => {
                    const { cx, cy, size, payload } = (props as {
                      cx?: number;
                      cy?: number;
                      size?: number;
                      payload?: BubblePoint;
                    }) ?? {};

                    if (cx == null || cy == null || size == null || !payload) {
                      return <circle cx={0} cy={0} r={0} fill="transparent" fillOpacity={0} />;
                    }

                    const color = bubbleColor(payload.performance);
                    const r = Math.sqrt(size) / 2;
                    return <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.8} />;
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ENGAGEMENT IMPACT CHART */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Engagement impact by hashtag</h2>
              <p className="mt-1 text-xs text-slate-500">Reach, likes, comments, and saves for your top hashtags.</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                <CartesianGrid vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="tag"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="reach" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="likes" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="#F97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saves" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI HASHTAG GENERATOR HERO + AI INSIGHTS */}
        <div
          ref={suggestionsRef}
          id="hashtag-generator"
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* HERO: AI Hashtag Generator */}
          <div
            className={
              "lg:col-span-2 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/20 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition " +
              (Date.now() - lastGeneratedAt < 1200
                ? "ring-1 ring-sky-300/70 shadow-[0_0_0_1px_rgba(56,189,248,0.4),0_30px_70px_rgba(15,23,42,0.32)]"
                : "")
            }
          >
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">AI Hashtag Generator</h2>
                  <span className="relative inline-flex h-7 w-7 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/60"></span>
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"></span>
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Generate optimized hashtags powered by intelligent analysis.
                </p>
                <div className="mt-2 h-0.5 w-24 bg-gradient-to-r from-sky-500 via-indigo-500 to-transparent opacity-80" />
              </div>

              {isGenerating && (
                <div className="flex max-w-xs flex-col gap-1 text-[11px] text-sky-800">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                    <span>Analyzing content…</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    AI is analyzing keywords, sentiment, and engagement patterns…
                  </p>
                </div>
              )}
            </div>

            {/* Input + Generate */}
            <div className="mt-5 space-y-3">
              <div className="relative">
                <textarea
                  value={searchTopic}
                  onChange={(e) => setSearchTopic(e.target.value)}
                  placeholder="Describe your post to generate the best hashtags…"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                />
                <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-slate-400">
                  {searchTopic.length}/280
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.55)] transition-transform hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(37,99,235,0.7)]"
                  onClick={handleGenerateHashtags}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs">
                    ⚡
                  </span>
                  <span>{isGenerating ? "Analyzing content…" : "Generate AI hashtags"}</span>
                </button>

                {isGenerating && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="flex space-x-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:0.1s]" />
                    </span>
                    <span>AI is preparing hashtag sets for you…</span>
                  </div>
                )}
              </div>
            </div>

            {/* Results groups */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* Trending Hashtags */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trending hashtags</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(!isGenerating ? suggestedHashtags.slice(0, 4) : []).map((tag, index) => (
                    <button
                      key={`trending-${tag}`}
                      type="button"
                      onClick={() => copyToClipboard(tag)}
                      className="group inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white px-5 py-2 text-[11px] font-medium text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-blue-200/60"
                    >
                      <span>{tag}</span>
                      <span className="text-[10px] text-blue-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        📋
                      </span>
                      {copiedTag === tag && (
                        <span className="ml-1 text-[10px] text-emerald-600">Copied!</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-engagement Hashtags */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">High-engagement hashtags</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(!isGenerating ? suggestedHashtags.slice(4, 8) : []).map((tag, index) => (
                    <button
                      key={`engagement-${tag}`}
                      type="button"
                      onClick={() => copyToClipboard(tag)}
                      className="group inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white px-5 py-2 text-[11px] font-medium text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-blue-200/60"
                    >
                      <span>{tag}</span>
                      <span className="text-[10px] text-blue-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        📋
                      </span>
                      {copiedTag === tag && (
                        <span className="ml-1 text-[10px] text-emerald-600">Copied!</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Niche-specific Hashtags */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Niche-specific hashtags</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(!isGenerating ? suggestedHashtags.slice(8, 12) : []).map((tag, index) => (
                    <button
                      key={`niche-${tag}`}
                      type="button"
                      onClick={() => copyToClipboard(tag)}
                      className="group inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white px-5 py-2 text-[11px] font-medium text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-blue-200/60"
                    >
                      <span>{tag}</span>
                      <span className="text-[10px] text-blue-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        📋
                      </span>
                      {copiedTag === tag && (
                        <span className="ml-1 text-[10px] text-emerald-600">Copied!</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonus Discoverability Tags */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bonus discoverability tags</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(!isGenerating ? suggestedHashtags.slice(12, 16) : []).map((tag, index) => (
                    <button
                      key={`bonus-${tag}`}
                      type="button"
                      onClick={() => copyToClipboard(tag)}
                      className="group inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white px-5 py-2 text-[11px] font-medium text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-blue-200/60"
                    >
                      <span>{tag}</span>
                      <span className="text-[10px] text-blue-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        📋
                      </span>
                      {copiedTag === tag && (
                        <span className="ml-1 text-[10px] text-emerald-600">Copied!</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights widget */}
          <div className="col-span-1 rounded-2xl bg-[#EFF6FF] p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[12px] font-semibold text-white">
                AI
              </div>
              <h2 className="text-sm font-semibold text-slate-900">AI insights about your hashtags</h2>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <p>
                Hashtags with <span className="font-semibold">&lt;20k posts</span> give you
                <span className="font-semibold"> 18% better reach</span> on average.
              </p>
              <p>
                Your audience engages most with <span className="font-semibold">medium-difficulty</span> hashtags.
              </p>
              <p>
                You performed best with hashtags containing the word
                <span className="font-semibold"> “travel”</span>.
              </p>
              <p>
                Consider rotating groups like <span className="font-semibold">Travel Boost</span> and
                <span className="font-semibold"> Creator Brand</span> across your next 10 posts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashtagAnalyticsPage;
