import { Link, useParams } from "react-router-dom";

import { getChallengeById } from "../api";

export function ChallengeDetailPage() {
  const { id } = useParams();
  const challenge = getChallengeById(id);

  if (!challenge) {
    return (
      <section className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6">
        <div className="neo-panel border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000]">
          <p className="text-sm font-bold text-black">Challenge not found.</p>
          <Link
            className="neo-button mt-6 inline-flex"
            to="/challenges"
          >
            Back to challenges
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[900px] px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <Link
          className="text-xs font-black uppercase tracking-[0.2em] text-black underline decoration-4 underline-offset-4"
          to="/challenges"
        >
          ← All challenges
        </Link>
      </div>

      <div className="neo-panel border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] sm:p-8">
        <p className="neo-kicker w-fit bg-[#C4B5FD] text-[10px]">
          {challenge.patternTitle}
        </p>
        <h1 className="neo-display mt-3 text-2xl leading-tight text-black sm:text-3xl">
          {challenge.dayTitle}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="border-4 border-black bg-[#FFFDF5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
            {challenge.date}
          </span>
          <span className="border-4 border-black bg-[#C4B5FD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
            {challenge.difficulty}
          </span>
          <span className="border-4 border-black bg-[#FFD93D] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
            {challenge.timeToSolve}
          </span>
        </div>

        <p className="mt-6 text-sm font-bold leading-7 text-black sm:text-base">
          {challenge.shortDescription}
        </p>
        <p className="mt-4 text-sm font-bold leading-7 text-black/90">
          {challenge.longDescription}
        </p>

        <div className="mt-8 border-4 border-dashed border-black bg-[#FFFDF5] p-6 shadow-[4px_4px_0px_0px_#000]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
            Problem statement
          </p>
          <p className="mt-3 text-sm font-bold leading-7 text-black">
            Full problem text, examples, and constraints will load here when the
            app is connected to your Django backend. For now this panel is a
            layout placeholder only.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="neo-button" type="button">
            Solve (UI only)
          </button>
          <button className="neo-button-secondary" type="button">
            Save for later
          </button>
        </div>
      </div>
    </section>
  );
}
