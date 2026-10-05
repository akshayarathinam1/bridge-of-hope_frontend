import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bridge of Hope | Building Hope • Changing Lives",
  description:
    "Bridge of Hope empowers vulnerable communities through education, old age care, orphanage support, medical assistance, and social service.",
  icons: {
    icon: "/assets/bridgeofhope_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Strip external browser extension attributes (e.g. rtrvr-ls) before React hydration to prevent mismatches */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                function cleanExtensionAttrs() {
                  var els = document.querySelectorAll('[rtrvr-ls]');
                  for (var i = 0; i < els.length; i++) {
                    els[i].removeAttribute('rtrvr-ls');
                  }
                }
                cleanExtensionAttrs();
                var observer = new MutationObserver(function(mutations) {
                  for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    if (m.type === 'attributes' && m.attributeName && m.attributeName.indexOf('rtrvr') === 0) {
                      m.target.removeAttribute(m.attributeName);
                    }
                  }
                });
                observer.observe(document.documentElement, { attributes: true, subtree: true });
                window.addEventListener('DOMContentLoaded', cleanExtensionAttrs);
                window.addEventListener('load', function() {
                  setTimeout(function() { observer.disconnect(); }, 1500);
                }, { once: true });
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen flex flex-col bg-white text-brand-black antialiased selection:bg-brand-red selection:text-white`}
      >
        <Navbar />
        <div className="flex-1 flex flex-col" suppressHydrationWarning>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
