import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingNumber, phone, customerName, eventTitle, eventDate, amount, action } = body;

    if (action !== "approve") {
      return NextResponse.json({ status: "rejected", bookingNumber });
    }

    // 1. استدعاء خدمة الواتساب لإرسال التذكرة المؤكدة ورمز الـ QR للعميلة تلقائياً
    const origin = new URL(request.url).origin;
    await fetch(`${origin}/api/notifications/whatsapp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "send_ticket",
        phone,
        attendeeName: customerName,
        bookingNumber,
        tripTitle: eventTitle,
        tripDate: eventDate,
        meetingPoint: "القاهرة الجديدة (نقطة التجمع) - 06:00 AM",
        seatsCount: 1,
        totalPaid: amount,
      }),
    });

    return NextResponse.json({
      success: true,
      bookingNumber,
      newStatus: "Confirmed",
      whatsappDispatched: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify booking and send WhatsApp ticket" },
      { status: 500 }
    );
  }
}
