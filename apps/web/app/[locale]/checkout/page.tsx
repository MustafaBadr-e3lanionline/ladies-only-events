import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import BookingWizard from "../../../features/booking/BookingWizard";

export default async function CheckoutPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams?: Promise<{ trip?: string }> }) {
  const { locale } = await params;
  const query = searchParams ? await searchParams : {};
  const isAr = locale === "ar";
  const tripSlug = query.trip || "ain-sokhna-day-trip";
  return <main className="min-h-screen bg-brand-ivory">
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <Link href={`/${locale}/experiences`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-burgundy hover:text-brand-rose">{isAr ? <ArrowRight size={16}/> : <ArrowLeft size={16}/>} {isAr ? "العودة إلى الرحلات" : "Back to experiences"}</Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section><p className="text-sm font-bold tracking-widest text-brand-rose">{isAr ? "خطوة واحدة أقرب لمغامرتك" : "ONE STEP CLOSER TO YOUR NEXT ESCAPE"}</p><h1 className="mt-2 text-3xl font-bold text-brand-burgundy sm:text-4xl">{isAr ? "احجزي مكانك" : "Reserve your place"}</h1><p className="mb-7 mt-3 max-w-2xl leading-7 text-gray-600">{isAr ? "أدخلي بيانات الحجز وارفعي إثبات التحويل. سيظل الحجز قيد المراجعة حتى يراجع فريقنا الدفع." : "Enter your booking details and upload your transfer proof. Your booking remains pending until our team verifies payment."}</p><BookingWizard locale={locale} tripSlug={tripSlug}/></section>
        <aside className="h-fit rounded-3xl border border-brand-peach/50 bg-white p-6 shadow-card"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-softPink text-brand-burgundy"><ShieldCheck size={22}/></span><div><h2 className="font-bold text-gray-900">{isAr ? "حجز واضح وآمن" : "A clear, secure booking"}</h2><p className="text-xs text-gray-500">{isAr ? "مراجعة قبل التأكيد النهائي" : "Verified before final confirmation"}</p></div></div><ul className="mt-6 space-y-4 text-sm leading-6 text-gray-600"><li>✓ {isAr ? "الأسعار تُراجع قبل التحويل" : "Review the total before transferring"}</li><li>✓ {isAr ? "إثبات التحويل يراجعه الفريق" : "Transfer proof is reviewed by the team"}</li><li>✓ {isAr ? "لا تصدر التذكرة قبل تأكيد الدفع" : "Tickets are not issued before payment approval"}</li></ul><p className="mt-6 rounded-2xl bg-brand-softPink p-4 text-xs leading-6 text-brand-burgundy">{isAr ? "لا ترسلي بيانات بطاقتك أو كلمات المرور عبر واتساب. استخدمي فقط وسائل الدفع المعلنة رسميًا." : "Never share card details or passwords over WhatsApp. Use only officially listed payment methods."}</p></aside>
      </div>
    </div>
  </main>;
}
