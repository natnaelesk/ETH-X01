import { CTASection } from "../sections/CTASection";
import { FeatureHighlightReverse } from "../sections/FeatureHighlightReverse";
import { FeatureHighlightSection } from "../sections/FeatureHighlightSection";
import { FeaturesGridSection } from "../sections/FeaturesGridSection";
import { FooterSection } from "../sections/FooterSection";
import { HeroSection } from "../sections/HeroSection";
import { HowItWorksSection } from "../sections/HowItWorksSection";
import { ProductPreviewSection } from "../sections/ProductPreviewSection";
import { TrustSection } from "../sections/TrustSection";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12">
        <HeroSection />
        <TrustSection />
        <FeatureHighlightSection />
        <FeatureHighlightReverse />
        <FeaturesGridSection />
        <HowItWorksSection />
        <ProductPreviewSection />
        <CTASection />
        <FooterSection />
      </div>
    </main>
  );
}
