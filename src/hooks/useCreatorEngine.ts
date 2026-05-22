import { useState, useEffect, useRef, useCallback } from "react";
import { Creator, CreatorActivity, creatorDb } from "../data/creatorDatabase";

export interface CreatorEngineState {
  creators: Creator[];
  activities: CreatorActivity[];
  topGainers: Creator[];
  topLosers: Creator[];
  leaderboard: Creator[];
  isLive: boolean;
  lastTick: Date;
}

export function useCreatorEngine(tickIntervalMs: number = 5000) {
  const [state, setState] = useState<CreatorEngineState>({
    creators: [],
    activities: [],
    topGainers: [],
    topLosers: [],
    leaderboard: [],
    isLive: false,
    lastTick: new Date()
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize
  useEffect(() => {
    const initialCreators = creatorDb.getCreators();
    updateDerivedState(initialCreators, [{
      timestamp: Date.now(),
      message: "Creator Intelligence Engine initialized",
      type: "growth"
    }]);
    
    startEngine();
    return () => stopEngine();
  }, []);

  const updateDerivedState = (creators: Creator[], newActivities: CreatorActivity[] = []) => {
    // Sort for leaderboard
    const sorted = [...creators].sort((a, b) => b.followers - a.followers);
    
    // Sort by momentum for gainers/losers
    const byMomentum = [...creators].sort((a, b) => b.growthMomentum - a.growthMomentum);
    
    setState(prev => ({
      creators,
      activities: [...newActivities, ...prev.activities].slice(0, 50), // keep last 50 activities
      leaderboard: sorted,
      topGainers: byMomentum.slice(0, 5),
      topLosers: byMomentum.slice(-5).reverse(),
      isLive: true,
      lastTick: new Date()
    }));
  };

  const tick = useCallback(() => {
    const creators = creatorDb.getCreators();
    const newActivities: CreatorActivity[] = [];

    let hasChanges = false;

    const updatedCreators = creators.map(creator => {
      // Base growth/churn probability
      const tickGrowth = (creator.growthMomentum - 1) / (86400 / (tickIntervalMs / 1000)); // distribute daily growth across ticks
      
      let followerChange = Math.floor(creator.followers * tickGrowth);
      let eventType: "growth" | "churn" | "viral" | "post" | null = null;
      let eventMsg = "";

      const r = Math.random();
      
      // 2% chance of viral spike
      if (r < 0.02 && creator.viralProbability > 20) {
        const spike = Math.floor(creator.followers * (Math.random() * 0.005 + 0.001)); // 0.1% - 0.5% spike
        followerChange += spike;
        creator.growthMomentum += 0.01;
        creator.viralProbability -= 5; // cool down
        eventType = "viral";
        eventMsg = `🔥 @${creator.username} triggered a viral spike! (+${spike} followers)`;
        hasChanges = true;
      } 
      // 1% chance of unfollow event
      else if (r > 0.99 && creator.retentionScore < 80) {
        const drop = Math.floor(creator.followers * (Math.random() * 0.002));
        followerChange -= drop;
        creator.growthMomentum -= 0.005;
        eventType = "churn";
        eventMsg = `📉 @${creator.username} lost followers due to inactivity (-${drop})`;
        hasChanges = true;
      }
      // 5% chance of posting
      else if (r > 0.4 && r < 0.45 && creator.consistencyScore > 50) {
        eventType = "post";
        eventMsg = `📱 @${creator.username} published a new ${creator.platform} post`;
        hasChanges = true;
      }
      
      // Apply baseline noise even if no major event
      if (followerChange === 0 && Math.random() > 0.5) {
         followerChange = Math.random() > 0.3 ? 1 : -1;
      }

      if (followerChange !== 0) {
        creator.followers += followerChange;
        
        // Slightly fluctuate engagement based on follower changes
        if (followerChange > 0) {
           creator.engagementRate = Number((creator.engagementRate + (Math.random() * 0.02)).toFixed(2));
        } else {
           creator.engagementRate = Number(Math.max(0.1, creator.engagementRate - (Math.random() * 0.02)).toFixed(2));
        }
        
        hasChanges = true;
      }

      if (eventType && eventMsg) {
        newActivities.push({
          timestamp: Date.now(),
          message: eventMsg,
          type: eventType
        });
      }

      return creator;
    });

    if (hasChanges) {
      // Re-calculate ranks
      const sorted = [...updatedCreators].sort((a, b) => b.followers - a.followers);
      sorted.forEach((c, idx) => {
        const newRank = idx + 1;
        if (c.rank !== newRank) {
           c.previousRank = c.rank;
           c.rank = newRank;
        }
      });
      
      // Ensure we save the originally ordered array or just save sorted
      creatorDb.saveCreators(sorted);
      updateDerivedState(sorted, newActivities);
    }

  }, [tickIntervalMs]);

  const startEngine = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(tick, tickIntervalMs);
    setState(s => ({ ...s, isLive: true }));
  }, [tick, tickIntervalMs]);

  const stopEngine = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState(s => ({ ...s, isLive: false }));
  }, []);

  return {
    ...state,
    startEngine,
    stopEngine,
    forceTick: tick
  };
}
