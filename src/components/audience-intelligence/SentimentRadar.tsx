import React, { useState } from "react";
import { motion } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Cell } from "recharts";
import { SentimentData } from "./types";

interface Props {
  sentiments: SentimentData[];
}

export const SentimentRadar: React.FC<Props> = ({ sentiments }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Transform data for radar chart
  const radarData = sentiments.map((s) => ({
    emotion: s.emotion,
    value: s.percentage,
    fill: s.color,
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Sentiment Analysis</h2>
        <p className="mt-1 text-sm text-gray-600">
          Emotional responses to your content across all audience segments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Radar Chart */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis
                dataKey="emotion"
                tick={{ fill: "#6B7280", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
              />
              <Radar
                name="Sentiment %"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                animationDuration={800}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Breakdown */}
        <div className="space-y-3">
          {sentiments.map((sentiment, idx) => (
            <motion.div
              key={sentiment.emotion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredEmotion(sentiment.emotion)}
              onMouseLeave={() => setHoveredEmotion(null)}
              className="group rounded-lg border border-gray-200 p-3 cursor-pointer transition-all hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{sentiment.icon}</span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {sentiment.emotion}
                  </span>
                </div>
                <span className="font-bold text-gray-900">{sentiment.percentage}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  layoutId={`sentiment-bar-${sentiment.emotion}`}
                  className="h-full rounded-full"
                  style={{ backgroundColor: sentiment.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${sentiment.percentage}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                />
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
        className="mt-6 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4"
      >
        <p className="text-sm text-gray-800 leading-relaxed">
          <span className="font-semibold text-emerald-900">AI Analysis: </span>
          Your audience shows predominantly positive sentiment with 34% excited reactions
          and 28% positive feedback. Educational content generates significantly more
          positive and motivational responses compared to entertainment-focused content.
          Negative sentiment remains minimal at only 1%, indicating strong audience satisfaction.
        </p>
      </motion.div>
    </motion.div>
  );
};
