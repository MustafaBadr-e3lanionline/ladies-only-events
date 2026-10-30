"use client";

import React, { useState } from "react";
import { QrCode, CheckCircle2, XCircle, UserCheck, RefreshCw } from "lucide-react";

export default function TicketScannerPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    bookingNumber: string;
    customerName: string;
    eventTitle: string;
    seats: number;
    phone: string;
  } | null>(null);

  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // محاكاة مسح التذكرة أو إدخال رقمها يدوياً
  const handleVerifyTicket = (codeToVerify: string) => {
    setIsScanning(true);
    setTimeout(() => {
      if (codeToVerify.includes("LOE")) {
        setScanResult({
          success: true,
          bookingNumber: codeToVerify,
          customerName: "Sarah Ahmed",
          eventTitle: "Ain Sokhna Day Trip",
          seats: 1,
          phone: "01012345678",
        });
      } else {
        setScanResult({
          success: false,
          bookingNumber: codeToVerify,
          customerName: "غير معروف",
          eventTitle: "-",
          seats: 0,
          phone: "-",
        });
      }
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen bg-brand-ivory flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-brand-burgundy text-white flex items-center justify-center mx-auto shadow">
            <QrCode className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-serif font-bold text-brand-burgundy">
            {isAr ? "ماسح تذاكر الرحلات" : "Trip Ticket Scanner"}
          </h1>
          <p className="text-xs text-gray-500">
            {isAr ? "داليا ورانيا - مسح رمز QR عند نقطة التجمع" : "Dalia & Rania - Gate Check-in"}
          </p>
        </div>

        {/* Camera Viewfinder Simulation */}
        <div className="relative h-72 rounded-3xl bg-gray-900 overflow-hidden shadow-card border-2 border-brand-peach flex items-center justify-center">
          <div className="absolute inset-4 border-2 border-dashed border-brand-rose/60 rounded-2xl flex items-center justify-center">
            {isScanning ? (
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
            ) : (
              <span className="text-xs text-white/70 text-center px-4">
                {isAr ? "وجهي الكاميرا نحو رمز الـ QR الخاص بالتذكرة" : "Point camera at ticket QR code"}
              </span>
            )}
          </div>
        </div>

        {/* Manual Input Fallback */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="LOE-20241012-0015"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-mono text-xs focus:outline-none focus:border-brand-burgundy bg-white"
          />
          <button
            onClick={() => handleVerifyTicket(manualCode || "LOE-20241012-0015")}
            className="bg-brand-burgundy text-white font-bold px-5 py-3 rounded-xl text-xs"
          >
            {isAr ? "تحقق" : "Verify"}
          </button>
        </div>

        {/* Scan Result Card */}
        {scanResult && (
          <div
            className={`p-5 rounded-2xl border ${
              scanResult.success ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
            } space-y-3`}
          >
            <div className="flex items-center gap-3">
              {scanResult.success ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  {scanResult.success
                    ? isAr
                      ? "تذكرة سارية ومعتمدة ✓"
                      : "Valid & Confirmed Ticket"
                    : isAr
                    ? "تذكرة غير صالحة!"
                    : "Invalid Ticket!"}
                </h3>
                <span className="text-xs font-mono text-gray-500">{scanResult.bookingNumber}</span>
              </div>
            </div>

            {scanResult.success && (
              <div className="text-xs space-y-1.5 pt-2 border-t border-emerald-200/60 text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer:</span>
                  <span className="font-bold">{scanResult.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Event:</span>
                  <span className="font-bold">{scanResult.eventTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seats:</span>
                  <span className="font-bold">{scanResult.seats} Person</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-bold font-mono">{scanResult.phone}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center pt-6 text-[11px] text-gray-400">
        Ladies Only Events © 2026 - Staff Scanner
      </div>
    </div>
  );
}
