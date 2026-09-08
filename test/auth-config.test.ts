import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { env as cfEnv } from 'cloudflare:workers';
import {
  AuthConfigError,
  REQUIRED_AUTH_ENV,
  authBaseURL,
  googleCredentials,
  isAuthConfigured,
  missingAuthEnv,
} from '@/lib/auth-config';

const TOUCHED = [
  ...REQUIRED_AUTH_ENV,
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'BETTER_AUTH_URL',
  'NEXT_PUBLIC_APP_URL',
  'NODE_ENV',
];

const originalProcessEnv = { ...process.env };

function clearEnv() {
  for (const key of TOUCHED) {
    delete cfEnv[key];
    delete process.env[key];
  }
}

beforeEach(clearEnv);

afterEach(() => {
  clearEnv();
  Object.assign(process.env, originalProcessEnv);
});

describe('missingAuthEnv', () => {
  it('lists every required var when nothing is configured', () => {
    expect(missingAuthEnv()).toEqual([...REQUIRED_AUTH_ENV]);
    expect(isAuthConfigured()).toBe(false);
  });

  it('reads the Cloudflare runtime env, not just process.env', () => {
    cfEnv.BETTER_AUTH_SECRET = 'secret';
    cfEnv.TURSO_DATABASE_URL = 'libsql://db.turso.io';

    expect(missingAuthEnv()).toEqual([]);
    expect(isAuthConfigured()).toBe(true);
  });

  it('reports only the vars that are actually absent', () => {
    process.env.BETTER_AUTH_SECRET = 'secret';

    expect(missingAuthEnv()).toEqual(['TURSO_DATABASE_URL']);
  });
});

describe('AuthConfigError', () => {
  it('names the missing vars and how to set them', () => {
    const error = new AuthConfigError(['BETTER_AUTH_SECRET']);

    expect(error.missing).toEqual(['BETTER_AUTH_SECRET']);
    expect(error.message).toContain('BETTER_AUTH_SECRET');
    expect(error.message).toContain('wrangler secret put');
  });
});

describe('googleCredentials', () => {
  it('is null unless both halves are present', () => {
    expect(googleCredentials()).toBeNull();

    cfEnv.GOOGLE_CLIENT_ID = 'id.apps.googleusercontent.com';
    expect(googleCredentials()).toBeNull();

    cfEnv.GOOGLE_CLIENT_SECRET = 'shh';
    expect(googleCredentials()).toEqual({
      clientId: 'id.apps.googleusercontent.com',
      clientSecret: 'shh',
    });
  });
});

describe('authBaseURL', () => {
  it('prefers BETTER_AUTH_URL, then NEXT_PUBLIC_APP_URL', () => {
    cfEnv.NEXT_PUBLIC_APP_URL = 'https://preview.example';
    expect(authBaseURL()).toBe('https://preview.example');

    cfEnv.BETTER_AUTH_URL = 'https://auth.example';
    expect(authBaseURL()).toBe('https://auth.example');
  });

  it('falls back to the production URL in production and localhost otherwise', () => {
    cfEnv.NODE_ENV = 'production';
    expect(authBaseURL()).toBe('https://rights.institute');

    cfEnv.NODE_ENV = 'development';
    expect(authBaseURL()).toBe('http://localhost:3000');
  });
});
