'use client';

import { motion } from "framer-motion";
import {
  FiSmile,
  FiBookOpen,
  FiHeart,
  FiAward,
  FiUsers,
  FiActivity,
  FiHome,
  FiStar,
} from "react-icons/fi";
import type { ImpactStat } from "@/types/api";

/* ─── Icon name → component map ─────────────────────────────────────────── */
type IconComponent = React.ComponentType<{ className?: string }>;

const ICON_MAP: Record<string, IconComponent> = {
  FiSmile,
  FiBookOpen,
  FiHeart,
  FiAward,
  FiUsers,
  FiActivity,
  FiHome,
  FiStar,
};

export default function ImpactCounterGrid({ stats }: { stats: ImpactStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {stats.map((stat, i) => {
        const Icon: IconComponent = ICON_MAP[stat.icon] ?? FiHeart;
        return (
          <motion.div
            key={stat.id ?? stat.label}
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
            {stat.subtext && (
              <p className="text-xs text-white/60 font-medium max-w-[180px]">
                {stat.subtext}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
