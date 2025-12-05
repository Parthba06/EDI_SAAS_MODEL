import React from "react";
import { motion } from "framer-motion";

export type PricingCardProps = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({ name, price, period = "/month", features, badge, highlight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={
        "relative flex flex-col rounded-3xl border bg-white/10 p-[1px] shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl " +
        (highlight
          ? "border-transparent bg-gradient-to-b from-[#0E5EFF] via-[#38BDF8] to-transparent"
          : "border-white/10 bg-gradient-to-b from-white/20 via-white/5 to-white/0")
      }
    >
      <div
        className={
          "relative flex h-full flex-col rounded-[22px] bg-slate-950/70 p-6 sm:p-7 " +
          (highlight ? "ring-1 ring-white/10" : "")
        }
      >
        {badge && (
          <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-100">
            <span
              className={
                "h-1.5 w-1.5 rounded-full " +
                (highlight
                  ? "bg-[#0E5EFF] shadow-[0_0_14px_rgba(14,94,255,0.95)]"
                  : "bg-[#0E5EFF]")
              }
            />
            {badge}
          </div>
        )}

        <div className="mb-4 space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">{name}</h3>
          <div className="flex items-baseline gap-1 text-white">
            <span className="text-3xl font-semibold tracking-tight">{price}</span>
            <span className="text-xs text-slate-300">{period}</span>
          </div>
        </div>

        <ul className="mb-6 mt-2 space-y-2 text-sm text-slate-200">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#0E5EFF] shadow-[0_0_10px_rgba(14,94,255,0.8)]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={
            "mt-auto inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(14,94,255,0.6)] transition-colors " +
            (highlight
              ? "bg-gradient-to-r from-[#0E5EFF] via-[#2563EB] to-[#38BDF8] hover:from-[#1D4ED8] hover:via-[#1D4ED8] hover:to-[#3B82F6]"
              : "bg-slate-800/70 hover:bg-slate-700")
          }
          type="button"
        >
          Get started
        </motion.button>

        {highlight && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[26px] border border-[#0E5EFF]/40"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;
