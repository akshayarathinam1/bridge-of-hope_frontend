'use client';

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiBookOpen, FiDroplet, FiHeart, FiActivity } from "react-icons/fi";

const pillars = [
  {
    icon: FiBookOpen,
    title: "Kids Education",
    description:
      "Empowering young minds with scholarships, modern school supplies, and computer literacy.",
    borderColor: "hover:border-brand-navy/30",
    iconBg: "bg-brand-navy/10 text-brand-navy",
  },
  {
    icon: FiDroplet,
    title: "Pure Water",
    description:
      "Installing borewells, purification filters, and clean water stations in water-scarce villages.",
    borderColor: "hover:border-brand-orange/30",
    iconBg: "bg-orange-50 text-brand-orange",
  },
  {
    icon: FiHeart,
    title: "Healthy Food",
    description:
      "Providing daily hot meals, rations, and dietary supplements to children and seniors.",
    borderColor: "hover:border-brand-orange/30",
    iconBg: "bg-orange-50 text-brand-orange",
  },
  {
    icon: FiActivity,
    title: "Medical Care",
    description:
      "Free health screening camps, emergency medicines, and vision care for the elderly.",
    borderColor: "hover:border-rose-300",
    iconBg: "bg-rose-50 text-brand-red",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel className="justify-center">What We Do</SectionLabel>
          <SectionHeading
            title="Your Donation Means Another Smile."
            subtitle="Through our focused core programs, we address the critical foundational pillars of human dignity and opportunity."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group ${pillar.borderColor}`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
