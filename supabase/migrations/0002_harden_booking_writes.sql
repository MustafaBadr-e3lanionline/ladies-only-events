-- Security hardening for booking writes.
-- Booking totals, capacity and payment state must be calculated/updated by a
-- trusted server-side transaction, not by arbitrary browser inserts.
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;

-- No INSERT policy is intentionally granted to anon/authenticated clients.
-- Add a narrowly-scoped server workflow (or audited SECURITY DEFINER RPC)
-- before enabling customer booking creation.
