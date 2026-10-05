'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
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
      {/* Floating Capsule Header Wrapper */}
      <header className="fixed top-2.5 sm:top-4 md:top-5 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Main Navigation"
            className={clsx(
              "pointer-events-auto transition-all duration-300 ease-out",
              "rounded-full px-4 sm:px-6 md:px-7 py-2",
              "flex items-center justify-between gap-3 sm:gap-6",
              "border",
              scrolled
                ? "bg-white/98 backdrop-blur-xl border-gray-200/90 shadow-[0_16px_45px_-8px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.05)]"
                : "bg-white/96 backdrop-blur-xl border-white/90 shadow-[0_12px_40px_-6px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.04)]"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 group py-0.5"
              aria-label="Bridge of Hope Home"
            >
              <Image
                src="/assets/bridgeofhope_logo.png"
                alt="Bridge of Hope"
                width={400}
                height={400}
                className="h-16 sm:h-20 md:h-[84px] lg:h-[96px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-xs"
                priority
                unoptimized
              />
            </Link>

            {/* Desktop Center Navigation Island */}
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/60 backdrop-blur-xs">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={clsx(
                          "px-5 py-2 text-sm xl:text-base font-extrabold rounded-full transition-all duration-200 block tracking-wide",
                          isActive
                            ? "bg-white text-brand-black shadow-xs"
                            : "text-gray-700 hover:text-brand-black hover:bg-white/60"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}

                {/* Programs Link & Dropdown */}
                <li
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setProgramsOpen(true)}
                  onMouseLeave={() => setProgramsOpen(false)}
                >
                  <Link
                    id="programs-dropdown-trigger"
                    href="/programs"
                    onClick={() => setProgramsOpen(false)}
                    className={clsx(
                      "flex items-center gap-2 px-5 py-2 text-sm xl:text-base font-extrabold rounded-full transition-all duration-200 tracking-wide",
                      pathname === "/programs" || pathname.startsWith("/programs") || programsOpen
                        ? "bg-white text-brand-black shadow-xs"
                        : "text-gray-700 hover:text-brand-black hover:bg-white/60"
                    )}
                  >
                    <span>Programs</span>
                    <FiChevronDown
                      className={clsx(
                        "w-4 h-4 transition-transform duration-200 stroke-[2.5]",
                        programsOpen && "rotate-180 text-brand-orange"
                      )}
                    />
                  </Link>

                  {/* Desktop Programs Popover */}
                  <AnimatePresence>
                    {programsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] sm:w-[400px] rounded-3xl bg-white/98 backdrop-blur-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.06)] border border-white/80 p-3 z-50 overflow-hidden"
                      >
                        {/* Popover Header */}
                        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 mb-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                            Our Initiatives
                          </span>
                          <Link
                            href="/programs"
                            onClick={() => setProgramsOpen(false)}
                            className="text-[11px] font-bold text-brand-orange hover:text-brand-orange-dark flex items-center gap-1 transition-colors"
                          >
                            <span>Explore All 5</span>
                            <FiArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        {/* Program List */}
                        <div className="space-y-1">
                          {programs.map((prog) => {
                            const Icon = prog.icon;
                            const isCurrent = pathname === prog.href;
                            return (
                              <Link
                                key={prog.href}
                                href={prog.href}
                                onClick={() => setProgramsOpen(false)}
                                className={clsx(
                                  "flex items-center gap-3 p-2.5 rounded-2xl group transition-all duration-150",
                                  isCurrent ? "bg-orange-50/50" : "hover:bg-gray-50/90"
                                )}
                              >
                                <div
                                  className={clsx(
                                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105 shadow-xs",
                                    prog.accent
                                  )}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-brand-black group-hover:text-brand-orange transition-colors">
                                      {prog.label}
                                    </p>
                                    <FiArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
                                  </div>
                                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-normal">
                                    {prog.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Popover Footer Banner */}
                        <div className="mt-2.5 pt-2.5 border-t border-gray-100/90 bg-gray-50/70 -mx-3 -mb-3 p-3 flex items-center justify-between">
                          <span className="text-[11px] text-gray-500 font-semibold">
                            100% Tax Deductible
                          </span>
                          <Link
                            href="/donate"
                            onClick={() => setProgramsOpen(false)}
                            className="text-[11px] font-extrabold text-brand-orange hover:text-brand-orange-dark hover:underline flex items-center gap-1"
                          >
                            <span>Donate Directly</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {/* Contact Link */}
                <li>
                  <Link
                    href="/contact"
                    className={clsx(
                      "px-5 py-2 text-sm xl:text-base font-extrabold rounded-full transition-all duration-200 block tracking-wide",
                      pathname === "/contact"
                        ? "bg-white text-brand-black shadow-xs"
                        : "text-gray-700 hover:text-brand-black hover:bg-white/60"
                    )}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">

              {/* Modern Floating CTA Button */}
              <Link
                href="/donate"
                className="group relative inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-extrabold text-white overflow-hidden shadow-[0_4px_16px_rgba(217,38,38,0.28)] hover:shadow-[0_6px_22px_rgba(217,38,38,0.38)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-red to-brand-orange group-hover:from-brand-red-hover group-hover:to-brand-orange transition-all duration-300" />
                <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                  <FiHeart className="w-4 h-4 fill-white/20 text-white group-hover:scale-110 transition-transform duration-200" />
                  <span>Donate Now</span>
                </span>
              </Link>

              {/* Mobile Hamburger Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
                className="lg:hidden w-9 h-9 rounded-full bg-gray-100/90 hover:bg-gray-200/90 flex items-center justify-center text-brand-black transition-colors"
              >
                {open ? (
                  <HiOutlineX className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <HiOutlineMenuAlt3 className="w-5 h-5" aria-hidden="true" />
                )}
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
              className="fixed inset-x-3 sm:inset-x-6 top-24 sm:top-28 z-50 rounded-3xl bg-white/98 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-5 lg:hidden max-h-[85vh] overflow-y-auto"
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
                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-sm shadow-[0_4px_16px_rgba(217,38,38,0.28)] hover:shadow-lg transition-all"
                >
                  <FiHeart className="w-4 h-4 fill-white/20" />
                  <span>Donate & Support A Life</span>
                </Link>

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
