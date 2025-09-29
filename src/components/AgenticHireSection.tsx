import React, { useState } from 'react';
import './AgenticHireSection.css';

// Utility function to generate dynamic styles
const getDotStyles = (rowIndex: number, colIndex: number, intensity: number) => ({
  '--row': rowIndex,
  '--col': colIndex,
  '--intensity': intensity,
} as React.CSSProperties);

const AgenticHireSection: React.FC = () => {
  const [hoveredDot, setHoveredDot] = useState<{row: number, col: number} | null>(null);

  // Function to calculate if a dot should be affected by hover
  const isDotInHoverArea = (rowIndex: number, colIndex: number) => {
    if (!hoveredDot) return false;
    const distance = Math.sqrt(
      Math.pow(rowIndex - hoveredDot.row, 2) + Math.pow(colIndex - hoveredDot.col, 2)
    );
    return distance <= 3; // 3-dot radius
  };

  // Function to get the intensity based on distance from center
  const getHoverIntensity = (rowIndex: number, colIndex: number) => {
    if (!hoveredDot) return 0;
    const distance = Math.sqrt(
      Math.pow(rowIndex - hoveredDot.row, 2) + Math.pow(colIndex - hoveredDot.col, 2)
    );
    if (distance > 3) return 0;
    return Math.max(0, 1 - (distance / 3)); // Intensity decreases with distance
  };

  return (
    <section className="bg-black py-20 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-16">
            <div>
              <h2 className="text-6xl font-normal text-white mb-8 leading-[1.1] tracking-tight">
                Your next hire<br />is agentic
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                Built for the security, compliance, and<br />
                control that modern enterprises require.
              </p>
            </div>

            {/* Compliance Features Grid */}
            <div className="grid grid-cols-4 gap-12 mt-20">
              {/* GDPR Compliant */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.8}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 6v6l4 2" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </div>
                <div className="text-white text-base font-medium mb-1">GDPR</div>
                <div className="text-gray-400 text-sm">Compliant</div>
              </div>

              {/* Soc2 Compliant */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center relative">
                    <div className="absolute top-2 text-center">
                      <div className="text-white text-xs font-semibold leading-none">SOC</div>
                    </div>
                    <div className="absolute bottom-2 text-center">
                      <div className="text-white text-lg font-bold leading-none">2</div>
                    </div>
                  </div>
                </div>
                <div className="text-white text-base font-medium mb-1">Soc2</div>
                <div className="text-gray-400 text-sm">Compliant</div>
              </div>

              {/* Access Control */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.8}>
                    <path d="M12 15v5" />
                    <path d="M15 12h5" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6" />
                    <path d="M12 18v5" />
                    <path d="M4.22 4.22l4.24 4.24" />
                    <path d="M15.54 15.54l4.24 4.24" />
                    <path d="M1 12h6" />
                    <path d="M17 12h6" />
                  </svg>
                </div>
                <div className="text-white text-base font-medium mb-1">Access</div>
                <div className="text-gray-400 text-sm">Control</div>
              </div>

              {/* Bring your own LLM */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">A</span>
                  </div>
                </div>
                <div className="text-white text-base font-medium">Bring your own LLM</div>
              </div>
            </div>
            
            {/* Interactive Dotted Pattern - Full Page Width */}
            <div className="mt-16 relative overflow-visible">
              <div 
                className="absolute h-64 dotted-pattern-container"
              >
                {/* Generate interactive dots */}
                {Array.from({ length: 24 }).map((_, rowIndex) =>
                  Array.from({ length: 120 }).map((_, colIndex) => {
                    const isInHoverArea = isDotInHoverArea(rowIndex, colIndex);
                    const intensity = getHoverIntensity(rowIndex, colIndex);
                    const isCenter = hoveredDot?.row === rowIndex && hoveredDot?.col === colIndex;
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`absolute w-1 h-1 rounded-full transition-all duration-200 ease-out cursor-pointer interactive-dot ${
                          isInHoverArea ? 'dot-hovered' : ''
                        } ${isCenter ? 'dot-center' : ''}`}
                        style={getDotStyles(rowIndex, colIndex, intensity)}
                        onMouseEnter={() => {
                          setHoveredDot({ row: rowIndex, col: colIndex });
                        }}
                        onMouseLeave={() => {
                          setHoveredDot(null);
                        }}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Content - CTA Cards */}
          <div className="space-y-4 pt-8">
            {/* Demo CTA */}
            <div className="bg-gray-800/90 rounded-2xl p-6 flex items-center justify-between hover:bg-gray-700/90 transition-colors duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-600">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                  </div>
                </div>
                <div>
                  <div className="text-white text-base font-medium">See our AI Workers in</div>
                  <div className="text-white text-base font-medium">action, book a demo now.</div>
                </div>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Request Access CTA */}
            <div className="bg-white rounded-2xl p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="text-gray-900 text-base font-medium">Request Access</div>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticHireSection;
