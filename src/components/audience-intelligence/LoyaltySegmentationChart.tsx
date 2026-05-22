import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { LoyaltySegment } from "./types";

interface Props {
  segments: LoyaltySegment[];
}

export const LoyaltySegmentationChart: React.FC<Props> = ({ segments }) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const chartData = segments.map((seg) => ({
    name: seg.name,
    value: seg.percentage,
    color: seg.color,
  }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Loyalty Segmentation</h2>
        <p className="mt-1 text-sm text-gray-600">
          Understanding your audience composition and engagement levels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, idx) =>
                  setHoveredSegment(segments[idx]?.name || null)
                }
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {chartData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={entry.color}
                    opacity={
                      hoveredSegment === null || hoveredSegment === entry.name
                        ? 1
                        : 0.4
                    }
                    style={{ transition: "opacity 0.2s ease-in-out" }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: 12,
                }}
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Segments Details */}
        <div className="space-y-3">
          {segments.map((segment, idx) => (
            <motion.div
              key={segment.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredSegment(segment.name)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="group rounded-lg border border-gray-200 bg-gray-50 p-4 cursor-pointer transition-all hover:border-gray-300 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <h3 className="font-semibold text-gray-900">{segment.name}</h3>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {segment.percentage}%
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-3">{segment.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-500">Engagement Quality</p>
                  <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                      style={{ width: `${segment.engagementQuality}%` }}
                    />
                  </div>
                  <p className="mt-1 font-semibold text-gray-700">
                    {segment.engagementQuality}/100
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Retention Level</p>
                  <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                      style={{ width: `${segment.retentionLevel}%` }}
                    />
                  </div>
                  <p className="mt-1 font-semibold text-gray-700">
                    {segment.retentionLevel}%
                  </p>
                </div>
              </div>

              <p className="mt-2 text-xs font-medium text-gray-600">
                Frequency: {segment.interactionFrequency}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4"
      >
        <p className="text-sm text-gray-800">
          <span className="font-semibold text-blue-900">Key Insight: </span>
          Loyal viewers generate 64% of total engagement despite being only 22% of
          your audience. Focus on retention strategies for your Returning Viewers
          segment to increase overall engagement.
        </p>
      </motion.div>
    </motion.div>
  );
};
