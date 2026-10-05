'use client';

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

function HandsHeartIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Heart */}
      <path
        d="M32 23C32 23 28.5 16 22 16C16 16 12 20.8 12 26.5C12 34.5 22 42.5 32 49C42 42.5 52 34.5 52 26.5C52 20.8 48 16 42 16C35.5 16 32 23 32 23Z"
        fill="white"
      />
      {/* Heartbeat pulse inside heart */}
      <path
        d="M22 28.5H26.5L29 22.5L34 33L36.5 28.5H42"
        stroke="#032a6a"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cupping hands holding heart */}
      <path
        d="M10 42C12.5 41 16 41 20 44.5C23.5 47.5 25.5 51.5 25.5 51.5"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M54 42C51.5 41 48 41 44 44.5C40.5 47.5 38.5 51.5 38.5 51.5"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M7 35C12 36.5 16.5 41 18.5 48"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M57 35C52 36.5 47.5 41 45.5 48"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#032a6a]">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-0">
        {/* ── 1. LEFT PANEL: Become A Volunteer ── */}
        <div className="relative flex flex-col items-center justify-center text-center p-6 sm:p-12 lg:p-14 overflow-hidden bg-[#032a6a] group/left min-h-[290px] sm:min-h-[380px] lg:min-h-0">
          {/* Background Image with clear exposure */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80"
              alt="Children in community"
              fill
              className="object-cover object-center opacity-85 group-hover/left:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Blue mixed with white gradient overlays identical to hero */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/75 via-[#0e3b82]/50 to-white/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/60 via-transparent to-white/25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
          </div>

          {/* Right torn brush edge separator */}
          <div className="hidden lg:block absolute top-0 bottom-0 -right-5 w-10 h-full z-20 pointer-events-none text-brand-black">
            <svg
              viewBox="0 0 50 600"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-md"
            >
              <path
                d="M0,0 L18,0 C28,45 12,90 22,135 C32,180 15,225 28,270 C40,315 18,360 25,405 C32,450 14,495 24,540 C30,570 18,600 18,600 L0,600 Z"
                fill="#0e3b82"
              />
              <path
                d="M18,0 C28,45 12,90 22,135 C32,180 15,225 28,270 C40,315 18,360 25,405 C32,450 14,495 24,540 C30,570 18,600 18,600"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.45"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm">
            <div className="mb-3 sm:mb-4 transform group-hover/left:-translate-y-1 transition-transform duration-300">
              <HandsHeartIcon className="w-12 h-12 sm:w-15 sm:h-15 drop-shadow-md text-white" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold text-white border border-white/30 mb-2.5 sm:mb-3 shadow-sm">
              We Give A Child The Gift Of Education
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 sm:mb-6 leading-tight tracking-tight drop-shadow-sm">
              Become A Volunteer?
            </h3>

            <Link
              href="/get-involved"
              className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white hover:bg-white/90 text-brand-black text-xs sm:text-sm font-bold shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border-2 border-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-brand-red/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none"
            >
              <span>Join Our Mission</span>
              <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-brand-red" />
            </Link>
          </div>
        </div>

        {/* ── 2. CENTER PANEL: Running Child Image Only ── */}
        <div className="relative min-h-[170px] sm:min-h-[300px] lg:min-h-0 flex items-center justify-center overflow-hidden bg-neutral-900 group/center">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&q=80"
            alt="Joyful child running"
            fill
            className="object-cover grayscale brightness-95 contrast-110 group-hover/center:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-brand-black/15 group-hover/center:bg-transparent transition-colors duration-500" />
        </div>

        {/* ── 3. RIGHT PANEL: Make Donation To Us ── */}
        <div className="relative flex flex-col items-center justify-center text-center p-6 sm:p-12 lg:p-14 overflow-hidden bg-brand-red group/right min-h-[290px] sm:min-h-[380px] lg:min-h-0">
          {/* Background Image with Rich Brand-Red Gradient Tint */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=80"
              alt="Children in school"
              fill
              className="object-cover grayscale brightness-40 contrast-125 group-hover/right:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/95 via-brand-red-dark/90 to-[#662800]/95 mix-blend-multiply" />
          </div>

          {/* Left torn brush edge separator */}
          <div className="hidden lg:block absolute top-0 bottom-0 -left-5 w-10 h-full z-20 pointer-events-none text-brand-red">
            <svg
              viewBox="0 0 50 600"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-md"
            >
              <path
                d="M50,0 L32,0 C22,45 38,90 28,135 C18,180 35,225 22,270 C10,315 32,360 25,405 C18,450 36,495 26,540 C20,570 32,600 32,600 L50,600 Z"
                fill="#ff7100"
              />
              <path
                d="M32,0 C22,45 38,90 28,135 C18,180 35,225 22,270 C10,315 32,360 25,405 C18,450 36,495 26,540 C20,570 32,600 32,600"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.45"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm">
            <div className="mb-4 transform group-hover/right:-translate-y-1 transition-transform duration-300">
              <HandsHeartIcon className="w-13 h-13 sm:w-15 sm:h-15 drop-shadow-md text-white" />
            </div>

            <p className="text-xs sm:text-[13px] font-medium text-white/90 mb-2 tracking-wide">
              We Give Child A Gift Of An Education
            </p>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Make Donation To Us?
            </h3>

            <Link
              href="/donate"
              className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-brand-black text-brand-red hover:text-white text-sm font-extrabold shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-brand-red/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none"
            >
              <span>Donate Now</span>
              <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
