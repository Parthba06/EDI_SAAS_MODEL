import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { JourneyStage } from "./types";

interface Props {
  stages: JourneyStage[];
}

export const AudienceJourneyFlow: React.FC<Props> = ({ stages }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const stageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0.2 },
    },
    animate: {
      x: [0, 5, 0],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  // Calculate percentage for each stage
  const startValue = stages[0]?.visitors || 100;

  const maxDropoff = Math.max(...stages.map((s) => s.dropOff));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900">Audience Journey Flow</h2>
        <p className="mt-1 text-sm text-gray-600">
          How audiences progress from initial discovery to active engagement.
        </p>
      </div>

      {/* Journey Flow */}
      <div className="mb-8 overflow-x-auto pb-4">
        <div className="flex gap-2 min-w-max lg:min-w-full lg:justify-between">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.stage}
              variants={stageVariants}
              className="flex flex-col items-center gap-3 flex-1 min-w-[140px]"
            >
              {/* Stage Box */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                className="w-full rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 text-center cursor-pointer transition-all"
              >
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                  {stage.stage}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {stage.visitors.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">visitors</p>
                  </div>

                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
                      style={{
                        width: `${(stage.visitors / startValue) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-sm font-bold text-gray-900">
                      {stage.conversions.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">conversions</p>
                  </div>
                </div>
              </motion.div>

              {/* Conversion Rate */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-300 px-3 py-1"
              >
                <span className="text-xs font-bold text-emerald-700">
                  {stage.rate}% convert
                </span>
              </motion.div>

              {/* Drop-off */}
              {stage.dropOff > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="rounded-full bg-red-100 border border-red-300 px-3 py-1"
                >
                  <span className="text-xs font-bold text-red-700">
                    {stage.dropOff}% drop-off
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Entry Points",
            value: stages[0]?.visitors.toLocaleString(),
            color: "from-blue-50 to-cyan-50",
            borderColor: "border-blue-200",
          },
          {
            label: "Total Conversions",
            value: stages[stages.length - 1]?.conversions.toLocaleString(),
            color: "from-emerald-50 to-teal-50",
            borderColor: "border-emerald-200",
          },
          {
            label: "Overall Conversion",
            value: `${(
              ((stages[stages.length - 1]?.conversions || 0) / (stages[0]?.visitors || 1)) *
              100
            ).toFixed(1)}%`,
            color: "from-purple-50 to-pink-50",
            borderColor: "border-purple-200",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            className={`rounded-lg border p-4 bg-gradient-to-br ${stat.color} ${stat.borderColor}`}
          >
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Analytics Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-6 overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Stage</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Visitors</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
                Conversions
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
                Conv. Rate
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Drop-off</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage, idx) => (
              <motion.tr
                key={stage.stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.08 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-900">{stage.stage}</td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {stage.visitors.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {stage.conversions.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="inline-block px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs">
                    {stage.rate}%
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400"
                        style={{ width: `${(stage.dropOff / maxDropoff) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-700 w-8 text-right">
                      {stage.dropOff}%
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-4"
      >
        <h3 className="font-semibold text-gray-900 text-sm mb-2">AI Analysis</h3>
        <p className="text-sm text-gray-800 leading-relaxed mb-3">
          Your audience shows a strong conversion path with a 2.5% overall conversion
          rate from initial content view to share. The highest drop-off occurs at the
          profile visit stage (61%), suggesting your profile content needs optimization.
        </p>
        <div className="space-y-2 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Recommendation 1:</span> Enhance your profile
            bio and pinned content to convert more profile visitors into followers.
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Recommendation 2:</span> The comment-to-share
            ratio (50%) is strong. Focus on encouraging comments as they drive shares.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
