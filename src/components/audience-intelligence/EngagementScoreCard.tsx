import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { QualityMetric } from "./types";

interface Props {
  metrics: QualityMetric[];
}

export const EngagementScoreCard: React.FC<Props> = ({ metrics }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scoreCircleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.15, duration: 0.6 },
    }),
  };

  const scoreRingVariants = {
    hidden: { pathLength: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      transition: { delay: custom * 0.15 + 0.2, duration: 1, ease: "easeInOut" },
    }),
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "from-emerald-400 to-teal-500";
    if (score >= 70) return "from-blue-400 to-cyan-500";
    if (score >= 50) return "from-amber-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Work";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900">Engagement Quality Scores</h2>
        <p className="mt-1 text-sm text-gray-600">
          Advanced metrics beyond simple likes and follows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            custom={idx}
            variants={scoreCircleVariants}
            initial="hidden"
            animate="visible"
            className="group relative"
          >
            {/* Background circle with glow */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 20px rgba(${
                    metric.score >= 85
                      ? "16, 185, 129"
                      : metric.score >= 70
                      ? "59, 130, 246"
                      : metric.score >= 50
                      ? "245, 158, 11"
                      : "239, 68, 68"
                  }, 0.3)`,
                  `0 0 40px rgba(${
                    metric.score >= 85
                      ? "16, 185, 129"
                      : metric.score >= 70
                      ? "59, 130, 246"
                      : metric.score >= 50
                      ? "245, 158, 11"
                      : "239, 68, 68"
                  }, 0.5)`,
                  `0 0 20px rgba(${
                    metric.score >= 85
                      ? "16, 185, 129"
                      : metric.score >= 70
                      ? "59, 130, 246"
                      : metric.score >= 50
                      ? "245, 158, 11"
                      : "239, 68, 68"
                  }, 0.3)`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -inset-2 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(to right, ${
                  metric.score >= 85
                    ? "rgb(16, 185, 129), rgb(20, 184, 166)"
                    : metric.score >= 70
                    ? "rgb(59, 130, 246), rgb(6, 182, 212)"
                    : metric.score >= 50
                    ? "rgb(245, 158, 11), rgb(249, 115, 22)"
                    : "rgb(239, 68, 68), rgb(236, 72, 153)"
                })`,
              }}
            />

            {/* Score Ring */}
            <div className="relative w-full aspect-square rounded-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border-4 border-gray-200">
              {/* SVG Ring */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                />
                <motion.circle
                  custom={idx}
                  variants={scoreRingVariants}
                  initial="hidden"
                  animate="visible"
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke={`url(#scoreGradient-${idx})`}
                  strokeDasharray={`${(metric.score / 100) * 283} 283`}
                />
                <defs>
                  <linearGradient
                    id={`scoreGradient-${idx}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={
                        metric.score >= 85
                          ? "#10B981"
                          : metric.score >= 70
                          ? "#3B82F6"
                          : metric.score >= 50
                          ? "#F59E0B"
                          : "#EF4444"
                      }
                    />
                    <stop
                      offset="100%"
                      stopColor={
                        metric.score >= 85
                          ? "#14B8A6"
                          : metric.score >= 70
                          ? "#06B6D4"
                          : metric.score >= 50
                          ? "#F97316"
                          : "#EC4899"
                      }
                    />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Content */}
              <div className="flex flex-col items-center gap-1 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.15 + 0.4, duration: 0.5 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {metric.score}
                </motion.div>
                <div className="text-xs font-semibold text-gray-600">/100</div>
                {metric.trend > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 + 0.6 }}
                    className="flex items-center gap-1 text-emerald-600 mt-1"
                  >
                    <TrendingUp size={12} />
                    <span className="text-xs font-semibold">+{metric.trend}%</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Label and Description */}
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-gray-900 text-sm">{metric.label}</h3>
              <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    metric.score >= 85
                      ? "bg-emerald-100 text-emerald-700"
                      : metric.score >= 70
                      ? "bg-blue-100 text-blue-700"
                      : metric.score >= 50
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {getScoreLabel(metric.score)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Analysis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4"
      >
        <h3 className="font-semibold text-gray-900 text-sm mb-2">Overall Assessment</h3>
        <p className="text-sm text-gray-800 leading-relaxed">
          Your average engagement quality score of 87/100 indicates strong audience
          connection and meaningful interactions. Focus on maintaining your Trust Score
          by consistently delivering valuable content and responding to community feedback.
          Community Strength at 91/100 shows excellent audience loyalty and organic
          advocacy.
        </p>
      </motion.div>
    </motion.div>
  );
};
