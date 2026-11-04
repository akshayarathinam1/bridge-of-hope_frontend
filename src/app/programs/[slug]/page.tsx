import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import CtaBanner from '@/components/sections/CtaBanner';
import { apiFetch } from '@/lib/api';
import type { Program, ProgramListItem } from '@/types/api';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiHeart,
  FiActivity,
  FiUsers,
  FiHome,
  FiAward,
  FiSmile,
  FiStar,
  FiCheckCircle,
} from 'react-icons/fi';

type IconCmp = React.ComponentType<{ className?: string }>;
const ICON_MAP: Record<string, IconCmp> = {
  FiBookOpen, FiHeart, FiActivity, FiUsers, FiHome, FiAward, FiSmile, FiStar,
};

/* ─── Static params for ISR ──────────────────────────────────────────────── */
export async function generateStaticParams() {
  try {
    const programs = await apiFetch<ProgramListItem[]>('/content/programs/', {}, 300);
    if (Array.isArray(programs)) {
      return programs.map((p) => ({ slug: p.slug }));
    }
  } catch { /* fall through */ }
  return ['education', 'orphanage', 'old-age', 'medical', 'social-service'].map(
    (slug) => ({ slug }),
  );
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const program = await apiFetch<Program>(`/content/programs/${slug}/`, {}, 300);
    return {
      title: `${program.name} | Bridge of Hope`,
      description: program.tagline || program.description,
    };
  } catch {
    return { title: 'Program | Bridge of Hope' };
  }
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let program: Program | null = null;
  try {
    program = await apiFetch<Program>(`/content/programs/${slug}/`, {}, 300);
  } catch { /* fall through to notFound */ }

  if (!program) return notFound();

  const Icon: IconCmp = ICON_MAP[program.icon ?? ''] ?? FiHeart;
  const hasStats = program.stats && program.stats.length > 0;

  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <PageHeader
        title={program.name}
        subtitle={program.tagline}
        breadcrumb={program.name}
      />

      {/* ── HERO SPLIT ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src={
                  program.cover_image ||
                  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=85'
                }
                alt={program.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right — content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#222A59] text-white text-xs font-extrabold uppercase tracking-wider mb-5">
                <Icon className="w-3.5 h-3.5" />
                {program.name}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-black leading-tight mb-5">
                {program.tagline || program.name}
              </h2>

              {program.description && (
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  {program.description}
                </p>
              )}

              {/* Program stats */}
              {hasStats && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {program.stats!.map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-center"
                    >
                      <p className="text-xl sm:text-2xl font-black text-brand-black mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/donate?cause=${program.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-red text-white font-bold text-sm shadow-lg hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all duration-200"
                >
                  Donate Now
                  <FiArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-brand-navy text-brand-navy font-bold text-sm hover:bg-brand-navy hover:text-white transition-all duration-200"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY OUTCOMES ──────────────────────────────────────────────── */}
      {hasStats && (
        <section className="py-14 bg-gray-50 border-y border-gray-100">
          <div className="container-site max-w-3xl">
            <h2 className="text-2xl font-extrabold text-brand-black mb-6">
              Our Impact in Numbers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {program.stats!.map((stat) => (
                <div
                  key={stat.id}
                  className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <FiCheckCircle className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xl font-black text-brand-black">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
