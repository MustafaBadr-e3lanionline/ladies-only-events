# Initial repository audit — Ladies Only Events

Date: 2026-10-30  
Branch: `audit/fix-booking-security-i18n`

## Confirmed findings from source inspection

1. The home page, experience detail page, account page, admin dashboard, and scanner contain hard-coded demo records. They must not be presented as live operational data.
2. The booking wizard generates a booking number in the browser, sends a WhatsApp ticket request directly from the client, and advances to a success state without persisting a booking or verifying payment.
3. The manual payment verification endpoint accepts client-supplied booking and customer data and has no authentication or persisted booking lookup. This is unsafe for a financial action.
4. The WhatsApp route allows public ticket dispatch and reports success when provider credentials are absent. The OTP branch generates a code but does not persist or verify it.
5. The `en.json` file contains Arabic copy rather than English translations.
6. The initial database migration allows anyone to insert bookings (`WITH CHECK (true)`) and does not define a safe server-side booking workflow.
7. The account page starts with an authenticated demo user and a hard-coded booking list. The scanner simulates validation by checking whether a string contains `LOE`.
8. The GitHub Actions workflow uses `npm ci` in `apps/web`, but the repository tree does not contain a lockfile. This is likely to fail in CI; validate and fix the package-lock setup before relying on deployment automation.
9. Some dates and booking values in the UI are inconsistent with the current seed data; all sample data should be clearly labeled or replaced by database-backed records.

## Changes in this audit branch

- Translate the English message catalog into English.
- Make the payment-verification endpoint fail closed until authentication, booking persistence, and ledger validation exist.
- Restrict WhatsApp ticket dispatch to server-to-server requests with an internal secret; disable the incomplete OTP flow and return truthful provider errors.
- Update the booking UI so it does not claim a booking is confirmed without a persisted booking/payment-verification endpoint.
- Fix the admin UI so it only updates a booking status after a successful server response.
- Remove the permissive public booking-insert policy from the initial schema and document the required trusted server-side write path.

## Still required before production

- Install and configure Supabase server-side access and authenticated admin/customer sessions.
- Implement booking creation, capacity reservation, receipt upload to private storage, payment review, refunds, and immutable financial transactions in the database.
- Add rate limiting and persistent OTP challenge/expiry/verification if phone OTP login is retained.
- Implement actual QR ticket validation and one-time check-in.
- Replace static dashboard/CRM/analytics values with database queries and add automated tests.
- Verify deployment with a committed lockfile and real CI build; no live payment or WhatsApp credentials are included in source.
