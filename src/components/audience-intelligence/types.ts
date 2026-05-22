// Type definitions for audience intelligence components

export interface Interest {
  name: string;
  percentage: number;
  engagement: "high" | "medium" | "low";
  trend: number; // positive or negative change
  description?: string;
}

export interface LoyaltySegment {
  name: string;
  percentage: number;
  engagementQuality: number; // 0-100
  interactionFrequency: string;
  retentionLevel: number; // 0-100
  description: string;
  color: string;
}

export interface ActivityCell {
  hour: number;
  day: string;
  intensity: number; // 0-4
}

export interface PersonaAttribute {
  label: string;
  value: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  confidenceScore: number; // 0-100
  trend: "up" | "down" | "neutral";
  trendPercent: number;
  category: "engagement" | "content" | "growth" | "audience" | "timing";
  actionable: boolean;
}

export interface SentimentData {
  emotion: string;
  percentage: number;
  color: string;
  icon: string;
}

export interface ContentType {
  name: string;
  engagementScore: number; // 0-100
  performanceRating: number; // 1-5
  recommendationLevel: "high" | "medium" | "low";
}

export interface CreatorOverlap {
  name: string;
  overlapPercentage: number;
  niche: string;
  audience_size: number;
  connection_strength: number; // 0-100
}

export interface QualityMetric {
  label: string;
  score: number; // 0-100
  trend: number; // percentage change
  description: string;
}

export interface JourneyStage {
  stage: string;
  visitors: number;
  conversions: number;
  rate: number; // conversion rate
  dropOff: number; // drop-off percentage
}
