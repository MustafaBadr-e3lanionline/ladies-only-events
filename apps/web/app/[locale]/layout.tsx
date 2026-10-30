import { Playfair_Display, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Ladies Only Events | With Dalia and Rania",
  description: "أكثر من رحلات.. مجتمع نسائي مميز للرحلات والفعاليات",
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!["ar", "en"].includes(locale)) notFound();
  const isRtl = locale === "ar";

  return (
    <div
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${playfair.variable} ${cairo.variable} bg-brand-ivory text-gray-800 font-sans antialiased selection:bg-brand-rose selection:text-white`}
    >
      {children}
    </div>
  );
}
