import { useState } from "react";

import { discussionThreads } from "../api";

export function DiscussionPage() {
  const [draft, setDraft] = useState("");

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="neo-panel border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] sm:p-8">
        <p className="neo-kicker w-fit bg-[#C4B5FD] text-[10px]">Community</p>
        <h1 className="neo-display mt-3 text-3xl text-black sm:text-4xl">
          Discussion
        </h1>
        <p className="mt-3 text-sm font-bold leading-7 text-black">
          UI-only preview. Posts are not saved; a future API will persist threads.
        </p>

        <div className="mt-8 space-y-4 border-t-4 border-black pt-6">
          {discussionThreads.map((thread) => (
            <div
              key={thread.id}
              className="border-4 border-black bg-[#FFFDF5] p-4 shadow-[4px_4px_0px_0px_#000]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-black uppercase text-black">
                  {thread.userName}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/60">
                  {thread.createdLabel}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold leading-6 text-black">
                {thread.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-4 border-black bg-[#FFD93D] p-4 shadow-[4px_4px_0px_0px_#000]">
          <label className="text-xs font-black uppercase tracking-[0.18em] text-black" htmlFor="comment">
            Add a comment (demo)
          </label>
          <textarea
            className="neo-focus-ring mt-2 min-h-[100px] w-full border-4 border-black bg-white p-3 text-sm font-bold text-black placeholder:text-black/40"
            id="comment"
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type something — it stays in the browser only."
            value={draft}
          />
          <button
            className="neo-button mt-3"
            onClick={() => setDraft("")}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
