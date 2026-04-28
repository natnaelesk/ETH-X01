import { Link } from "react-router-dom";

import { SectionHeading } from "../components/SectionHeading";

const highlightItems = [
  ["Weekly Topic: Graphs", "7-problem track", "Active"],
  ["Leaderboard (Top Users)", "See current rankings", "Live"],
  ["Python Basics - Lesson 3", "Beginner track", "New"],
];

export function FeatureHighlightSection() {
  return (
    <section className="lg:mt-50 mt-30 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <SectionHeading
          label="Built for Focus"
          title="Everything you need. Nothing you don’t."
          description="Practice weekly DSA tracks, daily challenges, leaderboard competition, and beginner lessons in one clean workspace."
        />

        <Link className="neo-button mt-8 neo-focus-ring" to="/signup">
          Get Started
        </Link>
      </div>

      <div className="neo-panel rotate-[-1deg] bg-[#FFD93D] p-4 sm:p-6">
        <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black">
                Problem Workspace
              </p>
              <h3 className="mt-2 text-xl font-black uppercase text-black">
                Today's Challenge
              </h3>
            </div>
            <div className="neo-pill bg-[#C4B5FD]">
              Daily update
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {highlightItems.map(([name, topic, level]) => (
                <div
                  key={name}
                  className="border-4 border-black bg-[#FFFDF5] px-4 py-4 shadow-[4px_4px_0px_0px_#000]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black uppercase text-black">{name}</p>
                    <span className="text-xs font-black uppercase text-black">{level}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-black">{topic}</p>
                </div>
              ))}
            </div>

            <div className="border-4 border-black bg-[#C4B5FD] p-4 shadow-[4px_4px_0px_0px_#000]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Challenge preview</p>
                <span className="neo-pill bg-white">
                  Python
                </span>
              </div>
              <div className="mt-4 border-4 border-black bg-black p-4 font-mono text-sm leading-7 text-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
                <p className="text-[#FFD93D]">def solve(graph):</p>
                <p className="pl-4 text-white">visited = set()</p>
                <p className="pl-4 text-white">queue = [0]</p>
                <p className="pl-8 text-[#C4B5FD]"># breadth-first traversal</p>
                <p className="pl-4 text-white">return visited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
