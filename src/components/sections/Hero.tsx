'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { FiArrowUpRight } from "react-icons/fi";
import { splitHighlight } from "@/lib/content";
import type { HeroSection } from "@/types/api";
import { SITE_IMAGES } from '@/lib/images';

/* Shown until the dashboard's Site text → Banner is filled in (or if the API is down). */
const DEFAULT_HERO = {
  title: "Give Hope. Create Change. Transform Lives.",
  subtitle:
    "Every act of kindness has the power to change a life. We work to support children, senior citizens, families, and communities through education, healthcare, care, and social service.",
  cta_text: "Donate Now",
  cta_link: "/donate",
  background_image: SITE_IMAGES.hero,
};

/** Home page banner. Headline, line, button and photo come from Site text → Banner. */
export default function Hero({ hero }: { hero?: HeroSection | null }) {
  const title = hero?.title?.trim() || DEFAULT_HERO.title;
  const subtitle = hero ? hero.subtitle : DEFAULT_HERO.subtitle;
  const ctaText = hero?.cta_text?.trim() || DEFAULT_HERO.cta_text;
  const ctaLink = hero?.cta_link?.trim() || DEFAULT_HERO.cta_link;
  const background = hero?.background_image || DEFAULT_HERO.background_image;
  const [lead, highlight] = splitHighlight(title);
  return (
    <section
      id="hero"
      suppressHydrationWarning
      className="relative min-h-[100svh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#222A59]"
    >
      {/* High Impact Background Image */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
          priority
          // Our own hero photo in public/assets is already resized and compressed, so serve it
          // directly; going through the image optimizer delayed it and left the banner empty.
          unoptimized={background.startsWith("/assets/")}
        />
        {/* Blue mixed with white gradient overlays with reduced opacity */}
        <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-r from-[#222A59]/75 via-[#2e3870]/50 to-white/20" />
        <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-[#222A59]/60 via-transparent to-white/25" />
        <div suppressHydrationWarning className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-site pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-40 md:pb-36" suppressHydrationWarning>
        <div className="max-w-3xl">

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 break-words"
          >
            {lead && <>{lead}{" "}</>}
            <span className="relative inline-block text-white">
              {highlight}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-brand-red"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C70 3 200 3 298 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mb-8 sm:mb-10 font-normal"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-5"
          >
            <Button href={ctaLink} size="lg" variant="primary" className="w-full sm:w-auto">
              <span>{ctaText}</span>
              <FiArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </Button>

            <Button href="/get-involved" size="lg" variant="outline-white" className="w-full sm:w-auto">
              <span>Join Our Mission</span>
              <FiArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
