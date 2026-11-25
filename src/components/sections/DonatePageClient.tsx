'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  FiAlertCircle,
} from 'react-icons/fi';
import SectionLabel from '@/components/ui/SectionLabel';
import { apiMutate } from '@/lib/api';
import { friendlyPaymentError, NETWORK_ERROR_MESSAGE, VERIFY_ERROR_MESSAGE } from '@/lib/paymentErrors';
import { isValidEmail, rememberReceiptEmail, suggestEmailFix } from '@/lib/emailCheck';
import type { CreateOrderResponse, VerifyResponse } from '@/types/api';

/* ─── Program Data ──────────────────────────────────────────────────────── */

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
    programHref: '/programs/child-orphan-care',
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
    programHref: '/programs/elderly-care',
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
    programHref: '/programs/medical-support',
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
    programHref: '/programs/social-services',
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

/* ─── Donation Form ──────────────────────────────────────────────────────── */

function DonationForm({
  programKey,
  programName,
}: {
  programKey: ProgramKey;
  programName: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const amount = custom ? parseInt(custom) || 0 : selected;
  const emailValid = isValidEmail(email);
  const emailSuggestion = emailValid ? suggestEmailFix(email) : null;
  const showEmailError = emailTouched && email.length > 0 && !emailValid;
  const displayAmount = amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : '₹—';

  const handlePreset = (val: number) => { setSelected(val); setCustom(''); };
  const handleCustom = (val: string) => { setCustom(val.replace(/\D/g, '')); setSelected(0); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name || !email) return;
    if (!emailValid) {
      setEmailTouched(true);
      return;
    }
    setLoading(true);
    setError('');

    try {
      /* ── Step 1: Create order ──────────────────────────────────────── */
      const idempotencyKey = crypto.randomUUID();
      const { data: order, status: orderStatus } = await apiMutate<CreateOrderResponse>(
        '/donations/create-order/',
        {
          full_name: name,
          email: email.trim(),
          phone: phone || undefined,
          amount,
          campaign_slug: programKey,
        },
        'POST',
        { 'Idempotency-Key': idempotencyKey },
      );

      if (orderStatus === 429) {
        setError('Too many attempts. Please wait a moment and try again.');
        setLoading(false);
        return;
      }
      if (!order.success) {
        setError(order.message ?? "We couldn't start your payment. You haven't been charged. Please try again.");
        setLoading(false);
        return;
      }

      /* ── Step 2: Open Razorpay modal ──────────────────────────────── */
      const rzp = new window.Razorpay({
        key: order.razorpay_key_id,
        order_id: order.razorpay_order_id!,
        amount: order.amount_paise,
        currency: 'INR',
        name: 'Bridge of Hope Foundation',
        description: `Donation – ${programName}`,
        prefill: {
          name: order.donor.name,
          email: order.donor.email,
          contact: order.donor.phone ?? phone,
        },
        theme: { color: '#D92626' },
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (response) => {
          /* ── Step 3: Verify payment ──────────────────────────────── */
          try {
            const { data: verify } = await apiMutate<VerifyResponse>(
              '/donations/verify/',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            );
            if (verify.success) {
              rememberReceiptEmail(order.donor.email ?? email);
              router.push(`/donate/thank-you?donation_id=${verify.donation_id ?? order.donation_id}`);
            } else {
              setError(verify.message ?? VERIFY_ERROR_MESSAGE);
              setLoading(false);
            }
          } catch {
            setError(VERIFY_ERROR_MESSAGE);
            setLoading(false);
          }
        },
      });
      rzp.on('payment.failed', (resp) => {
        setError(friendlyPaymentError(resp));
        setLoading(false);
      });
      rzp.open();
    } catch {
      setError(NETWORK_ERROR_MESSAGE);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_40px_-8px_rgba(0,0,0,0.10)] p-7 sm:p-8">
      <motion.form
        key="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">Choose an amount</p>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            {PRESETS.map((val) => (
              <button
                key={val} type="button" onClick={() => handlePreset(val)}
                className={
                  'py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-200 cursor-pointer ' +
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
            { label: 'Full Name', required: true, type: 'text', value: name, setter: setName, placeholder: 'Your full name', autoComplete: 'name' },
            { label: 'Email Address', required: true, type: 'email', value: email, setter: setEmail, placeholder: 'you@example.com', autoComplete: 'email' },
            { label: 'Phone', required: false, type: 'tel', value: phone, setter: setPhone, placeholder: '+91 98765 43210', autoComplete: 'tel' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                {field.label}
                {field.required
                  ? <span className="text-brand-red"> *</span>
                  : <span className="text-gray-300 font-medium normal-case tracking-normal"> (optional)</span>
                }
              </label>
              <input
                id={field.type === 'email' ? 'donor-email' : undefined}
                type={field.type} required={field.required}
                value={field.value} onChange={(e) => field.setter(e.target.value)}
                onBlur={field.type === 'email' ? () => setEmailTouched(true) : undefined}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                aria-invalid={field.type === 'email' && showEmailError ? true : undefined}
                aria-describedby={field.type === 'email' ? 'donor-email-help' : undefined}
                className={
                  'w-full px-4 py-3 rounded-2xl border bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 outline-none transition-all duration-200 ' +
                  (field.type === 'email' && showEmailError
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#222A59] focus:ring-[#222A59]/10')
                }
              />
              {field.type === 'email' && (
                <div id="donor-email-help" className="mt-1.5 text-xs" aria-live="polite">
                  {showEmailError ? (
                    <p className="text-red-600">Please enter a valid email address, like name@example.com.</p>
                  ) : emailSuggestion ? (
                    <p className="text-amber-700">
                      Did you mean{' '}
                      <button
                        type="button"
                        onClick={() => setEmail(emailSuggestion)}
                        className="font-semibold underline underline-offset-2 hover:text-amber-900 cursor-pointer"
                      >
                        {emailSuggestion}
                      </button>
                      ?
                    </p>
                  ) : (
                    <p className="text-gray-500">Your 80G tax receipt will be emailed here right after payment.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!amount || !name || !emailValid || loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-red text-white text-sm font-bold shadow-[0_4px_16px_rgba(217,38,38,0.28)] hover:bg-brand-red-dark hover:shadow-[0_8px_26px_rgba(217,38,38,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
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
    </div>
  );
}

/* ─── Main Page Client Component ──────────────────────────────────────────── */

export default function DonatePageClient() {
  const searchParams = useSearchParams();
  const causeParam = searchParams.get('cause') as ProgramKey | null;
  const validKey =
    causeParam && programs.some((p) => p.key === causeParam)
      ? causeParam
      : 'education';

  const [activeKey, setActiveKey] = useState<ProgramKey>(validKey);

  /* Sync if URL param changes (e.g. back/forward navigation) */
  useEffect(() => {
    if (causeParam && programs.some((p) => p.key === causeParam)) {
      setActiveKey(causeParam as ProgramKey);
    }
  }, [causeParam]);

  const active = programs.find((p) => p.key === activeKey)!;
  const Icon = active.icon;

  return (
    <>
      {/* ── PROGRAM SELECTOR TABS ─────────────────────────────────────── */}
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

      {/* ── HERO SPLIT ────────────────────────────────────────────────── */}
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
              {/* LEFT – Program Context */}
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

              {/* RIGHT – Form (sticky) */}
              <div className="lg:col-span-7 lg:sticky lg:top-28">
                <DonationForm programKey={activeKey} programName={active.label} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
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
