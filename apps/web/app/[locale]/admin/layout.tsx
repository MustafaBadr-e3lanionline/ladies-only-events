"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  Users,
  CreditCard,
  Receipt,
  Megaphone,
  Star,
  UserCheck,
  BarChart3,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", labelEn: "Dashboard", labelAr: "لوحة القيادة", icon: LayoutDashboard },
  { href: "/admin/experiences", labelEn: "Events", labelAr: "الرحلات والفعاليات", icon: Compass },
  { href: "/admin/bookings", labelEn: "Bookings", labelAr: "الحجوزات", icon: CalendarCheck },
  { href: "/admin/customers", labelEn: "Customers", labelAr: "العميلات (CRM)", icon: Users },
  { href: "/admin/finance", labelEn: "Payments", labelAr: "المدفوعات والإيصالات", icon: CreditCard },
  { href: "/admin/finance?tab=expenses", labelEn: "Expenses", labelAr: "المصروفات", icon: Receipt },
  { href: "/admin/marketing", labelEn: "Marketing", labelAr: "التسويق والقنوات", icon: Megaphone },
  { href: "/admin/reports?tab=reviews", labelEn: "Reviews", labelAr: "التقييمات", icon: Star },
  { href: "/admin/team", labelEn: "Team", labelAr: "الفريق والمشرفات", icon: UserCheck },
  { href: "/admin/reports", labelEn: "Reports", labelAr: "التقارير المالية", icon: BarChart3 },
  { href: "/admin/settings", labelEn: "Settings", labelAr: "الإعدادات", icon: Settings },
];

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const pathname = usePathname();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-[#F6F4F8] flex">
      {/* القائمة الجانبية الداكنة (Admin Sidebar) */}
      <aside className="w-64 bg-brand-adminDark text-white flex flex-col shrink-0 shadow-2xl">
        {/* شعار المنصة */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-11 h-11 rounded-full bg-brand-rose text-white flex items-center justify-center font-serif font-bold text-base shadow">
            LOE
          </div>
          <div>
            <span className="block font-serif font-bold text-sm tracking-wide text-white">
              LADIES ONLY EVENTS
            </span>
            <span className="block text-[11px] text-brand-peach/80">
              Admin Panel
            </span>
          </div>
        </div>

        {/* روابط الإدارة */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${locale}${item.href}`;
            const isActive = pathname.includes(item.href.split("?")[0]);

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-gradient-to-r from-brand-burgundy to-brand-rose text-white shadow-md"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{isAr ? item.labelAr : item.labelEn}</span>
              </Link>
            );
          })}
        </nav>

        {/* معلومات المشرفة الحالية */}
        <div className="p-4 border-t border-white/10 text-xs flex items-center justify-between text-gray-400">
          <span>Dalia & Rania</span>
          <span className="px-2 py-0.5 rounded bg-brand-rose/20 text-brand-peach text-[10px]">
            Super Admin
          </span>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
}
