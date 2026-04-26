import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

        <Link
          className={cn(
            buttonVariants(),
            "mt-8 h-11 rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
          )}
          to="/signup"
        >
          Get Started
        </Link>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                Problem Workspace
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Today's Challenge
              </h3>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
              Daily update
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {highlightItems.map(([name, topic, level]) => (
                <div
                  key={name}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{name}</p>
                    <span className="text-xs text-white/40">{level}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/50">{topic}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/50">Challenge preview</p>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/45">
                  Python
                </span>
              </div>
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black p-4 font-mono text-sm leading-7 text-white/78">
                <p className="text-white/35">def solve(graph):</p>
                <p className="pl-4 text-white">visited = set()</p>
                <p className="pl-4 text-white">queue = [0]</p>
                <p className="pl-8 text-white/70"># breadth-first traversal</p>
                <p className="pl-4 text-white">return visited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
