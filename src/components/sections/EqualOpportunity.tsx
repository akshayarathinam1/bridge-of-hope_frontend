'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { FiArrowUpRight, FiHeart } from "react-icons/fi";

const impactTiers = [
  { amount: "₹500", label: "School Kits & Nutrition" },
  { amount: "₹1,000", label: "Elder Health Checkup" },
  { amount: "₹5,000", label: "Family Relief Support" },
];

export default function EqualOpportunity() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50/60 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stacked / Layered Photo Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back tilted image */}
              <div className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] rounded-3xl overflow-hidden shadow-2xl rotate-0 sm:rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-4 border-white bg-gray-100 group">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85"
                  alt="Child with a bright hopeful smile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating secondary badge card */}
              <div className="absolute bottom-3 right-3 sm:-bottom-6 sm:-right-6 bg-white/98 backdrop-blur-sm rounded-2xl p-3.5 sm:p-5 shadow-xl border border-gray-100 max-w-[210px] sm:max-w-xs z-10">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-red-light text-brand-red flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                    <FiHeart className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
                  </span>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Every Gift Counts
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-brand-black">
                      100% Direct Relief
                    </p>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
                  Every rupee reaches children, elders, and families where it is needed most.
                </p>
              </div>
            </div>
          </motion.div>


          {/* Right Column: User Requested 'Gift of Hope' Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <SectionLabel>Gift of Hope</SectionLabel>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mt-1 mb-4 leading-tight">
              Your Gift Can Become{" "}
              <span className="text-brand-red">Someone&rsquo;s Hope</span>
            </h2>

            <p className="text-xs sm:text-base font-medium text-brand-red mb-3">
              Sometimes, a small act of kindness can mean everything to someone.
            </p>

            <p className="text-xs sm:text-base text-gray-600 leading-relaxed mb-3">
              Your contribution can help provide a child with educational support, help an elderly person receive essential care, or support a family facing a difficult time.
            </p>

            <p className="text-xs sm:text-base text-gray-600 leading-relaxed mb-6">
              When you give, you&rsquo;re not just giving money. You&rsquo;re giving someone a reason to believe that tomorrow can be better.
            </p>

            {/* Every Contribution Matters Card */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm mb-7 sm:mb-8">
              <h3 className="text-sm sm:text-base font-bold text-brand-black mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-red" />
                Every Contribution Matters
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                Whether it&rsquo;s ₹500, ₹1,000, or ₹5,000, your support can become part of something bigger—a community where people help one another move forward.
              </p>

              {/* Quick tier preview */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {impactTiers.map((tier) => (
                  <div
                    key={tier.amount}
                    className="text-center p-2 sm:p-2.5 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <span className="block text-xs sm:text-sm font-extrabold text-brand-black">
                      {tier.amount}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-medium truncate mt-0.5">
                      {tier.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button href="/donate" size="lg" variant="primary" className="w-full sm:w-auto">
                <span>Give the Gift of Hope</span>
                <FiArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button href="/programs" size="lg" variant="outline" className="w-full sm:w-auto">
                <span>Our Programs</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
