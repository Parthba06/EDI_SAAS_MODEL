import React from 'react';
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

  return (
    <div className="w-full min-h-screen py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN - Integration Categories */}
          <div className="lg:col-span-3 space-y-3 md:space-y-4">
            {integrationCategories.map((category, index) => (
              <div 
                key={category.name}
                className="bg-white rounded-lg p-3 md:p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 cursor-pointer group"
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
          <div className="lg:col-span-5 relative h-[400px] md:h-[450px] lg:h-[500px] hidden lg:block">
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 600 500" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D1D5DB" stopOpacity="0" />
                  <stop offset="20%" stopColor="#D1D5DB" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#D1D5DB" stopOpacity="1" />
                  <stop offset="80%" stopColor="#D1D5DB" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#D1D5DB" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Animated lines from left categories to center */}
              {integrationCategories.map((_, index) => {
                const startY = 40 + (index * 65);
                const centerY = 250;
                const controlX1 = 120;
                const controlY1 = startY + (centerY - startY) * 0.2;
                const controlX2 = 220;
                const controlY2 = startY + (centerY - startY) * 0.7;
                
                return (
                  <g key={`line-left-${index}`}>
                    <path
                      d={`M 0 ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 280 ${centerY}`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="none"
                      opacity="0.5"
                    />
                    
                    {/* Animated dot */}
                    <circle r="3.5" fill="#FF6E06">
                      <animateMotion
                        dur={`${4 + index * 0.4}s`}
                        repeatCount="indefinite"
                        path={`M 0 ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 280 ${centerY}`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;1;0"
                        dur={`${4 + index * 0.4}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Animated line from center to right */}
              <g>
                <path
                  d="M 320 250 L 600 250"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  opacity="0.5"
                />
                
                {/* Animated dot to right */}
                <circle r="3.5" fill="#FF6E06">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M 320 250 L 600 250"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;1;0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
            
            {/* Central Merge Icon */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
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
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-5 md:p-6 relative max-w-md mx-auto lg:max-w-none">
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

              {/* Performance Section */}
              <div className="mb-5 md:mb-6">
                <h4 className="text-xs font-medium text-gray-500 mb-3">Performance</h4>
                <div className="flex items-end space-x-1 md:space-x-1.5 h-20 md:h-24">
                  {[30, 50, 35, 65, 45, 60, 40, 55].map((height, index) => (
                    <div 
                      key={index}
                      className="flex-1 bg-gray-200 rounded-t-sm"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Pie Chart */}
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
                      stroke="#FF6E06"
                      strokeWidth="20"
                      strokeDasharray="220"
                      strokeDashoffset="55"
                    />
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
