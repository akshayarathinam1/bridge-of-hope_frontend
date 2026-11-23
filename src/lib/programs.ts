/**
 * Programs come from the admin dashboard (GET /content/programs/). This file holds what the
 * database has no field for yet, plus the links between program slugs and older addresses.
 */
import { apiFetch } from '@/lib/api';
import type { ProgramListItem } from '@/types/api';
import { SITE_IMAGES } from '@/lib/images';

/** Seconds the site caches program content, so dashboard edits show within about a minute. */
export const PROGRAM_REVALIDATE = 60;

export { LEGACY_PROGRAM_SLUGS } from '@/lib/program-redirects';

/**
 * Program slug → the donate page's cause key. Only these programs have a donation cause on the
 * donate page; a program added in the dashboard links to the general donate page instead.
 */
const DONATE_CAUSE: Record<string, string> = {
  education: 'education',
  'child-orphan-care': 'orphanage',
  'elderly-care': 'old-age',
  'medical-support': 'medical',
  'social-services': 'social-service',
};

export const programHref = (slug: string) => `/programs/${slug}`;

export const donateHrefFor = (slug: string) =>
  DONATE_CAUSE[slug] ? `/donate?cause=${DONATE_CAUSE[slug]}` : '/donate';

/**
 * Shown when the API can't be reached, so the menu, footer, program cards and program pages
 * still work. The text matches what the dashboard was seeded with.
 */
export const FALLBACK_PROGRAM_LINKS: ProgramListItem[] = [
  {
    slug: 'education',
    name: 'Education',
    icon: 'FiBookOpen',
    tagline: 'Every Child Deserves a Chance to Learn.',
    description:
      'Education opens doors to opportunity, confidence, and a brighter future. We aim to support children in accessing learning opportunities and building a strong foundation for life.',
  },
  {
    slug: 'child-orphan-care',
    name: 'Child & Orphan Care',
    icon: 'FiHome',
    tagline: 'Every Child Deserves Care and Compassion.',
    description:
      'Every child deserves to feel safe, valued, and supported. We aim to support children in need by focusing on their well-being, essential needs, and opportunities for a better future.',
  },
  {
    slug: 'elderly-care',
    name: 'Elderly Care',
    icon: 'FiHeart',
    tagline: 'Every Elder Deserves Dignity and Respect.',
    description:
      'Older adults deserve care, comfort, and companionship. We aim to support elderly people in need and promote a life filled with dignity, respect, and compassion.',
  },
  {
    slug: 'medical-support',
    name: 'Medical Support',
    icon: 'FiActivity',
    tagline: 'Healthcare Is a Need, Not a Privilege.',
    description:
      "Access to healthcare can make a meaningful difference in people's lives. We aim to support individuals and families facing medical difficulties through essential assistance and community health initiatives.",
  },
  {
    slug: 'social-services',
    name: 'Social Services',
    icon: 'FiUsers',
    tagline: 'A Small Act of Kindness Can Create Lasting Change.',
    description:
      'A helping hand can bring hope when it matters most. Through social service, we aim to support individuals and families facing challenges and contribute to stronger, more caring communities.',
  },
];

/** Programs shown on the website (hidden ones are left out by the API), in dashboard order. */
export async function fetchProgramList(): Promise<ProgramListItem[]> {
  try {
    const data = await apiFetch<ProgramListItem[]>('/content/programs/', {}, PROGRAM_REVALIDATE);
    if (Array.isArray(data)) return data;
  } catch {
    /* fall back below */
  }
  return FALLBACK_PROGRAM_LINKS;
}

/**
 * Page design text the dashboard can't edit yet (the Program model has no fields for it).
 * Name, tagline, description, cover photo and stats come from the dashboard.
 */
export interface ProgramExtras {
  focusAreas: string[];
  /** Used when the program has no cover photo in the dashboard. */
  image: string;
  imageAlt: string;
  donateLabel: string;
  cta: { lead: string; highlight: string; text: string };
}

