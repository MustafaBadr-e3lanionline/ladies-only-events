import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users, Sparkles } from "lucide-react";

const trips = [
  { slug: "ain-sokhna-day-trip", titleAr: "رحلة العين السخنة", titleEn: "Ain Sokhna Day Escape", dateAr: "14 نوفمبر 2026", dateEn: "14 Nov 2026", price: 750, seats: 12, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85", categoryAr: "بحر واستجمام", categoryEn: "Beach & Relaxation" },
  { slug: "dahab-getaway", titleAr: "مغامرة دهب", titleEn: "Dahab Getaway", dateAr: "25 نوفمبر 2026", dateEn: "25 Nov 2026", price: 1450, seats: 8, image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=85", categoryAr: "مغامرات", categoryEn: "Adventure" },
  { slug: "alexandria-tour", titleAr: "يوم في الإسكندرية", titleEn: "Alexandria Day Tour", dateAr: "2 ديسمبر 2026", dateEn: "2 Dec 2026", price: 600, seats: 15, image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=85", categoryAr: "ثقافة واكتشاف", categoryEn: "Culture & Discovery" },
  { slug: "fayoum-oasis-trip", titleAr: "واحة الفيوم", titleEn: "Fayoum Oasis", dateAr: "8 ديسمبر 2026", dateEn: "8 Dec 2026", price: 700, seats: 10, image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=85", categoryAr: "طبيعة ومغامرة", categoryEn: "Nature & Adventure" },
];

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return <main className="min-h-screen bg-brand-ivory">
    <section className="relative overflow-hidden bg-brand-burgundy text-white">
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80)", backgroundPosition: "center", backgroundSize: "cover" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <Link href={`/${locale}`} className="text-sm text-white/75 hover:text-white">{isAr ? "الرئيسية" : "Home"} / {isAr ? "التجارب" : "Experiences"}</Link>
        <p className="mt-8 flex items-center gap-2 text-sm font-bold text-brand-peach"><Sparkles size={16}/>{isAr ? "اصنعي ذكريات جديدة" : "Make room for new memories"}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">{isAr ? "تجارب تجمعنا، وذكريات تفضل معانا" : "Experiences that bring us together"}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{isAr ? "رحلات وإيفنتات مختارة بعناية، في مجتمع نسائي يديكي مساحة للراحة والتجربة وتكوين صداقات جديدة." : "Thoughtfully curated trips and events in a welcoming women-only community."}</p>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-bold text-brand-rose">{isAr ? "اختاري مغامرتك القادمة" : "FIND YOUR NEXT ESCAPE"}</p><h2 className="mt-2 text-2xl font-bold text-brand-burgundy sm:text-3xl">{isAr ? "الرحلات والفعاليات القادمة" : "Upcoming trips & events"}</h2></div>
        <span className="rounded-full border border-brand-peach bg-white px-4 py-2 text-sm text-gray-600">{trips.length} {isAr ? "تجارب مقترحة" : "featured experiences"}</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {trips.map((trip) => <article key={trip.slug} className="group flex flex-col overflow-hidden rounded-3xl border border-brand-peach/50 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-56 overflow-hidden"><img src={trip.image} alt={isAr ? trip.titleAr : trip.titleEn} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-burgundy">{isAr ? trip.categoryAr : trip.categoryEn}</span></div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-xl font-bold text-gray-900">{isAr ? trip.titleAr : trip.titleEn}</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-500"><p className="flex items-center gap-2"><CalendarDays size={16} className="text-brand-rose"/>{isAr ? trip.dateAr : trip.dateEn}</p><p className="flex items-center gap-2"><MapPin size={16} className="text-brand-rose"/>{isAr ? "نقطة التجمع بالقاهرة — التفاصيل عند الحجز" : "Cairo meeting point — details at booking"}</p><p className="flex items-center gap-2"><Users size={16} className="text-brand-rose"/>{isAr ? `أماكن محدودة — ${trip.seats} مقعدًا متاحًا في بيانات العرض` : `Limited places — ${trip.seats} seats in sample listing`}</p></div>
            <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-5 mt-5"><div><span className="block text-xs text-gray-400">{isAr ? "السعر يبدأ من" : "Starting from"}</span><strong className="text-xl text-brand-burgundy">{trip.price.toLocaleString(isAr ? "ar-EG" : "en-US")} <small className="text-xs">EGP</small></strong></div><Link href={`/${locale}/checkout?trip=${trip.slug}`} className="inline-flex items-center gap-2 rounded-full bg-brand-burgundy px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-rose">{isAr ? "احجزي" : "Book"}<Arrow size={16}/></Link></div>
          </div>
        </article>)}
      </div>
      <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">{isAr ? "ملاحظة: هذه بيانات عرض أولية. قبل استقبال حجوزات فعلية، يجب مطابقة المواعيد والأسعار والسعة مع قاعدة بيانات Supabase المعتمدة." : "Note: These are initial display listings. Confirm dates, pricing and availability against the live Supabase database before accepting real bookings."}</p>
    </section>
  </main>;
}
