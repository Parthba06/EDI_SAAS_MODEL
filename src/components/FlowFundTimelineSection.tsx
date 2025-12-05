import React, { useEffect, useRef, useState } from "react";

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  iconLabel: string;
};

const steps: Step[] = [
  {
    id: "day1-2",
    label: "Day 1 — 2",
    title: "Pick one platform",
    body:
      "You connect your Instagram or YouTube account. Our system pulls your real analytics instantly.",
    iconLabel: "SM",
  },
  {
    id: "day3",
    label: "Day 3",
    title: "Your dashboard goes live",
    body:
      "Your analytics graphs, engagement trends, content breakdown, and audience metrics start populating automatically.",
    iconLabel: "DB",
  },
  {
    id: "day4-10",
    label: "Day 4 — 10",
    title: "Daily improvements",
    body:
      "AI analyzes your content and gives daily recommendations: best time to post, optimized hashtags, and personalized insights.",
    iconLabel: "AI",
  },
  {
    id: "day11",
    label: "Day 11",
    title: "Go-live + optimization",
    body:
      "Your strategy stabilizes. Charts update in real-time as your content performs better.",
    iconLabel: "GO",
  },
];

const FlowFundTimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step-id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-step-id");
          if (!id) return;
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-20 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            ONBOARDING
          </p>
          <h2 className="mb-3 text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-900">
            What your first week looks like with FlowFund Analytics
          </h2>
          <p className="max-w-xl text-[0.98rem] leading-relaxed text-slate-600">
            Creators go from confusion to clarity in days — not months.
          </p>
        </div>

        {/* Timeline */}
        <div
          ref={containerRef}
          className="relative grid gap-10 md:grid-cols-[minmax(0,0.8fr),minmax(0,1.2fr)]"
        >
          {/* Left: gradient line + dots */}
          <div className="relative hidden md:block">
            <div className="absolute left-6 top-0 h-full w-[2px] rounded-full bg-gradient-to-b from-[#0E5EFF] via-[#89C3FF] to-[#0E5EFF]/40" />
            <div className="relative flex h-full flex-col justify-between py-4">
              {steps.map((step, index) => {
                const active = visibleSteps[step.id];
                return (
                  <div
                    key={step.id}
                    className="relative flex h-16 items-center"
                    aria-hidden="true"
                  >
                    <div
                      className={
                        "absolute left-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[#BFDBFE] bg-white shadow-[0_0_0_4px_rgba(239,246,255,1)] transition-all duration-500 " +
                        (active
                          ? "bg-[#0E5EFF] shadow-[0_0_0_4px_rgba(222,235,255,1),0_10px_25px_rgba(14,94,255,0.5)]"
                          : "")
                      }
                      style={{ transitionDelay: `${index * 80}ms` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: steps (left text + right floating images) */}
          <div className="space-y-10">
            {steps.map((step, index) => {
              const isVisible = visibleSteps[step.id];
              const baseDelay = index * 80;

              return (
                <div
                  key={step.id}
                  data-step-id={step.id}
                  className={
                    "relative grid gap-6 rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-500 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] " +
                    (isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")
                  }
                  style={{ transitionDelay: isVisible ? `${baseDelay}ms` : "0ms" }}
                >
                  {/* Text side */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0E5EFF]">
                      <span>{step.label}</span>
                      <span className="h-[1px] w-8 bg-gradient-to-r from-[#0E5EFF] to-[#89C3FF]" />
                    </div>
                    <h3 className="mb-2 text-[1.05rem] font-semibold tracking-[-0.02em] text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-[0.92rem] leading-relaxed text-slate-600">{step.body}</p>
                  </div>

                  {/* Right: abstract blue “image” per step */}
                  <div className="relative flex items-center justify-center">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#0E5EFF0D] via-[#89C3FF1A] to-[#0E5EFF08] blur-2xl" />
                    </div>

                    {index === 0 && (
                      <div className="relative flex h-40 w-full max-w-xs items-center justify-center rounded-3xl bg-white/90 shadow-[0_22px_50px_rgba(15,23,42,0.18)]">
                        <div className="absolute -left-4 -top-4 h-10 w-10 rounded-full bg-[#0E5EFF1A] blur-lg" />
                        <div className="absolute -right-4 bottom-0 h-12 w-12 rounded-3xl bg-[#89C3FF1F] blur-xl" />
                        <div className="flex gap-3">
                          <div className="flex flex-col gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0E5EFF] to-[#003B95] text-xs font-semibold text-white shadow-[0_12px_30px_rgba(14,94,255,0.6)]">
                              IG
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E5F0FF] to-white text-xs font-semibold text-[#0F172A] shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
                              YT
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <div className="h-4 w-20 rounded-full bg-gradient-to-r from-[#0E5EFF] to-[#89C3FF] opacity-80" />
                            <div className="h-4 w-16 rounded-full bg-slate-100" />
                            <div className="h-4 w-14 rounded-full bg-slate-100" />
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="relative h-40 w-full max-w-xs rounded-3xl bg-gradient-to-br from-[#0E5EFF] via-[#2563EB] to-[#003B95] p-[1px] shadow-[0_24px_55px_rgba(15,23,42,0.4)]">
                        <div className="flex h-full w-full flex-col justify-between rounded-[18px] bg-slate-950/90 p-4">
                          <div className="flex items-center justify-between text-[0.7rem] text-slate-200">
                            <span className="rounded-full bg-slate-900/60 px-2 py-0.5">
                              FlowFund Dashboard
                            </span>
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 space-y-2">
                              <div className="h-16 w-full rounded-lg bg-gradient-to-tr from-[#38BDF8] to-[#0EA5E9] opacity-90" />
                              <div className="flex gap-2">
                                <div className="h-8 flex-1 rounded-lg bg-slate-800" />
                                <div className="h-8 flex-1 rounded-lg bg-slate-800" />
                              </div>
                            </div>
                            <div className="flex w-10 flex-col justify-between">
                              <div className="h-4 rounded-full bg-slate-800" />
                              <div className="h-4 rounded-full bg-slate-800" />
                              <div className="h-4 rounded-full bg-slate-800" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="relative flex h-40 w-full max-w-xs items-center justify-center">
                        <div className="absolute -top-3 -left-4 h-12 w-12 rounded-3xl bg-[#0E5EFF1A] blur-xl" />
                        <div className="absolute bottom-0 right-0 h-14 w-14 rounded-3xl bg-[#89C3FF1F] blur-xl" />
                        <div className="relative flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-white px-4 py-2 text-[0.8rem] font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                              AI Insights
                            </div>
                          </div>
                          <div className="flex translate-x-4 items-center gap-3">
                            <div className="rounded-2xl bg-gradient-to-r from-[#0E5EFF] to-[#38BDF8] px-4 py-2 text-[0.8rem] font-semibold text-white shadow-[0_18px_40px_rgba(14,94,255,0.6)]">
                              Hashtags
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="relative flex h-40 w-full max-w-xs items-center justify-center">
                        <div className="absolute inset-3 rounded-3xl bg-gradient-to-br from-[#E5F0FF] to-white blur-md" />
                        <div className="relative flex flex-col gap-2">
                          <div className="flex gap-2">
                            <div className="flex h-9 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E5EFF] to-[#003B95] text-center text-[0.75rem] font-semibold text-white shadow-[0_16px_35px_rgba(14,94,255,0.55)]">
                              IG
                            </div>
                            <div className="flex h-9 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] text-center text-[0.75rem] font-semibold text-white shadow-[0_16px_35px_rgba(14,116,179,0.5)]">
                              YT
                            </div>
                          </div>
                          <div className="mt-2 h-4 w-28 rounded-full bg-slate-100" />
                          <div className="h-4 w-20 rounded-full bg-slate-100" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowFundTimelineSection;
