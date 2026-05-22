import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreatorEngine } from "../hooks/useCreatorEngine";
import { motion } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  FiArrowLeft,
  FiActivity,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiHeart,
  FiBarChart2,
  FiTarget
} from "react-icons/fi";
import { BsRobot, BsLightningChargeFill } from "react-icons/bs";

const formatK = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(Math.round(v));

export default function CreatorDossier() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { creators, isLive } = useCreatorEngine(5000);

  const creator = useMemo(() => creators.find(c => c.id === id), [creators, id]);

  const radarData = useMemo(() => {
    if (!creator) return [];
    return [
      { subject: 'Engagement', A: creator.engagementRate * 10, fullMark: 100 }, // scale up slightly for visual
      { subject: 'Consistency', A: creator.consistencyScore, fullMark: 100 },
      { subject: 'Retention', A: creator.retentionScore, fullMark: 100 },
      { subject: 'Virality', A: creator.viralProbability * 2, fullMark: 100 }, // scale up
      { subject: 'Loyalty', A: creator.audienceLoyalty, fullMark: 100 },
      { subject: 'Momentum', A: Math.min((creator.growthMomentum - 0.9) * 1000, 100), fullMark: 100 }, // normalize momentum to 0-100
    ];
  }, [creator]);

  if (!creator) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Locating creator in database...</p>
        </div>
      </div>
    );
  }

  const aiAssessment = `This creator shows ${creator.viralProbability > 25 ? 'strong' : 'moderate'} viral potential and ${creator.consistencyScore > 70 ? 'high' : 'inconsistent'} posting frequency. With a retention score of ${creator.retentionScore}/100, they are ${creator.retentionScore > 80 ? 'effectively converting' : 'struggling to convert'} new viewers into loyal followers. Current trajectory is ${creator.growthMomentum >= 1.01 ? 'accelerating' : creator.growthMomentum < 1 ? 'declining' : 'stable'}.`;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 pb-20 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <FiArrowLeft /> Back to Command Center
          </button>
          <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${isLive ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
            {isLive && (
              <motion.div className="h-1.5 w-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            )}
            Live Profile Link
          </div>
        </div>

        {/* DOSSIER HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-70 pointer-events-none" />
          
          <div className="flex items-center gap-5 relative z-10">
            <img src={creator.avatarUrl} alt="" className="h-20 w-20 rounded-full bg-slate-200 shadow-sm border-2 border-white" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{creator.displayName}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-sm font-medium text-slate-500">@{creator.username}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  {creator.platform}
                </span>
                <span className="rounded-full bg-slate-100 text-slate-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  {creator.niche} Niche
                </span>
                <span className="rounded-full bg-amber-50 text-amber-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <FiAward size={10} /> Rank #{creator.rank}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Live Followers</p>
              <motion.p 
                key={creator.followers}
                initial={{ color: '#10B981', scale: 1.05 }}
                animate={{ color: '#0F172A', scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-black text-slate-900 tabular-nums"
              >
                {creator.followers.toLocaleString()}
              </motion.p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Engagement</p>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{creator.engagementRate}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* MAIN CHART */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <FiActivity className="text-blue-500" /> Live Growth Trajectory
              </h2>
              <span className="text-[10px] font-medium text-emerald-500 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded-full">
                Momentum: {creator.growthMomentum.toFixed(3)}x
              </span>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={creator.history} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={formatK} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}
                    labelStyle={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}
                    formatter={(val: number) => [val.toLocaleString(), 'Followers']}
                  />
                  <Area type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RADAR & AI */}
          <div className="space-y-6">
            
            {/* RADAR */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide w-full mb-2">Performance Radar</h2>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Metrics" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI ASSESSMENT */}
            <div className="rounded-2xl bg-slate-900 p-5 shadow-sm text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <BsRobot className="text-blue-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">AI Assessment</h2>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-300 relative z-10">
                {aiAssessment}
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Viral Probability", value: `${creator.viralProbability}%`, icon: <BsLightningChargeFill />, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Avg Likes / Post", value: formatK(creator.avgLikes), icon: <FiHeart />, color: "text-rose-500", bg: "bg-rose-50" },
            { label: "Consistency Score", value: `${creator.consistencyScore}/100`, icon: <FiClock />, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Audience Loyalty", value: `${creator.audienceLoyalty}/100`, icon: <FiTarget />, color: "text-emerald-500", bg: "bg-emerald-50" },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full mb-3 ${m.bg} ${m.color}`}>
                {m.icon}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{m.label}</p>
              <p className="text-xl font-bold text-slate-900">{m.value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
