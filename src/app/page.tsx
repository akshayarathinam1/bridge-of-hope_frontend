import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import HowWeHelp from "@/components/sections/HowWeHelp";
import EqualOpportunity from "@/components/sections/EqualOpportunity";
import FeaturedCauses from "@/components/sections/FeaturedCauses";
import DonationImpactCard from "@/components/sections/DonationImpactCard";
import PhotoMosaic from "@/components/sections/PhotoMosaic";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import { fetchAbout, fetchHero } from "@/lib/content";

/* Banner and About text come from the dashboard's Site text page. */
export const revalidate = 60;

export default async function Home() {
  const [hero, about] = await Promise.all([fetchHero(), fetchAbout()]);
  return (
    <main className="min-h-screen bg-white overflow-x-hidden w-full max-w-full" suppressHydrationWarning>
      {/* 1. Hero Section: Display typography, CTA buttons, avatar stack */}
      <Hero hero={hero} />

      {/* 2. About Us: Layered photo collage, feature cards, bullet points, CTA */}
      <AboutSection about={about} />

      {/* 3. How We Help: Rounded-top card, 3 feature cards with images, relief portrait */}
      <HowWeHelp />

      {/* 4. Equal Opportunity: Stacked photo card, core narrative, checklist */}
      <EqualOpportunity />

      {/* 5. Featured Causes: Campaign cards with progress bars and donation CTAs */}
      <FeaturedCauses />

      {/* 6. Interactive Donation Impact Calculator: Monthly/One-time giving + beneficiary photos */}
      <DonationImpactCard />

      {/* 7. Photo Mosaic: 6-photo community strip */}
      <PhotoMosaic />

      {/* 8. Upcoming Events: Date badges & field activities */}
      <UpcomingEvents />

      {/* 9. FAQ Section: Image + interactive accordion */}
      <FaqSection />

      {/* 10. CTA Banner: Deep green/red final donation call */}
      <CtaBanner />
    </main>
  );
}

