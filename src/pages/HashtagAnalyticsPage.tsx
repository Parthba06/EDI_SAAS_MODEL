import React, { useMemo, useRef, useState, useEffect } from "react";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart2,
  Hash,
  Layers,
  ShieldAlert,
  Cpu,
  Bookmark,
  Share2,
  Users,
  Percent,
  Eye,
  Activity,
  Flame,
  Globe,
  Search,
  Check,
  Copy,
  Zap,
  Info,
  Sliders,
  TrendingDown,
  HelpCircle
} from "lucide-react";
import { generateAIHashtags as generateHashtags } from "../api/aiHashtagGenerator";

// --- Types & Data Models ---

type HashPlatform = "instagram" | "youtube" | "twitter";
type HashRange = "7 Days" | "30 Days" | "90 Days";
type MetricType = "reach" | "momentum" | "virality" | "engagement";

type LifecycleStage = "Emerging" | "Rising" | "Peak" | "Saturated" | "Declining";

interface EngagementQuality {
  label: string;
  value: number; // 0 to 100
  fullMark: number;
}

interface PlatformMetric {
  platform: string;
  reach: string;
  engagement: string;
  difficulty: "Low" | "Medium" | "High";
  barValue: number;
}

interface HashtagIntelligence {
  tag: string;
  category: "Viral Reach" | "Niche Growth" | "Educational" | "Community Building" | "Conversion Focused" | "Trend Riding";
  lifecycle: LifecycleStage;
  reach: string;
  reachNum: number;
  impressions: string;
  engagementRate: number;
  saves: string;
  shares: string;
  followerConversion: number;
  viralityScore: number;
  trendDirection: "up" | "down" | "flat";
  trendPercentage: number;
  
  // AI Explanation Details
  explanation: string;
  audienceRetention: string;
  strategyLabel: string;
  confidenceScore: number;
  growthIndicator: string;

  // Engagement Quality Analytics
  engagementQuality: EngagementQuality[];
  classification: "High Conversion" | "Viral Reach" | "Community Building" | "Passive Reach" | "Low-Quality Traffic";
  classificationDesc: string;

  // Opportunity Metrics
  competitionScore: number; // 0 to 100
  opportunityScore: number; // 0 to 100
  priorityBadge: "High Priority" | "Niche Gem" | "Steady Growth" | "Low Impact";
  opportunityReason: string;

  // Risk Parameters
  riskScore: number; // 0 to 100
  spamProbability: number; // 0 to 100
  riskLevel: "Low" | "Caution" | "High";
  riskWarnings: string[];

  // Platform Metrics
  platformBreakdown: PlatformMetric[];
}

// --- High-Fidelity Mock Database ---

