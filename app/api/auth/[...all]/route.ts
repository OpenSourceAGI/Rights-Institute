import { createAuth, type AuthEnv } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

// Get environment variables
const env: AuthEnv = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL || '',
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
};

// Create the auth instance
const auth = createAuth(env);

// Export the Next.js handlers for all HTTP methods
export const { GET, POST } = toNextJsHandler(auth);
