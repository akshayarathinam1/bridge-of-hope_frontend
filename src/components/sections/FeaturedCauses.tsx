'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const causes = [
  {
    id: "education",
    title: "Education for Every Child",
    description:
      "Help provide children with the resources and opportunities they need to continue their education and build their future.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    raised: "₹38,000",
    goal: "₹50,000",
    percentage: 76,
    ctaText: "Support Education",
  },
  {
    id: "elder-care",
    title: "Care for Elderly",
    description:
      "Help provide essential care, comfort, and support to elderly people who may be living without adequate assistance.",
    category: "Elder Care",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80",
    raised: "₹64,000",
    goal: "₹80,000",
    percentage: 80,
    ctaText: "Support Elder Care",
  },
  {
    id: "healthcare",
    title: "Healthcare for Those in Need",
    description:
      "Your support can help individuals and families facing medical needs access essential healthcare assistance.",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    raised: "₹42,000",
    goal: "₹50,000",
    percentage: 84,
    ctaText: "Support Healthcare",
  },
  {
    id: "child-care",
    title: "Care & Support for Children",
    description:
      "Help create safer, more supportive environments where children can grow, learn, and look forward to a brighter future.",
    category: "Child Care",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    raised: "₹78,000",
    goal: "₹90,000",
    percentage: 87,
    ctaText: "Support Child Care",
  },
];

export default function FeaturedCauses() {
  const [current, setCurrent] = useState(0);
  const visible = 4;
  const total = causes.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // On desktop show all 4; carousel arrows support rotation
  const orderedCauses = [
    ...causes.slice(current),
    ...causes.slice(0, current),
  ].slice(0, visible);

  return (
    <section id="causes" className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container-site">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel>Featured Causes</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-brand-black mt-1 mb-3">
              Where Your Support{" "}
              <span className="text-brand-orange">Makes a Difference</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Your generosity helps us support initiatives that address some of the most important needs in our communities.
            </p>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-3 flex-shrink-0 self-start sm:self-end">
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
          {orderedCauses.map((cause, i) => (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100"
            >
              {/* Image with category badge */}
              <div className="relative h-52 w-full overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3 left-3 bg-brand-red text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {cause.category}
                </span>
              </div>

              {/* Body content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-[17px] font-bold text-brand-black mb-2.5 group-hover:text-brand-red transition-colors leading-snug">
                    <Link href={`/donate?cause=${cause.id}`}>
                      {cause.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {cause.description}
                  </p>
                </div>

                {/* Progress section */}
                <div className="mt-auto pt-2">
                  {/* Donation label + percent row */}
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-gray-400 uppercase tracking-wider">Donation</span>
                    <span className="text-brand-red font-bold">{cause.percentage}%</span>
                  </div>

                  {/* Animated progress bar */}
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cause.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.1 }}
                      className="h-full rounded-full bg-brand-red"
                    />
                  </div>

                  {/* Raised / Goal */}
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-5">
                    <span>
                      Raised:{" "}
                      <strong className="text-brand-black">{cause.raised}</strong>
                    </span>
                    <span>
                      Goal:{" "}
                      <strong className="text-brand-black">{cause.goal}</strong>
                    </span>
                  </div>

                  {/* Card CTA button matching user request */}
                  <Link
                    href={`/donate?cause=${cause.id}`}
                    className="group/btn relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 border-brand-black text-brand-black text-xs sm:text-sm font-bold hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-300 shadow-sm hover:shadow-[0_6px_20px_rgba(255,113,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none"
                  >
                    <span>{cause.ctaText}</span>
                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
