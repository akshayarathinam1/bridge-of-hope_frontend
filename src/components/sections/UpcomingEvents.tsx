import { apiFetch } from "@/lib/api";
import type { Paginated, Event } from "@/types/api";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import UpcomingEventsCards from "./UpcomingEventsCards";
import { SITE_IMAGES } from '@/lib/images';

/* ─── Fallback data shown when backend is unreachable ─────────────────────── */
const FALLBACK: Event[] = [
  {
    id: 1,
    slug: "school-drive",
    title: "School Kit & Uniform Distribution Drive",
    event_date: "2025-10-15T09:00:00",
    time_label: "9:00 AM – 2:00 PM",
    display_time: "9:00 AM – 2:00 PM",
    location: "Govt School, Tambaram, Chennai",
    cover_image:
      SITE_IMAGES.educationClassroom,
    status: "upcoming",
    is_featured: true,
  },
  {
    id: 2,
    slug: "medical-camp",
    title: "Free Rural Health & Vision Screening Camp",
    event_date: "2025-11-22T08:30:00",
    time_label: "8:30 AM – 4:00 PM",
    display_time: "8:30 AM – 4:00 PM",
    location: "Community Center, Kanchipuram",
    cover_image:
      SITE_IMAGES.medicalCamp,
    status: "upcoming",
    is_featured: true,
  },
  {
    id: 3,
    slug: "elderly-feast",
    title: "Old Age Home Joy Feast & Health Kits",
    event_date: "2025-12-05T11:00:00",
    time_label: "11:00 AM – 3:00 PM",
    display_time: "11:00 AM – 3:00 PM",
    location: "Anbagam Elders Shelter, Velachery",
    cover_image:
      SITE_IMAGES.elderVolunteer,
    status: "upcoming",
    is_featured: true,
  },
];

export default async function UpcomingEvents() {
  /* Fetch upcoming events; fall back to static data if the backend is down */
  let events: Event[] = FALLBACK;
  try {
    const data = await apiFetch<Paginated<Event>>(
      "/content/events/?status=upcoming",
      {},
      60,
    );
    if (data?.results?.length) {
      events = data.results.slice(0, 3);
    }
  } catch {
    /* Use fallback silently */
  }

  if (events.length === 0) {
    return (
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="container-site text-center">
          <SectionLabel className="justify-center">Join Hands Together</SectionLabel>
          <p className="text-gray-500 mt-4">
            No upcoming events right now. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <SectionLabel className="justify-center">Join Hands Together</SectionLabel>
          <SectionHeading
            title="Join Our Upcoming Events"
            subtitle="Be there on the ground with us. Connect, volunteer, and make an unforgettable memory."
            align="center"
          />
        </div>

        {/* Client component handles framer-motion animations */}
        <UpcomingEventsCards events={events} />
      </div>
    </section>
  );
}
