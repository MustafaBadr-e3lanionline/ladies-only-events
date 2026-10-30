import Link from "next/link";
import { Heart, Calendar, MapPin, Users, Play, ArrowLeft, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { slug: "day-trips", ar: "رحلات اليوم الواحد", en: "Day Trips", icon: "⛰️", img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80" },
  { slug: "beach", ar: "مصايف وشواطئ", en: "Beach Getaways", icon: "🌴", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
  { slug: "cultural", ar: "جولات ثقافية", en: "Cultural Tours", icon: "🏛️", img: "https://images.unsplash.com/photo-1572252821143-035a024857ac?auto=format&fit=crop&w=600&q=80" },
  { slug: "events", ar: "إيفنتات خاصة", en: "Special Events", icon: "💖", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" },
  { slug: "workshops", ar: "ورش عمل", en: "Workshops", icon: "🎨", img: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=600&q=80" },
  { slug: "community", ar: "مجتمع السيدات", en: "Ladies Community", icon: "👩‍👩‍👧", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" },
];

const UPCOMING_TRIPS = [
  {
    slug: "ain-sokhna-day-trip",
    titleAr: "رحلة العين السخنة",
    titleEn: "Ain Sokhna Day Trip",
    dateAr: "السبت، 14 نوفمبر 2026",
    dateEn: "Sat, 14 Nov 2026",
    price: 750,
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "dahab-getaway",
    titleAr: "دهب",
    titleEn: "Dahab Getaway",
    dateAr: "الأربعاء، 25 نوفمبر 2026",
    dateEn: "Wed, 25 Nov 2026",
    price: 1450,
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "alexandria-tour",
    titleAr: "جولة الإسكندرية",
    titleEn: "Alexandria Tour",
    dateAr: "الأربعاء، 2 ديسمبر 2026",
    dateEn: "Wed, 2 Dec 2026",
    price: 600,
    img: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "fayoum-oasis-trip",
    titleAr: "رحلة الفيوم",
    titleEn: "Fayoum Oasis",
    dateAr: "الثلاثاء، 8 ديسمبر 2026",
    dateEn: "Tue, 8 Dec 2026",
    price: 700,
    img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
  },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-peach/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-burgundy text-white flex items-center justify-center font-serif font-bold text-lg shadow">
              LOE
            </div>
            <div>
              <span className="block font-serif font-bold text-brand-burgundy text-lg tracking-wide">
                LADIES ONLY EVENTS
              </span>
              <span className="block text-xs text-brand-rose font-medium">
                WITH DALIA AND RANIA
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link href={`/${locale}`} className="text-brand-burgundy border-b-2 border-brand-burgundy pb-1">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <Link href={`/${locale}/experiences`} className="hover:text-brand-burgundy transition">
              {isAr ? "الرحلات" : "Experiences"}
            </Link>
            <Link href={`/${locale}/categories`} className="hover:text-brand-burgundy transition">
              {isAr ? "التصنيفات" : "Categories"}
            </Link>
            <Link href={`/${locale}/account`} className="hover:text-brand-burgundy transition">
              {isAr ? "حسابي" : "My Account"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={isAr ? "/en" : "/ar"}
              className="px-3 py-1.5 rounded-full border border-brand-peach text-xs font-bold text-brand-burgundy hover:bg-brand-softPink transition"
            >
              {isAr ? "EN" : "عربي"}
            </Link>
            <Link
              href={`/${locale}/experiences`}
              className="bg-brand-burgundy hover:bg-brand-burgundyDark text-white px-5 py-2.5 rounded-full text-sm font-bold shadow transition"
            >
              {isAr ? "احجزي الآن" : "Book Now"}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[540px] flex items-center justify-center text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=85"
          alt="Ladies Community"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/25" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
            {isAr ? "أكثر من رحلات.. مجتمع نسائي مميز" : "More Than Trips — A Community of Amazing Women"}
          </h1>
          <p className="text-lg sm:text-xl text-brand-ivory/90 font-medium">
            {isAr
              ? "اكتشفي • استمتعي • كوني صداقات جديدة • عيشي الحرية"
              : "Explore • Discover • Make New Friends • Feel Free"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`/${locale}/experiences`}
              className="bg-brand-rose hover:bg-brand-burgundy text-white px-7 py-3.5 rounded-full font-bold flex items-center gap-2 shadow-lg transition"
            >
              <span>{isAr ? "استكشفي الرحلات القادمة" : "Explore Upcoming Events"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur border border-white/50 text-white px-6 py-3.5 rounded-full font-semibold flex items-center gap-2 transition">
              <Play className="w-4 h-4 fill-current" />
              <span>{isAr ? "شاهدي قصتنا" : "Watch Our Story"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Category Icons Bar */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-white p-4 rounded-2xl shadow-card border border-brand-peach/30">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/categories?type=${cat.slug}`}
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-brand-softPink transition text-center group"
            >
              <span className="text-2xl mb-1.5 group-hover:scale-110 transition">{cat.icon}</span>
              <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-burgundy">
                {isAr ? cat.ar : cat.en}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-burgundy">
              {isAr ? "الرحلات القادمة" : "Upcoming Events"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isAr ? "احجزي مقعدك في أقرب رحلة مع داليا ورانيا" : "Reserve your seat in our next adventure"}
            </p>
          </div>
          <Link
            href={`/${locale}/experiences`}
            className="text-sm font-bold text-brand-burgundy hover:text-brand-rose flex items-center gap-1"
          >
            <span>{isAr ? "عرض الكل" : "View All"}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UPCOMING_TRIPS.map((trip) => (
            <div
              key={trip.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-card border border-brand-peach/20 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trip.img}
                  alt={isAr ? trip.titleAr : trip.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <button className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-brand-burgundy hover:bg-brand-rose hover:text-white transition">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {isAr ? trip.titleAr : trip.titleEn}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-rose" />
                    <span>{isAr ? trip.dateAr : trip.dateEn}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">{isAr ? "للفرد" : "Per Person"}</span>
                    <span className="text-lg font-extrabold text-brand-burgundy">
                      EGP {trip.price.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/checkout?trip=${trip.slug}`}
                    className="bg-brand-burgundy hover:bg-brand-rose text-white text-xs font-bold px-4 py-2.5 rounded-full transition"
                  >
                    {isAr ? "احجزي الآن" : "Book Now"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
