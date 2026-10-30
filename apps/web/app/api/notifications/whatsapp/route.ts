import { NextResponse } from "next/server";

// يتم وضع المتغيرات في ملف .env.local
const WHATSAPP_TOKEN = process.env.WHATSAPP_CLOUD_API_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

function formatEgyptianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("01")) return `2${digits}`;
  if (digits.startsWith("201")) return digits;
  return `20${digits}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body || {};

    // OTP must be implemented with expiring, single-use server-side storage,
    // rate limits and a verification endpoint before it can be enabled.
    if (action === "send_otp") {
      return NextResponse.json(
        { error: "WhatsApp OTP is not enabled until a secure verification lifecycle is configured." },
        { status: 503 }
      );
    }

    if (action !== "send_ticket") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const expectedSecret = process.env.INTERNAL_NOTIFICATION_SECRET;
    const suppliedSecret = request.headers.get("x-internal-notification-secret");
    if (!expectedSecret || suppliedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: "WhatsApp provider is not configured" }, { status: 503 });
    }

    const { phone, attendeeName, bookingNumber, tripTitle, tripDate, meetingPoint, seatsCount, totalPaid } = body;
    if (!phone || !attendeeName || !bookingNumber || !tripTitle || !tripDate) {
      return NextResponse.json({ error: "Missing ticket details" }, { status: 400 });
    }
    const recipientPhone = formatEgyptianPhone(String(phone));
    if (!/^20?1[0125][0-9]{8}$/.test(recipientPhone)) {
      return NextResponse.json({ error: "Invalid Egyptian mobile number" }, { status: 400 });
    }

    // Do not put a customer's phone number in the QR payload.
    const qrPayload = `LOE-TICKET:${String(bookingNumber)}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrPayload)}`;
    const messageText =
      `أهلاً بكِ يا ${String(attendeeName)} في مجتمع Ladies Only Events 🌸\\n\\n` +
      `تم اعتماد الدفع وإصدار التذكرة.\\n` +
      `📌 *رقم التذكرة:* ${String(bookingNumber)}\\n` +
      `🏖️ *الرحلة:* ${String(tripTitle)}\\n` +
      `📅 *الموعد:* ${String(tripDate)}\\n` +
      `📍 *نقطة التجمع:* ${String(meetingPoint || "يرجى مراجعة تفاصيل الحجز")}\\n` +
      `👩‍👩‍👧 *عدد المقاعد:* ${Number(seatsCount) || 1}\\n` +
      `💳 *الإجمالي:* EGP ${Number(totalPaid) || 0}\\n\\n` +
      `يرجى إبراز رمز QR عند نقطة التجمع.`;

    const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipientPhone,
        type: "image",
        image: { link: qrImageUrl, caption: messageText },
      }),
      cache: "no-store",
    });
    const providerResult = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("WhatsApp provider rejected ticket message", response.status, JSON.stringify(providerResult).slice(0, 300));
      return NextResponse.json({ error: "WhatsApp delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true, bookingNumber, messageId: providerResult?.messages?.[0]?.id || null });
  } catch (error) {
    console.error("WhatsApp dispatch failed", error);
    return NextResponse.json({ error: "Failed to dispatch WhatsApp message" }, { status: 500 });
  }
}
