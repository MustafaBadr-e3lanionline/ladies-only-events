import { NextResponse } from "next/server";

/**
 * Payment approval is intentionally fail-closed until the application has
 * a verified Supabase Auth session, an admin role check, and a persistent
 * payment-ledger update. A browser-supplied booking number is not proof of
 * staff identity or proof of payment.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "Payment approval is disabled until authenticated staff authorization and database reconciliation are configured. No booking was changed and no ticket was issued.",
    },
    { status: 503 }
  );
}
