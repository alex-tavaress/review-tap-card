"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, Cpu, Zap, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { content, Locale } from "@/lib/content";

export default function SuccessPage() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Fire celebratory confetti on page load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#10b981", "#f59e0b", "#3b82f6"],
    });

    const savedLocale = localStorage.getItem("tapfive_locale") as Locale | null;
    if (savedLocale === "pt" || savedLocale === "en") {
      setLocale(savedLocale);
      return;
    }

    const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || "").toLowerCase();
    if (browserLang.startsWith("pt")) {
      setLocale("pt");
    }
  }, []);

  const t = content[locale];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 bg-light-grid flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Simple Header */}
      <header className="px-4 sm:px-6 pt-6 pb-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.webp" alt="TapFive Logo" width={36} height={36} className="rounded-full shadow-xs" />
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              Tap<span className="text-blue-600">Five</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 text-xs font-bold shadow-xs">
            <button
              onClick={() => {
                setLocale("pt");
                localStorage.setItem("tapfive_locale", "pt");
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                locale === "pt" ? "bg-slate-900 text-white shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              🇵🇹 PT
            </button>
            <button
              onClick={() => {
                setLocale("en");
                localStorage.setItem("tapfive_locale", "en");
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                locale === "en" ? "bg-slate-900 text-white shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </header>

      {/* Main Success Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          {/* Confirmed Icon */}
          <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <span className="inline-block text-xs uppercase tracking-widest font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
            {t.success.badge}
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {t.success.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-10">
            {t.success.subtitle}
          </p>

          {/* Fulfillment Roadmap */}
          <div className="text-left border-t border-slate-100 pt-8 mb-10">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-6 text-center">
              {t.success.orderStepsTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{t.success.step1Title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.success.step1Desc}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{t.success.step2Title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.success.step2Desc}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{t.success.step3Title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.success.step3Desc}</p>
              </div>
            </div>
          </div>

          {/* WhatsApp / Need Help Card */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm mb-1">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.success.needHelpTitle}</span>
              </div>
              <p className="text-xs text-emerald-800/80">{t.success.needHelpText}</p>
            </div>
            <a
              href="https://wa.me/351928248322?text=Ol%C3%A1%21%20Fiz%20uma%20encomenda%20no%20TapFive%20e%20gostaria%20de%20confirmar%20os%20detalhes."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Return Home Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <span>{t.success.ctaHome}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} TapFive (tapfive.store). {t.footer.rights}</p>
      </footer>
    </div>
  );
}