const HASHTAG_DATABASE: HashtagIntelligence[] = [
  {
    tag: "#AITools",
    category: "Educational",
    lifecycle: "Rising",
    reach: "182K",
    reachNum: 182000,
    impressions: "340K",
    engagementRate: 8.4,
    saves: "+31%",
    shares: "+18%",
    followerConversion: 4.2,
    viralityScore: 78,
    trendDirection: "up",
    trendPercentage: 45,
    explanation: "#AITools performs strongly because it aligns with high-retention educational audiences. Content creators detailing specific utility use-cases drive long watch sessions.",
    audienceRetention: "87% retention on explanatory content containing step-by-step tool workflows.",
    strategyLabel: "Educational Virality",
    confidenceScore: 92,
    growthIndicator: "Strong upward momentum expected to continue for 14-18 days.",
    engagementQuality: [
      { label: "Comments Quality", value: 85, fullMark: 100 },
      { label: "Watch Depth", value: 92, fullMark: 100 },
      { label: "Save Rate", value: 89, fullMark: 100 },
      { label: "Share Rate", value: 72, fullMark: 100 },
      { label: "Repeat View", value: 78, fullMark: 100 },
      { label: "Conversion Rate", value: 81, fullMark: 100 },
    ],
    classification: "High Conversion",
    classificationDesc: "Drives high save probability and exceptionally deep community interaction.",
    competitionScore: 65,
    opportunityScore: 84,
    priorityBadge: "High Priority",
    opportunityReason: "#AITools shows an unusually low ratio of posts-to-engagement, meaning high-quality content is rewarded heavily by algorithmic filters.",
    riskScore: 18,
    spamProbability: 5,
    riskLevel: "Low",
    riskWarnings: ["Standard competition spikes on weekdays."],
    platformBreakdown: [
      { platform: "Instagram", reach: "110K", engagement: "7.8%", difficulty: "High", barValue: 85 },
      { platform: "Twitter/X", reach: "52K", engagement: "9.2%", difficulty: "Medium", barValue: 60 },
      { platform: "YouTube", reach: "20K", engagement: "11.1%", difficulty: "Low", barValue: 35 }
    ]
  },
  {
    tag: "#BuildWithAI",
    category: "Trend Riding",
    lifecycle: "Emerging",
    reach: "148K",
    reachNum: 148000,
    impressions: "290K",
    engagementRate: 9.6,
    saves: "+48%",
    shares: "+34%",
    followerConversion: 5.8,
    viralityScore: 89,
    trendDirection: "up",
    trendPercentage: 138,
    explanation: "This hashtag aligns with developer-entrepreneurs launching products. Direct build-in-public logs attract highly engaged, high-intent professionals who bookmark resources.",
    audienceRetention: "93% retention in code walkthroughs showing actual product deployments.",
    strategyLabel: "Build In Public",
    confidenceScore: 95,
    growthIndicator: "Breakout velocity observed. Ideal time to publish tech building blocks.",
    engagementQuality: [
      { label: "Comments Quality", value: 95, fullMark: 100 },
      { label: "Watch Depth", value: 88, fullMark: 100 },
      { label: "Save Rate", value: 96, fullMark: 100 },
      { label: "Share Rate", value: 82, fullMark: 100 },
      { label: "Repeat View", value: 84, fullMark: 100 },
      { label: "Conversion Rate", value: 91, fullMark: 100 },
    ],
    classification: "High Conversion",
    classificationDesc: "Classifies as a high-conversion cluster since followers convert to newsletter signups quickly.",
    competitionScore: 32,
    opportunityScore: 94,
    priorityBadge: "Niche Gem",
    opportunityReason: "Low competitive pressure on Reels and YouTube Shorts but massive developer audience interest.",
    riskScore: 10,
    spamProbability: 2,
    riskLevel: "Low",
    riskWarnings: ["No significant algorithmic risks detected."],
    platformBreakdown: [
      { platform: "Instagram", reach: "30K", engagement: "6.2%", difficulty: "Low", barValue: 20 },
      { platform: "Twitter/X", reach: "98K", engagement: "11.5%", difficulty: "High", barValue: 90 },
      { platform: "YouTube", reach: "20K", engagement: "8.4%", difficulty: "Medium", barValue: 50 }
    ]
  },
  {
    tag: "#AIAgents",
    category: "Viral Reach",
    lifecycle: "Rising",
    reach: "215K",
    reachNum: 215000,
    impressions: "420K",
    engagementRate: 7.2,
    saves: "+25%",
    shares: "+41%",
    followerConversion: 3.5,
    viralityScore: 92,
    trendDirection: "up",
    trendPercentage: 241,
    explanation: "#AIAgents is rising rapidly due to short-form automation content showing multi-agent systems. Explanations of autonomous systems command high initial reach.",
    audienceRetention: "81% retention on conceptual AI breakdowns, dropping off if implementation details are omitted.",
    strategyLabel: "Viral Automation",
    confidenceScore: 88,
    growthIndicator: "Strong virality curve with low fatigue. Niche is expanding globally.",
    engagementQuality: [
      { label: "Comments Quality", value: 71, fullMark: 100 },
      { label: "Watch Depth", value: 84, fullMark: 100 },
      { label: "Save Rate", value: 68, fullMark: 100 },
      { label: "Share Rate", value: 94, fullMark: 100 },
      { label: "Repeat View", value: 70, fullMark: 100 },
      { label: "Conversion Rate", value: 75, fullMark: 100 },
    ],
    classification: "Viral Reach",
    classificationDesc: "Excellent for cold-audience outreach and short-form discoverability algorithms.",
    competitionScore: 48,
    opportunityScore: 89,
    priorityBadge: "High Priority",
    opportunityReason: "High sharing rate makes it exceptionally simple to achieve algorithmic cross-pollination.",
    riskScore: 22,
    spamProbability: 8,
    riskLevel: "Low",
    riskWarnings: ["Minor spam cluster detected in Twitter replies."],
    platformBreakdown: [
      { platform: "Instagram", reach: "85K", engagement: "5.5%", difficulty: "Medium", barValue: 55 },
      { platform: "Twitter/X", reach: "105K", engagement: "8.9%", difficulty: "High", barValue: 80 },
      { platform: "YouTube", reach: "25K", engagement: "9.6%", difficulty: "Medium", barValue: 60 }
    ]
  },
  {
    tag: "#AIWorkflow",
    category: "Niche Growth",
    lifecycle: "Emerging",
    reach: "92K",
    reachNum: 92000,
    impressions: "160K",
    engagementRate: 11.2,
    saves: "+64%",
    shares: "+15%",
    followerConversion: 6.4,
    viralityScore: 71,
    trendDirection: "up",
    trendPercentage: 92,
    explanation: "#AIWorkflow drives deep tactical value. Niche professional audiences bookmark the actual prompt formulas and layout configurations to replicate them.",
    audienceRetention: "95% retention through the entire tool configuration walkthrough.",
    strategyLabel: "Workflow Blueprint",
    confidenceScore: 97,
    growthIndicator: "Steady exponential growth. Exceptional long-term consistency expected.",
    engagementQuality: [
      { label: "Comments Quality", value: 92, fullMark: 100 },
      { label: "Watch Depth", value: 97, fullMark: 100 },
      { label: "Save Rate", value: 99, fullMark: 100 },
      { label: "Share Rate", value: 60, fullMark: 100 },
      { label: "Repeat View", value: 91, fullMark: 100 },
      { label: "Conversion Rate", value: 93, fullMark: 100 },
    ],
    classification: "Community Building",
    classificationDesc: "Secures top conversion scores. Exceptional tool for building newsletter list and brand trust.",
    competitionScore: 21,
    opportunityScore: 91,
    priorityBadge: "Niche Gem",
    opportunityReason: "High save probability indicates viewers perceive this content as valuable reference material.",
    riskScore: 5,
    spamProbability: 1,
    riskLevel: "Low",
    riskWarnings: ["Extremely safe hashtag to utilize across all developer/creator niches."],
    platformBreakdown: [
      { platform: "Instagram", reach: "42K", engagement: "10.4%", difficulty: "Low", barValue: 25 },
      { platform: "Twitter/X", reach: "38K", engagement: "11.1%", difficulty: "Medium", barValue: 45 },
      { platform: "YouTube", reach: "12K", engagement: "13.2%", difficulty: "Low", barValue: 15 }
    ]
  },
  {
    tag: "#ChatGPT",
    category: "Conversion Focused",
    lifecycle: "Saturated",
    reach: "380K",
    reachNum: 380000,
    impressions: "920K",
    engagementRate: 3.1,
    saves: "-12%",
    shares: "+4%",
    followerConversion: 0.9,
    viralityScore: 42,
    trendDirection: "down",
    trendPercentage: -14,
    explanation: "This hashtag suffers from severe generic oversaturation. While absolute impressions remain high, conversion and real engagement quality have sharply declined.",
    audienceRetention: "42% retention. Audiences have developed fatigue for generic ChatGPT tips and listicles.",
    strategyLabel: "Fatigued Broad Niche",
    confidenceScore: 40,
    growthIndicator: "Declining trend velocity. Recommend rotating with specialized prompts tags.",
    engagementQuality: [
      { label: "Comments Quality", value: 30, fullMark: 100 },
      { label: "Watch Depth", value: 45, fullMark: 100 },
      { label: "Save Rate", value: 35, fullMark: 100 },
      { label: "Share Rate", value: 38, fullMark: 100 },
      { label: "Repeat View", value: 28, fullMark: 100 },
      { label: "Conversion Rate", value: 22, fullMark: 100 },
    ],
    classification: "Passive Reach",
    classificationDesc: "Generates high bulk impressions but provides extremely low engagement quality and poor CTR.",
    competitionScore: 98,
    opportunityScore: 15,
    priorityBadge: "Low Impact",
    opportunityReason: "Too many generic accounts auto-publishing identical content under this tag.",
    riskScore: 78,
    spamProbability: 64,
    riskLevel: "High",
    riskWarnings: ["Over-saturated tag.", "High correlation with auto-generated spam networks.", "Lowered reach weight in algorithmic feeds."],
    platformBreakdown: [
      { platform: "Instagram", reach: "190K", engagement: "2.8%", difficulty: "High", barValue: 98 },
      { platform: "Twitter/X", reach: "140K", engagement: "3.2%", difficulty: "High", barValue: 95 },
      { platform: "YouTube", reach: "50K", engagement: "4.0%", difficulty: "High", barValue: 90 }
    ]
  },
  {
    tag: "#NoCodeStartup",
    category: "Community Building",
    lifecycle: "Peak",
    reach: "115K",
    reachNum: 115000,
    impressions: "210K",
    engagementRate: 6.8,
    saves: "+19%",
    shares: "+12%",
    followerConversion: 3.1,
    viralityScore: 68,
    trendDirection: "flat",
    trendPercentage: 4,
    explanation: "#NoCodeStartup serves as a robust hub for indie makers. The tag drives moderate reach but high conversation quality, establishing a highly loyal subscriber core.",
    audienceRetention: "79% retention on product demos and pricing page reviews.",
    strategyLabel: "Indie Hub Builder",
    confidenceScore: 82,
    growthIndicator: "Mature, steady volume. Strong base of repeat viewers and comments.",
    engagementQuality: [
      { label: "Comments Quality", value: 88, fullMark: 100 },
      { label: "Watch Depth", value: 81, fullMark: 100 },
      { label: "Save Rate", value: 74, fullMark: 100 },
      { label: "Share Rate", value: 55, fullMark: 100 },
      { label: "Repeat View", value: 85, fullMark: 100 },
      { label: "Conversion Rate", value: 79, fullMark: 100 },
    ],
    classification: "Community Building",
    classificationDesc: "Exceptional metric index for long-form discussion and interactive customer discovery.",
    competitionScore: 50,
    opportunityScore: 70,
    priorityBadge: "Steady Growth",
    opportunityReason: "Audience is highly targeted, representing qualified early-adopter buyers and tech supporters.",
    riskScore: 28,
    spamProbability: 12,
    riskLevel: "Low",
    riskWarnings: ["Moderate competition on Twitter/X building logs."],
    platformBreakdown: [
      { platform: "Instagram", reach: "45K", engagement: "5.8%", difficulty: "Medium", barValue: 60 },
      { platform: "Twitter/X", reach: "58K", engagement: "7.9%", difficulty: "Medium", barValue: 55 },
      { platform: "YouTube", reach: "12K", engagement: "8.1%", difficulty: "Medium", barValue: 40 }
    ]
  }
];

