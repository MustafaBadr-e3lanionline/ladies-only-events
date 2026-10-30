"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Landmark,
  Smartphone,
  CreditCard,
  Upload,
  Lock,
  Copy,
  Download,
  MessageCircle,
} from "lucide-react";

export default function BookingWizard({ locale = "ar", tripSlug = "ain-sokhna-day-trip" }: { locale?: string; tripSlug?: string }) {
  const isAr = locale === "ar";
  const trips: Record<string, { titleAr: string; titleEn: string; dateAr: string; dateEn: string; timeEn: string; price: number; image: string }> = {
    "ain-sokhna-day-trip": { titleAr: "رحلة العين السخنة", titleEn: "Ain Sokhna Day Trip", dateAr: "14 نوفمبر 2026", dateEn: "14 Nov 2026", timeEn: "06:00 AM", price: 750, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80" },
    "dahab-getaway": { titleAr: "مغامرة دهب", titleEn: "Dahab Getaway", dateAr: "25 نوفمبر 2026", dateEn: "25 Nov 2026", timeEn: "05:00 AM", price: 1450, image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=300&q=80" },
    "alexandria-tour": { titleAr: "يوم في الإسكندرية", titleEn: "Alexandria Day Tour", dateAr: "2 ديسمبر 2026", dateEn: "2 Dec 2026", timeEn: "06:30 AM", price: 600, image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=300&q=80" },
    "fayoum-oasis-trip": { titleAr: "واحة الفيوم", titleEn: "Fayoum Oasis", dateAr: "8 ديسمبر 2026", dateEn: "8 Dec 2026", timeEn: "07:00 AM", price: 700, image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80" },
  };
  const trip = trips[tripSlug] || trips["ain-sokhna-day-trip"];
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [seats, setSeats] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"instapay_bank" | "vodafone_cash">("instapay_bank");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
    transferReference: "",
    receiptFile: null as File | null,
  });

  const pricePerPerson = trip.price;
  const serviceFee = 15;
  const subtotal = seats * pricePerPerson;
  const total = subtotal + serviceFee;
  const [bookingNumber, setBookingNumber] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmManualPayment = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      if (!form.receiptFile) {
        setErrorMessage(isAr ? "ارفعي صورة إيصال التحويل أولاً." : "Please upload your transfer receipt first.");
        return;
      }
      const payload = new FormData();
      payload.set("fullName", form.fullName.trim());
      payload.set("phone", form.phone.trim());
      payload.set("email", form.email.trim());
      payload.set("notes", form.notes.trim());
      payload.set("transferReference", form.transferReference.trim());
      payload.set("receipt", form.receiptFile);
      payload.set("tripSlug", tripSlug);
      payload.set("seats", String(seats));
      payload.set("paymentMethod", paymentMethod);

      const response = await fetch("/api/bookings", { method: "POST", body: payload });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(result.error || (isAr ? "تعذر إرسال طلب الحجز. حاولي مرة أخرى." : "Could not submit the booking. Please try again."));
        return;
      }
      setBookingNumber(result.bookingNumber);
      setConfirmedTotal(Number(result.total));
      setStep(4);
    } catch {
      setErrorMessage(isAr ? "تعذر الاتصال بالخدمة. لم يتم تأكيد الحجز؛ حاولي لاحقًا." : "The service could not be reached. Your booking is not confirmed; please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-card border border-brand-peach/40 p-6 sm:p-8">
      {/* شريط الخطوات (1 إلى 4) */}
      <div className="flex items-center justify-between mb-8 text-xs font-bold">
        {[
          { num: 1, ar: "بيانات الحجز", en: "Booking Details" },
          { num: 2, ar: "طريقة الدفع", en: "Payment Method" },
          { num: 3, ar: "تأكيد التحويل", en: "Payment Proof" },
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

      {errorMessage && <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-700">{errorMessage}</div>}

      {/* الخطوة 1: بيانات المشتركة */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center gap-4 bg-brand-softPink/60 p-3.5 rounded-2xl">
            <img
              src={trip.image}
              alt="Ain Sokhna"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">{isAr ? trip.titleAr : trip.titleEn}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{isAr ? trip.dateAr : trip.dateEn} • {trip.timeEn}</p>
              <p className="text-sm font-extrabold text-brand-burgundy mt-1">EGP {pricePerPerson}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
            <span className="text-sm font-bold text-gray-700">
              {isAr ? "عدد الأفراد" : "Number of Attendees"}
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
              placeholder={isAr ? "رقم الموبايل المرتبط بالواتساب (مثال: 01012345678) *" : "WhatsApp Phone Number *"}
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

      {/* الخطوة 2: اختيار وسيلة الدفع اليدوية */}
      {step === 2 && (
        <div className="space-y-4">
          {/* InstaPay / Bank Transfer */}
          <label
            onClick={() => setPaymentMethod("instapay_bank")}
            className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
              paymentMethod === "instapay_bank"
                ? "border-brand-burgundy bg-brand-softPink/40"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              checked={paymentMethod === "instapay_bank"}
              readOnly
              className="mt-1 accent-brand-burgundy"
            />
            <div className="flex-1">
              <div className="font-bold text-gray-900">
                {isAr ? "تحويل بنكي / إنستا باي (InstaPay)" : "Bank Transfer / InstaPay"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isAr
                  ? "حولي مباشرة عبر تطبيق InstaPay أو الحساب البنكي وارفعي صورة الإيصال"
                  : "Transfer via InstaPay or bank account and upload proof"}
              </div>
            </div>
            <Landmark className="w-6 h-6 text-brand-burgundy" />
          </label>

          {/* Vodafone Cash */}
          <label
            onClick={() => setPaymentMethod("vodafone_cash")}
            className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
              paymentMethod === "vodafone_cash"
                ? "border-brand-burgundy bg-brand-softPink/40"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              checked={paymentMethod === "vodafone_cash"}
              readOnly
              className="mt-1 accent-brand-burgundy"
            />
            <div className="flex-1">
              <div className="font-bold text-gray-900">
                {isAr ? "محفظة فودافون كاش (Vodafone Cash)" : "Mobile Wallet (Vodafone Cash)"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isAr
                  ? "حولي من أي محفظة إلكترونية وارفعي لقطة شاشة للتحويل"
                  : "Pay via mobile wallet and upload screenshot"}
              </div>
            </div>
            <Smartphone className="w-6 h-6 text-brand-burgundy" />
          </label>

          {/* البطاقات البنكية (مؤجل مع إشارة قريباً) */}
          <div className="flex items-start gap-4 p-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 opacity-60">
            <input type="radio" disabled className="mt-1" />
            <div className="flex-1">
              <div className="font-bold text-gray-600 flex items-center gap-2">
                <span>{isAr ? "الدفع بالبطاقات (Visa / MasterCard / ميزة)" : "Online Card Payment"}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-peach/50 text-brand-burgundy">
                  {isAr ? "قريباً" : "Soon"}
                </span>
              </div>
            </div>
            <CreditCard className="w-6 h-6 text-gray-400" />
          </div>

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

      {/* الخطوة 3: بيانات التحويل اليدوي ورفع الإيصال */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-brand-softPink/60 border border-brand-peach space-y-3">
            <p className="text-xs font-bold text-brand-burgundy">
              {paymentMethod === "instapay_bank"
                ? isAr
                  ? "بيانات التحويل عبر InstaPay / الحساب البنكي:"
                  : "InstaPay / Bank Transfer Details:"
                : isAr
                ? "بيانات التحويل عبر محفظة فودافون كاش:"
                : "Vodafone Cash Wallet Details:"}
            </p>

            <div className="bg-white p-3 rounded-xl flex items-center justify-between border border-brand-peach/40">
              <div>
                <span className="text-[11px] text-gray-400 block">
                  {paymentMethod === "instapay_bank" ? "InstaPay IPA / Mobile" : "Vodafone Cash Number"}
                </span>
                <span className="font-mono font-extrabold text-brand-burgundy text-sm">
                  {paymentMethod === "instapay_bank" ? "ladiesonly@instapay / 01012345678" : "01012345678"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText("01012345678")}
                className="p-2 rounded-lg hover:bg-brand-softPink text-brand-burgundy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              <input
                type="text"
                placeholder={
                  isAr
                    ? "رقم الموبايل المحول منه أو الرقم المرجعي للعملية *"
                    : "Sender Mobile or Reference Number *"
                }
                value={form.transferReference}
                onChange={(e) => setForm({ ...form, transferReference: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:border-brand-burgundy"
              />

              <label className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-brand-rose/50 bg-white cursor-pointer hover:bg-brand-softPink/30 transition text-xs font-bold text-brand-burgundy">
                <Upload className="w-4 h-4" />
                <span>
                  {form.receiptFile
                    ? form.receiptFile.name
                    : isAr
                    ? "ارفعي لقطة شاشة لإيصال التحويل (Screenshot) *"
                    : "Upload Transfer Receipt Screenshot *"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setForm({ ...form, receiptFile: e.target.files?.[0] || null })
                  }
                />
              </label>
            </div>
          </div>

          {/* ملخص الفاتورة */}
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
              <span>{isAr ? "الإجمالي المطلوب تحويله" : "Total Due"}</span>
              <span>EGP {total}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-4 h-4 text-brand-teal" />
            <span>
              {isAr
                ? "سيظل الحجز قيد المراجعة حتى يتأكد الفريق من التحويل. لن تصدر التذكرة قبل اعتماد الدفع."
                : "Your booking stays pending until the team verifies the transfer. No ticket is issued before payment approval."}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl"
            >
              {isAr ? "رجوع" : "Back"}
            </button>
            <button
              onClick={handleConfirmManualPayment}
              disabled={!form.transferReference || !form.receiptFile || isSubmitting}
              className="w-2/3 bg-brand-burgundy hover:bg-brand-burgundyDark disabled:opacity-50 text-white font-bold py-3.5 rounded-xl"
            >
              {isSubmitting
                ? isAr
                  ? "جاري إرسال طلب الحجز..."
                  : "Submitting booking..."
                : isAr
                ? `إرسال الحجز للمراجعة (EGP ${total})`
                : `Submit for review (EGP ${total})`}
            </button>
          </div>
        </div>
      )}

      {/* الخطوة 4: التأكيد وإرسال الواتساب التلقائي */}
      {step === 4 && (
        <div className="text-center space-y-5 py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">{isAr ? "تم استلام طلب الحجز" : "Booking request received"}</h3>
            <p className="text-lg font-bold text-amber-700 mt-1">{isAr ? "الحجز قيد مراجعة الدفع" : "Payment verification pending"}</p>
            <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>
                {isAr
                  ? `سيتم تأكيد الحجز بعد مراجعة التحويل. رقم التواصل: ${form.phone}`
                  : `Your booking will be confirmed after the transfer is reviewed. Contact: ${form.phone}`}
              </span>
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

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-start text-sm leading-6 text-amber-900">
            {isAr ? "احتفظي برقم الحجز. هذه ليست تذكرة دخول، ولن يصدر QR إلا بعد مراجعة واعتماد الدفع من فريق Ladies Only Events." : "Keep your booking reference. This is not an entry ticket; a QR ticket is issued only after the Ladies Only Events team verifies payment."}
          </div>
          <a href={`/${locale}/experiences`} className="block rounded-xl bg-brand-burgundy py-3 text-sm font-bold text-white">{isAr ? "العودة إلى الرحلات" : "Back to experiences"}</a>
        </div>
      )}
    </div>
  );
}
