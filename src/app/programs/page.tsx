import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import CtaBanner from '@/components/sections/CtaBanner';
import { apiFetch } from '@/lib/api';
import { PROGRAM_REVALIDATE } from '@/lib/programs';
import type { ProgramListItem, ImpactStat } from '@/types/api';
import { FiArrowUpRight } from 'react-icons/fi';
import ProgramCards from './_components/ProgramCards';
import ProgramIcon from '@/components/ui/ProgramIcon';
import { SITE_IMAGES } from '@/lib/images';

/* Programs come from the dashboard; refresh about once a minute. */
export const revalidate = 60;

/* ─── Fallback programs ───────────────────────────────────────────────────── */
const FALLBACK_PROGRAMS: ProgramListItem[] = [
  {
    slug: 'education',
    name: 'Education',
    tagline: 'Supporting learning and creating opportunities for a brighter future.',
    cover_image: SITE_IMAGES.educationClassroom,
    icon: 'FiBookOpen',
    is_active: true,
    display_order: 1,
  },
  {
    slug: 'child-orphan-care',
    name: 'Child and Orphan Care',
    tagline: "Promoting children's well-being through care, support, and compassion.",
    cover_image: SITE_IMAGES.orphanageMeal,
    icon: 'FiHome',
    is_active: true,
    display_order: 2,
  },
  {
    slug: 'elderly-care',
    name: 'Elderly Care',
    tagline: 'Helping older adults live with dignity, comfort, and care.',
    cover_image: SITE_IMAGES.elderlyCare,
    icon: 'FiHeart',
    is_active: true,
    display_order: 3,
  },
  {
    slug: 'medical-support',
    name: 'Medical Support',
    tagline: 'Helping people access essential healthcare and medical assistance.',
    cover_image: SITE_IMAGES.medicalCheckup,
    icon: 'FiActivity',
    is_active: true,
    display_order: 4,
  },
  {
    slug: 'social-services',
    name: 'Social Service',
    tagline: 'Extending a helping hand to individuals and communities in need.',
    cover_image: SITE_IMAGES.socialOutreach,
    icon: 'FiUsers',
    is_active: true,
    display_order: 5,
  },
];

/* ─── Fallback impact stats ──────────────────────────────────────────────── */
const FALLBACK_IMPACT: ImpactStat[] = [
  { id: 1, value: '12,500+', label: 'Lives Supported', icon: 'FiSmile', display_order: 1 },
  { id: 2, value: '4,800+', label: 'Children Reached', icon: 'FiBookOpen', display_order: 2 },
  { id: 3, value: '3,200+', label: 'Families Assisted', icon: 'FiHeart', display_order: 3 },
  { id: 4, value: '150+', label: 'Community Drives', icon: 'FiAward', display_order: 4 },
];

export default async function ProgramsPage() {
  /* Fetch programs list */
  let programs: ProgramListItem[] = FALLBACK_PROGRAMS;
  try {
    const data = await apiFetch<ProgramListItem[]>('/content/programs/', {}, PROGRAM_REVALIDATE);
    if (Array.isArray(data) && data.length > 0) programs = data;
  } catch { /* use fallback */ }

  /* Impact figures are built in (not edited in the dashboard). */
  const impactStats = FALLBACK_IMPACT;

  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Our Programs"
        subtitle="Five core initiatives dedicated to empowering children, elders, families, and communities."
        breadcrumb="Programs"
      />

      {/* ── PROGRAMS SECTION ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-site">

          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
            <SectionLabel>Our Programs</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-black mt-3 mb-5 leading-tight">
              Care for People.{' '}
              <span className="text-brand-orange">Hope for Tomorrow.</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              We work to support people in need through meaningful initiatives that bring care, opportunity, and hope.
            </p>
          </div>

          {/* Client animated card grid */}
          <ProgramCards programs={programs} />

          {/* CTA */}
          <div className="flex justify-center mt-12">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-red text-white font-bold text-sm shadow-lg hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Support a Program</span>
              <FiArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── IMPACT STRIP ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#222A59] text-white relative overflow-hidden" suppressHydrationWarning>
        <div className="absolute inset-0 z-0 pointer-events-none" suppressHydrationWarning>
          <Image
            src={SITE_IMAGES.childrenSmiling}
            alt="Bridge of Hope community impact"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222A59]/95 via-[#2e3870]/75 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#222A59]/80 via-transparent to-white/10" />
        </div>

        <div className="container-site relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel light>Our Collective Reach</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-2 mb-4">
              Impact That <span className="text-brand-orange">Matters</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Every initiative connects directly with real lives, real families, and real futures.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {impactStats.map((stat, idx) => {
              return (
                <div
                  key={stat.id ?? idx}
                  className="p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-brand-red/50 hover:bg-white/15 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-brand-red mb-4 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <ProgramIcon icon={stat.icon} className="w-5 h-5" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-brand-red mb-1.5 tracking-tight group-hover:text-white transition-colors">
                    {stat.value}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-white">{stat.label}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
