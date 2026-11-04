'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import ProgramIcon from '@/components/ui/ProgramIcon';
import { DEFAULT_PROGRAM_EXTRAS, PROGRAM_EXTRAS } from '@/lib/programs';
import type { ProgramListItem } from '@/types/api';

/* Shared card UI ─────────────────────────────────────────────────────────── */
function ProgramCard({ prog, index }: { prog: ProgramListItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/programs/${prog.slug}`}
        className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
      >
        {/* Image */}
        <div className="relative h-56 sm:h-60 overflow-hidden flex-shrink-0">
          <Image
            // The dashboard's cover photo; without one, the program's own stock photo.
            src={prog.cover_image || (PROGRAM_EXTRAS[prog.slug] ?? DEFAULT_PROGRAM_EXTRAS).image}
            alt={prog.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider">
              <ProgramIcon icon={prog.icon} className="w-3 h-3" />
              {prog.name}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-lg font-extrabold text-brand-black group-hover:text-brand-red transition-colors duration-200 mb-2 leading-snug">
            {prog.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed flex-1">
            {prog.tagline}
          </p>
          <div className="flex items-center gap-1.5 mt-5 text-xs font-bold text-brand-red opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
            <span>Learn more</span>
            <FiArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* Page component ─────────────────────────────────────────────────────────── */
export default function ProgramCards({ programs }: { programs: ProgramListItem[] }) {
  const firstRow = programs.slice(0, 3);
  const secondRow = programs.slice(3);

  return (
    <div className="mb-8">
      {/* ── Row 1: always 3-column grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {firstRow.map((prog, i) => (
          <ProgramCard key={prog.slug} prog={prog} index={i} />
        ))}
      </div>

      {/* ── Row 2: same card size, centred ──────────────────────────────── */}
      {secondRow.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 sm:gap-7 mt-6 sm:mt-7">
          {secondRow.map((prog, i) => (
            /*
             * Each card must be the same width as a first-row card.
             * First row uses gap-6 (1.5rem) on mobile, gap-7 (1.75rem) on sm+
             * with 3 columns, so each card = (100% - 2 × gap) / 3.
             *
             *   mobile : (100% - 2×1.5rem) / 3 → w-[calc((100%-3rem)/3)]
             *   sm+    : (100% - 2×1.75rem)/ 3 → sm:w-[calc((100%-3.5rem)/3)]
             *
             * With justify-center the two cards sit symmetrically in the row.
             */
            <div
              key={prog.slug}
              className="w-full sm:w-[calc((100%-3.5rem)/3)]"
            >
              <ProgramCard prog={prog} index={i + firstRow.length} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
