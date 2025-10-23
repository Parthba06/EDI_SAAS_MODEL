import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line
} from 'recharts';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import Dock from '../components/Dock';

// Sample data for charts and metrics
const sampleSeries = [
  { date: '2025-09-10', followers: 12000, engagement: 2.4, reach: 42000, impressions: 82000 },
  { date: '2025-09-11', followers: 12180, engagement: 2.5, reach: 43000, impressions: 84000 },
  { date: '2025-09-12', followers: 12250, engagement: 2.6, reach: 44000, impressions: 86000 },
  { date: '2025-09-13', followers: 12300, engagement: 2.7, reach: 45000, impressions: 88000 },
  { date: '2025-09-14', followers: 12390, engagement: 2.9, reach: 48000, impressions: 90500 },
  { date: '2025-09-15', followers: 12450, engagement: 3.0, reach: 49000, impressions: 92000 },
  { date: '2025-09-16', followers: 12540, engagement: 3.1, reach: 50000, impressions: 94000 }
];

const QuickMetricCard: React.FC<any> = ({ title, value, trend }) => (
  <div className="rounded-2xl bg-[#F9F5EC]/5 p-6 hover:bg-[#F9F5EC]/10 transition transform hover:-translate-y-1 shadow-sm hover:shadow-lg border border-[#F9F5EC]/10">
    <div className="flex justify-between text-sm text-[#F9F5EC]/70">
      <span>{title}</span>
      <span className={`font-semibold ${trend && trend.startsWith('+') ? 'text-[#98ff98]' : 'text-[#F9F5EC]'}`}>{trend}</span>
    </div>
    <h2 className="text-2xl font-semibold text-[#F9F5EC] mt-3">{value}</h2>
  </div>
);

const AISuggestion: React.FC<any> = ({ text }) => (
  <div className="flex items-center justify-between bg-[#F9F5EC]/5 rounded-xl p-4 border border-[#F9F5EC]/10 hover:bg-[#F9F5EC]/10 transition-colors">
    <div className="text-sm text-[#F9F5EC]/90">{text}</div>
    <div className="flex items-center gap-2">
      <button className="text-sm px-3 py-1 rounded-md bg-[#98ff98] hover:bg-[#98ff98]/90 text-black transition-all">Apply</button>
      <button className="text-sm px-3 py-1 rounded-md border border-[#F9F5EC]/10 text-[#F9F5EC] hover:bg-[#F9F5EC]/10 transition-colors">View</button>
    </div>
  </div>
);

const TrendingCard: React.FC<any> = ({ tag, score, timeLeft }) => (
  <div className="rounded-xl bg-[#F9F5EC]/5 p-4 flex flex-col gap-2 border border-[#F9F5EC]/10 hover:bg-[#F9F5EC]/10 transition-colors">
    <div className="flex justify-between text-sm">
      <span className="font-medium text-[#98ff98]">#{tag}</span>
      <span className="text-xs text-[#F9F5EC]/50">{timeLeft}</span>
    </div>
    <div className="text-[#F9F5EC] font-semibold text-lg">Virality {score}</div>
    <button className="mt-2 self-start px-3 py-1 rounded bg-[#98ff98] hover:bg-[#98ff98]/90 text-black font-medium transition-all">
      Jump on trend
    </button>
  </div>
);

const RecentPostCard: React.FC<any> = ({ image, likes, comments, engagement }) => (
  <div className="w-64 rounded-xl overflow-hidden border border-[#F9F5EC]/10 hover:border-[#98ff98]/50 transition-all transform hover:-translate-y-1 bg-[#F9F5EC]/5">
    <div className="w-full h-36 bg-black relative group">
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-4">
      <div className="flex justify-between text-sm text-[#F9F5EC]/70">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#98ff98]" /> {likes}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F9F5EC]" /> {comments}
        </span>
      </div>
      <div className="text-sm text-[#F9F5EC]/90 mt-2 flex items-center gap-2">
        Engagement: 
        <span className="text-[#98ff98] font-medium">{engagement}%</span>
      </div>
    </div>
  </div>
);

