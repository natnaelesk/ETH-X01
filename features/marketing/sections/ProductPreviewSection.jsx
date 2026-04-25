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
    <section className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-5 py-6 sm:px-8 sm:py-8">
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
                className="rounded-[1.25rem] border border-white/10 bg-black/60 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/65 p-5">
            <p className="text-sm text-white/50">Weekly topic tracks</p>
            <div className="mt-6 flex h-48 items-end gap-3">
              {topicCoverageBars.map((bar, index) => (
                <div key={topicCoverageLabels[index]} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end rounded-full bg-white/[0.04] p-1">
                    <div
                      className="w-full rounded-full bg-white"
                      style={{ height: `${bar}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-white/35">
                    {topicCoverageLabels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/65 p-5">
            <p className="text-sm text-white/50">Collection map</p>
            <div className="mt-6 grid grid-cols-7 gap-2">
              {heatmapCells.map((value, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-[0.65rem] border border-white/10"
                  style={{ backgroundColor: `rgba(255, 255, 255, ${value})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
