import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";
import {
  FiActivity,
  FiBarChart2,
  FiUsers,
  FiCalendar,
  FiCpu,
  FiTrendingUp,
  FiAlertCircle,
  FiSend,
  FiMessageSquare,
  FiCompass,
  FiCheckCircle,
} from "react-icons/fi";
import { BsStars, BsRobot, BsGraphUpArrow, BsLightningCharge } from "react-icons/bs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import Dock from "../components/Dock";

// --- Types ---
type Message = {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
};

type PromptOption = {
  id: string;
  icon: string;
  label: string;
  query: string;
  answer: string;
};

// --- Mock Strategy Prompts & Answers ---
const PROMPT_OPTIONS: PromptOption[] = [
  {
    id: "trends",
    icon: "💡",
    label: "Emerging Niches",
    query: "What niches are emerging early this week?",
    answer: "Our AI engine detects a **34% spike** in micro-interactions around **'AI-augmented creative workflow'** tutorials. Audiences on YouTube/X are shifting away from generic high-level tech news towards highly specialized 'how-to' clips demonstrating tools like ComfyUI, ElevenLabs, and Cursor editor hacks. Early adopters are achieving a **2.8x higher viral multiplier** in this niche.",
  },
  {
    id: "competition",
    icon: "📈",
    label: "Outpace Competitor",
    query: "How do I outpace TechGuru Pro on Reels?",
    answer: "Analysis of **@techgurupro** reveals a content gap: they post 68% high-production videos but lack raw behind-the-scenes content. Their engagement drops **18%** on weekends. **Action plan:** Post 3 unpolished behind-the-scenes Reels on Saturdays and Sundays between **6 PM – 8 PM**. Hook the audience in the first **2.2 seconds** using an contrasting text overlay. This targeted counter-programming targets their inactive window.",
  },
  {
    id: "posting",
    icon: "🎯",
    label: "Posting Optimization",
    query: "What's my optimal posting schedule today?",
    answer: "Based on active follower heatmaps across Instagram and YouTube, your peak audience overlap is at **7:15 PM IST**. We suggest staging your primary Reel at **7:00 PM** to let the platform index it, and cross-promoting a highlight thread on Twitter/X at **7:45 PM** when your tech audience has the highest retweet momentum.",
  },
  {
    id: "monetization",
    icon: "💰",
    label: "Sponsorship Tactics",
    query: "Suggest a sponsorship outreach strategy",
    answer: "Your current engagement-to-follower ratio is in the **Top 8%** of tech micro-creators, making you highly lucrative for SaaS tool sponsorships. We recommend pitching to mid-stage toolmakers (e.g. Linear, Notion, Raycast) with a **flat rate of ₹45,000 per dedicated integrations slot**. Showcase your **87% consistency score** and high-conversion demographics (82% developers/designers).",
  },
];

