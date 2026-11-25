'use client';

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiArrowUpRight,
  FiHeart,
} from 'react-icons/fi';
import type { DonationStatusResponse } from '@/types/api';
import { readReceiptEmail } from '@/lib/emailCheck';

/* sessionStorage never changes while this page is open, so there is nothing to subscribe to. */
const subscribeNoop = () => () => {};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

export default function ThankYouContent() {
  const params = useSearchParams();
  const donationId = params.get('donation_id');

  const [status, setStatus] = useState<DonationStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Read on the client only; the server render (and first hydration pass) sees null.
  const receiptEmail = useSyncExternalStore(subscribeNoop, readReceiptEmail, () => null);
  const [pollCount, setPollCount] = useState(0);

  const fetchStatus = useCallback(async () => {
    if (!donationId) {
      setError("We couldn't find your donation. Please check your email for a confirmation.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/donations/${donationId}/status/`,
        { cache: 'no-store' },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: DonationStatusResponse = await res.json();
      setStatus(data);
      setLoading(false);
      return data;
    } catch {
      setError("We couldn't load your donation details right now. Your payment is safe. Please check your email for confirmation or contact us.");
      setLoading(false);
    }
  }, [donationId]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      const data = await fetchStatus();
      setPollCount((c) => c + 1);

      /* Keep polling if receipt is still being generated (max 5 retries) */
      if (
        data &&
        data.status === 'paid' &&
        data.receipt.status === 'pending' &&
        pollCount < 5
      ) {
        timer = setTimeout(poll, 3000);
      }
    };

    poll();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationId]);

  /* ── Loading ──────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <span className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Confirming your donation…</p>
      </div>
    );
  }

  /* ── Error ────────────────────────────────────────────────────────────── */
  if (error || !status) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <FiAlertCircle className="w-8 h-8 text-brand-red" />
        </div>
        <h2 className="text-xl font-extrabold text-brand-black mb-2">
          Something Went Wrong
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {error || 'We could not load your donation details.'}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-red text-white text-sm font-bold hover:bg-brand-red-dark transition-colors"
        >
          Contact Support
        </Link>
      </div>
    );
  }

  /* ── Payment failed ───────────────────────────────────────────────────── */
  if (status.status === 'failed') {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <FiAlertCircle className="w-8 h-8 text-brand-red" />
        </div>
        <h2 className="text-xl font-extrabold text-brand-black mb-2">
          Payment Could Not Be Processed
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Your payment did not go through. No amount has been charged. Please try again.
        </p>
        <Link
          href="/donate"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-red text-white text-sm font-bold hover:bg-brand-red-dark transition-colors"
        >
          Try Again
        </Link>
      </div>
    );
  }

  /* ── Success ──────────────────────────────────────────────────────────── */
  const amountFormatted = `₹${status.amount_inr.toLocaleString('en-IN')}`;
  const receiptReady = status.receipt.status === 'generated' || status.receipt.status === 'sent';
  const receiptPending = status.receipt.status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6"
      >
        <FiCheckCircle className="w-10 h-10 text-green-500" />
      </motion.div>

      <h1 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight mb-2">
        Thank You
        {status.donor_first_name ? `, ${status.donor_first_name}` : ''}!
      </h1>
      <p className="text-brand-orange font-semibold text-sm mb-8">
        Your donation has been received.
      </p>

      {/* Donation summary card */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 text-left mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</span>
          <span className="text-lg font-black text-brand-black">{amountFormatted}</span>
        </div>
        <div className="border-t border-gray-200" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign</span>
          <span className="text-sm font-semibold text-brand-black capitalize">{status.campaign}</span>
        </div>
        {status.receipt.receipt_number && (
          <>
            <div className="border-t border-gray-200" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Receipt No.</span>
              <span className="text-sm font-mono text-brand-black">{status.receipt.receipt_number}</span>
            </div>
          </>
        )}
      </div>

      {/* Receipt emailed / pending */}
      {receiptReady ? (
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold mb-5">
          <FiCheckCircle className="w-4 h-4" />
          {receiptEmail ? <>Your 80G receipt has been emailed to <span className="font-bold">{receiptEmail}</span></> : 'Your 80G receipt has been emailed to you.'}
        </div>
      ) : receiptPending ? (
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold mb-5">
          <FiClock className="w-4 h-4 animate-pulse" />
          {receiptEmail ? <>Your 80G receipt is on its way to <span className="font-bold">{receiptEmail}</span>…</> : 'Your 80G receipt is on its way to your email…'}
        </div>
      ) : null}

      {/* CTA links */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/programs"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-red text-white text-sm font-bold hover:bg-brand-red-dark transition-colors shadow-md"
        >
          <FiHeart className="w-4 h-4" />
          Explore Our Programs
        </Link>
        <Link
          href="/get-involved"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-brand-navy text-brand-navy text-sm font-bold hover:bg-brand-navy hover:text-white transition-colors"
        >
          Volunteer With Us
          <FiArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        Please check your inbox (and spam folder) for your receipt. If you have any questions, please{' '}
        <Link href="/contact" className="underline hover:text-brand-red">contact us</Link>.
      </p>
    </motion.div>
  );
}
