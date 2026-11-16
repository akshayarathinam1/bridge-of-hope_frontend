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

/** Shown when the API can't be reached, so the menu and footer still have links. */
export const FALLBACK_PROGRAM_LINKS: ProgramListItem[] = [
  { slug: 'education', name: 'Education', icon: 'FiBookOpen' },
  { slug: 'child-orphan-care', name: 'Child & Orphan Care', icon: 'FiHome' },
  { slug: 'elderly-care', name: 'Elderly Care', icon: 'FiHeart' },
  { slug: 'medical-support', name: 'Medical Support', icon: 'FiActivity' },
  { slug: 'social-services', name: 'Social Services', icon: 'FiUsers' },
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
    imageAlt: 'Children learning together in a bright classroom',
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
    image: SITE_IMAGES.childrenSmiling,
    imageAlt: 'Happy children smiling at a community care centre',
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
    imageAlt: 'Smiling elderly woman in a red headscarf',
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
    image: SITE_IMAGES.medicalCamp,
    imageAlt: 'Community health worker recording details on a tablet',
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
    image: SITE_IMAGES.communityWater,
    imageAlt: 'Woman carrying water past village homes with children',
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
