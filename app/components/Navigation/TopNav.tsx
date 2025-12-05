'use client';

import Link from 'next/link';
import { AuthButton } from '../Auth/AuthButton';

export function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Rights Institute</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/api-docs"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                API Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
