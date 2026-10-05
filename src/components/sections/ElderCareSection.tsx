'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { FiHeart, FiEye, FiPhoneCall } from "react-icons/fi";

export default function ElderCareSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with emotional touch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
              <Image
                src="https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=800&q=85"
                alt="Volunteer smiling with elderly resident"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-1">
                  Dignity &amp; Compassion
                </p>
                <p className="text-sm sm:text-base font-bold leading-snug">
                  Providing free assisted living, nutritious diets, and emotional companionship.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission & Vision + Hotline Call */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <SectionLabel>Elder &amp; Orphan Support</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-6 leading-tight">
              Make Their Golden Days{" "}
              <span className="text-brand-red">Happier</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              No senior citizen should ever feel abandoned or forgotten. Our
              Bridge of Hope Care homes provide medical treatment, comfortable beds,
              daily recreation, and a true family environment for homeless and
              destitute elders.
            </p>

            {/* Mission & Vision Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0">
                  <FiHeart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-black mb-1">
                    Our Mission
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    To deliver compassionate, holistic care with zero financial
                    burden on destitute seniors.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <FiEye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-black mb-1">
                    Our Vision
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    An India where every elder lives with respect, warmth,
                    medical security, and joy.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs with phone link */}
            <div className="flex flex-wrap items-center gap-5">
              <Button href="/programs/old-age" size="lg" variant="primary">
                Explore Care Homes
              </Button>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-3 text-sm font-bold text-brand-black hover:text-brand-red transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-red">
                  <FiPhoneCall className="w-4 h-4" />
                </span>
                <span>+91 12345 67890</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
