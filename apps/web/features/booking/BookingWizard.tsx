"use client";

import React, { useState } from "react";
import { CheckCircle2, CreditCard, Landmark, Smartphone, Lock, Copy, Download } from "lucide-react";

interface BookingWizardProps {
  locale: string;
  tripTitle?: string;
  pricePerPerson?: number;
  serviceFee?: number;
}

export default function BookingWizard({
  locale = "ar",
  tripTitle = "رحلة العين السخنة - Ain Sokhna Day Trip",
  pricePerPerson = 750,
  serviceFee = 15,
}: BookingWizardProps) {
  const isAr = locale === "ar";
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [seats, setSeats] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card_meza" | "bank_transfer" | "vodafone_cash">("card_meza");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const subtotal = seats * pricePerPerson;
  const total = subtotal + serviceFee;
  const bookingNumber = "LOE-20241012-0015";

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-card border border-brand-peach/40 p-6 sm:p-8">
      {/* شريط الخطوات */}
      <div className="flex items-center justify-between mb-8 text-xs font-bold">
        {[
          { num: 1, ar: "بيانات الحجز", en: "Booking Details" },
          { num: 2, ar: "طريقة الدفع", en: "Payment Method" },
          { num: 3, ar: "إتمام الدفع", en: "Payment" },
          { num: 4, ar: "تأكيد الحجز", en: "Confirmation" },
        ].map((item) => (
          <div key={item.num} className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                step >= item.num ? "bg-brand-burgundy text-white" : "bg-brand-softPink text-brand-burgundy"
              }`}
            >
              {item.num}
            </span>
            <span className="hidden sm:inline text-gray-700">{isAr ? item.ar : item.en}</span>
          </div>
        ))}
      </div>

      {/* الخطوة 1: بيانات الحجز */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center gap-4 bg-brand-softPink/60 p-3.5 rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80"
              alt={tripTitle}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">{tripTitle}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Sat, 12 Oct • 06:00 AM</p>
              <p className="text-sm font-extrabold text-brand-burgundy mt-1">EGP {pricePerPerson}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
            <span className="text-sm font-bold text-gray-700">
              {isAr ? "عدد المقاعد" : "Number of Seats"}
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="w-8 h-8 rounded-lg bg-brand-softPink text-brand-burgundy font-bold"
              >
                -
              </button>
              <span className="font-bold text-lg">{seats}</span>
              <button
                type="button"
                onClick={() => setSeats(seats + 1)}
                className="w-8 h-8 rounded-lg bg-brand-softPink text-brand-burgundy font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder={isAr ? "الاسم بالكامل *" : "Full Name *"}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-burgundy"
            />
            <input
              type="tel"
              placeholder={isAr ? "رقم الموبايل (واتساب) *" : "Phone Number *"}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-burgundy"
            />
            <input
              type="email"
              placeholder={isAr ? "البريد الإلكتروني (اختياري)" : "Email (Optional)"}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-burgundy"
            />
            <textarea
              placeholder={isAr ? "أي طلبات خاصة؟ (اختياري)" : "Any special requests? (Optional)"}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-burgundy"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!form.fullName || !form.phone}
            className="w-full bg-brand-burgundy hover:bg-brand-burgundyDark disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition"
          >
            {isAr ? "متابعة لاختيار الدفع" : "Continue"}
          </button>
        </div>
      )}

      {/* الخطوة 2: اختيار وسيلة الدفع */}
      {step === 2 && (
        <div className="space-y-4">
          {[
            {
              id: "card_meza",
              titleAr: "دفع إلكتروني (Visa / MasterCard / ميزة)",
              titleEn: "Online Payment (Visa / MasterCard / Meeza)",
              descAr: "ادفعي بأمان وبتأكيد فوري للحجز",
              descEn: "Pay securely with instant confirmation",
              icon: CreditCard,
            },
            {
              id: "bank_transfer",
              titleAr: "تحويل بنكي / InstaPay",
              titleEn: "Bank Transfer / InstaPay",
              descAr: "حولي لحسابنا البنكي وارفعي صورة الإيصال",
              descEn: "Transfer to our bank account & upload proof",
              icon: Landmark,
            },
            {
              id: "vodafone_cash",
              titleAr: "محفظة إلكترونية (Vodafone Cash)",
              titleEn: "Mobile Wallet (Vodafone Cash)",
              descAr: "الدفع السريع عبر محفظة الموبايل",
              descEn: "Pay easily via mobile wallet",
              icon: Smartphone,
            },
          ].map((item) => {
            const Icon = item.icon;
            const active = paymentMethod === item.id;
            return (
              <label
                key={item.id}
                onClick={() => setPaymentMethod(item.id as any)}
                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                  active ? "border-brand-burgundy bg-brand-softPink/40" : "border-gray-200"
                }`}
              >
                <input type="radio" checked={active} readOnly className="mt-1 accent-brand-burgundy" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{isAr ? item.titleAr : item.titleEn}</div>
                  <div className="text-xs text-gray-500 mt-1">{isAr ? item.descAr : item.descEn}</div>
                </div>
                <Icon className="w-6 h-6 text-brand-burgundy" />
              </label>
            );
          })}

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 border border-gray-300 text-gray-700 font-bold py-3 rounded-xl"
            >
              {isAr ? "رجوع" : "Back"}
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 bg-brand-burgundy text-white font-bold py-3 rounded-xl"
            >
              {isAr ? "متابعة" : "Continue"}
            </button>
          </div>
        </div>
      )}

      {/* الخطوة 3: إتمام الدفع وملخص الفاتورة */}
      {step === 3 && (
        <div className="space-y-5">
          {paymentMethod === "card_meza" ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" className="px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <input type="text" placeholder="CVV" className="px-4 py-3 rounded-xl border border-gray-200 text-sm" />
              </div>
              <input
                type="text"
                placeholder={isAr ? "الاسم على البطاقة" : "Cardholder Name"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-brand-softPink/50 border border-brand-peach text-sm space-y-2">
              <p className="font-bold text-brand-burgundy">
                {isAr
                  ? "يرجى التحويل على الرقم / الحساب التالي ورفع صورة الإيصال:"
                  : "Please transfer to the following account and upload receipt:"}
              </p>
              <p className="font-mono text-gray-800">Vodafone Cash / InstaPay: 01012345678</p>
              <input type="file" className="block w-full text-xs text-gray-600 pt-2" />
            </div>
          )}

          <div className="border-t border-b border-gray-100 py-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{isAr ? `المجموع الفرعي (${seats} فرد)` : `Subtotal (${seats} person)`}</span>
              <span>EGP {subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{isAr ? "رسوم الخدمة" : "Service Fee"}</span>
              <span>EGP {serviceFee}</span>
            </div>
            <div className="flex justify-between font-extrabold text-base text-brand-burgundy pt-2">
              <span>{isAr ? "الإجمالي" : "Total"}</span>
              <span>EGP {total}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-4 h-4 text-brand-teal" />
            <span>{isAr ? "دفع آمن ومشفر بالكامل" : "100% Secure Payment"}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl"
            >
              {isAr ? "رجوع" : "Back"}
            </button>
            <button
              onClick={() => setStep(4)}
              className="w-2/3 bg-brand-burgundy hover:bg-brand-burgundyDark text-white font-bold py-3.5 rounded-xl"
            >
              {isAr ? `ادفعي الآن (EGP ${total})` : `Pay Now (EGP ${total})`}
            </button>
          </div>
        </div>
      )}

      {/* الخطوة 4: تأكيد الحجز والتذكرة */}
      {step === 4 && (
        <div className="text-center space-y-5 py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">Booking Confirmed!</h3>
            <p className="text-lg font-bold text-emerald-700 mt-1">تم تأكيد الحجز بنجاح!</p>
            <p className="text-xs text-gray-500 mt-2">
              {isAr
                ? "تم إرسال التأكيد والتذكرة إلى بريدك الإلكتروني والواتساب"
                : "A confirmation has been sent to your Email & WhatsApp"}
            </p>
          </div>

          <div className="bg-brand-softPink/60 border border-brand-peach rounded-2xl p-4 flex items-center justify-between">
            <div className="text-start">
              <span className="text-xs text-gray-500 block">{isAr ? "رقم الحجز" : "Booking Number"}</span>
              <span className="font-mono font-extrabold text-brand-burgundy text-base">{bookingNumber}</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(bookingNumber)}
              className="p-2 text-brand-burgundy hover:bg-white rounded-lg transition"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`/${locale}/account`}
              className="border border-brand-burgundy text-brand-burgundy font-bold py-3 rounded-xl text-sm"
            >
              {isAr ? "عرض حجوزاتي" : "View My Bookings"}
            </a>
            <button className="bg-brand-burgundy text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>{isAr ? "تحميل التذكرة" : "Download Ticket"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
