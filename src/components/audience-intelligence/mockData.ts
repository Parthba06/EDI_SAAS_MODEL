import {
  Interest,
  LoyaltySegment,
  ActivityCell,
  PersonaAttribute,
  AIInsight,
  SentimentData,
  ContentType,
  CreatorOverlap,
  QualityMetric,
  JourneyStage,
} from "./types";

// ===== AUDIENCE INTERESTS =====
export const audienceInterests: Interest[] = [
  {
    name: "AI & Productivity",
    percentage: 82,
    engagement: "high",
    trend: 12.5,
    description: "Tools, automation, workflows",
  },
  {
    name: "Startups",
    percentage: 67,
    engagement: "high",
    trend: 8.3,
    description: "Entrepreneurship, funding, growth",
  },
  {
    name: "Tech News",
    percentage: 59,
    engagement: "high",
    trend: 5.2,
    description: "Industry trends, innovations",
  },
  {
    name: "Personal Growth",
    percentage: 54,
    engagement: "medium",
    trend: 3.1,
    description: "Self-improvement, motivation",
  },
  {
    name: "Finance & Investing",
    percentage: 48,
    engagement: "medium",
    trend: 6.7,
    description: "Markets, crypto, wealth building",
  },
  {
    name: "Design & UX",
    percentage: 42,
    engagement: "medium",
    trend: 2.1,
    description: "UI/UX, design thinking",
  },
  {
    name: "Gaming & Esports",
    percentage: 38,
    engagement: "medium",
    trend: -1.5,
    description: "Video games, streaming",
  },
  {
    name: "Fitness & Wellness",
    percentage: 31,
    engagement: "low",
    trend: 4.2,
    description: "Health, exercise, nutrition",
  },
];

// ===== LOYALTY SEGMENTATION =====
export const loyaltySegments: LoyaltySegment[] = [
  {
    name: "Loyal Fans",
    percentage: 22,
    engagementQuality: 94,
    interactionFrequency: "Daily/Multiple times",
    retentionLevel: 98,
    description:
      "Your most dedicated audience. Generate 64% of engagement despite being 22% of audience.",
    color: "#10B981",
  },
  {
    name: "Returning Viewers",
    percentage: 31,
    engagementQuality: 72,
    interactionFrequency: "2-3 times per week",
    retentionLevel: 75,
    description:
      "Consistent followers who engage regularly. Strong growth potential.",
    color: "#3B82F6",
  },
  {
    name: "Casual Followers",
    percentage: 28,
    engagementQuality: 45,
    interactionFrequency: "Weekly or less",
    retentionLevel: 52,
    description: "Passive viewers. Low interaction but wide reach.",
    color: "#6366F1",
  },
  {
    name: "Viral Traffic",
    percentage: 12,
    engagementQuality: 28,
    interactionFrequency: "One-time high spikes",
    retentionLevel: 15,
    description:
      "One-off traffic from viral content. Converts poorly to followers.",
    color: "#F59E0B",
  },
  {
    name: "One-Time Visitors",
    percentage: 7,
    engagementQuality: 12,
    interactionFrequency: "Single visit",
    retentionLevel: 5,
    description: "First-time viewers who haven't returned.",
    color: "#9CA3AF",
  },
];

// ===== ACTIVITY HEATMAP DATA =====
export const generateActivityHeatmap = (): ActivityCell[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const heatmapData: ActivityCell[] = [];

  // Higher activity on weekends, peak hours 7pm-10pm
  days.forEach((day, dayIndex) => {
    hours.forEach((hour) => {
      let intensity = 0;

      // Base intensity
      if (hour >= 7 && hour <= 22) {
        intensity = Math.floor(Math.random() * 3) + 1;
      } else {
        intensity = Math.floor(Math.random() * 2);
      }

      // Boost for peak hours (7pm-10pm)
      if (hour >= 19 && hour <= 22) {
        intensity = Math.min(4, intensity + 2);
      }

      // Boost for weekends
      if (dayIndex >= 5) {
        intensity = Math.min(4, Math.floor(intensity * 1.3));
      }

      heatmapData.push({
        hour,
        day,
        intensity: Math.min(4, intensity),
      });
    });
  });

  return heatmapData;
};

// ===== AI PERSONA =====
export const audiencePersona = {
  archetype: "Tech-Forward Creator Consumer",
  ageRange: "20–28",
  description:
    "Your average viewer is a tech-focused student/early professional interested in AI tools, startups, productivity systems, and educational short-form content.",
  interests: [
    "AI & Automation",
    "Startup Ecosystem",
    "Productivity Tools",
    "Personal Growth",
    "Tech News",
  ],
  preferredContentFormat: "Educational Reels (30-60 seconds)",
  activeTime: "7 PM – 11 PM, Weekends",
  attentionSpan: "45-90 seconds optimal",
  likelyConversionBehavior: "Engages with CTAs, follows after 3rd content piece",
  personalityTraits: [
    "Ambitious",
    "Curious",
    "Data-driven",
    "Early adopter",
    "Community-focused",
  ],
  motivations: [
    "Learning new skills",
    "Career advancement",
    "Staying ahead of trends",
    "Building side projects",
  ],
};

