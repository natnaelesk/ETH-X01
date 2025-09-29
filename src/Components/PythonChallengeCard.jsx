// PythonChallengeCard.jsx - Fancier Dark & Purple Version
import React from "react";
import { Link } from "react-router-dom";

const PythonChallengeCard = ({ challenge, isLatest = false }) => {
  const isShiny = challenge.shiny === true;

  return (
    <Link
      to={`/challenge/python/${challenge.id}`}
      className={`group relative rounded-2xl p-6 min-h-[280px] flex flex-col justify-between transition-all duration-500 overflow-hidden border
        ${
          isShiny
            ? "bg-gradient-to-br from-purple-600/80 via-purple-800/80 to-gray-900/90 border-purple-400/50 shadow-xl"
            : "bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-gray-700/40 shadow-md"
        }
        ${isLatest ? "ring-2 ring-blue-400" : ""}
        hover:scale-[1.04] hover:shadow-purple-500/20 transform-gpu backdrop-blur-md
        animate-fadeIn
      `}
    >
      {/* SHINY ANIMATED BORDER */}
      {isShiny && (
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-gradient-x">
          <div className="w-full h-full bg-gray-900/80 rounded-2xl"></div>
        </div>
      )}

      {/* NEW BADGE */}
      {isLatest && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          NEW
        </div>
      )}

      {/* CARD CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              isShiny
                ? "bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-md"
                : "bg-gray-700/80 text-gray-200"
            }`}
          >
            {isShiny ? "✨" : "🐍"}
          </div>
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              isShiny
                ? "bg-white/20 text-white"
                : "bg-gray-700/70 text-gray-300"
            }`}
          >
            Day {challenge.day}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-purple-300 transition-colors">
          {challenge.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className={`text-sm mb-4 leading-relaxed ${
            isShiny ? "text-purple-100" : "text-gray-300"
          }`}
        >
          {challenge.shortDescription}
        </p>

        {/* TOPIC */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              isShiny
                ? "bg-white/20 text-white"
                : "bg-gray-700/80 text-gray-300"
            }`}
          >
            📚 {challenge.topic}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10">
        <div className="pt-4 border-t border-current/20 flex justify-between items-center text-xs">
          <span
            className={`flex items-center gap-1 ${
              isShiny ? "text-purple-200" : "text-gray-400"
            }`}
          >
            📅 {challenge.date}
          </span>
          <span
            className={`flex items-center gap-1 ${
              isShiny ? "text-purple-200" : "text-gray-400"
            }`}
          >
            ⏱ {challenge.estimatedTime}
          </span>
          <span
            className={`px-2 py-1 rounded-full font-medium ${
              challenge.difficulty === "Beginner"
                ? "bg-green-500/20 text-green-300"
                : challenge.difficulty === "Easy"
                ? "bg-blue-500/20 text-blue-300"
                : challenge.difficulty === "Medium"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            ⭐ {challenge.difficulty}
          </span>
        </div>
      </div>

      {/* HOVER LIGHT OVERLAY */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isShiny
            ? "bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10"
            : "bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5"
        }`}
      ></div>
    </Link>
  );
};

export default PythonChallengeCard;
