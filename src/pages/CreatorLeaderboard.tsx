import React, { useState, useMemo } from "react";
import { useCreatorEngine } from "../hooks/useCreatorEngine";
import { motion, AnimatePresence } from "motion/react";
import {
  FiTrendingUp,
  FiAward,
  FiActivity,
  FiTarget,
  FiHeart,
  FiClock,
  FiArrowUp,
  FiArrowDown,
  FiMinus
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

type Category = "growth" | "engagement" | "viral" | "retention" | "consistency" | "loyalty";

export default function CreatorLeaderboard() {
  const { leaderboard, isLive, lastTick } = useCreatorEngine(5000);
  const [activeCategory, setActiveCategory] = useState<Category>("growth");

  // Determine ranking dynamically based on category
  const rankedData = useMemo(() => {
    let sorted = [...leaderboard];
    
    switch (activeCategory) {
      case "growth":
        sorted.sort((a, b) => b.growthMomentum - a.growthMomentum);
        break;
      case "engagement":
        sorted.sort((a, b) => b.engagementRate - a.engagementRate);
        break;
      case "viral":
        sorted.sort((a, b) => b.viralProbability - a.viralProbability);
        break;
      case "retention":
        sorted.sort((a, b) => b.retentionScore - a.retentionScore);
        break;
      case "consistency":
        sorted.sort((a, b) => b.consistencyScore - a.consistencyScore);
        break;
      case "loyalty":
        sorted.sort((a, b) => b.audienceLoyalty - a.audienceLoyalty);
        break;
    }
    
    // We compute 'rank changes' dynamically on the fly just for UI flavor 
    // In a real system, we'd store history of ranks per category
    return sorted.slice(0, 20).map((c, idx) => {
      // Simulate some rank noise if we aren't tracking all categories historically
      const rankChange = c.previousRank - c.rank; // reusing global rank for a mock change
      return { ...c, catRank: idx + 1, rankChange: rankChange === 0 ? 0 : Math.random() > 0.5 ? 1 : -1 }; 
    });
  }, [leaderboard, activeCategory]);

  // Aggregate niche data
  const nicheData = useMemo(() => {
    const niches = Array.from(new Set(leaderboard.map(c => c.niche)));
    return niches.map(niche => {
      const nicheCreators = leaderboard.filter(c => c.niche === niche);
      const avgER = nicheCreators.reduce((s, c) => s + c.engagementRate, 0) / nicheCreators.length;
      const avgGrow = nicheCreators.reduce((s, c) => s + c.growthMomentum, 0) / nicheCreators.length;
      const top = nicheCreators.sort((a,b) => b.followers - a.followers)[0];
      return { name: niche, avgER, avgGrow, topCreator: top };
    }).sort((a, b) => b.avgER - a.avgER).slice(0, 8); // Top 8 niches
  }, [leaderboard]);

  const categories = [
    { id: "growth", label: "Fastest Growing", icon: <FiTrendingUp /> },
    { id: "engagement", label: "Highest Engagement", icon: <FiActivity /> },
    { id: "viral", label: "Viral Probability", icon: <FiAward /> },
    { id: "retention", label: "Best Retention", icon: <FiTarget /> },
    { id: "consistency", label: "Most Consistent", icon: <FiClock /> },
    { id: "loyalty", label: "Audience Loyalty", icon: <FiHeart /> },
  ];

  const getMetricFormat = (cat: Category, value: any) => {
    if (cat === "growth") return `${value.toFixed(3)}x`;
    if (cat === "engagement") return `${value}%`;
    return `${value}/100`;
  };

  const getMetricValue = (cat: Category, creator: any) => {
    if (cat === "growth") return creator.growthMomentum;
    if (cat === "engagement") return creator.engagementRate;
    if (cat === "viral") return creator.viralProbability;
    if (cat === "retention") return creator.retentionScore;
    if (cat === "consistency") return creator.consistencyScore;
    if (cat === "loyalty") return creator.audienceLoyalty;
    return 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 pb-20 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-slate-900">Live Creator Leaderboard</h1>
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${isLive ? "bg-red-100 text-red-700" : "bg-slate-200 text-slate-500"}`}>
                {isLive && (
                  <motion.div className="h-1.5 w-1.5 rounded-full bg-red-500" animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                )}
                {isLive ? "Live Rankings" : "Paused"}
              </div>
            </div>
            <p className="text-sm text-slate-500">Real-time benchmarking and niche performance.</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            Next update in ~5s
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id as Category)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeCategory === c.id 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* MAIN LEADERBOARD */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Top 20 • {categories.find(c => c.id === activeCategory)?.label}</h2>
              <BsRobot className="text-slate-300 text-xl" />
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {rankedData.map((creator) => {
                  const metricValue = getMetricValue(activeCategory, creator);
                  
                  return (
                    <motion.div 
                      layout
                      key={creator.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs ${
                          creator.catRank === 1 ? "bg-amber-100 text-amber-600" :
                          creator.catRank === 2 ? "bg-slate-200 text-slate-600" :
                          creator.catRank === 3 ? "bg-orange-100 text-orange-700" :
                          "bg-white text-slate-400 border border-slate-200"
                        }`}>
                          #{creator.catRank}
                        </div>
                        <img src={creator.avatarUrl} alt="" className="h-10 w-10 rounded-full bg-slate-200 shadow-sm" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">@{creator.username}</p>
                          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                            <span>{creator.niche}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span>{(creator.followers / 1000).toFixed(1)}K</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Trend Indicator */}
                        <div className={`flex items-center gap-1 text-[11px] font-bold ${
                          creator.rankChange > 0 ? "text-emerald-500" : 
                          creator.rankChange < 0 ? "text-red-500" : 
                          "text-slate-300"
                        }`}>
                          {creator.rankChange > 0 ? <FiArrowUp size={12} /> : 
                           creator.rankChange < 0 ? <FiArrowDown size={12} /> : 
                           <FiMinus size={12} />}
                        </div>
                        
                        {/* Metric Value */}
                        <div className="w-16 text-right">
                          <motion.span 
                            key={metricValue} // animate on value change
                            initial={{ color: '#008CFF' }} 
                            animate={{ color: '#0F172A' }} 
                            className="text-sm font-black"
                          >
                            {getMetricFormat(activeCategory, metricValue)}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* SIDEBAR: Niche Performance Grid */}
          <div className="space-y-6">
            
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 shadow-sm text-white">
              <div className="flex items-center gap-2 mb-3">
                <BsRobot className="text-blue-200" />
                <h2 className="text-sm font-bold text-blue-100 uppercase tracking-wider">AI Leaderboard Insight</h2>
              </div>
              <p className="text-sm leading-relaxed text-blue-50">
                <strong className="text-white">Trending Niche:</strong> {nicheData[0].name} creators are currently outperforming the global average with {nicheData[0].avgER.toFixed(2)}% engagement. Top creator @{nicheData[0].topCreator.username} leads the pack.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Niche Performance</h2>
              <div className="grid grid-cols-2 gap-3">
                {nicheData.map((niche, i) => (
                  <div key={niche.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">#{i+1} {niche.name}</p>
                    <p className="text-lg font-bold text-slate-900">{niche.avgER.toFixed(1)}%</p>
                    <p className="text-[10px] text-slate-500 mt-1">Avg Engagement</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
