"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  Bus,
  Users,
  Heart,
  Share2,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const TRIP_DATA = {
  slug: "ain-sokhna-day-trip",
  titleEn: "Ain Sokhna Day Trip",
  titleAr: "رحلة العين السخنة - يوم ممتع على البحر",
  price: 750,
  rating: 4.9,
  reviewsCount: 128,
  tagsEn: ["Day Trip", "Beach", "Relaxation"],
  tagsAr: ["رحلة يوم واحد", "شاطئ", "استجمام"],
  dateEn: "Sat, 14 Nov 2026",
  dateAr: "السبت، 14 نوفمبر 2026",
  timeEn: "06:00 AM - 08:00 PM",
  timeAr: "06:00 صباحاً - 08:00 مساءً",
  meetingPointEn: "New Cairo (Meeting Point)",
  meetingPointAr: "القاهرة الجديدة (نقطة التجمع)",
  includesSummaryEn: "Transportation, Beach Access, Lunch",
  includesSummaryAr: "الانتقالات، دخول الشاطئ، وجبة الغداء",
  availableSeats: 12,
  totalSeats: 40,
  leaders: "Dalia & Rania",
  gallery: [
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  ],
  itinerary: [
    { time: "06:00 AM", ar: "التجمع والتحرك من القاهرة الجديدة بباصات سياحية مكيفة", en: "Gathering & Departure from New Cairo" },
    { time: "08:00 AM", ar: "الوصول للمنتجع واستلام الشاليهات Day-Use ونزول البحر وحمام السباحة", en: "Resort Arrival, Beach & Pool Access" },
    { time: "01:30 PM", ar: "تناول وجبة الغداء الجماعية وأنشطة ترفيهية وتصوير", en: "Group Lunch & Photography Session" },
    { time: "05:30 PM", ar: "فقرة الغروب على الشاطئ ومشروبات ساخنة", en: "Sunset Vibes & Hot Drinks by the Beach" },
    { time: "08:00 PM", ar: "العودة للقاهرة بنفس نقطة التجمع", en: "Return to Cairo Meeting Point" },
  ],
};

