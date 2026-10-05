import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import DonationImpactCard from "@/components/sections/DonationImpactCard";
import StatsCards from "@/components/sections/StatsCards";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Donate Now | Bridge of Hope",
  description:
    "Make a direct, 100% tax-deductible donation to Bridge of Hope. Support child education, elder care, medical support, and community welfare.",
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="Start Your Donation"
        subtitle="Your contribution transforms lives. 100% of your gift directly supports children, seniors, and families in need."
        breadcrumb="Donate Now"
      />

      {/* Interactive 4-Step Donation Flow */}
      <DonationImpactCard />

      {/* Impact Stats */}
      <StatsCards />

      {/* Donation FAQs */}
      <FaqSection />

      {/* Pre-footer Call to Action */}
      <CtaBanner />
    </main>
  );
}
