'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { FiTarget, FiEye, FiPhone, FiArrowUpRight } from "react-icons/fi";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Layered photo collage ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative h-[520px] w-full hidden lg:block"
          >
            {/* Vertical dark brand banner strip */}
            <div className="absolute left-0 top-0 bottom-0 w-[190px] bg-brand-black rounded-2xl overflow-hidden z-0">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                alt="Children in community"
                fill
                className="object-cover opacity-35"
              />
              {/* Vertical rotated text at bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 flex justify-center">
                <p
                  className="text-white text-[13px] font-semibold tracking-widest uppercase whitespace-nowrap"
                  style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
                >
                  We give{" "}
                  <span className="text-brand-red font-extrabold">hope</span>{" "}
                  to people in need
                </p>
              </div>
            </div>

            {/* Top-center photo */}
            <div className="absolute left-[158px] top-0 w-[220px] h-[175px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <Image
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80"
                alt="Children smiling and learning"
                fill
                className="object-cover"
              />
            </div>

            {/* Center photo */}
            <div className="absolute left-[158px] top-[144px] w-[220px] h-[235px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 group">
              <Image
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80"
                alt="Volunteers helping children"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom-right photo */}
            <div className="absolute right-0 bottom-0 w-[205px] h-[215px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80"
                alt="Elder care and medical assistance"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative wavy accent */}
            <div className="absolute top-[-10px] right-[120px] z-20 pointer-events-none">
              <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
                <path
                  d="M2 15 C14 4 24 26 36 15 C48 4 58 26 70 15 C82 4 92 26 98 15"
                  stroke="#ff7100"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Floating stat badge */}
            <div className="absolute left-[390px] top-[230px] z-20 bg-white rounded-2xl shadow-2xl border border-gray-100 px-5 py-4 min-w-[130px]">
              <p className="text-3xl font-extrabold text-brand-black leading-none">8+</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Years of Impact</p>
            </div>
          </motion.div>

          {/* Mobile-only image strip with Impact Badge */}
          <div className="lg:hidden w-full mb-8">
            <div className="grid grid-cols-2 gap-3 relative">
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80"
                  alt="Children learning"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80"
                  alt="Volunteers helping"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl px-2.5 py-1.5 shadow-md border border-gray-100">
                  <p className="text-xs font-black text-brand-black leading-none">8+ Years</p>
                  <p className="text-[9px] text-gray-500 font-medium mt-0.5">Of Impact</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text content with user requested About Us copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col"
          >
            <SectionLabel>About Bridge of Hope</SectionLabel>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-brand-black mt-2 mb-4 sm:mb-5">
              We Believe Every Life{" "}
              <span className="text-brand-orange">Deserves Hope</span>
            </h2>

            <p className="text-gray-600 text-xs sm:text-base leading-relaxed mb-4">
              Our mission is to create meaningful change by supporting people and communities in need. Through education, healthcare, care for children and elderly, and social welfare initiatives, we strive to make a lasting difference.
            </p>

            {/* Pull Quote Highlight */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-brand-red-light/60 border-l-4 border-brand-red mb-4 sm:mb-5">
              <p className="text-xs sm:text-sm font-semibold text-brand-black italic">
                &ldquo;We believe that real change begins with compassion—and grows when people come together.&rdquo;
              </p>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              From helping a child access education to supporting an elderly person with essential care, every initiative is driven by one simple purpose: to give people the support, dignity, and opportunities they deserve.
            </p>

            {/* Two feature cards: Our Mission & Our Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-7 sm:mb-9">
              {/* Mission */}
              <div className="p-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-brand-red/40 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-brand-red-light flex items-center justify-center text-brand-red flex-shrink-0">
                    <FiTarget className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors">
                    Our Mission
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  To serve communities with compassion, integrity, and commitment while creating opportunities for a better and more secure future.
                </p>
              </div>

              {/* Vision */}
              <div className="p-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-brand-red/40 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-brand-red-light flex items-center justify-center text-brand-red flex-shrink-0">
                    <FiEye className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors">
                    Our Vision
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  A society where every child can learn, every senior citizen can live with dignity, and every person in need can find support and hope.
                </p>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <Button href="/donate" size="lg" className="w-full sm:w-auto">
                <span>Donate Now</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>

              <a
                href="tel:+911234567890"
                className="inline-flex items-center justify-center sm:justify-start gap-3 group p-2.5 sm:p-0 rounded-2xl sm:rounded-none bg-gray-50 sm:bg-transparent"
              >
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-brand-red/30 group-hover:border-brand-red flex items-center justify-center transition-colors duration-200 bg-white">
                  <FiPhone className="w-4 h-4 text-brand-red" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    Call Anytime
                  </p>
                  <p className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors duration-200">
                    +91 12345 67890
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
