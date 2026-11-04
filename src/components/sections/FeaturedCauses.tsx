import { apiFetch } from "@/lib/api";
import type { Paginated, Campaign } from "@/types/api";
import SectionLabel from "@/components/ui/SectionLabel";
import FeaturedCausesCarousel from "./FeaturedCausesCarousel";

/* ─── Fallback data shown when backend is unreachable ─────────────────────── */
const FALLBACK: Campaign[] = [
  {
    slug: "education",
    name: "Education for Every Child",
    tagline: "Help provide children with resources and opportunities.",
    description:
      "Help provide children with the resources and opportunities they need to continue their education and build their future.",
    cover_image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    raised_inr: 3800000,
    goal_inr: 5000000,
    progress_percent: 76,
    program_name: "Education",
    is_featured: true,
    status: "active",
  },
  {
    slug: "old-age",
    name: "Care for Elderly",
    tagline: "Provide essential care and comfort to elderly people.",
    description:
      "Help provide essential care, comfort, and support to elderly people who may be living without adequate assistance.",
    cover_image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80",
    raised_inr: 6400000,
    goal_inr: 8000000,
    progress_percent: 80,
    program_name: "Elderly Care",
    is_featured: true,
    status: "active",
  },
  {
    slug: "medical",
    name: "Healthcare for Those in Need",
    tagline: "Help individuals access essential healthcare assistance.",
    description:
      "Your support can help individuals and families facing medical needs access essential healthcare assistance.",
    cover_image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    raised_inr: 4200000,
    goal_inr: 5000000,
    progress_percent: 84,
    program_name: "Medical",
    is_featured: true,
    status: "active",
  },
  {
    slug: "orphanage",
    name: "Care & Support for Children",
    tagline: "Create safer environments where children can grow and learn.",
    description:
      "Help create safer, more supportive environments where children can grow, learn, and look forward to a brighter future.",
    cover_image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    raised_inr: 7800000,
    goal_inr: 9000000,
    progress_percent: 87,
    program_name: "Child Care",
    is_featured: true,
    status: "active",
  },
];

export default async function FeaturedCauses() {
  /* Fetch featured campaigns; fall back to static data if the backend is down */
  let campaigns: Campaign[] = FALLBACK;
  try {
    const data = await apiFetch<Paginated<Campaign>>(
      "/campaigns/?is_featured=true&status=active",
      {},
      120,
    );
    if (data?.results?.length) {
      campaigns = data.results;
    }
  } catch {
    /* Use fallback silently */
  }

  return (
    <section id="causes" className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel>Featured Causes</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-brand-black mt-1 mb-3">
              Where Your Support{" "}
              <span className="text-brand-orange">Makes a Difference</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Your generosity helps us support initiatives that address some of
              the most important needs in our communities.
            </p>
          </div>

          {/* Client component renders carousel controls + cards */}
        </div>

        <FeaturedCausesCarousel campaigns={campaigns} />
      </div>
    </section>
  );
}
