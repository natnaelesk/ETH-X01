import { StepCard } from "../components/StepCard";
import { SectionHeading } from "../components/SectionHeading";
import { landingSteps } from "../data/marketingData";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mt-20">
      <SectionHeading
        label="How It Works"
        title="A simple system that keeps you moving"
        align="center"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {landingSteps.map((step, index) => (
          <StepCard
            key={step.title}
            index={index}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
