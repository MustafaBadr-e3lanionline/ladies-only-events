-- Secure booking submission: public clients can submit a booking through the RPC only.
-- Payment remains pending verification; this function never confirms a payment or issues a ticket.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS transfer_reference TEXT,
  ADD COLUMN IF NOT EXISTS receipt_storage_path TEXT;

DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('payment-proofs', 'payment-proofs', false, 5242880, ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg','image/png','image/webp'];

CREATE OR REPLACE FUNCTION public.create_public_booking(
  p_booking_number TEXT,
  p_experience_slug TEXT,
  p_attendee_name TEXT,
  p_attendee_phone TEXT,
  p_attendee_email TEXT,
  p_special_requests TEXT,
  p_seats_count INTEGER,
  p_payment_method payment_method_type,
  p_transfer_reference TEXT,
  p_receipt_storage_path TEXT,
  p_source_channel TEXT DEFAULT 'direct'
)
RETURNS TABLE (
  booking_id UUID,
  booking_number TEXT,
  total_egp NUMERIC,
  experience_title_ar TEXT,
  experience_title_en TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_experience public.experiences%ROWTYPE;
  v_booking_id UUID;
  v_subtotal NUMERIC(10,2);
  v_fee NUMERIC(10,2);
  v_total NUMERIC(10,2);
BEGIN
  IF length(trim(coalesce(p_attendee_name, ''))) < 2 THEN
    RAISE EXCEPTION 'A valid attendee name is required';
  END IF;
  IF length(regexp_replace(coalesce(p_attendee_phone, ''), '\D', '', 'g')) NOT BETWEEN 10 AND 13 THEN
    RAISE EXCEPTION 'A valid phone number is required';
  END IF;
  IF p_seats_count IS NULL OR p_seats_count < 1 OR p_seats_count > 6 THEN
    RAISE EXCEPTION 'Seat count must be between 1 and 6';
  END IF;
  IF length(trim(coalesce(p_transfer_reference, ''))) < 4 THEN
    RAISE EXCEPTION 'Transfer reference is required';
  END IF;
  IF p_receipt_storage_path IS NULL OR p_receipt_storage_path = '' THEN
    RAISE EXCEPTION 'Payment proof is required';
  END IF;
  IF p_payment_method NOT IN ('bank_transfer', 'vodafone_cash') THEN
    RAISE EXCEPTION 'Unsupported payment method';
  END IF;

  SELECT * INTO v_experience
  FROM public.experiences
  WHERE slug = p_experience_slug
    AND status = 'upcoming'
    AND event_date >= CURRENT_DATE
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Experience is not available';
  END IF;
  IF v_experience.available_seats < p_seats_count THEN
    RAISE EXCEPTION 'Not enough seats available';
  END IF;

  v_subtotal := v_experience.price_egp * p_seats_count;
  v_fee := coalesce(v_experience.service_fee_egp, 0);
  v_total := v_subtotal + v_fee;

  INSERT INTO public.bookings (
    booking_number, experience_id, attendee_name, attendee_phone, attendee_email,
    special_requests, seats_count, subtotal_egp, service_fee_egp, total_egp,
    payment_method, payment_status, receipt_url, receipt_storage_path,
    transfer_reference, status, source_channel
  ) VALUES (
    p_booking_number, v_experience.id, trim(p_attendee_name), trim(p_attendee_phone),
    nullif(trim(coalesce(p_attendee_email, '')), ''),
    nullif(trim(coalesce(p_special_requests, '')), ''),
    p_seats_count, v_subtotal, v_fee, v_total, p_payment_method,
    'pending_verification', NULL, p_receipt_storage_path,
    trim(p_transfer_reference), 'pending',
    CASE WHEN p_source_channel IN ('facebook','instagram','google','whatsapp','direct') THEN p_source_channel ELSE 'direct' END
  )
  RETURNING id INTO v_booking_id;

  UPDATE public.experiences
  SET available_seats = available_seats - p_seats_count
  WHERE id = v_experience.id;

  RETURN QUERY SELECT v_booking_id, p_booking_number, v_total,
    v_experience.title_ar, v_experience.title_en;
END;
$$;

REVOKE ALL ON FUNCTION public.create_public_booking(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,INTEGER,payment_method_type,TEXT,TEXT,TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_public_booking(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,INTEGER,payment_method_type,TEXT,TEXT,TEXT) TO anon, authenticated;
