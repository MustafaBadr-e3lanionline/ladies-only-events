import Link from "next/link";
import {
  CalendarDays, ClipboardList, Users, Wallet, Megaphone, BarChart3, UserRoundCog, Settings, ArrowLeft, ArrowRight, Database
} from "lucide-react";

const MODULES: Record<string, { en: string; ar: string; descEn: string; descAr: string; tasksEn: string[]; tasksAr: string[] }> = {
  experiences: { en: "Experiences", ar: "الرحلات والفعاليات", descEn: "Create and maintain event listings, schedules, prices and capacity.", descAr: "إنشاء الرحلات وإدارة المواعيد والأسعار والسعة.", tasksEn: ["Connect experience editor to Supabase", "Manage event sessions and seat inventory", "Publish Arabic and English content"], tasksAr: ["ربط محرر الرحلات بقاعدة البيانات", "إدارة المواعيد والمقاعد المتاحة", "نشر المحتوى بالعربية والإنجليزية"] },
  bookings: { en: "Bookings", ar: "الحجوزات", descEn: "Review booking requests, receipts and attendance status.", descAr: "مراجعة طلبات الحجز وإثباتات الدفع والحضور.", tasksEn: ["Load bookings from the database", "Review transfer proofs with staff authorization", "Add cancellation and refund workflows"], tasksAr: ["تحميل الحجوزات من قاعدة البيانات", "مراجعة التحويلات بصلاحيات موظفين", "إضافة تدفقات الإلغاء والاسترداد"] },
  customers: { en: "Customer CRM", ar: "إدارة العميلات", descEn: "Manage customer profiles, booking history and consent preferences.", descAr: "إدارة ملفات العميلات وسجل الحجوزات وموافقات التواصل.", tasksEn: ["Connect customer profiles securely", "Add customer segments and activity history", "Respect communication consent and privacy requests"], tasksAr: ["ربط ملفات العميلات بأمان", "إضافة الشرائح وسجل النشاط", "احترام موافقات التواصل وطلبات الخصوصية"] },
  finance: { en: "Finance", ar: "المالية والمدفوعات", descEn: "Reconcile collected payments, transfer proofs, refunds and trip expenses.", descAr: "مطابقة التحصيلات والتحويلات والاستردادات ومصروفات الرحلات.", tasksEn: ["Connect the payment ledger", "Add approval roles and audit trails", "Reconcile gateway and bank statements"], tasksAr: ["ربط دفتر الحركات المالية", "إضافة صلاحيات الاعتماد وسجل التدقيق", "مطابقة تقارير بوابة الدفع والبنك"] },
  marketing: { en: "Marketing", ar: "التسويق والقنوات", descEn: "Measure campaign performance, booking sources and offer usage.", descAr: "قياس أداء الحملات ومصادر الحجوزات واستخدام العروض.", tasksEn: ["Connect campaign attribution", "Track conversion and acquisition cost", "Manage coupon rules and consent-based messages"], tasksAr: ["ربط مصادر الحجوزات بالحملات", "قياس التحويل وتكلفة اكتساب العميلة", "إدارة الكوبونات والرسائل بموافقة العميلة"] },
  reports: { en: "Reports & Analytics", ar: "التقارير والتحليلات", descEn: "Review booking, occupancy, revenue and operating margin reports.", descAr: "مراجعة تقارير الحجوزات والإشغال والإيرادات والنتيجة التشغيلية.", tasksEn: ["Define trusted financial metrics", "Add date and event filters", "Export reconciled reports"], tasksAr: ["تعريف مؤشرات مالية موحدة", "إضافة فلاتر التاريخ والرحلة", "تصدير تقارير تمت مطابقتها"] },
  team: { en: "Team", ar: "الفريق والصلاحيات", descEn: "Manage staff access, task ownership and operational responsibilities.", descAr: "إدارة صلاحيات الفريق والمسؤوليات والمهام التشغيلية.", tasksEn: ["Connect staff roles to Supabase Auth", "Apply least-privilege permissions", "Track sensitive actions in audit logs"], tasksAr: ["ربط أدوار الفريق بمصادقة Supabase", "تطبيق أقل قدر من الصلاحيات", "تسجيل الإجراءات الحساسة"] },
  settings: { en: "Settings", ar: "إعدادات المنصة", descEn: "Configure policies, locales, notification providers and business rules.", descAr: "إعداد السياسات واللغات ومزودي الإشعارات وقواعد التشغيل.", tasksEn: ["Store settings securely", "Version cancellation and refund policies", "Verify provider configuration before enabling actions"], tasksAr: ["حفظ الإعدادات بأمان", "تأريخ نسخ سياسات الإلغاء والاسترداد", "التحقق من تكاملات الخدمات قبل تفعيلها"] },
};

