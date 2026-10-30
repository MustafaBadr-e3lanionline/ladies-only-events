import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return jsonError("Booking service is not configured. No booking was created.", 503);
  }

  let receiptPath: string | null = null;
  try {
    const form = await request.formData();
    const fullName = String(form.get("fullName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const notes = String(form.get("notes") || "").trim();
    const tripSlug = String(form.get("tripSlug") || "").trim();
    const reference = String(form.get("transferReference") || "").trim();
    const rawSeats = Number(form.get("seats") || 1);
    const method = String(form.get("paymentMethod") || "");
    const receipt = form.get("receipt");

    if (fullName.length < 2 || fullName.length > 120) return jsonError("Enter a valid full name.");
    if (!/^\+?[0-9\s()-]{10,18}$/.test(phone)) return jsonError("Enter a valid phone number.");
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return jsonError("Enter a valid email address.");
    if (!/^[a-z0-9-]{2,100}$/.test(tripSlug)) return jsonError("Select a valid experience.");
    if (!Number.isInteger(rawSeats) || rawSeats < 1 || rawSeats > 6) return jsonError("Seat count must be between 1 and 6.");
    if (reference.length < 4 || reference.length > 100) return jsonError("Enter the transfer reference.");
    if (method !== "instapay_bank" && method !== "vodafone_cash") return jsonError("Select a supported transfer method.");
    if (!(receipt instanceof File)) return jsonError("Upload a payment receipt.");
    if (!ALLOWED_TYPES.has(receipt.type) || receipt.size < 1 || receipt.size > MAX_FILE_SIZE) return jsonError("Receipt must be a JPG, PNG or WebP image up to 5 MB.");

    const ext = receipt.type === "image/jpeg" ? "jpg" : receipt.type === "image/png" ? "png" : "webp";
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
    const bookingNumber = `LOE-${datePart}-${randomPart}`;
    receiptPath = `${datePart}/${bookingNumber}.${ext}`;

    const upload = await fetch(`${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/payment-proofs/${receiptPath}`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": receipt.type,
        "x-upsert": "false",
      },
      body: await receipt.arrayBuffer(),
      cache: "no-store",
    });
    if (!upload.ok) {
      const detail = await upload.text();
      console.error("Receipt upload failed", upload.status, detail.slice(0, 300));
      return jsonError("Could not securely upload the receipt. Please try again.", 502);
    }

    const rpc = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/rpc/create_public_booking`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_booking_number: bookingNumber,
        p_experience_slug: tripSlug,
        p_attendee_name: fullName,
        p_attendee_phone: phone,
        p_attendee_email: email || null,
        p_special_requests: notes || null,
        p_seats_count: rawSeats,
        p_payment_method: method === "instapay_bank" ? "bank_transfer" : "vodafone_cash",
        p_transfer_reference: reference,
        p_receipt_storage_path: receiptPath,
        p_source_channel: "direct",
      }),
      cache: "no-store",
    });
    if (!rpc.ok) {
      const detail = await rpc.text();
      console.error("Booking RPC failed", rpc.status, detail.slice(0, 500));
      await fetch(`${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/payment-proofs/${receiptPath}`, {
        method: "DELETE",
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      }).catch(() => undefined);
      receiptPath = null;
      return jsonError("The booking could not be created. Check availability and try again.", 409);
    }

    const rows = await rpc.json();
    const booking = Array.isArray(rows) ? rows[0] : rows;
    if (!booking?.booking_number) return jsonError("The booking response was incomplete. Contact support before retrying.", 502);

    return NextResponse.json({
      success: true,
      bookingNumber: booking.booking_number,
      total: Number(booking.total_egp),
      status: "pending_verification",
      message: "Booking submitted. Payment proof must be verified before confirmation.",
    }, { status: 201 });
  } catch (error) {
    console.error("Booking submission failed", error);
    return jsonError("Unable to submit booking right now. Please try again later.", 500);
  }
}
