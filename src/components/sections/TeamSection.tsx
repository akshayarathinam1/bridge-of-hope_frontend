'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { FiShare2, FiLinkedin, FiMail } from "react-icons/fi";
import SectionLabel from "@/components/ui/SectionLabel";

const teamMembers = [
  {
    name: "Dr. Andrew Smith",
    role: "Founder & Managing Trustee",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Passionate about grassroots equity, Dr. Smith leads Bridge of Hope with over 15 years of social service leadership.",
  },
  {
    name: "Ethan Matthew",
    role: "Director of Field Operations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Supervising humanitarian logistics, community outreach drives, and rural relief distribution.",
  },
  {
    name: "Samuel Lucas",
    role: "Healthcare & Welfare Lead",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    bio: "Coordinating free medical camps, vision screenings, and elderly hospice healthcare programs.",
  },
];

export default function TeamSection() {
  return (
    <section className="relative bg-[#032a6a] text-white pt-20 pb-28 md:pt-24 md:pb-32 rounded-t-[40px] md:rounded-t-[60px] overflow-hidden">
      {/* Blue mixed with white gradient overlays identical to hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)] pointer-events-none" />

      {/* Decorative subtle polygon/geometric overlay in top-right */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
          <polygon points="0,0 200,0 200,200" />
          <polygon points="50,0 200,0 200,150" opacity="0.5" />
        </svg>
      </div>

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel light className="justify-center">
            Team Members
          </SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-2">
            Our Dedicated People
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            The committed leaders, trustees, and ground coordinators working tirelessly to bring dignity and relief to every person in need.
          </p>
        </div>

        {/* 3 Team Cards matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col group border border-gray-100"
            >
              {/* Photo with share/connect badge */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Bottom right corner share badge matching reference */}
                <div className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg group-hover:rotate-45 transition-transform duration-300">
                  <FiShare2 className="w-4 h-4" />
                </div>

                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-black group-hover:text-brand-red transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {member.role}
                </p>
                <p className="text-xs text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
