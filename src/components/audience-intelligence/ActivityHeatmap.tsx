import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ActivityCell } from "./types";

interface Props {
  heatmapData: ActivityCell[];
}

export const ActivityHeatmap: React.FC<Props> = ({ heatmapData }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Reorganize data into grid format
  const grid = useMemo(() => {
    const organized: number[][] = [];
    days.forEach((_, dayIdx) => {
      organized[dayIdx] = [];
      hours.forEach((hour) => {
        const cell = heatmapData.find(
          (d) => d.day === days[dayIdx] && d.hour === hour
        );
        organized[dayIdx][hour] = cell?.intensity || 0;
      });
    });
    return organized;
  }, [heatmapData]);

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-gray-100";
      case 1:
        return "bg-blue-100";
      case 2:
        return "bg-blue-300";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-blue-700";
      default:
        return "bg-gray-100";
    }
  };

  // Find peak hours
  const peakHours = hours.filter(
    (hour) =>
      grid.some(
        (dayRow) =>
          dayRow[hour] >= 3 &&
          (hour >= 19 && hour <= 22)
      )
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.02, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Active Days & Time Heatmap
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          When your audience is most active and engaged.
        </p>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto mb-6">
        <div className="inline-block min-w-full">
          {/* Header with hours */}
          <div className="mb-2 flex gap-1">
            <div className="w-12" />
            {hours.map((hour) => (
              <div key={`header-${hour}`} className="w-8 text-center">
                <span className="text-xs text-gray-500 font-medium">
                  {hour === 0 ? "12am" : hour < 12 ? `${hour}a` : hour === 12 ? "12p" : `${hour - 12}p`}
                </span>
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          {grid.map((row, dayIdx) => (
            <div key={`day-${dayIdx}`} className="flex gap-1 mb-1">
              <div className="w-12 flex items-center">
                <span className="text-xs font-semibold text-gray-600">
                  {days[dayIdx]}
                </span>
              </div>
              {row.map((intensity, hourIdx) => (
                <motion.div
                  key={`cell-${dayIdx}-${hourIdx}`}
                  custom={dayIdx * 24 + hourIdx}
                  variants={cellVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.2 }}
                  title={`${days[dayIdx]} ${hourIdx}:00 - Intensity: ${intensity}/4`}
                  className={`w-8 h-8 rounded transition-all cursor-pointer hover:shadow-lg ${getIntensityColor(
                    intensity
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Insights */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Legend */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Intensity Scale
          </h3>
          <div className="space-y-2">
            {[
              { level: 0, label: "No activity" },
              { level: 1, label: "Low" },
              { level: 2, label: "Medium" },
              { level: 3, label: "High" },
              { level: 4, label: "Peak" },
            ].map((item) => (
              <div key={item.level} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded ${getIntensityColor(item.level)}`}
                />
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            AI Insights
          </h3>
          <div className="space-y-2 text-xs text-gray-700">
            <p>
              <span className="font-semibold">Peak Activity:</span> Friday-Sunday,
              7 PM–10 PM
            </p>
            <p>
              <span className="font-semibold">Best Posting Time:</span> Friday 8
              PM or Sunday 9 PM
            </p>
            <p>
              <span className="font-semibold">Lowest Activity:</span> Weekday
              mornings (6 AM–9 AM)
            </p>
            <p>
              <span className="font-semibold">Weekday vs Weekend:</span> Weekend
              engagement is 2.3x higher
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
