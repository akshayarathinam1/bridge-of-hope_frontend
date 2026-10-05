'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiPlay, FiUsers, FiMapPin, FiHeart, FiTrendingUp } from "react-icons/fi";

const stats = [
  {
    number: "5,000+",
    label: "Beneficiaries Supported",
    subtext: "Across education, healthcare & care",
    icon: FiUsers,
  },
  {
    number: "100%",
    label: "Local Community Driven",
    subtext: "Staff & volunteers from grassroots",
    icon: FiMapPin,
  },
  {
    number: "₹50L+",
    label: "Invested in Programs",
    subtext: "Directly deployed for social impact",
    icon: FiTrendingUp,
  },
  {
    number: "120+",
    label: "Dedicated Volunteers",
    subtext: "Active across Tamil Nadu",
    icon: FiHeart,
  },
];

export default function VolunteerBanner() {
  return (
    <section className="relative py-24 md:py-32 bg-[#032a6a] overflow-hidden">
      {/* Background Image with Hero-matched blue + white gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=85"
          alt="Volunteers smiling together"
          fill
          className="object-cover object-center opacity-85"
        />
        {/* Blue mixed with white gradient overlays identical to hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
      </div>

      <div className="container-site relative z-10 text-center">
        {/* Main Banner Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          {/* White eyebrow pill */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 text-brand-black text-xs font-bold uppercase tracking-wider shadow-lg mb-6 border border-white">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            Join Our Volunteer Movement
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-md">
            Volunteer Opportunities Now{" "}
            <span className="text-brand-orange">Open for You</span>
          </h2>

          <Link
            href="/get-involved"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-white/90 text-brand-black text-sm font-bold shadow-2xl transition-all duration-300 group hover:scale-105 border-2 border-white"
          >
            <span className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow">
              <FiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
            </span>
            <span>Watch Our Volunteers &amp; Join</span>
          </Link>
        </motion.div>

        {/* Overlapping Rounded Stats Bar in clean luminous white card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl bg-white/95 text-brand-black border-2 border-white p-8 sm:p-10 shadow-2xl backdrop-blur-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${
                  i !== stats.length - 1 ? "lg:border-r lg:border-gray-200" : ""
                }`}
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight mb-1">
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-brand-red mb-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-gray-500 font-medium">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
