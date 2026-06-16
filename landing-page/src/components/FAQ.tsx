"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "KYC/KYB gerekli mi?",
      answer:
        "Hayır. PayRam, self-hosted yapısı sayesinde KYC/KYB gerektirmez. Operatör kendi yargı alanına göre compliance uygular.",
    },
    {
      question: "Minimum deposit tutarı nedir?",
      answer:
        "Minimum deposit tutarı $12'dir. Bu tutar, onramp partnerlerinin gereksinimlerine göre belirlenir.",
    },
    {
      question: "Hangi ödeme yöntemlerini destekliyorsunuz?",
      answer:
        "Kredi kartı, Apple Pay, Google Pay, banka havalesi (SEPA, ACH), Revolut, PIX ve 175+ yerel ödeme yöntemini destekliyoruz.",
    },
    {
      question: "B2B müşteriler için aylık ücret var mı?",
      answer:
        "Hayır. Aylık ücret yoktur. Sadece kurulum ücreti ($500) ve işlem başına komisyon (%0.1-0.5) vardır.",
    },
    {
      question: "Self-hosting için teknik bilgi gerekli mi?",
      answer:
        "Hayır. 10 dakikada otomatik kurulum. Teknik bilgi gerekmez. Managed hosting seçeneği de mevcuttur.",
    },
    {
      question: " hangi ülkelerde kullanılabilir?",
      answer:
        "190+ ülkede kullanılabilir. Bazı ülkelerde yerel düzenlemelere göre kısıtlamalar olabilir.",
    },
    {
      question: "Sweep fee ne kadar?",
      answer:
        "Sweep fee, cold wallet settlement işlemi için alınır. Detaylı bilgi için lütfen bizimle iletişime geçin.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-gray-400 text-lg">
            Merak ettiğiniz tüm soruların cevapları.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                <span className="text-gray-400 text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
