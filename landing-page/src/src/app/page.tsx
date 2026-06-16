import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import B2BSection from "@/components/B2BSection";
import SupportedChains from "@/components/SupportedChains";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Hero />
      <Features />
      <HowItWorks />
      <B2BSection />
      <SupportedChains />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
