import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { DashboardPreview } from "../components/DashboardPreview";

export function HeroSection() {
  return (
    <section className="neo-panel relative overflow-hidden bg-[#FFFDF5] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="neo-grid-bg pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute left-4 top-8 h-16 w-16 -rotate-12 border-4 border-black bg-[#FFD93D]" />
      <div className="pointer-events-none absolute right-8 top-10 h-24 w-24 rotate-6 border-4 border-black bg-[#C4B5FD]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="neo-kicker rotate-[-2deg]">
          Developer Workspace
        </p>

        <h1 className="mx-auto mt-6 max-w-5xl">
          <span className="neo-display block -rotate-1 text-4xl sm:text-6xl lg:text-[4.8rem]">
            Master DSA
          </span>
          <span className="neo-outline-text neo-display mt-2 block rotate-1 text-4xl sm:text-6xl lg:text-[4.8rem]">
            Build Visible Progress
          </span>
          <span className="neo-display mt-3 block bg-[#FF6B6B] px-4 py-3 text-2xl shadow-[6px_6px_0px_0px_#000] sm:text-4xl">
            with structured practice + daily challenges
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base font-bold leading-7 text-black sm:text-lg">
          Follow weekly topics, solve daily problems, compete on leaderboards,
          and build strong coding fundamentals in one loud, high-signal workspace.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link className="neo-button neo-focus-ring" to="/signup">
            Start Building
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a className="neo-button-ghost neo-focus-ring" href="#features">
            Explore Features
          </a>
        </div>
      </div>

      <div className="relative mt-20 lg:mt-10">
        <DashboardPreview />
      </div>
    </section>
  );
}
