/**
 * Website text and photos edited in the admin dashboard's "Site text" page.
 * Every helper returns null / [] when the API can't be reached, so pages fall back to their
 * built-in text instead of breaking.
 */
import { apiFetch } from '@/lib/api';
import { PROGRAM_REVALIDATE } from '@/lib/programs';
import type { AboutSection, HeroSection, ImpactStat, TeamMember } from '@/types/api';

/** Same refresh window as programs; saves in the dashboard also refresh the site at once. */
export const CONTENT_REVALIDATE = PROGRAM_REVALIDATE;

async function get<T>(path: string): Promise<T | null> {
  try {
    return await apiFetch<T>(path, {}, CONTENT_REVALIDATE);
  } catch {
    return null;
  }
}

/** The active home page banner (the API lists active ones; the dashboard edits the first). */
export async function fetchHero(): Promise<HeroSection | null> {
  const data = await get<HeroSection[]>('/content/hero/');
  return Array.isArray(data) && data.length ? data[0] : null;
}

export type AboutContent = Partial<Record<AboutSection['section_type'], AboutSection>>;

/** Story, mission, vision and values, keyed by section type. */
export async function fetchAbout(): Promise<AboutContent> {
  const data = await get<AboutSection[]>('/content/about/');
  return Object.fromEntries((Array.isArray(data) ? data : []).map((s) => [s.section_type, s]));
}

/** Visible impact numbers, in dashboard order. */
export async function fetchImpactStats(): Promise<ImpactStat[]> {
  const data = await get<ImpactStat[]>('/content/impact-stats/');
  return Array.isArray(data) ? data : [];
}

/** Visible team members, in dashboard order. */
export async function fetchTeam(): Promise<TeamMember[]> {
  const data = await get<TeamMember[]>('/content/team/');
  return Array.isArray(data) ? data : [];
}

/** Splits text into paragraphs on blank lines (or single new lines). */
export const paragraphs = (text: string | undefined | null): string[] =>
  (text ?? '').split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean);

/**
 * "Compassion: We listen…" lines → [{ title, desc }]. Used for the Values section, which the
 * dashboard edits as one line per value. Lines without a ":" or " - " become a title only.
 */
export function parseTitledLines(text: string | undefined | null): { title: string; desc: string }[] {
  return paragraphs(text).map((line) => {
    const match = line.match(/^(.{1,60}?)\s*(?::|\s[-–—]\s)\s*(.+)$/);
    return match ? { title: match[1].trim(), desc: match[2].trim() } : { title: line, desc: '' };
  });
}

/**
 * Splits a headline so its end can be highlighted, matching the site's design:
 * after the last full stop ("Give Hope. Create Change. | Transform Lives."), else after the
 * last comma ("Building a Better Tomorrow, | Together"), else the last two words.
 */
export function splitHighlight(text: string): [string, string] {
  const clean = text.trim();
  const sentences = clean.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 1) {
    const last = sentences[sentences.length - 1];
    return [clean.slice(0, clean.length - last.length).trim(), last.trim()];
  }
  const comma = clean.lastIndexOf(', ');
  if (comma > 0) return [clean.slice(0, comma + 1), clean.slice(comma + 2)];
  const words = clean.split(/\s+/);
  if (words.length < 3) return ['', clean];
  return [words.slice(0, -2).join(' '), words.slice(-2).join(' ')];
}
