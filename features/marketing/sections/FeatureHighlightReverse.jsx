import { Tag } from "lucide-react";

import { SectionHeading } from "../components/SectionHeading";

const tagItems = ["Arrays", "Graphs", "Dynamic Programming", "Sliding Window", "Binary Search"];
const groupedTopics = [
  ["Interview patterns", "Curated collection"],
  ["Core foundations", "Essential practice set"],
  ["Advanced concepts", "Challenge-focused set"],
];

export function FeatureHighlightReverse() {
  return (
    <section className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="order-2 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6 lg:order-1">
        <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/65 p-4 sm:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/50">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tagItems.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/50">Grouped topics</p>
            <div className="mt-4 space-y-3">
              {groupedTopics.map(([title, meta]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-[1rem] border border-white/10 bg-black/55 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Tag className="h-4 w-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{title}</p>
                      <p className="text-xs text-white/45">{meta}</p>
                    </div>
                  </div>
                  <span className="text-xs text-white/35">Open</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <SectionHeading
          title="Organize your learning your way"
          description="Sort collections by topic, pattern, or difficulty so weekly tracks and daily practice stay easy to follow."
        />
      </div>
    </section>
  );
}
