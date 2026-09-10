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

/** Hostnames this deployment is known to answer on, beyond whatever the env says. */
export const KNOWN_ORIGINS = [
  PROD_URL,
  'https://www.rights.institute',
  'http://localhost:3000',
  'http://localhost:9000',
] as const;

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

/**
 * The Google OAuth client ID.
 *
 * Public by design — it ships to the browser so Google One Tap can initialize —
 * so unlike the secret it is safe to serve from an API route. Falls back to a
 * `NEXT_PUBLIC_` copy for deployments that prefer build-time inlining.
 */
export function googleClientId(): string {
  return getEnv('GOOGLE_CLIENT_ID') || getEnv('NEXT_PUBLIC_GOOGLE_CLIENT_ID') || '';
}

/** Google OAuth credentials, or null when either half is absent. */
export function googleCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = googleClientId();
  const clientSecret = getEnv('GOOGLE_CLIENT_SECRET');
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

/**
 * The base URL better-auth builds absolute URLs from — most importantly the
 * Google `redirect_uri`, `${baseURL}/api/auth/callback/google`.
 *
 * Returning `undefined` is meaningful and is the normal case in production:
 * better-auth then derives the origin from the incoming request, which is the
 * only correct answer on Cloudflare Workers, where one deploy answers on
 * rights.institute, www.rights.institute and *.workers.dev preview URLs alike.
 *
 * This used to fall back to `NODE_ENV === 'production' ? PROD_URL : localhost`.
 * That guess is unsafe here: `getEnv('NODE_ENV')` reads `process.env` through a
 * computed key, which no bundler can inline, and Workers do not set NODE_ENV in
 * the runtime env — so the check read `undefined` in production and pinned the
 * base URL to `http://localhost:3000`. Every Google sign-in then asked for a
 * localhost `redirect_uri` and was rejected as a redirect_uri_mismatch.
 */
export function authBaseURL(): string | undefined {
  const explicit = getEnv('BETTER_AUTH_URL') || getEnv('NEXT_PUBLIC_APP_URL');
  if (explicit) return explicit;

  // Only an *explicit* dev/test signal justifies assuming localhost.
  const nodeEnv = getEnv('NODE_ENV');
  if (nodeEnv === 'development' || nodeEnv === 'test') return 'http://localhost:3000';

  return undefined;
}

/**
 * Origins better-auth accepts sign-in requests and post-login redirects from.
 *
 * The configured base URL is included so a preview deployment (or a custom
 * domain set via BETTER_AUTH_URL) isn't rejected by the CSRF origin check.
 */
export function trustedOrigins(): string[] {
  const origins = new Set<string>(KNOWN_ORIGINS);

  for (const value of [getEnv('BETTER_AUTH_URL'), getEnv('NEXT_PUBLIC_APP_URL')]) {
    if (!value) continue;
    try {
      origins.add(new URL(value).origin);
    } catch {
      // A malformed URL in the env shouldn't take auth down; the known
      // origins above still apply.
    }
  }

  return [...origins];
}
