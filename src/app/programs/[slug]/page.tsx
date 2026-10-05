'use client';

import { use } from "react";
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
  FiBookOpen,
  FiHeart,
  FiActivity,
  FiUsers,
  FiHome,
  FiAward,
  FiArrowLeft,
} from "react-icons/fi";

interface ProgramPillar {
  title: string;
  description: string;
}

interface ProgramInfo {
  id: string;
  slugs: string[];
  tag: string;
  title: string;
  titleHighlight: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  heroImage: string;
  secondaryImage: string;
  heroImageAlt: string;
  icon: typeof FiBookOpen;
  iconColor: string;
  iconBg: string;
  donateCause: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  pillars: ProgramPillar[];
  deliverables: string[];
  story: {
    quote: string;
    person: string;
    role: string;
  };
}

const programsDatabase: Record<string, ProgramInfo> = {
  education: {
    id: "education",
    slugs: ["education"],
    tag: "Education & Literacy",
    title: "Education For Every Child",
    titleHighlight: "Child",
    headline: "Unlocking Potential Through Knowledge, Tools & Mentorship",
    headlineHighlight: "Mentorship",
    subtitle:
      "Empowering underprivileged children across communities with school supplies, remedial study centers, digital literacy labs, and merit scholarships.",
    heroImage:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
    heroImageAlt: "School children learning and raising hands in classroom",
    icon: FiBookOpen,
    iconColor: "text-brand-orange",
    iconBg: "bg-orange-50",
    donateCause: "education",
    stats: [
      { label: "Students Supported", value: "4,800+" },
      { label: "Partner Schools", value: "42" },
      { label: "School Kits Delivered", value: "6,500+" },
      { label: "Continuation Rate", value: "94%" },
    ],
    challenge:
      "In low-income neighborhoods and rural villages, children face severe economic obstacles that threaten their education. Families often struggle to afford basic textbooks, notebooks, school bags, and uniform fees. Without academic support at home or access to modern digital tools, many promising students fall behind and are forced to leave school early to support their households.",
    solution:
      "Bridge of Hope's Education Program intervenes at every stage of a child's academic journey. We establish community after-school study centers staffed by qualified tutors, sponsor full school kits every academic year, install computer labs, and award secondary scholarships to ensure that financial hardship never ends a child's education.",
    pillars: [
      {
        title: "Annual School Kit Sponsorship",
        description:
          "Providing complete sets of high-grade textbooks, notebooks, geometry boxes, school bags, and uniforms at the start of each academic year.",
      },
      {
        title: "Remedial Learning Hubs",
        description:
          "Daily after-school study centers focused on building foundational mathematics, science, and regional language proficiency for grades 1 through 10.",
      },
      {
        title: "Digital Literacy Classrooms",
        description:
          "Setting up computers, internet access, and interactive digital curriculums so students gain modern technical skills early in life.",
      },
      {
        title: "Higher Secondary Scholarships",
        description:
          "Merit-and-need-based tuition assistance ensuring meritorious students from low-income families can complete high school and prepare for college.",
      },
    ],
    deliverables: [
      "School supplies, backpacks, stationery, and textbook sets distributed annually",
      "Daily guided tutoring and homework assistance with qualified mentors",
      "Nutritious evening snack provided to each child attending study sessions",
      "Science exhibitions, quiz competitions, and creative arts workshops",
      "One-on-one career counseling and college admissions guidance for high schoolers",
    ],
    story: {
      quote:
        "When my father passed away, my family could not afford my books or school fees. Bridge of Hope gave me my school kit and welcomed me to the evening study center. With the tutors' guidance, I scored 91% in my 10th grade exams. Today I am studying science and dreaming of becoming a doctor.",
      person: "Ananya R.",
      role: "Student, Class 11 Beneficiary",
    },
  },

  "old-age": {
    id: "old-age",
    slugs: ["old-age", "senior-care"],
    tag: "Elder Care & Dignity",
    title: "Elderly Care & Dignity",
    titleHighlight: "Dignity",
    headline: "Restoring Comfort, Medical Care & Companionship to Our Elders",
    headlineHighlight: "Our Elders",
    subtitle:
      "Ensuring vulnerable, abandoned, and low-income senior citizens live their twilight years surrounded by medical care, nourishment, and dignity.",
    heroImage:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    heroImageAlt: "Elderly person smiling while holding hands with a compassionate caregiver",
    icon: FiHeart,
    iconColor: "text-brand-red",
    iconBg: "bg-red-500/10",
    donateCause: "senior-care",
    stats: [
      { label: "Elders Supported", value: "850+" },
      { label: "Partner Old Age Homes", value: "9" },
      { label: "Monthly Medical Kits", value: "600+" },
      { label: "Mobility Aids Provided", value: "140+" },
    ],
    challenge:
      "Countless senior citizens in our society spend their advanced years battling chronic untreated illnesses, severe isolation, and poverty. Many have no pensions, living relatives, or financial security, leaving them unable to afford vital medicines for conditions like diabetes, hypertension, and arthritis.",
    solution:
      "Our Elderly Care initiative delivers regular, dignified assistance directly to elders living alone and in partner care homes. We provide free monthly chronic illness medication, mobility equipment like wheelchairs and walking canes, nutritional ration supplies, and regular companion visits.",
    pillars: [
      {
        title: "Chronic Medicine Sponsorship",
        description:
          "Ensuring uninterrupted monthly deliveries of prescribed cardiovascular, diabetes, arthritis, and vision medications to elderly beneficiaries.",
      },
      {
        title: "Mobility & Comfort Aids",
        description:
          "Free distribution of customized wheelchairs, walkers, canes, hearing aids, and orthopedic mattresses to restore independent movement.",
      },
      {
        title: "Old Age Home Upgrades",
        description:
          "Assisting partner senior shelters with clean drinking water filtration, hygiene amenities, geysers, and emergency medical response equipment.",
      },
      {
        title: "Companion & Recreational Visits",
        description:
          "Organizing weekly youth companion visits, storytelling circles, festival celebrations, and musical afternoons to combat geriatric loneliness.",
      },
    ],
    deliverables: [
      "Free monthly doorstep delivery of vital chronic medication packages",
      "Regular geriatric health check-ups and cataract screening camps",
      "Distribution of adult diapers, hygiene supplies, and nutritional supplements",
      "Festive community meals, cultural programs, and recreational outings",
      "Emergency financial support for urgent hospitalization and surgeries",
    ],
    story: {
      quote:
        "After my wife passed away and my joints deteriorated, I could not walk or afford my diabetes medicines. Bridge of Hope volunteers brought me a walker and deliver my medicines every single month without fail. They make me feel like I have family again.",
      person: "Murugan S., 74",
      role: "Elderly Program Beneficiary",
    },
  },

  orphanage: {
    id: "orphanage",
    slugs: ["orphanage", "child-care"],
    tag: "Child Welfare & Protection",
    title: "Child & Orphan Protection",
    titleHighlight: "Protection",
    headline: "Safe Shelters, Nutritious Meals & Loving Environments",
    headlineHighlight: "Loving Environments",
    subtitle:
      "Providing orphaned, abandoned, and vulnerable children with secure living conditions, pediatric healthcare, nutritious food, and holistic care.",
    heroImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    heroImageAlt: "Children smiling joyfully together in a community shelter",
    icon: FiHome,
    iconColor: "text-brand-navy",
    iconBg: "bg-brand-navy/10",
    donateCause: "child-care",
    stats: [
      { label: "Children Sheltered", value: "1,200+" },
      { label: "Partner Shelters", value: "14" },
      { label: "Annual Meals Served", value: "120K+" },
      { label: "Immunization Rate", value: "100%" },
    ],
    challenge:
      "Children who lose parental care or are abandoned due to extreme poverty face severe emotional vulnerability, malnutrition, and developmental hurdles. Without stable shelter, wholesome food, and psychological support, their fundamental childhood rights are compromised.",
    solution:
      "Bridge of Hope collaborates with verified children's homes and community daycares to ensure every child has a secure bed, a nutritious pediatric diet, comprehensive medical oversight, and trauma counseling. We believe every child deserves to feel safe, loved, and encouraged to reach their full potential.",
    pillars: [
      {
        title: "Complete Pediatric Nutrition",
        description:
          "Daily meals designed by pediatric nutritionists featuring balanced protein, fresh fruits, vegetables, and milk for healthy physical and cognitive growth.",
      },
      {
        title: "Shelter & Sanitation Infrastructure",
        description:
          "Renovating dormitories, clean sanitation facilities, bedding, water filtration units, and recreational spaces across partner orphanages.",
      },
      {
        title: "Healthcare & Developmental Screenings",
        description:
          "Quarterly medical checkups, dental screening, eye tests, and universal immunization tracking by volunteer pediatricians.",
      },
      {
        title: "Emotional Healing & Creative Arts",
        description:
          "Professional trauma therapy, art and music sessions, sports coaching, and educational field trips to foster confidence and joy.",
      },
    ],
    deliverables: [
      "Three wholesome, nutritious meals and daily evening snacks per child",
      "Clean, comfortable bedding, seasonal clothing, and personal hygiene kits",
      "Full pediatric medical screenings, vaccinations, and dental checkups",
      "Weekend sports coaching, music lessons, drawing, and extracurriculars",
      "Safe festival celebrations, birthday commemorations, and gift distributions",
    ],
    story: {
      quote:
        "When Siddharth arrived at our partner shelter at age 6, he was underweight and wouldn't speak to anyone. With steady meals, art classes, and loving mentors, he has transformed. Today he is 10, loves drawing, and leads his shelter's football team.",
      person: "Kavitha R.",
      role: "Shelter Superintendent & Volunteer",
    },
  },

  medical: {
    id: "medical",
    slugs: ["medical", "medical-support"],
    tag: "Healthcare & Emergency Aid",
    title: "Medical & Healthcare Support",
    titleHighlight: "Support",
    headline: "Extending Lifesaving Healthcare to Underserved Communities",
    headlineHighlight: "Underserved Communities",
    subtitle:
      "Organizing mobile health camps, subsidizing chronic treatments, and sponsoring urgent surgeries for low-income families.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
    heroImageAlt: "Doctor performing medical examination at a rural health camp",
    icon: FiActivity,
    iconColor: "text-brand-navy",
    iconBg: "bg-brand-navy/10",
    donateCause: "medical-support",
    stats: [
      { label: "Families Assisted", value: "3,200+" },
      { label: "Free Health Camps", value: "150+" },
      { label: "Surgeries Sponsored", value: "180+" },
      { label: "Free Medicines Given", value: "15K+" },
    ],
    challenge:
      "Out-of-pocket medical emergencies remain the leading cause of sudden catastrophic poverty for daily-wage households in India. Low-income families often delay seeking diagnosis until treatable illnesses turn life-threatening, simply because they cannot afford doctor fees or prescriptions.",
    solution:
      "Our Medical Support initiative brings doctors, diagnostic testing, and free medicines right into rural hamlets and informal settlements via mobile medical vans. For acute cases, our Emergency Medical Fund covers hospital bills and lifesaving surgeries for underprivileged children and adults.",
    pillars: [
      {
        title: "Mobile Health Clinics",
        description:
          "Equipped medical vans staffed with general physicians, nurses, and pharmacists visiting remote villages and settlements on regular schedules.",
      },
      {
        title: "Emergency Surgery Grants",
        description:
          "Sponsoring high-risk surgical procedures for congenital cardiac defects, pediatric anomalies, cancer care, and trauma emergencies.",
      },
      {
        title: "Preventive Diagnostic Drives",
        description:
          "Conducting free screenings for diabetes, hypertension, anemia, tuberculosis, and refractive vision errors in underserved communities.",
      },
      {
        title: "Maternal & Infant Wellness",
        description:
          "Providing expectant and nursing mothers with prenatal vitamins, iron supplements, nutrition counseling, and safe hospital delivery aid.",
      },
    ],
    deliverables: [
      "Free medical consultations and prescription medication distribution",
      "Multispecialty diagnostic testing (blood sugar, BP, ECG, and eye testing)",
      "Direct sponsorship of emergency surgical and intensive care hospitalizations",
      "Distribution of maternal nutritional kits and infant care essentials",
      "First aid and basic healthcare hygiene workshops for rural families",
    ],
    story: {
      quote:
        "When my two-year-old daughter was diagnosed with a congenital heart defect, private hospitals quoted ₹2.5 lakhs—more than five years of my income. Bridge of Hope stepped in immediately and covered the entire surgical cost. Today my daughter runs and laughs like any other healthy child.",
      person: "Venkatesh K.",
      role: "Father of Priya (Surgery Beneficiary)",
    },
  },

  "social-service": {
    id: "social-service",
    slugs: ["social-service", "social-services"],
    tag: "Community Welfare & Relief",
    title: "Community Social Service & Relief",
    titleHighlight: "Relief",
    headline: "Rapid Relief, Disaster Aid & Sustainable Grassroots Development",
    headlineHighlight: "Grassroots Development",
    subtitle:
      "Delivering immediate disaster response, winter warmth drives, clean drinking water installations, and women's self-reliance training.",
    heroImage:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    heroImageAlt: "Volunteers distributing food relief packages to community members",
    icon: FiUsers,
    iconColor: "text-brand-orange",
    iconBg: "bg-orange-50",
    donateCause: "social-service",
    stats: [
      { label: "Community Members", value: "12,500+" },
      { label: "Relief Drives Held", value: "75+" },
      { label: "Ration Kits Given", value: "8,200+" },
      { label: "Women Empowered", value: "350+" },
    ],
    challenge:
      "Extreme weather shocks, regional floods, harsh winter cold, and systemic marginalization leave vulnerable communities in acute distress. In times of localized disasters, families lose their homes, dry food reserves, and clean water sources within hours.",
    solution:
      "Bridge of Hope's Social Service brigades operate on the frontlines of humanitarian need. We mobilize rapid disaster aid with food and potable water, run annual winter warmth campaigns, install community water filters, and conduct vocational training so women can earn sustainable livelihoods.",
    pillars: [
      {
        title: "Disaster Emergency Response",
        description:
          "Rapid ground response during floods, cyclones, and fires—distributing dry ration kits, potable water bottles, and hygiene kits within 24 hours.",
      },
      {
        title: "Winter Warmth Campaign",
        description:
          "Distributing thousands of thermal fleece blankets, sweaters, and protective clothing to homeless individuals and rural families during winter.",
      },
      {
        title: "Clean Water Infrastructure",
        description:
          "Installing multi-stage community water filtration systems in village centers and municipal schools to prevent waterborne diseases.",
      },
      {
        title: "Women's Vocational Livelihood",
        description:
          "Offering certified tailoring, handicraft, and micro-enterprise courses empowering women from marginalized families to achieve financial independence.",
      },
    ],
    deliverables: [
      "Emergency disaster relief packages with dry food, water, and sanitary kits",
      "Annual winter distribution of heavy fleece blankets and warm clothing",
      "Sustainable reverse osmosis water purification plants in rural centers",
      "Free sewing machines and tailoring certifications for vocational graduates",
      "Sanitation, clean environment, and waste segregation community campaigns",
    ],
    story: {
      quote:
        "After our small roadside shop was destroyed during the monsoon floods, we had no savings. Bridge of Hope provided our family with dry rations and enrolled me in their free tailoring program. Today, I sew school uniforms and earn enough to educate my two children with dignity.",
      person: "Lakshmi M.",
      role: "Vocational Program Graduate & Tailor",
    },
  },
};

