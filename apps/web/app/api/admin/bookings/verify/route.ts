import { NextResponse } from "next/server";

/**
 * Payment verification is intentionally fail-closed until a server-side
 * authenticated session, persisted booking lookup, and payment ledger are wired.
 * Never trust customer/amount/status fields supplied by the browser.
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      code: "PAYMENT_VERIFICATION_NOT_CONFIGURED",
      error:
        "Payment verification is unavailable until authenticated admin access and persisted booking verification are configured.",
    },
    { status: 503 }
  );
}
