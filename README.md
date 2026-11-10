# Side Qwest

Side Qwest is an MVP for Nairobi errands: requesters fund tasks through escrow, runners complete them stall by stall, and money movements are tracked in a double-entry ledger. This monorepo contains the Expo mobile app, Fastify API, background worker, Next.js operations console, database migrations, and integration tests.

> **Release status:** This repository is an MVP, not a declaration of production or store approval. The README documents untested payment/storage provider sandboxes and the absence of native store builds. See [mobile release readiness](docs/MOBILE_RELEASE_READINESS.md) before any store submission or handling of live funds or real KYC data.

## Repository map

| Component | Location | Role |
|---|---|---|
| Mobile | `apps/mobile` | Expo/React Native requester and runner app; English and Kiswahili |
| API | `apps/api` | Fastify API; actor-scoped Postgres access and row-level security |
| Worker | `apps/worker` | Outbox processing, payments, settlement, notifications, reconciliation |
| Operations console | `apps/console` | Next.js KYC, dispute, ruling, and money-trace tools |
| Shared packages | `packages/*` | Domain rules, database migrations, configuration, adapters, contracts, observability |
| Tests | `tests/e2e` and app/package tests | Unit, platform-parity, security, and integration coverage |

## Local development

Prerequisites: Node.js 22, pnpm 10, Postgres 16 with PostGIS and H3, and Redis 7. Alternatively, Docker Compose runs the development stack.

```sh
pnpm install
node scripts/dev-env.mjs
pnpm migrate:up
pnpm dev:api
pnpm dev:worker
pnpm dev:console
pnpm dev:mobile
```

The local environment generator uses development-only drivers. Never point those credentials or drivers at production. For the complete environment variable contract, see `.env.example` and `packages/config/src/env.ts`.

## Verification

```sh
pnpm verify
DATABASE_URL=<owner-database-url> pnpm db:gates
```

CI is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs type checking, tests, platform/i18n parity checks, database gates, security/dependency scans, and container builds.

## Security, privacy, and release

- Report vulnerabilities privately; instructions are in [SECURITY.md](SECURITY.md).
- The current data-flow review is a **draft for counsel and maintainer validation**, not a privacy policy: [privacy data inventory](docs/PRIVACY_DATA_INVENTORY_DRAFT.md).
- Store-build and operational gates are in [mobile release readiness](docs/MOBILE_RELEASE_READINESS.md).
- For support, see [SUPPORT.md](SUPPORT.md); for contributions, see [CONTRIBUTING.md](CONTRIBUTING.md).
- The project is licensed under the [MIT License](LICENSE).

## Funding

If you find the project useful, you can support its continued maintenance through [GitHub Sponsors](https://github.com/sponsors/Apekay2), subject to the maintainer's Sponsors account being enabled. We do not list unverified third-party funding destinations.

## Project documentation

The design and engineering handoff is preserved under `project/handoff_sidequest_mvp/`. It is historical reference material; use the current code, migrations, and CI as the source of truth for implementation status.
