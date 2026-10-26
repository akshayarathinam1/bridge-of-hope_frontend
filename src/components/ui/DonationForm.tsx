'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiCheckCircle, FiLock } from 'react-icons/fi';

const PRESETS = [500, 1000, 2500, 5000];

interface DonationFormProps {
  programName: string;
  cause: string;
}

export default function DonationForm({ programName, cause }: DonationFormProps) {
  const [selected, setSelected] = useState<number>(1000);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const amount = custom ? parseInt(custom) || 0 : selected;
  const displayAmount = amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : '₹—';

  const handlePreset = (val: number) => {
    setSelected(val);
    setCustom('');
  };

  const handleCustom = (val: string) => {
    setCustom(val.replace(/\D/g, ''));
    setSelected(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name || !email) return;
    setLoading(true);
    // Simulate async — replace with real payment/API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_40px_-8px_rgba(0,0,0,0.10)] p-7 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          /* ── SUCCESS STATE ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
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
            <h3 className="text-xl font-black text-brand-black mb-2">
              Thank you, {name.split(' ')[0]}!
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-1">
              Your donation of{' '}
              <span className="font-bold text-brand-black">{displayAmount}</span> for{' '}
              <span className="font-bold text-brand-black">{programName}</span> has been received.
            </p>
            <p className="text-xs text-gray-400 mb-8">
              A confirmation will be sent to <span className="text-gray-600">{email}</span>.
            </p>
            <a
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline underline-offset-4"
            >
              View Other Programs
              <FiArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        ) : (
          /* ── FORM STATE ── */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Amount heading */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
                Choose an amount
              </p>

              {/* Preset buttons */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {PRESETS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePreset(val)}
                    className={
                      'py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-200 ' +
                      (selected === val && !custom
                        ? 'bg-[#222A59] border-[#222A59] text-white shadow-md scale-[1.03]'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900')
                    }
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold select-none">
                  ₹
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => handleCustom(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#222A59] focus:bg-white focus:ring-2 focus:ring-[#222A59]/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                  Full Name <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#222A59] focus:bg-white focus:ring-2 focus:ring-[#222A59]/10 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                  Email Address <span className="text-brand-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#222A59] focus:bg-white focus:ring-2 focus:ring-[#222A59]/10 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                  Phone <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#222A59] focus:bg-white focus:ring-2 focus:ring-[#222A59]/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!amount || !name || !email || loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-red text-white text-sm font-bold tracking-wide shadow-[0_4px_16px_rgba(217,38,38,0.28)] hover:bg-brand-red-dark hover:shadow-[0_8px_26px_rgba(217,38,38,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing…
                </span>
              ) : (
                <>
                  <span>Donate {displayAmount} Now</span>
                  <FiArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trust note */}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
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
