'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/sections/CtaBanner";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiBookOpen,
  FiHeart,
  FiActivity,
  FiUsers,
  FiHome,
  FiAward,
  FiSmile,
} from "react-icons/fi";

interface ProgramDetail {
  id: string;
  category: string;
  title: string;
  titleHighlight: string;
  headline: string;
  description1: string;
  description2: string;
  image: string;
  imageAlt: string;
  icon: typeof FiBookOpen;
  iconBg: string;
  iconColor: string;
  stats: { label: string; value: string }[];
  deliverables: string[];
  donateCause: string;
}

const programsData: ProgramDetail[] = [
  {
    id: "education",
    category: "Education & Literacy",
    title: "Education For Every Child",
    titleHighlight: "Child",
    headline: "Unlocking Potential Through Knowledge, Tools & Mentorship",
    description1:
      "Education is the single most powerful tool to break generational cycles of poverty. Unfortunately, thousands of children from low-income families in our communities face severe hurdles—from lacking basic school kits and uniform funds to leaving school early due to economic hardship.",
    description2:
      "Our Education Initiative bridges these gaps through after-school learning hubs, complete school kit sponsorships, tuition fee aid, and mentorship camps. We work alongside government schools and village centers to ensure students not only stay enrolled, but thrive academically and build career aspirations.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=85",
    imageAlt: "Children actively learning and raising hands in classroom",
    icon: FiBookOpen,
    iconBg: "bg-orange-50",
    iconColor: "text-brand-orange",
    stats: [
      { label: "Students Supported", value: "4,800+" },
      { label: "Learning Kits Delivered", value: "6,500+" },
      { label: "Partner Schools", value: "42" },
    ],
    deliverables: [
      "Annual school supplies, bags, textbooks, and stationery distributions",
      "Remedial coaching centers for STEM and language proficiency",
      "Secondary school scholarship grants for meritorious students",
      "Digital literacy classrooms equipped with computers and internet access",
      "Career counseling and college guidance workshops for youth",
    ],
    donateCause: "education",
  },
  {
    id: "child-care",
    category: "Child & Orphan Welfare",
    title: "Child & Orphan Protection",
    titleHighlight: "Protection",
    headline: "Safe Havens, Nutritious Meals & Loving Care for Vulnerable Children",
    description1:
      "Every child deserves a secure childhood free from neglect, hunger, and instability. Abandoned, orphaned, or displaced children often lack access to balanced nutrition, emotional well-being, and safe residential environments necessary for healthy development.",
    description2:
      "Through our Child & Orphan Care Program, Bridge of Hope supports trusted children's shelters, foster care networks, and community daycare facilities. We guarantee full daily nutrition, medical checkups, emotional counseling, and recreational development so that every child grows up feeling cherished and protected.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=85",
    imageAlt: "Happy children smiling together at a community shelter",
    icon: FiHome,
    iconBg: "bg-brand-navy/10",
    iconColor: "text-brand-navy",
    stats: [
      { label: "Children Sheltered & Cared", value: "1,200+" },
      { label: "Care Centers Supported", value: "14" },
      { label: "Nutritious Meals Served", value: "120K+" },
    ],
    deliverables: [
      "Daily wholesome meal programs meeting pediatric nutritional standards",
      "Safe shelter infrastructure, clean bedding, and sanitary amenities",
      "Regular pediatric healthcare screenings and immunization drives",
      "Psychological counseling, art therapy, and trauma recovery sessions",
      "Recreational camps, music, sports, and festival celebrations",
    ],
    donateCause: "child-care",
  },
  {
    id: "senior-care",
    category: "Elder Care & Dignity",
    title: "Elderly Care",
    titleHighlight: "Care",
    headline: "Restoring Dignity, Medical Support & Companionship to Our Elders",
    description1:
      "Our seniors dedicated their lives to building families and communities, yet many now spend their golden years in isolation, battling chronic illnesses and facing financial distress without family support or pensions.",
    description2:
      "Bridge of Hope's Elderly Care initiative provides steady relief through subsidized geriatric medicine, monthly ration supplies, mobile healthcare visits, and companion care. We also assist old age homes with infrastructure upgrades, mobility aids, and organized social gatherings to prevent loneliness.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=85",
    imageAlt: "Caregiver gently holding the hand of an elderly woman",
    icon: FiHeart,
    iconBg: "bg-red-500/10",
    iconColor: "text-brand-red",
    stats: [
      { label: "Elders Supported", value: "850+" },
      { label: "Monthly Medical Kits", value: "600+" },
      { label: "Partner Old Age Homes", value: "9" },
    ],
    deliverables: [
      "Monthly delivery of chronic illness medications (diabetes, hypertension, arthritis)",
      "Free distribution of mobility aids including wheelchairs, walkers, and canes",
      "Regular geriatric health check-ups and vision/cataract screening camps",
      "Social companion visits, storytelling hours, and festival celebrations",
      "Emergency financial assistance for critical hospitalization expenses",
    ],
    donateCause: "senior-care",
  },
  {
    id: "medical-support",
    category: "Healthcare & Emergency Aid",
    title: "Medical & Healthcare Support",
    titleHighlight: "Support",
    headline: "Extending Lifesaving Healthcare to Underserved Communities",
    description1:
      "A sudden illness or medical emergency should never push a family into extreme poverty. Yet for thousands of daily-wage earners and rural households, out-of-pocket healthcare costs represent an insurmountable barrier to lifesaving treatment.",
    description2:
      "Our Medical Support program operates mobile medical vans, conducts free diagnosis and treatment camps in underserved settlements, and funds critical surgeries for underprivileged patients. We focus on preventive screening, maternal-child health, and emergency prescription distribution.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85",
    imageAlt: "Doctor examining a patient at a community medical health drive",
    icon: FiActivity,
    iconBg: "bg-brand-navy/10",
    iconColor: "text-brand-navy",
    stats: [
      { label: "Families Assisted", value: "3,200+" },
      { label: "Free Health Camps Held", value: "150+" },
      { label: "Critical Surgeries Funded", value: "180+" },
    ],
    deliverables: [
      "Free multispecialty mobile health clinics reaching remote villages",
      "Maternal and child wellness checkups with vitamin & iron supplements",
      "Subsidized and sponsored surgeries for critical pediatric and trauma cases",
      "Free diagnostic screenings for early diabetes, hypertension, and vision problems",
      "Emergency medical response fund for unforeseen life-threatening crises",
    ],
    donateCause: "medical-support",
  },
  {
    id: "social-service",
    category: "Community Welfare & Relief",
    title: "Community Social Service",
    titleHighlight: "Service",
    headline: "Rapid Relief, Disaster Aid & Sustainable Grassroots Development",
    description1:
      "When unexpected hardships strike—whether climate disasters, extreme winters, or severe economic disruptions—vulnerable families bear the brunt. Rapid, organized community intervention is essential to stabilize affected households.",
    description2:
      "Bridge of Hope's Social Service teams work actively on the frontlines: organizing blanket drives during harsh winters, dry ration kits during localized crises, clean drinking water installations, and skill workshops for women seeking financial independence. We empower neighborhoods from within.",
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=900&q=85",
    imageAlt: "Volunteers distributing food and relief packages to community members",
    icon: FiUsers,
    iconBg: "bg-orange-50",
    iconColor: "text-brand-orange",
    stats: [
      { label: "Community Members Reached", value: "12,500+" },
      { label: "Relief Drives Conducted", value: "75+" },
      { label: "Ration Kits Distributed", value: "8,200+" },
    ],
    deliverables: [
      "Emergency disaster relief with ready-to-eat meals, potable water, and hygiene kits",
      "Annual winter warmth campaigns providing thermal blankets and clothing",
      "Women's vocational training in tailoring, handicrafts, and micro-enterprises",
      "Clean drinking water filtration systems installed in community halls and schools",
      "Sanitation and hygiene awareness programs across rural hamlets",
    ],
    donateCause: "social-service",
  },
];

