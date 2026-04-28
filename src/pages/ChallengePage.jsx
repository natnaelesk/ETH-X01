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

  const topLeaderboardMobile = safeLeaderboard.slice(0, 5);
  const topLeaderboardDesktop = safeLeaderboard.slice(0, 10);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="neo-panel overflow-hidden bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <p className="neo-kicker bg-[#C4B5FD]">Challenges</p>
          <h1 className="neo-display text-4xl sm:text-5xl">
            LeetCode Challenges
          </h1>
          <p className="text-sm font-bold text-black sm:text-base">
            Pick a daily track, submit your solution link, and compare your progress with top scorers.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div>
          {loading ? (
            <div className="neo-panel bg-[#FFD93D] p-8 text-black">
              <p className="text-sm font-black uppercase tracking-[0.22em]">Loading</p>
              <p className="mt-2 text-base font-bold">Fetching challenges…</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sortedChallenges.map((challenge, index) => (
                <Link
                  to={`/leetcode/${challenge.id}`}
                  key={challenge.id}
                  className={cn(
                    "neo-panel neo-panel-hover block bg-white p-5",
                    index % 3 === 0 && "rotate-[-1deg]",
                    index % 3 === 1 && "rotate-[1deg]",
                  )}
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black">
                    {challenge.patternTitle}
                  </p>
                  <h3 className="mt-3 text-xl font-black uppercase text-black">
                    {challenge.dayTitle}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-black">
                    {challenge.shortDescription}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t-4 border-black pt-4 text-[11px] font-black uppercase tracking-[0.18em] text-black">
                    <span className="border-4 border-black bg-[#FFFDF5] px-2 py-1 text-center shadow-[4px_4px_0px_0px_#000]">
                      {challenge.date}
                    </span>
                    <span className="border-4 border-black bg-[#FFD93D] px-2 py-1 text-center shadow-[4px_4px_0px_0px_#000]">
                      {challenge.difficulty}
                    </span>
                    <span className="border-4 border-black bg-[#C4B5FD] px-2 py-1 text-center shadow-[4px_4px_0px_0px_#000]">
                      {challenge.timeToSolve}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="neo-panel bg-[#FFD93D] p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black">
              Top Scorers
            </p>
            <p className="mt-2 text-2xl font-black uppercase text-black">
              Today’s leaders
            </p>
          </div>

          <div className="neo-panel bg-white p-4">
            {!safeLeaderboard.length ? (
              <div className="border-4 border-black bg-white p-4 text-black shadow-[4px_4px_0px_0px_#000]">
                <p className="text-sm font-bold">Loading leaderboard…</p>
              </div>
            ) : (
              <>
                <div className="hidden space-y-3 lg:block">
                  {topLeaderboardDesktop.map((entry, index) => (
                    <Link
                      key={entry.id}
                      to={`/profile/${entry.id}`}
                      className={cn(
                        "neo-panel-hover block border-4 border-black bg-[#FFFDF5] px-4 py-4 shadow-[4px_4px_0px_0px_#000] transition duration-200",
                        index === 0 && "bg-[#FF6B6B]",
                        index === 1 && "bg-[#FFD93D]",
                        index === 2 && "bg-[#C4B5FD]",
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black uppercase text-black">
                            #{index + 1} {entry.name}
                          </p>
                          <p className="mt-1 text-xs font-bold text-black">
                            score: {entry.score}
                          </p>
                        </div>
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

                <div className="space-y-3 lg:hidden">
                  {topLeaderboardMobile.map((entry, index) => (
                    <Link
                      key={entry.id}
                      to={`/profile/${entry.id}`}
                      className={cn(
                        "block border-4 border-black bg-white px-4 py-3 text-black shadow-[4px_4px_0px_0px_#000]",
                        index === 0 && "bg-[#FF6B6B]",
                        index === 1 && "bg-[#FFD93D]",
                        index === 2 && "bg-[#C4B5FD]",
                      )}
                    >
                      <p className="text-sm font-black uppercase">
                        #{index + 1} {entry.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ChallengePage;
