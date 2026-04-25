import { SectionHeading } from "../components/SectionHeading";
import { trustStats } from "../data/marketingData";

export function TrustSection() {
  return (
    <section className="mt-6">
      <SectionHeading
        label="What You Get"
        title="Everything included in the platform"
        description="Structured tracks, daily practice, competitive motivation, and beginner-friendly learning paths."
      />

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {trustStats.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] px-5 py-4"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-white/35">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/58">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
