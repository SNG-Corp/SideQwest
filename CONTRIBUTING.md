# Contributing

Thanks for your interest in contributing to Side Qwest.

We welcome contributions in code, design feedback, testing, documentation, security review, and issue triage.

## Development setup

1. Install Node 22 and pnpm 10.
2. Clone the repository.
3. Install dependencies:

```bash
pnpm install
```

4. Generate a local `.env` file:

```bash
node scripts/dev-env.mjs
```

5. Run the database migrations:

```bash
pnpm migrate:up
```

6. Start the app stack in development mode:

```bash
pnpm dev:api
pnpm dev:worker
pnpm dev:console
pnpm dev:mobile
```

## Branching

- Use `main` for the stable branch.
- Create feature branches from `main`.
- Use names like:
  - `feature/...`
  - `fix/...`
  - `docs/...`
  - `chore/...`
  - `refactor/...`

## Pull requests

- Keep changes focused.
- Include tests for bug fixes and behavior changes.
- Run the verification commands before opening a PR:

```bash
pnpm verify
```

- Add a clear summary of the problem and the fix.
- Explain how the change was validated.

## Commit message format

We recommend Conventional Commits:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `chore: ...`
- `refactor: ...`
- `test: ...`

## Coding standards

- Prefer TypeScript strict typing.
- Keep database migrations reviewable and explicit.
- Do not bypass existing security and RLS boundaries.
- Respect the project’s money-path correctness rules.

## Reporting issues

Before creating an issue, check whether the bug or request already exists.

Use the issue templates in `.github/ISSUE_TEMPLATE/`.

## Community expectations

Please be respectful, constructive, and considerate across discussions and code reviews.

## Questions

If you are unsure where to start, open a discussion or reach out through the support channels in [SUPPORT.md](./SUPPORT.md).
