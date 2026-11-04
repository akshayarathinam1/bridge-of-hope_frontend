/**
 * Typed API client for the Bridge of Hope backend.
 * Base URL is set via NEXT_PUBLIC_API_URL in .env.local
 */

const BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

/**
 * Fetch wrapper with ISR revalidation support.
 * @param path    - API path, e.g. '/campaigns/'
 * @param options - Native fetch RequestInit options
 * @param revalidate - ISR cache TTL in seconds (default 60). Pass 0 to disable.
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  revalidate = 60,
): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    next: { revalidate },
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Mutation helper for POST/PUT/PATCH — always bypasses cache.
 * Returns the parsed JSON body and the HTTP status code.
 */
export async function apiMutate<T>(
  path: string,
  body: unknown,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  extraHeaders?: Record<string, string>,
): Promise<{ data: T; status: number }> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = (await res.json()) as T;
  return { data, status: res.status };
}
