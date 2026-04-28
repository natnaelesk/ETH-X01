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
    <section className="mt-20 lg:mb-30 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ">
      <div className="neo-panel order-2 rotate-[1deg] bg-[#C4B5FD] p-4 sm:p-6 lg:order-1">
        <div className="grid gap-4 border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000] sm:grid-cols-[0.78fr_1.22fr]">
          <div className="border-4 border-black bg-[#FFFDF5] p-4 shadow-[4px_4px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tagItems.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-4 border-black bg-[#FFD93D] px-3 py-1.5 text-xs font-black uppercase text-black shadow-[4px_4px_0px_0px_#000]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-[#FF6B6B] p-4 shadow-[4px_4px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Grouped topics</p>
            <div className="mt-4 space-y-3">
              {groupedTopics.map(([title, meta]) => (
                <div
                  key={title}
                  className="flex items-center justify-between border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_#000]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-[#C4B5FD]">
                      <Tag className="h-4 w-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-black">{title}</p>
                      <p className="text-xs font-bold text-black">{meta}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black uppercase text-black">Open</span>
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
