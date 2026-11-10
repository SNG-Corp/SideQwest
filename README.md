# Side Qwest

Errands in Nairobi, paid through escrow: a requester posts a Qwest, a runner does it stall by stall, and every shilling moves through a double-entry ledger.

![CI](https://github.com/SNG-Corp/SideQwest/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/SNG-Corp/SideQwest)
![Issues](https://img.shields.io/github/issues/SNG-Corp/SideQwest)

This repository contains the MVP implementation for the Side Qwest marketplace platform, including the mobile app, API, worker, console, Postgres-backed ledger, and the operational tooling needed to run and validate the money flow.

## Why Side Qwest

Side Qwest is designed for underserved urban communities where trust, transaction transparency, and real-time task execution matter. It combines escrowed payments, KYC-aware operations, small task execution, and auditable ledger accounting into a single platform.

## Sponsors

This project is looking for support to help cover infrastructure, security auditing, compliance review, and ongoing maintenance.

- GitHub Sponsors: [@Apekay2](https://github.com/sponsors/Apekay2)
- Open Collective: [replace with your project name](https://opencollective.com/replace-me)
- Ko-fi: [replace with your project page](https://ko-fi.com/replace-me)

If you are interested in sponsoring the project, please review [FUNDING.yml](./FUNDING.yml) and [ROADMAP.md](./ROADMAP.md).

## Architecture at a glance

| Part | Where | What it is |
|---|---|---|
| Mobile app | `apps/mobile` | Expo SDK 57 / expo-router, requester and runner, EN + SW. |
| API | `apps/api` | Fastify 5 service with Postgres RLS and actor-scoped access. |
| Worker | `apps/worker` | Outbox poller, job runners, settlement, reconciliation, and notifications. |
| Ops console | `apps/console` | Next.js console for KYC, disputes, rulings, money trace. |
| Packages | `packages/*` | Domain logic, DB schema, config, adapters, observability, contracts. |
| End-to-end tests | `tests/e2e` | API + worker integration tests against Postgres and Redis. |

## Run it

You need Node 22, pnpm 10, Postgres 16 with PostGIS and h3, and Redis 7.

```sh
pnpm install
node scripts/dev-env.mjs
pnpm migrate:up
pnpm dev:api
pnpm dev:worker
pnpm dev:console
pnpm dev:mobile
```

Development drivers stand in for the outside world: a fake Daraja flow, mock card issuer, Console SMS, and local storage with signed URLs. Production config refuses those drivers.

## Check it

```sh
pnpm verify
pnpm typecheck
pnpm test
pnpm lint:parity
DATABASE_URL=<owner url> pnpm db:gates
```

CI runs the typecheck, parity, database gates, secret scans, and dependency checks. See `.github/workflows/ci.yml`.

## Contributing

We welcome thoughtful contributors. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

## Security

Please report vulnerabilities privately. See [SECURITY.md](./SECURITY.md) for the disclosure process.

## Support

For support and questions, see [SUPPORT.md](./SUPPORT.md).

## Code of conduct

This project follows a community code of conduct. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for current product and maintenance priorities.

## Project history

The original handoff materials are preserved in [HANDOFF.md](./HANDOFF.md) and `project/handoff_sidequest_mvp/`.

---

This README intentionally provides both technical onboarding and the project’s public trust signals. If you are preparing for launch or sponsorship outreach, keep this section concise, accurate, and active.
