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
  title: 'Child and Orphan Care | Bridge of Hope Foundation',
  description:
    'Support child welfare, orphan care, and children\'s well-being through Bridge of Hope Foundation.',
};

/* ─── Focus Areas ──────────────────────────────────────────────────────── */

const focusAreas = [
  { number: '01', label: 'Essential needs and daily care' },
  { number: '02', label: "Children's well-being and development" },
  { number: '03', label: 'A caring and supportive environment' },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function ChildCarePage() {
  return (
    <main className="min-h-screen bg-white text-brand-black">

      <PageHeader
        title="Child and Orphan Care"
        subtitle="Every Child Deserves Care and Compassion."
        breadcrumb="Child and Orphan Care"
      />

      {/* ── HERO SPLIT ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-site">

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
              <SectionLabel>Child and Orphan Care</SectionLabel>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-black leading-[1.1] mt-3 mb-6">
                Every Child Deserves{' '}
                <span className="text-brand-orange">Care and Compassion.</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                Every child deserves to feel safe, valued, and supported. We aim to support children in need by focusing on their well-being, essential needs, and opportunities for a better future.
              </p>

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

              <Button href="/donate?cause=orphanage" size="lg">
                <span>Support Child and Orphan Care</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Right — Image */}
            <div className="relative">
              <div className="relative h-[400px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=85"
                  alt="Happy children smiling at a community care centre"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                  Child and Orphan Care
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-3xl bg-brand-red/8 -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-sky-100/60 -z-10" />
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
              Together, We Can{' '}
              <span className="text-brand-orange">Make a Difference</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Your kindness can help children feel cared for and supported as they grow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/donate?cause=orphanage" size="lg">
                <span>Support Child and Orphan Care</span>
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

      <CtaBanner />
    </main>
  );
}
