import { notFound } from "next/navigation";

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
    <div lang={locale} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-brand-ivory text-gray-800 font-sans antialiased selection:bg-brand-rose selection:text-white">
      {children}
    </div>
  );
}
