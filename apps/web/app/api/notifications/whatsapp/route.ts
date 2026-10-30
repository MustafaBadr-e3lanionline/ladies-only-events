import { NextResponse } from "next/server";

const WHATSAPP_TOKEN = process.env.WHATSAPP_CLOUD_API_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const INTERNAL_SECRET = process.env.WHATSAPP_INTERNAL_API_SECRET;

function formatEgyptianPhone(input: string): string | null {
  const digits = input.split("").filter((char) => char >= "0" && char <= "9").join("");
  if (
    digits.length === 11 &&
    digits.startsWith("01") &&
    ["0", "1", "2", "5"].includes(digits[2])
  ) {
    return `2${digits}`;
  }
  if (
    digits.length === 12 &&
    digits.startsWith("201") &&
    ["0", "1", "2", "5"].includes(digits[3])
  ) {
    return digits;
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = typeof body?.action === "string" ? body.action : "";

    // OTP must not be advertised as working until codes are stored, expiry and
    // rate limits are enforced, and a verification endpoint exists.
    if (action === "send_otp") {
      return NextResponse.json(
        { success: false, code: "OTP_FLOW_NOT_CONFIGURED", error: "Phone verification is not configured yet." },
        { status: 503 }
      );
    }

    // Ticket delivery is a privileged operation: browser requests must never
    // be able to trigger arbitrary WhatsApp messages.
    const suppliedSecret = request.headers.get("x-internal-api-secret");
    if (!INTERNAL_SECRET || !suppliedSecret || suppliedSecret !== INTERNAL_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (action !== "send_ticket") {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json(
        { success: false, code: "WHATSAPP_NOT_CONFIGURED", error: "WhatsApp delivery is not configured." },
        { status: 503 }
      );
    }

    const phone = typeof body.phone === "string" ? formatEgyptianPhone(body.phone) : null;
    const bookingNumber = typeof body.bookingNumber === "string" ? body.bookingNumber.trim() : "";
    const attendeeName = typeof body.attendeeName === "string" ? body.attendeeName.trim() : "";
    const tripTitle = typeof body.tripTitle === "string" ? body.tripTitle.trim() : "";
    const tripDate = typeof body.tripDate === "string" ? body.tripDate.trim() : "";
    const meetingPoint = typeof body.meetingPoint === "string" ? body.meetingPoint.trim() : "";
    const seatsCount = Number(body.seatsCount);
    const totalPaid = Number(body.totalPaid);

    if (!phone || !/^LOE-[A-Za-z0-9-]{4,64}$/.test(bookingNumber) ||
        !attendeeName || !tripTitle || !tripDate || !meetingPoint ||
        !Number.isInteger(seatsCount) || seatsCount < 1 || !Number.isFinite(totalPaid) || totalPaid < 0) {
      return NextResponse.json({ success: false, error: "Invalid ticket payload" }, { status: 400 });
    }

    const qrPayload = `LOE-TICKET:${bookingNumber}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrPayload)}`;
    const messageText =
      `أهلاً بكِ يا ${attendeeName} في مجتمع Ladies Only Events 🌸\\n\\n` +
      `تم تأكيد حجزكِ بعد مراجعة الدفع.\\n` +
      `رقم الحجز: ${bookingNumber}\\nالرحلة: ${tripTitle}\\nالموعد: ${tripDate}\\n` +
      `نقطة التجمع: ${meetingPoint}\\nعدد المقاعد: ${seatsCount}\\nالإجمالي: EGP ${totalPaid}`;

    const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "image",
        image: { link: qrImageUrl, caption: messageText },
      }),
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "WhatsApp provider rejected the message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, bookingNumber, providerMessageId: result?.messages?.[0]?.id ?? null });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
