import React from "react";
import { motion } from "framer-motion";
import VideoPreview from "./VideoPreview";
import insightVideo from "@/assets/insight.mp4";

const InsightFeatureSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#EDF3FF] text-black border-t border-black/10 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FFFFFF] to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-8 md:flex-row md:items-center md:gap-14">
        {/* Left column */}
        <motion.div
          className="max-w-xl space-y-4 md:space-y-5"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            AI-Verified Insights
          </p>

          <h2 className="text-[clamp(2.0rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900">
            Automate your growth with confidence
          </h2>

          <p className="max-w-lg text-[0.98rem] leading-relaxed text-slate-600">
            Real-time analytics, automated insights, and AI-powered reporting replace manual guesswork.
            FlowFund delivers accurate, actionable results so creators can focus on creating — not analyzing.
          </p>

          <button
            type="button"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-900"
          >
            <span className="relative">
              <span className="absolute -bottom-0.5 left-0 h-px w-full rounded-full bg-slate-300 transition-all group-hover:h-[2px] group-hover:bg-slate-900" />
              <span className="relative">Explore Insights</span>
            </span>
            <span className="text-base transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </motion.div>

        {/* Right column: video */}
        <div className="flex flex-1 justify-center md:justify-end">
          <VideoPreview src={insightVideo} alt="FlowFund AI analytics preview" />
        </div>
      </div>
    </section>
  );
};

export default InsightFeatureSection;
