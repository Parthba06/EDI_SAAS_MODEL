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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Award,
  Users,
  Target,
  Sliders,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Check,
  Zap,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Eye,
  Activity,
  User,
  ZapOff
} from "lucide-react";

// --- Types & Data Models ---

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

interface CreatorPost {
  id: number;
  title: string;
  type: string;
  platform: Platform;
  hour: number;      // 0 - 23
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  captionLength: number;
  hashtags: string[];
}

interface AccountProfile {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
  posts: CreatorPost[];
  monthlyTarget: number;
}

// --- Dynamic Database Simulation Layer ---

// Base generation helper
const generateMockPosts = (account: string, platform: Platform): CreatorPost[] => {
  const posts: CreatorPost[] = [];
  const contentTypes = {
    instagram: ["Reels", "Carousel", "Post", "Stories"],
    youtube: ["Videos", "Shorts", "Lives"],
    twitter: ["Tweets", "Threads"]
  }[platform];

  // Tailor metrics per profile type
  let baseLikes = 2000;
  let baseViews = 15000;
  let peakHour = 19; // 7PM
  let peakDay = 5;  // Friday

  if (account === "@creative_studio") {
    baseLikes = platform === "instagram" ? 5000 : 3000;
    baseViews = platform === "instagram" ? 60000 : 25000;
    peakHour = 20; // 8PM
    peakDay = 6;  // Saturday
  } else if (account === "@tech_venture") {
    baseLikes = platform === "twitter" ? 4500 : 1500;
    baseViews = platform === "twitter" ? 80000 : 10000;
    peakHour = 10; // 10AM
    peakDay = 2;  // Tuesday
  } else {
    // @social_growth_lab
    baseLikes = 2500;
    baseViews = 30000;
    peakHour = 18; // 6PM
    peakDay = 1;  // Monday
  }

  // Generate 60 posts spread across the last 12 months
  for (let i = 1; i <= 60; i++) {
    const type = contentTypes[i % contentTypes.length];
    
    // Distribute hours and weekdays
    // Higher probability near peak hours & peak days
    const hourDev = Math.round((Math.random() - 0.5) * 6);
    let hour = (peakHour + hourDev + 24) % 24;
    // Add some random noise
    if (Math.random() > 0.7) hour = Math.floor(Math.random() * 24);

    const dayDev = Math.round((Math.random() - 0.5) * 3);
    let dayOfWeek = (peakDay + dayDev + 7) % 7;
    if (Math.random() > 0.8) dayOfWeek = Math.floor(Math.random() * 7);

    // Apply format modifiers
    let multiplier = 1.0;
    if (type === "Reels" || type === "Shorts" || type === "Threads") multiplier = 1.5;
    if (type === "Stories" || type === "Tweets") multiplier = 0.6;

    // Apply hour/day multiplier
    const hourFactor = hour === peakHour ? 1.4 : (Math.abs(hour - peakHour) <= 2 ? 1.2 : 0.8);
    const dayFactor = dayOfWeek === peakDay ? 1.3 : 0.9;

    const views = Math.round(baseViews * multiplier * hourFactor * dayFactor * (0.7 + Math.random() * 0.6));
    const likes = Math.round(baseLikes * multiplier * hourFactor * dayFactor * (0.65 + Math.random() * 0.7));
    
    // Funnel ratios
    const comments = Math.round(likes * 0.15 * (0.8 + Math.random() * 0.4));
    const shares = Math.round(likes * 0.08 * (0.7 + Math.random() * 0.5));
    const saves = Math.round(likes * 0.12 * (0.75 + Math.random() * 0.5));

    posts.push({
      id: i,
      title: `Strategic ${type} detailing ${platform} trends #${i}`,
      type,
      platform,
      hour,
      dayOfWeek,
      likes,
      comments,
      shares,
      saves,
      views,
      captionLength: 50 + (i * 8) % 300,
      hashtags: ["#AI", `#${platform}Grow`, "#creators", `#${type.toLowerCase()}`]
    });
  }

  return posts;
};

// Seed Profiles
const ACCOUNTS_DB: AccountProfile[] = [
  {
    id: "@creative_studio",
    name: "Creative Studio",
    handle: "@creative_studio",
    avatarColor: "from-pink-500 via-purple-500 to-indigo-500",
    monthlyTarget: 80000,
    posts: [
      ...generateMockPosts("@creative_studio", "instagram"),
      ...generateMockPosts("@creative_studio", "youtube"),
      ...generateMockPosts("@creative_studio", "twitter")
    ]
  },
  {
    id: "@tech_venture",
    name: "Tech Venture",
    handle: "@tech_venture",
    avatarColor: "from-blue-600 via-indigo-600 to-cyan-500",
    monthlyTarget: 120000,
    posts: [
      ...generateMockPosts("@tech_venture", "instagram"),
      ...generateMockPosts("@tech_venture", "youtube"),
      ...generateMockPosts("@tech_venture", "twitter")
    ]
  },
  {
    id: "@social_growth_lab",
    name: "Social Growth Lab",
    handle: "@social_growth_lab",
    avatarColor: "from-emerald-500 via-teal-500 to-emerald-700",
    monthlyTarget: 50000,
    posts: [
      ...generateMockPosts("@social_growth_lab", "instagram"),
      ...generateMockPosts("@social_growth_lab", "youtube"),
      ...generateMockPosts("@social_growth_lab", "twitter")
    ]
  }
];

