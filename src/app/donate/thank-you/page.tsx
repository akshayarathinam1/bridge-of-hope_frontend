import { Suspense } from 'react';
import ThankYouContent from './_components/ThankYouContent';

export const metadata = {
  title: 'Thank You | Bridge of Hope',
  description: 'Your donation has been received. Thank you for your generosity!',
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      {/* Suspense required because ThankYouContent uses useSearchParams */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4">
            <span className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading your receipt…</p>
          </div>
        }
      >
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