// ===== AI INSIGHTS FEED =====
export const aiInsights: AIInsight[] = [
  {
    id: "insight-1",
    title: "Educational Content Breakthrough",
    description:
      "Educational reels increased retention by 38% this month. Your audience responds exceptionally well to how-to and explainer content.",
    confidenceScore: 94,
    trend: "up",
    trendPercent: 38,
    category: "engagement",
    actionable: true,
  },
  {
    id: "insight-2",
    title: "Female Audience Growth",
    description:
      "Your female audience engagement grew 12% this month, now representing 49% of your active followers.",
    confidenceScore: 87,
    trend: "up",
    trendPercent: 12,
    category: "growth",
    actionable: true,
  },
  {
    id: "insight-3",
    title: "Age Demographic Sweet Spot",
    description:
      "Short-form productivity content performs best among users aged 18–24. This segment shows 3.2x higher completion rates.",
    confidenceScore: 91,
    trend: "up",
    trendPercent: 8.5,
    category: "content",
    actionable: true,
  },
  {
    id: "insight-4",
    title: "Late-Night Upload Issue",
    description:
      "Late-night uploads (midnight-6am) underperform by 45% compared to evening content (7pm-10pm).",
    confidenceScore: 88,
    trend: "down",
    trendPercent: -45,
    category: "timing",
    actionable: true,
  },
  {
    id: "insight-5",
    title: "Hook Performance Pattern",
    description:
      "Your audience responds strongly to curiosity-based hooks. Content starting with questions gets 2.1x more engagement.",
    confidenceScore: 85,
    trend: "up",
    trendPercent: 110,
    category: "content",
    actionable: true,
  },
  {
    id: "insight-6",
    title: "Save Rate Indicator",
    description:
      "Save-to-view ratio increased by 7% among loyal followers, indicating higher perceived value of your content.",
    confidenceScore: 79,
    trend: "up",
    trendPercent: 7,
    category: "engagement",
    actionable: false,
  },
];

// ===== SENTIMENT ANALYSIS =====
export const sentimentData: SentimentData[] = [
  {
    emotion: "Excited",
    percentage: 34,
    color: "#EC4899",
    icon: "🎉",
  },
  {
    emotion: "Positive",
    percentage: 28,
    color: "#10B981",
    icon: "👍",
  },
  {
    emotion: "Motivated",
    percentage: 22,
    color: "#6ee7b7",
    icon: "💪",
  },
  {
    emotion: "Curious",
    percentage: 12,
    color: "#3B82F6",
    icon: "🤔",
  },
  {
    emotion: "Confused",
    percentage: 3,
    color: "#F59E0B",
    icon: "😕",
  },
  {
    emotion: "Negative",
    percentage: 1,
    color: "#EF4444",
    icon: "👎",
  },
];

// ===== CONTENT PERFORMANCE =====
export const contentPerformance: ContentType[] = [
  {
    name: "Educational Reels",
    engagementScore: 94,
    performanceRating: 5,
    recommendationLevel: "high",
  },
  {
    name: "How-To Tutorials",
    engagementScore: 88,
    performanceRating: 5,
    recommendationLevel: "high",
  },
  {
    name: "Productivity Tips",
    engagementScore: 82,
    performanceRating: 4,
    recommendationLevel: "high",
  },
  {
    name: "Industry News",
    engagementScore: 71,
    performanceRating: 4,
    recommendationLevel: "medium",
  },
  {
    name: "Personal Stories",
    engagementScore: 65,
    performanceRating: 3,
    recommendationLevel: "medium",
  },
  {
    name: "Memes",
    engagementScore: 52,
    performanceRating: 3,
    recommendationLevel: "low",
  },
  {
    name: "Carousels",
    engagementScore: 48,
    performanceRating: 2,
    recommendationLevel: "low",
  },
  {
    name: "Threads",
    engagementScore: 35,
    performanceRating: 2,
    recommendationLevel: "low",
  },
];

// ===== AUDIENCE OVERLAP =====
export const audienceOverlapCreators: CreatorOverlap[] = [
  {
    name: "Creator A",
    overlapPercentage: 62,
    niche: "AI & Productivity",
    audience_size: 285000,
    connection_strength: 92,
  },
  {
    name: "Creator B",
    overlapPercentage: 48,
    niche: "Startups",
    audience_size: 156000,
    connection_strength: 78,
  },
  {
    name: "Creator C",
    overlapPercentage: 45,
    niche: "Tech News",
    audience_size: 342000,
    connection_strength: 71,
  },
  {
    name: "Creator D",
    overlapPercentage: 38,
    niche: "Personal Growth",
    audience_size: 98000,
    connection_strength: 65,
  },
  {
    name: "Creator E",
    overlapPercentage: 32,
    niche: "Finance",
    audience_size: 215000,
    connection_strength: 54,
  },
];

// ===== ENGAGEMENT QUALITY SCORES =====
export const qualityMetrics: QualityMetric[] = [
  {
    label: "Engagement Quality",
    score: 87,
    trend: 4.2,
    description: "Meaningful engagement beyond just likes",
  },
  {
    label: "Audience Trust Score",
    score: 82,
    trend: 6.1,
    description: "Authenticity and reliability perception",
  },
  {
    label: "Community Strength",
    score: 91,
    trend: 3.8,
    description: "Community cohesion and loyalty",
  },
];

// ===== AUDIENCE JOURNEY =====
export const audienceJourney: JourneyStage[] = [
  {
    stage: "Content View",
    visitors: 48200,
    conversions: 14460,
    rate: 30,
    dropOff: 70,
  },
  {
    stage: "Profile Visit",
    visitors: 14460,
    conversions: 5674,
    rate: 39,
    dropOff: 61,
  },
  {
    stage: "Follow Action",
    visitors: 5674,
    conversions: 3404,
    rate: 60,
    dropOff: 40,
  },
  {
    stage: "Comment",
    visitors: 3404,
    conversions: 1702,
    rate: 50,
    dropOff: 50,
  },
  {
    stage: "Share",
    visitors: 1702,
    conversions: 1190,
    rate: 70,
    dropOff: 30,
  },
];
