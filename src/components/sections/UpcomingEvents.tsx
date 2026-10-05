'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiMapPin, FiClock } from "react-icons/fi";

const events = [
  {
    id: "school-drive",
    title: "School Kit & Uniform Distribution Drive",
    date: { day: "15", month: "OCT" },
    badgeColor: "bg-brand-orange",
    time: "9:00 AM - 2:00 PM",
    location: "Govt School, Tambaram, Chennai",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
  },
  {
    id: "medical-camp",
    title: "Free Rural Health & Vision Screening Camp",
    date: { day: "22", month: "NOV" },
    badgeColor: "bg-brand-navy",
    time: "8:30 AM - 4:00 PM",
    location: "Community Center, Kanchipuram",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    id: "elderly-feast",
    title: "Old Age Home Joy Feast & Health Kits",
    date: { day: "05", month: "DEC" },
    badgeColor: "bg-brand-red",
    time: "11:00 AM - 3:00 PM",
    location: "Anbagam Elders Shelter, Velachery",
    image:
      "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=600&q=80",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <SectionLabel className="justify-center">Join Hands Together</SectionLabel>
          <SectionHeading
            title="Join Our Upcoming Events"
            subtitle="Be there on the ground with us. Connect, volunteer, and make an unforgettable memory."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {events.map((evt, i) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl overflow-hidden shadow-md group h-[290px] sm:h-[380px] flex flex-col justify-end p-4 sm:p-6 border border-gray-100"
            >
              {/* Background Image */}
              <Image
                src={evt.image}
                alt={evt.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/60 to-transparent" />

              {/* Date Badge */}
              <div
                className={`absolute top-4 left-4 ${evt.badgeColor} text-white rounded-xl p-2.5 text-center min-w-[54px] shadow-md`}
              >
                <p className="text-xl font-extrabold leading-none">{evt.date.day}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                  {evt.date.month}
                </p>
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-brand-red-light transition-colors">
                  <Link href={`/get-involved?event=${evt.id}`}>
                    {evt.title}
                  </Link>
                </h3>

                <div className="space-y-1.5 text-xs text-white/75 mb-4">
                  <p className="flex items-center gap-2">
                    <FiClock className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{evt.time}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{evt.location}</span>
                  </p>
                </div>

                <Link
                  href="/get-involved"
                  className="inline-block text-xs font-bold text-brand-red-light hover:underline uppercase tracking-wider"
                >
                  Join as Volunteer &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
