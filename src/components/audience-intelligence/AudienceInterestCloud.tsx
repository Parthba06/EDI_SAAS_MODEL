import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Interest } from "./types";

interface Props {
  interests: Interest[];
}

export const AudienceInterestCloud: React.FC<Props> = ({ interests }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "high":
        return "bg-emerald-50 border-emerald-200";
      case "medium":
        return "bg-blue-50 border-blue-200";
      case "low":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getEngagementBadgeColor = (engagement: string) => {
    switch (engagement) {
      case "high":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-blue-100 text-blue-700";
      case "low":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-3"
    >
      {interests.map((interest, idx) => (
        <motion.div
          key={`${interest.name}-${idx}`}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`group relative cursor-pointer rounded-full border px-4 py-2.5 transition-all ${getEngagementColor(
            interest.engagement
          )}`}
        >
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {interest.name}
              </p>
              <p className="text-xs text-gray-600">{interest.description}</p>
            </div>
            <div className="flex items-center gap-1.5 ml-1">
              <span className="font-bold text-gray-900">{interest.percentage}%</span>
              {interest.trend > 0 ? (
                <div className="flex items-center gap-0.5 text-emerald-600">
                  <TrendingUp size={14} />
                  <span className="text-xs font-semibold">{interest.trend}</span>
                </div>
              ) : (
                <div className="flex items-center gap-0.5 text-red-600">
                  <TrendingDown size={14} />
                  <span className="text-xs font-semibold">{Math.abs(interest.trend)}</span>
                </div>
              )}
            </div>
          </div>
          <span
            className={`absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs font-medium ${getEngagementBadgeColor(
              interest.engagement
            )} opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            {interest.engagement} engagement
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
