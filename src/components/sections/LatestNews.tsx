'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

const articles = [
  {
    slug: "warm-clothes-drive",
    title: "Your clothes give them a warm hug this winter.",
    excerpt:
      "Over 800 winter blankets and woolen sweaters distributed to elderly shelters and homeless individuals in northern Chennai.",
    date: "Sep 28, 2026",
    category: "Community Care",
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=80",
  },
  {
    slug: "digital-classrooms",
    title: "They also deserve quality modern education like everyone.",
    excerpt:
      "Inaugurated our second rural computer lab equipped with 15 smart PCs and free coding tutors for high school students.",
    date: "Aug 15, 2026",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
  },
  {
    slug: "orphan-dreams",
    title: "Help make their dreams and career aspirations come true.",
    excerpt:
      "Meet Priya and Rahul, two orphanage residents who cleared state engineering entrance tests through Bridge of Hope mentoring.",
    date: "Jul 10, 2026",
    category: "Stories of Hope",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  },
];

export default function LatestNews() {
  return (
    <section className="py-24 bg-gray-50/70 border-t border-gray-100">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel className="justify-center">From Our Journal</SectionLabel>
          <SectionHeading
            title="Our Latest News & Articles"
            subtitle="Read real stories of transformation, volunteer reflections, and updates on our ongoing field work."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, i) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-red text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-3">
                    <FiCalendar className="w-3.5 h-3.5 text-brand-red" />
                    <span>{item.date}</span>
                  </p>
                  <h3 className="text-lg font-bold text-brand-black mb-3 leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                    <Link href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">
                    {item.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${item.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-brand-red-dark transition-colors uppercase tracking-wider"
                >
                  <span>Read Article</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
