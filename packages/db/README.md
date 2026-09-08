# @rights/db

Drizzle ORM schema (`src/schema.ts`) and the lazily-built libSQL/Turso client
(`src/index.ts`), shared by `@rights/auth` and the route handlers in `app/api`.

Two migration sets live here, both predating the move into `packages/`:

- `drizzle/` — what `drizzle-kit` writes today (`out` in the repo-root
  `drizzle.config.ts`), and the newer of the two.
- `migrations/` — the older set that used to sit in `lib/db/migrations/`.

They describe the same tables under different journal tags. Nothing imports
either directory at runtime, so both were carried over as-is rather than
picking a winner; consolidating them is a separate call.
