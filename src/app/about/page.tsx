import AboutContent from './_components/AboutContent';
import { fetchAbout, fetchTeam } from '@/lib/content';

/* Text and team come from the dashboard's Site text page. */
export const revalidate = 60;

export default async function AboutPage() {
  const [about, team] = await Promise.all([fetchAbout(), fetchTeam()]);
  return <AboutContent about={about} team={team} />;
}
