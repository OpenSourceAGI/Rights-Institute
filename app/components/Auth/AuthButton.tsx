'use client';

import { useSession, signOut } from '@/lib/auth-client';
import Link from 'next/link';

export function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-sm text-gray-300">Loading...</span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="h-8 w-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium text-white">
            {session.user?.name || session.user?.email}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition-colors text-white text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium shadow-lg"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      Sign In
    </Link>
  );
}
