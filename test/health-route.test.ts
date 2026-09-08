import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { env as cfEnv } from 'cloudflare:workers';
import { GET } from '../app/api/health/route';

const KEYS = [
  'BETTER_AUTH_SECRET',
  'TURSO_DATABASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'AUTH_RESEND_KEY',
];

function clear() {
  for (const key of KEYS) {
    delete cfEnv[key];
    delete process.env[key];
  }
}

beforeEach(clear);
afterEach(clear);

describe('GET /api/health', () => {
  it('reports what is missing without leaking values', async () => {
    cfEnv.GOOGLE_CLIENT_ID = 'id.apps.googleusercontent.com';

    const body = await (await GET()).json();

    expect(body.status).toBe('degraded');
    expect(body.config).toEqual({
      auth: false,
      database: false,
      google: false,
      magicLinkEmail: false,
    });
    expect(body.missing).toEqual(['BETTER_AUTH_SECRET', 'TURSO_DATABASE_URL']);
    expect(JSON.stringify(body)).not.toContain('id.apps.googleusercontent.com');
  });

  it('reports ok once auth is configured', async () => {
    cfEnv.BETTER_AUTH_SECRET = 'secret';
    cfEnv.TURSO_DATABASE_URL = 'libsql://db.turso.io';

    const body = await (await GET()).json();

    expect(body.status).toBe('ok');
    expect(body.config.auth).toBe(true);
    expect(body.missing).toEqual([]);
  });
});
