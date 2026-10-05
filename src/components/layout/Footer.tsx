import Link from "next/link";
import Image from "next/image";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Donate Now", href: "/donate" },
];

const programs = [
  { label: "Education", href: "/programs/education" },
  { label: "Old Age Care", href: "/programs/old-age" },
  { label: "Orphanage Support", href: "/programs/orphanage" },
  { label: "Medical Help", href: "/programs/medical" },
  { label: "Social Services", href: "/programs/social-service" },
];

const socials = [
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiTwitter, href: "#", label: "Twitter" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#032a6a] text-white overflow-hidden">
      {/* Background Image and Hero-matched white + blue overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/close-up-people-volunteer-teamwork-join-hands-togetherstack-handsunity-teamwork-volunteering-conceptual.jpg"
          alt="Bridge of Hope community volunteers teamwork"
          fill
          className="object-cover object-center opacity-40 mix-blend-luminosity"
        />
        {/* Blue mixed with white gradient overlays identical to hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032a6a]/85 via-[#0e3b82]/65 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032a6a]/75 via-[#032a6a]/40 to-white/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_65%)]" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />

      {/* Main Footer */}
      <div className="container-site relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5" aria-label="Bridge of Hope home">
              <div className="bg-white rounded-2xl p-3 inline-flex items-center justify-center shadow-lg border border-white">
                <Image
                  src="/assets/bridgeofhope_logo.png"
                  alt="Bridge of Hope"
                  width={260}
                  height={260}
                  className="h-18 md:h-20 w-auto object-contain"
                  unoptimized
                />
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Building Hope • Changing Lives. Dedicated to uplifting vulnerable
              communities through education, care, and compassion since 2016.
            </p>
            {/* Socials with crisp white pill buttons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-brand-black hover:bg-brand-red hover:text-white shadow-md border border-white/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-white/90" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="block w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-white/90" />
              Programs
            </h3>
            <ul className="space-y-3">
              {programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="block w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact with white glass cards */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-white/90" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@hopebridgefoundation.org"
                  className="flex items-center gap-3 text-sm text-white/85 hover:text-white transition-colors group p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 shadow-sm"
                >
                  <span className="w-7 h-7 rounded-lg bg-white text-brand-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FiMail className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                  </span>
                  <span className="truncate">info@hopebridgefoundation.org</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-3 text-sm text-white/85 hover:text-white transition-colors group p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 shadow-sm"
                >
                  <span className="w-7 h-7 rounded-lg bg-white text-brand-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FiPhone className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                  </span>
                  <span>+91 12345 67890</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/85 p-2.5 rounded-xl bg-white/10 border border-white/15 shadow-sm">
                <span className="w-7 h-7 rounded-lg bg-white text-brand-black flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <FiMapPin className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                </span>
                <span>123, Hope Street, Chennai, Tamil Nadu, India — 600001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with white tint */}
      <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-white/75">
            &copy; {new Date().getFullYear()} Bridge of Hope. All rights reserved.
          </p>
          <p className="text-xs text-white/75 flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <span>NITI Aayog Reg. No: <strong className="text-white">TN/2016/0123456</strong></span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-bold border border-white/20">
              80G Tax Benefit Applicable
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
