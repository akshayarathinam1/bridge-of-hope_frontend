/**
 * Older program page addresses → the program's slug in the database. No imports, because
 * next.config.ts reads this for its redirects.
 */
export const LEGACY_PROGRAM_SLUGS: Record<string, string> = {
  orphanage: 'child-orphan-care',
  'old-age': 'elderly-care',
  medical: 'medical-support',
  'social-service': 'social-services',
};
