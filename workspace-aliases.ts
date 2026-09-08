import { resolve } from 'path';

/**
 * Every workspace package under `packages/`. Each is consumed as
 * `@rights/<name>` (barrel, where the package has one) or
 * `@rights/<name>/<file>` (subpath) — see each package.json's `exports`.
 */
export const WORKSPACE_PACKAGES = [
  'animations',
  'auth',
  'cause',
  'contract-builder',
  'credit',
  'db',
  'env',
  'innovation-timeline',
  'investor-rank',
  'prosper-license',
  'site-shell',
  'startup-tools',
  'terms-privacy',
  'text-effects',
  'ui',
] as const;

/**
 * Resolve `@rights/*` straight to package source.
 *
 * pnpm's workspace symlinks would resolve these too, but the packages ship
 * TypeScript rather than a build output, so aliasing to `src/` keeps Vite and
 * Vitest reading the same files the editor and `tsc` do — with no per-package
 * build step to keep in sync. The subpath rule is listed before the bare one
 * so `@rights/ui/button` isn't swallowed by the `@rights/ui` entry.
 */
export function workspaceAliases(rootDir: string) {
  return WORKSPACE_PACKAGES.flatMap((name) => [
    {
      find: new RegExp(`^@rights/${name}/(.*)$`),
      replacement: `${resolve(rootDir, `./packages/${name}/src`)}/$1`,
    },
    {
      find: new RegExp(`^@rights/${name}$`),
      replacement: resolve(rootDir, `./packages/${name}/src/index.ts`),
    },
  ]);
}
