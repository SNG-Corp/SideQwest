# Mobile release gate

Do not submit a Side Qwest build to the App Store or Google Play until the exact signed release artifacts have passed the checks below on physical devices. Simulator/emulator runs and CI tests do not replace this gate.

1. Build the iOS and Android release artifacts from the same commit intended for submission. Record the commit SHA, app version/build number, and each artifact's SHA-256 checksum.
2. Install those artifacts on at least one supported physical iPhone and one supported physical Android device using the intended release distribution path (for example, TestFlight and Play internal testing).
3. On each device, verify cold launch, OTP sign-in and sign-out, authenticated API requests, realtime updates, camera/location permission prompts, and that network calls use HTTPS. Exercise the privacy and terms screens, support email action, and account-deletion request flow.
4. Record the physical device model, OS version, artifact checksum, tester, test date, pass/fail for each check, and any issue reference in the release record. A failed or untested check blocks submission; fix and retest a newly built artifact.
5. Confirm the privacy policy and terms have completed legal review and are published in their final form before submission. The current in-app texts are drafts and must not be represented as approved legal documents.

The repository's CI enforces HTTPS-only mobile runtime defaults and platform cleartext-traffic settings, but cannot certify physical-device behavior. Release owners must retain the device-test record alongside the store submission.
