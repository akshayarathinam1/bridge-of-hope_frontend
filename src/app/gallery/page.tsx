'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import CtaBanner from '@/components/sections/CtaBanner';

/* ─── Gallery Data ─────────────────────────────────────────────────────── */

type Category = 'All' | 'Education' | 'Child Care' | 'Elderly Care' | 'Medical' | 'Social Service';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: Category;
  span?: 'wide' | 'tall' | 'normal';
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=85',
    alt: 'Children learning in a bright classroom',
    caption: 'Learning Together',
    category: 'Education',
    span: 'wide',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=85',
    alt: 'Children in a rural school classroom',
    caption: 'Rural Classrooms',
    category: 'Education',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=600&q=85',
    alt: 'Young girl learning in a community library',
    caption: 'Girls\' Education',
    category: 'Education',
    span: 'tall',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=85',
    alt: 'Happy children smiling together at a shelter',
    caption: 'Children\'s Home',
    category: 'Child Care',
    span: 'wide',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=85',
    alt: 'Children playing at a care centre',
    caption: 'Playtime & Joy',
    category: 'Child Care',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=600&q=85',
    alt: 'Community gathering and celebration',
    caption: 'Joy & Togetherness',
    category: 'Child Care',
    span: 'tall',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=85',
    alt: 'Caregiver holding hands with an elderly person',
    caption: 'Compassionate Care',
    category: 'Elderly Care',
    span: 'wide',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&q=85',
    alt: 'Elderly person receiving assistance',
    caption: 'Dignity in Care',
    category: 'Elderly Care',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=85',
    alt: 'Doctor examining a patient at a health camp',
    caption: 'Free Health Camp',
    category: 'Medical',
    span: 'tall',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&q=85',
    alt: 'Medical professionals providing healthcare',
    caption: 'Healthcare Outreach',
    category: 'Medical',
    span: 'wide',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=85',
    alt: 'Volunteers distributing food packages',
    caption: 'Relief Distribution',
    category: 'Social Service',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85',
    alt: 'Volunteer team working together',
    caption: 'Volunteers in Action',
    category: 'Social Service',
    span: 'wide',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=85',
    alt: 'Volunteers joining hands together',
    caption: 'United for Good',
    category: 'Social Service',
    span: 'tall',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=85',
    alt: 'Community members receiving help',
    caption: 'Community First',
    category: 'Social Service',
  },
];

const CATEGORIES: Category[] = ['All', 'Education', 'Child Care', 'Elderly Care', 'Medical', 'Social Service'];

/* ─── Lightbox ─────────────────────────────────────────────────────────── */

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[80vh] aspect-video rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <span className="inline-block px-3 py-1 rounded-full bg-[#222A59] text-white text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
            {item.category}
          </span>
          <p className="text-white font-bold text-base sm:text-lg">{item.caption}</p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length)), [filtered.length]);

  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <PageHeader
        title="Our Gallery"
        subtitle="Glimpses of lives touched, moments of hope, and the work we do every day."
        breadcrumb="Gallery"
      />

      {/* ── FILTER + GRID SECTION ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-site">

          {/* Section label + heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center mb-12"
          >
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand-black mt-2">
              Moments That{' '}
              <span className="text-brand-orange">Matter</span>
            </h2>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  'px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 cursor-pointer ' +
                  (activeCategory === cat
                    ? 'bg-[#222A59] border-[#222A59] text-white shadow-md scale-[1.04]'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#222A59] hover:text-[#222A59]')
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style CSS grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-3 sm:gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => openLightbox(i)}
                  className={
                    'relative overflow-hidden rounded-2xl cursor-pointer group ' +
                    (item.span === 'wide' ? 'col-span-2' :
                     item.span === 'tall' ? 'row-span-2' : '')
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 shadow-sm">
                    <FiMaximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#222A59] text-white text-[10px] font-extrabold uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                    <p className="text-white text-sm font-bold leading-snug">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm font-medium">
              No photos found for this category.
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <CtaBanner />

      {/* ── LIGHTBOX ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
