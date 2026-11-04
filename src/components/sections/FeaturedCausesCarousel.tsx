'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { Campaign } from "@/types/api";

/* ─── Helper ─────────────────────────────────────────────────────────────── */

function formatINR(paise: number): string {
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

/* ─── Client Carousel ───────────────────────────────────────────────────── */

export default function FeaturedCausesCarousel({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  const [current, setCurrent] = useState(0);
  const visible = 4;
  const total = campaigns.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const ordered = [
    ...campaigns.slice(current),
    ...campaigns.slice(0, current),
  ].slice(0, visible);

  return (
    <>
      {/* Arrow controls row */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous causes"
            className="group/prev w-11 h-11 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white text-brand-black flex items-center justify-center transition-all duration-300 border border-gray-200 hover:border-brand-red hover:-translate-x-1 active:-translate-x-2"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover/prev:-translate-x-0.5" />
          </button>
          <button
            onClick={next}
            aria-label="Next causes"
            className="group/next w-11 h-11 rounded-full bg-brand-red text-white hover:bg-brand-red-dark flex items-center justify-center transition-all duration-300 hover:translate-x-1 active:translate-x-2 shadow-md hover:shadow-lg"
          >
            <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/next:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ordered.map((campaign, i) => {
          const percentage = campaign.progress_percent ?? 0;
          const raised =
            campaign.raised_inr != null ? formatINR(campaign.raised_inr) : null;
          const goal =
            campaign.goal_inr != null ? formatINR(campaign.goal_inr) : null;

          return (
            <motion.div
              key={campaign.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100"
            >
              {/* Image with category badge */}
              <div className="relative h-52 w-full overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={
                    campaign.cover_image ||
                    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80"
                  }
                  alt={campaign.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {campaign.program_name && (
                  <span className="absolute top-3 left-3 bg-brand-red text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {campaign.program_name}
                  </span>
                )}
              </div>

              {/* Body content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-[17px] font-bold text-brand-black mb-2.5 group-hover:text-brand-red transition-colors leading-snug">
                    <Link href={`/donate?cause=${campaign.slug}`}>
                      {campaign.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {campaign.description || campaign.tagline}
                  </p>
                </div>

                {/* Progress section */}
                <div className="mt-auto pt-2">
                  {/* Donation label + percent row */}
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-gray-400 uppercase tracking-wider">
                      Donation
                    </span>
                    <span className="text-brand-red font-bold">
                      {percentage}%
                    </span>
                  </div>

                  {/* Animated progress bar */}
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        ease: "easeOut",
                        delay: i * 0.1,
                      }}
                      className="h-full rounded-full bg-brand-red"
                    />
                  </div>

                  {/* Raised / Goal */}
                  {(raised || goal) && (
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                      {raised && (
                        <span>
                          Raised:{" "}
                          <strong className="text-brand-black">{raised}</strong>
                        </span>
                      )}
                      {goal && (
                        <span>
                          Goal:{" "}
                          <strong className="text-brand-black">{goal}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
