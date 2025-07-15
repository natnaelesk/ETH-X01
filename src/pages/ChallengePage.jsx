import React from "react";
import { Link } from "react-router-dom";
import SubmissionStatus from "../Components/SubmissionStatus";

const ChallengePage = ({
  challenges = [],
  leaderboard,
  loading = false,
  isLoggedIn = false, // 👈 add this prop
}) => {
 if (loading) {
  return (
    <section className="flex justify-center items-center h-screen text-center px-4">
      <SubmissionStatus status="loading" />
    </section>
  );
}

if (!isLoggedIn) {
  return (
    <section className="flex justify-center items-center h-screen text-center px-4">
      <div className="max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-green-400">
        <h2 className="text-3xl font-bold text-accent mb-4">Access Denied</h2>
        <p className="mb-5 text-lg text-gray-600 dark:text-gray-300">
          You need to <span className="font-semibold">log in</span> to access the challenges.
        </p>
        <Link
          to="/login"
          className="bg-primary text-white px-12 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}


  const safeLeaderboard = Array.isArray(leaderboard) ? leaderboard : [];
  const sortedChallenges = [...challenges].sort(
    (a, b) => b.createdAt?.seconds - a.createdAt?.seconds
  );

  const isMobile = window.innerWidth < 1024;
  const topLeaderboard = isMobile ? safeLeaderboard.slice(0, 5) : safeLeaderboard;

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="lg:text-9xl text-4xl lg:my-10 font-bold mb-12 text-center text-primary font-heading">
        LeetCode Challenge
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <SubmissionStatus status="loading" />
        </div>
      ) : (
        <>
          {/* Leaderboard on mobile (above challenges) */}
          <div className="px-8 block lg:hidden mb-10">
  <h2 className="text-2xl font-bold text-accent mb-4">Top Scorers</h2>
  <div className="space-y-4">
    {topLeaderboard.length ? (
      topLeaderboard.map((user, index) => {
        const crownStyle =
          index === 0
            ? "relative text-white bg-gradient-to-br from-[#7b1c1c] via-[#e11d48] to-[#f87171] shadow-[0_0_25px_#ff1a1a] animate-pulse border-2 border-[#ff4444] glitter-fire"
            : index === 1
            ? "text-white bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-[0_0_20px_#FFD700] border border-yellow-200"
            : index === 2
            ? "text-white bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-[0_0_15px_#C0C0C0] border border-gray-300"
            : "bg-white dark:bg-gray-800";

        return (
          <Link
            to={`/profile/${user.id}`}
            key={user.id}
            className={`relative flex items-center justify-between p-4 rounded-lg shadow border ${crownStyle}`}
          >
            <div className="absolute top-2 left-2 bg-black/10 text-sm px-2 py-1 rounded font-bold">
              #{index + 1}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
              <span className="font-semibold text-gray-800 dark:text-white">
                {user.name}
              </span>
            </div>

            <span className="font-bold text-gray-700 dark:text-white">
              {user.score} pts
            </span>

            {index === 0 && (
              <span
                className="absolute -top-2 -right-2 text-2xl"
                role="img"
                aria-label="Fire King"
              >
                🔥
              </span>
            )}
          </Link>
        );
      })
    ) : (
      <div className="text-center text-light animate-pulse">
        Loading leaderboard...
      </div>
    )}
  </div>
          </div>


          {/* Main content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Challenge Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
  {sortedChallenges.map((challenge, index) => (
    <Link
      to={`/challenge/${challenge.id}`}
      key={challenge.id}
      className={`relative rounded-2xl p-6 min-h-[260px] shadow-md flex flex-col justify-between transition-all duration-300 overflow-visible
        ${
          index === 0
            ? "bg-gradient-to-br from-green-400 via-green-600 to-green-700 text-white shadow-lg"
            : "bg-gradient-to-br from-[#2f2f2f] via-[#3b3b3b] to-[#4b4b4b] text-white border border-gray-700"
        }
      `}
    >
      {index === 0 && (
        <span
          className="absolute -left-8 top-1/2 z-20 transform -translate-y-1/2 text-8xl md:text-8xl select-none pointer-events-none transition-transform duration-300 hover:scale-110"
          style={{ textShadow: "0 0 8px #34d399, 0 0 15px #059669" }}
          aria-label="Rocket"
          role="img"
        >
          🚀
        </span>
      )}
      <div className="mb-4 space-y-1">
        <h3 className="text-xl font-bold">{challenge.patternTitle} - {challenge.dayTitle}</h3>
        <p className="text-sm opacity-80">{challenge.shortDescription}</p>
      </div>
      <div className="mt-auto pt-4 border-t border-white/20 text-xs flex justify-between gap-3">
        <span>📅 {challenge.date}</span>
        <span>🔥 {challenge.difficulty}</span>
        <span>⏱ {challenge.timeToSolve}</span>
      </div>
    </Link>
  ))}
</div>


            {/* Leaderboard for desktop */}
            <div className="hidden lg:block space-y-6">
              <h2 className="text-2xl font-bold text-accent mb-4">Top Scorers</h2>
              <div className="space-y-4">
                {safeLeaderboard.length ? (
                  safeLeaderboard.map((user, index) => {
                  const crownStyle =
                  index === 0
                    ? "relative text-white bg-gradient-to-br from-[#7b1c1c] via-[#e11d48] to-[#f87171] shadow-[0_0_25px_#ff1a1a] animate-pulse border-2 border-[#ff4444] glitter-fire"
                    : index === 1
                    ? "text-white bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-[0_0_20px_#FFD700] border border-yellow-200"
                    : index === 2
                    ? "text-white bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-[0_0_15px_#C0C0C0] border border-gray-300"
                    : "bg-white dark:bg-gray-800";
                    return (
                      <Link
                        to={`/profile/${user.id}`}
                        key={user.id}
                        className={`relative flex items-center justify-between p-4 rounded-lg shadow border ${crownStyle}`}
                      >
                        <div className="absolute top-2 left-2 bg-black/10 text-sm px-2 py-1 rounded font-bold">
                            #{index + 1}
                          </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                          />
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {user.name}
                          </span>
                        </div>
                        <span className="font-bold text-gray-700 dark:text-white">
                          {user.score} pts
                        </span>
                        {index === 0 && (
                          <span className="absolute -top-2 -right-2 text-2xl"></span>
                        )}
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-center text-gray-500 animate-pulse">
                    Loading leaderboard...
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ChallengePage;
