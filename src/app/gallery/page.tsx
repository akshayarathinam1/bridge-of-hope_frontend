import PageHeader from '@/components/ui/PageHeader';
import CtaBanner from '@/components/sections/CtaBanner';
import { apiFetch } from '@/lib/api';
import type { Paginated, GalleryImage, GalleryCategory } from '@/types/api';
import GalleryClient from './_components/GalleryClient';

export default async function GalleryPage() {
  /* Fetch categories and initial image batch in parallel */
  let categories: GalleryCategory[] = [];
  let initialImages: GalleryImage[] = [];

  try {
    const [catData, imgData] = await Promise.all([
      apiFetch<GalleryCategory[]>('/content/gallery/categories/', {}, 300),
      apiFetch<Paginated<GalleryImage>>('/content/gallery/', {}, 300),
    ]);
    if (Array.isArray(catData)) categories = catData;
    if (imgData?.results) initialImages = imgData.results;
  } catch { /* use empty arrays — client will show empty state */ }

  return (
    <main className="min-h-screen bg-white text-brand-black">
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Our Gallery"
        subtitle="Glimpses of love, care, and hope from our programs and events."
        breadcrumb="Gallery"
      />

      {/* ── GALLERY (client for filter + lightbox interactivity) ─────── */}
      <GalleryClient
        initialImages={initialImages}
        categories={categories}
      />

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
