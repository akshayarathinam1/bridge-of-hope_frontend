import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * POST /api/revalidate — the Django backend calls this right after website content is saved in
 * the admin dashboard (apps/content/signals.py), so the change shows at once instead of after the
 * 60-second cache. Authenticated with the shared REVALIDATE_SECRET in the X-Revalidate-Secret header.
 */
function authorised(request: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  const given = request.headers.get('x-revalidate-secret');
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) {
    return NextResponse.json({ revalidated: false, message: 'Not allowed.' }, { status: 401 });
  }
  // Content shows up across the site (navbar and footer program lists, home, programs, gallery),
  // so refresh every page and the API data they cached.
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
