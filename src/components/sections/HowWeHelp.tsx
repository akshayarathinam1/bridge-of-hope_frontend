'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import {
  FiBookOpen,
  FiHome,
  FiHeart,
  FiActivity,
  FiUsers,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

const services = [
  {
    id: "education",
    icon: FiBookOpen,
    emoji: "🎓",
    title: "Education",
    categoryBadge: "Education & Literacy",
    description:
      "We help children and young people access educational opportunities, learning resources, and the support they need to build a better future.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=85",
    imageAlt: "Children actively learning in school",
    iconColor: "text-brand-orange",
    bgColor: "bg-orange-50",
    accentColor: "bg-brand-orange",
    rightHighlight: {
      tag: "Direct Education Sponsorship",
      headline: "Quality Education, Books & Digital Learning",
      description:
        "From annual school kits and textbooks to after-school remedial hubs and secondary scholarships, we eliminate every barrier preventing children from completing their education.",
      stat: "4,800+ Students Supported",
      programLink: "/programs/education",
    },
  },
  {
    id: "child-care",
    icon: FiHome,
    emoji: "🏠",
    title: "Child & Orphan Care",
    categoryBadge: "Child & Orphan Welfare",
    description:
      "We support children who need care, protection, education, and a safe environment to grow with confidence and dignity.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=85",
    imageAlt: "Smiling children receiving warm community support",
    iconColor: "text-brand-navy",
    bgColor: "bg-brand-navy/10",
    accentColor: "bg-brand-navy",
    rightHighlight: {
      tag: "Shelter & Child Protection",
      headline: "Safe Havens, Daily Nutrition & Pediatric Care",
      description:
        "Providing balanced meals, clean shelter infrastructure, regular pediatric checkups, and emotional counseling to vulnerable and orphaned children.",
      stat: "1,200+ Children Sheltered",
      programLink: "/programs/orphanage",
    },
  },
  {
    id: "senior-care",
    icon: FiHeart,
    emoji: "👵",
    title: "Elderly Care",
    categoryBadge: "Elder Care & Dignity",
    description:
      "We provide support and care for elderly people, helping them live with dignity, comfort, and companionship.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=85",
    imageAlt: "Caring hands supporting an elderly woman with warmth",
    iconColor: "text-brand-red",
    bgColor: "bg-brand-red-light",
    accentColor: "bg-brand-red",
    rightHighlight: {
      tag: "Elder Comfort & Medicine",
      headline: "Restoring Dignity, Healthcare & Companionship",
      description:
        "Doorstep chronic medicine packages, free wheelchairs and walkers, old age home infrastructure upgrades, and regular companion visits.",
      stat: "850+ Elders Supported",
      programLink: "/programs/old-age",
    },
  },
  {
    id: "medical-support",
    icon: FiActivity,
    emoji: "🏥",
    title: "Medical Support",
    categoryBadge: "Healthcare & Emergency Aid",
    description:
      "We help individuals and families facing medical challenges by supporting essential healthcare and medical needs.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85",
    imageAlt: "Healthcare worker offering checkup at rural camp",
    iconColor: "text-brand-navy",
    bgColor: "bg-brand-navy/10",
    accentColor: "bg-brand-navy",
    rightHighlight: {
      tag: "Mobile Clinics & Surgery Grants",
      headline: "Lifesaving Diagnostics & Emergency Treatment",
      description:
        "Reaching remote settlements with doctor-equipped mobile vans, free prescription distribution, and emergency surgery sponsorships for underprivileged families.",
      stat: "3,200+ Families Assisted",
      programLink: "/programs/medical",
    },
  },
  {
    id: "social-service",
    icon: FiUsers,
    emoji: "🤝",
    title: "Social Service",
    categoryBadge: "Community Welfare & Relief",
    description:
      "We work with communities to respond to essential needs and support people facing difficult circumstances.",
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=900&q=85",
    imageAlt: "Community aid and relief distribution",
    iconColor: "text-brand-orange",
    bgColor: "bg-orange-50",
    accentColor: "bg-brand-orange",
    rightHighlight: {
      tag: "Rapid Relief & Self-Reliance",
      headline: "Crisis Food, Winter Warmth & Livelihood",
      description:
        "Emergency food and clean water during localized disasters, seasonal winter fleece blanket drives, and certified tailoring courses empowering women.",
      stat: "12,500+ Lives Reached",
      programLink: "/programs/social-service",
    },
  },
];

