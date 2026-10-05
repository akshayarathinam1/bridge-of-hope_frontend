'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Bridge of Hope is the most transparent and dedicated foundation I have partnered with. Seeing the smiles on the elderly mothers who received health care restored my faith in humanity.",
    name: "Dr. Elizabeth Joe",
    role: "Medical Volunteer & Donor",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
  {
    quote:
      "When our rural school lacked basic desks and computer sets, Bridge of Hope stepped in within weeks. Today, 140 girls in our village are learning coding and English.",
    name: "Esther Howard",
    role: "Headmistress, Govt School",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    quote:
      "As a monthly donor, getting direct updates with photos and financial breakdown makes me confident that every rupee reaches the orphans and seniors who need it most.",
    name: "Albert Flores",
    role: "CSR Partner, Tech Solutions",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50/60">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel className="justify-center">Testimonials</SectionLabel>
          <SectionHeading
            title="What People Say About Us"
            subtitle="Real words from the donors, partners, and community leaders who make this journey possible."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-6">
                <FaQuoteLeft className="w-4 h-4" />
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 leading-relaxed italic mb-8 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-black">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
