"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Star, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Utensils, 
  Scissors, 
  Stethoscope, 
  ShoppingBag,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Wifi,
  QrCode,
  Lock,
  Layers,
  Truck,
  RotateCcw,
  CreditCard
} from "lucide-react";
import { content, Locale } from "@/lib/content";
import { STRIPE_CONFIG } from "@/lib/stripe";
import confetti from "canvas-confetti";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [customersPerDay, setCustomersPerDay] = useState<number>(40);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedVariant, setSelectedVariant] = useState<"preProgrammed" | "blank" | "gbpSetup">("preProgrammed");
  const [businessLink, setBusinessLink] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const [gbpContactInfo, setGbpContactInfo] = useState<string>("");
  const [gbpInputError, setGbpInputError] = useState<boolean>(false);
  const [phoneTapped, setPhoneTapped] = useState<boolean>(false);

  const t = content[locale];
  const monthlyEstimatedReviews = Math.round(customersPerDay * 30 * 0.12);

  const handleCheckout = (type: "blank" | "preProgrammed" | "gbpSetup") => {
    if (type === "preProgrammed" && !businessLink.trim()) {
      setInputError(true);
      document.getElementById("business-link-input")?.focus();
      return;
    }
    setInputError(false);

    if (type === "gbpSetup" && !gbpContactInfo.trim()) {
      setGbpInputError(true);
      document.getElementById("gbp-contact-input")?.focus();
      return;
    }
    setGbpInputError(false);

    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#2563eb', '#3b82f6', '#f59e0b', '#10b981']
    });

    let url = type === "preProgrammed" 
      ? STRIPE_CONFIG.preProgrammedCheckoutUrl 
      : type === "gbpSetup"
      ? STRIPE_CONFIG.gbpSetupCheckoutUrl
      : STRIPE_CONFIG.blankCheckoutUrl;

    // Pass custom client reference data to Stripe
    if (type === "preProgrammed" && businessLink.trim()) {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}client_reference_id=${encodeURIComponent(businessLink.trim())}`;
    } else if (type === "gbpSetup" && gbpContactInfo.trim()) {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}client_reference_id=${encodeURIComponent(gbpContactInfo.trim())}`;
    }

    window.open(url, "_blank");
  };

  const handleSimulateTap = () => {
    setPhoneTapped(true);
    confetti({
      particleCount: 45,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#10b981', '#2563eb', '#f59e0b']
    });
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 bg-light-grid selection:bg-blue-600 selection:text-white">
      
      {/* 1. Announcement Bar */}
      <div className="border-b border-blue-100 bg-blue-50/80 text-blue-900 text-xs font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        <span>{t.banner}</span>
      </div>

      {/* 2. Elevated Modern Header */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 pt-5 pb-2">
        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/90 border border-slate-200/80 rounded-2xl h-16 px-6 flex items-center justify-between shadow-sm">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200/80 shadow-sm bg-white flex items-center justify-center shrink-0">
              <Image 
                src="/logo.webp" 
                alt="TapFive Logo" 
                width={44} 
                height={44} 
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none text-slate-900">
                Tap<span className="text-blue-600">Five</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">tapfive.store</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">{t.nav.howItWorks}</a>
            <a href="#calculator" className="hover:text-blue-600 transition-colors">{t.nav.calculator}</a>
            <a href="#use-cases" className="hover:text-blue-600 transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">{t.nav.faq}</a>
          </nav>

          {/* Language Switcher & Primary CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-bold">
              <button 
                onClick={() => setLocale("pt")}
                className={`px-2.5 py-1 rounded-lg transition-all ${locale === 'pt' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                🇵🇹 PT
              </button>
              <button 
                onClick={() => setLocale("en")}
                className={`px-2.5 py-1 rounded-lg transition-all ${locale === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                🇬🇧 EN
              </button>
            </div>

            <button
              onClick={scrollToPricing}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>{t.nav.buyNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        
        {/* Soft Google Trust Blue Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6 shadow-xs">
                <div className="flex text-amber-500 text-xs">
                  {"★★★★★"}
                </div>
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6 text-slate-900">
                {t.hero.titleStart} <span className="text-blue-600">{t.hero.titleHighlight}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8">
                {t.hero.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
                <button
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-sm"
                >
                  <span>{t.hero.ctaSecondary}</span>
                </a>
              </div>

              {/* Value propositions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-slate-200/80 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.hero.bullet1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.hero.bullet2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.hero.bullet3}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Physical Card & Tap Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Physical Card Object */}
              <div className="relative w-full max-w-sm perspective-1000">
                
                {/* Physical Card Container */}
                <div 
                  onClick={handleSimulateTap}
                  className="relative cursor-pointer aspect-[1.586/1] rounded-3xl bg-gradient-to-br from-[#1b1e29] via-[#10121a] to-[#07080b] border-2 border-slate-800 p-7 flex flex-col justify-between shadow-2xl hover:border-blue-500 transition-all duration-300 group overflow-hidden"
                >
                  {/* Holographic light layer */}
                  <div className="absolute inset-0 card-hologram pointer-events-none opacity-35 group-hover:opacity-65 transition-opacity" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-black font-black text-sm shadow-md">
                        G
                      </div>
                      <div>
                        <span className="font-extrabold text-sm tracking-wide text-white block leading-tight">Google Review</span>
                        <span className="text-[10px] text-slate-400 font-mono">Contactless NFC Card</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Wifi className="w-4 h-4 rotate-90" />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                    <div className="w-13 h-13 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform p-3 shadow-inner">
                      <Zap className="w-6 h-6 animate-pulse text-amber-300" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      {t.cardPreview.tapInstruction}
                    </p>
                    <div className="flex text-amber-400 text-sm mt-1 gap-1">
                      {"★★★★★"}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-white/10">
                    <span className="font-mono text-gray-300">NTAG215 High-Speed</span>
                    <span className="text-blue-400 font-semibold">{locale === 'pt' ? 'Toque Contactless Instantâneo' : 'Instant Contactless Tap'}</span>
                  </div>
                </div>

                {/* Simulated Phone Pop-up */}
                {phoneTapped && (
                  <div className="absolute -bottom-7 -left-4 sm:-left-6 right-2 sm:right-auto bg-white border-2 border-emerald-500 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 z-30">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-extrabold text-slate-900">
                          {locale === 'pt' ? 'Google Reviews Aberto!' : 'Google Review Prompt Opened!'}
                        </p>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-bold">1.2s</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {locale === 'pt' ? '5 estrelas selecionadas automaticamente no telemóvel' : '5 stars automatically selected on screen'}
                      </p>
                    </div>
                  </div>
                )}

              </div>
              <p className="text-[11px] text-slate-400 mt-4 text-center font-medium">
                {locale === 'pt' ? 'Chip passivo de alta sensibilidade • Alcance de 2 a 5 cm' : 'Passive high-sensitivity chip • 2 to 5 cm scan distance'}
              </p>
            </div>

          </div>

          {/* Social Proof Metric Tiles */}
          <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 theme-shadow-soft">
              <p className="text-3xl sm:text-5xl font-black text-blue-600">{t.hero.stats1Value}</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{t.hero.stats1Label}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 theme-shadow-soft">
              <p className="text-3xl sm:text-5xl font-black text-slate-900">{t.hero.stats2Value}</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{t.hero.stats2Label}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 theme-shadow-soft">
              <p className="text-3xl sm:text-5xl font-black text-blue-600">{t.hero.stats3Value}</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{t.hero.stats3Label}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-blue-600">{t.howItWorks.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
              {t.howItWorks.title}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 theme-shadow-soft flex flex-col items-start hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-blue-500/20">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.howItWorks.step1Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.howItWorks.step1Desc}</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 theme-shadow-soft flex flex-col items-start hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-blue-500/20">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.howItWorks.step2Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.howItWorks.step2Desc}</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 theme-shadow-soft flex flex-col items-start hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-blue-500/20">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.howItWorks.step3Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.howItWorks.step3Desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ROI Calculator */}
      <section id="calculator" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-14 theme-shadow-soft">
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest font-black text-blue-600">{t.calculator.tag}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {t.calculator.title}
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                {t.calculator.subtitle}
              </p>
            </div>

            <div className="max-w-md mx-auto mb-10">
              <div className="flex justify-between items-center text-sm font-bold mb-3">
                <span className="text-slate-600">{t.calculator.sliderLabel}</span>
                <span className="text-2xl font-black text-blue-600">{customersPerDay}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="150" 
                step="5"
                value={customersPerDay} 
                onChange={(e) => setCustomersPerDay(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono font-semibold">
                <span>5 / day</span>
                <span>75 / day</span>
                <span>150 / day</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#f8fafc] border border-slate-200/80 text-center max-w-md mx-auto mb-8">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t.calculator.resultTitle}</span>
              <div className="flex items-baseline justify-center gap-1 mt-2">
                <span className="text-6xl font-black text-blue-600">+{monthlyEstimatedReviews}</span>
                <span className="text-sm font-bold text-slate-500">{t.calculator.perMonth}</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {t.calculator.explanation}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={scrollToPricing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-8 py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/25 active:scale-95"
              >
                {locale === 'pt' ? 'Garantir Cartão de Avaliações' : 'Secure Review Card'}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Use Cases */}
      <section id="use-cases" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-black text-blue-600">{t.useCases.tag}</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{t.useCases.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.useCases.items.map((item, idx) => (
              <div key={idx} className="bg-[#f8fafc] border border-slate-200/80 p-6 rounded-2xl flex flex-col items-start hover:border-blue-400 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-200">
                  {idx === 0 && <Utensils className="w-6 h-6" />}
                  {idx === 1 && <Scissors className="w-6 h-6" />}
                  {idx === 2 && <Stethoscope className="w-6 h-6" />}
                  {idx === 3 && <ShoppingBag className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Product Detail Page (PDP) Section */}
      <section id="pricing" className="py-20 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Product Showcase & Visuals */}
              <div className="lg:col-span-6 flex flex-col items-center">
                {/* Main Product Card Visual Showcase */}
                <div className="w-full max-w-md aspect-[1.586/1] rounded-3xl bg-gradient-to-br from-[#1b1e29] via-[#10121a] to-[#07080b] border-2 border-slate-800 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 card-hologram pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-black font-black text-base shadow-md">
                        G
                      </div>
                      <div>
                        <span className="font-extrabold text-base tracking-wide text-white block leading-tight">Google Review</span>
                        <span className="text-xs text-slate-400 font-mono">Contactless NFC Card</span>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400">
                      <Wifi className="w-4 h-4 rotate-90" />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-2 p-3 shadow-inner">
                      <Zap className="w-7 h-7 text-amber-300 animate-pulse" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      {locale === 'pt' ? 'Aproxime o Telemóvel' : 'Tap Phone to Review'}
                    </p>
                    <div className="flex text-amber-400 text-sm mt-1 gap-1">
                      {"★★★★★"}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
                    <span className="font-mono text-gray-300">NTAG215 High-Speed</span>
                    <span className="text-blue-400 font-semibold">{locale === 'pt' ? 'Sem Bateria / Sem App' : 'Zero Battery / No App'}</span>
                  </div>
                </div>

                {/* Micro PDP Thumbnail / Feature Pills */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-5">
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3 text-center">
                    <div className="text-xs font-bold text-slate-900">NTAG215</div>
                    <div className="text-[10px] text-slate-500 font-medium">Fast NFC Chip</div>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3 text-center">
                    <div className="text-xs font-bold text-slate-900">Matte PVC</div>
                    <div className="text-[10px] text-slate-500 font-medium">Waterproof 85x54mm</div>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3 text-center">
                    <div className="text-xs font-bold text-slate-900">100,000+</div>
                    <div className="text-[10px] text-slate-500 font-medium">Tap Durability</div>
                  </div>
                </div>

                {/* Satisfaction Badge */}
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{locale === 'pt' ? 'Garantia total de 30 dias • Reembolso a 100%' : '30-day money-back guarantee • 100% risk free'}</span>
                </div>
              </div>

              {/* Right Column: Interactive Buy Box */}
              <div className="lg:col-span-6 flex flex-col">
                
                {/* Header Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-widest font-black text-blue-600">
                      {t.pdp.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {t.pdp.inStock}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {t.pdp.title}
                  </h2>

                  {/* Reviews Star Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-amber-500 text-sm">
                      {"★★★★★"}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{t.pdp.rating}</span>
                    <span className="text-xs text-slate-400">({t.pdp.reviewCount})</span>
                  </div>
                </div>

                {/* Price Block */}
                <div className="flex items-baseline gap-3 my-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    {selectedVariant === "blank" 
                      ? t.pdp.variantBlank.price 
                      : selectedVariant === "preProgrammed" 
                      ? t.pdp.variantPre.price 
                      : t.pdp.variantGbp.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {selectedVariant === "blank" 
                      ? t.pdp.variantBlank.originalPrice 
                      : selectedVariant === "preProgrammed" 
                      ? t.pdp.variantPre.originalPrice 
                      : t.pdp.variantGbp.originalPrice}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full ml-auto">
                    {selectedVariant === "blank" ? "-33% OFF" : selectedVariant === "preProgrammed" ? "-38% OFF" : "BEST VALUE"}
                  </span>
                </div>

                {/* Variant Selection List */}
                <div className="space-y-3 mb-6">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    {t.pdp.chooseEdition}
                  </label>

                  {/* Option 1: Pre-Programmed (Default) */}
                  <div 
                    onClick={() => setSelectedVariant("preProgrammed")}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedVariant === "preProgrammed"
                        ? "border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/15"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                        selectedVariant === "preProgrammed" ? "border-blue-600 bg-blue-600" : "border-slate-300"
                      }`}>
                        {selectedVariant === "preProgrammed" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{t.pdp.variantPre.name}</span>
                          <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                            {t.pdp.variantPre.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{t.pdp.variantPre.desc}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="font-black text-sm text-blue-600">{t.pdp.variantPre.price}</div>
                      <div className="text-[10px] text-slate-400 line-through">{t.pdp.variantPre.originalPrice}</div>
                    </div>
                  </div>

                  {/* Option 2: Blank Card */}
                  <div 
                    onClick={() => setSelectedVariant("blank")}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedVariant === "blank"
                        ? "border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/15"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                        selectedVariant === "blank" ? "border-blue-600 bg-blue-600" : "border-slate-300"
                      }`}>
                        {selectedVariant === "blank" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{t.pdp.variantBlank.name}</div>
                        <p className="text-xs text-slate-500 mt-0.5">{t.pdp.variantBlank.desc}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="font-black text-sm text-slate-900">{t.pdp.variantBlank.price}</div>
                      <div className="text-[10px] text-slate-400 line-through">{t.pdp.variantBlank.originalPrice}</div>
                    </div>
                  </div>

                  {/* Option 3: Full Setup + Free Card */}
                  <div 
                    onClick={() => setSelectedVariant("gbpSetup")}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedVariant === "gbpSetup"
                        ? "border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                        selectedVariant === "gbpSetup" ? "border-amber-500 bg-amber-500" : "border-slate-300"
                      }`}>
                        {selectedVariant === "gbpSetup" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{t.pdp.variantGbp.name}</span>
                          <span className="bg-amber-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                            {t.pdp.variantGbp.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{t.pdp.variantGbp.desc}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="font-black text-sm text-amber-600">{t.pdp.variantGbp.price}</div>
                      <div className="text-[10px] text-slate-400 line-through">{t.pdp.variantGbp.originalPrice}</div>
                    </div>
                  </div>
                </div>

                {/* Conditional Inputs */}
                {selectedVariant === "preProgrammed" && (
                  <div className="mb-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 animate-in fade-in duration-200">
                    <label htmlFor="business-link-input" className="block text-xs font-bold text-slate-900 mb-1.5">
                      {t.pdp.inputLabelPre}
                    </label>
                    <input
                      id="business-link-input"
                      type="text"
                      value={businessLink}
                      onChange={(e) => {
                        setBusinessLink(e.target.value);
                        if (inputError) setInputError(false);
                      }}
                      placeholder={t.pdp.inputPlaceholderPre}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                        inputError 
                          ? 'border-red-500 ring-2 ring-red-400/20' 
                          : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                      }`}
                    />
                    {inputError ? (
                      <p className="text-[10px] text-red-600 font-bold mt-1.5">
                        ⚠️ {locale === 'pt' ? 'Por favor insira o link ou nome do seu negócio.' : 'Please enter your business link or name.'}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        ℹ️ {t.pdp.inputHelpPre}
                      </p>
                    )}
                  </div>
                )}

                {selectedVariant === "gbpSetup" && (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 animate-in fade-in duration-200">
                    <label htmlFor="gbp-contact-input" className="block text-xs font-bold text-slate-900 mb-1.5">
                      {t.pdp.inputLabelGbp}
                    </label>
                    <input
                      id="gbp-contact-input"
                      type="text"
                      value={gbpContactInfo}
                      onChange={(e) => {
                        setGbpContactInfo(e.target.value);
                        if (gbpInputError) setGbpInputError(false);
                      }}
                      placeholder={t.pdp.inputPlaceholderGbp}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                        gbpInputError 
                          ? 'border-red-500 ring-2 ring-red-400/20' 
                          : 'border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                      }`}
                    />
                    {gbpInputError ? (
                      <p className="text-[10px] text-red-600 font-bold mt-1.5">
                        ⚠️ {locale === 'pt' ? 'Por favor insira o contacto do seu negócio.' : 'Please enter your business and contact info.'}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        ℹ️ {t.pdp.inputHelpGbp}
                      </p>
                    )}
                  </div>
                )}

                {/* Primary Buy Button */}
                <button
                  onClick={() => handleCheckout(selectedVariant)}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2 mb-6"
                >
                  <span>{t.pdp.buyNow}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* What's Included Bullets */}
                <div className="pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                    {t.pdp.featuresTitle}
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                    {t.pdp.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. Trust & Security Badges Section */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-black text-blue-600">Trust & Safety</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{t.trust.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Badge 1: 256-Bit SSL */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.trust.ssl}</h3>
              <p className="text-xs text-slate-500">{t.trust.sslDesc}</p>
            </div>

            {/* Badge 2: Fast Express Dispatch */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.trust.shipping}</h3>
              <p className="text-xs text-slate-500">{t.trust.shippingDesc}</p>
            </div>

            {/* Badge 3: 30-Day Money Back */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.trust.guarantee}</h3>
              <p className="text-xs text-slate-500">{t.trust.guaranteeDesc}</p>
            </div>

            {/* Badge 4: No Subscriptions */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{t.trust.noSubs}</h3>
              <p className="text-xs text-slate-500">{t.trust.noSubsDesc}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-black text-blue-600">{t.faq.tag}</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{t.faq.title}</h2>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-200/50 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Trust Footer */}
      <footer className="py-12 border-t border-slate-200 bg-[#f8fafc] text-xs text-slate-500 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Image 
              src="/logo.webp" 
              alt="TapFive Logo" 
              width={28} 
              height={28} 
              className="rounded-full shadow-xs"
            />
            <span className="font-extrabold text-sm tracking-tight text-slate-800">
              Tap<span className="text-blue-600">Five</span>
            </span>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{t.footer.secureNotice}</span>
          </div>
          <p className="text-[11px] font-mono">
            © {new Date().getFullYear()} TapFive (tapfive.store). {t.footer.rights}
          </p>
        </div>
      </footer>

    </div>
  );
}
