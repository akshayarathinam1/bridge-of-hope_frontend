'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  breadcrumb: string;
}

export default function PageHeader({ title, titleHighlight, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#032a6a] text-white overflow-hidden">
      {/* Background Image with softer contrast overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
          alt="Bridge of Hope Community"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/55 to-white/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.2)_0%,_transparent_65%)]" />
      </div>

      {/* Decorative Bottom Curved Mask matching reference */}
      <div className="absolute -bottom-1 left-0 right-0 h-10 md:h-14 bg-white rounded-t-[40px] md:rounded-t-[60px] z-10" />

      <div className="container-site relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {titleHighlight
              ? <>{title.replace(titleHighlight, "").trim()}{" "}<span className="text-brand-orange">{titleHighlight}</span></>
              : title
            }
          </h1>
          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Breadcrumb Pill matching reference */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-xs sm:text-sm font-bold text-brand-black border border-white"
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-brand-red transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400 font-normal">/</span>
          <span className="text-brand-red">{breadcrumb}</span>
        </motion.div>
      </div>
    </section>
  );
}
