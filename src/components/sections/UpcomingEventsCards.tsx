'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiClock } from "react-icons/fi";
import type { Event } from "@/types/api";
import { SITE_IMAGES } from '@/lib/images';

const BADGE_COLORS = ["bg-brand-orange", "bg-brand-navy", "bg-brand-red"];

function parseDateParts(isoString: string): { day: string; month: string } {
  const d = new Date(isoString);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleString("en-IN", { month: "short" }).toUpperCase(),
  };
}

export default function UpcomingEventsCards({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {events.map((evt, i) => {
        const { day, month } = parseDateParts(evt.event_date);
        const badgeColor = BADGE_COLORS[i % BADGE_COLORS.length];
        const timeLabel = evt.display_time || evt.time_label || "";
        const registrationHref = evt.registration_link || "/get-involved";

        return (
          <motion.div
            key={evt.slug ?? evt.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative rounded-2xl overflow-hidden shadow-md group h-[290px] sm:h-[380px] flex flex-col justify-end p-4 sm:p-6 border border-gray-100"
          >
            {/* Background Image */}
            <Image
              src={
                evt.cover_image ||
                SITE_IMAGES.educationClassroom
              }
              alt={evt.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/60 to-transparent" />

            {/* Date Badge */}
            <div
              className={`absolute top-4 left-4 ${badgeColor} text-white rounded-xl p-2.5 text-center min-w-[54px] shadow-md`}
            >
              <p className="text-xl font-extrabold leading-none">{day}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                {month}
              </p>
            </div>

            {/* Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-brand-red-light transition-colors">
                <Link href={`/get-involved?event=${evt.slug ?? evt.id}`}>
                  {evt.title}
                </Link>
              </h3>

              <div className="space-y-1.5 text-xs text-white/75 mb-4">
                {timeLabel && (
                  <p className="flex items-center gap-2">
                    <FiClock className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{timeLabel}</span>
                  </p>
                )}
                {evt.location && (
                  <p className="flex items-center gap-2">
                    <FiMapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{evt.location}</span>
                  </p>
                )}
              </div>

              <Link
                href={registrationHref}
                className="inline-block text-xs font-bold text-brand-red-light hover:underline uppercase tracking-wider"
              >
                Join as Volunteer &rarr;
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