// --- Live Activity Feed Generator ---
const INITIAL_LIVE_FEED = [
  { id: 1, text: "#AIAgents trending among startup creators.", momentum: "+241%", time: "Just now", type: "breakout" },
  { id: 2, text: "Educational automation hashtags gained 31% more saves this week.", momentum: "Top Save Rate", time: "2 min ago", type: "insight" },
  { id: 3, text: "#AIWorkflow is rising rapidly in the developer-tooling niche.", momentum: "+92%", time: "5 min ago", type: "rising" },
  { id: 4, text: "Short-form productivity hashtags outperform broad tech tags by 3.8x.", momentum: "Aesthetic Core", time: "12 min ago", type: "tip" },
  { id: 5, text: "#ChatGPT has reached peak saturation, dropping engagement by 14%.", momentum: "Declining", time: "20 min ago", type: "risk" },
];

const NEW_FEED_SIMULATOR = [
  { text: "#BuildWithAI spiked +138% on Twitter/X in developer circles.", momentum: "+138%", type: "breakout" },
  { text: "Niche hashtags with <20K uses are driving 18% higher watch depths.", momentum: "+18% Depth", type: "insight" },
  { text: "#NoCodeStartup showing positive save rates under Instagram algorithms.", momentum: "Stable Trend", type: "rising" },
  { text: "Spam flags detected on broad tags like #AI and #Tech.", momentum: "Caution advised", type: "risk" }
];

