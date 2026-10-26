import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DonatePageClient from '@/components/sections/DonatePageClient';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Donate Now | Bridge of Hope Foundation',
  description:
    'Make a direct, 100% tax-deductible donation to Bridge of Hope. Support child education, orphan care, elderly care, medical support, and community welfare.',
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Make a Difference Today"
        subtitle="Choose a program you care about and help us bring care, hope, and opportunity to those who need it most."
        breadcrumb="Donate"
      />
      <Suspense fallback={<div className="py-20 text-center text-gray-400 text-sm">Loading…</div>}>
        <DonatePageClient />
      </Suspense>
      <CtaBanner />
    </main>
  );
}

