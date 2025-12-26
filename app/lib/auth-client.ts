'use client';

import { createAuthClient } from 'better-auth/react';
import { magicLinkClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  plugins: [magicLinkClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;
