import { HeroSection } from "../components/marketing/hero-section";
import { FeaturesSection } from "../components/marketing/features-section";
import { HowItWorksSection } from "../components/marketing/how-it-works-section";
import { PricingSection } from "../components/marketing/pricing-section";
import { FAQSection } from "../components/marketing/faq-section";
import { StatsSection } from "../components/marketing/stats-section";
import { TestimonialsSection } from "../components/marketing/testimonials-section";
import { ShopifySection } from "../components/marketing/shopify-section";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ShopifySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
    </>
  );
}