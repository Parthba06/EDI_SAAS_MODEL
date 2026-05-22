import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  persona: {
    archetype: string;
    ageRange: string;
    description: string;
    interests: string[];
    preferredContentFormat: string;
    activeTime: string;
    attentionSpan: string;
    likelyConversionBehavior: string;
    personalityTraits: string[];
    motivations: string[];
  };
}

export const PersonaCard: React.FC<Props> = ({ persona }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const scanLineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 0.5,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    scan: {
      opacity: [0.5, 0, 0.5],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(110, 231, 183, 0.3)",
        "0 0 40px rgba(110, 231, 183, 0.5)",
        "0 0 20px rgba(110, 231, 183, 0.3)",
      ],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Background glow effect */}
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-xl -z-10"
      />

      <div className="relative rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        {/* Holographic scan lines */}
        <motion.div
          variants={scanLineVariants}
          initial="hidden"
          animate="scan"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-200/30 to-transparent pointer-events-none"
          style={{ origin: "top" }}
        />

        <div className="relative p-8 z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                  AI Generated Persona
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {persona.archetype}
              </h2>
              <p className="mt-1 text-sm text-gray-600">Age: {persona.ageRange}</p>
            </div>
          </div>

          {/* Main description */}
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <p className="text-sm text-gray-800 leading-relaxed">
              {persona.description}
            </p>
          </div>

          {/* Grid of attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Interests */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Top Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {persona.interests.map((interest) => (
                  <motion.span
                    key={interest}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Personality Traits */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Personality
              </h3>
              <div className="flex flex-wrap gap-2">
                {persona.personalityTraits.map((trait) => (
                  <motion.span
                    key={trait}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Behavioral attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Content Format
              </p>
              <p className="text-sm font-medium text-gray-900">
                {persona.preferredContentFormat}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Most Active
              </p>
              <p className="text-sm font-medium text-gray-900">
                {persona.activeTime}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Attention Span
              </p>
              <p className="text-sm font-medium text-gray-900">
                {persona.attentionSpan}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Conversion Behavior
              </p>
              <p className="text-sm font-medium text-gray-900">
                {persona.likelyConversionBehavior}
              </p>
            </div>
          </div>

          {/* Motivations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What Drives Them
            </h3>
            <div className="space-y-2">
              {persona.motivations.map((motivation, idx) => (
                <motion.div
                  key={motivation}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {motivation}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
