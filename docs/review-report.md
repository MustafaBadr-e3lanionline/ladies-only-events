# Repository Review — Ladies Only Events

## Reviewed baseline
- Default branch: `main`
- Framework: Next.js 14 / React 18 / TypeScript / Tailwind CSS
- Hosting reference: Vercel
- Database target: Supabase PostgreSQL
- Review branch: `audit/production-readiness-ui`

## Findings from the source review
1. Several visible navigation links pointed to routes that did not exist: the experience listing, categories, and checkout pages.
2. The booking wizard generated a booking number in the browser and called WhatsApp ticket delivery before a payment record was created or reviewed. This could present an unverified payment as a confirmed booking.
3. The manual payment proof control stored only the file name in component state; it did not upload the actual receipt.
4. The admin payment verification endpoint accepted unauthenticated POST requests and reported success without updating the database.
5. The WhatsApp endpoint accepted ticket/OTP actions without a complete authorization and OTP verification lifecycle.
6. The scanner used a simulated timeout and accepted any text containing `LOE`; it did not validate a real ticket against the database.
7. English translation JSON contained Arabic values, and several UI metrics/customer records were hard-coded demo values.
8. The home and experience detail pages contained stale 2024 dates and hard-coded experience data.
9. The initial schema allowed public booking inserts with a permissive policy and did not provide atomic capacity reservation.

## Changes started in this branch
- Added bilingual experience listing, categories and checkout routes.
- Added a server-side booking submission endpoint that validates input, uploads the receipt to a private Supabase Storage bucket, and calls an atomic database RPC.
- Added migration `0002_secure_booking_submission.sql` to remove the permissive direct insert policy, add receipt/reference fields, create a private receipt bucket, reserve seats within a transaction, and release reserved seats on cancellation.
- Further security hardening of the payment verification, WhatsApp dispatch, scanner and dashboard should be completed before enabling real production payments.

## Required environment
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose in client variables)
- Supabase migration `0002_secure_booking_submission.sql` applied to the target project
- Private Storage bucket `payment-proofs` created by the migration

## Release blockers
- Admin identity and role authorization must be wired to Supabase Auth before payment approval or ticket issuance is enabled.
- Configure a real WhatsApp Cloud API sender and approved message templates; OTP needs an expiring, one-time verification store and attempt limits.
- Replace sample experience content with records from the production database.
- Replace the simulated QR scanner with server-side ticket lookup and atomic check-in.
- Run install/build/type-check and end-to-end payment tests in the actual deployment environment.
- Configure rate limiting/CAPTCHA and abuse monitoring for public booking submission.
