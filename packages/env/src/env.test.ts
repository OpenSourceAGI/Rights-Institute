import { beforeEach, describe, expect, it } from 'vitest';
// Resolved via the `cloudflare:workers` alias in vitest.config.ts, pointing at
// test/mocks/cloudflare-workers.ts — the same module instance env.ts imports.
// Cast away the ambient `Env` type from @cloudflare/workers-types (which has no
// index signature) since at type-check time TS resolves the real module, not
// the aliased mock Vite substitutes at test-run time.
import { env as cfEnv } from 'cloudflare:workers';
import { getEnv } from './env';

const cfEnvMock = cfEnv as unknown as Record<string, string | undefined>;

describe('getEnv', () => {
  const originalProcessEnv = { ...process.env };

  beforeEach(() => {
    for (const key of Object.keys(cfEnvMock)) delete cfEnvMock[key];
    process.env = { ...originalProcessEnv };
  });

  it('reads a value from the cloudflare workers env when present', () => {
    cfEnvMock.MY_KEY = 'from-cf-env';
    expect(getEnv('MY_KEY')).toBe('from-cf-env');
  });

  it('falls back to process.env when the cloudflare env does not have the key', () => {
    process.env.MY_KEY = 'from-process-env';
    expect(getEnv('MY_KEY')).toBe('from-process-env');
  });

  it('prefers the cloudflare workers env over process.env', () => {
    cfEnvMock.MY_KEY = 'from-cf-env';
    process.env.MY_KEY = 'from-process-env';
    expect(getEnv('MY_KEY')).toBe('from-cf-env');
  });

  it('returns undefined when the key is not set anywhere', () => {
    expect(getEnv('DOES_NOT_EXIST')).toBeUndefined();
  });
});
