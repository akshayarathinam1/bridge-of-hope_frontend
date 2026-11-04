import Image from "next/image";
import { apiFetch } from "@/lib/api";
import type { FAQ } from "@/types/api";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqAccordion from "./FaqAccordion";

/* ─── Fallback data shown when backend is unreachable ─────────────────────── */
const FALLBACK: FAQ[] = [
  {
    question: "Is my donation eligible for 80G tax exemption in India?",
    answer:
      "Yes! Bridge of Hope is registered under Section 80G of the Income Tax Act. You will immediately receive an official 80G tax exemption receipt via email for all eligible donations.",
    display_order: 1,
  },
  {
    question: "How are my donated funds utilized and audited?",
    answer:
      "Over 88% of all funds directly support grassroots field programs – providing tuition fees, school meals, medical aid, and elderly hospice care. We undergo annual independent audits and publish our verified statements.",
    display_order: 2,
  },
  {
    question: "Can I visit the orphanage or elder care home in person?",
    answer:
      "Absolutely! We welcome donors, mentors, and families to visit our care centers in Chennai. Please contact our volunteer desk 48 hours ahead so our coordinators can give you a guided tour.",
    display_order: 3,
  },
  {
    question: "How can our company partner with Bridge of Hope for CSR?",
    answer:
      "We collaborate with corporate partners on custom CSR initiatives aligned with Schedule VII – including rural school STEM transformations, free healthcare drives, and employee volunteering days.",
    display_order: 4,
  },
];

export default async function FaqSection() {
  /* Fetch FAQs from backend; fall back to static data if unavailable */
  let faqs: FAQ[] = FALLBACK;
  try {
    const data = await apiFetch<FAQ[]>("/content/faqs/", {}, 300);
    if (Array.isArray(data) && data.length > 0) {
      faqs = data;
    }
  } catch {
    /* Use fallback silently */
  }

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-gray-50/70 border-t border-gray-100">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left: Image matching reference design */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-4 border-white aspect-[16/10] sm:aspect-[4/5] max-w-sm mx-auto lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=85"
                alt="Bridge of Hope children and community supported by volunteers"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <p className="text-[10px] sm:text-xs uppercase font-bold text-brand-orange tracking-wider mb-1">
                  Have Any Questions?
                </p>
                <p className="text-xs sm:text-sm font-bold">
                  We are here to help you understand how your impact works.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Accordion (client component) */}
          <div className="lg:col-span-7">
            <SectionLabel>Common Inquiries</SectionLabel>
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our work, compliance, and how your contribution transforms lives."
              align="left"
            />
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
