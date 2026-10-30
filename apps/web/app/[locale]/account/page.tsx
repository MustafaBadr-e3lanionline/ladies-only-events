"use client";

import React, { use, useState } from "react";
import {
  Calendar,
  CreditCard,
  User,
  Star,
  Gift,
  Bell,
  LogOut,
  Download,
  MapPin,
  Users,
  ShieldCheck,
  QrCode,
  ChevronRight,
  ChevronLeft,
  Smartphone,
} from "lucide-react";

const MY_BOOKINGS = [
  {
    id: "LOE-20241012-0015",
    titleEn: "Ain Sokhna Day Trip",
    titleAr: "رحلة العين السخنة",
    dateEn: "Sat, 12 Oct 2024",
    dateAr: "السبت، 12 أكتوبر 2024",
    attendees: 1,
    meetingPointEn: "New Cairo - 06:00 AM",
    meetingPointAr: "القاهرة الجديدة - 06:00 صباحاً",
    leader: "Dalia & Rania",
    status: "confirmed",
    tab: "upcoming",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "LOE-20241025-0022",
    titleEn: "Dahab Getaway",
    titleAr: "رحلة دهب",
    dateEn: "Fri, 25 Oct 2024",
    dateAr: "الجمعة، 25 أكتوبر 2024",
    attendees: 2,
    meetingPointEn: "New Cairo - 05:00 AM",
    meetingPointAr: "القاهرة الجديدة - 05:00 صباحاً",
    leader: "Dalia & Rania",
    status: "pending",
    tab: "upcoming",
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "LOE-20241102-0009",
    titleEn: "Alexandria Tour",
    titleAr: "جولة الإسكندرية",
    dateEn: "Sat, 2 Nov 2024",
    dateAr: "السبت، 2 نوفمبر 2024",
    attendees: 1,
    meetingPointEn: "New Cairo - 06:30 AM",
    meetingPointAr: "القاهرة الجديدة - 06:30 صباحاً",
    leader: "Dalia & Rania",
    status: "completed",
    tab: "past",
    img: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=400&q=80",
  },
];