// --- Trend Graph Series Simulator ---
const generateChartData = (tag: string, metric: MetricType, range: HashRange) => {
  const pointsCount = range === "7 Days" ? 7 : range === "30 Days" ? 30 : 90;
  const dbItem = HASHTAG_DATABASE.find(x => x.tag === tag) || HASHTAG_DATABASE[0];
  
  // Set base numbers based on active metric
  let baseVal = 50;
  let multiplier = 1;
  
  if (metric === "reach") {
    baseVal = dbItem.reachNum / 5000; 
    multiplier = 1.2;
  } else if (metric === "momentum") {
    baseVal = Math.max(10, dbItem.trendPercentage + 50);
    multiplier = 0.95;
  } else if (metric === "virality") {
    baseVal = dbItem.viralityScore;
    multiplier = 1.05;
  } else if (metric === "engagement") {
    baseVal = dbItem.engagementRate * 10;
    multiplier = 0.85;
  }

  const list = [];
  const startDay = new Date();
  startDay.setDate(startDay.getDate() - pointsCount);

  for (let i = 0; i < pointsCount; i++) {
    const d = new Date(startDay);
    d.setDate(startDay.getDate() + i);
    const dayLabel = d.toLocaleDateString([], { month: "short", day: "numeric" });
    
    // Add realistic noise, spikes, and trend curves
    const noise = Math.sin(i * 0.4) * (baseVal * 0.15);
    const spike = i > pointsCount * 0.75 && dbItem.trendDirection === "up" 
      ? (i - pointsCount * 0.75) * (baseVal * 0.08) 
      : 0;
    const drop = i > pointsCount * 0.6 && dbItem.trendDirection === "down" 
      ? -(i - pointsCount * 0.6) * (baseVal * 0.05) 
      : 0;
    
    const value = Math.max(5, Math.round((baseVal + noise + spike + drop) * multiplier));
    
    list.push({
      date: dayLabel,
      value: value,
      average: Math.round(baseVal * multiplier),
      competitors: Math.round((baseVal * 0.7 + Math.cos(i * 0.5) * (baseVal * 0.1)) * multiplier)
    });
  }
  return list;
};

// --- Main Page Component ---

