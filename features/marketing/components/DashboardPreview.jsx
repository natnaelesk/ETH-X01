import { Search } from "lucide-react";

import { progressBars } from "../data/marketingData";

const previewStats = [
  ["Difficulty", "Medium"],
  ["Tags", "Sliding Window"],
  ["Pattern", "Two Pointers"],
];

const filterItems = [
  ["Arrays", "12 sample problems"],
  ["Sliding Window", "Tag applied"],
  ["Medium", "Difficulty filter"],
];

const topicLabels = ["Arr", "Str", "Tre", "Gra", "DP", "Rec", "SQL"];

export function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/14 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-8 h-24 w-24 rounded-full bg-white/8 blur-2xl" />

      <div className="relative space-y-4">
        <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-black/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">
              Problem Library
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">Topic: Arrays</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70">
            <Search className="h-4 w-4" />
            Search problems...
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {previewStats.map(([label, value]) => (
            <div
              key={label}
              className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                {label}
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/60 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Browse by pattern</p>
                <p className="mt-1 text-lg font-medium text-white">Popular topics</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                Library view
              </span>
            </div>

            <div className="mt-8 flex h-44 items-end gap-3">
              {progressBars.map((bar, index) => (
                <div key={topicLabels[index]} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-full w-full items-end rounded-full bg-white/[0.04] p-1">
                    <div
                      className="w-full rounded-full bg-white/85"
                      style={{ height: `${bar}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/35">{topicLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-white/45">Filters</p>
            <div className="mt-4 space-y-3">
              {filterItems.map(([topic, count]) => (
                <div
                  key={topic}
                  className="flex items-center justify-between rounded-[1rem] border border-white/10 bg-black/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{topic}</p>
                    <p className="text-xs text-white/45">{count}</p>
                  </div>
                  <span className="text-xs text-white/45">View</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
