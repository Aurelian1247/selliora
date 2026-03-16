import { SiteHeader } from "../../components/layout/site-header";
import { SiteFooter } from "../../components/layout/site-footer";
import { HeroSection } from "../../components/marketing/hero-section";
import { LiveDemoSection } from "../../components/marketing/live-demo-section";
import { FeaturesSection } from "../../components/marketing/features-section";
import { HowItWorksSection } from "../../components/marketing/how-it-works-section";
import { PricingSection } from "../../components/marketing/pricing-section";
import { FAQSection } from "../../components/marketing/faq-section";

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader />
      <HeroSection />
      <LiveDemoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <SiteFooter />
    </main>
  );
}