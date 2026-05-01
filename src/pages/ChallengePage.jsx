import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ChallengePage = ({
  challenges = [],
  leaderboard,
  loading = false,
}) => {
  const safeLeaderboard = Array.isArray(leaderboard) ? leaderboard : [];
  const today = new Date().toISOString().split("T")[0];

  const sortedChallenges = [...challenges]
    .filter((ch) => ch.date <= today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredChallenge =
    sortedChallenges.find((challenge) => challenge.date === today) ||
    sortedChallenges[0];
  const remainingChallenges = sortedChallenges.filter(
    (challenge) => challenge.id !== featuredChallenge?.id,
  );
  const topScorers = safeLeaderboard.slice(0, 10);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-8 sm:space-y-10">
        <div className="neo-panel relative overflow-hidden bg-white p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3">
            <p className="neo-kicker bg-[#C4B5FD]">
              Challenges
            </p>
            <h1 className="neo-display text-4xl text-black sm:text-5xl">
              LeetCode Challenges
            </h1>
            <p className="max-w-3xl text-sm font-bold leading-7 text-black sm:text-base">
              A focused daily challenge feed. Start with today&apos;s problem,
              keep a steady streak, and track progress without the dashboard
              clutter.
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
              Featured
            </p>
            <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
              Today&apos;s Challenge
            </h2>
          </div>

          {loading ? (
            <div className="neo-panel bg-[#FFD93D] p-8 text-black">
              <p className="text-sm font-black uppercase tracking-[0.22em]">
                Loading
              </p>
              <p className="mt-2 text-base font-bold">Fetching challenge...</p>
            </div>
          ) : (
            <>
              {featuredChallenge ? (
                <Link
                  to={`/leetcode/${featuredChallenge.id}`}
                  className={cn(
                    "neo-panel neo-panel-hover group block bg-[#FFD93D] p-6 text-black sm:p-7",
                  )}
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/80">
                    {featuredChallenge.patternTitle}
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase text-black sm:text-[1.75rem]">
                    {featuredChallenge.dayTitle}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-black sm:text-base">
                    {featuredChallenge.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
                    <span className="border-4 border-black bg-white px-3 py-1.5 font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0px_0px_#000]">
                      {featuredChallenge.date}
                    </span>
                    <span className="border-4 border-black bg-[#C4B5FD] px-3 py-1.5 font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0px_0px_#000]">
                      {featuredChallenge.difficulty}
                    </span>
                    <span className="border-4 border-black bg-white px-3 py-1.5 font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0px_0px_#000]">
                      {featuredChallenge.timeToSolve}
                    </span>
                  </div>

                  <div className="neo-button mt-6 inline-flex items-center gap-2">
                    Start challenge
                    <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ) : (
                <div className="neo-panel bg-white p-8">
                  <p className="text-sm font-bold text-black">
                    No challenge is available yet. Check back shortly.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
              All Challenges
            </p>
            <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
              Challenge List
            </h2>
          </div>

          {loading ? (
            <div className="neo-panel bg-[#C4B5FD] p-8">
              <p className="text-sm font-bold text-black">Loading challenge list...</p>
            </div>
          ) : (
            <div className="neo-panel divide-y-4 divide-black overflow-hidden bg-white">
              {(featuredChallenge ? remainingChallenges : sortedChallenges).map(
                (challenge) => (
                  <Link
                    to={`/leetcode/${challenge.id}`}
                    key={challenge.id}
                    className="block px-5 py-5 transition-colors hover:bg-[#FFF4B8] sm:px-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/70">
                          {challenge.patternTitle}
                        </p>
                        <h3 className="mt-2 text-xl font-black uppercase text-black">
                          {challenge.dayTitle}
                        </h3>
                        <p className="mt-2 text-sm font-bold leading-7 text-black">
                          {challenge.shortDescription}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                        <span className="border-4 border-black bg-[#FFFDF5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0px_0px_#000]">
                          {challenge.date}
                        </span>
                        <span className="border-4 border-black bg-[#C4B5FD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0px_0px_#000]">
                          {challenge.difficulty}
                        </span>
                      </div>
                    </div>
                  </Link>
                ),
              )}

              {!sortedChallenges.length ? (
                <div className="px-6 py-8">
                  <p className="text-sm font-bold text-black">
                    No challenges published yet.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </section>

        <section className="space-y-4 pb-2">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
              Community
            </p>
            <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
              Top Scorers
            </h2>
          </div>

          <div className="neo-panel overflow-hidden bg-white">
            {!topScorers.length ? (
              <div className="px-6 py-8">
                <p className="text-sm font-bold text-black">Loading leaderboard...</p>
              </div>
            ) : (
              <div className="divide-y-4 divide-black">
                {topScorers.map((entry, index) => (
                  <Link
                    key={entry.id}
                    to={`/profile/${entry.id}`}
                    className={cn(
                      "flex items-center justify-between gap-4 px-5 py-4 text-black transition-colors sm:px-6",
                      index === 0 && "bg-[#FFE8EC]",
                      index === 1 && "bg-[#FFF4B8]",
                      index === 2 && "bg-[#EAE2FF]",
                      index > 2 && "bg-[#FFFDF5] hover:bg-white",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black uppercase text-black">
                        #{index + 1} {entry.name}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/70">
                        score {entry.score}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {index < 3 ? (
                        <span className="border-2 border-black bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                          Top {index + 1}
                        </span>
                      ) : null}
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-4 border-black bg-white">
                        {entry.avatar ? (
                          <img
                            alt={entry.name}
                            className="h-full w-full object-cover"
                            src={entry.avatar}
                          />
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ChallengePage;
