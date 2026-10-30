import Link from "next/link";
import BookingWizard from "../../../features/booking/BookingWizard";

const TRIP_TITLES: Record<string, { ar: string; en: string }> = {
  "ain-sokhna-day-trip": { ar: "رحلة العين السخنة", en: "Ain Sokhna Day Trip" },
  "dahab-getaway": { ar: "مغامرة دهب", en: "Dahab Getaway" },
  "alexandria-tour": { ar: "يوم في الإسكندرية", en: "Alexandria Cultural Tour" },
  "fayoum-oasis-trip": { ar: "واحة الفيوم", en: "Fayoum Oasis Escape" },
};

export default function CheckoutPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { trip?: string; seats?: string };
}) {
  const isAr = locale === "ar";
  const tripSlug = searchParams?.trip ?? "ain-sokhna-day-trip";
  const trip = TRIP_TITLES[tripSlug] ?? TRIP_TITLES["ain-sokhna-day-trip"];

  return (
    <main className="min-h-screen bg-brand-ivory px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="font-serif text-lg font-bold text-brand-burgundy">LADIES ONLY EVENTS</Link>
          <Link href={`/${locale}/experiences`} className="text-sm font-bold text-brand-burgundy">{isAr ? "كل التجارب" : "All experiences"}</Link>
        </div>
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-rose">{isAr ? "طلب حجز تجريبي" : "Booking preview"}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{isAr ? "استكمال تفاصيل الحجز" : "Complete booking details"}</h1>
          <p className="mt-2 text-sm text-gray-600">{isAr ? trip.ar : trip.en}</p>
        </header>
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
          <strong>{isAr ? "نسخة معاينة فقط:" : "Preview only:"}</strong>{" "}
          {isAr
            ? "البيانات والأسعار نموذجية. إرسال النموذج لن ينشئ حجزًا أو يؤكد دفعًا أو يرسل تذكرة؛ سيتم توضيح ذلك بدلًا من إظهار نجاح غير حقيقي."
            : "Details and prices are sample data. Submitting this form will not create a booking, confirm payment, or issue a ticket; the prototype will state this clearly rather than show a false success."}
        </div>
        <BookingWizard locale={locale} tripSlug={tripSlug} />
      </div>
    </main>
  );
}
