import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { 
  BarChart3, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Twitch, 
  Image,
  Zap,
  TrendingUp,
  Users,
  Activity,
  Type,
  MessageSquare
} from 'lucide-react';

const IntegrationVisualization = () => {
  const integrationCategories = [
    {
      name: 'Instagram',
      icons: [
        { icon: Instagram, color: 'text-pink-500' },
        { icon: Type, color: 'text-gray-400' },
        { icon: Zap, color: 'text-gray-400' },
        { icon: BarChart3, color: 'text-gray-400' }
      ]
    },
    {
      name: 'TikTok',
      icons: [
        { icon: Activity, color: 'text-black' },
        { icon: Type, color: 'text-gray-400' },
        { icon: Zap, color: 'text-gray-400' },
        { icon: TrendingUp, color: 'text-gray-400' }
      ]
    },
    {
      name: 'YouTube',
      icons: [
        { icon: Youtube, color: 'text-red-500' },
        { icon: Type, color: 'text-gray-400' },
        { icon: Users, color: 'text-gray-400' },
        { icon: BarChart3, color: 'text-gray-400' }
      ]
    },
    {
      name: 'Twitter/X',
      icons: [
        { icon: Twitter, color: 'text-black' },
        { icon: Zap, color: 'text-gray-400' },
        { icon: Users, color: 'text-gray-400' },
        { icon: BarChart3, color: 'text-gray-400' }
      ]
    },
    {
      name: 'LinkedIn',
      icons: [
        { icon: Linkedin, color: 'text-blue-600' },
        { icon: Type, color: 'text-gray-400' },
        { icon: Users, color: 'text-gray-400' },
        { icon: BarChart3, color: 'text-gray-400' }
      ]
    },
    {
      name: 'Twitch',
      icons: [
        { icon: MessageSquare, color: 'text-purple-500' },
        { icon: Zap, color: 'text-gray-400' },
        { icon: Users, color: 'text-gray-400' },
        { icon: BarChart3, color: 'text-gray-400' }
      ]
    },
    {
      name: 'Pinterest',
      icons: [
        { icon: Image, color: 'text-red-500' },
        { icon: Type, color: 'text-gray-400' },
        { icon: TrendingUp, color: 'text-gray-400' },
        { icon: BarChart3, color: 'text-gray-400' }
      ]
    }
  ];

  const gridRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } }[]>([]);
  const [centerToRight, setCenterToRight] = useState<{ start: { x: number; y: number }; end: { x: number; y: number }} | null>(null);
  const rafRef = useRef<number | null>(null);
  const [kpiVals, setKpiVals] = useState<number[]>([0, 0, 0]);
  const [barHeights, setBarHeights] = useState<number[]>([30, 50, 35, 65, 45, 60, 40, 55]);

  const updatePositions = useCallback(() => {
    const grid = gridRef.current;
    const center = centerRef.current;
    if (!grid || !center) return;

    const gridRect = grid.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const circleRect = centerCircleRef.current?.getBoundingClientRect() || centerRect;
    const circleCenter = {
      x: circleRect.left - gridRect.left + circleRect.width / 2,
      y: circleRect.top - gridRect.top + circleRect.height / 2,
    };
    const circleRadius = Math.min(circleRect.width, circleRect.height) / 2;

    const nextLines: { start: { x: number; y: number }; end: { x: number; y: number } }[] = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const start = {
        x: r.right - gridRect.left,
        y: r.top - gridRect.top + r.height / 2,
      };
      const end = {
        x: circleCenter.x - circleRadius,
        y: circleCenter.y,
      };
      nextLines.push({ start, end });
    });
    setLines(nextLines);

    // Right line
    const rightRect = (rightCardRef.current || rightPanelRef.current)?.getBoundingClientRect();
    if (rightRect) {
      const start = { x: circleCenter.x + circleRadius, y: circleCenter.y };
      let endX = rightRect.left - gridRect.left;
      if (endX <= start.x + 8) endX = start.x + 96;
      const end = { x: endX, y: circleCenter.y };
      setCenterToRight({ start, end });
    } else {
      setCenterToRight(null);
    }
  }, []);

  useLayoutEffect(() => {
    updatePositions();
    setTimeout(updatePositions, 0);
    const ro = new ResizeObserver(updatePositions);
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener('resize', updatePositions);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updatePositions);
    };
  }, [updatePositions]);

  // Continuously sync lines with animated positions (every frame)
  useEffect(() => {
    const tick = () => {
      updatePositions();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePositions]);

  // Animate KPI counters (simple RAF-based count-up)
  useEffect(() => {
    const targets = [1240, 320, 87];
    const duration = 1500;
    let startTime: number | null = null;
    const step = (t: number) => {
      if (startTime == null) startTime = t;
      const p = Math.min(1, (t - startTime) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setKpiVals(targets.map((v) => Math.round(v * ease)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  // Periodically nudge KPIs and bars (random walk) to feel live
  useEffect(() => {
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const interval = setInterval(() => {
      // KPI random walk around base values
      setKpiVals((prev) => {
        const bases = [1240, 320, 87];
        return prev.map((v, i) => clamp(Math.round(v + (Math.random() - 0.5) * (i === 2 ? 3 : 60)), Math.round(bases[i] * 0.7), Math.round(bases[i] * 1.3)));
      });
      // Bars random walk between 20% and 85%
      setBarHeights((prev) => prev.map((h) => clamp(Math.round(h + (Math.random() - 0.5) * 12), 20, 85)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-[1400px] mx-auto">
        <div ref={gridRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          <style>
            {`
              @keyframes floatY {
                0% { transform: translateY(0); }
                50% { transform: translateY(-12px); }
                100% { transform: translateY(0); }
              }
              @keyframes growBar { from { transform: scaleY(0.2); } to { transform: scaleY(1); } }
              @keyframes dashFlow { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }
              @keyframes pulseDot { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.15); opacity: 1; } }
              @media (prefers-reduced-motion: reduce) {
                [style*="floatY"] { animation: none !important; }
              }
            `}
          </style>

          <svg className="pointer-events-none absolute inset-0 w-full h-full z-50" preserveAspectRatio="none">
            {lines.map((l, i) => {
              const dx = l.end.x - l.start.x;
              const dy = l.end.y - l.start.y;
              const c1x = l.start.x + Math.max(40, dx * 0.3);
              const c1y = l.start.y + dy * 0.2;
              const c2x = l.start.x + Math.max(80, dx * 0.7);
              const c2y = l.start.y + dy * 0.8;
              return (
                <g key={i}>
                  <circle r="3.5" fill="#6ee7b7">
                    <animateMotion dur={`${4 + i * 0.3}s`} repeatCount="indefinite" path={`M ${l.start.x} ${l.start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${l.end.x} ${l.end.y}`} />
                    <animate attributeName="opacity" values="0;1;1;1;0" dur={`${4 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
            {centerToRight && (() => {
              const { start, end } = centerToRight;
              return (
                <g>
                  <circle r="4" fill="#6ee7b7">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                    />
                  </circle>
                </g>
              );
            })()}
          </svg>
          
          {/* LEFT COLUMN - Integration Categories */}
          <div className="relative z-10 lg:col-span-3 space-y-3 md:space-y-4">
            {integrationCategories.map((category, index) => (
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                key={category.name}
                className="bg-white rounded-lg p-3 md:p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200 cursor-pointer group"
                style={{
                  animation: `floatY 4s ease-in-out ${index * 0.2}s infinite alternate`,
                  willChange: 'transform',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {category.icons.slice(0, 4).map((iconData, iconIndex) => (
                      <div
                        key={iconIndex}
                        className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0"
                      >
                        <iconData.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${iconData.color}`} strokeWidth={1.5} />
                      </div>
                    ))}
                  </div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-900 whitespace-nowrap">
                    {category.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER COLUMN - Merge Visualization */}
          <div className="lg:col-span-5 relative h-[400px] md:h-[450px] lg:h-[500px] hidden lg:block z-10">
            <div ref={centerRef} className="relative z-10 flex flex-col items-center justify-center h-full">
              <div ref={centerCircleRef} className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-16 h-16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Merge icon - three lines converging to one */}
                  <path 
                    d="M 15 15 L 50 50" 
                    stroke="#1F2937" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M 15 50 L 50 50" 
                    stroke="#1F2937" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M 15 85 L 50 50" 
                    stroke="#1F2937" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M 50 50 L 85 50" 
                    stroke="#1F2937" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="6" fill="#1F2937" />
                </svg>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">Merge</h3>
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN - Dashboard Preview */}
          <div ref={rightPanelRef} className="lg:col-span-4 z-10">
            <div
              ref={rightCardRef}
              className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-5 md:p-6 relative max-w-md mx-auto lg:max-w-none"
              style={{
                animation: `floatY 4s ease-in-out 0.3s infinite alternate`,
                willChange: 'transform',
              }}
            >
              {/* Three dots menu */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4 flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>

              {/* Dashboard Header */}
              <div className="mb-5 md:mb-6">
                <span className="text-xs font-medium text-gray-500">Your product</span>
              </div>

              {/* Live KPIs */}
              <div className="mb-4 md:mb-5 grid grid-cols-3 gap-2">
                {[{label:'Sessions'}, {label:'Leads'}, {label:'Conv.%'}].map((k, i) => (
                  <div key={k.label} className="bg-gray-50 rounded p-2 text-center">
                    <div className="text-[10px] text-gray-500 mb-1">{k.label}</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {i === 2 ? `${kpiVals[2]}%` : kpiVals[i].toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance Section */}
              <div className="mb-5 md:mb-6">
                <h4 className="text-xs font-medium text-gray-500 mb-3">Performance</h4>
                <div className="flex items-end space-x-1 md:space-x-1.5 h-20 md:h-24">
                  {barHeights.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gray-200 rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        transformOrigin: 'bottom',
                        transition: 'height 900ms ease',
                      }}
                    ></div>
                  ))}
                </div>
                {/* Sparkline */}
                <div className="mt-3">
                  <svg viewBox="0 0 120 32" className="w-full h-10">
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="sparkStroke" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#86efac" />
                        <stop offset="50%" stopColor="#6ee7b7" />
                        <stop offset="100%" stopColor="#86efac" />
                        <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="2.5s" repeatCount="indefinite" />
                      </linearGradient>
                    </defs>
                    <path d="M2 24 L18 20 L34 22 L50 16 L66 18 L82 12 L98 14 L116 8" fill="none" stroke="url(#sparkStroke)" strokeWidth="2" />
                    <path d="M2 24 L18 20 L34 22 L50 16 L66 18 L82 12 L98 14 L116 8 L116 32 L2 32 Z" fill="url(#sparkGrad)" />
                  </svg>
                </div>
              </div>

              {/* Pie Chart (animated progress) */}
              <div className="mb-5 md:mb-6 flex justify-end">
                <div className="relative w-14 h-14 md:w-16 md:h-16">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#6ee7b7"
                      strokeWidth="20"
                      strokeDasharray="220"
                      strokeDashoffset="55"
                    >
                      <animate attributeName="stroke-dashoffset" values="40;65;40" dur="4s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5 md:mb-6">
                <div className="bg-gray-50 rounded p-1.5 md:p-2">
                  <div className="text-[9px] md:text-[10px] text-gray-500 mb-1">Business p&l</div>
                  <div className="h-1 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-gray-50 rounded p-1.5 md:p-2">
                  <div className="text-[9px] md:text-[10px] text-gray-500 mb-1">New leads</div>
                  <div className="h-1 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-gray-50 rounded p-1.5 md:p-2">
                  <div className="text-[9px] md:text-[10px] text-gray-500 mb-1">Accounts payable</div>
                  <div className="h-1 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Customers Section */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 mb-3">Customers</h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-1.5 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default IntegrationVisualization;
