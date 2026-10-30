"use client";

import React, { useState } from "react";
import {
  Wallet,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  Check,
  X,
  TrendingUp,
  SlidersHorizontal,
  LayoutGrid,
} from "lucide-react";

interface BookingRow {
  id: string;
  customer: string;
  phone: string;
  event: string;
  date: string;
  amount: number;
  method: "InstaPay" | "Vodafone Cash";
  reference: string;
  receiptUrl: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const INITIAL_BOOKINGS: BookingRow[] = [
  {
    id: "LOE-20241012-0015",
    customer: "Sarah Ahmed",
    phone: "01012345678",
    event: "Ain Sokhna",
    date: "12 Oct 2024",
    amount: 765,
    method: "InstaPay",
    reference: "IPA-9988123",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    status: "Confirmed",
  },
  {
    id: "LOE-20241010-0014",
    customer: "Mona Ali",
    phone: "01098765432",
    event: "Dahab Getaway",
    date: "25 Oct 2024",
    amount: 1450,
    method: "Vodafone Cash",
    reference: "VF-01098765432",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    status: "Pending",
  },
  {
    id: "LOE-20241009-0013",
    customer: "Hadeer Mohamed",
    phone: "01122334455",
    event: "Alexandria Tour",
    date: "2 Nov 2024",
    amount: 600,
    method: "InstaPay",
    reference: "IPA-7744112",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    status: "Confirmed",
  },
];

const CRM_CUSTOMERS = [
  {
    name: "Sarah Ahmed",
    bookings: 5,
    spent: 4250,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Mona Ali",
    bookings: 3,
    spent: 3100,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Hadeer Mohamed",
    bookings: 2,
    spent: 1800,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Nadine Samir",
    bookings: 2,
    spent: 1500,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
];

const MARKETING_CHANNELS = [
  { name: "Facebook", pct: 42 },
  { name: "Instagram", pct: 28 },
  { name: "Direct", pct: 18 },
  { name: "Google", pct: 8 },
  { name: "WhatsApp", pct: 4 },
];

export default function AdminDashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const [bookings, setBookings] = useState<BookingRow[]>(INITIAL_BOOKINGS);
  const [crmSearch, setCrmSearch] = useState("");
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<BookingRow | null>(null);
  const [isApproving, setIsApproving] = useState(false);

  // اعتماد إيصال الدفع اليدوي وإرسال التذكرة على الواتساب تلقائياً
  const handleApproveBooking = async (booking: BookingRow) => {
    setIsApproving(true);
    try {
      await fetch("/api/admin/bookings/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingNumber: booking.id,
          phone: booking.phone,
          customerName: booking.customer,
          eventTitle: booking.event,
          eventDate: booking.date,
          amount: booking.amount,
          action: "approve",
        }),
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: "Confirmed" } : b))
      );
      setSelectedReceiptBooking(null);
    } finally {
      setIsApproving(false);
    }
  };

  const filteredCustomers = CRM_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(crmSearch.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            {isAr ? "لوحة القيادة - Dashboard" : "Dashboard"}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {isAr
              ? "متابعة الإيرادات، تأكيد التحويلات اليدوية، ومؤشرات التسويق والعميلات"
              : "Financial KPIs, manual payment verification, CRM & marketing insights"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">
            Oct 1, 2024 - Oct 31, 2024 ▾
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-brand-burgundy">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-brand-burgundy">
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (KPIs + Charts + Bookings) & Right 4 Cols (Marketing + CRM) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* القسم الأيسر (8 أعمدة) */}
        <div className="xl:col-span-8 space-y-6">
          {/* 1. بطاقات المؤشرات الرباعية (4 KPI Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Revenue */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
              <div>
                <span className="text-xs text-gray-500 font-medium">Total Revenue</span>
                <div className="text-xl font-extrabold text-brand-burgundy mt-1">
                  EGP 132,450
                </div>
                <span className="inline-block text-[11px] font-bold text-emerald-600 mt-1">
                  ▲ +12%
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-brand-softPink text-brand-burgundy flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>

            {/* Total Bookings */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
              <div>
                <span className="text-xs text-gray-500 font-medium">Total Bookings</span>
                <div className="text-xl font-extrabold text-gray-900 mt-1">186</div>
                <span className="inline-block text-[11px] font-bold text-emerald-600 mt-1">
                  ▲ +18%
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CalendarCheck2 className="w-4 h-4" />
              </div>
            </div>

            {/* Confirmed */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
              <div>
                <span className="text-xs text-gray-500 font-medium">Confirmed</span>
                <div className="text-xl font-extrabold text-gray-900 mt-1">142</div>
                <span className="inline-block text-[11px] font-bold text-emerald-600 mt-1">
                  ▲ 76%
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
              <div>
                <span className="text-xs text-gray-500 font-medium">Pending Payments</span>
                <div className="text-xl font-extrabold text-gray-900 mt-1">28</div>
                <span className="inline-block text-[11px] font-bold text-rose-500 mt-1">
                  15%
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-brand-rose flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. الرسوم البيانية: Revenue Overview + Bookings by Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* منحنى الإيرادات (Revenue Overview) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-900">Revenue Overview</h3>
                <span className="text-xs text-gray-400">Monthly EGP</span>
              </div>

              <div className="relative h-48 pt-6">
                {/* Tooltip Floating Box matching design */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-md rounded-xl px-3 py-1.5 text-center z-10">
                  <span className="block text-xs font-extrabold text-gray-900">EGP 32,450</span>
                  <span className="block text-[10px] text-gray-500">15 Oct</span>
                </div>

                <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 120 L 65 110 L 120 112 L 175 95 L 230 100 L 285 60 L 340 85 L 395 75 L 450 55 L 490 40 L 490 140 L 10 140 Z"
                    fill="url(#revGrad)"
                  />
                  <path
                    d="M 10 120 L 65 110 L 120 112 L 175 95 L 230 100 L 285 60 L 340 85 L 395 75 L 450 55 L 490 40"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                  {[
                    [10, 120],
                    [65, 110],
                    [120, 112],
                    [175, 95],
                    [230, 100],
                    [285, 60],
                    [340, 85],
                    [395, 75],
                    [450, 55],
                    [490, 40],
                  ].map(([cx, cy], idx) => (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cy}
                      r={idx === 5 ? 5 : 3.5}
                      fill={idx === 5 ? "#1D4ED8" : "#fff"}
                      stroke="#2563EB"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>
            </div>

            {/* الدائرة المجوفة (Bookings by Status Donut) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <h3 className="font-bold text-sm text-gray-900">Bookings by Status</h3>

              <div className="flex items-center justify-between gap-4 my-auto py-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#F3F4F6" strokeWidth="4.5" />
                    {/* Confirmed 76% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="4.5"
                      strokeDasharray="67 100"
                    />
                    {/* Pending 15% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="4.5"
                      strokeDasharray="15 100"
                      strokeDashoffset="-67"
                    />
                    {/* Cancelled 9% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#F43F5E"
                      strokeWidth="4.5"
                      strokeDasharray="10 100"
                      strokeDashoffset="-82"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="block text-xl font-extrabold text-gray-900">186</span>
                    <span className="block text-[10px] text-gray-400">Total</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      Confirmed
                    </span>
                    <span className="font-bold text-gray-900">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      Pending
                    </span>
                    <span className="font-bold text-gray-900">28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      Cancelled
                    </span>
                    <span className="font-bold text-gray-900">16</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. جدول الحجوزات الأخيرة وتأكيد التحويلات اليدوية (Recent Bookings) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-gray-900">Recent Bookings</h3>
                <p className="text-xs text-gray-400">
                  {isAr
                    ? "اضغطي على الحجز المعلق لمراجعة إيصال InstaPay / فودافون كاش وتأكيده"
                    : "Click on Pending bookings to verify manual transfer receipt"}
                </p>
              </div>
              <button className="text-xs font-bold text-brand-burgundy hover:underline">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-3 text-start">Booking #</th>
                    <th className="pb-3 text-start">Customer</th>
                    <th className="pb-3 text-start">Event</th>
                    <th className="pb-3 text-start">Date</th>
                    <th className="pb-3 text-start">Amount</th>
                    <th className="pb-3 text-start">Status</th>
                    <th className="pb-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 font-mono font-bold text-gray-800">{row.id}</td>
                      <td className="py-3.5 font-bold text-gray-900">{row.customer}</td>
                      <td className="py-3.5 text-gray-600">{row.event}</td>
                      <td className="py-3.5 text-gray-500">{row.date}</td>
                      <td className="py-3.5 font-extrabold text-gray-900">
                        EGP {row.amount.toLocaleString()}
                      </td>
                      <td className="py-3.5">
                        {row.status === "Confirmed" ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                            ● Confirmed
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[11px]">
                            ● Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-end">
                        <button
                          onClick={() => setSelectedReceiptBooking(row)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-softPink text-brand-burgundy font-bold hover:bg-brand-burgundy hover:text-white transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{row.status === "Pending" ? (isAr ? "مراجعة الإيصال" : "Verify") : "View"}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* القسم الأيمن (4 أعمدة): Marketing & Analytics + Customers CRM */}
        <div className="xl:col-span-4 space-y-6">
          {/* 1. تحليلات التسويق والقنوات (Marketing & Analytics) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">Marketing & Analytics</h3>
              <span className="text-[11px] text-gray-400">Oct 2024</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-400 block">Website Visitors</span>
                <span className="text-base font-extrabold text-gray-900">12,450</span>
                <span className="text-[10px] font-bold text-emerald-600 block">+18%</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-400 block">Conversion Rate</span>
                <span className="text-base font-extrabold text-gray-900">6.8%</span>
                <span className="text-[10px] font-bold text-emerald-600 block">+2.1%</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-400 block">Top Source</span>
                <span className="text-sm font-extrabold text-blue-600">Facebook</span>
                <span className="text-[10px] font-bold text-gray-500 block">42%</span>
              </div>
            </div>

            {/* Bookings by Source Bar Chart */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-3">Bookings by Source</h4>
              <div className="grid grid-cols-5 gap-3 items-end h-36 pt-4 px-2 border-b border-gray-100">
                {MARKETING_CHANNELS.map((ch) => (
                  <div key={ch.name} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-bold text-gray-600">{ch.pct}%</span>
                    <div
                      style={{ height: `${ch.pct * 2}px` }}
                      className="w-full max-w-[34px] rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-[10px] text-gray-500 font-medium mt-2">
                {MARKETING_CHANNELS.map((ch) => (
                  <span key={ch.name} className="truncate">
                    {ch.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. إدارة العميلات المصغرة (Customers CRM) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">Customers (CRM)</h3>
              <button className="text-xs font-bold text-brand-burgundy hover:underline">
                View All
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute top-3 start-3.5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={crmSearch}
                onChange={(e) => setCrmSearch(e.target.value)}
                className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-brand-burgundy"
              />
            </div>

            <div className="divide-y divide-gray-50">
              {filteredCustomers.map((cust) => (
                <div key={cust.name} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="block text-xs font-bold text-gray-900">{cust.name}</span>
                      <span className="block text-[11px] text-gray-400">
                        {cust.bookings} bookings
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="text-xs font-extrabold text-brand-burgundy">
                      EGP {cust.spent.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* نافذة فحص وتأكيد إيصال الدفع اليدوي (InstaPay / Vodafone Cash Modal) */}
      {selectedReceiptBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-brand-burgundy">
                  {isAr ? "مراجعة إيصال التحويل اليدوي" : "Verify Payment Receipt"}
                </h3>
                <span className="text-xs font-mono text-gray-500">{selectedReceiptBooking.id}</span>
              </div>
              <button
                onClick={() => setSelectedReceiptBooking(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-brand-softPink/50 p-3.5 rounded-2xl">
              <div>
                <span className="text-gray-400 block">Customer</span>
                <span className="font-bold text-gray-900">{selectedReceiptBooking.customer}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Method & Ref</span>
                <span className="font-bold text-brand-burgundy">
                  {selectedReceiptBooking.method} ({selectedReceiptBooking.reference})
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Trip</span>
                <span className="font-bold text-gray-900">{selectedReceiptBooking.event}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Amount</span>
                <span className="font-extrabold text-emerald-700">
                  EGP {selectedReceiptBooking.amount}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 h-52 bg-gray-100">
              <img
                src={selectedReceiptBooking.receiptUrl}
                alt="Transfer Receipt"
                className="w-full h-full object-cover"
              />
            </div>

            {selectedReceiptBooking.status === "Pending" ? (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedReceiptBooking(null)}
                  className="w-1/3 py-3 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs"
                >
                  {isAr ? "رفض" : "Reject"}
                </button>
                <button
                  onClick={() => handleApproveBooking(selectedReceiptBooking)}
                  disabled={isApproving}
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isApproving
                      ? isAr
                        ? "جاري التأكيد وإرسال الواتساب..."
                        : "Approving..."
                      : isAr
                      ? "تأكيد التحويل وإرسال التذكرة واتساب"
                      : "Approve & Send WhatsApp Ticket"}
                  </span>
                </button>
              </div>
            ) : (
              <div className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                ✓ {isAr ? "تم تأكيد هذا الحجز وإرسال التذكرة مسبقاً" : "Booking already confirmed"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
