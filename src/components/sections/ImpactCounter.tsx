import { fetchImpactStats } from "@/lib/content";
import type { ImpactStat } from "@/types/api";
import ImpactCounterGrid from "./ImpactCounterGrid";

/* ─── Fallback data shown when backend is unreachable ─────────────────────── */
const FALLBACK: ImpactStat[] = [
  {
    id: 1,
    value: "5,000+",
    label: "Total Lives Touched",
    icon: "FiHeart",
    display_order: 1,
  },
  {
    id: 2,
    value: "₹50L+",
    label: "Total Funds Raised",
    icon: "FiAward",
    display_order: 2,
  },
  {
    id: 3,
    value: "250+",
    label: "Dedicated Volunteers",
    icon: "FiUsers",
    display_order: 3,
  },
  {
    id: 4,
    value: "8+",
    label: "Years of Service",
    icon: "FiSmile",
    display_order: 4,
  },
];

export default async function ImpactCounter() {
  /* Fetch impact stats; fall back to static data if the backend is down */
  // The dashboard's "Impact numbers"; the fallback only shows if the API can't be reached.
  const fetched = await fetchImpactStats();
  const stats: ImpactStat[] = fetched.length ? fetched : FALLBACK;

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
