'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaBanner from "@/components/sections/CtaBanner";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiSend,
  FiShield,
} from "react-icons/fi";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-white text-brand-black">
      {/* ─────────────────────────────────────────────────────────────
          1. PAGE HEADER
      ───────────────────────────────────────────────────────────── */}
      <PageHeader
        title="Contact Us"
        subtitle="Have a question, feedback, or want to get in touch? Send us a message and our team will get back to you promptly."
        breadcrumb="Contact"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. FOCUSED SINGLE CONTACT FORM SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-site max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <SectionLabel>Get In Touch</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-1 mb-4">
                  We&apos;d Love to{" "}
                  <span className="text-brand-orange">Hear From You</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Whether you have questions about our initiatives, want to support our programs, or need assistance, our team is always here to help.
                </p>
              </div>

              {/* Direct Info Items */}
              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red-light flex items-center justify-center text-brand-red flex-shrink-0">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Phone &amp; Helpline
                    </h3>
                    <a
                      href="tel:+911234567890"
                      className="text-sm font-semibold text-brand-black hover:text-brand-red transition-colors block"
                    >
                      +91 12345 67890
                    </a>
                    <span className="text-xs text-gray-500">
                      Mon – Sat, 9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red-light flex items-center justify-center text-brand-red flex-shrink-0">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Email Address
                    </h3>
                    <a
                      href="mailto:info@hopebridgefoundation.org"
                      className="text-sm font-semibold text-brand-black hover:text-brand-red transition-colors block"
                    >
                      info@hopebridgefoundation.org
                    </a>
                    <span className="text-xs text-gray-500">
                      Response within 24 business hours
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red-light flex items-center justify-center text-brand-red flex-shrink-0">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Registered Office
                    </h3>
                    <p className="text-sm text-gray-700 leading-snug">
                      123, Hope Street, Anna Nagar,
                      <br />
                      Chennai, Tamil Nadu, India — 600001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red-light flex items-center justify-center text-brand-red flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-sm text-gray-700">
                      Monday to Saturday: 9:00 AM – 6:30 PM
                      <br />
                      <span className="text-xs text-gray-500">Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
                  <FiShield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-black">
                    NITI Aayog Registered Non-Profit
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Reg. TN/2016/0123456 • 80G Tax Benefit Applicable
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Single Focused Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 shadow-xl p-7 sm:p-10"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-brand-black tracking-tight mb-2">
                  Send Us A Message
                </h3>
                <p className="text-gray-600 text-sm">
                  Please fill in the form below and we will respond as soon as possible.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-navy mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-brand-navy/80 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out. Our team has received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy/90 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Subject <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Subject of your message"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Message <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-gray-500 pt-1">
                    <FiShield className="w-4 h-4 text-brand-navy flex-shrink-0" />
                    <span>Your information is protected and will never be shared.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative overflow-hidden group inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm shadow-[0_4px_18px_rgba(255,113,0,0.35)] hover:shadow-[0_8px_25px_rgba(255,113,0,0.5)] transition-all duration-300 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiSend className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CTA BANNER
      ───────────────────────────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
