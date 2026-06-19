"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  monthlyVolume: string;
  integrationType: string;
  blockchains: string[];
  message: string;
}

export default function B2BContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    monthlyVolume: "",
    integrationType: "",
    blockchains: [],
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blockchainOptions = ["Ethereum", "Base", "Polygon", "Tron", "Bitcoin"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlockchainToggle = (chain: string) => {
    setFormData((prev) => ({
      ...prev,
      blockchains: prev.blockchains.includes(chain)
        ? prev.blockchains.filter((c) => c !== chain)
        : [...prev.blockchains, chain],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent("B2B Başvuru - " + formData.company);
    const body = encodeURIComponent(
      `Ad Soyad: ${formData.name}\n` +
      `E-posta: ${formData.email}\n` +
      `Telefon: ${formData.phone || "Belirtilmedi"}\n` +
      `Şirket: ${formData.company}\n` +
      `Website: ${formData.website}\n` +
      `Aylık İşlem Hacmi: ${formData.monthlyVolume}\n` +
      `Entegrasyon Türü: ${formData.integrationType}\n` +
      `Hedef Blockchain: ${formData.blockchains.join(", ") || "Belirtilmedi"}\n` +
      `Mesaj: ${formData.message || "Belirtilmedi"}`
    );

    setTimeout(() => {
      window.location.href = `mailto:info@trdefi.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-black/60 border border-green-500/30 rounded-2xl p-8 text-center mt-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Başvurunuz Alındı!
        </h3>
        <p className="text-gray-400">
          24 saat içinde sizinle iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-gray-900/80 border border-gray-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-0 transition-all duration-300";

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6 md:p-8 mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            B2B Başvuru Formu
          </h3>
          <p className="text-gray-500 text-xs">24 saat içinde geri dönüş</p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">Ad Soyad *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Adınız Soyadınız"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">E-posta *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ornek@sirket.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">Telefon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+90 5XX XXX XX XX"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">Şirket Adı *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Şirketinizin adı"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">Website URL *</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            placeholder="https://www.sirketiniz.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Select Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">Aylık İşlem Hacmi *</label>
          <select
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleChange}
            required
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Seçiniz</option>
            <option value="< $10K">{'< $10K'}</option>
            <option value="$10K - $50K">$10K - $50K</option>
            <option value="$50K - $100K">$50K - $100K</option>
            <option value="$100K - $500K">$100K - $500K</option>
            <option value="$500K+">$500K+</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-medium">Entegrasyon Türü *</label>
          <select
            name="integrationType"
            value={formData.integrationType}
            onChange={handleChange}
            required
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Seçiniz</option>
            <option value="REST API">REST API</option>
            <option value="Widget">Widget</option>
            <option value="SDK">SDK</option>
            <option value="Webhook">Webhook</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>

      {/* Blockchain Selection */}
      <div className="mb-4">
        <label className="block text-gray-400 text-xs mb-2 font-medium">Hedef Blockchain</label>
        <div className="flex flex-wrap gap-2">
          {blockchainOptions.map((chain) => (
            <button
              key={chain}
              type="button"
              onClick={() => handleBlockchainToggle(chain)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                formData.blockchains.includes(chain)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-900/80 border border-gray-700/50 text-gray-400 hover:border-orange-500/50"
              }`}
            >
              {chain}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-gray-400 text-xs mb-1.5 font-medium">Mesaj</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          placeholder="Ek notlar, özel gereksinimler..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Gönderiliyor...
          </span>
        ) : (
          "Başvuruyu Gönder"
        )}
      </button>

      {/* Privacy Note */}
      <p className="text-gray-500 text-xs text-center mt-4">
        Bilgileriniz yalnızca başvuru değerlendirilmesi için kullanılacaktır.
      </p>
    </form>
  );
}