export const PROGRAM_EXTRAS: Record<string, ProgramExtras> = {
  education: {
    focusAreas: [
      'Access to learning opportunities',
      'Educational resources and essential supplies',
      "Encouraging children's growth and development",
    ],
    image: SITE_IMAGES.educationClassroom,
    imageAlt: 'Teacher reading with schoolchildren in a classroom',
    donateLabel: 'Support Education',
    cta: {
      lead: 'Be a Part of',
      highlight: 'Their Future',
      text: 'Your support can help create opportunities for children to learn, grow, and succeed.',
    },
  },
  'child-orphan-care': {
    focusAreas: [
      'Essential needs and daily care',
      "Children's well-being and development",
      'A caring and supportive environment',
    ],
    image: SITE_IMAGES.orphanageMeal,
    imageAlt: 'Volunteer serving a meal to children sitting together at a shelter',
    donateLabel: 'Support Child and Orphan Care',
    cta: {
      lead: 'Together, We Can',
      highlight: 'Make a Difference',
      text: 'Your kindness can help children feel cared for and supported as they grow.',
    },
  },
  'elderly-care': {
    focusAreas: [
      'Essential needs and daily support',
      'Care, comfort, and companionship',
      'Promoting dignity and well-being',
    ],
    image: SITE_IMAGES.elderlyCare,
    imageAlt: 'Bridge of Hope volunteer sharing a smile with an elderly woman',
    donateLabel: 'Support Elderly Care',
    cta: {
      lead: 'Let Care',
      highlight: 'Make a Difference',
      text: 'Your support can help bring comfort and hope to older adults who need it.',
    },
  },
  'medical-support': {
    focusAreas: [
      'Medical assistance for people in need',
      'Health awareness and community initiatives',
      'Support for essential healthcare needs',
    ],
    image: SITE_IMAGES.medicalCheckup,
    imageAlt: 'Doctor checking an elderly woman’s blood pressure',
    donateLabel: 'Support Medical Care',
    cta: {
      lead: 'Help Make Healthcare',
      highlight: 'More Accessible',
      text: 'Your contribution can help people facing medical challenges receive the support they need.',
    },
  },
  'social-services': {
    focusAreas: [
      'Support for people facing hardship',
      'Essential community assistance',
      'Promoting kindness and social responsibility',
    ],
    image: SITE_IMAGES.socialOutreach,
    imageAlt: 'Volunteer meeting with women and children during a community outreach visit',
    donateLabel: 'Support Our Mission',
    cta: {
      lead: 'Be the Reason',
      highlight: 'Someone Smiles',
      text: 'Together, we can turn compassion into action and make a meaningful difference.',
    },
  },
};

/**
 * Photo for a program card or page. The five built-in programs always use their placeholder
 * photo from public/assets (see PROGRAM_EXTRAS); a program added later in the dashboard uses
 * its uploaded cover photo, or the default placeholder if it has none.
 */
export function programImage(slug: string, coverImage?: string | null): { src: string; alt: string } {
  const extras = PROGRAM_EXTRAS[slug];
  if (extras) return { src: extras.image, alt: extras.imageAlt };
  if (coverImage) return { src: coverImage, alt: '' };
  return { src: DEFAULT_PROGRAM_EXTRAS.image, alt: DEFAULT_PROGRAM_EXTRAS.imageAlt };
}

/** For programs added in the dashboard, which have no design text of their own. */
export const DEFAULT_PROGRAM_EXTRAS: ProgramExtras = {
  focusAreas: [],
  image: SITE_IMAGES.childrenSmiling,
  imageAlt: '',
  donateLabel: 'Donate Now',
  cta: {
    lead: 'Together, We Can',
    highlight: 'Make a Difference',
    text: 'Your support helps us reach more people who need care, hope and opportunity.',
  },
};
