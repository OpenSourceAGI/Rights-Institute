export const dynamic = 'force-dynamic';

import { getEnv } from '@/lib/env';
import { missingAuthEnv } from '@/lib/auth-config';

/**
 * Deployment diagnostics: which configuration the running instance can
 * actually see. Reports presence only — never a value — so it is safe to
 * hit in production when something like `/api/auth/get-session` starts
 * failing and the Worker logs aren't at hand.
 */
export async function GET(): Promise<Response> {
  const missing = missingAuthEnv();

  const body = {
    status: missing.length === 0 ? 'ok' : 'degraded',
    config: {
      auth: missing.length === 0,
      database: Boolean(getEnv('TURSO_DATABASE_URL')),
      google: Boolean(getEnv('GOOGLE_CLIENT_ID') && getEnv('GOOGLE_CLIENT_SECRET')),
      magicLinkEmail: Boolean(getEnv('AUTH_RESEND_KEY')),
    },
    // Names of required-but-absent vars. Names only; never the values.
    missing,
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
