'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { FiArrowUpRight, FiHeart } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="hero"
      suppressHydrationWarning
      className="relative min-h-[100svh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#032a6a]"
    >
      {/* High Impact Background Image */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=85"
          alt="Happy children smiling and reaching out together"
          fill
          className="object-cover object-center opacity-85"
          priority
        />
        {/* Blue mixed with white gradient overlays with reduced opacity */}
        <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
        <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
        <div suppressHydrationWarning className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-site pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-40 md:pb-36" suppressHydrationWarning>
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-5 sm:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse flex-shrink-0" />
            <span className="truncate sm:overflow-visible">Non-Profit Charity · Bridge of Hope</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 break-words"
          >
            Give Hope. Create Change.{" "}
            <span className="relative inline-block text-white">
              Transform Lives.
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mb-8 sm:mb-10 font-normal"
          >
            Every act of kindness has the power to change a life. We work to support children, senior citizens, families, and communities through education, healthcare, care, and social service.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-5"
          >
            <Button href="/donate" size="lg" variant="primary" className="w-full sm:w-auto">
              <span>Donate Now</span>
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
