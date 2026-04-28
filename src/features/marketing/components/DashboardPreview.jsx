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
    <div className="neo-panel relative overflow-hidden bg-white p-4 sm:p-6">
      <div className="neo-grid-bg pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -right-10 top-4 h-18 w-18 rotate-12 border-4 border-black bg-[#FFD93D]" />
      <div className="pointer-events-none absolute right-14 top-12 h-10 w-10 -rotate-12 border-4 border-black bg-[#FF6B6B]" />

      <div className="relative space-y-4">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-black">
              Problem Library
            </p>
            <h3 className="mt-2 text-xl font-black uppercase text-black">Topic: Arrays</h3>
          </div>
          <div className="neo-pill">
            <Search className="h-4 w-4" />
            Search problems...
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {previewStats.map(([label, value]) => (
            <div
              key={label}
              className="border-4 border-black bg-[#FFFDF5] p-4 shadow-[4px_4px_0px_0px_#000]"
            >
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black">
                {label}
              </p>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-black">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] ">
          <div className="border-4 border-black bg-[#C4B5FD] p-5 shadow-[6px_6px_0px_0px_#000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Browse by pattern</p>
                <p className="mt-1 text-lg font-black uppercase text-black">Popular topics</p>
              </div>
              <span className="neo-pill bg-white">
                Library view
              </span>
            </div>

            <div className="mt-8 flex h-44 items-end gap-3">
              {progressBars.map((bar, index) => (
                <div key={topicLabels[index]} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-full w-full items-end border-4 border-black bg-white p-1">
                    <div
                      className="w-full bg-[#FF6B6B]"
                      style={{ height: `${bar}%` }}
                    />
                  </div>
                  <span className="text-xs font-black uppercase text-black">{topicLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-[#FFD93D] p-5 shadow-[6px_6px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Filters</p>
            <div className="mt-4 space-y-3">
              {filterItems.map(([topic, count]) => (
                <div
                  key={topic}
                  className="flex items-center justify-between border-4 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_#000]"
                >
                  <div>
                    <p className="text-sm font-black uppercase text-black">{topic}</p>
                    <p className="text-xs font-bold text-black">{count}</p>
                  </div>
                  <span className="text-xs font-black uppercase text-black">View</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
