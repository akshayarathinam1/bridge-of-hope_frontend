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
import SectionLabel from '@/components/ui/SectionLabel';
import type { GalleryImage, GalleryCategory } from '@/types/api';

/* ─── Lightbox ───────────────────────────────────────────────────────────── */

interface LightboxProps {
  items: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={800}
          className="w-full h-auto object-contain max-h-[80vh]"
        />
        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-sm font-semibold">{item.caption}</p>
          </div>
        )}
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

/* ─── Main Gallery Client ─────────────────────────────────────────────────── */

interface Props {
  initialImages: GalleryImage[];
  categories: GalleryCategory[];
}

export default function GalleryClient({ initialImages, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* Filter images when a category tab is clicked */
  const handleCategoryChange = useCallback(async (value: string) => {
    setActiveCategory(value);
    setLoading(true);
    try {
      const qs = value === 'all' ? '' : `?category=${value}`;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/content/gallery/${qs}`,
        { cache: 'no-store' },
      );
      if (res.ok) {
        const data = await res.json();
        setImages(Array.isArray(data) ? data : data.results ?? []);
      }
    } catch { /* keep existing images */ }
    setLoading(false);
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i == null ? 0 : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i == null ? 0 : (i + 1) % images.length)),
    [images.length],
  );

  return (
    <>
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-site">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel className="justify-center">Our Gallery</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight mt-2 mb-4">
              Moments That{' '}
              <span className="text-brand-orange">Inspire</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Real stories, real people, real impact. Browse through glimpses of our journey in the field.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {/* "All" tab */}
            <button
              onClick={() => handleCategoryChange('all')}
              className={
                'px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 cursor-pointer ' +
                (activeCategory === 'all'
                  ? 'bg-[#222A59] border-[#222A59] text-white shadow-md scale-[1.04]'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#222A59] hover:text-[#222A59]')
              }
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={
                  'px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 cursor-pointer ' +
                  (activeCategory === cat.value
                    ? 'bg-[#222A59] border-[#222A59] text-white shadow-md scale-[1.04]'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#222A59] hover:text-[#222A59]')
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-16">
              <span className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Masonry-style CSS grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-3 sm:gap-4"
              >
                {images.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    onClick={() => openLightbox(i)}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
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
                      {item.category && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#222A59] text-white text-[10px] font-extrabold uppercase tracking-wider mb-1">
                          {item.category}
                        </span>
                      )}
                      <p className="text-white text-sm font-bold leading-snug">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {!loading && images.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm font-medium">
              No photos found for this category.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
