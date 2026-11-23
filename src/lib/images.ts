// Site photos, served from public/assets. Sources and licence: public/assets/CREDITS.md.
// teacher-classroom, elder-care-volunteer, girl-classroom, teacher-children-smiling and elder-companion are the foundation's own photos.
// To swap a photo (for example for the foundation's own), replace the file or change its path here.
// How each photo is framed inside cropped boxes is set in src/app/globals.css (focal points).
/**
 * Photos that always win over the API's cover image, keyed by campaign slug (featured causes)
 * and by program slug. Done on the frontend so the dashboard/backend data stays untouched.
 */
export const CAUSE_IMAGE_OVERRIDES: Record<string, string> = {
  medical: '/assets/medical-checkup.webp',
  'medical-support': '/assets/medical-checkup.webp',
  orphanage: '/assets/orphanage-meal.jpg',
  'child-orphan-care': '/assets/orphanage-meal.jpg',
  'social-service': '/assets/social-service-outreach.jpg',
  'social-services': '/assets/social-service-outreach.jpg',
};

Object.assign(CAUSE_IMAGE_OVERRIDES, {
  'old-age': '/assets/elder-care-volunteer.jpg',
  'elderly-care': '/assets/elder-care-volunteer.jpg',
  'elder-care': '/assets/elder-care-volunteer.jpg',
  elderly: '/assets/elder-care-volunteer.jpg',
  'child-care': '/assets/orphanage-meal.jpg',
});

/** Override photo for a campaign: matched by slug, then by name (dashboard slugs vary). */
export function causeImageOverride(slug: string, name?: string): string | undefined {
  if (CAUSE_IMAGE_OVERRIDES[slug]) return CAUSE_IMAGE_OVERRIDES[slug];
  const n = (name ?? '').toLowerCase();
  if (/elder|old age/.test(n)) return '/assets/elder-care-volunteer.jpg';
  if (/orphan|child care/.test(n)) return '/assets/orphanage-meal.jpg';
  if (/medical|health/.test(n)) return '/assets/medical-checkup.webp';
  if (/social/.test(n)) return '/assets/social-service-outreach.jpg';
  return undefined;
}

export const SITE_IMAGES = {
  hero: '/assets/hero-children.jpg',
  childrenSmiling: '/assets/teacher-children-smiling.jpg',
  educationClassroom: '/assets/teacher-classroom.jpg',
  medicalCamp: '/assets/medical-camp.jpg',
  volunteersAid: '/assets/volunteers-aid.jpg',
  elderlyCare: '/assets/elder-care-volunteer.jpg',
  communityWater: '/assets/community-water.jpg',
  elderVolunteer: '/assets/elder-companion.jpg',
  volunteerGroup: '/assets/volunteer-group.jpg',
  primaryClass: '/assets/girl-classroom.jpg',
  childStudying: '/assets/child-studying.jpg',
  healthWorker: '/assets/health-worker.jpg',
  volunteerTeam: '/assets/volunteer-team.jpg',
  communityMeeting: '/assets/community-meeting.jpg',
  medicalCheckup: '/assets/medical-checkup.webp',
  orphanageMeal: '/assets/orphanage-meal.jpg',
  socialOutreach: '/assets/social-service-outreach.jpg',
  aboutHero:'/assets/about-hero.jpg',
  childrenGroup: '/assets/children-group.jpg',
  portraitWoman1: '/assets/portrait-woman-1.jpg',
  portraitWoman2: '/assets/portrait-woman-2.jpg',
  portraitMan1: '/assets/portrait-man-1.jpg',
  portraitMan2: '/assets/portrait-man-2.jpg',
} as const;
