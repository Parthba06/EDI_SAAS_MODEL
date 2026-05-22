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

  // --- Live Metrics State ---
  const [liveMetrics, setLiveMetrics] = useState({
    youtube: { followers: 125430, comments: 2450, likes: 452100, followersAdded: 0 },
    twitter: { followers: 45070, comments: 890, likes: 123400, followersAdded: 0 },
    instagram: { followers: 84812, comments: 4507, likes: 125458, followersAdded: 0 }
  });

  const [lastRefreshedSec, setLastRefreshedSec] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [livePromoMetrics, setLivePromoMetrics] = useState({
    followers: 35543,
    followersDelta: 1800,
    spending: 5000,
    reach: 154200,
    engagements: 14487,
    likesDelta: 1254,
    sharesDelta: 342
  });

  // Sync with API data if loaded, but avoid repeating identical defaults
  useEffect(() => {
    setLiveMetrics(prev => {
      const ytFollowersVal = ytStats?.subscriberCount ? Number(ytStats.subscriberCount) : 125430;
      const ytCommentsVal = ytStats?.viewCount ? Number(ytStats.viewCount) : 2450;
      const ytLikesVal = ytStats?.videoCount ? Number(ytStats.videoCount) : 452100;

      const twFollowersVal = twitterData?.data?.public_metrics?.followers_count ? Number(twitterData.data.public_metrics.followers_count) : 45070;
      const twCommentsVal = twitterData?.data?.public_metrics?.tweet_count ? Number(twitterData.data.public_metrics.tweet_count) : 890;
      const twLikesVal = twitterData?.data?.public_metrics?.like_count ? Number(twitterData.data.public_metrics.like_count) : 123400;

      return {
        youtube: { 
          followers: ytFollowersVal + prev.youtube.followersAdded, 
          comments: ytCommentsVal, 
          likes: ytLikesVal,
          followersAdded: prev.youtube.followersAdded 
        },
        twitter: { 
          followers: twFollowersVal + prev.twitter.followersAdded, 
          comments: twCommentsVal, 
          likes: twLikesVal,
          followersAdded: prev.twitter.followersAdded 
        },
        instagram: { 
          followers: 84812 + prev.instagram.followersAdded, 
          comments: 4507, 
          likes: 125458,
          followersAdded: prev.instagram.followersAdded 
        }
      };
    });
  }, [ytStats, twitterData]);

  // Real-time ticking interval (calmed to 12s with lower probability for a premium feed feel)
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Ticking metrics
      setLiveMetrics(prev => {
        const ytAdd = Math.random() > 0.75 ? Math.floor(Math.random() * 2) + 1 : 0;
        const twAdd = Math.random() > 0.8 ? Math.floor(Math.random() * 2) + 1 : 0;
        const igAdd = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
        
        return {
          youtube: {
            ...prev.youtube,
            followers: prev.youtube.followers + ytAdd,
            likes: prev.youtube.likes + (ytAdd ? Math.floor(Math.random() * 8) : 0),
            comments: prev.youtube.comments + (ytAdd && Math.random() > 0.5 ? 1 : 0),
            followersAdded: prev.youtube.followersAdded + ytAdd
          },
          twitter: {
            ...prev.twitter,
            followers: prev.twitter.followers + twAdd,
            likes: prev.twitter.likes + (twAdd ? Math.floor(Math.random() * 4) : 0),
            comments: prev.twitter.comments + (twAdd && Math.random() > 0.6 ? 1 : 0),
            followersAdded: prev.twitter.followersAdded + twAdd
          },
          instagram: {
            ...prev.instagram,
            followers: prev.instagram.followers + igAdd,
            likes: prev.instagram.likes + (igAdd ? Math.floor(Math.random() * 10) : 0),
            comments: prev.instagram.comments + (igAdd && Math.random() > 0.4 ? 1 : 0),
            followersAdded: prev.instagram.followersAdded + igAdd
          }
        };
      });

      // 2. Ticking promotion metrics
      setLivePromoMetrics(prev => {
        const promoAdd = Math.random() > 0.75 ? Math.floor(Math.random() * 2) + 1 : 0;
        const reachAdd = promoAdd ? Math.floor(Math.random() * 15) + 5 : 0;
        const likesAdd = promoAdd && Math.random() > 0.5 ? 1 : 0;
        const sharesAdd = promoAdd && Math.random() > 0.7 ? 1 : 0;
        return {
          ...prev,
          followers: prev.followers + promoAdd,
          followersDelta: prev.followersDelta + promoAdd,
          reach: prev.reach + reachAdd,
          engagements: prev.engagements + promoAdd + likesAdd,
          likesDelta: prev.likesDelta + likesAdd,
          sharesDelta: prev.sharesDelta + sharesAdd
        };
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Ticker for refreshed time
  useEffect(() => {
    const timer = setInterval(() => {
      setLastRefreshedSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Coordinated manual refresh
  const handleManualRefresh = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isRefreshing) return;
    setIsRefreshing(true);
    fetchTwitter();

    setTimeout(() => {
      setLiveMetrics(prev => {
        const ytAdd = Math.floor(Math.random() * 8) + 3;
        const twAdd = Math.floor(Math.random() * 5) + 2;
        const igAdd = Math.floor(Math.random() * 12) + 5;
        return {
          youtube: {
            ...prev.youtube,
            followers: prev.youtube.followers + ytAdd,
            likes: prev.youtube.likes + Math.floor(Math.random() * 50) + 10,
            comments: prev.youtube.comments + Math.floor(Math.random() * 6) + 1,
            followersAdded: prev.youtube.followersAdded + ytAdd
          },
          twitter: {
            ...prev.twitter,
            followers: prev.twitter.followers + twAdd,
            likes: prev.twitter.likes + Math.floor(Math.random() * 30) + 5,
            comments: prev.twitter.comments + Math.floor(Math.random() * 3) + 1,
            followersAdded: prev.twitter.followersAdded + twAdd
          },
          instagram: {
            ...prev.instagram,
            followers: prev.instagram.followers + igAdd,
            likes: prev.instagram.likes + Math.floor(Math.random() * 80) + 15,
            comments: prev.instagram.comments + Math.floor(Math.random() * 8) + 2,
            followersAdded: prev.instagram.followersAdded + igAdd
          }
        };
      });
      setLivePromoMetrics(prev => {
        const promoAdd = Math.floor(Math.random() * 15) + 5;
        return {
          ...prev,
          followers: prev.followers + promoAdd,
          followersDelta: prev.followersDelta + promoAdd,
          reach: prev.reach + Math.floor(Math.random() * 150) + 50,
          engagements: prev.engagements + promoAdd + Math.floor(Math.random() * 8)
        };
      });
      setLastRefreshedSec(0);
      setIsRefreshing(false);
    }, 1000);
  };

  const platformsData = [
    {
      id: "youtube",
      name: "YouTube",
      logo: youtubeLogo,
      followers: liveMetrics.youtube.followers,
      labelFollowers: "Subscribers",
      comments: liveMetrics.youtube.comments,
      likes: liveMetrics.youtube.likes,
    },
    {
      id: "twitter",
      name: "Twitter",
      logo: twitterLogo,
      followers: liveMetrics.twitter.followers,
      labelFollowers: "Followers",
      comments: liveMetrics.twitter.comments,
      likes: liveMetrics.twitter.likes,
    },
    {
      id: "instagram",
      name: "Instagram",
      logo: instaLogo,
      followers: liveMetrics.instagram.followers,
      labelFollowers: "Followers",
      comments: liveMetrics.instagram.comments,
      likes: liveMetrics.instagram.likes,
    },
  ];

  const formatNumber = (v: number) => v.toLocaleString();

  // Engagement chart dummy data resembling screenshot (memoized to prevent render shifts)
  const engagementData = useMemo(() => [
    { month: "Mar", value: 10000 },
    { month: "Apr", value: 12000 },
    { month: "May", value: 13500 },
    { month: "Jun", value: 13000 },
    { month: "Jul", value: 16487 },
    { month: "Aug", value: 18000 },
  ], []);

  // Active promotion chart dummy data (memoized with smooth, organic updates synced to slow reach ticks)
  const promotionData = useMemo(() => {
    const baseValues = [24500, 31200, 28400, 36000, 42500, 39000, 46487, 43000, 35000, 29000];
    return baseValues.map((baseVal, i) => {
      const fluctuation = (livePromoMetrics.reach % (i + 3)) * 40;
      return {
        hour: (13 + i).toString().padStart(2, "0"),
        value: baseVal + fluctuation,
      };
    });
  }, [livePromoMetrics.reach]);

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
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75`}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Sync • Refreshed {lastRefreshedSec}s ago
                  </span>
                  <button onClick={handleManualRefresh} className="flex items-center gap-1 hover:text-gray-900 transition-colors ml-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-md px-2 py-0.5">
                    <BsArrowRepeat className={`text-sm ${isRefreshing ? "animate-spin" : ""}`} /> Refresh
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {platformsData.map((plat) => (
                  <div key={plat.id} className="rounded-[18px] border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-6">
                      <img src={plat.logo} alt={plat.name} className="h-5 w-5 object-contain" />
                      <span className="font-bold text-sm text-gray-900">{plat.name}</span>
                    </div>

                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-[28px] leading-none font-bold text-gray-900 transition-all duration-500 tabular-nums">
                        {formatNumber(plat.followers)}
                      </span>
                      <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mb-1 transition-all duration-500">
                        +{formatNumber(plat.id === 'instagram' ? 840 + liveMetrics.instagram.followersAdded : plat.id === 'youtube' ? 1250 + liveMetrics.youtube.followersAdded : 450 + liveMetrics.twitter.followersAdded)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gray-500">{plat.labelFollowers}</p>

                    <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-4">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 mb-1">Comments</p>
                        <p className="text-xs font-bold text-gray-900 tabular-nums">{formatNumber(plat.comments)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 mb-1">Likes</p>
                        <p className="text-xs font-bold text-gray-900 tabular-nums">{formatNumber(plat.likes)}</p>
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
                  <button onClick={handleManualRefresh} className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-md px-2 py-0.5">
                    <BsArrowRepeat className={`text-sm ${isRefreshing ? "animate-spin" : ""}`} /> Refresh
                  </button>
                  <span className="text-[10px] font-medium text-gray-400 mt-1 font-mono">Refreshed {lastRefreshedSec}s ago</span>
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
                    <span className="text-[17px] font-bold text-gray-900 tabular-nums">{formatNumber(livePromoMetrics.followers)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-medium">
                    <span className="text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded tabular-nums">+{formatNumber(livePromoMetrics.followersDelta)}</span>
                    <span className="text-gray-400">In last 2 hr</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Spending</p>
                  <p className="text-[17px] font-bold text-gray-900 mb-1 tabular-nums">₹{formatNumber(livePromoMetrics.spending)}</p>
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
                    <span className="text-[17px] font-bold text-gray-900 tabular-nums">
                      {livePromoMetrics.reach >= 100000 ? `${(livePromoMetrics.reach / 100000).toFixed(2)}L` : formatNumber(livePromoMetrics.reach)}
                    </span>
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
                  <button onClick={handleManualRefresh} className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-md px-2 py-0.5">
                    <BsArrowRepeat className={`text-sm ${isRefreshing ? "animate-spin" : ""}`} /> Refresh
                  </button>
                  <span className="text-[10px] font-medium text-gray-400 mt-1 font-mono">Refreshed {lastRefreshedSec}s ago</span>
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
                  <p className="text-[13px] font-bold text-gray-900 tabular-nums">{formatNumber(livePromoMetrics.engagements)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Likes</p>
                  <p className="text-[13px] font-bold text-gray-900 tabular-nums">+{formatNumber(livePromoMetrics.likesDelta)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 mb-1">Shares</p>
                  <p className="text-[13px] font-bold text-gray-900 tabular-nums">+{formatNumber(livePromoMetrics.sharesDelta)}</p>
                </div>
              </div>
            </CardShell>
          </div>

        </div>
      </main>
    </div>
  );
}
