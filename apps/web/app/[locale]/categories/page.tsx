"use client";

import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight, Compass, Palmtree, Landmark, Heart, Palette, Users } from "lucide-react";

const CATEGORIES = [
  { slug: "day-trips", titleAr: "رحلات اليوم الواحد", titleEn: "Day Trips", descAr: "يوم جديد، أماكن جديدة وذكريات تستحق.", descEn: "A fresh day, new places and memories to keep.", icon: Compass, image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=900&q=85" },
  { slug: "beach", titleAr: "مصايف وشواطئ", titleEn: "Beach Getaways", descAr: "استرخاء وشمس وبحر بصحبة مجتمعك.", descEn: "Sun, sea and slow moments with your community.", icon: Palmtree, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85" },
  { slug: "cultural", titleAr: "جولات ثقافية", titleEn: "Cultural Tours", descAr: "اكتشفي الحكايات والأماكن من زاوية جديدة.", descEn: "Discover stories and places from a new perspective.", icon: Landmark, image: "https://images.unsplash.com/photo-1572252821143-035a024857ac?auto=format&fit=crop&w=900&q=85" },
  { slug: "events", titleAr: "إيفنتات خاصة", titleEn: "Special Events", descAr: "لحظات اجتماعية وتجارب مختلفة.", descEn: "Social moments and experiences worth sharing.", icon: Heart, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85" },
  { slug: "workshops", titleAr: "ورش عمل", titleEn: "Workshops", descAr: "تعلمي شيئًا جديدًا مع أشخاص يشبهونك.", descEn: "Learn something new alongside like-minded women.", icon: Palette, image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=85" },
  { slug: "community", titleAr: "مجتمع السيدات", titleEn: "Ladies Community", descAr: "صداقات جديدة ومساحة تشعرين فيها بالانتماء.", descEn: "New friendships and a place to feel you belong.", icon: Users, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85" },
];

export default function CategoriesPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowUpLeft : ArrowUpRight;
  return (
    <main className="min-h-screen bg-brand-ivory">
      <header className="border-b border-brand-peach/40 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6"><Link href={`/${locale}`} className="font-serif text-lg font-bold text-brand-burgundy">LADIES ONLY EVENTS</Link><Link href={isAr ? "/en/categories" : "/ar/categories"} className="rounded-full border border-brand-peach px-3 py-2 text-sm font-bold text-brand-burgundy">{isAr ? "EN" : "عربي"}</Link></div></header>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-rose">{isAr ? "اختاري مزاجك" : "Find your kind of experience"}</p><h1 className="mt-3 max-w-3xl text-3xl font-bold text-gray-900 sm:text-5xl">{isAr ? "تجارب مختلفة، ومجتمع واحد يجمعنا" : "Different experiences, one community"}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">{isAr ? "من يوم على البحر إلى جولة ثقافية أو إيفنت خاص، اختاري ما يناسب وقتك واهتماماتك." : "From a beach day to a cultural tour or special gathering, find what fits your time and interests."}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{CATEGORIES.map((item) => { const Icon = item.icon; return <Link key={item.slug} href={`/${locale}/experiences`} className="group relative min-h-[310px] overflow-hidden rounded-3xl bg-gray-900 shadow-card"><img src={item.image} alt={isAr ? item.titleAr : item.titleEn} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" /><div className="absolute inset-x-0 bottom-0 p-6 text-white"><span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"><Icon className="h-5 w-5" /></span><h2 className="text-xl font-bold">{isAr ? item.titleAr : item.titleEn}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-white/80">{isAr ? item.descAr : item.descEn}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-peach">{isAr ? "اكتشفي التجارب" : "Explore experiences"} <Arrow className="h-4 w-4" /></span></div></Link>; })}</div>
      </section>
    </main>
  );
}