const ICONS: Record<string, typeof CalendarDays> = {
  experiences: CalendarDays, bookings: ClipboardList, customers: Users, finance: Wallet,
  marketing: Megaphone, reports: BarChart3, team: UserRoundCog, settings: Settings,
};

export default async function AdminModulePage({
  params, searchParams,
}: {
  params: Promise<{ locale: string; section: string }>;
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { locale, section } = await params;
  const query = searchParams ? await searchParams : {};
  const isAr = locale === "ar";
  const key = section === "finance" && query.tab === "expenses" ? "finance" : section;
  const module = MODULES[key];
  if (!module) return <main className="p-8"><h1 className="text-2xl font-bold">Module not found</h1><Link href={`/${locale}/admin/dashboard`}>Return to dashboard</Link></main>;
  const Icon = ICONS[key];
  const tasks = isAr ? module.tasksAr : module.tasksEn;
  const title = isAr ? module.ar : module.en;
  const Arrow = isAr ? ArrowRight : ArrowLeft;

  return <main className="min-h-screen bg-[#F6F4F8] p-4 sm:p-8">
    <div className="mx-auto max-w-6xl">
      <Link href={`/${locale}/admin/dashboard`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-burgundy"><Arrow size={16}/>{isAr ? "العودة إلى لوحة المؤشرات" : "Back to dashboard"}</Link>
      <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-rose">Ladies Only Events · Admin</p><h1 className="mt-2 text-3xl font-bold text-brand-burgundy sm:text-4xl">{query.tab === "expenses" ? (isAr ? "المصروفات" : "Expenses") : title}</h1><p className="mt-3 max-w-2xl leading-7 text-gray-600">{isAr ? module.descAr : module.descEn}</p></div>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800"><Database size={15}/>{isAr ? "بانتظار ربط البيانات" : "Data integration pending"}</span>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { title: isAr ? "مصدر البيانات" : "Data source", value: isAr ? "غير متصل" : "Not connected" },
          { title: isAr ? "حالة الوحدة" : "Module status", value: isAr ? "واجهة أولية" : "UI scaffold" },
          { title: isAr ? "البيانات المعروضة" : "Displayed data", value: isAr ? "لا توجد بيانات فعلية" : "No live data" },
        ].map((item) => <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-xs text-gray-500">{item.title}</p><p className="mt-2 text-lg font-bold text-gray-800">{item.value}</p></div>)}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-softPink text-brand-burgundy"><Icon size={23}/></span><div><h2 className="text-xl font-bold text-gray-900">{isAr ? "مساحة العمل" : "Workspace"}</h2><p className="mt-1 text-sm text-gray-500">{isAr ? "الواجهة جاهزة للربط التشغيلي" : "UI ready for operational integration"}</p></div></div>
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center"><Database className="mx-auto h-8 w-8 text-gray-400"/><h3 className="mt-3 font-bold text-gray-800">{isAr ? "لم يتم تحميل سجلات فعلية" : "No live records loaded"}</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">{isAr ? "لن نعرض بيانات نموذجية على أنها بيانات حقيقية. بعد ربط قاعدة البيانات وتفعيل الصلاحيات، ستظهر السجلات هنا." : "Sample data is not presented as real business data. Live records will appear here after the database and authorization layers are connected."}</p></div>
        </section>
        <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-gray-900">{isAr ? "متطلبات الإكمال" : "Implementation checklist"}</h2><ul className="mt-5 space-y-4">{tasks.map((task) => <li key={task} className="flex gap-3 text-sm leading-6 text-gray-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-rose"/><span>{task}</span></li>)}</ul></aside>
      </div>
    </div>
  </main>;
}
