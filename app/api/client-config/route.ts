export const dynamic = 'force-dynamic';

import { googleClientId } from '@rights/auth/auth-config';

/**
 * Public, browser-readable configuration resolved from the *runtime* env.
 *
 * The root layout also inlines the Google client ID into a `<script
 * type="application/json">` tag, but that only works when the layout is
 * rendered per request. Content routes here are statically generated, so on
 * Cloudflare the tag can be baked at build time — before the Worker's
 * vars/secrets exist — and arrive empty. This route is explicitly dynamic, so
 * it always sees the real runtime value.
 *
 * Only the Google *client* ID is served. It is public by design (it appears in
 * every Google sign-in URL); the client secret is never exposed here.
 */
export async function GET(): Promise<Response> {
  return new Response(JSON.stringify({ googleClientId: googleClientId() }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      // Per-deployment configuration that can change without a rebuild, so it
      // must not be cached by the browser or an edge cache.
      'cache-control': 'no-store',
    },
  });
}
