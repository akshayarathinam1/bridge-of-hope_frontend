import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiBookOpen,
  FiHome,
  FiHeart,
  FiActivity,
  FiUsers,
  FiShield,
  FiEye,
  FiAward,
} from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import DonationForm from '@/components/ui/DonationForm';
import CtaBanner from '@/components/sections/CtaBanner';

/* ─── Data ─────────────────────────────────────────────────────────────── */

const causes = {
  education: {
    seoTitle: 'Donate for Education | Bridge of Hope Foundation',
    seoDescription:
      'Support children\'s education and learning opportunities through Bridge of Hope Foundation. 80G tax deductible.',
    programLabel: 'Education',
    heading: 'Support Education',
    tagline: 'Every Child Deserves a Chance to Learn.',
    description:
      'Education opens doors to opportunity, confidence, and a brighter future. Your support helps children access learning, resources, and the tools they need to succeed.',
    icon: FiBookOpen,
    stats: [
      { value: '4,800+', label: 'Students Supported' },
      { value: '42', label: 'Partner Schools' },
      { value: '6,500+', label: 'Kits Delivered' },
    ],
    programHref: '/programs/education',
  },
  orphanage: {
    seoTitle: 'Donate for Child & Orphan Care | Bridge of Hope Foundation',
    seoDescription:
      'Support child welfare and orphan care through Bridge of Hope Foundation. 80G tax deductible.',
    programLabel: 'Child & Orphan Care',
    heading: 'Support Child & Orphan Care',
    tagline: 'Every Child Deserves Care and Compassion.',
    description:
      'Every child deserves to feel safe, loved, and supported. Your contribution helps provide essential daily care, nutrition, and a nurturing environment for vulnerable children.',
    icon: FiHome,
    stats: [
      { value: '1,200+', label: 'Children Supported' },
      { value: '14', label: 'Care Centres' },
      { value: '120K+', label: 'Meals Served' },
    ],
    programHref: '/programs/orphanage',
  },
  'old-age': {
    seoTitle: 'Donate for Elderly Care | Bridge of Hope Foundation',
    seoDescription:
      'Support elderly well-being and dignified care through Bridge of Hope Foundation. 80G tax deductible.',
    programLabel: 'Elderly Care',
    heading: 'Support Elderly Care',
    tagline: 'Every Elder Deserves Dignity and Respect.',
    description:
      'Older adults deserve care, comfort, and companionship. Your support helps provide essential needs, medical assistance, and meaningful companionship to seniors in need.',
    icon: FiHeart,
    stats: [
      { value: '850+', label: 'Elders Supported' },
      { value: '9', label: 'Care Homes' },
      { value: '600+', label: 'Medical Kits / Month' },
    ],
    programHref: '/programs/old-age',
  },
  medical: {
    seoTitle: 'Donate for Medical Support | Bridge of Hope Foundation',
    seoDescription:
      'Help people access essential healthcare through Bridge of Hope Foundation. 80G tax deductible.',
    programLabel: 'Medical Support',
    heading: 'Support Medical Care',
    tagline: 'Healthcare Is a Need, Not a Privilege.',
    description:
      'Access to healthcare can change and save lives. Your contribution helps individuals and families facing medical difficulties receive the support and care they deserve.',
    icon: FiActivity,
    stats: [
      { value: '3,200+', label: 'Families Assisted' },
      { value: '150+', label: 'Free Health Camps' },
      { value: '180+', label: 'Surgeries Funded' },
    ],
    programHref: '/programs/medical',
  },
  'social-service': {
    seoTitle: 'Donate for Social Service | Bridge of Hope Foundation',
    seoDescription:
      'Support community welfare and social service through Bridge of Hope Foundation. 80G tax deductible.',
    programLabel: 'Social Service',
    heading: 'Support Our Mission',
    tagline: 'A Small Act of Kindness Can Create Lasting Change.',
    description:
      'A helping hand can bring hope when it matters most. Your support helps individuals and families facing hardship and contributes to stronger, more caring communities.',
    icon: FiUsers,
    stats: [
      { value: '12,500+', label: 'People Reached' },
      { value: '75+', label: 'Relief Drives' },
      { value: '8,200+', label: 'Ration Kits Given' },
    ],
    programHref: '/programs/social-service',
  },
} as const;

type CauseKey = keyof typeof causes;

const trustItems = [
  { icon: FiShield, label: '80G Tax Deductible' },
  { icon: FiHeart, label: '100% Direct Relief' },
  { icon: FiEye, label: 'Transparent Impact' },
  { icon: FiAward, label: 'Verified Non-Profit' },
];

/* ─── Metadata ─────────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  return Object.keys(causes).map((cause) => ({ cause }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cause: string }>;
}): Promise<Metadata> {
  const { cause } = await params;
  const data = causes[cause as CauseKey] ?? causes.education;
  return {
    title: data.seoTitle,
    description: data.seoDescription,
  };
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default async function DonateCausePage({
  params,
}: {
  params: Promise<{ cause: string }>;
}) {
  const { cause } = await params;
  const data = causes[cause as CauseKey] ?? causes.education;
  const Icon = data.icon;

  return (
    <main className="min-h-screen bg-white text-brand-black">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <PageHeader
        title={data.heading}
        subtitle={data.tagline}
        breadcrumb="Donate"
      />

      {/* ── HERO SPLIT ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT — Program Context */}
            <div className="lg:col-span-5">
              {/* Back link */}
              <div className="mb-8">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-red transition-colors"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  All Donation Options
                </Link>
              </div>

              {/* Icon + label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#222A59] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <SectionLabel>{data.programLabel}</SectionLabel>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-black leading-[1.1] mb-4">
                {data.heading.split(' ').slice(0, 1).join(' ')}{' '}
                <span className="text-brand-orange">
                  {data.heading.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                {data.description}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-8" />

              {/* Micro-stats */}
              <div className="grid grid-cols-3 gap-3">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-center"
                  >
                    <p className="text-xl sm:text-2xl font-black text-brand-black mb-0.5">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Program page link */}
              <div className="mt-8">
                <Link
                  href={data.programHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline underline-offset-4 transition-colors"
                >
                  Learn more about this program
                  <FiArrowLeft className="w-3 h-3 rotate-180" />
                </Link>
              </div>
            </div>

            {/* RIGHT — Donation Form (sticky) */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <DonationForm
                programName={data.programLabel}
                cause={cause}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trustItems.map((item, i) => {
              const TrustIcon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <TrustIcon className="w-4 h-4 text-brand-red" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
