'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDonateModal } from '@/context/DonateModalContext';
import { FiX, FiHeart, FiCheck, FiCopy } from 'react-icons/fi';
import { clsx } from 'clsx';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export default function DonateModal() {
  const { isOpen, closeDonateModal } = useDonateModal();
  const [selected, setSelected] = useState<number>(1000);
  const [custom, setCustom] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'amount' | 'payment'>('amount');

  const amount = custom ? parseInt(custom) || 0 : selected;

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep('amount'); setCustom(''); setCopied(false); }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDonateModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDonateModal]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDonateModal}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-sm bg-white rounded-2xl shadow-[0_20px_60px_-8px_rgba(0,0,0,0.18)] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <FiHeart className="w-3.5 h-3.5 text-brand-orange" />
                  </span>
                  <div>
                    <h2 className="text-[15px] font-bold text-gray-900 leading-tight">Make a Donation</h2>
                    <p className="text-[11px] text-gray-400">80G tax benefit · 100% to those in need</p>
                  </div>
                </div>
                <button
                  onClick={closeDonateModal}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <AnimatePresence mode="wait">
                  {step === 'amount' ? (
                    <motion.div
                      key="amount"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Choose amount</p>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {PRESET_AMOUNTS.map(amt => (
                          <button
                            key={amt}
                            onClick={() => { setSelected(amt); setCustom(''); }}
                            className={clsx(
                              'py-2 rounded-xl text-[13px] font-bold transition-all duration-150 border-2',
                              selected === amt && !custom
                                ? 'bg-brand-orange text-white border-brand-orange'
                                : 'bg-gray-50 text-gray-700 border-transparent hover:border-brand-orange/40'
                            )}
                          >
                            {`${String.fromCharCode(8377)}${amt >= 1000 ? amt / 1000 + 'K' : amt}`}
                          </button>
                        ))}
                      </div>

                      <div className="relative mb-4">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">{String.fromCharCode(8377)}</span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          value={custom}
                          onChange={e => { setCustom(e.target.value); setSelected(0); }}
                          className="w-full pl-7 pr-4 py-2.5 bg-gray-50 border-2 border-transparent focus:border-brand-orange focus:bg-white rounded-xl text-[13px] font-semibold text-gray-800 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                        />
                      </div>

                      <button
                        onClick={() => amount >= 1 && setStep('payment')}
                        disabled={amount < 1}
                        className="w-full py-3 rounded-xl bg-brand-orange text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(255,97,0,0.28)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        {`Continue with ${String.fromCharCode(8377)}${amount > 0 ? amount.toLocaleString('en-IN') : String.fromCharCode(8212)}`}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5 mb-4">
                        <span className="text-[12px] text-orange-700 font-semibold">Donating</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[16px] font-black text-brand-orange">{`${String.fromCharCode(8377)}${amount.toLocaleString('en-IN')}`}</span>
                          <button
                            onClick={() => setStep('amount')}
                            className="text-[11px] text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Pay via UPI</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between mb-3">
                        <div>
                          <p className="text-[10px] text-gray-400 mb-0.5">UPI ID</p>
                          <p className="text-[13px] font-bold text-gray-800 font-mono tracking-wide">bridgeofhope@upi</p>
                        </div>
                        <button
                          onClick={() => copy('bridgeofhope@upi')}
                          className={clsx(
                            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200',
                            copied
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                          )}
                        >
                          {copied ? <><FiCheck className="w-3 h-3" /> Copied</> : <><FiCopy className="w-3 h-3" /> Copy</>}
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[10px] text-gray-400">or bank transfer</span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 space-y-1.5">
                        {[
                          { label: 'Account Name', value: 'Bridge of Hope Foundation' },
                          { label: 'Account No.', value: '1234 5678 9012 3456' },
                          { label: 'IFSC', value: 'SBIN0001234' },
                          { label: 'Bank', value: 'State Bank of India' },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400">{label}</span>
                            <span className="text-[12px] font-semibold text-gray-800 font-mono">{value}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-gray-400 text-center mb-4 leading-relaxed">
                        Share payment screenshot on WhatsApp{' '}
                        <strong className="text-gray-600">+91 98849 35959</strong>{' '}
                        for your 80G receipt.
                      </p>

                      <button
                        onClick={closeDonateModal}
                        className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all"
                      >
                        <FiHeart className="w-3.5 h-3.5" />
                        Done &mdash; Thank You {String.fromCharCode(128591)}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}