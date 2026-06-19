"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import B2BSection from "@/components/B2BSection";
import Pricing from "@/components/Pricing";
import SupportedChains from "@/components/SupportedChains";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import OnrampPopup from "@/components/OnrampPopup";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Hero onOpenPopup={() => setShowPopup(true)} />
      <Features />
      <HowItWorks />
      <B2BSection />
      <Pricing />
      <SupportedChains />
      <FAQ />
      <CTA onOpenPopup={() => setShowPopup(true)} />
      <Footer />
      {showPopup && <OnrampPopup isOpen={true} onClose={() => setShowPopup(false)} />}
    </main>
  );
}
