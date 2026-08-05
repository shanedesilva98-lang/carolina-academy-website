import "server-only";

/**
 * Minimal in-memory rate limiter for form API routes.
 *
 * This is process-local — fine for a single-instance deployment or as a
 * first line of defence, but it resets on redeploy and does not share state
 * across serverless instances. For production at scale, replace with a
 * shared store (Upstash Redis, Vercel KV, etc.) behind the same
 * `checkRateLimit()` signature.
 */

const WINDOW_MS = Number(process.env.FORM_RATE_LIMIT_WINDOW_MS ?? 60_000);
const MAX_SUBMISSIONS = Number(process.env.FORM_RATE_LIMIT_MAX_SUBMISSIONS ?? 5);

const hits = new Map<string, number[]>();

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const existing = (hits.get(identifier) ?? []).filter((t) => t > windowStart);

  if (existing.length >= MAX_SUBMISSIONS) {
    const retryAfterMs = existing[0] + WINDOW_MS - now;
    return { allowed: false, retryAfterMs };
  }

  existing.push(now);
  hits.set(identifier, existing);
  return { allowed: true };
}
