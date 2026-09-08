import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';
import * as schema from './schema';
import { getEnv } from '@rights/env';

export class DatabaseConfigError extends Error {
  constructor() {
    super(
      'TURSO_DATABASE_URL is not set. This build uses the libSQL *web* client ' +
        '(the only one that runs on Cloudflare Workers), which speaks libsql:/https:/wss: ' +
        'only — there is no local-file fallback. Set TURSO_DATABASE_URL (and ' +
        'TURSO_AUTH_TOKEN) in .env for local dev, or with `wrangler secret put <NAME>` ' +
        'for the deployed Worker. See content/docs/environment-variables.mdx.'
    );
    this.name = 'DatabaseConfigError';
  }
}

// Lazy singleton — createClient is deferred until the first query so that
// importing this module during build-time static analysis doesn't need a
// database URL, and so a URL supplied as a Worker runtime var/secret (which
// only exists per-request) is picked up without a rebuild.
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
    if (!_db) {
        const url = getEnv('TURSO_DATABASE_URL');
        if (!url) throw new DatabaseConfigError();
        const client = createClient({
            url,
            authToken: getEnv('TURSO_AUTH_TOKEN'),
        });
        _db = drizzle(client, { schema });
    }
    return _db;
}

export const db = new Proxy({} as ReturnType<typeof getDb>, {
    get(_target, prop) {
        return (getDb() as any)[prop];
    },
});
