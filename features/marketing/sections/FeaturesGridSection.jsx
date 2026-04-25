import { FeatureCard } from "../components/FeatureCard";
import { SectionHeading } from "../components/SectionHeading";
import { featurePanels, landingFeatures } from "../data/marketingData";

export function FeaturesGridSection() {
  return (
    <section id="features" className="mt-20">
      <SectionHeading
        label="Core Features"
        title="Designed for focused learning"
        description="The platform combines structured DSA prep, daily problem solving, rankings, and Python fundamentals in one place."
        align="center"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featurePanels.map((feature, index) => {
          const fallback = landingFeatures[index];

          return (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title || fallback.title}
              description={feature.description || fallback.description}
            />
          );
        })}
      </div>
    </section>
  );
}
