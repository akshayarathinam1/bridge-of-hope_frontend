import { apiFetch } from "@/lib/api";
import type { ImpactStat } from "@/types/api";
import ImpactCounterGrid from "./ImpactCounterGrid";

/* ─── Fallback data shown when backend is unreachable ─────────────────────── */
const FALLBACK: ImpactStat[] = [
  {
    id: 1,
    number: "5,000+",
    label: "Total Lives Touched",
    icon: "FiHeart",
    display_order: 1,
  },
  {
    id: 2,
    number: "₹50L+",
    label: "Total Funds Raised",
    icon: "FiAward",
    display_order: 2,
  },
  {
    id: 3,
    number: "250+",
    label: "Dedicated Volunteers",
    icon: "FiUsers",
    display_order: 3,
  },
  {
    id: 4,
    number: "8+",
    label: "Years of Service",
    icon: "FiSmile",
    display_order: 4,
  },
];

export default async function ImpactCounter() {
  /* Fetch impact stats; fall back to static data if the backend is down */
  let stats: ImpactStat[] = FALLBACK;
  try {
    const data = await apiFetch<ImpactStat[]>("/content/impact-stats/", {}, 300);
    if (Array.isArray(data) && data.length > 0) {
      stats = data;
    }
  } catch {
    /* Use fallback silently */
  }

  return (
    <section className="py-16 bg-brand-navy relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,113,0,0.18)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.06)_0%,_transparent_55%)] pointer-events-none" />
      <div className="container-site relative z-10">
        {/* Client component handles framer-motion + icon resolution */}
        <ImpactCounterGrid stats={stats} />
      </div>
    </section>
  );
}