export default function Insights(): JSX.Element {
  const navigate = useNavigate();

  // --- States ---
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am your AI Business Strategist. I have scanned your cross-platform metrics, analyzed @techgurupro, and indexed active trends. What growth strategy shall we simulate today?",
      timestamp: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // --- Auto-scroll Chat ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- Dock items ---
  const dockItems = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => navigate("/") },
    { icon: <VscArchive size={18} />, label: "Insights", onClick: () => navigate("/insights") },
    { icon: <VscAccount size={18} />, label: "Profile", onClick: () => navigate("/profile") },
    { icon: <VscSettingsGear size={18} className="rotate-90" />, label: "Settings", onClick: () => navigate("/settings") },
  ];

  // --- AI Strategic Cards ---
  const strategicMetrics = [
    {
      title: "Trend Forecast Accuracy",
      icon: <FiCpu className="text-blue-400 text-2xl" />,
      value: "94.8%",
      trend: "up",
      period: "based on 12 predictive loops",
    },
    {
      title: "Predictive Reach Boost",
      icon: <BsGraphUpArrow className="text-emerald-400 text-2xl" />,
      value: "+42.5%",
      trend: "up",
      period: "projected for next 30 days",
    },
    {
      title: "Monetization Index",
      icon: <BsLightningCharge className="text-amber-400 text-2xl" />,
      value: "9.2/10",
      trend: "up",
      period: "highest conversion category",
    },
    {
      title: "Competitor Strategy Gap",
      icon: <FiAlertCircle className="text-rose-400 text-2xl" />,
      value: "3 Critical Gaps",
      trend: "neutral",
      period: "counter-programming ready",
    },
  ];

  // --- Chart 1: Niche Trend Prediction & Velocity ---
  const trendVelocityData = [
    { week: "Wk 1", "AI Workflows": 12, "No-Code Apps": 45, "Tech Vlogs": 38 },
    { week: "Wk 2", "AI Workflows": 25, "No-Code Apps": 42, "Tech Vlogs": 35 },
    { week: "Wk 3", "AI Workflows": 48, "No-Code Apps": 39, "Tech Vlogs": 32 },
    { week: "Wk 4", "AI Workflows": 84, "No-Code Apps": 34, "Tech Vlogs": 28 },
    { week: "Wk 5", "AI Workflows": 120, "No-Code Apps": 29, "Tech Vlogs": 24 },
    { week: "Wk 6", "AI Workflows": 168, "No-Code Apps": 22, "Tech Vlogs": 18 },
  ];

  // --- Chart 2: Followers Growth Velocity & Projections ---
  const growthMomentumData = [
    { month: "Jan", actual: 18000, projected: 18000 },
    { month: "Feb", actual: 21000, projected: 21000 },
    { month: "Mar", actual: 24500, projected: 24500 },
    { month: "Apr", actual: 28000, projected: 28000 },
    { month: "May", actual: 32000, projected: 32000 },
    { month: "Jun", actual: 35543, projected: 35543 },
    { month: "Jul", projected: 41200 },
    { month: "Aug", projected: 48500 },
    { month: "Sep", projected: 56900 },
  ];

  // --- Chat trigger logic ---
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // User message
    const userMsg: Message = { sender: "user", text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    // AI strategist response
    setTimeout(() => {
      let aiResponseText = "I have indexed that strategy simulation. Based on present creator signals, we recommend optimizing your post hooks (first 3 seconds) and scheduling your content specifically for Tuesday/Thursday windows to maximize retention. Please select one of our premium strategic prompts to run a deep architectural simulation.";
      
      // Match key phrases
      const lower = text.toLowerCase();
      if (lower.includes("niche") || lower.includes("emerging") || lower.includes("trend")) {
        aiResponseText = PROMPT_OPTIONS[0].answer;
      } else if (lower.includes("guru") || lower.includes("competitor") || lower.includes("outpace")) {
        aiResponseText = PROMPT_OPTIONS[1].answer;
      } else if (lower.includes("schedule") || lower.includes("post") || lower.includes("time")) {
        aiResponseText = PROMPT_OPTIONS[2].answer;
      } else if (lower.includes("sponsorship") || lower.includes("money") || lower.includes("earn")) {
        aiResponseText = PROMPT_OPTIONS[3].answer;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handlePromptClick = (p: PromptOption) => {
    handleSendMessage(p.query);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans pb-28">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 border-b border-slate-900 px-8 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <BsStars className="text-blue-400 animate-pulse" />
              <span>AI Strategic Guidance & Predictive Analytics</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Creator Operating System Strategist & Trend Intelligence Engine
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              <VscHome />
              <span>Dashboard Overview</span>
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span>Trend Predictor Live</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Row 1: AI Strategy Metrics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {strategicMetrics.map((card, index) => (
            <div
              key={index}
              className="relative overflow-hidden group rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-xl transition-all duration-300 hover:border-slate-800 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full -mr-6 -mt-6 pointer-events-none group-hover:scale-125 transition-transform" />
              <div className="flex items-start justify-between mb-4">
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-800/80">
                  {card.icon}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  AI Inspected
                </span>
              </div>
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-black text-white tracking-tight">{card.value}</p>
              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {card.period}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: Predictive & Momentum Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart 1: Niche Trend Prediction */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <FiCompass className="text-blue-400" />
                  <span>Niche Trend Prediction & Velocity</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculated using emerging keyword trajectory momentum (Wk 1 - Wk 6)
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>3 Emergent Niches</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="gradNoCode" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="gradVlogs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#1e293b/40" strokeDasharray="3 3" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="AI Workflows"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fill="url(#gradAI)"
                    activeDot={{ r: 5 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="No-Code Apps"
                    stroke="#8b5cf6"
                    strokeWidth={1.5}
                    fill="url(#gradNoCode)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Tech Vlogs"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    fill="url(#gradVlogs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-blue-400">Trend Signal Alert:</span> **AI Workflows** has breached the exponential velocity limit with a **168% growth index**, powered by higher user save/share activity. Focus near-term content tags here.
            </div>
          </div>

          {/* Chart 2: Predictive Growth Momentum */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <FiBarChart2 className="text-emerald-400" />
                  <span>Growth Momentum & AI Projections</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Actual followers growth tracked through June vs AI predicted trajectory
                </p>
              </div>
              <div className="text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-emerald-400 uppercase tracking-wider">
                90-Day Predictive Runway
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthMomentumData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#1e293b/40" strokeDasharray="3 3" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="plainline" wrapperStyle={{ fontSize: 11 }} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual Followers"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: "#0f172a", fill: "#10b981", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    name="AI Forecasted Path"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3, stroke: "#0f172a", fill: "#38bdf8", strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-emerald-400">Projection Summary:</span> Creator velocity model projects reaching **56,900 followers** by September. Maintaining current posting frequency makes achieving this outcome **89.2% probable**.
            </div>
          </div>
        </div>

        {/* Row 3: AI Business Strategist Interactive Hub */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left panel: Quick Prompt simulators */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-900 bg-slate-900/30 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 shadow-md">
                  <BsLightningCharge className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Strategy Simulation</h3>
                  <p className="text-[10px] text-slate-400">Click a prompt to simulate AI strategist findings</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {PROMPT_OPTIONS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full text-left rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition-all duration-200 hover:bg-slate-900 hover:border-slate-700 active:scale-98 flex items-start gap-3 group"
                  >
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {prompt.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {prompt.label}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        "{prompt.query}"
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800/80 p-4">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white">
                <BsRobot className="text-blue-400" />
                <span>Strategy Context Active</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Platform is continuously mapping creator context from Instagram demographics, YouTube video indexes, and Twitter interaction logs to feed your strategist.
              </p>
            </div>
          </div>

          {/* Right panel: AI Chat Strategist Interface */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/50 flex flex-col h-[520px] overflow-hidden shadow-2xl">
            {/* Chat header */}
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-blue-500/10">
                  AI
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Creator Operating System Business Strategist</h4>
                  <p className="text-[9px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    Interactive Advisor Online
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                System 6 / 10
              </span>
            </div>

            {/* Chat scrollable box */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-md border ${
                      msg.sender === "user"
                        ? "bg-blue-600 border-blue-500 text-white rounded-br-none"
                        : "bg-slate-950 border-slate-800 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.text}</p>
                    <p className={`text-[8px] mt-2 text-right ${msg.sender === "user" ? "text-blue-200" : "text-slate-500"}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-bl-none p-4 max-w-[80%] flex items-center gap-2">
                    <span className="flex space-x-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.05s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium font-mono">Strategist is simulating outcomes...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat inputs */}
            <div className="p-4 bg-slate-950 border-t border-slate-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(chatInput);
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the business strategist anything (e.g. 'suggest niche hashtags', 'peak hours')..."
                  className="flex-1 rounded-full border border-slate-800 bg-slate-900/50 px-5 py-3 text-xs text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="h-10 w-10 shrink-0 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-700 disabled:border-slate-800 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/10 border border-transparent"
                >
                  <FiSend size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Row 4: Recent Strategic Interventions / Recommendation Matrix */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 shadow-xl">
          <div className="mb-6">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <FiCheckCircle className="text-emerald-400" />
              <span>Real-Time Strategic Intervention Journal</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              History of growth-hacks recommended and triggered on linked accounts
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                time: "3 hours ago",
                type: "Hashtag Injection",
                title: "Emerging trend #cursorai injected in draft spool",
                desc: "AI engine detected a +280% momentum spike in #cursorai and successfully recommended integration. Projected engagement spike is +34%.",
                impact: "High Impact Potential",
                impactColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
              },
              {
                time: "Yesterday",
                type: "Competitor Counter-Action",
                title: "Optimized Reel posted during @techgurupro dead-zone",
                desc: "You posted your tutorial clip at 6:15 PM Saturday when competitor was inactive. Yielded 8.4K impressions inside first 2 hours (+44% above average).",
                impact: "Active Win",
                impactColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
              },
              {
                time: "3 days ago",
                type: "Audience Persona Optimization",
                title: "AI audience persona refreshed: 'Aspiring Devs' dominant",
                desc: "System analyzed 4.5K comment sentiments. Audience Persona updated to reflect 62% beginner-level engineers asking for setup walkthroughs.",
                impact: "System Refreshed",
                impactColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl border border-slate-900 bg-slate-950/40 p-4 hover:border-slate-800/80 transition-colors"
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-24 shrink-0 sm:pt-0.5">
                  {item.time}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                      {item.type}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${item.impactColor}`}>
                      {item.impact}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1.5">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Dock Navigation */}
      <Dock items={dockItems} panelHeight={68} baseItemSize={50} magnification={70} />
    </div>
  );
}