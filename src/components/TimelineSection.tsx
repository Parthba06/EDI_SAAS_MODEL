import React from "react";
import TimelineStep from "./TimelineStep";

const TimelineSection: React.FC = () => {
  const steps = [
    {
      day: "1 — 2.",
      title: "Pick one Platform",
      desc: "Connect Instagram or YouTube. We pull analytics instantly and set your baseline.",
      image: "/images/step1.png",
    },
    {
      day: "3.",
      title: "Your Dashboard Goes Live",
      desc: "All charts, engagement data, and audience metrics appear in real time.",
      image: "/images/step2.png",
    },
    {
      day: "4 — 10.",
      title: "Daily AI Improvements",
      desc: "AI gives optimized hashtags, best posting time, and content recommendations.",
      image: "/images/step3.png",
    },
    {
      day: "11.",
      title: "Go-live + Optimization",
      desc: "Your strategy stabilizes and insights adapt based on real performance.",
      image: "/images/step4.png",
    },
  ];

  return (
    <section className="relative w-full bg-white py-20 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="mb-3 text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-900">
            What your first week looks like with FlowFund
          </h2>
          <p className="max-w-xl text-[0.98rem] leading-relaxed text-slate-600">
            A calm, guided rollout from first connection to fully live analytics and AI support.
          </p>
        </div>

        {/* Timeline with line background */}
        <div className="relative space-y-10">
          {/* Vertical line background (mobile) */}
          <div className="pointer-events-none absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-[#0E5EFF] via-[#89C3FF] to-[#0E5EFF]/20 md:left-[32px]" />

          {steps.map((step) => (
            <TimelineStep
              key={step.title}
              day={step.day}
              title={step.title}
              desc={step.desc}
              image={step.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
