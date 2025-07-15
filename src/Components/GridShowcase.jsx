import React from "react";
import { FireIcon, TrophyIcon } from "@heroicons/react/24/solid";

const GridShowcase = ({ challenges = [], topUsers = [] }) => {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        LeetCode Challenge
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">🏆 Top Scorers</h3>
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className={`relative flex items-center gap-4 p-4 rounded-lg shadow-md ${
                index === 0
                  ? "bg-yellow-100 border-l-8 border-yellow-500 animate-pulse"
                  : index === 1
                  ? "bg-slate-100 border-l-4 border-slate-400"
                  : index === 2
                  ? "bg-orange-100 border-l-4 border-orange-400"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <span className="text-lg font-bold text-gray-500 absolute -left-6 top-1/2 -translate-y-1/2">
                {index + 1}
              </span>
              <img src={user.avatar} alt={user.name} className="size-10 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
              </div>
              <div className="text-sm font-bold text-gray-700 flex items-center gap-1">
                {user.score} pts
              </div>
              {index === 0 && (
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <FireIcon className="w-6 h-6 text-orange-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Challenge Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {challenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`rounded-2xl p-6 min-h-[280px] shadow-md flex flex-col justify-between transition-all duration-300
                  ${index === 0
                    ? "lg:col-span-2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"}
                `}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold">
                    {challenge.title}
                  </h3>
                  <p className={`mt-2 text-sm ${index === 0 ? "text-white/80" : "text-gray-500 dark:text-gray-300"}`}>
                    {challenge.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/20 dark:border-gray-700 text-xs flex justify-between gap-3">
                  <span className="flex items-center gap-1">📅 {challenge.date}</span>
                  <span className="flex items-center gap-1">🔥 {challenge.difficulty}</span>
                  <span className="flex items-center gap-1">⏱ {challenge.timeToSolve}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridShowcase;
