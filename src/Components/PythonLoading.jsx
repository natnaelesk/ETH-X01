// PythonLoading.jsx
import React from "react";

const PythonLoading = () => {
  return (
    <section className="flex justify-center items-center h-screen text-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🐍</div>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Loading Python Challenges
        </h2>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Preparing your Python learning journey...
        </p>
      </div>
    </section>
  );
};

export default PythonLoading;