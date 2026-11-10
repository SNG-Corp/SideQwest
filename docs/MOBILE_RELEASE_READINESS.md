# Mobile release readiness checklist

This checklist is an engineering gate, not evidence that the app is already approved or production-ready. Complete each item for the exact release commit and signed artifacts.

## Release configuration

- [ ] Set `EXPO_PUBLIC_API_URL` to the approved HTTPS production API origin in the build environment. `apps/mobile/app.config.ts` rejects missing or insecure production values.
- [ ] Set monotonically increasing `IOS_BUILD_NUMBER` and `ANDROID_VERSION_CODE` for each store submission.
- [ ] Verify `pnpm --filter @sidequest/mobile exec expo config --type public` with production environment variables; check the resolved endpoint, bundle/package IDs, permissions, and version.
- [ ] Generate and inspect signed IPA/AAB. Verify the app does not contact localhost, staging, or development services.
- [ ] Verify the final Android target SDK against the Google Play policy in force at submission; run the Play Console pre-launch report and check native 16 KB page-size compatibility.
- [ ] Complete physical-device testing on supported iOS and Android versions, including low-end Android and slow/intermittent networks.

## Privacy and compliance — release blockers

- [ ] Publish a counsel-reviewed privacy policy and Terms of Service at stable HTTPS URLs, then link them inside the app, on sign-in/account creation, in App Store Connect, and in Play Console.
- [ ] Complete a data inventory for phone/OTP, account/profile, KYC images and ID number, next-of-kin contact, precise location, idle availability, chat, SOS snapshots, payment/ledger, device identifiers, logs, backups, and support systems.
- [ ] Confirm lawful purpose, collection minimization, processors, cross-border transfers, retention schedule, access controls, and user-rights handling for each data category.
- [ ] Implement and test in-app account deletion and any required web deletion request path. Define required financial-record retention and pseudonymization before implementation; do not promise deletion that backend retention cannot deliver.
- [ ] Reconcile App Privacy and Google Play Data Safety answers with the production app, backend, vendors, and SDK traffic.
- [ ] Ensure location permission copy, in-app consent, `/feed` location use, `/presence`, active errand sharing, and SOS behavior all match. Location sharing must be opt-in and revocable as described to users.
- [ ] Name and publish the real privacy/support contact and ensure it is monitored.

## Security and operations

- [ ] Test SecureStore failure, refresh expiry/reuse, sign-out offline, revoked accounts, and complete local sensitive-data cleanup.
- [ ] Test certificate/TLS failures, upload URL expiry/replay, auth boundaries, rate limits, and error responses on authorized staging systems.
- [ ] Verify secrets and PII are absent from app/API logs, crash reports, analytics, URLs, and CI artifacts.
- [ ] Validate data residency, encryption/key rotation, retention jobs, access audit, backups, restore drills, and incident-response ownership.
- [ ] Decide whether background location is required. If not, document and test foreground-only tracking and stale-location indicators. If yes, add only required platform permissions, prominent disclosures, task lifecycle controls, and battery tests.
- [ ] Add push notification setup only if required; verify permission timing, token lifecycle, notification content privacy, and deep links.

## Store submission

- [ ] Provide reviewer instructions, test credentials/OTP path, demo data, support URL, privacy URL, screenshots, app description, age/content rating, and accurate feature claims.
- [ ] Test camera denied, location denied/approximate/revoked, no network, app background/kill/relaunch, app update, logout, and account deletion.
- [ ] Run VoiceOver/TalkBack, dynamic text, contrast, keyboard, and English/Swahili layout reviews.
- [ ] Review all third-party dependencies and native SDKs, generate an SBOM, and assess their data collection and licensing.
- [ ] Run `pnpm verify` and attach passing CI evidence for the release commit.

## Commands

```sh
pnpm install --frozen-lockfile
pnpm verify
EXPO_PUBLIC_API_URL=https://YOUR_REAL_API_HOST \
IOS_BUILD_NUMBER=1 ANDROID_VERSION_CODE=1 \
pnpm --filter @sidequest/mobile exec expo config --type public
```

Replace `YOUR_REAL_API_HOST` with the production hostname before using this command. Never ship this placeholder.
