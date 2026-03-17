
import { SiteFooter } from "../../../components/layout/site-footer";
import { FeaturesSection } from "../../../components/marketing/features-section";
import { HowItWorksSection } from "../../../components/marketing/how-it-works-section";
import { LiveDemoSection } from "../../../components/marketing/live-demo-section";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
    

      <section className="px-4 pb-6 pt-20 text-center md:px-6">
        <p className="text-sm uppercase tracking-[0.22em] text-violet-300/80">Features</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          Built to generate product content that is cleaner, faster, and easier to scale
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
          Selliora combines AI generation, SEO structure, multi-format outputs, and a
          premium workflow designed for modern eCommerce teams.
        </p>
      </section>

      <FeaturesSection />
      <LiveDemoSection />
      <HowItWorksSection />
      <SiteFooter />
    </main>
  );
}