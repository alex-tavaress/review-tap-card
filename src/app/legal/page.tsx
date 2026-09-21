"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, MessageCircle } from "lucide-react";
import { Locale } from "@/lib/content";

export default function LegalPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "refunds">("terms");

  useEffect(() => {
    const savedLocale = localStorage.getItem("tapfive_locale") as Locale | null;
    if (savedLocale === "pt" || savedLocale === "en") {
      setLocale(savedLocale);
      return;
    }
    const browserLang = (navigator.language || "").toLowerCase();
    if (browserLang.startsWith("pt")) {
      setLocale("pt");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 bg-light-grid flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="px-4 sm:px-6 pt-6 pb-4 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "pt" ? "Voltar à Loja" : "Back to Store"}</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.webp" alt="TapFive Logo" width={32} height={32} className="rounded-full shadow-xs" />
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Tap<span className="text-blue-600">Five</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-bold">
            <button
              onClick={() => {
                setLocale("pt");
                localStorage.setItem("tapfive_locale", "pt");
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                locale === "pt" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
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
                locale === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("terms")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all shrink-0 ${
              activeTab === "terms"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {locale === "pt" ? "Termos de Serviço" : "Terms of Service"}
          </button>
          <button
            onClick={() => setActiveTab("refunds")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all shrink-0 ${
              activeTab === "refunds"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {locale === "pt" ? "Garantia & Reembolsos" : "30-Day Refund Policy"}
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all shrink-0 ${
              activeTab === "privacy"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {locale === "pt" ? "Política de Privacidade" : "Privacy Policy"}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-slate-700 leading-relaxed text-sm space-y-6">
          {activeTab === "terms" && (
            <article className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">
                {locale === "pt" ? "Termos de Serviço" : "Terms of Service"}
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                {locale === "pt" ? "Última atualização: Setembro 2026" : "Last updated: September 2026"}
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">
                {locale === "pt" ? "1. Descrição do Serviço" : "1. Description of Service"}
              </h2>
              <p>
                {locale === "pt"
                  ? "A TapFive (tapfive.store) fornece cartões contactless equipados com chips NFC programados para redirecionar clientes diretamente para a página de avaliação do perfil público do Google do comprador. A TapFive é um fornecedor de hardware independente e não tem afiliação direta nem parceria oficial com a Google LLC."
                  : "TapFive (tapfive.store) provides contactless NFC smart hardware cards designed to direct smartphones directly to the merchant's publicly available Google Business review dialogue. TapFive is an independent hardware provider and is not affiliated with or endorsed by Google LLC."}
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">
                {locale === "pt" ? "2. Sem Mensalidades" : "2. Lifetime Hardware Ownership"}
              </h2>
              <p>
                {locale === "pt"
                  ? "A compra de cartões TapFive envolve um pagamento único. Não existem taxas de adesão, subscrições mensais ou encargos recorrentes."
                  : "All TapFive card purchases are strictly one-time payments. There are no ongoing software fees, subscriptions, or hidden recurring charges."}
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">
                {locale === "pt" ? "3. Expedição & Entrega" : "3. Shipping & Delivery"}
              </h2>
              <p>
                {locale === "pt"
                  ? "As encomendas são expedidas em correio registado no prazo de 24h a 48h úteis após a confirmação do pagamento e envio dos detalhes do negócio."
                  : "Orders are encoded and dispatched via registered express mail within 24 to 48 business hours following confirmed payment and business details receipt."}
              </p>
            </article>
          )}

          {activeTab === "refunds" && (
            <article className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">
                {locale === "pt" ? "Política de Garantia de 30 Dias" : "30-Day Money-Back Guarantee"}
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                {locale === "pt" ? "Sem burocracias nem perguntas complicadas" : "100% Risk Free • No Questions Asked"}
              </p>

              <p>
                {locale === "pt"
                  ? "Acreditamos na eficácia do TapFive. Se no prazo de 30 dias após a receção do cartão não estiver satisfeito com o produto ou o mesmo apresentar qualquer anomalia de funcionamento, garantimos a substituição imediata ou o reembolso integral do valor pago."
                  : "We stand behind the quality of TapFive. If within 30 days of receiving your card you are not satisfied with its performance or if the chip encounters any hardware defect, we offer an immediate replacement or a 100% full refund."}
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">
                {locale === "pt" ? "Como solicitar o reembolso" : "How to Request a Refund"}
              </h2>
              <p>
                {locale === "pt"
                  ? "Basta enviar uma mensagem para o nosso WhatsApp de suporte (+351 928 248 322) ou responder ao e-mail de recibo da Stripe indicando o número da encomenda. O reembolso é processado na mesma forma de pagamento no prazo de 3 a 5 dias úteis."
                  : "Simply contact our direct support team via WhatsApp (+351 928 248 322) or reply directly to your Stripe receipt email with your order details. Refunds are processed back to your original payment method within 3–5 business days."}
              </p>
            </article>
          )}

          {activeTab === "privacy" && (
            <article className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">
                {locale === "pt" ? "Política de Privacidade (RGPD)" : "Privacy Policy (GDPR)"}
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                {locale === "pt" ? "Conformidade com os regulamentos europeus" : "Strict EU GDPR Compliance"}
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">
                {locale === "pt" ? "Dados Recolhidos" : "Data Collected"}
              </h2>
              <p>
                {locale === "pt"
                  ? "Recolhemos unicamente os dados estritamente necessários para a faturação e expedição física da encomenda (nome, morada de entrega, número de telefone e link/nome do negócio para gravação do chip). O processamento de pagamentos é efetuado diretamente pela Stripe, sem que a TapFive tenha acesso aos dados do cartão bancário."
                  : "We only collect information strictly required to fulfill and deliver your physical order: recipient name, shipping address, contact phone, and business name/URL for NFC chip encoding. Financial payment details are processed exclusively by Stripe via 256-bit SSL encryption; TapFive never accesses or stores your credit card numbers."}
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">
                {locale === "pt" ? "Não Partilha com Terceiros" : "No Third-Party Sharing"}
              </h2>
              <p>
                {locale === "pt"
                  ? "Os seus dados nunca são vendidos nem cedidos a entidades externas ou redes de publicidade."
                  : "Your customer data is never sold, shared, or distributed to advertising networks or third-party brokers."}
              </p>
            </article>
          )}

          {/* Direct Support Contact Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {locale === "pt" ? "Precisa de esclarecimentos adicionais?" : "Need any additional clarification?"}
                </div>
                <div className="text-xs text-slate-500">WhatsApp: +351 928 248 322</div>
              </div>
            </div>
            <a
              href="https://wa.me/351928248322"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} TapFive (tapfive.store). All rights reserved.</p>
      </footer>
    </div>
  );
}
