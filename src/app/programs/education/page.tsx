import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import CtaBanner from '@/components/sections/CtaBanner';

/* ─── SEO ──────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Education Support | Bridge of Hope Foundation',
  description:
    'Support children\'s education and learning opportunities through Bridge of Hope Foundation.',
};

/* ─── Focus Areas ──────────────────────────────────────────────────────── */

const focusAreas = [
  {
    number: '01',
    label: 'Access to learning opportunities',
  },
  {
    number: '02',
    label: 'Educational resources and essential supplies',
  },
  {
    number: '03',
    label: "Encouraging children's growth and development",
  },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <PageHeader
        title="Education Support"
        subtitle="Every Child Deserves a Chance to Learn."
        breadcrumb="Education"
      />

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
              <SectionLabel>Education</SectionLabel>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-black leading-[1.1] mt-3 mb-6">
                Every Child Deserves a{' '}
                <span className="text-brand-orange">Chance to Learn.</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                Education opens doors to opportunity, confidence, and a brighter future. We aim to support children in accessing learning opportunities and building a strong foundation for life.
              </p>

              {/* Focus Areas */}
              <div className="mb-10">
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-gray-400 mb-5">
                  Our Focus
                </h2>
                <ul className="space-y-4">
                  {focusAreas.map((item) => (
                    <li key={item.number} className="flex items-center gap-4">
                      <span className="text-[11px] font-black text-brand-red/60 w-6 flex-shrink-0 tabular-nums">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                          {item.label}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Button href="/donate?cause=education" size="lg">
                <span>Support Education</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Right — Image */}
            <div className="relative">
              <div className="relative h-[400px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=85"
                  alt="Children learning together in a bright classroom"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                  Education Support
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
              Be a Part of{' '}
              <span className="text-brand-orange">Their Future</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Your support can help create opportunities for children to learn, grow, and succeed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/donate?cause=education" size="lg">
                <span>Support Education</span>
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
