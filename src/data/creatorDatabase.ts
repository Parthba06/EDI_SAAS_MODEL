export type Platform = "instagram" | "youtube" | "twitter";
export type Niche = 
  | "Tech" | "AI" | "Coding" | "Finance" | "Fitness" 
  | "Fashion" | "Gaming" | "Education" | "Lifestyle" 
  | "Productivity" | "Marketing" | "Travel";

export interface CreatorActivity {
  timestamp: number;
  message: string;
  type: "growth" | "churn" | "viral" | "post";
}

export interface Creator {
  id: string;
  username: string;
  displayName: string;
  platform: Platform;
  niche: Niche;
  avatarUrl: string;
  
  // Base metrics
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgSaves: number;
  
  // Derived / scored metrics (0-100)
  engagementRate: number;
  consistencyScore: number;
  retentionScore: number;
  audienceLoyalty: number;
  viralProbability: number;
  
  // Growth indicators
  growthMomentum: number; // e.g. 1.05 = 5% growing, 0.95 = 5% shrinking
  rank: number;
  previousRank: number;

  // History for charts
  history: {
    date: string;
    followers: number;
  }[];
}

// ----------------------------------------------------
// GENERATOR UTILS
// ----------------------------------------------------

const NICHES: Niche[] = ["Tech", "AI", "Coding", "Finance", "Fitness", "Fashion", "Gaming", "Education", "Lifestyle", "Productivity", "Marketing", "Travel"];
const PLATFORMS: Platform[] = ["instagram", "youtube", "twitter"];

const PREFIXES = ["techwith", "fitwith", "codeby", "financewith", "the", "daily", "growthwith", "pixelwith", "creator", "learnwith"];
const NAMES = ["aryan", "sana", "rahul", "neel", "mira", "rishi", "arya", "sam", "alex", "jordan", "mia", "dev", "sarah", "chris"];
const SUFFIXES = ["verse", "edge", "flow", "hub", "daily", "hacks", "tips", "dev", "tech"];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsername(): string {
  const format = Math.random();
  if (format < 0.4) return `${randomChoice(PREFIXES)}${randomChoice(NAMES)}`;
  if (format < 0.7) return `${randomChoice(NAMES)}${randomChoice(SUFFIXES)}`;
  return `${randomChoice(PREFIXES)}${randomChoice(SUFFIXES)}`;
}

function generateDisplayName(username: string): string {
  // capitalize first letters or split at obvious points
  const match = username.match(/^(techwith|fitwith|codeby|financewith|the|daily|growthwith|pixelwith|creator|learnwith)(.*)/);
  if (match) {
    const p1 = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    const p2 = match[2].charAt(0).toUpperCase() + match[2].slice(1);
    return `${p1} ${p2}`.trim();
  }
  return username.charAt(0).toUpperCase() + username.slice(1);
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a 30-day history curve
function generateHistory(currentFollowers: number, momentum: number): { date: string; followers: number }[] {
  const history = [];
  let current = currentFollowers;
  const now = new Date();
  
  // We work backwards, dividing by momentum
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    history.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      followers: Math.round(current)
    });
    
    // Reverse engineer previous day's followers
    // slightly randomize the daily change around the momentum
    const dailyChange = 1 + ((momentum - 1) / 30); 
    const randomVariance = 1 + (Math.random() * 0.004 - 0.002); // +/- 0.2%
    current = current / (dailyChange * randomVariance);
  }
  return history;
}

function generateCreator(id: number): Creator {
  const platform = randomChoice(PLATFORMS);
  const niche = randomChoice(NICHES);
  const username = generateUsername() + (Math.random() > 0.7 ? randomInRange(10, 99) : "");
  
  // Follower distribution: mostly small-medium, few huge
  const tier = Math.random();
  let followers = 0;
  if (tier < 0.5) followers = randomInRange(5000, 50000);
  else if (tier < 0.8) followers = randomInRange(50000, 250000);
  else if (tier < 0.95) followers = randomInRange(250000, 1000000);
  else followers = randomInRange(1000000, 5000000);

  // Engagement varies heavily by platform and niche
  const baseER = platform === "youtube" ? randomInRange(1, 4) : platform === "instagram" ? randomInRange(2, 8) : randomInRange(0.5, 3);
  const nicheModifier = (niche === "Education" || niche === "Tech") ? 1.2 : 1.0;
  
  const engagementRate = baseER * nicheModifier;
  const avgLikes = Math.floor(followers * (engagementRate / 100));
  const avgComments = Math.floor(avgLikes * 0.05);
  const avgShares = Math.floor(avgLikes * 0.02);
  const avgSaves = Math.floor(avgLikes * 0.08);

  const momentum = 1 + (Math.random() * 0.4 - 0.1); // 0.9x to 1.3x over 30 days

  return {
    id: `creator_${id}`,
    username,
    displayName: generateDisplayName(username),
    platform,
    niche,
    avatarUrl: `https://i.pravatar.cc/150?u=${username}`, // placeholder avatar
    
    followers,
    avgLikes,
    avgComments,
    avgShares,
    avgSaves,
    
    engagementRate: Number(engagementRate.toFixed(2)),
    consistencyScore: randomInRange(40, 98),
    retentionScore: randomInRange(50, 95),
    audienceLoyalty: randomInRange(30, 90),
    viralProbability: randomInRange(5, 45),
    
    growthMomentum: Number(momentum.toFixed(3)),
    rank: 0,
    previousRank: 0,
    
    history: generateHistory(followers, momentum)
  };
}

// ----------------------------------------------------
// DATABASE ENGINE
// ----------------------------------------------------

const STORAGE_KEY = "edi_creator_database_v1";

export const creatorDb = {
  getCreators: (): Creator[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to read creator db from localStorage", e);
    }
    
    // Generate initial dataset
    const creators: Creator[] = [];
    for (let i = 1; i <= 100; i++) {
      creators.push(generateCreator(i));
    }
    
    // Initial sort and rank
    creators.sort((a, b) => b.followers - a.followers);
    creators.forEach((c, idx) => {
      c.rank = idx + 1;
      c.previousRank = idx + 1;
    });
    
    creatorDb.saveCreators(creators);
    return creators;
  },

  saveCreators: (creators: Creator[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(creators));
    } catch (e) {
      console.error("Failed to save creator db to localStorage", e);
    }
  },
  
  resetDatabase: () => {
    localStorage.removeItem(STORAGE_KEY);
    return creatorDb.getCreators();
  }
};
