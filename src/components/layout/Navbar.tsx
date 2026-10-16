'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useDonateModal } from "@/context/DonateModalContext";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiBookOpen,
  FiHome,
  FiHeart,
  FiActivity,
  FiUsers,
  FiArrowRight,
  FiPhoneCall,
} from "react-icons/fi";

const programs = [
  {
    label: "Education",
    href: "/programs/education",
    icon: FiBookOpen,
    desc: "School supplies, study hubs & scholarships",
    badge: "Youth",
    accent: "text-brand-orange bg-orange-50 group-hover:bg-brand-orange group-hover:text-white",
  },
  {
    label: "Child & Orphan Care",
    href: "/programs/orphanage",
    icon: FiHome,
    desc: "Safe shelters, daily nutrition & protection",
    badge: "Care",
    accent: "text-brand-orange bg-orange-50 group-hover:bg-brand-orange group-hover:text-white",
  },
  {
    label: "Elderly Care",
    href: "/programs/old-age",
    icon: FiHeart,
    desc: "Restoring comfort, medical aid & dignity",
    badge: "Dignity",
    accent: "text-brand-orange bg-orange-50 group-hover:bg-brand-orange group-hover:text-white",
  },
  {
    label: "Medical Support",
    href: "/programs/medical",
    icon: FiActivity,
    desc: "Mobile health clinics & emergency surgery grants",
    badge: "Health",
    accent: "text-brand-orange bg-orange-50 group-hover:bg-brand-orange group-hover:text-white",
  },
  {
    label: "Social Service",
    href: "/programs/social-service",
    icon: FiUsers,
    desc: "Disaster relief, clean water & empowerment",
    badge: "Relief",
    accent: "text-brand-orange bg-orange-50 group-hover:bg-brand-orange group-hover:text-white",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const { openDonateModal } = useDonateModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setProgramsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Modern Floating Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Main Navigation"
            className={clsx(
              "pointer-events-auto flex items-center justify-between px-4 sm:px-5 transition-all duration-500 rounded-2xl overflow-visible",
              "border",
              scrolled
                ? "bg-white/90 backdrop-blur-2xl border-gray-200/70 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12),0_2px_8px_-2px_rgba(0,0,0,0.06)]"
                : "bg-white/75 backdrop-blur-xl border-white/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_1px_4px_-1px_rgba(0,0,0,0.04)]"
            )}
            style={{ height: "88px" }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 group"
              aria-label="Bridge of Hope Home"
            >
              <Image
                src="/assets/bh-logo.png"
                alt="Bridge of Hope"
                width={400}
                height={400}
                className="h-[100px] sm:h-[112px] md:h-[128px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04] drop-shadow-sm"
                priority
                unoptimized
              />
            </Link>

            {/* Desktop Nav — center */}
            <div className="hidden lg:flex items-center gap-0.5 h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "relative px-4 h-full flex items-center text-[13.5px] font-semibold tracking-wide transition-colors duration-200 group",
                      isActive ? "text-brand-orange" : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    {link.label}
                    <span className={clsx(
                      "absolute bottom-0 inset-x-4 h-[2px] rounded-full bg-brand-orange transition-all duration-300 origin-center",
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    )} />
                  </Link>
                );
              })}

              {/* Programs Dropdown */}
              <li
                ref={dropdownRef}
                className="relative list-none h-full flex items-center"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                <Link
                  id="programs-dropdown-trigger"
                  href="/programs"
                  onClick={() => setProgramsOpen(false)}
                  className={clsx(
                    "relative flex items-center gap-1 px-4 h-full text-[13.5px] font-semibold tracking-wide transition-colors duration-200 group",
                    pathname.startsWith("/programs") || programsOpen
                      ? "text-brand-orange"
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  Programs
                  <FiChevronDown className={clsx("w-3.5 h-3.5 transition-transform duration-250 mt-px flex-shrink-0", programsOpen && "rotate-180")} />
                  <span className={clsx(
                    "absolute bottom-0 inset-x-4 h-[2px] rounded-full bg-brand-orange transition-all duration-300 origin-center",
                    pathname.startsWith("/programs") || programsOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  )} />
                </Link>

                <AnimatePresence>
                  {programsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-[calc(100%+10px)] left-0 w-[370px] bg-white/95 backdrop-blur-xl border border-gray-100/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] rounded-2xl p-4 z-50"
                    >
                      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-gray-100">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400">Our Programs</p>
                        <Link href="/programs" onClick={() => setProgramsOpen(false)} className="flex items-center gap-1 text-[11px] font-semibold text-brand-orange hover:underline underline-offset-2">
                          View all <FiArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="space-y-px">
                        {programs.map((prog) => {
                          const Icon = prog.icon;
                          const isCurrent = pathname === prog.href;
                          return (
                            <Link
                              key={prog.href}
                              href={prog.href}
                              onClick={() => setProgramsOpen(false)}
                              className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl group/item transition-colors duration-150",
                                isCurrent ? "bg-orange-50" : "hover:bg-gray-50/80"
                              )}
                            >
                              <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-150 group-hover/item:scale-110", prog.accent)}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-gray-800 group-hover/item:text-brand-orange transition-colors">{prog.label}</p>
                                <p className="text-[11px] text-gray-400 truncate mt-px">{prog.desc}</p>
                              </div>
                              <FiArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-brand-orange flex-shrink-0 transition-colors" />
                            </Link>
                          );
                        })}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">80G Tax Deductible · Est. 2016</span>
                        <button
                          type="button"
                          onClick={() => {
                            setProgramsOpen(false);
                            openDonateModal();
                          }}
                          className="text-[11px] font-semibold text-brand-orange hover:underline underline-offset-2"
                        >
                          Donate →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <Link
                href="/contact"
                className={clsx(
                  "relative px-4 h-full flex items-center text-[13.5px] font-semibold tracking-wide transition-colors duration-200 group",
                  pathname === "/contact" ? "text-brand-orange" : "text-gray-500 hover:text-gray-900"
                )}
              >
                Contact
                <span className={clsx(
                  "absolute bottom-0 inset-x-4 h-[2px] rounded-full bg-brand-orange transition-all duration-300 origin-center",
                  pathname === "/contact" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                )} />
              </Link>
            </div>

            {/* Right — CTA + Hamburger */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={openDonateModal}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-orange text-white text-[13px] font-bold tracking-wide hover:bg-brand-orange-dark active:scale-[0.97] transition-all duration-200 shadow-[0_2px_10px_rgba(255,97,0,0.28)]"
              >
                <FiHeart className="w-3.5 h-3.5" />
                Donate Now
              </button>

              {/* Mobile Hamburger */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
                className="lg:hidden w-9 h-9 rounded-xl border border-gray-200/80 bg-white/80 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.12 }}>
                      <HiOutlineX className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.12 }}>
                      <HiOutlineMenuAlt3 className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Modern Floating Mobile Sheet & Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/35 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Floating Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-3 sm:inset-x-5 top-[84px] sm:top-[88px] z-50 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-100/80 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)] p-5 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Primary Navigation Links */}
              <div className="flex flex-col gap-1 pb-4 border-b border-gray-100">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-between",
                    pathname === "/"
                      ? "bg-gray-100 text-brand-black"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>Home</span>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-between",
                    pathname === "/about"
                      ? "bg-gray-100 text-brand-black"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>About Us</span>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* All Programs Accordion */}
                <div>
                  <button
                    onClick={() => setMobileProgramsOpen((v) => !v)}
                    className={clsx(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors",
                      mobileProgramsOpen
                        ? "bg-brand-navy text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span>All Programs</span>
                    <FiChevronDown
                      className={clsx(
                        "w-4 h-4 transition-transform duration-200",
                        mobileProgramsOpen ? "rotate-180 text-white" : "text-gray-400"
                      )}
                    />
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300",
                      mobileProgramsOpen ? "max-h-[600px] mt-1 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="space-y-0.5 pl-2 pt-1">
                      {programs.map((prog) => {
                        const Icon = prog.icon;
                        const isCurrent = pathname === prog.href;
                        return (
                          <Link
                            key={prog.href}
                            href={prog.href}
                            onClick={() => setOpen(false)}
                            className={clsx(
                              "flex items-center gap-3 p-2.5 rounded-2xl transition-colors group",
                              isCurrent ? "bg-orange-50" : "hover:bg-gray-50"
                            )}
                          >
                            <div
                              className={clsx(
                                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105",
                                prog.accent
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                                {prog.label}
                              </p>
                              <p className="text-[11px] text-gray-500 truncate">{prog.desc}</p>
                            </div>
                            <FiArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-orange flex-shrink-0 transition-colors" />
                          </Link>
                        );
                      })}

                      <Link
                        href="/programs"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50 text-brand-orange text-xs font-bold hover:bg-orange-100 transition-colors mt-1"
                      >
                        <span>View All Programs Overview</span>
                        <FiArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-between",
                    pathname === "/contact"
                      ? "bg-gray-100 text-brand-black"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>Contact</span>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* Mobile Sheet Actions & Quick Support */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => { setOpen(false); openDonateModal(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-sm shadow-[0_4px_16px_rgba(217,38,38,0.28)] hover:shadow-lg transition-all"
                >
                  <FiHeart className="w-4 h-4 fill-white/20" />
                  <span>Donate & Support A Life</span>
                </button>

                <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                    Direct verified relief
                  </span>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="text-brand-red font-bold hover:underline flex items-center gap-1"
                  >
                    <FiPhoneCall className="w-3 h-3" />
                    <span>Get in Touch</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
