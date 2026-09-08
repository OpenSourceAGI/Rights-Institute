'use client';

import { createAuthClient } from 'better-auth/react';
import { magicLinkClient, oneTapClient } from 'better-auth/client/plugins';

// The Google client ID isn't safe to bake in with NEXT_PUBLIC_* build-time
// inlining here: this app deploys to Cloudflare Workers, where env vars are
// commonly set as runtime vars/secrets (dashboard or `wrangler secret put`)
// rather than being present in the build environment — a build-time-only
// value would go stale the moment it's rotated without a rebuild. Instead
// the root layout (a Server Component, which *can* read the Worker's
// runtime env per-request) serializes it into a `<script type="application/
// json">` tag, and we read it back here at module-eval time in the browser.
function getGoogleClientId(): string {
  if (typeof document === 'undefined') return '';
  const el = document.getElementById('google-client-id');
  if (!el?.textContent) return '';
  try {
    return JSON.parse(el.textContent) as string;
  } catch {
    return '';
  }
}

export const googleClientId = getGoogleClientId();

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  plugins: [
    magicLinkClient(),
    oneTapClient({
      clientId: googleClientId,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
    }),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;
