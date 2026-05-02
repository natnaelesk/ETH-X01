import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import { leetcodeChallenges, leetcodeLeaderboard } from "../api";

export function LeetcodePage() {
  const challenges = leetcodeChallenges;
  const leaderboard = leetcodeLeaderboard;
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
  const topScorers = leaderboard.slice(0, 10);

  const todayChallengeCard = (
    <>
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
          Featured
        </p>
        <h2 className="text-lg font-black uppercase leading-tight text-black sm:text-xl">
          Today&apos;s Challenge
        </h2>
      </div>

      {featuredChallenge ? (
        <Link
          to={`/challenges/${featuredChallenge.id}`}
          className={cn(
            "neo-panel neo-panel-hover group mt-4 block border-4 border-black bg-[#FFD93D] p-4 text-black shadow-[4px_4px_0px_0px_#000]",
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/80">
            {featuredChallenge.patternTitle}
          </p>
          <h3 className="mt-2 text-base font-black uppercase leading-snug text-black sm:text-lg">
            {featuredChallenge.dayTitle}
          </h3>
          <p className="mt-2 text-xs font-bold leading-6 text-black line-clamp-4">
            {featuredChallenge.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
            <span className="border-4 border-black bg-white px-2 py-1 font-black uppercase tracking-[0.14em] text-black shadow-[3px_3px_0px_0px_#000]">
              {featuredChallenge.date}
            </span>
            <span className="border-4 border-black bg-[#C4B5FD] px-2 py-1 font-black uppercase tracking-[0.14em] text-black shadow-[3px_3px_0px_0px_#000]">
              {featuredChallenge.difficulty}
            </span>
            <span className="border-4 border-black bg-white px-2 py-1 font-black uppercase tracking-[0.14em] text-black shadow-[3px_3px_0px_0px_#000]">
              {featuredChallenge.timeToSolve}
            </span>
          </div>

          <div className="neo-button mt-4 inline-flex w-full items-center justify-center gap-2 text-xs">
            Start
            <span aria-hidden="true">→</span>
          </div>
        </Link>
      ) : (
        <div className="mt-4 border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
          <p className="text-xs font-bold text-black">
            No challenge is available yet. Check back shortly.
          </p>
        </div>
      )}
    </>
  );

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div
        className={cn(
          "flex flex-col gap-6",
          "lg:grid lg:h-[calc(100dvh-5.5rem)] lg:max-h-[calc(100dvh-5.5rem)] lg:min-h-0",
          "lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)_minmax(200px,280px)] lg:items-stretch lg:gap-6",
        )}
      >
        <aside className="order-1 min-h-0 lg:order-none">
          <div className="lg:sticky lg:top-24">
            <div className="neo-panel relative overflow-hidden border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000] sm:p-5">
              <div className="flex flex-col gap-2">
                <p className="neo-kicker w-fit bg-[#C4B5FD] text-[10px]">
                  Challenges
                </p>
                <h1 className="neo-display text-2xl leading-tight text-black sm:text-3xl">
                  LeetCode Challenges
                </h1>
                <p className="text-xs font-bold leading-6 text-black sm:text-sm">
                  A focused daily challenge feed. Start with today&apos;s
                  problem, keep a steady streak, and track progress without the
                  dashboard clutter.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main
          className={cn(
            "order-3 min-h-0 lg:order-none lg:col-start-2 lg:row-start-1",
            "lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1",
          )}
        >
          <div className="space-y-8 pb-4 lg:space-y-10 xl:grid xl:grid-cols-[minmax(0,1fr)_min(360px,38%)] xl:items-start xl:gap-8 xl:space-y-0">
            <div className="space-y-4 xl:min-w-0">
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                  All Challenges
                </p>
                <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                  Challenge List
                </h2>
              </div>

              <div className="neo-panel divide-y-4 divide-black overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                {(featuredChallenge ? remainingChallenges : sortedChallenges).map(
                  (challenge) => (
                    <Link
                      to={`/challenges/${challenge.id}`}
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
            </div>

            <div className="space-y-4 pb-2 xl:sticky xl:top-0">
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                  Community
                </p>
                <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                  Top Scorers
                </h2>
              </div>

              <div className="neo-panel overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                {!topScorers.length ? (
                  <div className="px-6 py-8">
                    <p className="text-sm font-bold text-black">
                      Leaderboard data will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y-4 divide-black">
                    {topScorers.map((entry, index) => (
                      <div
                        key={entry.id}
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <aside className="order-2 min-h-0 lg:order-none lg:col-start-3 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <div className="neo-panel border-4 border-black bg-[#FFFDF5] p-4 shadow-[6px_6px_0px_0px_#000] sm:p-5">
              {todayChallengeCard}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
