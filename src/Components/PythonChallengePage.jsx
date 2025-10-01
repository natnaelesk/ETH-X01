// PythonChallengePage.jsx - 2025 PURPLE GLOWING UI
import React from "react";
import { Link } from "react-router-dom";
import PythonChallengeCard from "./PythonChallengeCard";

const PythonChallengePage = ({
  challenges = [],
  leaderboard,
  loading = false,
  isLoggedIn = false,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🐍</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Loading Python Challenges</h2>
          <p className="text-purple-300">Preparing your learning journey...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="max-w-md bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-purple-500/30 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            Access Required
          </h2>
          <p className="text-purple-200 mb-6">
            Sign in to access Python challenges and start your coding journey.
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform inline-block"
          >
            Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  // FIXED: Proper date comparison like in inspiration code
// FIXED: Proper date filtering for today and past challenges
const today = new Date();
today.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison

const sortedChallenges = Array.isArray(challenges)
  ? [...challenges]
      .filter((ch) => {
        const challengeDate = new Date(ch.date);
        challengeDate.setHours(0, 0, 0, 0); // ignore time component
        return challengeDate <= today; // only today or past
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
  : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      {/* Consistent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-gray-900/50 to-black/50"></div>
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-4 bg-purple-800/50 backdrop-blur-sm px-8 py-4 rounded-full mb-8 border border-purple-500/30">
          <span className="text-3xl">🐍</span>
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PYTHON CRASH COURSE
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 bg-clip-text text-transparent">
          Start Coding
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed mb-12">
          Master Python from zero to hero with daily challenges inspired by Eric Matthes. 
          Build real skills, create amazing projects, and join a community of learners.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Beginner Friendly</h3>
            <p className="text-purple-300 text-sm">No prior experience needed</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 text-center">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-white mb-2">Daily Lessons</h3>
            <p className="text-purple-300 text-sm">Step-by-step learning path</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 text-center">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-lg font-bold text-white mb-2">Build Portfolio</h3>
            <p className="text-purple-300 text-sm">Real projects & exercises</p>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="relative max-w-7xl mx-auto px-4 pb-20">
        {sortedChallenges.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm p-12 rounded-3xl border border-purple-500/30 shadow-2xl">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin?</h3>
              <p className="text-purple-300 mb-6">
                {challenges.length === 0 
                  ? "Python challenges are being prepared. Check back soon for exciting lessons!" 
                  : "New challenges are coming your way. Stay tuned for the next lesson!"}
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedChallenges.map((challenge, index) => (
              <PythonChallengeCard 
                key={challenge.id}
                challenge={challenge}
                isLatest={index === 0}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonChallengePage;