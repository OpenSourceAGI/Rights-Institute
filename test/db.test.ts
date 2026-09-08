import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { env as cfEnv } from 'cloudflare:workers';
import { DatabaseConfigError, db } from '@/lib/db';

function clear() {
  delete cfEnv.TURSO_DATABASE_URL;
  delete process.env.TURSO_DATABASE_URL;
}

beforeEach(clear);
afterEach(clear);

describe('db', () => {
  it('throws a named, actionable error instead of falling back to an unsupported file: URL', () => {
    expect(() => db.select()).toThrow(DatabaseConfigError);
    expect(() => db.select()).toThrow(/TURSO_DATABASE_URL/);
  });
});
