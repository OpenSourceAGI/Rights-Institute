/**
 * Auth configuration read at *request* time.
 *
 * Deliberately free of heavy imports (better-auth, drizzle, resend) so that
 * route handlers can ask "is auth configured?" without importing — and
 * therefore without risking a crash in — the auth instance itself.
 *
 * Everything here goes through getEnv(), which prefers the Cloudflare Worker
 * runtime env over build-time process.env: on Workers these values are
 * commonly set as runtime vars/secrets (`wrangler secret put NAME`, or the
 * Worker's dashboard settings), so reading them at request time means a
 * rotated secret takes effect without a rebuild.
 */
import { getEnv } from '@rights/env';

export const PROD_URL = 'https://rights.institute';

/**
 * Vars auth cannot start without. Everything else degrades gracefully: no
 * Google credentials only disables Google sign-in and the One Tap prompt, no
 * Resend key only disables magic-link delivery.
 */
export const REQUIRED_AUTH_ENV = ['BETTER_AUTH_SECRET', 'TURSO_DATABASE_URL'] as const;

export class AuthConfigError extends Error {
  readonly missing: string[];

  constructor(missing: string[]) {
    super(
      `Auth is not configured — missing ${missing.join(', ')}. ` +
        'Set them in .env for local dev, or on Cloudflare with ' +
        '`wrangler secret put <NAME>` (or the Worker’s dashboard settings); ' +
        'they are read per request, so no rebuild is needed. ' +
        'See content/docs/environment-variables.mdx.'
    );
    this.name = 'AuthConfigError';
    this.missing = missing;
  }
}

/** Names of the required auth vars that are absent from the runtime env. */
export function missingAuthEnv(): string[] {
  return REQUIRED_AUTH_ENV.filter((key) => !getEnv(key));
}

export function isAuthConfigured(): boolean {
  return missingAuthEnv().length === 0;
}

/** Google OAuth credentials, or null when either half is absent. */
export function googleCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = getEnv('GOOGLE_CLIENT_ID');
  const clientSecret = getEnv('GOOGLE_CLIENT_SECRET');
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

export function authBaseURL(): string {
  return (
    getEnv('BETTER_AUTH_URL') ||
    getEnv('NEXT_PUBLIC_APP_URL') ||
    (getEnv('NODE_ENV') === 'production' ? PROD_URL : 'http://localhost:3000')
  );
}
