import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'turso',
  schema: './app/lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:./data/db.sqlite',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
