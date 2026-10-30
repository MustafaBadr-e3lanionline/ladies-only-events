import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ladies Only Events | With Dalia & Rania", template: "%s | Ladies Only Events" },
  description: "Curated women-only trips, events and meaningful connections across Egypt.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-brand-ivory font-sans text-gray-800 antialiased selection:bg-brand-rose selection:text-white">
        {children}
      </body>
    </html>
  );
}
