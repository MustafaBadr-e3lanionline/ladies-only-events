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
    const { action, phone } = body;
    const recipientPhone = formatEgyptianPhone(phone || "01012345678");

    // 1. إرسال كود التحقق (OTP) لتسجيل الدخول
    if (action === "send_otp") {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      if (WHATSAPP_TOKEN && PHONE_NUMBER_ID) {
        await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipientPhone,
            type: "template",
            template: {
              name: "loe_otp_login",
              language: { code: "ar" },
              components: [
                {
                  type: "body",
                  parameters: [{ type: "text", text: otpCode }],
                },
              ],
            },
          }),
        });
      }

      return NextResponse.json({ success: true, message: "OTP sent via WhatsApp" });
    }

    // 2. إرسال التذكرة ورمز QR تلقائياً بعد الحجز
    if (action === "send_ticket") {
      const { attendeeName, bookingNumber, tripTitle, tripDate, meetingPoint, seatsCount, totalPaid } = body;
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
        `LOE-TICKET:${bookingNumber}|PHONE:${recipientPhone}`
      )}`;

      const messageText =
        `أهلاً بكِ يا ${attendeeName} في مجتمع Ladies Only Events 🌸\n\n` +
        `تم استلام حجزكِ بنجاح!\n` +
        `📌 *رقم التذكرة:* ${bookingNumber}\n` +
        `🏖️ *الرحلة:* ${tripTitle}\n` +
        `📅 *الموعد:* ${tripDate}\n` +
        `📍 *نقطة التجمع:* ${meetingPoint}\n` +
        `👩‍👩‍👧 *عدد المقاعد:* ${seatsCount}\n` +
        `💳 *الإجمالي:* EGP ${totalPaid}\n\n` +
        `يرجى إبراز رمز الـ QR المرفق لمشرفات الرحلة (Dalia & Rania) عند نقطة التجمع.`;

      if (WHATSAPP_TOKEN && PHONE_NUMBER_ID) {
        await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipientPhone,
            type: "image",
            image: {
              link: qrImageUrl,
              caption: messageText,
            },
          }),
        });
      }

      return NextResponse.json({
        success: true,
        bookingNumber,
        qrImageUrl,
        whatsappRecipient: recipientPhone,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to dispatch WhatsApp message" }, { status: 500 });
  }
}