export default function CustomerAccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const isAr = locale === "ar";
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  // حالة تسجيل الدخول عبر رقم الموبايل + OTP
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // التبويبات والتذكرة المختارة
  const [bookingTab, setBookingTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(MY_BOOKINGS[0]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-card border border-brand-peach/40 p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-softPink text-brand-burgundy flex items-center justify-center mx-auto">
            <Smartphone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-brand-burgundy">
              {isAr ? "تسجيل الدخول برقم الموبايل" : "Mobile OTP Login"}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isAr
                ? "أدخلي رقم الموبايل لاستلام كود التحقق السريع عبر الواتساب وعرض تذاكرك"
                : "Enter your mobile number to receive a WhatsApp OTP code"}
            </p>
          </div>

          {!otpSent ? (
            <div className="space-y-4">
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="01012345678"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-center font-mono text-base focus:outline-none focus:border-brand-burgundy"
              />
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-gray-300 py-3.5 font-bold text-gray-600"
              >
                {isAr ? "تسجيل الدخول الآمن قيد الإعداد" : "Secure sign-in is being configured"}
              </button>
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
                {isAr ? "تم تعطيل الدخول مؤقتًا لأن التحقق الحقيقي من OTP غير مفعّل بعد. لن نعرض حجوزات تجريبية على أنها بياناتك." : "Sign-in is temporarily disabled because real OTP verification is not configured. Demo bookings will not be shown as your personal records."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="• • • •"
                className="w-full px-4 py-3.5 rounded-xl border border-brand-burgundy text-center font-mono text-xl tracking-widest"
              />
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-gray-300 py-3.5 font-bold text-gray-600"
              >
                {isAr ? "التحقق غير متاح حاليًا" : "Verification is currently unavailable"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. الشاشة الأولى: القائمة الجانبية لحساب العميلة (My Account) */}
        <aside className="lg:col-span-3 bg-white rounded-3xl shadow-card border border-brand-peach/30 p-6 h-fit">
          <div className="text-center pb-6 border-b border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
              alt="Sarah Ahmed"
              className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-brand-peach"
            />
            <h2 className="font-bold text-lg text-gray-900 mt-3">Sarah Ahmed</h2>
            <p className="text-xs font-mono text-gray-500 mt-0.5">01012345678</p>
          </div>

          <nav className="py-4 space-y-1">
            {[
              { icon: Calendar, en: "My Bookings", ar: "حجوزاتي", active: true },
              { icon: CreditCard, en: "My Payments", ar: "مدفوعاتي", active: false },
              { icon: User, en: "My Profile", ar: "بياناتي الشخصية", active: false },
              { icon: Star, en: "My Reviews", ar: "تقييماتي", active: false },
              { icon: Gift, en: "Refer a Friend", ar: "ادعي صديقة واحصلي على خصم", active: false },
              { icon: Bell, en: "Notifications", ar: "الإشعارات", active: false },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-start transition ${
                    item.active ? "bg-brand-softPink text-brand-burgundy" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-burgundy" />
                    <div>
                      <span className="block text-sm font-bold">{item.en}</span>
                      <span className="block text-[11px] text-gray-400">{item.ar}</span>
                    </div>
                  </div>
                  <ChevronIcon className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full mt-2 pt-4 border-t border-gray-100 flex items-center gap-3 text-sm font-bold text-rose-600 px-3"
          >
            <LogOut className="w-4 h-4" />
            <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>
          </button>
        </aside>

        {/* 2. الشاشة الثانية: قائمة حجوزاتي (My Bookings) */}
        <section className="lg:col-span-5 bg-white rounded-3xl shadow-card border border-brand-peach/30 p-6 space-y-5 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-brand-burgundy">
              {isAr ? "حجوزاتي - My Bookings" : "My Bookings"}
            </h2>
          </div>

          {/* التبويبات: Upcoming / Past / Cancelled */}
          <div className="grid grid-cols-3 bg-brand-softPink/60 p-1 rounded-full text-xs font-bold">
            {[
              { id: "upcoming", en: "Upcoming", ar: "القادمة" },
              { id: "past", en: "Past", ar: "السابقة" },
              { id: "cancelled", en: "Cancelled", ar: "الملغاة" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setBookingTab(t.id as any)}
                className={`py-2 rounded-full transition ${
                  bookingTab === t.id ? "bg-brand-rose text-white shadow" : "text-gray-600"
                }`}
              >
                {isAr ? t.ar : t.en}
              </button>
            ))}
          </div>

          {/* كروت الرحلات */}
          <div className="space-y-3">
            {MY_BOOKINGS.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className={`flex items-center gap-3.5 p-3 rounded-2xl border cursor-pointer transition ${
                  selectedBooking.id === booking.id
                    ? "border-brand-burgundy bg-brand-softPink/30"
                    : "border-gray-100 hover:border-brand-peach"
                }`}
              >
                <img
                  src={booking.img}
                  alt={booking.titleEn}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-gray-900 truncate">
                      {isAr ? booking.titleAr : booking.titleEn}
                    </h3>
                    {booking.status === "confirmed" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        ✓ Confirmed
                      </span>
                    )}
                    {booking.status === "pending" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                        ⏳ Pending Payment
                      </span>
                    )}
                    {booking.status === "completed" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {isAr ? booking.dateAr : booking.dateEn}
                  </p>
                  <p className="text-xs text-gray-600 font-medium mt-1">
                    👤 {booking.attendees} {booking.attendees > 1 ? "Persons" : "Person"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. الشاشة الثالثة: التذكرة الرقمية برمز QR (Booking Details & QR Ticket) */}
        <section className="lg:col-span-4 bg-white rounded-3xl shadow-card border border-brand-peach/40 overflow-hidden h-fit">
          <div className="relative h-40">
            <img
              src={selectedBooking.img}
              alt={selectedBooking.titleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
              <div className="text-white">
                <h3 className="text-xl font-serif font-bold">
                  {isAr ? selectedBooking.titleAr : selectedBooking.titleEn}
                </h3>
                <p className="text-xs text-white/85">
                  {isAr ? selectedBooking.dateAr : selectedBooking.dateEn}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
              <div>
                <span className="text-[11px] text-gray-400 block">Booking Number</span>
                <span className="font-mono font-extrabold text-sm text-brand-burgundy">
                  {selectedBooking.id}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                Confirmed
              </span>
            </div>

            {/* QR Code + Trip Metadata */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 bg-brand-ivory p-3 rounded-2xl border border-brand-peach/50 flex flex-col items-center justify-center">
                {/* توليد رمز QR فعلي ومقروء برقم التذكرة */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                    `LOE-TICKET:${selectedBooking.id}|PHONE:01012345678`
                  )}`}
                  alt="Ticket QR Code"
                  className="w-28 h-28 rounded-lg"
                />
                <span className="text-[9px] font-mono text-gray-500 mt-1.5">
                  {selectedBooking.id}
                </span>
              </div>

              <div className="col-span-7 space-y-2.5 text-xs">
                <div>
                  <span className="text-gray-400 block">{isAr ? "عدد الأفراد" : "Attendees"}</span>
                  <span className="font-bold text-gray-800">
                    {selectedBooking.attendees} Person
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">{isAr ? "نقطة التجمع" : "Meeting Point"}</span>
                  <span className="font-bold text-gray-800">
                    {isAr ? selectedBooking.meetingPointAr : selectedBooking.meetingPointEn}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">{isAr ? "إشراف الرحلة" : "Trip Leader"}</span>
                  <span className="font-bold text-brand-burgundy">{selectedBooking.leader}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-brand-burgundy hover:bg-brand-burgundyDark text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow transition"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? "تحميل التذكرة (PDF)" : "Download Ticket"}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
