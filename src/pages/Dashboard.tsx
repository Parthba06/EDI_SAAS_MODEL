// src/pages/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
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
} from "recharts";
import {
  FiBell,
  FiSearch,
  FiClock,
  FiCalendar,
  FiCheckSquare,
} from "react-icons/fi";
import { BsArrowRepeat } from "react-icons/bs";

import profileAvatar from "../assets/profile-avatar.png";
import youtubeLogo from "../assets/youtube.png";
import instaLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";

import useYouTube from "../utils/useYouTube";

/**
 * Dashboard redesign matching the screenshot layout.
 */

const CardShell: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-[20px] border border-gray-100 bg-white shadow-sm ${className}`}>
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
  // --- CONFIG ---
  const YOUTUBE_CHANNEL_ID = "UC7szDWdg32HgpIOKcsWw0yw";
  const TWITTER_USERNAME = "rudra_ingole";
  const PROXY_URL = "http://localhost:4000";

  // --- YouTube (custom hook) ---
  const ytStats = useYouTube(YOUTUBE_CHANNEL_ID);

  // --- Twitter (local proxy) ---
  const [twitterData, setTwitterData] = useState<any | null>(null);
  const [twLoading, setTwLoading] = useState<boolean>(true);

  // Fetch Twitter unconditionally now since we show all cards
  const fetchTwitter = () => {
    setTwLoading(true);
    fetch(`${PROXY_URL}/twitter/${TWITTER_USERNAME}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.error || res.status === 429) {
          setTwitterData(null);
        } else {
          setTwitterData(json);
        }
      })
      .catch((err) => {
        console.error("Twitter fetch failed:", err);
        setTwitterData(null);
      })
      .finally(() => {
        setTwLoading(false);
      });
  };

  useEffect(() => {
    fetchTwitter();
  }, []);

  // --- Map Data for all 3 platforms ---
  const INSTAGRAM_STATIC = { followers: 8481, comments: 4507, likes: 125458 };

  const ytFollowers = ytStats?.subscriberCount ? Number(ytStats.subscriberCount) : 8481;
  const ytComments = ytStats?.viewCount ? Number(ytStats.viewCount) : 4507;
  const ytLikes = ytStats?.videoCount ? Number(ytStats.videoCount) : 125458;

  const twFollowers = twitterData?.data?.public_metrics?.followers_count ? Number(twitterData.data.public_metrics.followers_count) : 8481;
  const twComments = twitterData?.data?.public_metrics?.tweet_count ? Number(twitterData.data.public_metrics.tweet_count) : 4507;
  const twLikes = twitterData?.data?.public_metrics?.like_count ? Number(twitterData.data.public_metrics.like_count) : 125458;

  const platformsData = [
    {
      id: "youtube",
      name: "YouTube",
      logo: youtubeLogo,
      followers: ytFollowers,
      labelFollowers: "Subscribers",
      comments: ytComments,
      likes: ytLikes,
    },
    {
      id: "twitter",
      name: "Twitter",
      logo: twitterLogo,
      followers: twFollowers,
      labelFollowers: "Followers",
      comments: twComments,
      likes: twLikes,
    },
    {
      id: "instagram",
      name: "Instagram",
      logo: instaLogo,
      followers: INSTAGRAM_STATIC.followers,
      labelFollowers: "Followers",
      comments: INSTAGRAM_STATIC.comments,
      likes: INSTAGRAM_STATIC.likes,
    },
  ];

  const formatNumber = (v: number) => v.toLocaleString();

  // Engagement chart dummy data resembling screenshot
  const engagementData = [
    { month: "Mar", value: 10000 },
    { month: "Apr", value: 12000 },
    { month: "May", value: 13500 },
    { month: "Jun", value: 13000 },
    { month: "Jul", value: 16487 },
    { month: "Aug", value: 18000 },
  ];

  // Active promotion chart dummy data
  const promotionData = Array.from({ length: 10 }).map((_, i) => ({
    hour: (13 + i).toString().padStart(2, "0"),
    value: Math.floor(Math.random() * 30000) + 20000,
  }));

  // Heatmap generation
  const generateHeatmap = () => {
    return Array.from({ length: 7 * 20 }).map((_, i) => {
      const r = Math.random();
      const level = r < 0.15 ? 3 : r < 0.35 ? 2 : r < 0.6 ? 1 : 0;
      const color =
        level === 3 ? "#3b82f6" :
        level === 2 ? "#93c5fd" :
        level === 1 ? "#dbeafe" : "#f1f5f9";
      return (
        <div
          key={i}
          className="w-full aspect-square rounded-[2px]"
          style={{ backgroundColor: color }}
        />
      );
    });
  };

  const heatmapDots = useMemo(generateHeatmap, []);

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F9F9FA]">
      {/* Topbar */}
      <div className="sticky top-0 z-30 bg-transparent px-8 py-5">
        <div className="flex items-center gap-6">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm transition-shadow focus-within:shadow-md">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                className="w-full bg-transparent outline-none text-[15px] placeholder:text-gray-400 font-medium"
                placeholder="Search post, image or content"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto text-sm font-medium text-gray-500">
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <FiClock className="text-lg" /> Set Reminder
            </button>
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <FiCalendar className="text-lg" /> Schedule Post
            </button>
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <FiCheckSquare className="text-lg" /> To-do list
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <button className="relative hover:text-gray-900 transition-colors">
              <FiBell className="text-xl" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                12
              </span>
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
              <img src={profileAvatar} alt="profile" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="flex-1 px-8 pb-8">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-7 space-y-6 flex flex-col">
            {/* Overview */}
            <CardShell className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-900">Overview</h3>
                <select className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer">
                  <option>1 Day</option>
                  <option>7 Days</option>
                  <option>30 Days</option>
                </select>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-900">Connected accounts</span>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span>Refreshed 20 sec ago</span>
                  <button onClick={fetchTwitter} className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                    <BsArrowRepeat className="text-sm" /> Refresh
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {platformsData.map((plat) => (
                  <div key={plat.id} className="rounded-[18px] border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                      <img src={plat.logo} alt={plat.name} className="h-5 w-5 object-contain" />
                      <span className="font-bold text-sm text-gray-900">{plat.name}</span>
                    </div>

                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-[28px] leading-none font-bold text-gray-900">{formatNumber(plat.followers)}</span>
                      <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mb-1">+{formatNumber(plat.followers)}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500">{plat.labelFollowers}</p>

                    <div className="mt-8 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 mb-1">Comments</p>
                        <p className="text-xs font-bold text-gray-900">{formatNumber(plat.comments)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 mb-1">Likes</p>
                        <p className="text-xs font-bold text-gray-900">{formatNumber(plat.likes)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardShell>

            {/* Engagement */}
            <CardShell className="p-7 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-900">Engagement</h3>
                <select className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer">
                  <option>1 Day</option>
                  <option>7 Days</option>
                </select>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    Instagram
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-200"></div>
                    Youtube
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-200"></div>
                    Twitter
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    <BsArrowRepeat className="text-sm" /> Refresh
                  </button>
                  <span className="text-[10px] font-medium text-gray-400 mt-1">Refreshed 20 sec ago</span>
                </div>
              </div>

              <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="engGradFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => val >= 1000 ? `${val / 1000}k` : val} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontWeight: 600 }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#engGradFill)"
                      activeDot={{ r: 6, fill: "#fff", stroke: "#3b82f6", strokeWidth: 3 }}
                      dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardShell>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-5 space-y-6 flex flex-col">
            {/* Active Promotion */}
            <CardShell className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-900">Active Promotion</h3>
                <select className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer">
                  <option>30 Days</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  Instagram
                </div>
                <div className="flex items-center gap-2 text-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-200"></div>
                  Youtube
                </div>
                <div className="flex items-center gap-2 text-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-200"></div>
                  Twitter
                </div>
              </div>

              <div className="h-[180px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={promotionData} barGap={4}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} dy={10} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="#dbeafe" radius={[4, 4, 0, 0]} activeBar={{ fill: "#3b82f6" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Followers</p>
                  <div className="flex items-center gap-1 mb-1">
                    <svg className="w-3 h-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-[17px] font-bold text-gray-900">35,543</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-medium">
                    <span className="text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">+1800</span>
                    <span className="text-gray-400">In last 2 hr</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Spending</p>
                  <p className="text-[17px] font-bold text-gray-900 mb-1">₹5,000</p>
                  <div className="inline-block text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                    3 days left
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Reach</p>
                  <div className="flex items-center gap-1 mb-1">
                    <svg className="w-3 h-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-[17px] font-bold text-gray-900">1.5L</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400">account reached</p>
                </div>
              </div>
            </CardShell>

            {/* Most active Time */}
            <CardShell className="p-7 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-900">Most active Time</h3>
                <select className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer">
                  <option>1 Day</option>
                </select>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer">
                    Instagram
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer">
                    Youtube
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer">
                    Twitter
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    <BsArrowRepeat className="text-sm" /> Refresh
                  </button>
                  <span className="text-[10px] font-medium text-gray-400 mt-1">Refreshed 20 sec ago</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(20, minmax(0, 1fr))` }}>
                  {heatmapDots}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-end border-t border-gray-100 pt-5">
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Most active time</p>
                  <p className="text-[13px] font-bold text-gray-900">12:00 PM - 13:45 PM</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Engagements</p>
                  <p className="text-[13px] font-bold text-gray-900">14,487</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Likes</p>
                  <p className="text-[13px] font-bold text-gray-900">+1,254</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Likes</p>
                  <p className="text-[13px] font-bold text-gray-900">+1,254</p>
                </div>
              </div>
            </CardShell>
          </div>

        </div>
      </main>
    </div>
  );
}
