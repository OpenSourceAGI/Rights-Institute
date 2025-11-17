'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { signIn } from '@/lib/auth-client';

export function GoogleOneTap() {
  useEffect(() => {
    const handleCredentialResponse = async (response: any) => {
      try {
        await signIn.social({
          provider: 'google',
          callbackURL: '/',
          idToken: response.credential,
        });
      } catch (error) {
        console.error('Sign in failed:', error);
      }
    };

    // Initialize Google One Tap
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      (window as any).google.accounts.id.prompt();
    }
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Sign-In script loaded');
        }}
      />
    </>
  );
}
