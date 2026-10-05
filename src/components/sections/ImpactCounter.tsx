'use client';

import { motion } from "framer-motion";
import { FiUsers, FiHeart, FiSmile, FiAward } from "react-icons/fi";

const stats = [
  {
    number: "5,000+",
    label: "Total Lives Touched",
    subtext: "Across education & healthcare",
    icon: FiHeart,
  },
  {
    number: "₹50L+",
    label: "Total Funds Raised",
    subtext: "Directly deployed for causes",
    icon: FiAward,
  },
  {
    number: "250+",
    label: "Dedicated Volunteers",
    subtext: "Selfless hearts on the ground",
    icon: FiUsers,
  },
  {
    number: "8+",
    label: "Years of Service",
    subtext: "Serving communities since 2016",
    icon: FiSmile,
  },
];

export default function ImpactCounter() {
  return (
    <section className="py-16 bg-brand-navy relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,113,0,0.18)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.06)_0%,_transparent_55%)] pointer-events-none" />
      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1 group-hover:text-brand-orange transition-colors">
                  {stat.number}
                </h3>
                <p className="text-sm font-bold text-brand-orange mb-0.5">
                  {stat.label}
                </p>
                <p className="text-xs text-white/60 font-medium max-w-[180px]">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
