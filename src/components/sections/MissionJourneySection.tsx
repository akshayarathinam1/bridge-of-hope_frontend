'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const missionPoints = [
  "Empowering young minds through quality education, modern kits, and tuition support.",
  "Providing dignified hospice and healthcare for destitute senior citizens with zero burden.",
  "Delivering clean drinking water borewells and daily nutritional rations to underserved villages.",
  "Fostering complete financial transparency with 100% direct project deployment.",
];

export default function MissionJourneySection() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Angled Curved Photo Composition matching reference */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Main curved image container */}
            <div className="relative h-[360px] sm:h-[420px] rounded-[36px] sm:rounded-[48px] overflow-hidden shadow-2xl border-4 border-gray-100 group">
              <Image
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80"
                alt="Volunteers and community members"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />
            </div>

            {/* Overlapping secondary badge / photo card in bottom right */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 max-w-[220px] sm:max-w-[260px]">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center text-white flex-shrink-0 font-extrabold text-lg shadow-md">
                  100%
                </span>
                <div>
                  <p className="text-xs font-bold text-brand-black uppercase tracking-wider">
                    Grassroots Driven
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Every rupee directly supports our field initiatives.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission Narrative & Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <SectionLabel>Our Foundation Mission</SectionLabel>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mt-2 mb-6 leading-tight">
              Make Every Stage In The Journey{" "}
              <span className="text-brand-orange">Meaningful</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              At Bridge of Hope, we believe sustainable social change begins by addressing the full human lifecycle—protecting vulnerable childhoods, providing opportunities for youth, and ensuring serene dignity for our elderly.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 mb-10 w-full">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3.5">
                  <span className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button with curved pill shape and hover shine */}
            <Link
              href="/get-involved"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold shadow-[0_4px_18px_rgba(255,113,0,0.35)] hover:shadow-[0_8px_26px_rgba(255,113,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none"
            >
              <span>Join Our Mission</span>
              <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