export default function HowWeHelp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // track if we're programmatically scrolling so IntersectionObserver doesn't fight
  const isProgrammaticScroll = useRef(false);

  // ── IntersectionObserver: detect which card is most in view ──────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        let bestRatio = 0;
        let bestIdx = activeIndex;
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestRatio > 0) {
          setActiveIndex(bestIdx);
        }
      },
      {
        root: scrollRef.current,
        threshold: [0.4, 0.6, 0.8, 1.0],
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Programmatically scroll to a specific card ───────────────────────────────
  const scrollToCard = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(services.length - 1, index));
    setActiveIndex(clamped);

    const card = cardRefs.current[clamped];
    const container = scrollRef.current;
    if (!card || !container) return;

    isProgrammaticScroll.current = true;
    const containerLeft = container.getBoundingClientRect().left;
    const cardLeft = card.getBoundingClientRect().left;
    const offset = cardLeft - containerLeft + container.scrollLeft;
    container.scrollTo({ left: offset, behavior: "smooth" });

    // Release flag after animation settles
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  }, []);

  const goLeft = () => scrollToCard(activeIndex - 1);
  const goRight = () => scrollToCard(activeIndex + 1);

  const active = services[activeIndex];

  return (
    <section id="how-we-help" className="bg-gray-50/70 py-16 sm:py-20 lg:py-20 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Scrollable Cards ─────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col min-w-0">

            {/* Header + arrows */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
              <div className="max-w-xl">
                <SectionLabel>How We Help</SectionLabel>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mt-1 mb-2 sm:mb-3">
                  Turning Compassion Into{" "}
                  <span className="text-brand-orange">Action</span>
                </h2>
                <p className="text-xs sm:text-base text-gray-500 leading-relaxed">
                  Scroll or tap a card to explore our programs.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-end flex-shrink-0">
                <button
                  onClick={goLeft}
                  disabled={activeIndex === 0}
                  aria-label="Previous program"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 hover:bg-brand-red hover:text-white hover:border-brand-red flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer group"
                >
                  <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={goRight}
                  disabled={activeIndex === services.length - 1}
                  aria-label="Next program"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-red text-white hover:bg-brand-red-dark flex items-center justify-center shadow-md transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer group"
                >
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Scrollable track */}
            <div
              ref={scrollRef}
              suppressHydrationWarning
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-5 sm:pb-6 pt-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-2 sm:px-2"
            >
              {services.map((item, i) => {
                const Icon = item.icon;
                const isActive = activeIndex === i;

                return (
                  <div
                    key={item.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    data-index={i}
                    onClick={() => scrollToCard(i)}
                    className={`w-[245px] sm:w-[280px] flex-shrink-0 snap-start rounded-3xl cursor-pointer flex flex-col overflow-hidden transition-all duration-300 group ${
                      isActive
                        ? "bg-white border-2 border-brand-red shadow-xl -translate-y-1.5 ring-4 ring-brand-red/15"
                        : "bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-1"
                    }`}
                  >
                    {/* Card image */}
                    <div className="relative h-44 w-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 260px, 280px"
                        className={`object-cover object-center transition-transform duration-700 ease-out ${
                          isActive ? "scale-105" : "group-hover:scale-105"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      {/* Emoji */}
                      <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-base shadow-sm">
                        {item.emoji}
                      </span>

                      {isActive && (
                        <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider bg-brand-red text-white px-2.5 py-1 rounded-full shadow">
                          Active
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className={`w-10 h-10 -mt-10 relative z-10 rounded-xl shadow-md flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${item.bgColor} ${item.iconColor}`}>
                          <Icon className="w-5 h-5" aria-hidden />
                        </div>
                        <h3 className={`text-base font-extrabold mb-1.5 leading-snug transition-colors ${
                          isActive ? "text-brand-red" : "text-brand-black group-hover:text-brand-red"
                        }`}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-gray-400">
                          {item.categoryBadge}
                        </span>
                        <Link
                          href={item.rightHighlight.programLink}
                          onClick={(e) => e.stopPropagation()}
                          className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                        >
                          <span>Explore ›</span>
                        </Link>
                        <span className={`hidden lg:inline text-xs font-bold transition-colors ${
                          isActive ? "text-brand-red" : "text-gray-400 group-hover:text-brand-red"
                        }`}>
                          {isActive ? "Viewing ›" : "Tap to view ›"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot indicators + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-2">
              <div className="flex items-center gap-2">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to ${services[idx].title}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? "w-8 bg-brand-red"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <Button href="/programs" size="sm" variant="outline">
                <span>View All 5 Programs</span>
                <FiArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* ── RIGHT: Synchronized Sticky Showcase (Desktop only, increased height) ── */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white lg:min-h-[580px] xl:min-h-[640px] bg-brand-black flex flex-col justify-end group"
              >
                {/* Background image */}
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/55 to-black/20 pointer-events-none" />

                {/* Top badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow text-xs font-black text-brand-black">
                    <span className={`w-2.5 h-2.5 rounded-full ${active.accentColor}`} />
                    {active.categoryBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-[11px] font-bold text-white border border-white/20">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 p-6 sm:p-8 lg:p-9 text-white">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-brand-red text-white text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow">
                    {active.rightHighlight.tag}
                  </span>

                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug text-white mb-3">
                    {active.rightHighlight.headline}
                  </h4>

                  <p className="text-xs sm:text-sm lg:text-[15px] text-gray-200 leading-relaxed mb-6">
                    {active.rightHighlight.description}
                  </p>

                  <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-brand-red-light bg-brand-red/30 px-3.5 py-1.5 rounded-full border border-brand-red/40">
                      {active.rightHighlight.stat}
                    </span>

                    <Link
                      href={active.rightHighlight.programLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-red text-brand-black hover:text-white text-xs sm:text-sm font-bold shadow-lg transition-all duration-200 group/btn"
                    >
                      <span>Learn More</span>
                      <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
