# Contributing to Rights Institute

Thanks for your interest in contributing! We welcome bug reports, documentation improvements, feature ideas, and pull requests.

Rights Institute is a Next.js (App Router) site running on Cloudflare Workers, backed by Cloudflare D1 via Drizzle ORM, with better-auth for sign-in and Fumadocs for documentation. It's a pnpm workspace: `app/` is routing, and each feature — `auth`, `db`, `credit`, `cause`, `contract-builder`, `innovation-timeline`, `animations`, `env` — is its own package under `packages/`.

## Before You Start

- Read the [README](README.md) and the docs under [`content/docs/`](content/docs) — especially [development](content/docs/development.mdx), [tech-stack](content/docs/tech-stack.mdx), and [environment-variables](content/docs/environment-variables.mdx).
- Search [existing issues](https://github.com/OpenSourceAGI/rights-institute/issues), [pull requests](https://github.com/OpenSourceAGI/rights-institute/pulls), and the [Discussions board](https://github.com/OpenSourceAGI/rights-institute/discussions) to avoid duplicating work.
- For substantial changes — a new page or feature package, a D1 schema change, changes to auth, or changes to the PROSPER license text and its supporting content — open an issue or discussion first to agree on the problem, approach, and scope.
- Be respectful and constructive in issues, reviews, and discussions.

## Reporting Bugs

Please open an issue and include:

- A clear, descriptive title
- What you expected to happen
- What actually happened
- Steps to reproduce the problem, including the URL or route
- Minimal reproducible code or repository, when possible
- Relevant logs, error messages, screenshots, and environment details

Environment details should include the commit, operating system, `node --version`, `pnpm --version`, `wrangler --version`, and browser version. **Redact session cookies, OAuth secrets, and `BETTER_AUTH_SECRET` before pasting logs.**

## Suggesting Features

Feature requests are welcome. Please explain:

- The problem or use case
- Your proposed solution
- Alternatives you considered
- Any compatibility, performance, security, accessibility, or maintenance tradeoffs

Avoid starting a large implementation before maintainers have had a chance to comment on the proposal.

## Development Setup

The fastest way to get the project running is [`git0`](https://www.npmjs.com/package/git0) — it downloads the repo, detects the project type, installs dependencies, and opens your editor in one step:

```bash
npx git0 OpenSourceAGI/rights-institute
```

`git0` downloads a source snapshot without `.git` history, which is ideal for trying the project out. To submit a pull request you need a real git clone of your own fork:

1. Fork the repository and clone your fork.
2. Create a branch from `main`.
3. Install dependencies.
4. Run the project locally and confirm the existing tests pass.

```bash
git clone https://github.com/YOUR-USERNAME/rights-institute.git
cd rights-institute
git checkout -b feat/short-description

pnpm install                 # bun install also works

cp .env.example .env         # fill in GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
                             # BETTER_AUTH_SECRET, etc.
                             # Reference: content/docs/environment-variables.mdx

pnpm run db:generate         # generate Drizzle migrations
pnpm run db:push             # apply them to your local D1 database

pnpm run dev                 # http://localhost:3000
pnpm run test                # Vitest
```

CI runs on Node.js 22 with pnpm — matching that locally avoids surprises.

Useful extras:

```bash
pnpm run db:studio           # inspect the database
pnpm run preview             # production build, served locally
```

## Making Changes

- Keep changes focused; avoid unrelated refactors in the same pull request.
- Match the existing code style, naming conventions, and project architecture: routing stays in `app/`, feature logic lives in its own package under `packages/`.
- Use Tailwind and the existing shadcn/ui primitives rather than introducing a second styling approach.
- Add or update tests for behavior changes and bug fixes.
- Update documentation under `content/docs/` when behavior, routes, or configuration change — the docs site is built from those MDX files.
- Never commit secrets, credentials, OAuth client secrets, private keys, `.env`, generated build output, `.wrangler/` state, or unrelated lockfile changes.
- The repository contains both `pnpm-lock.yaml` and `package-lock.json`; update only the lockfile for the package manager you used, and only when you actually changed dependencies.
- Write clear commit messages that describe the change.

## Testing

Before opening a pull request, run the relevant checks locally:

```bash
pnpm run test            # Vitest
pnpm run test:coverage   # what CI runs, reported to Codecov
pnpm run build           # production build
```

If you cannot run a check, state that clearly in the pull request and explain why.

## Pull Requests

When opening a pull request:

- Target the `main` branch.
- Use a concise title that describes the user-visible change.
- Explain what changed and why.
- Link related issues using `Fixes #123` or `Closes #123` when appropriate.
- Include test results and any manual verification steps.
- Include screenshots or recordings for user-interface changes, and check them at mobile width as well.
- Call out any database migration, new environment variable, or new Cloudflare binding explicitly — these need maintainer action at deploy time.
- Keep the pull request small enough to review effectively.
- Respond to review feedback constructively and update the branch as requested.

### Pull Request Template

```md
## Summary

- What does this change do?

## Motivation

- What problem does it solve?

## Testing

- [ ] Tests added or updated
- [ ] `pnpm run test` passes
- [ ] `pnpm run build` passes
- [ ] Manual testing completed
- [ ] Checked at mobile width (UI changes)

## Deploy notes

- [ ] No new environment variables
- [ ] No new Cloudflare bindings
- [ ] No database migration

## Screenshots / Notes

- Add screenshots, migration notes, or rollout considerations if relevant.
```

## Documentation

Documentation changes are valuable contributions. The docs site is built with Fumadocs from [`content/docs/`](content/docs) — keep examples accurate, use clear language, and update related pages when behavior or configuration changes.

## License

By contributing, you agree that your contributions will be licensed under the same license as this repository, the [PROSPER License](https://rights.institute/prosper).

## Questions

If you are unsure where to start, open a [discussion](https://github.com/OpenSourceAGI/rights-institute/discussions) or issue describing what you would like to work on. Maintainers can help identify an appropriate next step.