const impactStats = [
  {
    number: "12,500+",
    label: "Lives Supported",
    description: "Holistic aid, relief, and developmental support provided",
    icon: FiSmile,
  },
  {
    number: "4,800+",
    label: "Children Reached",
    description: "Empowered with schooling, uniforms, and learning resources",
    icon: FiBookOpen,
  },
  {
    number: "3,200+",
    label: "Families Assisted",
    description: "Direct healthcare interventions and emergency sustenance",
    icon: FiHeart,
  },
  {
    number: "150+",
    label: "Community Drives",
    description: "Health camps, food drives, and disaster response campaigns",
    icon: FiAward,
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white text-brand-black">
      {/* ─────────────────────────────────────────────────────────────
          1. PAGE HEADER
      ───────────────────────────────────────────────────────────── */}
      <PageHeader
        title="Our Programs"
        subtitle="Five core initiatives dedicated to empowering children, elders, families, and communities with dignity, care, and opportunity."
        breadcrumb="Programs"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. PROGRAMS OVERVIEW & QUICK-NAV
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50 border-b border-gray-200">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <SectionLabel>Our Strategic Approach</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-4">
              Direct, Measurable &amp;{" "}
              <span className="text-brand-orange">Sustainable Impact</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We design our programs to deliver both immediate crisis relief and sustainable long-term pathways out of poverty. Explore each program below to discover how our community-driven interventions make a difference.
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {programsData.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:border-brand-red hover:bg-brand-red hover:text-white transition-all duration-200 text-sm font-bold text-gray-700 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${item.iconBg} ${item.iconColor} group-hover:bg-white/20 group-hover:text-white transition-colors`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{item.category.split("&")[0].trim()}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3–7. DETAILED PROGRAM SECTIONS (Alternating 2-Column)
      ───────────────────────────────────────────────────────────── */}
      <div className="divide-y divide-gray-100">
        {programsData.map((prog, index) => {
          const isEven = index % 2 === 1;
          const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50/70";

          return (
            <section
              key={prog.id}
              id={prog.id}
              className={`py-20 lg:py-24 ${bgClass} scroll-mt-24 transition-colors`}
            >
              <div className="container-site">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Photo Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="relative group">
                      {/* Image Container with Framing */}
                      <div className="relative h-[380px] sm:h-[450px] lg:h-[490px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <Image
                          src={prog.image}
                          alt={prog.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 42vw"
                        />
                        {/* Gradient Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        {/* Category badge pinned to photo */}
                        <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-extrabold text-brand-black">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              prog.id === "education"
                                ? "bg-brand-orange"
                                : prog.id === "child-care"
                                ? "bg-brand-navy"
                                : prog.id === "senior-care"
                                ? "bg-brand-red"
                                : prog.id === "medical-support"
                                ? "bg-brand-navy"
                                : "bg-brand-orange"
                            }`}
                          />
                          <span>{prog.category}</span>
                        </div>

                        {/* Micro stat bottom bar on photo */}
                        <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold">
                              Direct Beneficiaries
                            </p>
                            <p className="text-xl font-black text-white">
                              {prog.stats[0].value}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-brand-red-light bg-brand-red/20 px-3 py-1 rounded-full border border-brand-red/30">
                            Active Program
                          </span>
                        </div>
                      </div>

                      {/* Decorative Background Glow Element */}
                      <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red/10 to-transparent rounded-3xl -z-10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>

                  {/* Narrative & Details Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                  >
                    {/* Category Label */}
                    <SectionLabel>{prog.category}</SectionLabel>

                    {/* Program Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-black text-brand-black tracking-tight leading-tight mt-1 mb-3">
                      {prog.title.replace(prog.titleHighlight, "").trim()}{" "}
                      <span className="text-brand-orange">{prog.titleHighlight}</span>
                    </h2>

                    {/* Subheadline */}
                    <h3 className="text-lg sm:text-xl font-bold text-brand-red mb-5 leading-snug">
                      {prog.headline}
                    </h3>

                    {/* Narrative Paragraphs */}
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                      {prog.description1}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {prog.description2}
                    </p>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm mb-6">
                      {prog.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="text-center sm:text-left">
                          <p className="text-lg sm:text-2xl font-black text-brand-black">
                            {stat.value}
                          </p>
                          <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Deliverables / Checklist */}
                    <div className="mb-8">
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 mb-3.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        What We Provide
                      </h4>
                      <ul className="space-y-2.5">
                        {prog.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-snug"
                          >
                            <FiCheckCircle className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Button href={`/programs/${prog.id}`} size="md">
                        <span>Explore Full Program</span>
                        <FiArrowUpRight className="w-4 h-4" />
                      </Button>
                      <Button href={`/donate?cause=${prog.donateCause}`} variant="outline" size="md">
                        <span>Donate Now</span>
                        <FiArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          8. IMPACT NUMBERS STRIP (Consolidated Footprint)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#032a6a] text-white relative overflow-hidden" suppressHydrationWarning>
        {/* Background Image & Hero-matched overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none" suppressHydrationWarning>
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=85"
            alt="Bridge of Hope Consolidated Community Footprint"
            fill
            className="object-cover object-center opacity-35"
          />
          {/* Blue mixed with white gradient overlays identical to hero */}
          <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/85 via-[#0e3b82]/60 to-white/20" />
          <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/75 via-transparent to-white/20" />
          <div suppressHydrationWarning className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
        </div>

        <div className="container-site relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel light>Consolidated Footprint</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-2 mb-4">
              Our Collective Reach &amp;{" "}
              <span className="text-brand-orange">Impact</span>
            </h2>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Every initiative connects directly with real lives, real families, and real futures. Here is what we have accomplished together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {impactStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative p-7 sm:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-brand-red/60 hover:bg-white/15 transition-all duration-300 group shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-brand-red mb-5 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <p className="text-3xl sm:text-4xl font-black text-brand-red mb-2 tracking-tight group-hover:text-white transition-colors">
                    {stat.number}
                  </p>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. CTA BANNER
      ───────────────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
