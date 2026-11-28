'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import CtaBanner from '@/components/sections/CtaBanner';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageSquare,
  FiCheckCircle,
  FiShield,
  FiSend,
  FiAlertCircle,
  FiHeart,
  FiUsers,
  FiBookOpen,
  FiHome,
  FiActivity,
} from 'react-icons/fi';
import { apiMutate } from '@/lib/api';
import type { InquiryResponse } from '@/types/api';

/* ─── Volunteer areas ─────────────────────────────────────────────────────── */
const AREAS = [
  { value: 'education', label: 'Education', icon: FiBookOpen },
  { value: 'child-care', label: 'Child Care', icon: FiHome },
  { value: 'elderly-care', label: 'Elderly Care', icon: FiHeart },
  { value: 'medical', label: 'Medical Support', icon: FiActivity },
  { value: 'social-service', label: 'Social Service', icon: FiUsers },
  { value: 'general', label: 'General / Any Area', icon: FiUsers },
];

const AVAILABILITY = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Weekends',
  'Flexible / Anytime',
];

/* ─── Why volunteer stats ─────────────────────────────────────────────────── */
const WHY_ITEMS = [
  { icon: FiHeart, title: 'Real Impact', desc: 'Your time directly touches lives in our community programmes.' },
  { icon: FiUsers, title: 'Join 250+ Volunteers', desc: 'Be part of a passionate, motivated team across Chennai.' },
  { icon: FiCalendar, title: 'Flexible Schedule', desc: 'Volunteer on weekdays, weekends, or one-off events — your choice.' },
  { icon: FiBookOpen, title: 'Skill Development', desc: 'Gain hands-on experience in social work, healthcare & education.' },
];

export default function GetInvolvedPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    availability: '',
    message: '',
  });

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const subject = `Volunteer Application – ${form.area || 'General'}`;
    const message = [
      form.message,
      `Area of interest: ${form.area || 'Not specified'}`,
      `Availability: ${form.availability || 'Not specified'}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const { data, status } = await apiMutate<InquiryResponse>('/inquiries/', {
        full_name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        inquiry_type: 'volunteer',
        subject,
        message,
      });

      if (status === 201 && data.success) {
        setSubmitted(true);
      } else if (status === 429) {
        setError('Too many requests. Please wait a moment and try again.');
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Could not submit your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    setForm({ name: '', email: '', phone: '', area: '', availability: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-white text-brand-black">
      {/* ── PAGE HEADER ───────────────────────────────────────────────── */}
      <PageHeader
        title="Get Involved"
        subtitle="Your time, skills, and passion can make a real difference. Join our volunteer family today."
        breadcrumb="Get Involved"
      />

      {/* ── WHY VOLUNTEER ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Why Volunteer With Us?</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-4">
              Make a Difference{' '}
              <span className="text-brand-orange">That Lasts</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-brand-black mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER FORM ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-site max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left — context */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <SectionLabel>Apply Now</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2 mb-4">
                  Join Our{' '}
                  <span className="text-brand-orange">Volunteer Family</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fill in the short form and our volunteer coordinator will reach out within 2 working days to discuss next steps.
                </p>
              </div>

              {/* Area pills */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Areas We Need Help In</p>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((a) => {
                    const Icon = a.icon;
                    return (
                      <span
                        key={a.value}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold"
                      >
                        <Icon className="w-3 h-3" />
                        {a.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Trust note */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
                  <FiShield className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-600 leading-snug">
                  Your information is kept private and used only to match you with the right volunteer opportunity.
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-xl p-7 sm:p-10"
            >
              <h3 className="text-xl font-extrabold text-brand-black mb-6">
                Volunteer Application
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-navy mb-2">
                    Application Received!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you for stepping forward. Our volunteer coordinator will contact you at{' '}
                    <strong>{form.email}</strong> within 2 working days.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy/90 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text" required
                          placeholder="Your full name"
                          value={form.name} onChange={set('name')}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Email <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email" required
                          placeholder="you@example.com"
                          value={form.email} onChange={set('email')}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Availability */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone} onChange={set('phone')}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Availability
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <select
                          value={form.availability} onChange={set('availability')}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all appearance-none"
                        >
                          <option value="">Select availability</option>
                          {AVAILABILITY.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Area of interest */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Area of Interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AREAS.map((a) => {
                        const Icon = a.icon;
                        const active = form.area === a.value;
                        return (
                          <button
                            key={a.value}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, area: a.value }))}
                            className={
                              'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all duration-150 cursor-pointer ' +
                              (active
                                ? 'bg-brand-navy border-brand-navy text-white'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-brand-navy hover:text-brand-navy')
                            }
                          >
                            <Icon className="w-3 h-3" />
                            {a.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Why do you want to volunteer?{' '}
                      <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        required rows={4} maxLength={5000}
                        placeholder="Tell us about yourself and your motivation to volunteer…"
                        value={form.message} onChange={set('message')}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit" disabled={loading}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm shadow-[0_4px_18px_rgba(217,38,38,0.3)] hover:shadow-[0_8px_25px_rgba(217,38,38,0.4)] transition-all duration-300 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <FiSend className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
