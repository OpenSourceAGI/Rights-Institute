import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const client = createClient({
    url: process.env.TURSO_DATABASE_URL || 'file:./data/db.sqlite',
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, {
    schema: schema,
});

export { db };
