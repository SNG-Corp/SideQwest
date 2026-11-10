# Privacy data inventory — implementation review draft

**Status: draft for product, privacy counsel, and maintainer validation. Not a privacy policy and not ready to publish as a legal notice.** Confirm actual deployed behavior and vendors before using this inventory for store disclosures.

## Data flows visible in the reviewed source

| Data | Source / code area | Observed purpose | Questions to resolve before release |
|---|---|---|---|
| Phone number and OTP challenge | `apps/mobile/src/app/(auth)/sign-in.tsx`; `apps/api/src/routes/auth.routes.ts` | Sign-in and account creation via SMS one-time code | SMS provider, retention, lawful basis, delivery logs, support access, and cross-border transfer |
| Profile, role, language, market | `apps/mobile/src/lib/session.ts`; API `/me` routes | Account and product operation | Retention and deletion/pseudonymization policy |
| National ID number, ID front/back, selfie, conduct certificate, next-of-kin name/phone | `apps/mobile/src/app/kyc.tsx` | KYC/eligibility and runner safety review | Exact access roles, encryption and key management in deployment, vendor exposure, retention, erasure exceptions |
| Precise device location | `apps/mobile/src/app/(runner)/feed.tsx`; `apps/mobile/src/lib/useLink.ts`; `apps/api/src/routes/location.routes.ts` | Nearby errand feed, runner availability endpoint, and active errand sharing | Whether idle presence is enabled, consent records, retention job execution, residency, access logs, and background-vs-foreground behavior |
| SOS point and participant snapshot | `apps/api/src/routes/safety.routes.ts` | Emergency support record | Retention, responder access, escalation recipients, disclosure and deletion handling |
| Messages and dispute details | `apps/mobile/src/app/chat/[id].tsx`; `apps/api/src/routes/safety.routes.ts` | Participant communication and dispute evidence | Retention, moderation, access, export/deletion, and notification content |
| Wallet, escrow, payment, payout, ledger | Mobile wallet/earnings flows, API and worker | Financial operations and reconciliation | Payment processors, financial/legal retention, reversals, fraud monitoring, complaints, and required disclosures |
| Device identifier and session tokens | `apps/mobile/src/lib/session.ts`; `apps/api/src/routes/auth.routes.ts` | Session/device binding and refresh | Retention, device reset semantics, deletion and revocation behavior |
| Operational logs/telemetry | `packages/observability`; deployment configuration | Reliability and security operations | Confirm enabled destinations, region, field scrubbing, retention, processor contracts, and access |

## Required validation

- Compare this table against production database schema, API logs, cloud configuration, SMS/payment/storage providers, crash reporting, analytics, customer support tools, and backups.
- Verify deployed retention schedules and deletion/pseudonymization behavior with test records and audit evidence.
- Identify the controller, processors, privacy contact/DPO, lawful basis, data-subject request process, and any cross-border transfer mechanisms with qualified counsel.
- Resolve the mismatch between the current iOS permission string and runner Feed behavior before release. The Feed obtains location before an errand is active and the code posts an availability presence for tier-3 runners.
- Do not use this draft as a substitute for the published privacy policy, App Store privacy answers, or Google Play Data Safety declarations.
