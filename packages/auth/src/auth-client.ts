'use client';

import { createAuthClient } from 'better-auth/react';
import { magicLinkClient, oneTapClient } from 'better-auth/client/plugins';

/**
 * Where the browser gets the Google client ID from.
 *
 * It has to arrive from somewhere at *runtime*: this app deploys to Cloudflare
 * Workers, where env vars are normally runtime vars/secrets (`wrangler secret
 * put`, or the Worker's dashboard) rather than values present in the build
 * environment. Three sources are tried, cheapest first:
 *
 *  1. `<script id="google-client-id" type="application/json">` — written by the
 *     root layout. Free when it's there, but the layout is prerendered on a
 *     statically-generated route, so on Workers it can be baked as `""` at
 *     build time. That is exactly why One Tap never appeared: the previous
 *     version read this tag once, at module-eval time, and gave up on `""`.
 *  2. `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, inlined at build time — the plain
 *     approach, for deployments that do have the value when they build.
 *  3. `GET /api/client-config`, a dynamic route that reads the Worker's
 *     runtime env. Always correct, costs one request, and is only reached when
 *     the two free sources came up empty.
 *
 * The client ID is public — it ships in every Google sign-in URL — so serving
 * it from an endpoint discloses nothing. The *secret* never leaves the server.
 */

const CLIENT_CONFIG_ENDPOINT = '/api/client-config';

let cachedClientId = '';
let inFlight: Promise<string> | null = null;

function fromScriptTag(): string {
  if (typeof document === 'undefined') return '';
  const el = document.getElementById('google-client-id');
  if (!el?.textContent) return '';
  try {
    const value = JSON.parse(el.textContent);
    return typeof value === 'string' ? value : '';
  } catch {
    return '';
  }
}

function fromBuildTimeEnv(): string {
  // Guarded twice over: `process` is simply absent in the browser unless the
  // bundler inlined the value, and vinext does not inline NEXT_PUBLIC_* into
  // the client bundle today — which is precisely why source 3 exists.
  try {
    if (typeof process === 'undefined') return '';
    return process.env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';
  } catch {
    return '';
  }
}

/**
 * The client ID if it is already known, otherwise `''`. Synchronous, so it is
 * safe to call during render; use `ensureGoogleClientId()` when you need the
 * value itself.
 */
export function googleClientId(): string {
  if (!cachedClientId) cachedClientId = fromScriptTag() || fromBuildTimeEnv();
  return cachedClientId;
}

/**
 * Resolve the client ID, falling back to the runtime-config endpoint. The
 * request is made at most once per page load; the result is cached even when
 * empty-but-answered so a deployment without Google configured doesn't refetch.
 */
export async function ensureGoogleClientId(): Promise<string> {
  const known = googleClientId();
  if (known) return known;
  if (typeof window === 'undefined') return '';

  inFlight ??= (async () => {
    try {
      const response = await fetch(CLIENT_CONFIG_ENDPOINT, {
        headers: { accept: 'application/json' },
        credentials: 'same-origin',
      });
      if (!response.ok) return '';
      const body = (await response.json()) as { googleClientId?: unknown };
      return typeof body?.googleClientId === 'string' ? body.googleClientId : '';
    } catch {
      return '';
    }
  })();

  const resolved = await inFlight;
  if (resolved) cachedClientId = resolved;
  return resolved;
}

export const authClient = createAuthClient({
  // Left to better-auth in the browser, which uses window.location.origin —
  // correct whether the app is served from rights.institute, www., or a
  // preview URL.
  plugins: [
    magicLinkClient(),
    oneTapClient({
      // A getter, not a value: better-auth reads `options.clientId` when the
      // prompt is actually requested, so this resolves after the ID has been
      // fetched rather than freezing whatever was known at module-eval time.
      get clientId() {
        return cachedClientId || googleClientId();
      },
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      // Google Identity Services defaults to FedCM for the prompt. FedCM
      // silently declines to render in a lot of ordinary situations (and hides
      // the reason from `onPromptNotification`), which is the other half of why
      // the prompt never showed. The classic prompt is what the vinext starter
      // template uses and what actually displays.
      promptOptions: { fedCM: false },
      additionalOptions: { use_fedcm_for_prompt: false },
    }),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;