export default function ExperienceDetailsPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (slug !== TRIP_DATA.slug) notFound();
  const isAr = locale === "ar";
  const [activeImage, setActiveImage] = useState(TRIP_DATA.gallery[0]);
  const [seats, setSeats] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "included" | "photos" | "reviews" | "faq">("overview");
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-brand-ivory pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <Link href={`/${locale}`} className="hover:text-brand-burgundy">
          {isAr ? "الرئيسية" : "Home"}
        </Link>
        <span>›</span>
        <Link href={`/${locale}/categories`} className="hover:text-brand-burgundy">
          {isAr ? "رحلات اليوم الواحد" : "Day Trips"}
        </Link>
        <span>›</span>
        <span className="text-brand-burgundy font-bold">
          {isAr ? TRIP_DATA.titleAr : TRIP_DATA.titleEn}
        </span>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Left / Right Column: Gallery & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Titles */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              {TRIP_DATA.titleEn}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-brand-burgundy mt-1">
              {TRIP_DATA.titleAr}
            </p>

            {/* Rating & Tags */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{TRIP_DATA.rating}</span>
                <span className="text-gray-400 font-normal text-xs">
                  ({TRIP_DATA.reviewsCount} {isAr ? "تقييم" : "reviews"})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(isAr ? TRIP_DATA.tagsAr : TRIP_DATA.tagsEn).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-brand-softPink text-brand-burgundy text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-[360px] sm:h-[440px] rounded-3xl overflow-hidden shadow-card">
              <img
                src={activeImage}
                alt={TRIP_DATA.titleEn}
                className="w-full h-full object-cover transition duration-500"
              />
              {/* Thumbnails Overlay inside Image (as per UI mockup) */}
              <div className="absolute bottom-4 inset-x-4 flex items-center gap-2.5 overflow-x-auto bg-black/35 backdrop-blur-md p-2.5 rounded-2xl">
                {TRIP_DATA.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activeImage === img ? "border-white scale-105" : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-brand-peach/40 flex items-center gap-6 overflow-x-auto text-sm font-bold">
            {[
              { id: "overview", ar: "نظرة عامة", en: "Overview" },
              { id: "itinerary", ar: "برنامج الرحلة", en: "Itinerary" },
              { id: "included", ar: "ما تشمله الرحلة", en: "What's Included" },
              { id: "photos", ar: "الصور", en: "Photos" },
              { id: "reviews", ar: "التقييمات", en: "Reviews" },
              { id: "faq", ar: "الأسئلة الشائعة", en: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-brand-burgundy text-brand-burgundy"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {isAr ? tab.ar : tab.en}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-brand-peach/20">
            {activeTab === "overview" && (
              <div className="space-y-4 leading-relaxed text-gray-700">
                <h3 className="text-lg font-bold text-brand-burgundy">
                  {isAr ? "تفاصيل التجربة مع داليا ورانيا" : "Experience Overview"}
                </h3>
                <p>
                  {isAr
                    ? "استمتعي بيوم كامل من الخصوصية والبهجة على أجمل شواطئ العين السخنة برفقة مجتمع نسائي راقٍ. الرحلة مصممة لتفصلي عن ضغوط الأسبوع، وتكوني صداقات جديدة في أجواء آمنة ومبهجة تحت إشراف داليا ورانيا."
                    : "Enjoy a full day of privacy, relaxation, and fun on the finest beaches of Ain Sokhna with an amazing community of women."}
                </p>
              </div>
            )}

            {activeTab === "itinerary" && (
              <div className="space-y-4">
                {TRIP_DATA.itinerary.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl bg-brand-softPink/40">
                    <span className="px-3 py-1 rounded-lg bg-brand-burgundy text-white text-xs font-bold shrink-0">
                      {item.time}
                    </span>
                    <p className="text-sm font-medium text-gray-800">{isAr ? item.ar : item.en}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "included" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  isAr ? "الانتقالات بباصات حديثة مكيفة ذهاب وعودة" : "Round-trip A/C Bus Transportation",
                  isAr ? "دخول الشاطئ وحمام السباحة الخاص" : "Beach & Pool Access",
                  isAr ? "وجبة غداء متكاملة في المنتجع" : "Full Lunch Meal at the Resort",
                  isAr ? "تصوير فوتوغرافي احترافي طوال اليوم" : "Professional Photography All Day",
                  isAr ? "إشراف كامل من فريق داليا ورانيا" : "Full Supervision by Dalia & Rania",
                ].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Booking Card (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-card border border-brand-peach/40 space-y-6">
            <div>
              <div className="text-3xl font-extrabold text-brand-burgundy">
                EGP {TRIP_DATA.price}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {isAr ? "للفرد الواحد" : "Per Person"}
              </span>
            </div>

            <div className="space-y-3.5 text-sm text-gray-700 border-t border-b border-gray-100 py-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-brand-rose shrink-0" />
                <span>{isAr ? TRIP_DATA.dateAr : TRIP_DATA.dateEn}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-rose shrink-0" />
                <span>{isAr ? TRIP_DATA.timeAr : TRIP_DATA.timeEn}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-rose shrink-0" />
                <span>{isAr ? TRIP_DATA.meetingPointAr : TRIP_DATA.meetingPointEn}</span>
              </div>
              <div className="flex items-center gap-3">
                <Bus className="w-4 h-4 text-brand-rose shrink-0" />
                <span>{isAr ? TRIP_DATA.includesSummaryAr : TRIP_DATA.includesSummaryEn}</span>
              </div>
              <div className="flex items-center gap-3 font-bold text-brand-burgundy">
                <Users className="w-4 h-4 text-brand-rose shrink-0" />
                <span>
                  {isAr
                    ? `المقاعد المتاحة: ${TRIP_DATA.availableSeats} / ${TRIP_DATA.totalSeats}`
                    : `Available Seats: ${TRIP_DATA.availableSeats} / ${TRIP_DATA.totalSeats}`}
                </span>
              </div>
            </div>

            {/* Seat Counter + Wishlist */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="w-8 h-8 rounded-lg bg-brand-softPink text-brand-burgundy font-bold text-lg"
                >
                  -
                </button>
                <span className="font-bold text-lg">{seats}</span>
                <button
                  type="button"
                  onClick={() => setSeats(Math.min(TRIP_DATA.availableSeats, seats + 1))}
                  className="w-8 h-8 rounded-lg bg-brand-softPink text-brand-burgundy font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button className="w-12 h-12 rounded-2xl border border-brand-peach/60 flex items-center justify-center text-brand-burgundy hover:bg-brand-softPink transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <Link
              href={`/${locale}/checkout?trip=${TRIP_DATA.slug}&seats=${seats}`}
              className="w-full bg-brand-burgundy hover:bg-brand-burgundyDark text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>{isAr ? "احجزي الآن" : "Book Now"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
