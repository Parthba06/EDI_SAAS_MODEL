import React, { useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Brain, 
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
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate dots along paths
    const dots = document.querySelectorAll('.moving-dot');
    dots.forEach((dot, index) => {
      const element = dot as HTMLElement;
      element.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  const platforms = [
    {
      name: 'Instagram',
      icons: [
        { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
        { name: 'Text', icon: Type, color: 'text-gray-500' },
        { name: 'Bolt', icon: Zap, color: 'text-gray-500' },
        { name: 'Chart', icon: BarChart3, color: 'text-gray-500' }
      ]
    },
    {
      name: 'TikTok',
      icons: [
        { name: 'TikTok', icon: Activity, color: 'text-black' },
        { name: 'Text', icon: Type, color: 'text-gray-500' },
        { name: 'Bolt', icon: Zap, color: 'text-gray-500' },
        { name: 'Chart', icon: TrendingUp, color: 'text-gray-500' }
      ]
    },
    {
      name: 'YouTube',
      icons: [
        { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
        { name: 'Text', icon: Type, color: 'text-gray-500' },
        { name: 'Users', icon: Users, color: 'text-gray-500' },
        { name: 'Chart', icon: BarChart3, color: 'text-gray-500' }
      ]
    },
    {
      name: 'Twitter/X',
      icons: [
        { name: 'Twitter', icon: Twitter, color: 'text-black' },
        { name: 'Bolt', icon: Zap, color: 'text-gray-500' },
        { name: 'Users', icon: Users, color: 'text-gray-500' },
        { name: 'Chart', icon: BarChart3, color: 'text-gray-500' }
      ]
    },
    {
      name: 'LinkedIn',
      icons: [
        { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
        { name: 'Text', icon: Type, color: 'text-gray-500' },
        { name: 'Users', icon: Users, color: 'text-gray-500' },
        { name: 'Chart', icon: BarChart3, color: 'text-gray-500' }
      ]
    },
    {
      name: 'Twitch',
      icons: [
        { name: 'Twitch', icon: MessageSquare, color: 'text-purple-500' },
        { name: 'Bolt', icon: Zap, color: 'text-gray-500' },
        { name: 'Users', icon: Users, color: 'text-gray-500' },
        { name: 'Chart', icon: BarChart3, color: 'text-gray-500' }
      ]
    },
    {
      name: 'Pinterest',
      icons: [
        { name: 'Pinterest', icon: Image, color: 'text-red-500' },
        { name: 'Text', icon: Type, color: 'text-gray-500' },
        { name: 'Trend', icon: TrendingUp, color: 'text-gray-500' },
        { name: 'Chart', icon: BarChart3, color: 'text-gray-500' }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Integration Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-screen">
          
          {/* Left Section - Performance Dashboard and AI Agent */}
          <div className="space-y-8">
            {/* Performance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 max-w-sm">
              <div className="flex items-center justify-end mb-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-6">Performance</h3>
              
              {/* Engagement Metric */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Engagement</span>
                  </div>
                  <div className="text-sm font-semibold text-green-600">+24%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              
              {/* New Followers Metric */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">New followers</span>
                  </div>
                  <div className="text-sm font-semibold text-green-600">+18%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900 mb-4">Your product</div>
              </div>
            </div>

            {/* AI Agent Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Your AI Agent</h3>
                <p className="text-sm text-gray-600">Intelligent analytics engine</p>
              </div>
            </div>
          </div>

          {/* Center Section - Connection Hub */}
          <div className="relative flex flex-col items-center justify-center h-full">
            {/* Unified Analytics Badge */}
            <div className="bg-white rounded-full px-6 py-2 shadow-md border border-orange-200 mb-8">
              <span className="text-sm font-medium text-gray-900">Unified Analytics</span>
            </div>
            
            {/* Connection Lines and Central Node */}
            <div className="relative mb-8">
              {/* AI Analysis Engine Badge */}
              <div className="bg-white rounded-full px-6 py-2 shadow-md border border-gray-300 mb-8">
                <span className="text-sm font-medium text-gray-900">AI Analysis Engine</span>
              </div>
              
              {/* Central Diamond */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gray-900 transform rotate-45 shadow-lg"></div>
              </div>
            </div>

            {/* Connection Lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 400"
              style={{ zIndex: -1 }}
            >
              {/* Solid lines from left */}
              {[...Array(7)].map((_, index) => {
                const startY = 50 + (index * 40);
                const centerY = 200;
                return (
                  <path
                    key={`left-${index}`}
                    d={`M 50 ${startY} Q 150 ${startY} 200 ${centerY}`}
                    stroke="#000"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.6"
                  />
                );
              })}
              
              {/* Dotted lines to right */}
              {[...Array(7)].map((_, index) => {
                const endY = 50 + (index * 40);
                const centerY = 200;
                return (
                  <path
                    key={`right-${index}`}
                    d={`M 200 ${centerY} Q 250 ${endY} 350 ${endY}`}
                    stroke="#000"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    fill="none"
                    opacity="0.6"
                  />
                );
              })}
            </svg>
          </div>

          {/* Right Section - Platform Integrations */}
          <div className="space-y-3">
            {platforms.map((platform, index) => (
              <div key={platform.name} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 min-w-[80px]">
                    {platform.name}
                  </h4>
                  <div className="flex space-x-2">
                    {platform.icons.map((iconData, iconIndex) => (
                      <div
                        key={iconIndex}
                        className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <iconData.icon className={`w-4 h-4 ${iconData.color}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 text-center">
              <p className="text-xs text-gray-400">
                and dozens more platforms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationVisualization;
