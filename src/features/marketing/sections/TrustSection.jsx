import { SectionHeading } from "../components/SectionHeading";
import { trustStats } from "../data/marketingData";

export function TrustSection() {
  return (
    <section className="mt-20 lg:mt-30">
      <SectionHeading
        label="What You Get"
        title="Everything included in the platform"
        description="Structured tracks, daily practice, competitive motivation, and beginner-friendly learning paths."
      />

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {trustStats.map((item) => (
          <article
            key={item.label}
            className="neo-panel neo-panel-hover px-5 py-4"
          >
            <p className="text-xs font-black uppercase tracking-[0.26em] text-black">
              {item.label}
            </p>
            <p className="mt-3 text-sm font-bold leading-7 text-black">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
