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
  Line,
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
  <div className="group rounded-2xl bg-card/90 border border-border/70 p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-glow">
    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
      <span>{title}</span>
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold bg-muted/80 group-hover:bg-muted ${
          trend && trend.startsWith('+') ? 'text-primary' : 'text-foreground'
        }`}
      >
        {trend}
      </span>
    </div>
    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{value}</h2>
  </div>
);

const AISuggestion: React.FC<any> = ({ text }) => (
  <div className="group flex items-center justify-between rounded-xl border border-border/70 bg-muted/60 p-4 transition-all duration-200 hover:bg-muted hover:shadow-card">
    <div className="text-sm text-foreground/90">{text}</div>
    <div className="flex items-center gap-2">
      <button className="text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow">
        Apply
      </button>
      <button className="text-xs px-3 py-1.5 rounded-full border border-border/70 text-foreground transition-all duration-200 hover:bg-muted/80">
        View
      </button>
    </div>
  </div>
);

const TrendingCard: React.FC<any> = ({ tag, score, timeLeft }) => (
  <div className="group flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/90 p-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-glow">
    <div className="flex items-center justify-between text-xs">
      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">#{tag}</span>
      <span className="text-[11px] text-muted-foreground">{timeLeft}</span>
    </div>
    <div className="mt-1 text-sm font-medium text-muted-foreground">Virality score</div>
    <div className="text-xl font-semibold text-foreground">{score}</div>
    <button className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
      Jump on trend
      <span className="text-[10px]">↗</span>
    </button>
  </div>
);

const RecentPostCard: React.FC<any> = ({ image, likes, comments, engagement }) => (
  <div className="group w-64 overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-glow">
    <div className="group relative h-36 w-full bg-background/80">
      <div
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {likes}
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {comments}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-foreground/90">
        Engagement:
        <span className="font-medium text-primary">{engagement}%</span>
      </div>
    </div>
  </div>
);

const TopBar: React.FC<any> = ({ onOpenAIAssistant }) => (
  <div className="fixed left-0 right-0 top-4 z-40">
    <div className="mx-auto flex max-w-7xl px-6">
      <div className="flex h-14 w-full items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-4 shadow-card backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dashboard</div>
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search posts, hashtags, competitors..."
            className="w-72 rounded-xl border border-border/70 bg-muted/70 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-[border,box-shadow] duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          />
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-muted/70 text-xs transition-[background,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-card">
            <span className="absolute right-1 top-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            🔔
          </button>
          <button
            onClick={onOpenAIAssistant}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-card transition-[background,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-glow"
          >
            AI Assistant
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground shadow-glow">
            A
          </button>
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
    { icon: <VscArchive size={18} />, label: 'Insights', onClick: () => navigate('/insights') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
    { icon: <VscSettingsGear size={18} className="rotate-90" />, label: 'Settings', onClick: () => navigate('/settings') },
  ];

  return (
    <div className="relative min-h-screen bg-background pt-28 pb-20">

      <TopBar onOpenAIAssistant={() => setAiOpen(true)} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - main analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome + Growth Score */}
            <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">

              {/* Sparkline background */}
              <svg className="pointer-events-none absolute inset-0 opacity-20" viewBox="0 0 100 20" preserveAspectRatio="none">

                <path
                  d="M0 10 L10 8 L20 12 L30 7 L40 9 L50 15 L60 10 L70 12 L80 6 L90 8 L100 10"
                  stroke="#3EDC8E"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M0 10 L10 8 L20 12 L30 7 L40 9 L50 15 L60 10 L70 12 L80 6 L90 8 L100 10 L100 20 L0 20 Z"
                  fill="#7FFFB0"
                  opacity="0.1"
                />
              </svg>
              <div className="relative z-10 max-w-[650px]">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Welcome back</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">

                  Your Growth Score is <span className="text-primary">{growthScore}/100</span>
                </h3>
                <p className="mt-2 flex items-center text-sm text-muted-foreground">

                  Your engagement grew <span className="text-primary font-semibold mx-1">24%</span> this week
                  <span className="inline-block ml-2 text-primary">↗</span>
                </p>
              </div>
              <div className="relative z-10 flex h-48 w-48 items-center justify-center">

                {/* Simple circular progress in mint green */}
                <svg viewBox="0 0 36 36" className="w-40 h-40">
                  <defs>
                    <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3EDC8E" />
                      <stop offset="50%" stopColor="#7FFFB0" />
                      <stop offset="100%" stopColor="#B9FFD8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.12"
                    className="text-muted-foreground"
                  />
                  <path
                    strokeLinecap="round"
                    d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32"
                    fill="none"
                    stroke="url(#ringGradient)"
                    strokeWidth="4"
                    strokeDasharray={`${growthScore},100`}
                    transform="rotate(-90 18 18)"
                  />
                  <text
                    x="18"
                    y="20"
                    textAnchor="middle"
                    className="font-bold"
                    style={{ fontSize: '8px', fill: 'currentColor' }}
                  >
                    {growthScore}%
                  </text>
                </svg>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {quickMetrics.map((m: any, i: number) => (
                <QuickMetricCard key={i} {...m} />
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">

              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">AI Suggestions</h4>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
              <div className="space-y-3">
                {suggestions.map((s, i) => <AISuggestion key={i} text={s} />)}
              </div>
            </div>

            {/* Performance Graph */}
            <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">

              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">Performance</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-muted/60 rounded-full p-1">
                    {(['followers','engagement','reach','impressions'] as any).map((k: any) => (
                      <button
                        key={k}
                        onClick={() => setMetric(k)}
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                          metric === k
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRange('7D')}
                      className={`px-3 py-1 rounded-full text-xs ${
                        range === '7D' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      7D
                    </button>
                    <button
                      onClick={() => setRange('30D')}
                      className={`px-3 py-1 rounded-full text-xs ${
                        range === '30D' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      30D
                    </button>
                    <button
                      onClick={() => setRange('90D')}
                      className={`px-3 py-1 rounded-full text-xs ${
                        range === '90D' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      90D
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ height: 280 }} className="mt-2">

                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleSeries} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3EDC8E" stopOpacity={0.85}/>
                        <stop offset="95%" stopColor="#3EDC8E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" opacity={0.1} />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Area type="monotone" dataKey={metric} stroke="#3EDC8E" fillOpacity={1} fill="url(#colorMetric)" />
                    {/* Predicted line (dashed) */}
                    <Line type="monotone" dataKey={metric} stroke="#7FFFB0" strokeDasharray="4 6" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right column - secondary widgets */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">

              <h4 className="text-lg font-semibold text-foreground mb-4">Trending Topics</h4>
              <div className="grid grid-cols-1 gap-3">
                {trending.map((t, i) => <TrendingCard key={i} {...t} />)}
              </div>
            </div>

            {/* Recent Posts Performance */}
            <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">

              <h4 className="text-lg font-semibold text-foreground mb-4">Recent Posts</h4>
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setAiOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-96 border-l border-border bg-card p-6 shadow-glow">

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
              <button onClick={() => setAiOpen(false)}>Close</button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Suggestions, prompts and quick actions will appear here.</div>
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