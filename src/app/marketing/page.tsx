import Header from "@/components/marketing/layout/Header";
import Footer from "@/components/marketing/layout/Footer";
import Hero from "@/components/marketing/sections/Hero";
import Features from "@/components/marketing/sections/Features";
import AISection from "@/components/marketing/sections/AISection";
import Pricing from "@/components/marketing/sections/Pricing";
import FAQ from "@/components/marketing/sections/FAQ";
import CTA from "@/components/marketing/sections/CTA";
import Modules from "@/components/marketing/sections/Modules";
import WhyEdunova from "@/components/marketing/sections/WhyEdunova";
import MobileApp from "@/components/marketing/sections/MobileApp";


export default function MarketingPage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <WhyEdunova />
        <Features />
        <MobileApp />
        <Modules />
        <AISection />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}