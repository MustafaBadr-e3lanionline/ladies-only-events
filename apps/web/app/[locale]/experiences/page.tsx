"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Search, SlidersHorizontal, Users, ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
  { slug: "ain-sokhna-day-trip", titleAr: "رحلة العين السخنة", titleEn: "Ain Sokhna Day Trip", categoryAr: "مصايف وشواطئ", categoryEn: "Beach Getaways", dateAr: "السبت، 14 نوفمبر 2026", dateEn: "Sat, 14 Nov 2026", price: 750, seats: 12, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=85" },
  { slug: "dahab-getaway", titleAr: "مغامرة دهب", titleEn: "Dahab Getaway", categoryAr: "رحلات متعددة الأيام", categoryEn: "Multi-day Trips", dateAr: "الأربعاء، 25 نوفمبر 2026", dateEn: "Wed, 25 Nov 2026", price: 1450, seats: 8, image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85" },
  { slug: "alexandria-tour", titleAr: "يوم في الإسكندرية", titleEn: "Alexandria Cultural Tour", categoryAr: "جولات ثقافية", categoryEn: "Cultural Tours", dateAr: "الأربعاء، 2 ديسمبر 2026", dateEn: "Wed, 2 Dec 2026", price: 600, seats: 15, image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=900&q=85" },
  { slug: "fayoum-oasis-trip", titleAr: "واحة الفيوم", titleEn: "Fayoum Oasis Escape", categoryAr: "مغامرات", categoryEn: "Adventure", dateAr: "الثلاثاء، 8 ديسمبر 2026", dateEn: "Tue, 8 Dec 2026", price: 700, seats: 10, image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=85" },
];

export default function ExperiencesPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const items = useMemo(() => EXPERIENCES.filter((item) => {
    const title = isAr ? item.titleAr : item.titleEn;
    const cat = isAr ? item.categoryAr : item.categoryEn;
    return title.toLowerCase().includes(query.toLowerCase()) && (category === "all" || cat === category);
  }), [query, category, isAr]);
  const categories = Array.from(new Set(EXPERIENCES.map((item) => isAr ? item.categoryAr : item.categoryEn)));

  return (
    <main className="min-h-screen bg-brand-ivory">
      <header className="border-b border-brand-peach/40 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href={`/${locale}`} className="font-serif text-lg font-bold text-brand-burgundy">LADIES ONLY EVENTS</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href={isAr ? "/en/experiences" : "/ar/experiences"} className="rounded-full border border-brand-peach px-3 py-2 font-bold text-brand-burgundy">{isAr ? "EN" : "عربي"}</Link>
            <Link href={`/${locale}/account`} className="font-semibold text-gray-700">{isAr ? "حسابي" : "My Account"}</Link>
          </div>
        </div>
      </header>
      <section className="bg-gradient-to-br from-brand-burgundy to-[#a94365] px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-peach">{isAr ? "خططي لوقتك القادم" : "Your next story starts here"}</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{isAr ? "تجارب تجمع بين المغامرة والصداقة" : "Experiences made for adventure and connection"}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{isAr ? "اكتشفي رحلات وإيفنتات مختارة، وتعرفي على تفاصيل كل تجربة قبل الحجز." : "Explore curated trips and gatherings, and discover every detail before you book."}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-7 grid gap-3 rounded-2xl border border-brand-peach/40 bg-white p-4 shadow-card md:grid-cols-[1fr_260px_auto]">
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-3">
            <Search className="h-4 w-4 text-gray-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isAr ? "ابحثي عن رحلة..." : "Search experiences..."} className="w-full bg-transparent py-3 text-sm outline-none" />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-3">
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full bg-transparent py-3 text-sm outline-none">
              <option value="all">{isAr ? "كل التصنيفات" : "All categories"}</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <div className="flex items-center justify-center rounded-xl bg-brand-softPink px-4 text-xs font-bold text-brand-burgundy">{items.length} {isAr ? "تجارب" : "experiences"}</div>
        </div>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div><h2 className="text-2xl font-bold text-gray-900">{isAr ? "التجارب القادمة" : "Upcoming experiences"}</h2><p className="mt-1 text-sm text-gray-500">{isAr ? "اختاري التجربة المناسبة لكِ" : "Find the right experience for you"}</p></div>
          <span className="hidden rounded-full bg-white px-4 py-2 text-xs text-gray-500 md:inline-flex">{isAr ? "رحلات نسائية فقط" : "Women-only experiences"}</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.slug} className="group overflow-hidden rounded-3xl border border-brand-peach/30 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/${locale}/experiences/${item.slug}`} className="block">
                <div className="relative h-56 overflow-hidden"><img src={item.image} alt={isAr ? item.titleAr : item.titleEn} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-brand-burgundy">{isAr ? item.categoryAr : item.categoryEn}</span></div>
                <div className="space-y-4 p-5">
                  <h3 className="text-lg font-bold text-gray-900">{isAr ? item.titleAr : item.titleEn}</h3>
                  <div className="space-y-2 text-xs text-gray-500"><p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand-rose" />{isAr ? item.dateAr : item.dateEn}</p><p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-rose" />{isAr ? "نقطة التجمع بالقاهرة" : "Cairo meeting point"}</p><p className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-rose" />{isAr ? `متبقي ${item.seats} مقعدًا (بيانات عرض)` : `${item.seats} seats left (sample data)`}</p></div>
                  <div className="flex items-end justify-between border-t border-gray-100 pt-4"><div><span className="block text-[11px] text-gray-400">{isAr ? "يبدأ من" : "From"}</span><strong className="text-xl text-brand-burgundy">EGP {item.price}</strong><span className="text-[11px] text-gray-400"> / {isAr ? "للفرد" : "person"}</span></div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-softPink text-brand-burgundy"><ArrowUpRight className="h-5 w-5" /></span></div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {items.length === 0 && <div className="rounded-2xl border border-dashed border-brand-peach bg-white p-12 text-center text-sm text-gray-500">{isAr ? "لا توجد تجارب تطابق بحثك." : "No experiences match your search."}</div>}
        <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">{isAr ? "تنبيه: بيانات الرحلات والأسعار والمقاعد المعروضة هنا بيانات نموذجية للتصميم، وليست تأكيدًا للتوافر أو الحجز." : "Note: experience dates, prices and availability shown here are sample design data, not live availability or a confirmed booking."}</p>
      </section>
    </main>
  );
}
