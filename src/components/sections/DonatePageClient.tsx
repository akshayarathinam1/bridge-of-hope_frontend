'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBookOpen,
  FiHome,
  FiHeart,
  FiActivity,
  FiUsers,
  FiShield,
  FiEye,
  FiAward,
  FiArrowUpRight,
  FiCheckCircle,
  FiLock,
} from 'react-icons/fi';
import SectionLabel from '@/components/ui/SectionLabel';

/* ─── Program Data ─────────────────────────────────────────────────────── */

const programs = [
  {
    key: 'education',
    label: 'Education',
    icon: FiBookOpen,
    heading: 'Support Education',
    tagline: 'Every Child Deserves a Chance to Learn.',
    description:
      'Education opens doors to opportunity, confidence, and a brighter future. Your support helps children access learning, resources, and the tools they need to succeed.',
    stats: [
      { value: '4,800+', label: 'Students' },
      { value: '42', label: 'Schools' },
      { value: '6,500+', label: 'Kits Given' },
    ],
    programHref: '/programs/education',
  },
  {
    key: 'orphanage',
    label: 'Child Care',
    icon: FiHome,
    heading: 'Support Child & Orphan Care',
    tagline: 'Every Child Deserves Care and Compassion.',
    description:
      'Every child deserves to feel safe, loved, and supported. Your contribution helps provide essential daily care, nutrition, and a nurturing environment for vulnerable children.',
    stats: [
      { value: '1,200+', label: 'Children' },
      { value: '14', label: 'Care Centres' },
      { value: '120K+', label: 'Meals Served' },
    ],
    programHref: '/programs/orphanage',
  },
  {
    key: 'old-age',
    label: 'Elderly Care',
    icon: FiHeart,
    heading: 'Support Elderly Care',
    tagline: 'Every Elder Deserves Dignity and Respect.',
    description:
      'Older adults deserve care, comfort, and companionship. Your support provides essential needs, medical assistance, and meaningful companionship to seniors in need.',
    stats: [
      { value: '850+', label: 'Elders' },
      { value: '9', label: 'Care Homes' },
      { value: '600+', label: 'Kits / Month' },
    ],
    programHref: '/programs/old-age',
  },
  {
    key: 'medical',
    label: 'Medical Support',
    icon: FiActivity,
    heading: 'Support Medical Care',
    tagline: 'Healthcare Is a Need, Not a Privilege.',
    description:
      'Access to healthcare can save lives. Your contribution helps individuals and families facing medical challenges receive the support and care they deserve.',
    stats: [
      { value: '3,200+', label: 'Families' },
      { value: '150+', label: 'Health Camps' },
      { value: '180+', label: 'Surgeries' },
    ],
    programHref: '/programs/medical',
  },
  {
    key: 'social-service',
    label: 'Social Service',
    icon: FiUsers,
    heading: 'Support Our Mission',
    tagline: 'A Small Act of Kindness Can Create Lasting Change.',
    description:
      'A helping hand can bring hope when it matters most. Your support helps individuals and families facing hardship and builds stronger, more caring communities.',
    stats: [
      { value: '12,500+', label: 'People Reached' },
      { value: '75+', label: 'Relief Drives' },
      { value: '8,200+', label: 'Ration Kits' },
    ],
    programHref: '/programs/social-service',
  },
] as const;

type ProgramKey = (typeof programs)[number]['key'];

const PRESETS = [500, 1000, 2500, 5000];

const trustItems = [
  { icon: FiShield, label: '80G Tax Deductible' },
  { icon: FiHeart, label: '100% Direct Relief' },
  { icon: FiEye, label: 'Transparent Impact' },
  { icon: FiAward, label: 'Verified Non-Profit' },
];

/* ─── Donation Form ────────────────────────────────────────────────────── */

