'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiDownload,
  FiPrinter,
  FiShield,
  FiLock,
  FiSmartphone,
  FiCreditCard,
  FiFileText,
} from "react-icons/fi";

const CAUSES = [
  { id: "child-education", label: "Child Education" },
  { id: "child-care", label: "Child Care" },
  { id: "senior-care", label: "Elderly Care" },
  { id: "medical-support", label: "Medical Support" },
  { id: "where-needed", label: "Where Most Needed" },
];

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];

type Step = "step1" | "step2" | "step3" | "gateway" | "success" | "failed";

export default function DonationImpactCard() {
  // Step 1 State
  const [step, setStep] = useState<Step>("step1");
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState<string>("child-education");

  // Step 2 State
  const [fullName, setFullName] = useState<string>("Rahul Kumar");
  const [email, setEmail] = useState<string>("rahul@email.com");
  const [mobile, setMobile] = useState<string>("+91 98765 43210");
  const [claimTax, setClaimTax] = useState<boolean>(true);
  const [panNumber, setPanNumber] = useState<string>("ABCDE1234F");

  // Step 3 & Gateway State
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [txnId, setTxnId] = useState<string>("HB-TXN-849201");
  const [receiptNumber, setReceiptNumber] = useState<string>("HB-2026-000123");

  // Digital Receipt Modal
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);

  const amount = isCustom ? Number(customAmount) || 0 : selectedAmount;
  const formattedAmount = `₹${amount.toLocaleString("en-IN")}`;
  const selectedCauseLabel = CAUSES.find((c) => c.id === cause)?.label || "Child Education";

  const handlePayNow = (simulateSuccess = true) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (simulateSuccess) {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        setTxnId(`HB-TXN-${randomNum}`);
        setReceiptNumber(`HB-2026-000${Math.floor(100 + Math.random() * 900)}`);
        setStep("success");
      } else {
        setStep("failed");
      }
    }, 1200);
  };

  const handleReset = () => {
    setStep("step1");
    setSelectedAmount(1000);
    setIsCustom(false);
    setCustomAmount("");
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section id="donate-section" className="relative pt-14 pb-24 bg-white overflow-visible">
      {/* ── Absolute Hero-matched blue + white background — covers top ~45% ── */}
      <div className="absolute inset-x-0 top-0 h-[45%] min-h-[260px] bg-[#032a6a] z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=85"
          alt="Community background"
          fill
          className="object-cover object-center opacity-85"
        />
        {/* Blue mixed with white gradient overlays identical to hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 container-site flex flex-col items-center">
        {/* Section Heading */}
        <div className="w-full max-w-4xl mb-6 sm:mb-8 text-center sm:text-left">
          <SectionLabel light>Start Donating to Poor People</SectionLabel>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.18] sm:leading-[1.1] tracking-tight mt-2">
            Join The <span className="text-brand-red">Community</span> To Give{" "}
            <br className="hidden sm:inline" />
            Education &amp; Care For People In Need
          </h2>
        </div>

        {/* ── White Card — centered, straddles dark/white boundary ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 min-h-0 sm:min-h-[580px]"
        >
          {/* ── Left Column: Multi-Step Interactive Donation Card (col-span-7) ── */}
          <div className="lg:col-span-7 p-4 sm:p-8 md:p-9 flex flex-col justify-between bg-white">
            <AnimatePresence mode="wait">
              {/* ─────────────────────────────────────────────────────────────
                  STEP 1 — START YOUR DONATION
              ───────────────────────────────────────────────────────────── */}
              {step === "step1" && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1 justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                      <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                        STEP 1 — START YOUR DONATION
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">100% Tax Deductible</span>
                    </div>

                    {/* Giving Frequency */}
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                        Giving Frequency
                      </label>
                      <div className="grid grid-cols-2 p-1 rounded-full bg-gray-100">
                        <button
                          type="button"
                          onClick={() => setFrequency("once")}
                          className={`py-2 px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                            frequency === "once"
                              ? "bg-brand-black text-white shadow-sm"
                              : "text-gray-600 hover:text-brand-black"
                          }`}
                        >
                          Give Once
                        </button>
                        <button
                          type="button"
                          onClick={() => setFrequency("monthly")}
                          className={`py-2 px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                            frequency === "monthly"
                              ? "bg-brand-black text-white shadow-sm"
                              : "text-gray-600 hover:text-brand-black"
                          }`}
                        >
                          Give Monthly
                        </button>
                      </div>
                    </div>

                    {/* Donation Amount */}
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                        Donation Amount
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                        {QUICK_AMOUNTS.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amt);
                              setIsCustom(false);
                            }}
                            className={`py-2 px-1 rounded-full text-xs font-bold border-2 transition-all duration-200 text-center ${
                              !isCustom && selectedAmount === amt
                                ? "bg-brand-red text-white border-brand-red shadow-sm"
                                : "bg-white text-brand-black border-gray-200 hover:border-brand-black"
                            }`}
                          >
                            ₹{amt.toLocaleString("en-IN")}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCustom(true)}
                          className={`py-2 px-1 rounded-full text-xs font-bold border-2 transition-all duration-200 text-center ${
                            isCustom
                              ? "bg-brand-black text-white border-brand-black shadow-sm"
                              : "bg-white text-brand-black border-gray-200 hover:border-brand-black"
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {/* Custom Input when active */}
                      {isCustom && (
                        <div className="mt-2 flex items-center gap-2 bg-gray-50 border-2 border-brand-black rounded-full px-4 py-1.5">
                          <span className="text-sm font-bold text-brand-black">₹</span>
                          <input
                            type="number"
                            min="100"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="flex-1 bg-transparent text-brand-black font-bold text-sm outline-none"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>

                    {/* Choose a Cause */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5">
                        Choose a Cause
                      </label>
                      <div className="space-y-1.5">
                        {CAUSES.map((c) => (
                          <label
                            key={c.id}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border cursor-pointer transition-all duration-200 ${
                              cause === c.id
                                ? "bg-brand-red-light/40 border-brand-red text-brand-black font-semibold"
                                : "bg-gray-50/50 border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="cause"
                              checked={cause === c.id}
                              onChange={() => setCause(c.id)}
                              className="w-3.5 h-3.5 accent-brand-red"
                            />
                            <span className="text-xs sm:text-sm">{c.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (amount >= 100) setStep("step2");
                    }}
                    disabled={amount < 100}
                    className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-dark disabled:bg-gray-300 text-white text-sm font-bold shadow-[0_4px_18px_rgba(255,113,0,0.4)] hover:shadow-[0_8px_25px_rgba(255,113,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none cursor-pointer"
                  >
                    <span>Continue with {formattedAmount} →</span>
                  </button>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  STEP 2 — YOUR DETAILS
              ───────────────────────────────────────────────────────────── */}
              {step === "step2" && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1 justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="pb-3 mb-4 border-b border-gray-100">
                      <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-1">
                        STEP 2 — YOUR DETAILS
                      </span>
                      <p className="text-xs text-gray-500">
                        Help us create your donation record and receipt.
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3 mb-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Rahul Kumar"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-brand-black outline-none focus:border-brand-red"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@email.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-brand-black outline-none focus:border-brand-red"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-brand-black outline-none focus:border-brand-red"
                        />
                      </div>

                      {/* Tax Benefits Checkbox */}
                      <div className="pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={claimTax}
                            onChange={(e) => setClaimTax(e.target.checked)}
                            className="w-4 h-4 rounded text-brand-red accent-brand-red"
                          />
                          <span className="text-xs font-semibold text-gray-700">
                            I would like to claim tax benefits, if eligible
                          </span>
                        </label>

                        {claimTax && (
                          <div className="mt-2">
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              PAN Number
                            </label>
                            <input
                              type="text"
                              value={panNumber}
                              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-brand-black uppercase tracking-wider outline-none focus:border-brand-red"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep("step1")}
                      className="px-5 py-3 rounded-full border-2 border-gray-200 text-xs font-bold text-gray-600 hover:border-brand-black hover:text-brand-black transition-colors flex items-center gap-1.5"
                    >
                      <FiArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (fullName.trim() && email.trim()) setStep("step3");
                      }}
                      disabled={!fullName.trim() || !email.trim()}
                      className="flex-1 group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-dark disabled:bg-gray-300 text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-300"
                    >
                      <span>Continue to Review →</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  STEP 3 — REVIEW YOUR DONATION
              ───────────────────────────────────────────────────────────── */}
              {step === "step3" && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1 justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="pb-3 mb-4 border-b border-gray-100">
                      <span className="text-xs font-bold text-brand-red uppercase tracking-wider block">
                        STEP 3 — REVIEW YOUR DONATION
                      </span>
                    </div>

                    {/* Donation Summary Table */}
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mb-4">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200 text-xs">
                        <span className="font-bold text-brand-black">Donation Summary</span>
                        <button
                          type="button"
                          onClick={() => setStep("step2")}
                          className="text-brand-red font-bold hover:underline flex items-center gap-1"
                        >
                          <span>← Edit Details</span>
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Amount</span>
                          <span className="font-extrabold text-brand-black">{formattedAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Frequency</span>
                          <span className="font-semibold text-brand-black capitalize">{frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cause</span>
                          <span className="font-semibold text-brand-black">{selectedCauseLabel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Donor</span>
                          <span className="font-semibold text-brand-black">{fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email</span>
                          <span className="font-semibold text-brand-black">{email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-4" />

                    {/* Payment Method */}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("upi")}
                          className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                            paymentMethod === "upi"
                              ? "border-brand-red bg-brand-red-light/30 text-brand-black"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <FiSmartphone className="w-4 h-4 text-emerald-600" />
                          <span>UPI</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                            paymentMethod === "card"
                              ? "border-brand-red bg-brand-red-light/30 text-brand-black"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <FiCreditCard className="w-4 h-4 text-blue-600" />
                          <span>Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("netbanking")}
                          className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                            paymentMethod === "netbanking"
                              ? "border-brand-red bg-brand-red-light/30 text-brand-black"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-sm">🏦</span>
                          <span>Net Banking</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-snug">
                        Your payment will be processed securely by our payment gateway.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep("gateway")}
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold shadow-[0_4px_18px_rgba(255,113,0,0.4)] hover:shadow-[0_8px_25px_rgba(255,113,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none cursor-pointer"
                    >
                      <span>Proceed to Secure Payment →</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  PAYMENT GATEWAY (Interactive Simulation)
              ───────────────────────────────────────────────────────────── */}
              {step === "gateway" && (
                <motion.div
                  key="gateway"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1 justify-between"
                >
                  <div>
                    {/* Gateway Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <FiLock className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-gray-800 tracking-wider">
                          PAYMENT GATEWAY
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-black">
                        {formattedAmount}
                      </span>
                    </div>

                    {/* Method Selector in Gateway */}
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mb-5">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white border border-gray-200">
                          <span className="font-semibold text-gray-700">UPI</span>
                          <span className="font-mono text-gray-400">GPay, PhonePe, QR</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white border border-gray-200">
                          <span className="font-semibold text-gray-700">Card</span>
                          <span className="font-mono text-gray-400">Debit / Credit</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white border border-gray-200">
                          <span className="font-semibold text-gray-700">Net Banking</span>
                          <span className="font-mono text-gray-400">All Banks</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm font-extrabold text-brand-black pt-2 border-t border-gray-200">
                        <span>Total Payable Amount</span>
                        <span className="text-base text-brand-red">{formattedAmount}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mb-4">
                      <FiShield className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-Bit Bank Grade Encryption</span>
                    </div>
                  </div>

                  {/* Gateway Actions */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handlePayNow(true)}
                      disabled={isProcessing}
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Payment...</span>
                        </div>
                      ) : (
                        <span>[ Pay Now ] {formattedAmount}</span>
                      )}
                    </button>

                    {/* Back / Test failure button */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setStep("step3")}
                        disabled={isProcessing}
                        className="text-xs font-semibold text-gray-400 hover:text-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePayNow(false)}
                        disabled={isProcessing}
                        className="text-[11px] font-medium text-gray-400 hover:text-red-500 underline"
                      >
                        Test Failed Simulation
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  STEP 4 — DONATION SUCCESS
              ───────────────────────────────────────────────────────────── */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 justify-between text-center py-1"
                >
                  <div>
                    {/* Checkmark icon */}
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                      <FiCheck className="w-7 h-7 stroke-[3]" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-brand-black mb-1">
                      ✓ Donation Successful
                    </h3>
                    <p className="text-base font-bold text-gray-800 mb-1">
                      Thank you, {fullName}!
                    </p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto mb-5 leading-relaxed">
                      Your support helps us continue our work.
                    </p>

                    {/* Success Details Box */}
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-left space-y-1.5 text-xs mb-5">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Donation:</span>
                        <span className="font-extrabold text-brand-black">{formattedAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cause:</span>
                        <span className="font-semibold text-brand-black">{selectedCauseLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Frequency:</span>
                        <span className="font-semibold text-brand-black capitalize">{frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Transaction ID:</span>
                        <span className="font-mono font-bold text-brand-black">{txnId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions matching specification */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setShowReceiptModal(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-black hover:bg-gray-800 text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-md"
                    >
                      <FiFileText className="w-4 h-4" />
                      <span>[ Download Receipt ]</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border-2 border-gray-200 hover:border-brand-red text-brand-black text-xs font-bold transition-all duration-200"
                    >
                      <span>[ Donate Again ]</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  PAYMENT FAILED
              ───────────────────────────────────────────────────────────── */}
              {step === "failed" && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 justify-between text-center py-4"
                >
                  <div>
                    <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
                      <FiX className="w-7 h-7 stroke-[3]" />
                    </div>

                    <h3 className="text-xl font-black text-brand-black mb-1">
                      Payment Failed
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto mb-6 leading-relaxed">
                      We couldn&rsquo;t complete your donation. Please check your payment details or try again.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handlePayNow(true)}
                      className="w-full py-3 rounded-full bg-brand-red hover:bg-brand-red-dark text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                    >
                      [ Try Again ]
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("step3")}
                      className="w-full py-2.5 rounded-full border-2 border-gray-200 text-brand-black text-xs font-bold hover:bg-gray-50 transition-colors"
                    >
                      [ Change Payment ]
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right Column: Hero image with torn brush edge (col-span-5) ── */}
          <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-0 overflow-hidden bg-gray-100 hidden sm:block">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85"
              alt="Smiling child receiving support — Bridge of Hope"
              fill
              className="object-cover object-center"
            />
            {/* Torn brush stroke edge on the left */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
              style={{
                background: "white",
                clipPath:
                  "polygon(0 0, 60% 0, 100% 4%, 80% 9%, 100% 14%, 70% 19%, 95% 24%, 75% 30%, 100% 35%, 65% 40%, 100% 46%, 70% 52%, 100% 57%, 80% 62%, 100% 67%, 75% 72%, 95% 77%, 65% 82%, 90% 87%, 60% 92%, 100% 97%, 100% 100%, 0 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-red text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                100% Direct Relief
              </span>
              <p className="text-xs sm:text-sm font-bold leading-snug text-white drop-shadow-md">
                Every rupee is audited, recorded, and deployed directly to provide education, nutrition, and healthcare.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DIGITAL DONATION RECEIPT MODAL (Exact Specification)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showReceiptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/85 backdrop-blur-sm p-4"
            onClick={() => setShowReceiptModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>

              {/* Receipt Header */}
              <div className="text-center pb-4 mb-4 border-b border-gray-200">
                <p className="text-[11px] font-mono font-bold tracking-widest text-brand-red uppercase mb-1">
                  DIGITAL DONATION RECEIPT
                </p>
                <h3 className="text-lg font-black text-brand-black">
                  BRIDGE OF HOPE
                </h3>
                <p className="text-xs text-gray-500">Donation Receipt</p>
              </div>

              {/* Receipt Body Table */}
              <div className="space-y-2 text-xs mb-5 font-medium">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Receipt No:</span>
                  <span className="font-mono font-bold text-brand-black">{receiptNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Donor Name:</span>
                  <span className="font-bold text-brand-black">{fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-extrabold text-brand-black">{formattedAmount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Cause:</span>
                  <span className="font-semibold text-brand-black">{selectedCauseLabel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-semibold text-brand-black">{currentDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Payment ID:</span>
                  <span className="font-mono font-bold text-brand-black">{txnId}</span>
                </div>
                {claimTax && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">PAN:</span>
                    <span className="font-mono font-bold text-brand-black">{panNumber || "XXXXXXXX"}</span>
                  </div>
                )}
              </div>

              {/* 80G Information Box */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 mb-6">
                <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  80G INFORMATION
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Tax benefit eligibility and deduction will be subject to applicable laws and the trust&rsquo;s valid 80G registration.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-full bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  <span>[ Download PDF ]</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-full border-2 border-gray-200 hover:border-brand-black text-brand-black text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <FiPrinter className="w-3.5 h-3.5" />
                  <span>[ Print Receipt ]</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
