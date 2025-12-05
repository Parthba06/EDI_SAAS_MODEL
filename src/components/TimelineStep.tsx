import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type TimelineStepProps = {
  day: string;
  title: string;
  desc: string;
  image: string;
};

const TimelineStep: React.FC<TimelineStepProps> = ({ day, title, desc, image }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <div ref={ref} className="relative flex w-full gap-8 md:gap-12">
      {/* Left: dot and line anchor */}
      <div className="relative flex flex-col items-center pt-2">
        {/* Connector line (behind dot) */}
        <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#0E5EFF] via-[#89C3FF] to-[#0E5EFF]/20" />

        {/* Dot */}
        <motion.div
          initial={{ scale: 0.7, backgroundColor: "#E5EDFF", boxShadow: "0 0 0 0 rgba(14,94,255,0)" }}
          animate={{
            scale: inView ? 1 : 0.7,
            backgroundColor: inView ? "#0E5EFF" : "#E5EDFF",
            boxShadow: inView
              ? "0 0 0 4px rgba(222,235,255,1), 0 10px 25px rgba(14,94,255,0.55)"
              : "0 0 0 0 rgba(14,94,255,0)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 h-3.5 w-3.5 -translate-x-[0.5px] rounded-full border border-[#BFDBFE]"
        />
      </div>

      {/* Right: content + image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid flex-1 items-center gap-8 rounded-3xl border border-slate-100 bg-white/90 px-5 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] md:px-7 md:py-8"
      >
        {/* Text */}
        <div className="space-y-2 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E5EFF]">
            {day}
          </p>
          <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-slate-900">
            {title}
          </h3>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-slate-600">{desc}</p>
        </div>

        {/* Image / visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="relative flex items-center justify-center"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-3 rounded-[26px] bg-gradient-to-br from-[#0E5EFF0D] via-[#89C3FF1F] to-white blur-2xl" />
          </div>
          <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.26)]">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelineStep;
