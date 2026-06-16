"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "KYC/KYB gerekli mi?",
      answer: "Hayır. TRDEFI, PayRam altyapısı sayesinde KYC/KYB gerektirmez. Operatör kendi yargı alanına göre compliance uygular.",
    },
    {
      question: "Minimum deposit tutarı nedir?",
      answer: "Minimum deposit tutarı $12'dir. Bu tutar, onramp partnerlerinin gereksinimlerine göre belirlenir.",
    },
    {
      question: "Hangi ödeme yöntemlerini destekliyorsunuz?",
      answer: "Kredi kartı, Apple Pay, Google Pay, banka havalesi (SEPA, ACH), Revolut, PIX ve 175+ yerel ödeme yöntemini destekliyoruz.",
    },
    {
      question: "B2B müşteriler için aylık ücret var mı?",
      answer: "Hayır. Aylık ücret yoktur. Sadece kurulum ücreti ($500) ve işlem başına komisyon (%0.1-0.5) vardır.",
    },
    {
      question: "Self-hosting için teknik bilgi gerekli mi?",
      answer: "Hayır. 10 dakikada otomatik kurulum. Teknik bilgi gerekmez. Managed hosting seçeneği de mevcuttur.",
    },
    {
      question: "Hangi ülkelerde kullanılabilir?",
      answer: "190+ ülkede kullanılabilir. Bazı ülkelerde yerel düzenlemelere göre kısıtlamalar olabilir.",
    },
    {
      question: "Sweep fee ne kadar?",
      answer: "Sweep fee, cold wallet settlement işlemi için alınır. Detaylı bilgi için lütfen bizimle iletişime geçin.",
    },
  ];

  return (
    <section id="faq" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#f59e0b] text-sm font-semibold tracking-wide">SSS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Sıkça Sorulan <span className="text-gradient">Sorular</span>
          </h2>
          <p className="text-[#94a3b8] text-xl">
            Merak ettiğiniz tüm soruların cevapları.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#12121a] border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'border-[rgba(245,158,11,0.3)] shadow-lg shadow-[#f59e0b]/5' 
                  : 'border-[rgba(245,158,11,0.1)] hover:border-[rgba(245,158,11,0.2)]'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium text-lg pr-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-[#f59e0b]/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-45' : ''
                }`}>
                  <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-[#94a3b8] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