function DonationForm({ programName }: { programName: string }) {
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const amount = custom ? parseInt(custom) || 0 : selected;
  const displayAmount = amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : '₹—';

  const handlePreset = (val: number) => { setSelected(val); setCustom(''); };
  const handleCustom = (val: string) => { setCustom(val.replace(/\D/g, '')); setSelected(0); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name || !email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_40px_-8px_rgba(0,0,0,0.10)] p-7 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-5"
            >
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-xl font-black text-brand-black mb-2">Thank you, {name.split(' ')[0]}!</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-1">
              Your donation of <span className="font-bold text-brand-black">{displayAmount}</span> for{' '}
              <span className="font-bold text-brand-black">{programName}</span> has been received.
            </p>
            <p className="text-xs text-gray-400 mb-8">
              A confirmation will be sent to <span className="text-gray-600">{email}</span>.
            </p>
            <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline underline-offset-4">
              View Other Programs <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">Choose an amount</p>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {PRESETS.map((val) => (
                  <button
                    key={val} type="button" onClick={() => handlePreset(val)}
                    className={
                      'py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-200 ' +
                      (selected === val && !custom
                        ? 'bg-[#222A59] border-[#222A59] text-white shadow-md scale-[1.03]'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400')
                    }
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold select-none">₹</span>
                <input
                  type="text" inputMode="numeric" placeholder="Custom amount"
                  value={custom} onChange={(e) => handleCustom(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#222A59] focus:bg-white focus:ring-2 focus:ring-[#222A59]/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="border-t border-gray-100" />

            <div className="space-y-4">
              {[
                { label: 'Full Name', required: true, type: 'text', value: name, setter: setName, placeholder: 'Your full name' },
                { label: 'Email Address', required: true, type: 'email', value: email, setter: setEmail, placeholder: 'you@example.com' },
                { label: 'Phone', required: false, type: 'tel', value: phone, setter: setPhone, placeholder: '+91 98765 43210' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                    {field.label}{field.required ? <span className="text-brand-red"> *</span> : <span className="text-gray-300 font-medium normal-case tracking-normal"> (optional)</span>}
                  </label>
                  <input
                    type={field.type} required={field.required}
                    value={field.value} onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#222A59] focus:bg-white focus:ring-2 focus:ring-[#222A59]/10 outline-none transition-all duration-200"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={!amount || !name || !email || loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-red text-white text-sm font-bold shadow-[0_4px_16px_rgba(217,38,38,0.28)] hover:bg-brand-red-dark hover:shadow-[0_8px_26px_rgba(217,38,38,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing…
                </span>
              ) : (
                <><span>Donate {displayAmount} Now</span><FiArrowUpRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-400 font-medium">
              <FiLock className="w-3 h-3" />
              <span>Secure</span>
              <span className="text-gray-300">·</span>
              <span>80G Tax Deductible</span>
              <span className="text-gray-300">·</span>
              <span>100% Direct Relief</span>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page Client Component ───────────────────────────────────────── */

export default function DonatePageClient() {
  const searchParams = useSearchParams();
  const causeParam = searchParams.get('cause') as ProgramKey | null;
  const validKey = causeParam && programs.some((p) => p.key === causeParam) ? causeParam : 'education';

  const [activeKey, setActiveKey] = useState<ProgramKey>(validKey);

  // Sync if URL param changes (e.g. back/forward navigation)
  useEffect(() => {
    if (causeParam && programs.some((p) => p.key === causeParam)) {
      setActiveKey(causeParam as ProgramKey);
    }
  }, [causeParam]);

  const active = programs.find((p) => p.key === activeKey)!;
  const Icon = active.icon;

  return (
    <>
      {/* ── PROGRAM SELECTOR TABS ─────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="container-site">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4 text-center">
            Select a Program to Support
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {programs.map((prog) => {
              const BtnIcon = prog.icon;
              const isActive = prog.key === activeKey;
              return (
                <button
                  key={prog.key}
                  onClick={() => setActiveKey(prog.key)}
                  className={
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 cursor-pointer ' +
                    (isActive
                      ? 'bg-[#222A59] border-[#222A59] text-white shadow-lg scale-[1.04]'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#222A59] hover:text-[#222A59]')
                  }
                >
                  <BtnIcon className="w-4 h-4" />
                  {prog.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HERO SPLIT ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-site">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* LEFT — Program Context */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#222A59] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <SectionLabel>{active.label}</SectionLabel>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-black leading-[1.1] mb-3">
                  {active.heading.split(' ').slice(0, 1).join(' ')}{' '}
                  <span className="text-brand-orange">
                    {active.heading.split(' ').slice(1).join(' ')}
                  </span>
                </h2>

                <p className="text-brand-red font-semibold text-sm mb-5">{active.tagline}</p>

                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  {active.description}
                </p>

                <div className="border-t border-gray-100 mb-8" />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {active.stats.map((stat, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-center">
                      <p className="text-xl sm:text-2xl font-black text-brand-black mb-0.5">{stat.value}</p>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={active.programHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline underline-offset-4"
                >
                  Learn more about this program
                  <FiArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* RIGHT — Form (sticky) */}
              <div className="lg:col-span-7 lg:sticky lg:top-28">
                <DonationForm programName={active.label} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
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
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
