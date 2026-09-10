import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { env as cfEnv } from 'cloudflare:workers';
import {
  AuthConfigError,
  REQUIRED_AUTH_ENV,
  authBaseURL,
  googleClientId,
  googleCredentials,
  isAuthConfigured,
  missingAuthEnv,
  trustedOrigins,
} from '@rights/auth/auth-config';

const TOUCHED = [
  ...REQUIRED_AUTH_ENV,
  'GOOGLE_CLIENT_ID',
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
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

describe('googleClientId', () => {
  it('is empty when nothing is configured', () => {
    expect(googleClientId()).toBe('');
  });

  it('accepts the NEXT_PUBLIC_ copy for build-time-inlined deployments', () => {
    cfEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID = 'public.apps.googleusercontent.com';
    expect(googleClientId()).toBe('public.apps.googleusercontent.com');

    // The runtime var wins, so rotating it on the Worker takes effect without
    // a rebuild of the inlined copy.
    cfEnv.GOOGLE_CLIENT_ID = 'runtime.apps.googleusercontent.com';
    expect(googleClientId()).toBe('runtime.apps.googleusercontent.com');
  });
});

describe('authBaseURL', () => {
  it('prefers BETTER_AUTH_URL, then NEXT_PUBLIC_APP_URL', () => {
    cfEnv.NEXT_PUBLIC_APP_URL = 'https://preview.example';
    expect(authBaseURL()).toBe('https://preview.example');

    cfEnv.BETTER_AUTH_URL = 'https://auth.example';
    expect(authBaseURL()).toBe('https://auth.example');
  });

  it('uses localhost only when NODE_ENV explicitly says dev or test', () => {
    cfEnv.NODE_ENV = 'development';
    expect(authBaseURL()).toBe('http://localhost:3000');

    cfEnv.NODE_ENV = 'test';
    expect(authBaseURL()).toBe('http://localhost:3000');
  });

  it('is undefined with no configuration, so better-auth reads the request origin', () => {
    // The regression this pins: Workers do not set NODE_ENV in the runtime
    // env, so the old `NODE_ENV === 'production' ? PROD_URL : localhost`
    // fallback resolved to http://localhost:3000 in production and every
    // Google sign-in asked for a localhost redirect_uri.
    expect(authBaseURL()).toBeUndefined();

    cfEnv.NODE_ENV = 'production';
    expect(authBaseURL()).toBeUndefined();
  });
});

describe('trustedOrigins', () => {
  it('always covers the apex, www and local origins', () => {
    expect(trustedOrigins()).toEqual(
      expect.arrayContaining([
        'https://rights.institute',
        'https://www.rights.institute',
        'http://localhost:3000',
      ]),
    );
  });

  it('adds the configured base URL, so a preview deploy passes the origin check', () => {
    cfEnv.BETTER_AUTH_URL = 'https://preview.rights.workers.dev/some/path';
    expect(trustedOrigins()).toContain('https://preview.rights.workers.dev');
  });

  it('ignores a malformed configured URL rather than throwing', () => {
    cfEnv.NEXT_PUBLIC_APP_URL = 'not a url';
    expect(() => trustedOrigins()).not.toThrow();
    expect(trustedOrigins()).toContain('https://rights.institute');
  });
});
