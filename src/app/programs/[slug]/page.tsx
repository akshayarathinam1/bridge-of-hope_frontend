import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FiArrowLeft, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import ProgramIcon from '@/components/ui/ProgramIcon';
import CtaBanner from '@/components/sections/CtaBanner';
import { apiFetch } from '@/lib/api';
import {
  DEFAULT_PROGRAM_EXTRAS,
  PROGRAM_EXTRAS,
  PROGRAM_REVALIDATE,
  donateHrefFor,
  fetchProgramList,
} from '@/lib/programs';
import type { Program } from '@/types/api';

/* Every program page reads the dashboard's content and refreshes about once a minute. */
export const revalidate = 60;

async function getProgram(slug: string): Promise<Program | null> {
  try {
    return await apiFetch<Program>(`/content/programs/${slug}/`, {}, PROGRAM_REVALIDATE);
  } catch {
    return null; // unknown, or hidden in the dashboard
  }
}

const CONNECTORS = new Set(['and', 'to', 'of', 'a', 'the', 'for', '&']);

/**
 * Splits the tagline so its end can be coloured, like the original pages:
 * "Healthcare Is a Need, Not a Privilege." → after the comma; "… Care and Compassion." → last
 * three words around a connector; otherwise the last two words.
 */
function splitHeadline(text: string): [string, string] {
  const clean = text.trim();
  const comma = clean.lastIndexOf(', ');
  if (comma > 0) return [clean.slice(0, comma + 1), clean.slice(comma + 2)];
  const words = clean.split(/\s+/);
  if (words.length < 3) return ['', clean];
  const take = words.length > 3 && CONNECTORS.has(words[words.length - 2].toLowerCase()) ? 3 : 2;
  return [words.slice(0, -take).join(' '), words.slice(-take).join(' ')];
}

/* ─── Static params (programs added later are rendered on first visit) ─── */
export async function generateStaticParams() {
  const programs = await fetchProgramList();
  return programs.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ─────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return { title: 'Program | Bridge of Hope Foundation' };
  return {
    title: `${program.name} | Bridge of Hope Foundation`,
    description: program.tagline || program.description,
  };
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return notFound();

  const extras = PROGRAM_EXTRAS[program.slug] ?? DEFAULT_PROGRAM_EXTRAS;
  const donateHref = donateHrefFor(program.slug);
  const [lead, highlight] = splitHeadline(program.tagline || program.name);
  const stats = program.stats ?? [];

  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <PageHeader title={program.name} subtitle={program.tagline} breadcrumb={program.name} />

      {/* ── HERO SPLIT ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-site">

          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-red transition-colors"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              Back to Programs
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left — Copy */}
            <div>
              <SectionLabel>{program.name}</SectionLabel>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-black leading-[1.1] mt-3 mb-6">
                {lead && <>{lead}{' '}</>}
                <span className="text-brand-orange">{highlight}</span>
              </h1>
              {program.description && (
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10 whitespace-pre-line">
                  {program.description}
                </p>
              )}

              {/* Focus Areas */}
              {extras.focusAreas.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-gray-400 mb-5">
                    Our Focus
                  </h2>
                  <ul className="space-y-4">
                    {extras.focusAreas.map((label, i) => (
                      <li key={label} className="flex items-center gap-4">
                        <span className="text-[11px] font-black text-brand-red/60 w-6 flex-shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-3">
                          <FiCheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">{label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Program stats from the dashboard */}
              {stats.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {stats.map((stat) => (
                    <div key={stat.id} className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-center">
                      <p className="text-xl sm:text-2xl font-black text-brand-black mb-0.5">{stat.value}</p>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <Button href={donateHref} size="lg">
                <span>{extras.donateLabel}</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Right — Image */}
            <div className="relative">
              <div className="relative h-[400px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={program.cover_image || extras.image}
                  alt={program.cover_image ? program.name : extras.imageAlt || program.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                  <ProgramIcon icon={program.icon} className="w-3.5 h-3.5" />
                  {program.name}
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-3xl bg-brand-red/8 -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-amber-100/60 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-100">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center">
            <SectionLabel>Make a Difference</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight mt-3 mb-4 leading-tight">
              {extras.cta.lead}{' '}
              <span className="text-brand-orange">{extras.cta.highlight}</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {extras.cta.text}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href={donateHref} size="lg">
                <span>{extras.donateLabel}</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
              <Button href="/programs" variant="outline" size="lg">
                <span>View All Programs</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
