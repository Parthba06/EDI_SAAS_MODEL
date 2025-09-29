import React from 'react';
import './BusinessSection.css';

// Utility function to generate random bar height
const getBarStyles = () => ({
  '--height': `${Math.random() * 80 + 20}%`,
} as React.CSSProperties);

const BusinessSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Turn your audience<br />
            into a business.
          </h2>
        </div>

        {/* Dashboard Mockup */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">G</span>
                    </div>
                    <span className="text-white font-semibold">Ghost</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-white text-xl font-semibold">Dashboard</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-sm">New</span>
                  <span className="text-gray-400 text-sm">Just now</span>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-64 bg-gray-850 p-6">
                <nav className="space-y-4">
                  <div className="flex items-center space-x-3 text-white">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <span className="font-medium">Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <span>View site</span>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between text-white mb-3">
                      <span className="font-medium">Posts</span>
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="space-y-2 ml-6">
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Drafts</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Scheduled</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Published</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Free posts</span>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Paid posts</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Newsletters</span>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center space-x-3 text-gray-400">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                      <span>Pages</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                      <span>Tags</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-gray-600 rounded"></div>
                        <span>Members</span>
                      </div>
                      <span className="text-xs">13,042</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                      <span>Offers</span>
                    </div>
                  </div>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Total members</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-2xl font-bold">13,042</span>
                      <span className="text-green-400 text-sm">↗ +4%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Paid members</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-2xl font-bold">3,208</span>
                      <span className="text-green-400 text-sm">↗ +1%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Free members</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-2xl font-bold">9,834</span>
                      <span className="text-green-400 text-sm">↗ +8%</span>
                    </div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-medium">Paid members</h3>
                    <div className="text-gray-400 text-sm">↓</div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="h-48 bg-gradient-to-t from-purple-900/50 to-purple-600/30 rounded-lg relative overflow-hidden">
                    {/* SVG Chart Path */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                      <path
                        d="M0,150 Q50,100 100,120 T200,90 Q250,70 300,85 T400,110"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="2"
                        className="drop-shadow-lg"
                      />
                      <path
                        d="M0,150 Q50,100 100,120 T200,90 Q250,70 300,85 T400,110 L400,200 L0,200 Z"
                        fill="url(#gradient)"
                        fillOpacity="0.3"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Data Point */}
                    <div className="absolute top-16 right-16 flex items-center space-x-2 text-white text-sm">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>3,719 Paid members</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-gray-500 text-xs mt-2">
                    <span>19 Mar, 2022</span>
                    <span>9 Apr, 2022</span>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">MRR</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-xl font-bold">$21,879</span>
                    </div>
                    {/* Mini chart */}
                    <div className="h-12 mt-2">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <path
                          d="M0,30 Q20,20 40,25 T80,15 L100,20"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Paid subscriptions</h3>
                    <div className="h-16 bg-gray-800 rounded flex items-end justify-center space-x-1 p-2">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-blue-500 rounded-sm bar-chart-item"
                          style={getBarStyles()}
                        />
                      ))}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">• Now</div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Paid mix</h3>
                    <div className="text-gray-500 text-xs">• Monthly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
