'use client';

import { GoogleOneTap } from './GoogleOneTap';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleOneTap />
      {children}
    </>
  );
}
