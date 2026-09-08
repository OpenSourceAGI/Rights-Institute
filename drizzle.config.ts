import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'turso',
  schema: './packages/db/src/schema.ts',
  out: './packages/db/drizzle',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:./data/db.sqlite',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
