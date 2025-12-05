import React from "react";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";

const PricingSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95 border-t border-white/10 py-32">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,94,255,0.3)_0,_transparent_55%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            PRICING
          </p>
          <h2 className="mb-2 text-[clamp(2.1rem,3.2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
            Simple, Transparent Pricing.
          </h2>
          <p className="mb-6 text-[clamp(1.4rem,2.4vw,1.8rem)] font-medium tracking-[-0.02em] text-slate-200">
            Choose the plan that fits your growth.
          </p>
          <p className="text-sm text-slate-400">
            Start free and upgrade when you&apos;re ready — no hidden fees.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative grid gap-6 sm:gap-7 md:grid-cols-3"
        >
          {/* subtle glow behind cards */}
          <div className="pointer-events-none absolute inset-x-10 -top-6 bottom-0 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9)_0,_transparent_70%)]" />

          <PricingCard
            name="Starter"
            price="₹500"
            features={[
              "4 Features",
              "1 Social Account Limit",
              "AI Hashtag Engine",
              "Growth Summary",
              "Basic Analytics",
              "30 Days Free Trial",
            ]}
            badge="30 Days Free Trial"
          />

          <PricingCard
            name="Pro"
            price="₹1200"
            features={[
              "All Features",
              "3 Account Limit",
              "AI Insights",
              "Trend Analytics",
              "Competitor Analysis",
              "Audience Deep Dive",
            ]}
            badge="Most Popular"
            highlight
          />

          <PricingCard
            name="Unlimited"
            price="₹2500"
            features={[
              "All Features",
              "Unlimited Accounts",
              "Creator Team Support",
              "Priority AI Processing",
              "Future Features Included",
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
