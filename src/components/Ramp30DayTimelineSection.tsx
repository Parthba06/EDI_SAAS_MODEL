import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import rampImg1 from "@/assets/img 1.avif";
import rampImg2 from "@/assets/img 2.avif";
import rampImg3 from "@/assets/img 3.avif";
import rampImg4 from "@/assets/img 4.avif";

type Step = {
  id: string;
  day: string;
  title: string;
  desc: string;
  image: string;
};

const steps: Step[] = [
  {
    id: "day1-7",
    day: "1 — 7.",
    title: "Connect and baseline",
    desc: "Hook up your spend sources and set guardrails. Ramp learns your patterns and flags the first easy wins.",
    image: rampImg1,
  },
  {
    id: "day8-14",
    day: "8 — 14.",
    title: "Policies go live",
    desc: "Smart limits, auto-approvals, and vendor controls switch on without slowing teams down.",
    image: rampImg2,
  },
  {
    id: "day15-21",
    day: "15 — 21.",
    title: "Savings surface daily",
    desc: "Ramp surfaces duplicate tools, unused seats, and edge-case spend you can shut off in clicks.",
    image: rampImg3,
  },
  {
    id: "day22-30",
    day: "22 — 30.",
    title: "Close faster, spend smarter",
    desc: "Month-end runs on rails. FP&A sees real-time data and finance stops chasing receipts.",
    image: rampImg4,
  },
];

const Ramp30DayTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-black border-t border-black/10 py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            RAMP ROLLOUT
          </p>
          <h2 className="text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-900">
            Here&apos;s what you can get done with
            <br className="hidden sm:block" />
            <span className="text-[#0E5EFF]"> Ramp in just 30 days.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative space-y-10 md:space-y-12">
          {/* Vertical line background */}
          <div className="pointer-events-none absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-[#0E5EFF22] via-[#89C3FF22] to-transparent md:left-[32px]" />

          {/* Foreground progress line that grows/shrinks with scroll */}
          <motion.div
            className="pointer-events-none absolute left-[18px] top-0 origin-top h-full w-px bg-gradient-to-b from-[#0E5EFF] via-[#89C3FF] to-[#0E5EFF] md:left-[32px]"
            style={{ scaleY: lineScale }}
          />

          {steps.map((step) => {
            const stepRef = useRef<HTMLDivElement | null>(null);
            const { scrollYProgress: stepProgress } = useScroll({
              target: stepRef,
              offset: ["start 70%", "end 30%"],
            });

            const cardOpacity = useTransform(stepProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
            const cardY = useTransform(stepProgress, [0, 0.25, 0.75, 1], [30, 0, 0, 30]);
            const dotScale = useTransform(stepProgress, [0, 0.25, 0.75, 1], [0.7, 1, 1, 0.7]);
            const dotBg = useTransform(stepProgress, [0, 0.25, 0.75, 1], ["#E5EDFF", "#0E5EFF", "#0E5EFF", "#E5EDFF"]);
            const dotShadow = useTransform(
              stepProgress,
              [0, 0.25, 0.75, 1],
              [
                "0 0 0 0 rgba(14,94,255,0)",
                "0 0 0 4px rgba(222,235,255,1), 0 10px 25px rgba(14,94,255,0.55)",
                "0 0 0 4px rgba(222,235,255,1), 0 10px 25px rgba(14,94,255,0.55)",
                "0 0 0 0 rgba(14,94,255,0)",
              ]
            );
            const imageOpacity = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
            const imageScale = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.96]);
            const imageY = useTransform(stepProgress, [0, 0.3, 0.7, 1], [20, 0, 0, 20]);

            return (
              <div key={step.id} ref={stepRef} className="relative flex w-full gap-8 md:gap-12">
                {/* Dot on line */}
                <div className="relative flex flex-col items-center pt-2">
                  <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-transparent" />
                  <motion.div
                    style={{
                      scale: dotScale,
                      backgroundColor: dotBg,
                      boxShadow: dotShadow,
                    }}
                    className="relative z-10 h-3.5 w-3.5 -translate-x-[0.5px] rounded-full border border-[#BFDBFE]"
                  />
                </div>

                {/* Card */}
                <motion.div
                  style={{ opacity: cardOpacity, y: cardY }}
                  className="grid flex-1 items-center gap-8 rounded-3xl border border-slate-100 bg-white/90 px-5 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] md:px-7 md:py-8"
                >
                  {/* Text */}
                  <div className="space-y-2 text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E5EFF]">
                      {step.day}
                    </p>
                    <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-slate-900">
                      {step.title}
                    </h3>
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>

                  {/* Image / visual */}
                  <motion.div
                    style={{ opacity: imageOpacity, scale: imageScale, y: imageY }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ramp30DayTimelineSection;
