'use client';

import { useEffect, useRef } from 'react';
import { authClient, ensureGoogleClientId, useSession } from './auth-client';

/**
 * Mounts the Google One Tap prompt for signed-out visitors.
 *
 * Rendered once from the root layout, so the prompt is available on every
 * page. Nothing is rendered into the DOM — better-auth injects Google's
 * Identity Services script itself and Google owns the prompt UI.
 */
export function GoogleOneTap() {
  const { data: session, isPending } = useSession();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (isPending) return; // wait until the session is known
    if (session) return; // already signed in
    if (promptedRef.current) return; // only prompt once per mount

    promptedRef.current = true;
    let cancelled = false;

    (async () => {
      // Resolved rather than read synchronously: on Cloudflare the client ID
      // usually only exists in the Worker's runtime env, so it may take a
      // round trip to /api/client-config to get here.
      const clientId = await ensureGoogleClientId();
      if (cancelled) return;

      if (!clientId) {
        console.warn(
          '[auth] Google One Tap skipped — no Google client ID. Set GOOGLE_CLIENT_ID (Worker var/secret) or NEXT_PUBLIC_GOOGLE_CLIENT_ID.'
        );
        return;
      }

      try {
        await authClient.oneTap({
          callbackURL: '/dashboard',
          onPromptNotification: (notification) => {
            // Only fires for the classic (non-FedCM) prompt, which is what
            // the client is configured to use.
            console.info(
              '[auth] Google One Tap was not shown:',
              notification?.getNotDisplayedReason?.() ??
                notification?.getSkippedReason?.() ??
                notification?.getDismissedReason?.() ??
                'unknown'
            );
          },
        });
      } catch (error) {
        // A failed prompt must never break the page — the sign-in page is
        // always available as a fallback.
        console.warn('[auth] Google One Tap failed:', error);
        promptedRef.current = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isPending, session]);

  return null;
}
