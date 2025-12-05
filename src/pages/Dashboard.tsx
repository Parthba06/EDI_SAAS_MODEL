// src/pages/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
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
  FiBell,
  FiClock,
  FiSend,
  FiCheckSquare,
} from "react-icons/fi";

import profileAvatar from "../assets/profile-avatar.png";
import youtubeLogo from "../assets/youtube.png";
import instaLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";

import useYouTube from "../utils/useYouTube";

/**
 * Fully working Dashboard.tsx
 * - Platform selector (youtube | twitter | instagram)
 * - YouTube -> uses useYouTube hook
 * - Twitter -> fetches from local proxy (only when selected)
 * - Instagram -> static fallback
 *
 * Adjust constants YOUTUBE_CHANNEL_ID, TWITTER_USERNAME and PROXY_URL as needed.
 */

type Platform = "youtube" | "twitter" | "instagram";

const CardShell: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-slate-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] ${className}`}>
    {children}
  </div>
);

const SAMPLE_SERIES = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 12000 },
  { date: "Mar", value: 13000 },
  { date: "Apr", value: 12500 },
  { date: "May", value: 14000 },
  { date: "Jun", value: 16000 },
];

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();

  // --- CONFIG ---
  const YOUTUBE_CHANNEL_ID = "UC7szDWdg32HgpIOKcsWw0yw";
  const TWITTER_USERNAME = "rudra_ingole";
  const PROXY_URL = "http://localhost:4000";

  // --- platform state ---
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("youtube");

  // --- YouTube (custom hook) ---
  // useYouTube: assumed to return an object or null:
  // { subscriberCount: string|number, viewCount: string|number, videoCount: string|number }
  const ytStats = useYouTube(YOUTUBE_CHANNEL_ID);

  // --- Twitter (local proxy) ---
  const [twitterData, setTwitterData] = useState<any | null>(null);
  const [twitterError, setTwitterError] = useState<string | null>(null);
  const [twLoading, setTwLoading] = useState<boolean>(false);

  // Fetch Twitter only when platform selected (reduces requests)
  useEffect(() => {
    let mounted = true;
    if (selectedPlatform !== "twitter") return;

    setTwLoading(true);
    setTwitterError(null);

    fetch(`${PROXY_URL}/twitter/${TWITTER_USERNAME}`)
      .then(async (res) => {
        const json = await res.json();
        if (!mounted) return;
        if (res.status === 429 || json?.error === "rate_limited") {
          setTwitterError("Rate limit reached. Try again later.");
          setTwitterData(null);
        } else if (json?.error) {
          setTwitterError(String(json.details ?? json.error ?? "Twitter error"));
          setTwitterData(null);
        } else {
          setTwitterData(json);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Twitter fetch failed:", err);
        setTwitterError("Unable to fetch Twitter data");
        setTwitterData(null);
      })
      .finally(() => {
        if (!mounted) return;
        setTwLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [selectedPlatform, PROXY_URL, TWITTER_USERNAME]);

  // --- Derived metrics (active metrics depending on selectedPlatform) ---
  // Instagram static fallback
  const INSTAGRAM_STATIC = {
    followers: 8481,
    comments: 4507,
    likes: 125458,
    graph: SAMPLE_SERIES,
  };

  const active = useMemo(() => {
    if (selectedPlatform === "youtube") {
      const followers = ytStats?.subscriberCount ? Number(ytStats.subscriberCount) : null;
      const comments = ytStats?.viewCount ? Number(ytStats.viewCount) : null;
      const likes = ytStats?.videoCount ? Number(ytStats.videoCount) : null;
      return {
        id: "youtube",
        name: "YouTube",
        logo: youtubeLogo,
        followers,
        comments,
        likes,
        loading: !ytStats,
        badge: "LIVE",
        graph:
          ytStats && typeof followers === "number"
            ? [
                { date: "T-5", value: Math.round(followers * 0.85) },
                { date: "T-4", value: Math.round(followers * 0.9) },
                { date: "T-3", value: Math.round(followers * 0.94) },
                { date: "T-2", value: Math.round(followers * 0.97) },
                { date: "T-1", value: Math.round(followers * 0.99) },
                { date: "Now", value: followers },
              ]
            : SAMPLE_SERIES,
      };
    }

    if (selectedPlatform === "twitter") {
      const pm = twitterData?.data?.public_metrics ?? null;
      const followers = pm?.followers_count ? Number(pm.followers_count) : null;
      const comments = pm?.tweet_count ? Number(pm.tweet_count) : null;
      const likes = pm?.like_count ? Number(pm.like_count) : null;
      return {
        id: "twitter",
        name: "Twitter",
        logo: twitterLogo,
        followers,
        comments,
        likes,
        loading: twLoading,
        badge: twitterError ? "ERR" : "LIVE",
        graph:
          pm && typeof followers === "number"
            ? [
                { date: "T-5", value: Math.round(followers * 0.86) },
                { date: "T-4", value: Math.round(followers * 0.9) },
                { date: "T-3", value: Math.round(followers * 0.94) },
                { date: "T-2", value: Math.round(followers * 0.98) },
                { date: "T-1", value: Math.round(followers * 0.995) },
                { date: "Now", value: followers },
              ]
            : SAMPLE_SERIES,
      };
    }

    // Instagram static
    return {
      id: "instagram",
      name: "Instagram",
      logo: instaLogo,
      followers: INSTAGRAM_STATIC.followers,
      comments: INSTAGRAM_STATIC.comments,
      likes: INSTAGRAM_STATIC.likes,
      loading: false,
      badge: "STATIC",
      graph: INSTAGRAM_STATIC.graph,
    };
  }, [selectedPlatform, ytStats, twitterData, twLoading, twitterError]);

  // Chart series for area chart (simple transform)
  const chartSeries = useMemo(() => {
    return active.graph.map((p: any) => ({ date: p.date, value: p.value }));
  }, [active]);

  // Small helpers for display
  const formatNumber = (v: number | null | undefined) =>
    v === null || v === undefined ? "—" : Number(v).toLocaleString();

  // Manual refresh handler (refetch twitter if selected)
  const handleRefresh = () => {
    if (selectedPlatform === "twitter") {
      // re-trigger Twitter fetch by toggling the state momentarily
      setTwitterData(null);
      setTwitterError(null);
      setTwLoading(true);
      fetch(`${PROXY_URL}/twitter/${TWITTER_USERNAME}`)
        .then((r) => r.json())
        .then((d) => {
          if (d?.error) {
            setTwitterError(String(d.details ?? d.error ?? "Twitter error"));
            setTwitterData(null);
          } else {
            setTwitterData(d);
          }
        })
        .catch((err) => {
          console.error("Twitter refresh failed:", err);
          setTwitterError("Unable to fetch Twitter data");
        })
        .finally(() => setTwLoading(false));
    }
    // For YouTube, your useYouTube hook should handle refresh or you can implement a reload mechanism in the hook.
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col min-h-screen">
        {/* Topbar */}
        <div className="sticky top-0 z-30 border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2.5">
                <span className="text-slate-400">🔍</span>
                <input className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400" placeholder="Search..." />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:inline-flex items-center gap-2 rounded-full bg-sky-500 px-3.5 py-2 text-xs font-semibold text-white">AI</button>
              <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FiBell />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">3</span>
              </button>
              <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-200">
                <img src={profileAvatar} alt="profile" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT (main) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Header + Platform Selector */}
              <CardShell className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Overview</h3>
                    <p className="mt-1 text-xs text-slate-500">SaaS analytics snapshot for your connected accounts</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      {(["youtube", "twitter", "instagram"] as Platform[]).map((p) => {
                        const activeP = selectedPlatform === p;
                        return (
                          <button
                            key={p}
                            onClick={() => setSelectedPlatform(p)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium ${activeP ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-700"}`}
                          >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </button>
                        );
                      })}
                    </div>

                    <div className="ml-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      <button onClick={handleRefresh} className="px-2 py-1 rounded bg-white text-xs">Refresh</button>
                    </div>
                  </div>
                </div>

                {/* Platform summary cards (3) */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{
                    id: "overview-card",
                    logo: active.logo,
                    platformName: active.name,
                    followers: active.followers,
                    comments: active.comments,
                    likes: active.likes,
                    badge: active.badge,
                    loading: active.loading,
                  }].map((card) => (
                    <div key={card.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow">
                      <div className="flex items-center gap-3">
                        <img src={card.logo} alt={card.platformName} className="h-8 w-8 object-contain" />
                        <div className="font-semibold">{card.platformName}</div>
                        <div className="ml-auto text-xs text-slate-500">{card.badge}</div>
                      </div>

                      <div className="mt-4 flex items-baseline gap-2">
                        <div className="text-2xl font-bold text-slate-900">{card.loading ? "Loading..." : formatNumber(card.followers)}</div>
                        <span className="inline-flex items-center rounded-full bg-[#E5F2FF] px-2.5 py-0.5 text-[11px] font-semibold text-sky-600">+0</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">Followers</p>

                      <div className="mt-4 flex justify-between text-xs text-slate-600">
                        <div>
                          <p className="text-slate-500">{selectedPlatform === "twitter" ? "Tweets" : "Comments"}</p>
                          <p className="mt-1 font-semibold text-slate-900">{card.loading ? "—" : formatNumber(card.comments)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Likes</p>
                          <p className="mt-1 font-semibold text-slate-900">{card.loading ? "—" : formatNumber(card.likes)}</p>
                        </div>
                      </div>

                      {selectedPlatform === "twitter" && twitterError && (
                        <p className="mt-3 text-[11px] text-red-500">Unable to fetch Twitter data</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardShell>

              {/* Engagement chart card */}
              <CardShell className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Engagement</h3>
                    <p className="mt-1 text-xs text-slate-500">Performance across the selected platform</p>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                      <button className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedPlatform === "instagram" ? "bg-white text-slate-700" : "text-slate-600"}`}>Overview</button>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartSeries} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2D7FF9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2D7FF9" stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px" }} />
                      <Area type="monotone" dataKey="value" stroke="#2563EB" fill="url(#engGrad)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div>Most recent change <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">+{Math.round((active.followers ?? 0) * 0.02)}</span></div>
                  <div>Refreshed just now</div>
                </div>
              </CardShell>
            </div>

            {/* RIGHT (sidebar) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <CardShell className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Active Promotion</h3>
                    <p className="mt-1 text-xs text-slate-500">Ad performance summary</p>
                  </div>

                  <div className="text-xs text-slate-500">LIVE</div>
                </div>

                <div className="mt-4 h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={active.graph}>
                      <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px" }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#2563EB" barSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500">Followers</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-lg font-bold text-slate-900">{formatNumber(active.followers ?? null)}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Since last update</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Spending</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">₹5,000</p>
                    <span className="mt-1 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">3 days left</span>
                  </div>

                  <div>
                    <p className="text-slate-500">Reach</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">1.5L</p>
                    <p className="mt-1 text-xs text-slate-500">account reached</p>
                  </div>
                </div>
              </CardShell>

              <CardShell className="p-5">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Most active Time</h3>
                    <p className="mt-1 text-xs text-slate-500">Activity heatmap</p>
                  </div>
                  <div className="text-xs text-slate-500">LIVE</div>
                </div>

                <div className="rounded-lg bg-[#F7F9FC] p-3">
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(21, minmax(0, 1fr))` }}>
                    {Array.from({ length: 7 * 21 }).map((_, i) => {
                      // platform-based offset so each platform gets its own scattered pattern
                      const platformOffset =
                        selectedPlatform === "youtube" ? 17 : selectedPlatform === "twitter" ? 53 : 91;

                      const idx = i + platformOffset;
                      const seed = (idx * 1103515245 + 12345) & 0x7fffffff;
                      const r = seed / 0x7fffffff;
                      const level = r < 0.15 ? 3 : r < 0.45 ? 2 : r < 0.8 ? 1 : 0;

                      const color =
                        level === 3
                          ? "#2563EB" // strongest, dark blue
                          : level === 2
                          ? "#C7DFFF"
                          : level === 1
                          ? "#E0EDFF"
                          : "#F3F6FA"; // background dots

                      return (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-[2px]"
                          style={{ backgroundColor: color }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-500">Most active time</p>
                    <p className="mt-1 font-semibold text-slate-900">12:00 PM - 1:45 PM</p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-500">Engagements</p>
                    <p className="mt-1 font-semibold text-slate-900">{formatNumber(Math.round((active.followers ?? 0) * 0.15))}</p>
                  </div>
                </div>
              </CardShell>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
