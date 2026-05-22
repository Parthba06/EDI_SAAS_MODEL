import React, { useState, useMemo } from "react";
import { useCreatorEngine } from "../hooks/useCreatorEngine";
import { Creator, Platform } from "../data/creatorDatabase";
import { motion, AnimatePresence } from "motion/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  FiActivity,
  FiUsers,
  FiTrendingUp,
  FiSearch,
  FiPlus,
  FiMinus,
  FiCheckCircle,
  FiCpu,
  FiAlertCircle
} from "react-icons/fi";
import { BsLightningChargeFill, BsRobot } from "react-icons/bs";

const formatK = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(Math.round(v));

export default function CreatorCommandCenter() {
  const { creators, activities, isLive, lastTick } = useCreatorEngine(5000);
  
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Filtering
  const filteredCreators = useMemo(() => {
    return creators.filter(c => {
      const matchSearch = c.username.toLowerCase().includes(search.toLowerCase()) || 
                          c.niche.toLowerCase().includes(search.toLowerCase());
      const matchPlatform = platformFilter === "all" || c.platform === platformFilter;
      return matchSearch && matchPlatform;
    });
  }, [creators, search, platformFilter]);

  const selectedCreators = useMemo(() => {
    return selectedIds.map(id => creators.find(c => c.id === id)).filter(Boolean) as Creator[];
  }, [creators, selectedIds]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 5) return prev; // max 5 for UI sanity
      return [...prev, id];
    });
  };

  // Chart data formatting
  const chartData = useMemo(() => {
    if (selectedCreators.length === 0) return [];
    
    // Assumes all have same 30-day history length
    const days = selectedCreators[0].history.length;
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const point: any = { date: selectedCreators[0].history[i].date };
      selectedCreators.forEach(c => {
        point[c.username] = c.history[i].followers;
      });
      data.push(point);
    }
    return data;
  }, [selectedCreators]);

  const colors = ["#008CFF", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"];

  const generateAIAnalysis = () => {
    if (selectedCreators.length < 2) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const insights = [];
      const sortedByER = [...selectedCreators].sort((a,b) => b.engagementRate - a.engagementRate);
      const sortedByGrowth = [...selectedCreators].sort((a,b) => b.growthMomentum - a.growthMomentum);
      
      insights.push(`@${sortedByER[0].username} dominates engagement (${sortedByER[0].engagementRate}%) due to high audience loyalty in the ${sortedByER[0].niche} niche.`);
      
      if (sortedByGrowth[0].growthMomentum > sortedByGrowth[1].growthMomentum * 1.02) {
        insights.push(`@${sortedByGrowth[0].username} is growing significantly faster than peers (Momentum: ${sortedByGrowth[0].growthMomentum}). This correlates with their ${sortedByGrowth[0].viralProbability}% viral probability.`);
      }
      
      const lowestRet = [...selectedCreators].sort((a,b) => a.retentionScore - b.retentionScore)[0];
      insights.push(`Warning: @${lowestRet.username} has a retention risk (${lowestRet.retentionScore}/100). Passive churn may increase soon.`);
      
      setAiInsights(insights);
      setIsAnalyzing(false);
    }, 2500);
  };

  // Global metrics
  const totalFollowers = creators.reduce((sum, c) => sum + c.followers, 0);
  const avgER = (creators.reduce((sum, c) => sum + c.engagementRate, 0) / creators.length).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 pb-20 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-slate-900">Creator Command Center</h1>
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${isLive ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                {isLive && (
                  <motion.div className="h-1.5 w-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                )}
                {isLive ? "Live Simulation" : "Paused"}
              </div>
            </div>
            <p className="text-sm text-slate-500">Real-time multi-creator intelligence ecosystem.</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            Last tick: {lastTick.toLocaleTimeString()}
          </div>
        </div>

        {/* GLOBAL METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Monitored Creators", value: creators.length, icon: <FiUsers /> },
            { label: "Network Audience", value: formatK(totalFollowers), icon: <FiActivity /> },
            { label: "Global Avg Engagement", value: `${avgER}%`, icon: <FiTrendingUp /> },
            { label: "Simulation Speed", value: "1 Tick / 5s", icon: <FiCpu /> },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                {m.icon}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{m.label}</p>
                <motion.p 
                  key={m.value} // animates on change
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-1 text-xl font-bold text-slate-900"
                >
                  {m.value}
                </motion.p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: SELECTOR & FEED */}
          <div className="space-y-6">
            
            {/* SELECTOR */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 h-[400px] flex flex-col">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-slate-900 mb-3">Creator Database</h2>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search creators or niches..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {["all", "instagram", "youtube", "twitter"].map(p => (
                    <button 
                      key={p}
                      onClick={() => setPlatformFilter(p as any)}
                      className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-colors ${platformFilter === p ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-hide">
                {filteredCreators.slice(0, 20).map((c) => {
                  const isSelected = selectedIds.includes(c.id);
                  return (
                    <div key={c.id} className={`flex items-center justify-between rounded-xl border p-2.5 transition-colors ${isSelected ? "border-blue-200 bg-blue-50/50" : "border-slate-100 hover:bg-slate-50"}`}>
                      <div className="flex items-center gap-3">
                        <img src={c.avatarUrl} alt="" className="h-8 w-8 rounded-full bg-slate-200" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">@{c.username}</p>
                          <p className="text-[10px] text-slate-500">{formatK(c.followers)} • {c.niche}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleSelection(c.id)}
                        disabled={!isSelected && selectedIds.length >= 5}
                        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200 disabled:opacity-30"}`}
                      >
                        {isSelected ? <FiMinus size={12} /> : <FiPlus size={12} />}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* LIVE FEED */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 h-[300px] flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <BsLightningChargeFill className="text-amber-500" />
                <h2 className="text-sm font-bold text-slate-900">Live Activity Feed</h2>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                <AnimatePresence>
                  {activities.slice(0, 15).map((act, i) => (
                    <motion.div 
                      key={act.timestamp + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2.5 text-xs"
                    >
                      <span className="shrink-0 text-[10px] font-medium text-slate-400 mt-0.5">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                      </span>
                      <span className={`leading-relaxed ${act.type === 'viral' ? 'text-amber-600 font-medium' : act.type === 'churn' ? 'text-red-500' : 'text-slate-600'}`}>
                        {act.message}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* RIGHT: COMPARISON & CHARTS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* COMPARISON TABLE */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900">Live Benchmarking</h2>
                <span className="text-xs text-slate-500">{selectedCreators.length}/5 Selected</span>
              </div>
              
              {selectedCreators.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                  <FiUsers size={24} className="mb-2 opacity-50" />
                  <p className="text-sm">Select creators from the database to benchmark</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pr-4">Creator</th>
                        <th className="pb-3 pr-4 text-right">Followers</th>
                        <th className="pb-3 pr-4 text-right">Engagement</th>
                        <th className="pb-3 pr-4 text-right">Momentum</th>
                        <th className="pb-3 text-right">Consistency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {selectedCreators.map((c, i) => (
                          <motion.tr 
                            layout
                            key={c.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="border-b border-slate-50 last:border-0"
                          >
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: colors[i] }} />
                                <span className="font-semibold text-slate-800">@{c.username}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-right font-bold text-slate-900">
                              <motion.span key={c.followers} initial={{ color: '#10B981' }} animate={{ color: '#0F172A' }} transition={{ duration: 1 }}>
                                {c.followers.toLocaleString()}
                              </motion.span>
                            </td>
                            <td className="py-3 pr-4 text-right">
                              <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                                {c.engagementRate}%
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-right text-xs font-semibold">
                              <span className={c.growthMomentum >= 1 ? "text-emerald-600" : "text-rose-500"}>
                                {c.growthMomentum.toFixed(3)}
                              </span>
                            </td>
                            <td className="py-3 text-right text-xs text-slate-500">{c.consistencyScore}/100</td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* AI COMPARATIVE ANALYSIS */}
            {selectedCreators.length >= 2 && (
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-sm text-white">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <BsRobot className="text-blue-400" />
                    <h2 className="text-sm font-bold">AI Comparative Intelligence</h2>
                  </div>
                  <button 
                    onClick={generateAIAnalysis}
                    disabled={isAnalyzing}
                    className="rounded-full bg-blue-500/20 text-blue-400 px-4 py-1.5 text-[11px] font-bold hover:bg-blue-500/30 transition-colors disabled:opacity-50"
                  >
                    {isAnalyzing ? "Scanning..." : "Generate Analysis"}
                  </button>
                </div>
                
                {isAnalyzing ? (
                  <div className="flex h-[100px] flex-col items-center justify-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <FiCpu size={24} className="text-slate-500" />
                    </motion.div>
                    <p className="text-xs text-slate-400 animate-pulse">Running comparative models against {selectedCreators.length} creators...</p>
                  </div>
                ) : aiInsights.length > 0 ? (
                  <div className="space-y-3">
                    {aiInsights.map((insight, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        key={idx} 
                        className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-sm leading-relaxed text-slate-300"
                      >
                        <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                        <p>{insight}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[100px] items-center justify-center text-xs text-slate-500">
                    Click generate to run multi-creator analysis.
                  </div>
                )}
              </div>
            )}

            {/* GROWTH CHART */}
            {selectedCreators.length > 0 && (
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 h-[300px] flex flex-col">
                <h2 className="text-sm font-bold text-slate-900 mb-4">Relative Growth Trajectory (30 Days)</h2>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={formatK} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontSize: 12, fontWeight: 600 }}
                        labelStyle={{ fontSize: 10, color: '#64748b', marginBottom: 4 }}
                      />
                      {selectedCreators.map((c, i) => (
                        <Line 
                          key={c.id} 
                          type="monotone" 
                          dataKey={c.username} 
                          stroke={colors[i]} 
                          strokeWidth={2} 
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
