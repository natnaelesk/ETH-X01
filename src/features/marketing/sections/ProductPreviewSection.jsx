import { SectionHeading } from "../components/SectionHeading";
import { heatmapCells } from "../data/marketingData";

const previewHighlights = [
  ["Today's Challenge", "Fresh problem"],
  ["Weekly Topic", "Guided track"],
  ["Leaderboard", "Top users"],
];

const topicCoverageBars = [42, 58, 50, 74, 68, 88, 92];
const topicCoverageLabels = ["Arr", "Gra", "Tre", "Str", "DP", "Py", "CF"];

export function ProductPreviewSection() {
  return (
    <section
      id="product-preview"
      className="neo-panel mt-20 bg-[#FF6B6B] px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <SectionHeading
            title="A product preview built around clarity"
            description="See how weekly topics, daily challenges, leaderboard views, and Python lessons fit together inside the platform."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {previewHighlights.map(([label, value]) => (
              <div
                key={label}
                className="border-4 border-black bg-white px-4 py-4 shadow-[4px_4px_0px_0px_#000]"
              >
                <p className="text-xs font-black uppercase tracking-[0.24em] text-black">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-black uppercase text-black">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-[#FFFDF5] p-5 shadow-[6px_6px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Weekly topic tracks</p>
            <div className="mt-6 flex h-48 items-end gap-3">
              {topicCoverageBars.map((bar, index) => (
                <div key={topicCoverageLabels[index]} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end border-4 border-black bg-white p-1">
                    <div
                      className="w-full bg-[#FFD93D]"
                      style={{ height: `${bar}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black uppercase text-black">
                    {topicCoverageLabels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-[#C4B5FD] p-5 shadow-[6px_6px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Collection map</p>
            <div className="mt-6 grid grid-cols-7 gap-2">
              {heatmapCells.map((value, index) => (
                <div
                  key={index}
                  className="aspect-square border-4 border-black"
                  style={{ backgroundColor: `rgba(255, 217, 61, ${Math.max(value, 0.22)})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
