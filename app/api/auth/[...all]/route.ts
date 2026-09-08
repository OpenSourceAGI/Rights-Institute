export const dynamic = 'force-dynamic';

import { missingAuthEnv } from '@/lib/auth-config';

/**
 * better-auth catch-all.
 *
 * The auth instance is imported lazily and every failure is contained here.
 * Missing configuration — or a database the deployment can't reach — used to
 * surface as `GET /api/auth/get-session 500`, which fails the client session
 * hook on every page load. A session read now degrades to "signed out"
 * (better-auth's own no-session response: 200 with a `null` body) with the
 * real reason logged server-side, while endpoints that genuinely cannot work
 * without configuration answer 503 naming the missing vars.
 */

/** Endpoints the app polls just to learn "am I signed in?". */
function isSessionRead(request: Request): boolean {
  if (request.method !== 'GET') return false;
  const path = new URL(request.url).pathname.replace(/\/+$/, '');
  return path.endsWith('/get-session') || path.endsWith('/session');
}

function signedOut(): Response {
  return new Response('null', {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

function unavailable(missing: string[]): Response {
  return new Response(
    JSON.stringify({
      error: 'auth_unavailable',
      message: 'Authentication is not available — the server is missing required configuration.',
      // Names only; never the values.
      ...(missing.length > 0 ? { missing } : {}),
    }),
    { status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }
  );
}

async function handle(request: Request): Promise<Response> {
  const missing = missingAuthEnv();
  if (missing.length > 0) {
    console.error(
      `[auth] ${request.method} ${new URL(request.url).pathname} — auth is not configured, missing: ${missing.join(', ')}`
    );
    return isSessionRead(request) ? signedOut() : unavailable(missing);
  }

  try {
    const { auth } = await import('@/lib/auth');
    return await auth.handler(request);
  } catch (error) {
    console.error(
      `[auth] ${request.method} ${new URL(request.url).pathname} failed:`,
      error
    );
    return isSessionRead(request) ? signedOut() : unavailable([]);
  }
}

export async function GET(request: Request): Promise<Response> {
  return handle(request);
}

export async function POST(request: Request): Promise<Response> {
  return handle(request);
}