const TopBar: React.FC<any> = ({ onOpenAIAssistant }) => (
  <div className="fixed top-4 left-0 right-0 z-40">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between bg-[#F9F5EC]/5 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-[#F9F5EC]/10">
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-[#F9F5EC]">DASHBOARD</div>
        </div>
        <div className="flex items-center gap-3">
          <input 
            placeholder="Search posts, hashtags, competitors..." 
            className="px-3 py-2 rounded-lg border border-[#F9F5EC]/10 bg-black/50 text-sm w-80 text-[#F9F5EC] placeholder:text-[#F9F5EC]/50 focus:outline-none focus:ring-2 focus:ring-[#98ff98]/30" 
          />
          <button className="relative p-2 rounded-md bg-black/50 hover:bg-[#F9F5EC]/5 transition-colors border border-[#F9F5EC]/10">
            <span className="inline-block w-2 h-2 rounded-full bg-[#98ff98] absolute top-1 right-1" />
            🔔
          </button>
          <button 
            onClick={onOpenAIAssistant} 
            className="px-3 py-2 rounded-md bg-[#98ff98] hover:bg-[#98ff98]/90 text-black transition-all"
          >
            AI Assistant
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-[#98ff98] flex items-center justify-center text-black font-medium">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [aiOpen, setAiOpen] = useState(false);
  const [metric, setMetric] = useState<'followers' | 'engagement' | 'reach' | 'impressions'>('followers');
  const [range, setRange] = useState<'7D' | '30D' | '90D'>('7D');

  const growthScore = 82;

  const quickMetrics = useMemo(() => [
    { title: 'Followers', value: '12,540', trend: '+3.2%' },
    { title: 'Engagement rate', value: '3.1%', trend: '+0.2%' },
    { title: 'Reach', value: '50,200', trend: '+4.1%' },
    { title: 'Post index', value: '78', trend: '+1.8%' }
  ], []);

  const suggestions = [
    'Post Reels at 7PM for +34% engagement',
    'Try #TechTrends2025 — trending in your niche',
    "Repurpose yesterday's video into a carousel"
  ];

  const trending = [
    { tag: 'AIinCreators', score: 92, timeLeft: '6h' },
    { tag: 'ShortsBoost', score: 85, timeLeft: '12h' },
    { tag: 'TechTrends2025', score: 78, timeLeft: '2d' }
  ];

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => navigate('/archive') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => navigate('/settings') },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-black relative">
      
      <TopBar onOpenAIAssistant={() => setAiOpen(true)} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - large area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome + Growth Score */}
            <div className="rounded-2xl bg-[#F9F5EC]/5 p-6 flex items-center justify-between relative overflow-hidden border border-[#F9F5EC]/10">
              {/* Sparkline background */}
              <svg className="absolute inset-0 opacity-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path
                  d="M0 10 L10 8 L20 12 L30 7 L40 9 L50 15 L60 10 L70 12 L80 6 L90 8 L100 10"
                  stroke="#98ff98"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M0 10 L10 8 L20 12 L30 7 L40 9 L50 15 L60 10 L70 12 L80 6 L90 8 L100 10 L100 20 L0 20 Z"
                  fill="#98ff98"
                  opacity="0.1"
                />
              </svg>
              <div className="max-w-[650px] relative z-10">
                <div className="text-sm text-[#F9F5EC]/70">Hi, Ashish 👋</div>
                <h3 className="text-2xl font-semibold text-[#F9F5EC] mt-2">Your Growth Score is <span className="text-[#98ff98]">{growthScore}/100</span></h3>
                <p className="text-sm text-[#F9F5EC]/70 mt-2 flex items-center">
                  Your engagement grew <span className="text-[#98ff98] font-semibold mx-1">24%</span> this week
                  <span className="inline-block ml-2 text-[#98ff98]">↗</span>
                </p>
              </div>
              <div className="w-48 h-48 flex items-center justify-center relative z-10">
                {/* Simple circular progress */}
                <svg viewBox="0 0 36 36" className="w-40 h-40">
                  <path d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32" fill="none" stroke="#F9F5EC" strokeWidth="4" opacity="0.1" />
                  <path
                    strokeLinecap="round"
                    d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32"
                    fill="none"
                    stroke="#98ff98"
                    strokeWidth="4"
                    strokeDasharray={`${growthScore},100`}
                    transform="rotate(-90 18 18)"
                  />
                  <text x="18" y="20" textAnchor="middle" className="font-bold" style={{ fontSize: '8px', fill: '#F9F5EC' }}>{growthScore}%</text>
                </svg>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickMetrics.map((m: any, i: number) => (
                <QuickMetricCard key={i} {...m} />
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="rounded-2xl bg-[#F9F5EC]/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#F9F5EC]">AI Suggestions</h4>
                <div className="text-sm text-[#F9F5EC]/70">Today</div>
              </div>
              <div className="space-y-3">
                {suggestions.map((s, i) => <AISuggestion key={i} text={s} />)}
              </div>
            </div>

            {/* Performance Graph */}
            <div className="rounded-2xl bg-[#F9F5EC]/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#F9F5EC]">Performance</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-[#F9F5EC]/5 rounded p-1">
                    {(['followers','engagement','reach','impressions'] as any).map((k: any) => (
                      <button key={k} onClick={() => setMetric(k)} className={`px-3 py-1 rounded text-sm ${metric===k ? 'bg-[#F9F5EC]/10': 'text-[#F9F5EC]/70'}`}>{k}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setRange('7D')} className={`px-3 py-1 rounded text-[#F9F5EC] ${range==='7D'?'bg-[#F9F5EC]/10':''}`}>7D</button>
                    <button onClick={() => setRange('30D')} className={`px-3 py-1 rounded text-[#F9F5EC] ${range==='30D'?'bg-[#F9F5EC]/10':''}`}>30D</button>
                    <button onClick={() => setRange('90D')} className={`px-3 py-1 rounded text-[#F9F5EC] ${range==='90D'?'bg-[#F9F5EC]/10':''}`}>90D</button>
                  </div>
                </div>
              </div>

              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleSeries} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" opacity={0.1} />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Area type="monotone" dataKey={metric} stroke="#6366f1" fillOpacity={1} fill="url(#colorMetric)" />
                    {/* Predicted line (dashed) */}
                    <Line type="monotone" dataKey={metric} stroke="#10B981" strokeDasharray="4 6" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="rounded-2xl bg-white/5 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Trending Topics</h4>
              <div className="grid grid-cols-1 gap-3">
                {trending.map((t, i) => <TrendingCard key={i} {...t} />)}
              </div>
            </div>

            {/* Recent Posts Performance */}
            <div className="rounded-2xl bg-white/5 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Recent Posts</h4>
              <div className="flex gap-4 overflow-x-auto py-2">
                <RecentPostCard image={'https://picsum.photos/300/200?random=1'} likes={120} comments={10} engagement={8.2} color={'#10B981'} />
                <RecentPostCard image={'https://picsum.photos/300/200?random=2'} likes={42} comments={4} engagement={3.1} color={'#F59E0B'} />
                <RecentPostCard image={'https://picsum.photos/300/200?random=3'} likes={12} comments={0} engagement={1.2} color={'#EF4444'} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant drawer */}
      {aiOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setAiOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-[#0b1220] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <button onClick={() => setAiOpen(false)}>Close</button>
            </div>
            <div className="mt-4 text-sm text-gray-300">Suggestions, prompts and quick actions will appear here.</div>
          </div>
        </div>
      )}

      {/* Dock Navigation */}
      <Dock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}