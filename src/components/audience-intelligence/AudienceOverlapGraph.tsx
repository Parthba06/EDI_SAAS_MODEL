import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { CreatorOverlap } from "./types";

interface Props {
  creators: CreatorOverlap[];
}

export const AudienceOverlapGraph: React.FC<Props> = ({ creators }) => {
  const [hoveredCreator, setHoveredCreator] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.1, duration: 0.5 },
    }),
  };

  // Calculate positions for bubble arrangement
  const getBubblePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 120;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const maxOverlap = Math.max(...creators.map((c) => c.overlapPercentage));
  const maxAudienceSize = Math.max(...creators.map((c) => c.audience_size));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Audience Overlap Intelligence</h2>
        <p className="mt-1 text-sm text-gray-600">
          Creators and niches that share your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Bubble Network Visualization */}
        <div className="lg:col-span-2 flex items-center justify-center relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          {/* SVG overlay for connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
          >
            {creators.map((creator, idx) => {
              const pos = getBubblePosition(idx, creators.length);
              const centerX = window.innerWidth / 2;
              const centerY = 192; // Half of h-96 in pixels

              return (
                <line
                  key={`line-${creator.name}`}
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + pos.x}
                  y2={centerY + pos.y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          {/* Center point */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(110, 231, 183, 0.4)",
                  "0 0 40px rgba(110, 231, 183, 0.6)",
                  "0 0 20px rgba(110, 231, 183, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold z-10"
            >
              <Users size={24} />
            </motion.div>
          </div>

          {/* Creator bubbles */}
          {creators.map((creator, idx) => {
            const pos = getBubblePosition(idx, creators.length);
            const size = 30 + (creator.audience_size / maxAudienceSize) * 40;
            const opacity =
              hoveredCreator === null || hoveredCreator === creator.name ? 1 : 0.3;

            return (
              <motion.div
                key={creator.name}
                custom={idx}
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => setHoveredCreator(creator.name)}
                onMouseLeave={() => setHoveredCreator(null)}
                whileHover={{ scale: 1.15 }}
                className="absolute rounded-full cursor-pointer border-4 border-white shadow-lg flex items-center justify-center text-center p-2 transition-opacity"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: [
                    "#3B82F6",
                    "#8B5CF6",
                    "#EC4899",
                    "#F59E0B",
                    "#10B981",
                  ][idx % 5],
                  opacity,
                }}
                title={`${creator.name}\n${creator.overlapPercentage}% overlap\n${creator.audience_size.toLocaleString()} audience`}
              >
                <div className="text-white text-center">
                  <p className="font-bold text-xs leading-tight">
                    {creator.overlapPercentage}%
                  </p>
                  {size > 50 && (
                    <p className="text-xs opacity-80 leading-tight">
                      {creator.name.split(" ")[0]}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Creator Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Top Creator Overlaps
          </h3>

          {creators.map((creator, idx) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredCreator(creator.name)}
              onMouseLeave={() => setHoveredCreator(null)}
              className="group rounded-lg border border-gray-200 p-3 cursor-pointer transition-all hover:border-gray-300 hover:shadow-md bg-gray-50 hover:bg-white"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {creator.name}
                  </h4>
                  <p className="text-xs text-gray-600">{creator.niche}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {creator.overlapPercentage}%
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-gray-600 mb-1">Audience Size</p>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400"
                      style={{
                        width: `${(creator.audience_size / maxAudienceSize) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-gray-700 font-medium mt-1">
                    {(creator.audience_size / 1000).toFixed(0)}K followers
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 mb-1">Connection Strength</p>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                      style={{ width: `${creator.connection_strength}%` }}
                    />
                  </div>
                  <p className="text-gray-700 font-medium mt-1">
                    {creator.connection_strength}/100
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 rounded-lg bg-purple-50 border border-purple-200 p-4"
      >
        <p className="text-sm text-gray-800 leading-relaxed">
          <span className="font-semibold text-purple-900">Ecosystem Intelligence: </span>
          62% of your audience also follows AI productivity creators. This strong niche
          alignment indicates high potential for collaboration, cross-promotion, and
          audience growth within the AI/productivity creator ecosystem.
        </p>
      </motion.div>
    </motion.div>
  );
};
