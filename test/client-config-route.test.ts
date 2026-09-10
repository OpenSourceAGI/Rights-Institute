/**
 * @fileoverview Covers /api/client-config — how the Google client ID reaches
 * the browser on Cloudflare.
 *
 * The root layout also inlines the ID, but content routes are statically
 * generated, so that copy can be baked as "" at build time. This route is the
 * runtime source of truth, and the two things worth pinning are that it reads
 * the *runtime* env and that it never leaks the client secret.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { env as cfEnv } from 'cloudflare:workers';

const { GET } = await import('../app/api/client-config/route');

const TOUCHED = ['GOOGLE_CLIENT_ID', 'NEXT_PUBLIC_GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];

function clearEnv() {
  for (const key of TOUCHED) {
    delete cfEnv[key];
    delete process.env[key];
  }
}

beforeEach(clearEnv);
afterEach(clearEnv);

describe('GET /api/client-config', () => {
  it('serves the client ID from the Cloudflare runtime env', async () => {
    cfEnv.GOOGLE_CLIENT_ID = 'runtime.apps.googleusercontent.com';

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      googleClientId: 'runtime.apps.googleusercontent.com',
    });
  });

  it('answers with an empty ID when Google is not configured', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ googleClientId: '' });
  });

  it('never caches, so a rotated client ID takes effect without a rebuild', async () => {
    const response = await GET();

    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('does not expose the client secret', async () => {
    cfEnv.GOOGLE_CLIENT_ID = 'runtime.apps.googleusercontent.com';
    cfEnv.GOOGLE_CLIENT_SECRET = 'super-secret';

    const body = await (await GET()).text();

    expect(body).not.toContain('super-secret');
    expect(Object.keys(JSON.parse(body))).toEqual(['googleClientId']);
  });
});
