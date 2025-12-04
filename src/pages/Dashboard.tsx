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
  BarChart,
  Bar
} from 'recharts';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import {
  FiBell,
  FiClock,
  FiSend,
  FiCheckSquare,
  FiChevronDown,
  FiEdit3,
  FiUsers,
  FiMail,
  FiBriefcase,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiSun,
  FiMoon,
  FiHeadphones,
  FiShare2
} from 'react-icons/fi';
import CreatorLogo from '../assets/WhatsApp Image 2025-12-04 at 16.13.28_3db5bc93.jpg';
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
const overviewAccounts = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@creatorYT',
    followers: '8,481',
    delta: '+8,481',
    comments: '4,507',
    likes: '1,254,58',
    accent: 'bg-red-50 border-red-100',
    badge: 'text-red-500 bg-red-50'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    handle: '@creatorX',
    followers: '8,481',
    delta: '+8,481',
    comments: '4,507',
    likes: '1,254,58',
    accent: 'bg-slate-50 border-slate-100',
    badge: 'text-slate-700 bg-slate-50'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@creatorIG',
    followers: '8,481',
    delta: '+8,481',
    comments: '4,507',
    likes: '1,254,58',
    accent: 'bg-pink-50 border-pink-100',
    badge: 'text-pink-500 bg-pink-50'
  }
];

const CardShell: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] ${className}`}
  >
    {children}
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string; right?: React.ReactNode }> = ({
  title,
  subtitle,
  right
}) => (
  <div className="mb-4 flex items-center justify-between gap-4">
    <div>
      <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
    </div>
    {right && <div className="flex items-center gap-2 text-xs text-slate-500">{right}</div>}
  </div>
);

const BadgePill: React.FC<React.PropsWithChildren<{ tone?: 'default' | 'success' | 'danger' | 'muted' }>> = ({
  tone = 'default',
  children
}) => {
  const styles: Record<string, string> = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-50 text-emerald-600',
    danger: 'bg-rose-50 text-rose-600',
    muted: 'bg-slate-50 text-slate-500'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
};

const SidebarNavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}> = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm transition-all duration-150 ${
      active
        ? 'bg-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] text-slate-900'
        : 'text-slate-600 hover:text-slate-900'
    }`}
  >
    <span className="flex items-center gap-3">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl border text-[16px] ${
          active
            ? 'border-slate-200 bg-white text-slate-900'
            : 'border-transparent bg-transparent text-slate-400'
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </span>
    {badge && (
      <span className="inline-flex min-w-[30px] items-center justify-center rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-600">
        {badge}
      </span>
    )}
  </button>
);

const SidebarAccountItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <button
    className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors ${
      active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
    }`}
  >
    <span className="h-5 w-5 rounded-full border border-slate-300" />
    <span>{label}</span>
  </button>
);

const TopBar: React.FC<{ onOpenAIAssistant: () => void }> = ({ onOpenAIAssistant }) => (
  <div className="sticky top-0 z-30 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
    <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      {/* Left: search bar */}
      <div className="flex flex-1 items-center">
        <div className="flex w-full max-w-xl items-center rounded-full bg-[#F5F5F7] px-4 py-2">
          <span className="mr-2 text-slate-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </span>
          <input
            placeholder="Search post, image or content"
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="ml-4 flex items-center gap-2 text-[11px]">
        <button className="hidden items-center gap-1 rounded-full bg-[#F5F5F7] px-3 py-1.5 text-slate-600 hover:text-slate-900 sm:inline-flex">
          <FiClock className="text-slate-400" />
          Set Reminder
        </button>
        <button className="hidden items-center gap-1 rounded-full bg-[#F5F5F7] px-3 py-1.5 text-slate-600 hover:text-slate-900 md:inline-flex">
          <FiSend className="text-slate-400" />
          Schedule Post
        </button>
        <button className="hidden items-center gap-1 rounded-full bg-[#F5F5F7] px-3 py-1.5 text-slate-600 hover:text-slate-900 lg:inline-flex">
          <FiCheckSquare className="text-slate-400" />
          To-do List
        </button>
        <button
          onClick={onOpenAIAssistant}
          className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_10px_25px_rgba(56,189,248,0.5)]"
        >
          AI
        </button>
        <button className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_10px_24px_rgba(16,185,129,0.6)]">
          <FiMoon className="text-white" />
          Dark mode
        </button>
        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F7] text-slate-500">
          <FiBell />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
            12
          </span>
        </button>
        <div className="ml-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          <span className="text-[11px] font-semibold text-slate-700">PR</span>
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

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <VscArchive size={18} />, label: 'Insights', onClick: () => navigate('/insights') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
    { icon: <VscSettingsGear size={18} className="rotate-90" />, label: 'Settings', onClick: () => navigate('/settings') },
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] pb-24">
      <TopBar onOpenAIAssistant={() => setAiOpen(true)} />

      <div className="flex w-full gap-6 px-4 pt-6 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden w-[290px] shrink-0 rounded-3xl bg-[#F8F9FA] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.16)] lg:block">
          {/* Brand */}
          <div className="flex items-center gap-2 px-1 pb-6">
            <img
              src={CreatorLogo}
              alt="Creator logo"
              className="h-7 w-auto object-contain"
            />
            <div className="text-sm font-semibold text-slate-900">Creator</div>
          </div>

          {/* Menu header */}
          <div className="mb-2 flex items-center justify-between px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>Menu</span>
            <FiChevronDown size={12} className="text-slate-400" />
          </div>

          {/* Menu items */}
          <div className="space-y-1">
            {/* Active Home card */}
            <SidebarNavItem
              icon={<VscHome size={18} />}
              label="Home"
              active
              onClick={() => navigate('/')}
            />

            {/* Simple rows for other items */}
            <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <span className="flex items-center gap-3">
                <FiEdit3 size={16} className="text-slate-400" />
                <span>Editor</span>
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <span className="flex items-center gap-3">
                <FiBriefcase size={16} className="text-slate-400" />
                <span>Sponsorship</span>
              </span>
              <span className="inline-flex min-w-[30px] items-center justify-center rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-600">
                5
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <span className="flex items-center gap-3">
                <FiMail size={16} className="text-slate-400" />
                <span>Mails</span>
              </span>
              <span className="inline-flex min-w-[38px] items-center justify-center rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-600">
                55+
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <span className="flex items-center gap-3">
                <FiShare2 size={16} className="text-slate-400" />
                <span>Collaboration</span>
              </span>
              <span className="inline-flex min-w-[34px] items-center justify-center rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-600">
                8+
              </span>
            </button>
          </div>

          {/* Accounts header */}
          <div className="mt-6 mb-1 flex items-center justify-between px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>Accounts</span>
            <FiChevronDown size={12} className="text-slate-400" />
          </div>

          {/* Accounts list */}
          <div className="mt-1 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <FiTwitter size={16} className="text-slate-400" />
              <span>Twitter</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <FiInstagram size={16} className="text-slate-400" />
              <span>Instagram</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900">
              <FiYoutube size={16} className="text-slate-400" />
              <span>Youtube</span>
            </button>
          </div>

          {/* Add More button */}
          <button className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#2D7FF9] py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(45,127,249,0.7)]">
            + Add More
          </button>

          {/* Support / Settings + Theme toggle */}
          <div className="mt-8 space-y-1 border-t border-slate-200 pt-4 text-sm text-slate-600">
            <button className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-slate-600 hover:bg-white hover:text-slate-900">
              <FiHeadphones size={18} className="text-slate-400" />
              <span>Support</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-slate-600 hover:bg-white hover:text-slate-900">
              <VscSettingsGear size={18} className="text-slate-400" />
              <span>Settings</span>
            </button>

            {/* Theme toggle */}
            <div className="mt-4 flex items-center justify-between rounded-full bg-[#F1F3F5] px-2 py-1 text-[11px] font-medium text-slate-600">
              <div className="relative flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-sm">
                <FiSun size={14} className="text-amber-400" />
                <span>White</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 text-slate-400">
                <FiMoon size={14} />
                <span>Dark</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-6 pb-4">
          {/* Overview & Active Promotion row */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Overview */}
            <CardShell className="xl:col-span-2 p-5 sm:p-6">
              <SectionHeader
                title="Overview"
                subtitle="Connected accounts"
                right={
                  <>
                    <span className="hidden text-xs text-slate-400 sm:inline">Refreshed 20 sec ago</span>
                    <BadgePill tone="muted">1 Day</BadgePill>
                  </>
                }
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {overviewAccounts.map(account => (
                  <div
                    key={account.id}
                    className={`flex flex-col justify-between rounded-2xl border px-4 py-4 ${account.accent}`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {account.name}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-500">{account.handle}</div>
                      </div>
                      <BadgePill tone="success">{account.delta}</BadgePill>
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-slate-900">{account.followers}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        <div className="text-slate-400">Comments</div>
                        <div className="mt-0.5 font-medium text-slate-700">{account.comments}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Likes</div>
                        <div className="mt-0.5 font-medium text-slate-700">{account.likes}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardShell>

            {/* Active Promotion */}
            <CardShell className="p-5 sm:p-6">
              <SectionHeader
                title="Active Promotion"
                right={
                  <BadgePill tone="muted">30 Days</BadgePill>
                }
              />
              <div className="mb-3 flex gap-2 text-[11px]">
                <BadgePill tone="success">Instagram</BadgePill>
                <BadgePill tone="muted">Youtube</BadgePill>
                <BadgePill tone="muted">Twitter</BadgePill>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleSeries}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#9CA3AF" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip />
                    <Bar dataKey="reach" radius={[8, 8, 0, 0]} fill="#BFDBFE" barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-slate-500">
                <div>
                  <div className="text-slate-400">Followers</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">35,543</div>
                  <div className="mt-1 flex items-center gap-1">
                    <BadgePill tone="success">+1800 in last 2 hr</BadgePill>
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Spending</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">₹5,000</div>
                  <div className="mt-1">
                    <BadgePill tone="danger">3 days left</BadgePill>
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Reach</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">1.5L</div>
                  <div className="mt-1 text-[11px] text-slate-400">account reached</div>
                </div>
              </div>
            </CardShell>
          </div>

          {/* Engagement & Most active time */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Engagement */}
            <CardShell className="xl:col-span-2 p-5 sm:p-6">
              <SectionHeader
                title="Engagement"
                right={
                  <>
                    <BadgePill tone="muted">1 Day</BadgePill>
                    <span className="hidden text-xs text-slate-400 sm:inline">Refreshed 20 sec ago</span>
                  </>
                }
              />
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
                  {(['followers', 'engagement', 'reach', 'impressions'] as const).map(k => (
                    <button
                      key={k}
                      onClick={() => setMetric(k)}
                      className={`rounded-full px-3 py-1 capitalize transition-colors ${
                        metric === k
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setRange('7D')}
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      range === '7D'
                        ? 'bg-sky-500 text-white'
                        : 'bg-white text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setRange('30D')}
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      range === '30D'
                        ? 'bg-sky-500 text-white'
                        : 'bg-white text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    30D
                  </button>
                  <button
                    onClick={() => setRange('90D')}
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      range === '90D'
                        ? 'bg-sky-500 text-white'
                        : 'bg-white text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    90D
                  </button>
                </div>
              </div>

              <div style={{ height: 260 }} className="mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleSeries} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#9CA3AF" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip />
                    <Area type="monotone" dataKey={metric} stroke="#38BDF8" fillOpacity={1} fill="url(#colorMetric)" />
                    <Line type="monotone" dataKey={metric} stroke="#6366F1" strokeDasharray="4 6" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardShell>

            {/* Most active Time */}
            <CardShell className="p-5 sm:p-6">
              <SectionHeader
                title="Most active Time"
                right={<BadgePill tone="muted">1 Day</BadgePill>}
              />
              <div className="mb-3 flex gap-2 text-[11px]">
                <BadgePill tone="success">Instagram</BadgePill>
                <BadgePill tone="muted">Youtube</BadgePill>
                <BadgePill tone="muted">Twitter</BadgePill>
              </div>
              <div
                className="grid gap-1.5 rounded-2xl bg-slate-50 p-3"
                style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))', gridTemplateRows: 'repeat(7, 1fr)' }}
              >
                {Array.from({ length: 168 }).map((_, idx) => {
                  const col = idx % 24;
                  const row = Math.floor(idx / 24);

                  let intensity = 'bg-slate-200';
                  if ((row === 2 || row === 3) && col >= 8 && col <= 16) {
                    intensity = 'bg-sky-500';
                  } else if ((row === 1 || row === 4) && col >= 6 && col <= 18) {
                    intensity = 'bg-sky-400';
                  } else if (col >= 4 && col <= 20) {
                    intensity = 'bg-sky-300';
                  }

                  return <div key={idx} className={`h-3 w-3 rounded-md ${intensity}`} />;
                })}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-500">
                <div>
                  <div className="text-slate-400">Most active time</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">12:00 PM - 13:45 PM</div>
                </div>
                <div>
                  <div className="text-slate-400">Engagements</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">14,487</div>
                </div>
                <div>
                  <div className="text-slate-400">Likes</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">+1,254</div>
                </div>
                <div>
                  <div className="text-slate-400">Comments</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">+1,254</div>
                </div>
              </div>
            </CardShell>
          </div>
        </main>
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