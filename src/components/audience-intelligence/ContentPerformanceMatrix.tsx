import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContentType } from "./types";
import { Star } from "lucide-react";

interface Props {
  contentTypes: ContentType[];
}

export const ContentPerformanceMatrix: React.FC<Props> = ({ contentTypes }) => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.06, duration: 0.4 },
    }),
  };

  const getRecommendationColor = (level: string) => {
    switch (level) {
      case "high":
        return "ring-emerald-300 bg-emerald-50";
      case "medium":
        return "ring-amber-300 bg-amber-50";
      case "low":
        return "ring-red-300 bg-red-50";
      default:
        return "ring-gray-300 bg-gray-50";
    }
  };

  const getRecommendationBadge = (level: string) => {
    switch (level) {
      case "high":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const topPerformers = contentTypes
    .filter((ct) => ct.recommendationLevel === "high")
    .sort((a, b) => b.engagementScore - a.engagementScore);

  const mediumPerformers = contentTypes.filter(
    (ct) => ct.recommendationLevel === "medium"
  );

  const lowPerformers = contentTypes.filter(
    (ct) => ct.recommendationLevel === "low"
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Content Performance</h2>
        <p className="mt-1 text-sm text-gray-600">
          How different content types perform with your audience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Top Performers */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-emerald-500" fill="currentColor" />
              <Star size={16} className="text-emerald-500" fill="currentColor" />
              <Star size={16} className="text-emerald-500" fill="currentColor" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Top Performers</h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              RECOMMENDED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topPerformers.map((content, idx) => (
              <motion.div
                key={content.name}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => setHoveredType(content.name)}
                onMouseLeave={() => setHoveredType(null)}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`group rounded-lg border-2 p-4 cursor-pointer transition-all ${getRecommendationColor(
                  content.recommendationLevel
                )}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {content.name}
                  </h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getRecommendationBadge(content.recommendationLevel)}`}>
                    {content.performanceRating}/5
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 font-medium">
                        Engagement Score
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {content.engagementScore}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        layoutId={`engagement-${content.name}`}
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${content.engagementScore}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 pt-2">
                    ✓ High engagement and strong audience preference
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Medium Performers */}
        {mediumPerformers.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="flex gap-0.5">
                <Star size={14} className="text-amber-500" fill="currentColor" />
                <Star size={14} className="text-amber-500" fill="currentColor" />
              </div>
              Good Performers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mediumPerformers.map((content, idx) => (
                <motion.div
                  key={content.name}
                  custom={topPerformers.length + idx}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onMouseEnter={() => setHoveredType(content.name)}
                  onMouseLeave={() => setHoveredType(null)}
                  className={`group rounded-lg border p-3 cursor-pointer transition-all ${getRecommendationColor(
                    content.recommendationLevel
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {content.name}
                    </h4>
                    <span className="text-xs font-bold text-amber-700">
                      {content.performanceRating}/5
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${content.engagementScore}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Low Performers */}
        {lowPerformers.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Star size={14} className="text-red-500" fill="currentColor" />
              Underperformers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lowPerformers.map((content, idx) => (
                <motion.div
                  key={content.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay:
                      (topPerformers.length + mediumPerformers.length + idx) *
                      0.06,
                  }}
                  className={`group rounded-lg border p-3 cursor-pointer transition-all ${getRecommendationColor(
                    content.recommendationLevel
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {content.name}
                    </h4>
                    <span className="text-xs font-bold text-red-700">
                      {content.performanceRating}/5
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400"
                      style={{ width: `${content.engagementScore}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4"
      >
        <p className="text-sm text-gray-800 leading-relaxed">
          <span className="font-semibold text-blue-900">AI Recommendation: </span>
          Your audience strongly prefers fast-paced educational reels under 45 seconds.
          Focus 70% of your content efforts on top performers, and experiment with medium
          performers to find new angles that resonate with your audience.
        </p>
      </motion.div>
    </motion.div>
  );
};
