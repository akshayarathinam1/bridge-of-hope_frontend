'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/sections/CtaBanner";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiHeart,
  FiBookOpen,
  FiUserCheck,
  FiActivity,
  FiUsers,
  FiSmile,
  FiAward,
  FiShield,
  FiFeather,
  FiHeadphones,
  FiHelpCircle,
  FiTrendingUp,
  FiClock,
  FiTool,
  FiVolume2,
} from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-brand-black">
      {/* ─────────────────────────────────────────────────────────────
          1. PAGE HEADER & INTRO: Building a Better Tomorrow, Together
      ───────────────────────────────────────────────────────────── */}
      <PageHeader
        title="About Us"
        subtitle="At Bridge of Hope, we believe that every person deserves the opportunity to live with dignity, hope, and purpose."
        breadcrumb="About Us"
      />

      {/* Hero Narrative & Visual Composition */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <SectionLabel>Bridge of Hope</SectionLabel>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-[1.15] tracking-tight mt-2 mb-6">
                Building a{" "}
                <span className="text-brand-red">Better Tomorrow,</span>{" "}
                <span className="text-brand-orange">Together</span>
              </h1>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                At Bridge of Hope, we believe that every person deserves the opportunity to live with dignity, hope, and purpose.
              </p>

              {/* Belief Pull Quote */}
              <div className="p-5 sm:p-6 rounded-2xl bg-brand-red-light/60 border-l-4 border-brand-red mb-6 shadow-sm">
                <p className="text-sm sm:text-base font-bold text-brand-black italic leading-snug">
                  &ldquo;Our work is rooted in a simple belief: when people come together to help one another, meaningful change becomes possible.&rdquo;
                </p>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                We work to support individuals and communities through education, child care, senior citizen support, medical assistance, and social service initiatives. Our aim is not only to provide immediate support, but also to create opportunities that can help people move towards a better future.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button href="/donate" size="lg">
                  <span>Donate Now</span>
                  <FiArrowUpRight className="w-5 h-5" />
                </Button>
                <Button href="/get-involved" variant="outline" size="lg">
                  <span>Become a Volunteer</span>
                  <FiArrowUpRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Right Column: 3-Photo Overlapping Collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-[460px] sm:h-[500px] w-full">
                {/* Main large photo */}
                <div className="absolute left-0 top-0 w-[78%] h-[340px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85"
                    alt="Smiling children receiving community aid"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
                </div>

                {/* Overlapping secondary photo */}
                <div className="absolute right-0 bottom-4 w-[65%] h-[240px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=85"
                    alt="Elderly care and companionship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating badge */}
                <div className="absolute -left-3 bottom-12 z-20 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white flex-shrink-0 font-black text-sm">
                      HB
                    </span>
                    <div>
                      <p className="text-xs font-bold text-brand-black uppercase tracking-wider">
                        100% Direct
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Grassroots Impact
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. WHY WE EXIST: Because Everyone Deserves a Helping Hand
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel>Why We Exist</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-4">
              Because Everyone Deserves a{" "}
              <span className="text-brand-orange">Helping Hand</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Many people face challenges that they cannot overcome alone.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: FiBookOpen,
                title: "Child Education",
                desc: "A child may need support to continue their education.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80",
              },
              {
                icon: FiHeart,
                title: "Elderly Care",
                desc: "An elderly person may need care and companionship.",
                image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&q=80",
              },
              {
                icon: FiActivity,
                title: "Medical Relief",
                desc: "A family may struggle to meet an unexpected medical need.",
                image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&q=80",
              },
              {
                icon: FiUsers,
                title: "Community Aid",
                desc: "A community may need support during a difficult time.",
                image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm text-brand-red flex items-center justify-center shadow-md">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="absolute bottom-3 left-4 right-4 text-base font-bold text-white drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
                <div className="p-5 flex-1 flex items-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Standalone Pledge Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-[#032a6a] text-white text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden border border-white/15"
          >
            {/* Background Image & Hero-matched overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80"
                alt="Community standing together in solidarity"
                fill
                className="object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
            </div>

            <div className="relative z-10">
              <p className="text-brand-red font-bold text-xs uppercase tracking-widest mb-3">
                Standing Together
              </p>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                Bridge of Hope exists to stand alongside people during these moments.
              </h3>
              <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Through compassion, community support, and meaningful action, we strive to bring hope where it is needed most.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. OUR MISSION & OUR VISION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel>Core Purpose</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2">
              Our Mission &amp;{" "}
              <span className="text-brand-orange">Our Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Our Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-gray-100 hover:border-brand-red/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-light text-brand-red text-xs font-bold uppercase tracking-wider mb-4">
                  <FiAward className="w-3.5 h-3.5" />
                  <span>Our Mission</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-black mb-4">
                  Turning Compassion Into Action
                </h3>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  Our mission is to serve people and communities in need by creating opportunities, providing essential support, and working towards a more caring and inclusive society.
                </p>

                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  We focus our efforts on areas where support can create a meaningful difference:
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Education and learning opportunities",
                    "Child and orphan care",
                    "Elderly care and support",
                    "Medical assistance",
                    "Community development",
                    "Social welfare initiatives",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                      <FiCheckCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-brand-red-dark group"
                >
                  <span>Support Our Mission</span>
                  <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Our Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#032a6a] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden border border-white/15 group"
            >
              {/* Background Image & Hero-matched overlays */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80"
                  alt="Bridge of Hope Vision for a better future"
                  fill
                  className="object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                  <FiSmile className="w-3.5 h-3.5 text-brand-red" />
                  <span>Our Vision</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  A Future Filled With Hope
                </h3>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  We envision a society where every child has access to education, every senior citizen can live with dignity, and people facing difficult circumstances can find the support they need.
                </p>

                {/* Highlight Quote Box */}
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-sm">
                  <p className="text-sm sm:text-base font-bold text-white leading-relaxed italic">
                    &ldquo;We want to build a community where helping others is not an occasional act, but a shared responsibility.&rdquo;
                  </p>
                </div>

                {/* Supporting photo thumbnail row */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-white/20 shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=700&q=80"
                    alt="Community learning together with hope"
                    fill
                    className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a] via-[#032a6a]/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Shared Responsibility · Lasting Impact
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/15 mt-6">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-white transition-colors group"
                >
                  <span>Join Our Community Vision</span>
                  <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. WHAT WE DO: Creating Impact Where It Matters
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-3">
              Creating Impact Where{" "}
              <span className="text-brand-orange">It Matters</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our initiatives focus on some of the most important needs within our communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Education",
                icon: FiBookOpen,
                desc: "We believe education can open doors to opportunities and transform lives. We support children and young people with educational resources and assistance wherever possible.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
                tag: "Learning & Future",
              },
              {
                title: "Child Care",
                icon: FiSmile,
                desc: "Every child deserves safety, care, education, and the opportunity to grow in a supportive environment. We work to provide support to children who need it most.",
                image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
                tag: "Safety & Dignity",
              },
              {
                title: "Elderly Care",
                icon: FiHeart,
                desc: "We believe growing older should come with dignity, care, and respect. Our initiatives aim to support elderly people with essential needs and compassionate care.",
                image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80",
                tag: "Comfort & Respect",
              },
              {
                title: "Medical Support",
                icon: FiActivity,
                desc: "Medical needs can place a significant burden on individuals and families. We work to provide assistance for essential healthcare needs wherever our resources allow.",
                image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80",
                tag: "Essential Health",
              },
              {
                title: "Social Service",
                icon: FiUsers,
                desc: "We respond to community needs through various social welfare initiatives, bringing people and resources together to support those facing difficult circumstances.",
                image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
                tag: "Welfare & Unity",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-brand-red text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-brand-black group-hover:text-brand-red transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-brand-red-dark group-hover:underline"
                  >
                    <span>Support {item.title}</span>
                    <FiArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. OUR VALUES
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel>Our Core Principles</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2">
              Our{" "}
              <span className="text-brand-orange">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Compassion",
                desc: "We listen, understand, and respond with empathy to people facing difficult circumstances.",
                icon: FiHeart,
              },
              {
                title: "Dignity",
                desc: "Every person we serve deserves respect, regardless of their circumstances.",
                icon: FiFeather,
              },
              {
                title: "Integrity",
                desc: "We believe trust is built through honesty, responsibility, and transparency.",
                icon: FiShield,
              },
              {
                title: "Service",
                desc: "We are committed to putting people and communities at the heart of everything we do.",
                icon: FiUserCheck,
              },
              {
                title: "Community",
                desc: "Lasting change happens when people come together. We believe everyone has a role to play.",
                icon: FiUsers,
              },
            ].map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-gray-50/70 border-2 border-gray-100 hover:border-brand-red hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center mb-5 shadow-md">
                    <val.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. OUR APPROACH: Listen. Support. Empower.
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#032a6a] text-white relative overflow-hidden">
        {/* Background Image & Hero-matched overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=85"
            alt="Bridge of Hope approach in community"
            fill
            className="object-cover object-center opacity-40"
          />
          {/* Blue mixed with white gradient overlays identical to hero */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
        </div>

        <div className="container-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel light>Our Approach</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 mb-3">
              Listen. Support.{" "}
              <span className="text-brand-orange">Empower.</span>
            </h2>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
              We believe meaningful social work begins by understanding what people actually need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Listen",
                desc: "We listen to individuals and communities to understand their challenges and priorities.",
                icon: FiHeadphones,
              },
              {
                step: "02",
                title: "Support",
                desc: "We connect people with the assistance and resources they need.",
                icon: FiHelpCircle,
              },
              {
                step: "03",
                title: "Empower",
                desc: "We aim to create opportunities that help individuals and communities move towards a more secure future.",
                icon: FiTrendingUp,
              },
            ].map((st, idx) => (
              <motion.div
                key={st.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-brand-red/60 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-brand-red">
                      {st.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/15 text-white group-hover:bg-brand-red flex items-center justify-center transition-colors shadow-inner">
                      <st.icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {st.title}
                  </h3>

                  <p className="text-gray-200 text-sm leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. OUR IMPACT: Together, We Are Making a Difference
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Our Impact</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-3">
              Together, We Are Making a{" "}
              <span className="text-brand-orange">Difference</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our journey is powered by the generosity of donors, volunteers, partners, and community members who believe in creating positive change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {[
              { count: "12,500+", label: "Lives Supported", desc: "Individuals assisted with emergency & sustained care" },
              { count: "4,800+", label: "Children Reached", desc: "Enrolled in school, after-school kits, and safe care" },
              { count: "3,200+", label: "Families Supported", desc: "Provided nutrition, healthcare, and livelihood relief" },
              { count: "150+", label: "Community Initiatives", desc: "Health camps, clean water, and civic welfare drives" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-gray-50 border-2 border-gray-100 text-center hover:border-brand-red transition-all duration-300 hover:shadow-xl group"
              >
                <p className="text-4xl sm:text-5xl font-black text-brand-red group-hover:scale-105 transition-transform duration-300 mb-2">
                  {stat.count}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-brand-black mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 italic">
            *Replace these figures with verified numbers before publishing.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. BE PART OF THE CHANGE: Hope Grows When We Share It
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-200/80">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel>Be Part of the Change</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-3">
              Hope Grows When{" "}
              <span className="text-brand-orange">We Share It</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              You don&rsquo;t have to do something extraordinary to make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: FiHeart,
                title: "A Donation",
                desc: "A donation can support someone's essential needs.",
              },
              {
                icon: FiClock,
                title: "Your Time",
                desc: "Your time can help someone feel supported.",
              },
              {
                icon: FiTool,
                title: "Your Skills",
                desc: "Your skills can help strengthen a community.",
              },
              {
                icon: FiVolume2,
                title: "Your Voice",
                desc: "Your voice can inspire someone else to care.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-red-light text-brand-red flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-brand-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom callout & buttons */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-base sm:text-lg font-bold text-brand-black mb-8">
              Together, we can turn small acts of kindness into meaningful change.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button href="/donate" size="lg">
                <span>Donate Now</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
              <Button href="/get-involved" variant="outline" size="lg">
                <span>Become a Volunteer</span>
                <FiArrowUpRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. A MESSAGE FROM US: Every Act of Kindness Matters
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-14 bg-[#032a6a] text-white shadow-2xl relative overflow-hidden text-center border border-white/15"
          >
            {/* Background Image & Hero-matched overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80"
                alt="Bridge of Hope community unity and compassion"
                fill
                className="object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
            </div>

            {/* Ambient red flare */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <SectionLabel light>A Message From Us</SectionLabel>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 mb-6">
                Every Act of Kindness{" "}
                <span className="text-brand-orange">Matters</span>
              </h2>

              <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                We may not be able to change the world overnight. But we can make a difference in someone&rsquo;s world today.
              </p>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                At Bridge of Hope, we are committed to continuing this journey with compassion, responsibility, and the support of people who believe that a better future is possible.
              </p>

              <div className="inline-block p-4 sm:p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md mb-8 shadow-sm">
                <p className="text-lg sm:text-xl font-black text-brand-red">
                  Thank you for believing in the power of hope.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-gray-300">
                  BRIDGE OF HOPE LEADERSHIP &amp; COMMUNITY
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. GLOBAL CALL TO ACTION BANNER (Zero yellow, brand red/black)
      ───────────────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
