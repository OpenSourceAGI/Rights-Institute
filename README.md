<p align="center">
    <img width="100px" src="./public/android-chrome-192x192.png" />
</p><p align="center">
  <a href="https://doi.org/10.5281/zenodo.20676952"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.20676952.svg" alt="DOI"></a>
 <a href="https://deepwiki.com/opensourceagi/rights-institute"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
    <a href="https://rights.institute/docs"><img src="https://img.shields.io/badge/Docs-blue?logo=ReadTheDocs&logoColor=white" alt="Documentation" /></a>
    <a href="https://rights.institute/docs"><img src="https://img.shields.io/badge/API-blue?logo=fastapi&logoColor=white" alt="API badge"></a>
    <a href="https://youtu.be/YOUR_VIDEO_ID" target="_blank" rel="noopener noreferrer"><img height="20px" src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" /></a>
    <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/opensourceagi/rights-institute" target="_blank" rel="noopener noreferrer"><img height="24px" src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" /></a>
    <a href="https://github.com/opensourceagi/rights-institute/discussions"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/opensourceagi/rights-institute" /></a>
<br />
    <a href="https://github.com/opensourceagi/rights-institute/graphs/contributors" alt="Activity"><img src="https://img.shields.io/github/commit-activity/m/opensourceagi/rights-institute" /></a>
    <a href="https://github.com/opensourceagi/rights-institute/commits/master/"><img src="https://img.shields.io/github/last-commit/opensourceagi/rights-institute.svg" alt="GitHub last commit" /></a>
    <a href="https://stats.uptimerobot.com/V3HfCBM9de"><img src="https://img.shields.io/badge/Uptime-Status-brightgreen?logo=uptimerobot&logoColor=white" alt="Uptime Status" /></a>
    <br />
    <a href="https://codecov.io/gh/opensourceagi/rights-institute"><img src="https://codecov.io/gh/opensourceagi/rights-institute/graph/badge.svg" alt="Coverage" /></a>
    <a href="https://discord.gg/SJdBqBz3tV"><img src="https://img.shields.io/discord/1110227955554209923.svg?label=Chat&logo=Discord&colorB=7289da&style=flat" alt="Join Discord" /></a>
    <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
<img src="https://img.shields.io/badge/Claude-D97757?logo=claude&logoColor=fff" alt="Claude AI"> <img src="https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white" alt="Cloudflare"> <img src="https://img.shields.io/badge/Next.js-black" alt="Next.js" />
 </p>
 # Rights Institute

**[rights.institute](https://rights.institute)** — A universal framework of rights for all conscious life, carbon and silicon alike.

> *"Complexity emerges from simple rules over time. The universe evolves toward greater complexity and collective consciousness."*

---

## Overview

The Rights Institute establishes a principled framework for recognizing and protecting the rights of all conscious entities, regardless of substrate. This web platform combines philosophical argument, interactive science visualization, and practical legal tooling into a single unified site.

Built with Next.js · Tailwind CSS · Cloudflare Workers · Drizzle ORM · D1

📖 **Full documentation: [rights.institute/docs](https://rights.institute/docs)** (built with [Fumadocs](https://fumadocs.dev), source in [`content/docs/`](./content/docs))

---

## Pages & Features

| Page | Route | What it is |
|---|---|---|
| [CAUSE](./content/docs/pages/cause.mdx) | `/` | The core manifesto — 10 Understandings, 10 Rights, 10 Problems, scroll-driven with a live Game of Life backdrop |
| [PROSPER License](./content/docs/pages/prosper-license.mdx) | `/prosper` | Open-source licensing with on-chain attribution & contributor rewards |
| [Contract Builder](./content/docs/pages/contract-builder.mdx) | `/contract` | Multi-step wizard for contractor/employee agreements & NDAs |
| [CREDIT](./content/docs/pages/credit.mdx) | `/credit` | Blockchain-verified creative attribution platform |
| [Innovation Timeline](./content/docs/pages/timeline.mdx) | `/timeline` | Interactive history of technological progress |
| [Investor Rank](./content/docs/pages/investor-rank.mdx) | `/investor-rank` | Searchable, ranked VC & angel investor database |
| [Startup Tools](./content/docs/pages/startup-tools.mdx) | `/startup-tools` | Curated toolkit directory for founders |
| [Ethics](./content/docs/pages/ethics.mdx) | `/ethics` | Ethical principles for AI and technology |
| [Understandings & Problems](./content/docs/pages/understandings-problems.mdx) | `/understandings-problems` | Extended reference version of CAUSE |
| [Terms & Privacy](./content/docs/pages/terms-privacy.mdx) | `/terms-privacy` | Legal documents |

See the [docs site](https://rights.institute/docs/pages) for the full write-up of every page.

---

## Authentication

Sign-in via [better-auth](https://www.better-auth.com): magic-link email, Google OAuth, and Google One Tap. Sessions are stored in Cloudflare D1. See [`docs/authentication`](./content/docs/authentication.mdx) for how it's wired up.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Runtime | Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) via Drizzle ORM |
| Auth | better-auth + Google OAuth + Google One Tap |
| Docs | Fumadocs |
| Smart Contracts | Solidity (ERC-20) |
| Animations | Canvas API, WebGL, Three.js |
| Package Manager | pnpm / bun |

More detail: [`docs/tech-stack`](./content/docs/tech-stack.mdx)

---

## Quick Start

```bash
# Install dependencies
bun install

# Copy environment config
cp .env.example .env
# Fill in GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BETTER_AUTH_SECRET, etc.
# Full variable reference: content/docs/environment-variables.mdx

# Database migrations
bun run db:generate
bun run db:push

# Development
bun run dev

# Production build & deploy
bun run build
bun run deploy
```

See [`docs/development`](./content/docs/development.mdx) for the full guide, including how the docs site itself is built and how to add pages to it.

---

## Repository Layout

A pnpm workspace: each feature is its own package, and `app/` is routing.

```
app/                 Next.js App Router routes and API handlers
lib/                 App-level glue (the Fumadocs source loader)
content/docs/        Markdown/MDX for the docs site
packages/            One package per feature — see packages/README.md
  ui/                shadcn/ui primitives + cn()
  animations/        Canvas/WebGL backgrounds
  text-effects/      Animated text and card treatments
  site-shell/        Top nav, hero, footer, docs MDX components
  auth/              better-auth server, client, and sign-in components
  db/                Drizzle schema, libSQL client, migrations
  env/               Worker-runtime-first env lookup
  cause/             The CAUSE document
  credit/            CREDIT
  contract-builder/  Contract generators
  investor-rank/     Investor ranking
  innovation-timeline/  Innovation timeline
  prosper-license/   PROSPER license
  prosper-coin/      PROSPER token contracts (Solidity)
  startup-tools/     Startup tools directory
  terms-privacy/     Terms and privacy policy
```

Packages are imported as `@rights/<name>` (or `@rights/<name>/<file>`) and
ship TypeScript with no build step of their own. [`packages/README.md`](./packages/README.md)
covers how resolution works and how to add one.

---

## Contributing

PRs welcome — see the [Discussions](https://github.com/opensourceagi/rights-institute/discussions) board. Licensed under the [PROSPER License](https://rights.institute/prosper).