const metricsConfig = [
  { key: "likes", label: "Likes", color: "#2563EB", icon: Heart },
  { key: "comments", label: "Comments", color: "#10B981", icon: MessageSquare },
  { key: "shares", label: "Shares", color: "#F59E0B", icon: Share2 },
  { key: "saves", label: "Saves", color: "#6366F1", icon: Bookmark },
  { key: "views", label: "Views", color: "#EC4899", icon: Eye }
] as const;

// Conversion rates mapping
const DAYS_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EngagementPage: React.FC = () => {
  // Central UI Filter States
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [range, setRange] = useState<Range>("30 Days");
  const [interval, setInterval] = useState<Interval>("daily");
  const [activeAccount, setActiveAccount] = useState<string>("@creative_studio");
  
  // Interactive Prediction Engine Inputs
  const [predictType, setPredictType] = useState<string>("");
  const [predictHour, setPredictHour] = useState<number>(20);
  const [predictHashtags, setPredictHashtags] = useState<string>("#AI, #creators, #growth");
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  // Grab active profile
  const currentProfile = useMemo(() => {
    return ACCOUNTS_DB.find((acc) => acc.id === activeAccount) || ACCOUNTS_DB[0];
  }, [activeAccount]);

  // Set default predict content type based on platform change
  useEffect(() => {
    const platformTypes = {
      instagram: "Reels",
      youtube: "Shorts",
      twitter: "Threads"
    };
    setPredictType(platformTypes[platform]);
    setPredictionResult(null);
  }, [platform]);

  // Handle Range Cycling (existing function layout)
  const handleRangeClick = () => {
    const options: Range[] = ["1 Day", "7 Days", "30 Days", "90 Days", "1 Year"];
    const currentIdx = options.indexOf(range);
    const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % options.length;
    setRange(options[nextIdx]);
  };

  // --- Core Dynamic Analytics Engine ---
  
  const analyticsData = useMemo(() => {
    // 1. Fetch user posts filtered by Platform
    const allPlatformPosts = currentProfile.posts.filter((post) => post.platform === platform);
    
    // 2. Filter posts by Date Range
    // Map Range names to post slices for realistic dynamics
    let sliceCount = 30;
    let growthMultiplier = 1.0;
    if (range === "1 Day") {
      sliceCount = 2;
      growthMultiplier = 0.65;
    } else if (range === "7 Days") {
      sliceCount = 8;
      growthMultiplier = 0.85;
    } else if (range === "30 Days") {
      sliceCount = 20;
      growthMultiplier = 1.05;
    } else if (range === "90 Days") {
      sliceCount = 40;
      growthMultiplier = 1.25;
    } else {
      sliceCount = 60;
      growthMultiplier = 1.45;
    }

    const filteredPosts = allPlatformPosts.slice(0, sliceCount);
    const postCount = filteredPosts.length || 1;

    // 3. Aggregate analytics totals
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    let totalSaves = 0;
    let totalViews = 0;

    filteredPosts.forEach((post) => {
      totalLikes += post.likes;
      totalComments += post.comments;
      totalShares += post.shares;
      totalSaves += post.saves;
      totalViews += post.views;
    });

    const avgLikes = Math.round(totalLikes / postCount);
    const avgComments = Math.round(totalComments / postCount);
    const avgShares = Math.round(totalShares / postCount);
    const avgSaves = Math.round(totalSaves / postCount);
    const avgViews = Math.round(totalViews / postCount);

    // 4. Calculate Main Line Series (Engagement Graph)
    // Create label intervals depending on interval selection
    let points: TimePoint[] = [];
    if (interval === "daily") {
      points = SHORT_DAYS.map((day, idx) => {
        // Average posts published on this day of week
        const dayPosts = filteredPosts.filter((p) => p.dayOfWeek === idx);
        const val = dayPosts.reduce((acc, curr) => acc + curr.likes + curr.comments, 0);
        return {
          label: day,
          value: dayPosts.length ? Math.round(val / dayPosts.length) : Math.round(1800 * (0.85 + idx * 0.04) * growthMultiplier)
        };
      });
    } else if (interval === "weekly") {
      points = [1, 2, 3, 4].map((wk) => {
        const chunk = filteredPosts.slice((wk - 1) * 4, wk * 4);
        const val = chunk.reduce((acc, curr) => acc + curr.likes + curr.comments, 0);
        return {
          label: `Week ${wk}`,
          value: chunk.length ? Math.round(val / chunk.length) : Math.round(2400 * wk * growthMultiplier)
        };
      });
    } else {
      // monthly
      points = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((mon, idx) => {
        const chunk = filteredPosts.slice(idx * 5, (idx + 1) * 5);
        const val = chunk.reduce((acc, curr) => acc + curr.likes + curr.comments, 0);
        return {
          label: mon,
          value: chunk.length ? Math.round(val / chunk.length) : Math.round(3100 * (0.9 + idx * 0.08) * growthMultiplier)
        };
      });
    }

    // 5. Monthly breakdown Stack Bar dataset (Advanced breakdown chart)
    const breakdownPoints: MetricBreakdownPoint[] = ["Jan", "Feb", "Mar", "Apr"].map((period, idx) => {
      const chunk = filteredPosts.slice(idx * 4, (idx + 1) * 4);
      return {
        period,
        likes: chunk.length ? Math.round(chunk.reduce((a, c) => a + c.likes, 0) / chunk.length) : Math.round(3500 + idx * 300),
        comments: chunk.length ? Math.round(chunk.reduce((a, c) => a + c.comments, 0) / chunk.length) : Math.round(500 + idx * 40),
        shares: chunk.length ? Math.round(chunk.reduce((a, c) => a + c.shares, 0) / chunk.length) : Math.round(250 + idx * 30),
        saves: chunk.length ? Math.round(chunk.reduce((a, c) => a + c.saves, 0) / chunk.length) : Math.round(200 + idx * 25)
      };
    });

    // 6. Top performing posts sorted dynamically by engagement score
    const sortedPosts = [...allPlatformPosts]
      .map((post) => {
        // Calculate custom engagement score out of 100
        const rawScore = (post.likes + post.comments * 2 + post.saves * 3) / 100;
        const normScore = Math.min(98, Math.max(72, Math.round(rawScore % 25 + 74)));
        return {
          ...post,
          score: normScore
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // 7. Calculate Section 4: Engagement Health Score
    // Formula components
    const likeEfficiency = Math.min(100, Math.round((avgLikes / 6000) * 100));
    const commentEfficiency = Math.min(100, Math.round((avgComments / 900) * 100));
    const saveEfficiency = Math.min(100, Math.round((avgSaves / 700) * 100));
    const shareEfficiency = Math.min(100, Math.round((avgShares / 500) * 100));
    // Consistency represents post volume relative to target
    const consistencyScore = Math.min(100, Math.round((postCount / 20) * 100));

    const totalHealthScore = Math.min(
      100,
      Math.round(
        likeEfficiency * 0.25 +
        commentEfficiency * 0.2 +
        saveEfficiency * 0.25 +
        shareEfficiency * 0.15 +
        consistencyScore * 0.15
      )
    );

    let healthLevel = "Weak";
    if (totalHealthScore > 90) healthLevel = "Elite";
    else if (totalHealthScore > 70) healthLevel = "Strong";
    else if (totalHealthScore > 40) healthLevel = "Growing";

    // 8. Section 5: Best Posting Window
    // Group posts by hour to find highest engagement
    const hourEngagement = Array(24).fill(0).map((_, h) => {
      const postsInHour = filteredPosts.filter((p) => p.hour === h);
      const totalScore = postsInHour.reduce((sum, p) => sum + p.likes + p.comments + p.shares + p.saves, 0);
      return {
        hour: h,
        count: postsInHour.length,
        avg: postsInHour.length ? Math.round(totalScore / postsInHour.length) : 0
      };
    });
    
    // Sort to find best hours
    const sortedHours = [...hourEngagement].sort((a, b) => b.avg - a.avg);
    const peakHourVal = sortedHours[0]?.hour ?? 19;
    const peakHourText = `${peakHourVal % 12 || 12}${peakHourVal >= 12 ? "PM" : "AM"}–${(peakHourVal + 2) % 12 || 12}${(peakHourVal + 2) >= 12 ? "PM" : "AM"}`;

    // Group by day of week
    const dayEngagement = Array(7).fill(0).map((_, d) => {
      const postsInDay = filteredPosts.filter((p) => p.dayOfWeek === d);
      const totalScore = postsInDay.reduce((sum, p) => sum + p.likes + p.comments + p.shares + p.saves, 0);
      return {
        day: d,
        avg: postsInDay.length ? Math.round(totalScore / postsInDay.length) : 0
      };
    });
    const sortedDays = [...dayEngagement].sort((a, b) => b.avg - a.avg);
    const bestDayOfWeek = sortedDays[0]?.day ?? 5;
    const bestDayText = `${DAYS_NAME[bestDayOfWeek]} ${peakHourVal % 12 || 12}${peakHourVal >= 12 ? "PM" : "AM"}`;

    // Missed opportunities (active slots where user posted 0 times but standard platform activity peaks)
    const missedOpps = Math.max(2, 6 - filteredPosts.filter((p) => p.hour === peakHourVal).length);

    // 9. Heatmap Cell Intensities
    // Y: 0 (Sun) to 6 (Sat)
    // X: 0 to 23 (Hours)
    const heatmapMatrix = Array(7).fill(0).map((_, dIdx) => {
      return Array(24).fill(0).map((_, hIdx) => {
        // Find historical post matching day and hour block
        const matchedPosts = filteredPosts.filter((p) => p.dayOfWeek === dIdx && Math.abs(p.hour - hIdx) <= 2);
        if (matchedPosts.length === 0) {
          // Fill baseline intensity based on profile peak config
          const hourDist = Math.abs(hIdx - peakHourVal);
          const dayDist = Math.abs(dIdx - bestDayOfWeek);
          const val = Math.max(10, Math.round(90 - hourDist * 12 - dayDist * 10 + Math.random() * 8));
          return Math.min(100, Math.max(10, val));
        }
        const total = matchedPosts.reduce((acc, curr) => acc + curr.likes + curr.comments, 0);
        const avgScore = total / matchedPosts.length;
        return Math.min(100, Math.max(20, Math.round((avgScore / 10000) * 100)));
      });
    });

    // 10. Section 6: Content Performance Breakdown Table
    const formats = {
      instagram: ["Reels", "Carousel", "Post", "Stories"],
      youtube: ["Videos", "Shorts", "Lives"],
      twitter: ["Tweets", "Threads"]
    }[platform];

    const contentBreakdown = formats.map((type) => {
      const typePosts = filteredPosts.filter((p) => p.type === type);
      const totalScore = typePosts.reduce((sum, p) => sum + p.likes + p.comments + p.shares + p.saves, 0);
      const avgScore = typePosts.length ? Math.round(totalScore / typePosts.length) : Math.round(2000 * growthMultiplier);
      const avgSavesVal = typePosts.length ? Math.round(typePosts.reduce((sum, p) => sum + p.saves, 0) / typePosts.length) : Math.round(150 * growthMultiplier);
      
      let rating = "Medium";
      let scoreVal = Math.min(98, Math.round((avgScore / 15000) * 100));
      if (scoreVal === 0) scoreVal = 55;
      if (scoreVal > 85) rating = "Very High";
      else if (scoreVal > 70) rating = "High";

      return {
        type,
        engagement: rating,
        saves: avgSavesVal,
        score: Math.max(62, scoreVal)
      };
    });

    // 11. Section 7: Funnel Data (Views -> Likes -> Comments -> Shares -> Saves)
    const funnelSteps = [
      { name: "Views", value: totalViews || 450000, color: "#EC4899", percent: 100 },
      { name: "Likes", value: totalLikes || 64000, color: "#2563EB", percent: Math.round(((totalLikes || 64000) / (totalViews || 450000)) * 100) },
      { name: "Comments", value: totalComments || 8500, color: "#10B981", percent: Math.round(((totalComments || 8500) / (totalLikes || 64000)) * 100) },
      { name: "Shares", value: totalShares || 4200, color: "#F59E0B", percent: Math.round(((totalShares || 4200) / (totalComments || 8500)) * 100) },
      { name: "Saves", value: totalSaves || 3600, color: "#6366F1", percent: Math.round(((totalSaves || 3600) / (totalShares || 4200)) * 100) }
    ];

    // 12. Section 9: Goal Progress
    const selectedTarget = currentProfile.monthlyTarget;
    const currentEngagement = totalLikes + totalComments;
    const progressPercent = Math.min(100, Math.round((currentEngagement / selectedTarget) * 100));
    
    // Pace and projected completion details
    const projectedCompletionPace = Math.round(currentEngagement * (30 / sliceCount));
    const projectedPercentage = Math.round((projectedCompletionPace / selectedTarget) * 100);
    const dailyTargetVal = Math.round((selectedTarget - currentEngagement) / Math.max(1, 30 - sliceCount));

    return {
      postCount,
      totalLikes,
      totalComments,
      totalShares,
      totalSaves,
      totalViews,
      avgLikes,
      avgComments,
      avgShares,
      avgSaves,
      avgViews,
      lineSeries: points,
      breakdownSeries: breakdownPoints,
      topPosts: sortedPosts,
      health: {
        score: totalHealthScore,
        likes: likeEfficiency,
        comments: commentEfficiency,
        saves: saveEfficiency,
        consistency: consistencyScore,
        level: healthLevel
      },
      postingWindow: {
        peakAudience: peakHourText,
        highestEngagement: bestDayText,
        weakSlot: `${platform === "instagram" ? "Thursday Morning" : "Monday Night"}`,
        missed: missedOpps
      },
      heatmapMatrix,
      contentBreakdown,
      funnelSteps,
      goal: {
        target: selectedTarget,
        current: currentEngagement,
        percent: progressPercent,
        projectedPace: projectedCompletionPace,
        projectedPct: projectedPercentage,
        dailyTarget: Math.max(0, dailyTargetVal)
      }
    };

  }, [currentProfile, platform, range, interval]);

  // --- Dynamic Prediction Calculator Engine ---
  const handlePredict = () => {
    setIsPredicting(true);
    
    setTimeout(() => {
      // Formulate unique score based on connected profile coefficients
      let baseVal = 70;
      let reachBonus = 12;
      let saveBonus = 15;

      if (currentProfile.id === "@tech_venture") {
        baseVal = predictType === "Threads" || predictType === "Videos" ? 88 : 64;
        reachBonus = predictHour >= 9 && predictHour <= 15 ? 24 : -4;
        saveBonus = predictHashtags.includes("AI") ? 32 : 10;
      } else if (currentProfile.id === "@creative_studio") {
        baseVal = predictType === "Reels" || predictType === "Shorts" ? 92 : 68;
        reachBonus = predictHour >= 18 && predictHour <= 22 ? 28 : 2;
        saveBonus = predictType === "Reels" ? 35 : 12;
      } else {
        // @social_growth_lab
        baseVal = 76;
        reachBonus = predictHour >= 17 && predictHour <= 20 ? 19 : 5;
        saveBonus = predictHashtags.length > 20 ? 18 : 6;
      }

      const predictedEngagement = Math.min(97, Math.max(48, Math.round(baseVal + (reachBonus * 0.4))));
      const expectedReach = Math.round(reachBonus + (Math.random() * 6 - 3));
      const expectedSaves = Math.round(saveBonus + (Math.random() * 8 - 4));

      setPredictionResult({
        reach: expectedReach >= 0 ? `+${expectedReach}%` : `${expectedReach}%`,
        engagement: `${predictedEngagement}%`,
        saves: expectedSaves >= 0 ? `+${expectedSaves}%` : `${expectedSaves}%`
      });
      setIsPredicting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FA] px-6 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* SECTION 1: HEADER & PROFILE SWAPPER */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white border border-gray-200/60 px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`h-11 w-11 rounded-xl bg-gradient-to-tr ${currentProfile.avatarColor} flex items-center justify-center text-white shadow-sm`}>
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900">Engagement Intelligence Center</h1>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">v2.1 AI Active</span>
              </div>
              
              {/* Account Profile Switcher Menu */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-slate-400 font-medium">Connected Channel:</span>
                <select
                  value={activeAccount}
                  onChange={(e) => setActiveAccount(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer hover:text-blue-600 transition-colors"
                >
                  {ACCOUNTS_DB.map((acc) => (
                    <option key={acc.id} value={acc.id} className="text-slate-800 font-semibold bg-white">
                      {acc.name} ({acc.handle})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Cycle range selection */}
            <button
              type="button"
              onClick={handleRangeClick}
              className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200/70 hover:bg-slate-100 hover:border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{range}</span>
              <FiChevronDown className="text-[10px] text-slate-400" />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 px-5 py-2 text-xs font-bold text-white transition shadow-sm"
            >
              <span>Export Analytics</span>
            </button>
          </div>
        </div>

        {/* Platform tabs + Interval filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f9] p-1 border border-slate-200/40">
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
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 " +
                    (selected
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800")
                  }
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f9] p-1 border border-slate-200/40 text-xs font-medium text-slate-600">
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
                  "px-3 py-1 rounded-full text-xs font-bold transition-all " +
                  (interval === f.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800")
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: EXISTING ENGAGEMENT GRAPH (Fully Dynamic) */}
        <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                <span>Engagement over time</span>
              </h2>
              <p className="mt-0.5 text-xs text-slate-400 font-medium">Track total interactions across likes, comments, shares and saves.</p>
            </div>
            <div className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
              Account: <span className="text-slate-700 capitalize">{platform}</span>
            </div>
          </div>

          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.lineSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="engGradientNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: "600" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: "600" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 12,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                    fontSize: 11,
                  }}
                  labelStyle={{ color: "#0F172A", fontWeight: 700 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, strokeWidth: 1.5, stroke: "#fff", fill: "#2563EB" }}
                  activeDot={{ r: 5 }}
                  fill="url(#engGradientNew)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 3: EXISTING METRIC CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metricsConfig.map((metric) => {
            const isViews = metric.key === "views";
            const totalVal = isViews ? analyticsData.totalViews : 
                             metric.key === "likes" ? analyticsData.totalLikes :
                             metric.key === "comments" ? analyticsData.totalComments :
                             metric.key === "shares" ? analyticsData.totalShares : analyticsData.totalSaves;

            const displayVal = totalVal >= 1000 ? `${(totalVal / 1000).toFixed(1)}K` : totalVal.toString();
            const growthSign = currentProfile.id === "@creative_studio" ? "+" : "+";
            const growthValue = isViews ? "14.2%" : metric.key === "likes" ? "12.4%" : metric.key === "saves" ? "21.6%" : "8.7%";

            return (
              <div
                key={metric.key}
                className="flex flex-col rounded-2xl bg-white border border-gray-200/60 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-slate-50 border border-slate-100">
                      <metric.icon className="h-3.5 w-3.5" style={{ color: metric.color }} />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">{metric.label}</span>
                  </div>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold bg-[#ECFDF3] text-[#15803D]"
                  >
                    {growthSign}{growthValue}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-xl font-black text-slate-900 tracking-tight">{displayVal}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Estimated total value</p>
                </div>

                {/* Sparkling mini chart */}
                <div className="mt-4 h-11 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.lineSeries}>
                      <XAxis dataKey="label" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{ display: "none" }} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={metric.color}
                        strokeWidth={1.8}
                        dot={false}
                        isAnimationActive
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 4: ENGAGEMENT HEALTH SCORE CARD (Section 1 in request) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>Engagement Health</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Calculated using historical weights and publishing regularity.</p>
              </div>

              {/* Glowing animated score layout */}
              <div className="flex items-center gap-4 py-3">
                <div className="relative flex items-center justify-center h-20 w-20">
                  <svg className="absolute transform -rotate-90 h-20 w-20">
                    <circle cx="40" cy="40" r="34" className="stroke-slate-100 fill-none" strokeWidth="6" />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      className="stroke-blue-600 fill-none transition-all duration-1000"
                      strokeWidth="6"
                      strokeDasharray={213.6}
                      strokeDashoffset={213.6 - (213.6 * analyticsData.health.score) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-xl font-black text-slate-900 tracking-tighter">{analyticsData.health.score}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Health Rating</span>
                  <span className={`text-base font-extrabold tracking-tight ${
                    analyticsData.health.level === "Elite" ? "text-indigo-600" :
                    analyticsData.health.level === "Strong" ? "text-blue-600" : "text-amber-500"
                  }`}>
                    {analyticsData.health.level} Level
                  </span>
                  <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Top {analyticsData.health.score}% of creators</span>
                </div>
              </div>

              {/* Progress metrics grid */}
              <div className="space-y-3 mt-4 pt-3.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-500">Likes Component</span>
                  <span className="font-extrabold text-slate-800">{analyticsData.health.likes}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-500">Comments Ratio</span>
                  <span className="font-extrabold text-slate-800">{analyticsData.health.comments}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-500">Save Efficiency</span>
                  <span className="font-extrabold text-slate-800">{analyticsData.health.saves}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-500">Posting Consistency</span>
                  <span className="font-extrabold text-slate-800">{analyticsData.health.consistency}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 text-[10px] text-slate-500 leading-relaxed font-semibold italic flex gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 animate-bounce" />
              <span>
                {currentProfile.id === "@creative_studio" && "AI Advisory: High save rates and strong Reel metrics boost indicators, but posting consistency holds back a flawless Elite level."}
                {currentProfile.id === "@tech_venture" && "AI Advisory: Twitter share conversions are exceptional, though video consistency during midweek peak activity needs improvement."}
                {currentProfile.id === "@social_growth_lab" && "AI Advisory: Stable comment metrics show organic community growth, though overall saves remain slightly behind average benchmarks."}
              </span>
            </div>
          </div>

          {/* SECTION 5: BEST POSTING WINDOW + OPPORTUNITY SLOTS */}
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Best Posting Window</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Correlating historic publishing hours with actual audience reactions.</p>
              </div>

              <div className="space-y-4">
                <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Peak Audience Activity</span>
                    <span className="text-xs font-extrabold text-slate-800">{analyticsData.postingWindow.peakAudience}</span>
                  </div>
                  <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    PM
                  </div>
                </div>

                <div className="p-3 border border-indigo-100 bg-indigo-50/20 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-indigo-700 block">Highest Historical Engagement</span>
                    <span className="text-xs font-extrabold text-indigo-900">{analyticsData.postingWindow.highestEngagement}</span>
                  </div>
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Zap className="h-4 w-4 fill-indigo-100" />
                  </div>
                </div>

                <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Weak Engagement Slot</span>
                    <span className="text-xs font-extrabold text-slate-600">{analyticsData.postingWindow.weakSlot}</span>
                  </div>
                  <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                    <ZapOff className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex justify-between items-center text-[10px]">
              <span className="font-semibold text-slate-400">Missed Opportunity Slots:</span>
              <span className="font-extrabold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">
                {analyticsData.postingWindow.missed} Targets Found
              </span>
            </div>
          </div>

          {/* SECTION 6: WEEKLY HEATMAP */}
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Audience Activity Heatmap</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Granular weekly activity index mapped hour-by-hour (0–23).</p>
            </div>

            {/* Micro cell grid matrix */}
            <div className="space-y-1.5 mt-4">
              {SHORT_DAYS.map((day, dIdx) => (
                <div key={day} className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                  <span className="w-6 shrink-0">{day}</span>
                  <div className="flex-1 grid gap-0.5" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
                    {Array(24).fill(0).map((_, hIdx) => {
                      const val = analyticsData.heatmapMatrix[dIdx][hIdx];
                      // Choose background blue color based on cell density
                      let bg = "bg-slate-50";
                      if (val > 80) bg = "bg-blue-600";
                      else if (val > 60) bg = "bg-blue-400";
                      else if (val > 45) bg = "bg-blue-300";
                      else if (val > 25) bg = "bg-blue-100";
                      else if (val > 10) bg = "bg-blue-50";

                      return (
                        <div
                          key={hIdx}
                          title={`${day} at ${hIdx}:00 - Engagement Intensity: ${val}%`}
                          className={`h-3 rounded-sm transition cursor-pointer hover:scale-125 ${bg}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span>Low</span>
                <span className="h-2 w-2 rounded bg-blue-50" />
                <span className="h-2 w-2 rounded bg-blue-100" />
                <span className="h-2 w-2 rounded bg-blue-300" />
                <span className="h-2 w-2 rounded bg-blue-400" />
                <span className="h-2 w-2 rounded bg-blue-600" />
                <span>Peak</span>
              </div>
              <span className="font-extrabold text-blue-600 italic">Weekend activity +34% stronger</span>
            </div>
          </div>

        </div>

        {/* Existing Advanced breakdown + Top performing posts (Preserved Layout) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Stacked bar breakdown */}
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-800">Engagement breakdown</h2>
              <p className="mt-0.5 text-xs text-slate-400 font-medium">Distribution of likes, comments, shares and saves by month.</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.breakdownSeries}
                  stackOffset="none"
                  margin={{ top: 16, right: 0, left: -24, bottom: 0 }}
                  barCategoryGap="25%"
                >
                  <CartesianGrid vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: "600" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: "600" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: 12,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                      fontSize: 11,
                    }}
                    labelStyle={{ color: "#0F172A", fontWeight: 700 }}
                  />
                  <Bar dataKey="likes" stackId="a" fill="#2563EB" radius={[4, 4, 0, 0]} isAnimationActive />
                  <Bar dataKey="comments" stackId="a" fill="#10B981" isAnimationActive />
                  <Bar dataKey="shares" stackId="a" fill="#F59E0B" isAnimationActive />
                  <Bar dataKey="saves" stackId="a" fill="#6366F1" radius={[0, 0, 4, 4]} isAnimationActive />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Posts scroll slider container */}
          <div className="col-span-2 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Top performing posts</h2>
                <p className="mt-0.5 text-xs text-slate-400 font-medium">Posts with the highest engagement score in the selected range.</p>
              </div>
              <span className="text-[9px] font-bold bg-slate-50 border border-slate-100 text-slate-400 px-2 py-0.5 rounded">
                Dynamic Rank
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 no-scrollbar">
              {analyticsData.topPosts.map((post) => (
                <div
                  key={post.id}
                  className="min-w-[250px] flex-shrink-0 rounded-2xl border border-slate-100 bg-slate-50/20 p-5 shadow-sm hover:border-slate-200 transition duration-300"
                >
                  <div className="flex h-full flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={`h-11 w-11 shrink-0 rounded-xl bg-gradient-to-tr ${currentProfile.avatarColor} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {post.type.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-slate-800">{post.title}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 capitalize">{post.type} · {post.platform}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Score</span>
                          <span className="font-extrabold text-slate-700">{post.score}/100</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Likes · Comments</span>
                          <span className="font-extrabold text-slate-700">
                            {post.likes.toLocaleString()} · {post.comments.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition py-2 text-[10px] font-bold"
                    >
                      View intelligence
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* SECTION 7: CONTENT PERFORMANCE BREAKDOWN (Section 4 in request) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Content Intelligence</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Average yields and virality potential per content format.</p>
              </div>

              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
                      <th className="p-3">Type</th>
                      <th className="p-3">Engagement</th>
                      <th className="p-3 text-right">Saves</th>
                      <th className="p-3 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {analyticsData.contentBreakdown.map((row) => (
                      <tr key={row.type} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-slate-700">{row.type}</td>
                        <td className="p-3 font-semibold text-slate-500">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            row.engagement === "Very High" ? "bg-indigo-50 text-indigo-600" :
                            row.engagement === "High" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"
                          }`}>
                            {row.engagement}
                          </span>
                        </td>
                        <td className="p-3 text-right font-extrabold text-slate-800">{row.saves.toLocaleString()}</td>
                        <td className="p-3 text-right font-black text-blue-600">{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 text-[10px] text-slate-500 leading-relaxed font-semibold italic flex items-start gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                {currentProfile.id === "@creative_studio" && "Reels drive 2.1x more engagement saves compared to static Carousel slots."}
                {currentProfile.id === "@tech_venture" && "Detailed Twitter threads generate 2.8x stronger click conversion over standard single posts."}
                {currentProfile.id === "@social_growth_lab" && "Standard Videos demonstrate consistent watch retention spikes over Shorts elements."}
              </span>
            </div>
          </div>

          {/* SECTION 8: ENGAGEMENT FUNNEL (Section 5 in request) */}
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span>Engagement Funnel</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Tracking conversion drops from raw video views to absolute saves.</p>
            </div>

            {/* Vertical funnel stack */}
            <div className="space-y-3.5 mt-4">
              {analyticsData.funnelSteps.map((step, idx) => (
                <div key={step.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: step.color }} />
                      <span className="font-bold text-slate-600">{step.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold">
                      <strong className="text-slate-800 font-black">{step.value.toLocaleString()}</strong> 
                      {idx > 0 && ` (${step.percent}% conversion)`}
                    </div>
                  </div>
                  
                  {/* Interactive progress bar */}
                  <div className="h-2 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.percent}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 text-[10px] text-slate-400 font-semibold italic">
              <strong>Funnel Analysis:</strong> High initial view-to-like conversion, but comment shares have a 12% dropoff compared to last week.
            </div>
          </div>

          {/* SECTION 9: INTERACTIVE ENGAGEMENT PREDICTION ENGINE (Section 6 in request) */}
          <div className="col-span-1 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span>Engagement Prediction Engine</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">AI-powered preview index matching hashtags & posting slots.</p>
              </div>

              {/* Form Input fields */}
              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Content Type</label>
                  <select
                    value={predictType}
                    onChange={(e) => setPredictType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    {{
                      instagram: ["Reels", "Carousel", "Post", "Stories"],
                      youtube: ["Videos", "Shorts", "Lives"],
                      twitter: ["Tweets", "Threads"]
                    }[platform].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Posting Time</label>
                    <select
                      value={predictHour}
                      onChange={(e) => setPredictHour(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                      {[8, 10, 12, 14, 16, 18, 20, 22].map((h) => (
                        <option key={h} value={h}>{h % 12 || 12} {h >= 12 ? "PM" : "AM"}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Target Platform</label>
                    <span className="w-full bg-slate-100 border border-slate-200/50 rounded-lg p-2 text-xs font-black text-slate-500 block text-center uppercase tracking-wide">
                      {platform}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Hashtags & Caption Keywords</label>
                  <input
                    type="text"
                    value={predictHashtags}
                    onChange={(e) => setPredictHashtags(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="#AI, #growth"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3.5">
              <button
                type="button"
                onClick={handlePredict}
                disabled={isPredicting}
                className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition py-2.5 text-xs font-bold shadow-sm"
              >
                {isPredicting ? "Analyzing Historical Matrices..." : "Calculate Expected Reach"}
              </button>

              <AnimatePresence mode="wait">
                {predictionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 border border-blue-100 rounded-xl bg-blue-50/20 grid grid-cols-3 gap-2 text-center"
                  >
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block">Expected Reach</span>
                      <span className="text-xs font-black text-blue-900">{predictionResult.reach}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block">Predicted Rate</span>
                      <span className="text-xs font-black text-indigo-900">{predictionResult.engagement}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block">Expected Saves</span>
                      <span className="text-xs font-black text-blue-900">{predictionResult.saves}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* SECTION 10: GOAL TRACKER & AI INSIGHTS (Sections 7 & 8 in request) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Monthly target progress */}
          <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>Target Engagement Progress</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Monitoring active goal levels and projected pacing ratios.</p>
              </div>

              <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/30 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Active Month Target</span>
                    <strong className="text-slate-800 text-sm font-black">{(analyticsData.goal.target / 1000).toFixed(0)}K Interactions</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Current Progress</span>
                    <strong className="text-blue-600 text-sm font-black">{(analyticsData.goal.current / 1000).toFixed(1)}K ({analyticsData.goal.percent}%)</strong>
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${analyticsData.goal.percent}%` }} />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-slate-500 font-semibold border-t border-slate-100">
                  <div>
                    <span className="block text-[8px] text-slate-400">Current Pace</span>
                    <strong className="text-slate-800 block mt-0.5">{(analyticsData.goal.projectedPace / 1000).toFixed(1)}K</strong>
                  </div>
                  <div>
                    <span className="block text-[8px] text-slate-400">Projected Target</span>
                    <strong className="text-indigo-600 block mt-0.5">{analyticsData.goal.projectedPct}%</strong>
                  </div>
                  <div>
                    <span className="block text-[8px] text-slate-400">Daily Target Req.</span>
                    <strong className="text-slate-800 block mt-0.5">{analyticsData.goal.dailyTarget.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 text-[10px] text-slate-500 leading-relaxed font-bold flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                {analyticsData.goal.projectedPct >= 100 
                  ? "At current engagement pace, you are projected to hit 104% of your monthly targets!" 
                  : `Need approximately +4 high-engagement ${predictType} entries to hit monthly targets.`}
              </span>
            </div>
          </div>

          {/* AI Insights and Analytics Observations */}
          <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Strategic Engagement Insights</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Chronological AI-synthesized feedback driven by active statistics.</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  type: "warning",
                  text: "Comment engagement ratios dropped 15% after publishing frequency reduced mid-month.",
                  color: "border-amber-100 bg-amber-50/20 text-amber-800"
                },
                {
                  id: 2,
                  type: "success",
                  text: `Publishing ${predictType} under 30 seconds delivers 1.8x higher average saves across all platforms.`,
                  color: "border-indigo-100 bg-indigo-50/20 text-indigo-800"
                },
                {
                  id: 3,
                  type: "info",
                  text: "Weekend uploads generate +34% higher average saves and interactions over standard weekday posts.",
                  color: "border-blue-100 bg-blue-50/20 text-blue-800"
                },
                {
                  id: 4,
                  type: "success",
                  text: "Detailed carousel slides dramatically raise audience retention and saves over single-post slots.",
                  color: "border-emerald-100 bg-emerald-50/20 text-emerald-800"
                }
              ].map((item) => (
                <div key={item.id} className={`p-3 border rounded-xl text-xs leading-relaxed font-semibold ${item.color}`}>
                  {item.text}
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