const HashtagAnalyticsPage: React.FC = () => {
  // Navigation active values
  const [platform, setPlatform] = useState<HashPlatform>("instagram");
  const [range, setRange] = useState<HashRange>("30 Days");
  
  // Selection states
  const [selectedTag, setSelectedTag] = useState<string>("#AITools");
  const [chartMetric, setChartMetric] = useState<MetricType>("reach");
  
  // Interactive Gemini generator states
  const [searchTopic, setSearchTopic] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedChips, setGeneratedChips] = useState<string[]>([]);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  // Live feed states
  const [liveFeed, setLiveFeed] = useState(INITIAL_LIVE_FEED);

  // Opportunity detection scanning states
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStepText, setScanStepText] = useState<string>("");
  const [discoveredOpportunities, setDiscoveredOpportunities] = useState<typeof HASHTAG_DATABASE>([]);
  
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  // Live ticking state for hashtag statistics
  const [liveHashtagMetrics, setLiveHashtagMetrics] = useState<Record<string, {
    reachNum: number;
    engagementRate: number;
    savesCount: number;
    impressionsNum: number;
    viralityScore: number;
  }>>(() => {
    const initial: Record<string, any> = {};
    HASHTAG_DATABASE.forEach(item => {
      initial[item.tag] = {
        reachNum: item.reachNum,
        engagementRate: item.engagementRate,
        savesCount: parseInt(item.saves) || 20,
        impressionsNum: parseInt(item.impressions) * 1000 || item.reachNum * 1.8,
        viralityScore: item.viralityScore
      };
    });
    return initial;
  });

  const [justUpdatedTag, setJustUpdatedTag] = useState<string | null>(null);

  // Utility to format number to K/M
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Real-time ticking telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const tags = HASHTAG_DATABASE.map(x => x.tag);
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      
      setLiveHashtagMetrics(prev => {
        const next = { ...prev };
        const current = next[randomTag];
        if (current) {
          const reachIncrement = Math.floor(Math.random() * 35) + 5; // +5 to +40 reach
          const newReach = current.reachNum + reachIncrement;
          const newImpressions = current.impressionsNum + Math.floor(reachIncrement * (1.5 + Math.random()));
          const newEngagement = Math.max(1, Math.min(25, current.engagementRate + (Math.random() * 0.4 - 0.2)));
          const newVirality = Math.max(10, Math.min(100, current.viralityScore + (Math.random() * 2 - 1)));
          
          next[randomTag] = {
            ...current,
            reachNum: newReach,
            impressionsNum: newImpressions,
            engagementRate: newEngagement,
            viralityScore: newVirality
          };
        }
        return next;
      });

      setJustUpdatedTag(randomTag);
      const timeout = setTimeout(() => setJustUpdatedTag(null), 1000);
      return () => clearTimeout(timeout);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Periodic scrolling feed updates simulation - accelerated to 6s
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUpdate = NEW_FEED_SIMULATOR[Math.floor(Math.random() * NEW_FEED_SIMULATOR.length)];
      setLiveFeed(prev => [
        {
          id: Date.now(),
          text: randomUpdate.text,
          momentum: randomUpdate.momentum,
          time: "Just now",
          type: randomUpdate.type
        },
        ...prev.slice(0, 5)
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // active selected object in state with live ticks merged
  const activeHashtag = useMemo(() => {
    const staticItem = HASHTAG_DATABASE.find(x => x.tag === selectedTag) || HASHTAG_DATABASE[0];
    const live = liveHashtagMetrics[staticItem.tag];
    if (!live) return staticItem;
    
    // Create dynamically shifting engagement quality array
    const liveQuality = staticItem.engagementQuality.map(eq => {
      // Oscillate by ±1 to ±3 points
      const offset = Math.floor(Math.sin(Date.now() / 1500 + eq.value) * 3);
      return {
        ...eq,
        value: Math.max(10, Math.min(100, eq.value + offset))
      };
    });

    return {
      ...staticItem,
      reachNum: live.reachNum,
      reach: formatNumber(live.reachNum),
      impressions: formatNumber(live.impressionsNum),
      engagementRate: parseFloat(live.engagementRate.toFixed(2)),
      viralityScore: Math.round(live.viralityScore),
      engagementQuality: liveQuality
    };
  }, [selectedTag, liveHashtagMetrics]);

  // dynamic chart lines - now synced with live ticking data point at end
  const chartData = useMemo(() => {
    const baseData = generateChartData(selectedTag, chartMetric, range);
    if (baseData.length > 0) {
      const lastIndex = baseData.length - 1;
      if (chartMetric === "reach") {
        baseData[lastIndex].value = Math.round(activeHashtag.reachNum / 5000);
      } else if (chartMetric === "momentum") {
        baseData[lastIndex].value = Math.max(10, activeHashtag.trendPercentage + 50);
      } else if (chartMetric === "virality") {
        baseData[lastIndex].value = activeHashtag.viralityScore;
      } else if (chartMetric === "engagement") {
        baseData[lastIndex].value = Math.round(activeHashtag.engagementRate * 10);
      }
    }
    return baseData;
  }, [selectedTag, chartMetric, range, activeHashtag]);

  // platform color coding
  const getPlatformIcon = (plat: string) => {
    switch (plat.toLowerCase()) {
      case "instagram":
        return (
          <svg className="h-3.5 w-3.5 fill-pink-500" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );
      case "twitter/x":
      case "twitter":
        return (
          <svg className="h-3.5 w-3.5 fill-slate-900 dark:fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="h-3.5 w-3.5 fill-red-600" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108c.502-1.865.502-5.837.502-5.837s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return <Globe className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedTag(text);
        setTimeout(() => setCopiedTag(null), 1500);
      }).catch(() => {});
    }
  };

  const handleGenerateHashtags = async () => {
    if (!searchTopic.trim()) return;
    setIsGenerating(true);
    suggestionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const result = await generateHashtags(searchTopic);
      setGeneratedChips(result.length > 0 ? result : ["#AITools", "#BuildWithAI", "#AIAgents", "#AIWorkflow", "#NoCodeStartup"]);
    } catch (error) {
      console.error("Gemini model call failed, fallback loaded", error);
      setGeneratedChips(["#AITools", "#BuildWithAI", "#AIAgents", "#AIWorkflow", "#NoCodeStartup"]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Opportunity scanner simulator
  const handleScanOpportunities = () => {
    setIsScanning(true);
    setScanProgress(5);
    setScanStepText("Querying local niche index files...");
    setDiscoveredOpportunities([]);

    const steps = [
      { p: 20, t: "Evaluating relative post density vs audience views..." },
      { p: 45, t: "Filtering out oversaturated tags and spam registries..." },
      { p: 70, t: "Calculating optimal viral growth multipliers per platform..." },
      { p: 90, t: "Ranking performance ratios and generating opportunity scores..." },
      { p: 100, t: "Strategic opportunities detected!" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setScanProgress(step.p);
        setScanStepText(step.t);
        if (step.p === 100) {
          setTimeout(() => {
            setIsScanning(false);
            // filter tags with high opportunity score
            const opportunities = HASHTAG_DATABASE.filter(x => x.opportunityScore >= 80);
            setDiscoveredOpportunities(opportunities);
          }, 800);
        }
      }, (idx + 1) * 800);
    });
  };

  // lifecycle color codes
  const getLifecycleColor = (stage: LifecycleStage) => {
    switch (stage) {
      case "Emerging":
        return "bg-cyan-50 text-cyan-600 border border-cyan-200/50";
      case "Rising":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200/50";
      case "Peak":
        return "bg-blue-50 text-blue-600 border border-blue-200/50";
      case "Saturated":
        return "bg-amber-50 text-amber-600 border border-amber-200/50";
      case "Declining":
        return "bg-rose-50 text-rose-600 border border-rose-200/50";
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FA] px-6 py-8 text-slate-800 font-sans">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* --- PREMIUM INTELLIGENCE HEADER --- */}
        <div className="flex flex-col gap-5 rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600">
              <Cpu className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hashtag Intelligence Engine</h1>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>AI Predictor Live</span>
                </div>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                Advanced cross-platform virality scoring, lifecycle index, and predictive niche analytics.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Selector */}
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 text-[11px] font-medium text-slate-600">
              {([
                { id: "instagram", label: "Instagram" },
                { id: "youtube", label: "YouTube" },
                { id: "twitter", label: "Twitter/X" },
              ] as const).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={
                    "px-3.5 py-1.5 rounded-full transition-all duration-200 " +
                    (platform === p.id
                      ? "bg-white text-blue-600 shadow-sm font-semibold"
                      : "text-slate-600 hover:text-slate-900")
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Time-Range Selector */}
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 text-[11px] font-medium text-slate-600">
              {([
                { id: "7 Days" },
                { id: "30 Days" },
                { id: "90 Days" },
              ] as const).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRange(r.id)}
                  className={
                    "px-3 py-1.5 rounded-full transition-all duration-200 " +
                    (range === r.id
                      ? "bg-white text-blue-600 shadow-sm font-semibold"
                      : "text-slate-500 hover:text-slate-800")
                  }
                >
                  {r.id}
                </button>
              ))}
            </div>

            {/* AI scroll shortcut */}
            <button
              type="button"
              onClick={() => suggestionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/10 hover:opacity-90 active:scale-95 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Generator</span>
            </button>
          </div>
        </div>

        {/* --- MODULE 2: PREMIUM HASHTAG PERFORMANCE CARDS --- */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sliders className="h-3.5 w-3.5 text-slate-400" />
              <span>Select Hashtag Telemetry Card to Analyze</span>
            </h2>
            <span className="text-[10px] text-slate-400 italic">Click a card below to stream deep AI insights</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {HASHTAG_DATABASE.map((item) => {
              const isActive = selectedTag === item.tag;
              const isUpdated = justUpdatedTag === item.tag;
              const live = liveHashtagMetrics[item.tag] || item;
              return (
                <motion.div
                  key={item.tag}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedTag(item.tag)}
                  className={`cursor-pointer rounded-xl bg-white p-4 border transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.01)] ${
                    isActive
                      ? "border-blue-500 ring-2 ring-blue-500/10 bg-gradient-to-b from-white to-blue-50/5"
                      : isUpdated
                      ? "border-emerald-300 bg-emerald-50/15 ring-2 ring-emerald-500/10 shadow-[0_8px_30px_rgba(16,185,129,0.12)] scale-[1.02]"
                      : "border-gray-200/60 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-xs font-bold truncate max-w-[80%] transition-colors duration-300 ${
                      isUpdated ? "text-emerald-600 font-extrabold" : "text-slate-900"
                    }`}>
                      {item.tag}
                    </span>
                    <span className={`inline-flex rounded-full p-0.5 ${item.trendDirection === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"}`}>
                      {item.trendDirection === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Reach</span>
                      <span className={`font-bold tabular-nums transition-colors duration-300 ${isUpdated ? "text-emerald-600 font-extrabold" : "text-slate-700"}`}>
                        {formatNumber(live.reachNum)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Engagement</span>
                      <span className="font-bold text-slate-700 tabular-nums">{live.engagementRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Virality</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-900 tabular-nums">{Math.round(live.viralityScore)}</span>
                        <div className="h-2 w-8 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              live.viralityScore > 80 ? "bg-emerald-500" : live.viralityScore > 60 ? "bg-blue-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${live.viralityScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${getLifecycleColor(item.lifecycle)}`}>
                      {item.lifecycle}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600">{item.saves} Saves</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- MAIN CORE ANALYTICAL BENTO WORKSPACE --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* LEFT/CENTER DOUBLE COLUMN (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ROW 1: AI EXPLANATION ENGINE (MOST IMPORTANT) + ENGAGEMENT QUALITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Module 3: AI Explanation Engine */}
              <div className="relative rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                {/* Neon light stripe */}
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">AI Performance Intelligence</h3>
                  </div>
                  <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[9px] font-bold text-indigo-600 uppercase">
                    {activeHashtag.strategyLabel}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">System Analysis for {activeHashtag.tag}</span>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                      “{activeHashtag.explanation}”
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="rounded-xl border border-slate-100 bg-white p-3">
                      <span className="text-[9px] text-slate-400 block">AI Confidence Score</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-lg font-extrabold text-slate-900">{activeHashtag.confidenceScore}%</span>
                        <span className="text-[8px] text-emerald-600 font-bold">Highly Trustworthy</span>
                      </div>
                    </div>
                    
                    <div className="rounded-xl border border-slate-100 bg-white p-3">
                      <span className="text-[9px] text-slate-400 block">Audience Match Quality</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-lg font-extrabold text-slate-900">Optimal</span>
                        <span className="text-[8px] text-indigo-600 font-bold">Tech/Creators</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-50/40 border border-blue-100/50 px-3 py-2 flex items-start gap-2">
                    <Info className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[9px] font-bold text-blue-800">Predictive Niche Indicator</span>
                      <p className="text-[10px] text-blue-700 mt-0.5">{activeHashtag.growthIndicator}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 4: Engagement Quality Analysis */}
              <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Activity className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">Engagement Quality Radar</h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                      {activeHashtag.classification}
                    </span>
                  </div>

                  <div className="h-36 w-full flex items-center justify-center my-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={activeHashtag.engagementQuality}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="label" tick={{ fill: "#64748B", fontSize: 8, fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 8 }} />
                        <Radar
                          name={activeHashtag.tag}
                          dataKey="value"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.25}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Class Quality Index</span>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    {activeHashtag.classificationDesc}
                  </p>
                </div>
              </div>

            </div>

            {/* ROW 2: TREND MOMENTUM VISUALIZATION (Module 8) */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Trend Momentum Acceleration</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Interactive momentum curves tracking active performance indexes (Stripe & TradingView inspired).
                  </p>
                </div>

                {/* Metric Toggles */}
                <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-[10px] font-semibold text-slate-600 self-start sm:self-center">
                  {([
                    { id: "reach", label: "Reach" },
                    { id: "momentum", label: "Momentum" },
                    { id: "virality", label: "Virality" },
                    { id: "engagement", label: "Engagement" },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setChartMetric(m.id)}
                      className={
                        "px-2.5 py-1 rounded-md capitalize transition-all duration-200 " +
                        (chartMetric === m.id
                          ? "bg-white text-slate-900 shadow-sm font-bold"
                          : "text-slate-500 hover:text-slate-800")
                      }
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main LineChart graph */}
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 9, fontWeight: 500 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 9, fontWeight: 500 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: 12,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
                        fontSize: 11
                      }}
                      labelStyle={{ fontWeight: "bold", color: "#1E293B" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#chartGradient)"
                      name={`${chartMetric} index`}
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#94A3B8"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      dot={false}
                      name="Baseline Average"
                    />
                    <Area
                      type="monotone"
                      dataKey="competitors"
                      stroke="#A855F7"
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                      fill="none"
                      name="Competitor Niche Level"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend info */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[10px] text-slate-400 gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Your Hashtag Velocity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    <span>Niche Competitor Average</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-0.5 w-3 bg-slate-400 border-dashed" />
                    <span>Baseline Expectation</span>
                  </div>
                </div>
                <div className="text-slate-500 italic">
                  💡 Performance is calculated against your past 30 short-form clips.
                </div>
              </div>
            </div>

            {/* ROW 3: PLATFORM TREND MATRIX (Module 11) + CATEGORY CLUSTERS (Module 6) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Platform-Specific Trend Matrix */}
              <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-indigo-600" />
                    <span>Cross-Platform Affinity Matrix</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    How active tag {activeHashtag.tag} spreads across ecosystems.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeHashtag.platformBreakdown.map((row) => (
                    <div key={row.platform} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(row.platform)}
                          <span className="text-xs font-bold text-slate-700">{row.platform}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          row.difficulty === "High" ? "bg-rose-50 text-rose-600" : row.difficulty === "Medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                        }`}>
                          {row.difficulty} Competition
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Est Reach: <strong className="text-slate-800">{row.reach}</strong></span>
                        <span>Engagement: <strong className="text-slate-800">{row.engagement}</strong></span>
                      </div>

                      <div className="mt-2 h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.barValue}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hashtag Category Clusters */}
              <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-purple-600" />
                      <span>Category Intelligence Clusters</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Optimized tags grouped by their dynamic reach purpose.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {([
                      { name: "Viral Reach", count: 8, color: "from-blue-500 to-indigo-500" },
                      { name: "Niche Growth", count: 12, color: "from-purple-500 to-pink-500" },
                      { name: "Educational", count: 6, color: "from-emerald-500 to-teal-500" },
                      { name: "Community Building", count: 15, color: "from-amber-500 to-orange-500" },
                      { name: "Conversion Focused", count: 5, color: "from-cyan-500 to-blue-600" },
                      { name: "Trend Riding", count: 9, color: "from-rose-500 to-red-500" },
                    ]).map((cat) => {
                      const isActive = activeHashtag.category === cat.name;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => {
                            const found = HASHTAG_DATABASE.find(x => x.category === cat.name);
                            if (found) setSelectedTag(found.tag);
                          }}
                          className={`rounded-xl px-3 py-2 text-left border transition-all text-xs flex items-center justify-between w-full ${
                            isActive
                              ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                              : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${cat.color}`} />
                            <span className="font-bold">{cat.name}</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-600"}`}>
                            {cat.count} tags
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
                  <span>Recommendation: Rotate 2 tags per cluster.</span>
                  <span className="underline cursor-pointer">View strategic guide</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN (1/3 width on desktop) - LIVE FEEDS, OPPORTUNITIES & RISK */}
          <div className="space-y-6">
            
            {/* Module 7: Trending Hashtag Detection Engine & Module 13: Live AI Trend Feed */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                    <span>Creator Trend Intelligence</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Real-time momentum streams updating every 15s.
                  </p>
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500">
                  Live
                </div>
              </div>

              {/* Stacked AI Feed cards */}
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {liveFeed.map((feed) => (
                    <motion.div
                      key={feed.id}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="p-3 border border-slate-100 rounded-xl bg-gradient-to-r from-slate-50/50 to-white hover:border-blue-100 transition-colors relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">System Broadcast</span>
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span className="text-[9px] text-slate-400">{feed.time}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {feed.text}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[8px] font-bold text-blue-600">
                          {feed.momentum}
                        </span>
                        <span className="text-[9px] text-slate-400 italic">Predictive Index</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Module 5: AI Opportunity Detection */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Search className="h-4 w-4 animate-bounce" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Niche Opportunity scanner</h3>
                </div>
                <button
                  type="button"
                  onClick={handleScanOpportunities}
                  disabled={isScanning}
                  className="rounded-full bg-blue-50 hover:bg-blue-100 p-1.5 text-blue-600 hover:text-blue-700 transition"
                  title="Run Niche scanning sequence"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
                </button>
              </div>

              <p className="text-[10px] text-slate-400 mb-4">
                Scan cross-referenced database files to isolate high-engagement/low-competition niches.
              </p>

              {/* Scanning status */}
              {isScanning ? (
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/20 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-blue-800">
                    <span>{scanStepText}</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-blue-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                  </div>
                </div>
              ) : discoveredOpportunities.length > 0 ? (
                <div className="space-y-3">
                  <span className="text-[8px] uppercase font-bold text-slate-400 block tracking-wide">Opportunities Detected:</span>
                  {discoveredOpportunities.map((op) => (
                    <div
                      key={op.tag}
                      onClick={() => setSelectedTag(op.tag)}
                      className="p-3 border border-emerald-100 rounded-xl bg-emerald-50/20 hover:bg-emerald-50/40 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-800">{op.tag}</span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-bold text-emerald-800 uppercase">
                          {op.priorityBadge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                        {op.opportunityReason}
                      </p>
                      <div className="mt-2 pt-2 border-t border-emerald-100/50 flex items-center justify-between text-[9px] text-emerald-700">
                        <span>Opportunity Score: <strong>{op.opportunityScore}/100</strong></span>
                        <span>Uses: Low Density</span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setDiscoveredOpportunities([])}
                    className="w-full text-center text-[10px] text-slate-400 hover:text-slate-600 py-1 underline block"
                  >
                    Clear scanned report
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                  <Zap className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                  <span className="text-xs font-bold text-slate-600 block">System Ready to Scan</span>
                  <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto mt-1 leading-relaxed">
                    Trigger the diagnostic scan to locate high-probability breakout keywords.
                  </p>
                  <button
                    type="button"
                    onClick={handleScanOpportunities}
                    className="mt-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 text-[10px] font-semibold tracking-wide shadow transition active:scale-95"
                  >
                    Diagnose Niche Opportunities
                  </button>
                </div>
              )}
            </div>

            {/* Module 12: Trend Risk Analysis */}
            <div className="rounded-2xl bg-white border border-gray-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <span>Niche Risk Diagnostic</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Shadowban index, spam association, and saturation fatigue flags.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Niche Danger Score</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-lg font-extrabold text-slate-900">{activeHashtag.riskScore}%</span>
                      <span className="text-[9px] text-slate-500">Fatigue Index</span>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                    activeHashtag.riskLevel === "High" ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}>
                    {activeHashtag.riskLevel} Risk
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Algorithmic Warnings</span>
                  {activeHashtag.riskWarnings.map((warn, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-rose-100 bg-rose-50/30 text-[10px] text-rose-700">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- AI HASHTAG GENERATOR HERO BAR (Gemini Interface) --- */}
            <div
              ref={suggestionsRef}
              id="hashtag-generator"
              className="rounded-2xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10 p-6 shadow-[0_15px_40px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span>Gemini AI Generator</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Utilize Gemini 2.0 Flash to synthesize custom tag suggestions based on post themes.
                  </p>
                </div>
                <div className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    value={searchTopic}
                    onChange={(e) => setSearchTopic(e.target.value)}
                    placeholder="Describe your content idea, keywords or target audience..."
                    rows={3}
                    maxLength={280}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <div className="absolute bottom-2 right-2 text-[8px] text-slate-400">
                    {searchTopic.length}/280
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isGenerating || !searchTopic.trim()}
                  onClick={handleGenerateHashtags}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 text-xs font-bold transition shadow active:scale-[0.98]"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Synthesizing keywords...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span>Generate AI Hashtags</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI outputs rendering */}
              {generatedChips.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Suggested Tag Stack:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {generatedChips.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => copyToClipboard(tag)}
                        className="group inline-flex items-center gap-1 rounded-lg border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-600 transition"
                      >
                        <span>{tag}</span>
                        {copiedTag === tag ? (
                          <span className="text-[9px] text-emerald-600 font-semibold animate-pulse">Copied!</span>
                        ) : (
                          <Copy className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HashtagAnalyticsPage;
