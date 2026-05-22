import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { AIInsight } from "./types";

interface Props {
  insights: AIInsight[];
}

export const AIInsightFeed: React.FC<Props> = ({ insights }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, x: -10 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "engagement":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "content":
        return "bg-purple-50 border-purple-200 text-purple-700";
      case "growth":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "audience":
        return "bg-pink-50 border-pink-200 text-pink-700";
      case "timing":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      engagement: "Engagement",
      content: "Content",
      growth: "Growth",
      audience: "Audience",
      timing: "Timing",
    };
    return labels[category] || category;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI Insights Feed</h2>
          <p className="mt-1 text-sm text-gray-600">
            Latest AI-generated strategic insights about your audience.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200">
          <Zap size={14} className="text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            variants={cardVariants}
            whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className={`group rounded-lg border p-4 transition-all cursor-pointer ${getCategoryColor(
              insight.category
            )}`}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:translate-x-1 transition-transform">
                  {insight.title}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {insight.description}
                </p>
              </div>
              <div className="ml-2 flex flex-col items-end gap-1">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                    insight.category
                  ).split(" ")[0]} border-0`}
                  style={{
                    backgroundColor: getCategoryColor(insight.category)
                      .split(" ")[0]
                      .replace("bg-", ""),
                  }}
                >
                  {getCategoryLabel(insight.category)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Confidence Score */}
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-gray-600">
                    Confidence:{" "}
                  </span>
                  <div className="flex gap-0.5">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < Math.round(insight.confidenceScore / 20)
                              ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <span className="text-xs font-medium text-gray-700 ml-1">
                    {insight.confidenceScore}%
                  </span>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1">
                  {insight.trend === "up" ? (
                    <TrendingUp size={14} className="text-emerald-600" />
                  ) : insight.trend === "down" ? (
                    <TrendingDown size={14} className="text-red-600" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-300" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      insight.trend === "up"
                        ? "text-emerald-600"
                        : insight.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {insight.trend === "down" ? "−" : "+"}
                    {insight.trendPercent}%
                  </span>
                </div>
              </div>

              {/* Actionable Badge */}
              {insight.actionable && (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300">
                  Actionable
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        View All Insights →
      </motion.button>
    </motion.div>
  );
};
