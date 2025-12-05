import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black text-gray-300 border-t border-white/10">
      {/* Top CTA band */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#020617] via-[#020617] to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-start">
          {/* Left: copy + trust badges */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                FlowFund for serious creators
              </p>
              <h2 className="text-[clamp(2.2rem,3.2vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                Your next hire is<br />
                <span className="text-[#0E5EFF]">agentic analytics.</span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Built for creators who treat content like a business. FlowFund handles the data,
                alerts, and AI insights so your team can stay focused on output.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-xs text-slate-400">
              <div className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[0.75rem]">
                  +
                </div>
                <p className="font-medium text-slate-200">GDPR</p>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">Compliant</p>
              </div>
              <div className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[0.75rem]">
                  SOC2
                </div>
                <p className="font-medium text-slate-200">SOC 2</p>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">Compliant</p>
              </div>
              <div className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[0.75rem]">
                  
                </div>
                <p className="font-medium text-slate-200">Access</p>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">Controls</p>
              </div>
              <div className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[0.75rem]">
                  A
                </div>
                <p className="font-medium text-slate-200">Bring your own</p>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">LLM</p>
              </div>
            </div>
          </div>

          {/* Right: stacked CTA cards */}
          <div className="space-y-4 max-w-xl lg:ml-auto w-full">
            {/* Dark CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-[#020617] border border-slate-800/80 px-5 py-4 md:px-6 md:py-5 shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,94,255,0.3)_0,transparent_55%)]" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 ring-2 ring-[#0E5EFF] ring-offset-2 ring-offset-slate-950">
                    <span className="h-2 w-2 rounded-full bg-[#0E5EFF] shadow-[0_0_12px_rgba(14,94,255,0.9)]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      See FlowFund AI in action
                    </p>
                    <p className="text-[0.75rem] text-slate-400">
                      Book a live walkthrough with our team.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-slate-700/70 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-200 hover:border-slate-400 hover:text-white transition-colors"
                >
                  Book demo
                </button>
              </div>
            </div>

            {/* Light CTA */}
            <button
              type="button"
              className="group flex w-full items-center justify-between rounded-2xl border border-slate-700/70 bg-white text-slate-900 px-5 py-4 md:px-6 md:py-5 shadow-[0_14px_30px_rgba(15,23,42,0.45)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900">Request early access</p>
                  <p className="text-[0.75rem] text-slate-500">
                    Start monitoring growth-critical metrics in days, not months.
                  </p>
                </div>
              </div>
              <span className="text-slate-500 group-hover:text-slate-900 transition-colors">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom footer bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-4 border-t border-white/5 md:flex-row md:items-center md:justify-between">
        <div className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
          2025 FlowFund Analytics. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-4 text-[0.7rem] font-medium text-slate-400">
          <a href="#" className="hover:text-slate-100 transition-colors">
            Terms of Use
          </a>
          <a href="#" className="hover:text-slate-100 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-100 transition-colors">
            Support
          </a>
          <a href="#" className="hover:text-slate-100 transition-colors">
            Trust Center
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;