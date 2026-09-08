'use client';

import { useEffect, useRef } from 'react';
import { authClient, googleClientId, useSession } from './auth-client';

export function GoogleOneTap() {
  const { data: session, isPending } = useSession();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (isPending) return;   // wait until session is known
    if (session) return;     // already signed in
    if (!googleClientId) {
      console.warn('Google One Tap: GOOGLE_CLIENT_ID is not set, skipping prompt.');
      return;
    }
    if (promptedRef.current) return; // only prompt once per mount

    promptedRef.current = true;

    authClient.oneTap({
      callbackURL: '/dashboard',
      onPromptNotification: (notification) => {
        console.log('Google One Tap not shown:', notification?.getNotDisplayedReason?.());
      },
    });
  }, [isPending, session]);

  return null;
}
