import type { Metadata } from "next";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: { default: "Ladies Only Events | With Dalia & Rania", template: "%s | Ladies Only Events" },
  description: "Curated women-only trips, events and meaningful connections across Egypt.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-brand-ivory font-sans text-gray-800 antialiased selection:bg-brand-rose selection:text-white">
        {children}
      </body>
    </html>
  );
}