// Map alternate slug aliases
function resolveProgram(slug: string): ProgramInfo {
  const normalized = slug.toLowerCase().trim();
  if (normalized === "senior-care" || normalized === "old-age") {
    return programsDatabase["old-age"];
  }
  if (normalized === "child-care" || normalized === "orphanage") {
    return programsDatabase["orphanage"];
  }
  if (normalized === "medical-support" || normalized === "medical") {
    return programsDatabase["medical"];
  }
  if (normalized === "social-services" || normalized === "social-service") {
    return programsDatabase["social-service"];
  }
  return programsDatabase[normalized] || programsDatabase["education"];
}

const otherProgramsList = [
  { slug: "education", title: "Education For Every Child", tag: "Education & Literacy", icon: FiBookOpen },
  { slug: "old-age", title: "Elderly Care", tag: "Elder Care & Dignity", icon: FiHeart },
  { slug: "orphanage", title: "Child & Orphan Protection", tag: "Child Welfare", icon: FiHome },
  { slug: "medical", title: "Medical & Healthcare Support", tag: "Healthcare Aid", icon: FiActivity },
  { slug: "social-service", title: "Community Social Service", tag: "Community Relief", icon: FiUsers },
];

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const prog = resolveProgram(resolvedParams.slug);
  const ProgIcon = prog.icon;

  return (
    <main className="min-h-screen bg-white text-brand-black">
      {/* ─────────────────────────────────────────────────────────────
          1. DEDICATED PAGE HEADER
      ───────────────────────────────────────────────────────────── */}
      <PageHeader
        title={prog.title}
        titleHighlight={prog.titleHighlight}
        subtitle={prog.subtitle}
        breadcrumb={prog.tag}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. PROGRAM HERO SHOWCASE & KEY METRICS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-site">
          {/* Back to all programs link */}
          <div className="mb-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-brand-red transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to All Programs</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <SectionLabel>{prog.tag}</SectionLabel>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight leading-tight mt-1 mb-4">
                {prog.headlineHighlight && prog.headline.includes(prog.headlineHighlight) ? (
                  <>
                    {prog.headline.split(prog.headlineHighlight)[0]}
                    <span className="text-brand-orange">{prog.headlineHighlight}</span>
                    {prog.headline.split(prog.headlineHighlight).slice(1).join(prog.headlineHighlight)}
                  </>
                ) : (
                  prog.headline
                )}
              </h1>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {prog.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href={`/donate?cause=${prog.donateCause}`} size="lg">
                  <span>Support This Program</span>
                  <FiArrowUpRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  <span>Volunteer In This Cause</span>
                  <FiArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Right Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative h-[380px] sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src={prog.heroImage}
                  alt={prog.heroImageAlt}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/75 via-transparent to-transparent" />

                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-extrabold text-brand-black">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                  <span>{prog.tag}</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold">
                      Direct Beneficiaries
                    </p>
                    <p className="text-xl font-black text-white">
                      {prog.stats[0].value}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-red-light bg-brand-red/20 px-3 py-1 rounded-full border border-brand-red/30">
                    Active Initiative
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-gray-200">
            {prog.stats.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 text-center sm:text-left"
              >
                <p className="text-3xl sm:text-4xl font-black text-brand-black mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THE CHALLENGE & OUR SOLUTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionLabel>The Reality On The Ground</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight leading-tight">
                Understanding The{" "}
                <span className="text-brand-orange">Challenge</span>
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {prog.challenge}
              </p>

              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                <h3 className="text-lg font-extrabold text-brand-red mb-2">
                  Our Community-First Solution
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {prog.solution}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[360px] sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src={prog.secondaryImage}
                  alt={prog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. KEY OPERATIONAL PILLARS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionLabel>How We Operate</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-1 mb-3">
              Four Core Pillars of the{" "}
              <span className="text-brand-orange">Program</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Each pillar ensures our work is structured, measurable, and impactful over the long term.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prog.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-gray-50 border border-gray-200/90 hover:border-brand-red/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-red-light flex items-center justify-center text-brand-red mb-5 font-black text-lg">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-black mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. WHAT WE PROVIDE (DELIVERABLES) & BENEFICIARY STORY
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Deliverables Checklist */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm">
              <SectionLabel>Tangible Aid</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mt-1 mb-6">
                What We Provide{" "}
                <span className="text-brand-orange">Directly</span>
              </h2>
              <ul className="space-y-4">
                {prog.deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3.5 text-sm text-gray-700 leading-relaxed">
                    <FiCheckCircle className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Spotlight / Story (Real Lives Changed) */}
            <div className="lg:col-span-6 bg-[#032a6a] text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl border border-white/15 group" suppressHydrationWarning>
              {/* Background Image & Hero-matched overlays */}
              <div className="absolute inset-0 z-0 pointer-events-none" suppressHydrationWarning>
                <Image
                  src={prog.heroImage}
                  alt={`${prog.title} - Real Lives Changed`}
                  fill
                  className="object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-700"
                />
                <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/85 via-[#0e3b82]/65 to-[#032a6a]/80" />
                <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/70 via-transparent to-white/15" />
                <div suppressHydrationWarning className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
              </div>

              {/* Ambient flare */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-white mb-4">
                  <FiAward className="w-4 h-4 text-brand-red" />
                  <span>Real Lives Changed</span>
                </span>
                <blockquote className="text-base sm:text-lg italic text-gray-100 leading-relaxed mb-6 font-medium">
                  &ldquo;{prog.story.quote}&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-white/15">
                  <p className="font-extrabold text-white text-base">
                    {prog.story.person}
                  </p>
                  <p className="text-xs text-gray-300">
                    {prog.story.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. EXPLORE OTHER PROGRAMS QUICK SWITCHER
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <SectionLabel>Discover More</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                Explore Other{" "}
                <span className="text-brand-orange">Initiatives</span>
              </h2>
            </div>
            <Button href="/programs" variant="outline" size="sm">
              <span>View All 5 Programs</span>
              <FiArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProgramsList
              .filter((item) => !prog.slugs.includes(item.slug))
              .map((other) => {
                const OtherIcon = other.icon;
                return (
                  <Link
                    key={other.slug}
                    href={`/programs/${other.slug}`}
                    className="p-5 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-brand-red/40 hover:shadow-lg transition-all duration-200 group flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <OtherIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider block mb-0.5">
                        {other.tag}
                      </span>
                      <h3 className="text-sm font-extrabold text-brand-black group-hover:text-brand-red transition-colors leading-snug">
                        {other.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM CTA BANNER
      ───────────────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
