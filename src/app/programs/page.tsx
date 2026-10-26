'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import CtaBanner from '@/components/sections/CtaBanner';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiHeart,
  FiActivity,
  FiUsers,
  FiHome,
  FiAward,
  FiSmile,
} from 'react-icons/fi';

/* ─── Program Cards Data ───────────────────────────────────────────────── */

const programs = [
  {
    id: 'education',
    title: 'Education',
    description: 'Supporting learning and creating opportunities for a brighter future.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=85',
    imageAlt: 'Children learning together in a classroom',
    icon: FiBookOpen,
    slug: 'education',
    badge: 'Education',
  },
  {
    id: 'child-care',
    title: 'Child and Orphan Care',
    description: "Promoting children's well-being through care, support, and compassion.",
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85',
    imageAlt: 'Children smiling at a care centre',
    icon: FiHome,
    slug: 'orphanage',
    badge: 'Child Care',
  },
  {
    id: 'senior-care',
    title: 'Elderly Care',
    description: 'Helping older adults live with dignity, comfort, and care.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=85',
    imageAlt: 'Caregiver holding the hand of an elderly person',
    icon: FiHeart,
    slug: 'old-age',
    badge: 'Elderly Care',
  },
  {
    id: 'medical-support',
    title: 'Medical Support',
    description: 'Helping people access essential healthcare and medical assistance.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85',
    imageAlt: 'Healthcare worker providing medical assistance',
    icon: FiActivity,
    slug: 'medical',
    badge: 'Medical',
  },
  {
    id: 'social-service',
    title: 'Social Service',
    description: 'Extending a helping hand to individuals and communities in need.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=85',
    imageAlt: 'Volunteers distributing food to community members',
    icon: FiUsers,
    slug: 'social-service',
    badge: 'Social',
  },
];

const impactStats = [
  { number: '12,500+', label: 'Lives Supported', icon: FiSmile },
  { number: '4,800+', label: 'Children Reached', icon: FiBookOpen },
  { number: '3,200+', label: 'Families Assisted', icon: FiHeart },
  { number: '150+', label: 'Community Drives', icon: FiAward },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <PageHeader
        title="Our Programs"
        subtitle="Five core initiatives dedicated to empowering children, elders, families, and communities."
        breadcrumb="Programs"
      />

      {/* ── PROGRAMS SECTION ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-site">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-16 sm:mb-20"
          >
            <SectionLabel>Our Programs</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-black mt-3 mb-5 leading-tight">
              Care for People.{' '}
              <span className="text-brand-orange">Hope for Tomorrow.</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              We work to support people in need through meaningful initiatives that bring care, opportunity, and hope.
            </p>
          </motion.div>

          {/* Card grid — 3 cols on lg, 2 on sm, 1 on xs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-8">
            {programs.slice(0, 3).map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
                  >
                    {/* Image */}
                    <div className="relative h-56 sm:h-60 overflow-hidden flex-shrink-0">
                      <Image
                        src={prog.image}
                        alt={prog.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider">
                          <Icon className="w-3 h-3" />
                          {prog.badge}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-lg font-extrabold text-brand-black group-hover:text-brand-red transition-colors duration-200 mb-2 leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1">
                        {prog.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-5 text-xs font-bold text-brand-red opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                        <span>Learn more</span>
                        <FiArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom row — 2 cards centred */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 sm:max-w-2xl lg:max-w-3xl mx-auto mb-14">
            {programs.slice(3).map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.08 }}
                >
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
                  >
                    {/* Image */}
                    <div className="relative h-56 sm:h-60 overflow-hidden flex-shrink-0">
                      <Image
                        src={prog.image}
                        alt={prog.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider">
                          <Icon className="w-3 h-3" />
                          {prog.badge}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-lg font-extrabold text-brand-black group-hover:text-brand-red transition-colors duration-200 mb-2 leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1">
                        {prog.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-5 text-xs font-bold text-brand-red opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                        <span>Learn more</span>
                        <FiArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-center"
          >
            <Button href="/programs" size="lg">
              <span>Explore All Programs</span>
              <FiArrowUpRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT STRIP ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#222A59] text-white relative overflow-hidden" suppressHydrationWarning>
        <div className="absolute inset-0 z-0 pointer-events-none" suppressHydrationWarning>
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=85"
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
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-brand-red/50 hover:bg-white/15 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-brand-red mb-4 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-brand-red mb-1.5 tracking-tight group-hover:text-white transition-colors">
                    {stat.number}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-white">{stat.label}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
