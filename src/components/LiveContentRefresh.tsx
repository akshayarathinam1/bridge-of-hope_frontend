'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

/** How often an open page checks for content changes while it's visible. */
const POLL_MS = 4000;

/**
 * Shows dashboard edits on pages that are already open, without a reload.
 *
 * The backend bumps a content version after website content is saved and the site's cache is
 * refreshed (GET /content/version/). While the tab is visible this checks it every few seconds;
 * when it changes, router.refresh() re-renders the page with the new content and keeps scroll
 * position and anything typed into forms.
 */
export default function LiveContentRefresh() {
  const router = useRouter();

  useEffect(() => {
    let known: number | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    async function check() {
      if (stopped) return;
      if (document.visibilityState === 'visible') {
        try {
          const res = await fetch(`${API_BASE}/content/version/`, { cache: 'no-store' });
          if (res.ok) {
            const { version } = (await res.json()) as { version: number };
            if (known !== null && version !== known) router.refresh();
            known = version;
          }
        } catch {
          /* offline or backend down: try again next time */
        }
      }
      if (!stopped) timer = setTimeout(check, POLL_MS);
    }

    // Check straight away when someone comes back to the tab.
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        clearTimeout(timer);
        void check();
      }
    };

    void check();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      stopped = true;
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [router]);

  return null;
}
