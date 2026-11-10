# Contributing to Side Qwest

Thanks for considering a contribution. Contributions are welcome, but please note that this is an MVP and not a production-ready payment or KYC service.

## Before starting

- Read the root README and relevant current code/docs. Historical design handoff documents may not match the implementation.
- For substantial changes, open an issue or discussion first so scope and constraints can be agreed.
- Do not submit real personal data, identity documents, payment credentials, or production secrets in code, tests, issues, or screenshots.

## Development setup

Requirements: Node.js 22, pnpm 10, Postgres 16 with PostGIS and H3, Redis 7. Follow the [README setup](README.md#local-development). The local environment uses development-only payment, SMS, issuer, and storage adapters.

Before opening a PR, run:

```sh
pnpm install --frozen-lockfile
pnpm verify
```

Database changes should also be tested with `pnpm db:gates` against a disposable test database. Never edit a migration that has already been applied in a shared or production environment; add a new migration instead.

## Pull requests

- Branch from `main` and keep each PR focused.
- Explain user impact, risk, and the test evidence in the PR description.
- Include regression tests for behavior or security fixes.
- For money, identity, or location changes, describe failure modes and data-handling implications.
- Do not include generated native build output, secrets, customer data, or unrelated formatting churn.
- All required checks and review rules configured on the repository apply before merge.

Conventional Commit prefixes are encouraged (`feat:`, `fix:`, `docs:`, `test:`, `chore:`), but are not currently enforced by automation.

## Security reports

Do not file a public issue for a suspected vulnerability. Follow [SECURITY.md](SECURITY.md).
