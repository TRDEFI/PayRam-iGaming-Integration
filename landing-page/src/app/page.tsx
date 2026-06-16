import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import B2BSection from "@/components/B2BSection";
import Pricing from "@/components/Pricing";
import SupportedChains from "@/components/SupportedChains";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Hero />
      <Features />
      <HowItWorks />
      <B2BSection />
      <Pricing />
      <SupportedChains />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
