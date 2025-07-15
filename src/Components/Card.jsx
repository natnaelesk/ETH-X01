import React, { useState } from "react";
import { CheckIcon, PaperAirplaneIcon, FireIcon } from "@heroicons/react/24/solid";

const questions = [
  {
    id: 1,
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    url: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
];

const topStudents = [
  {
    id: 1,
    name: "Natnel",
    avatar: "https://i.pravatar.cc/40?img=1",
    fire: 3,
  },
  {
    id: 2,
    name: "Mikiyas",
    avatar: "https://i.pravatar.cc/40?img=2",
    fire: 2,
  },
  {
    id: 3,
    name: "Saron",
    avatar: "https://i.pravatar.cc/40?img=3",
    fire: 1,
  },
];

const FeatureArticle = () => {
  const [answers, setAnswers] = useState({});
  const [comment, setComment] = useState("");

  const handleCheck = (id) => {
    setAnswers((prev) => ({ ...prev, [id]: { ...prev[id], completed: !prev[id]?.completed } }));
  };

  const handleInputChange = (id, text) => {
    setAnswers((prev) => ({ ...prev, [id]: { ...prev[id], text } }));
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* IMAGE */}
        <div className="w-full h-96 lg:h-full overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://source.unsplash.com/800x600/?technology"
            alt="Feature"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            The Future of Web Development
          </h1>

          <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400">
            What You Should Know in 2025
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            From frameworks like React and Next.js to tools like Firebase, the web dev landscape is evolving. Here’s how you can keep up.
          </p>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={answers[q.id]?.completed || false}
                    onChange={() => handleCheck(q.id)}
                    className="mt-1 size-5 text-orange-600 border-gray-300 rounded"
                  />
                  <div>
                    <a
                      href={q.url}
                      target="_blank"
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {q.title}
                    </a>
                    {answers[q.id]?.completed && (
                      <input
                        type="text"
                        placeholder="Your thoughts..."
                        value={answers[q.id]?.text || ""}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className="mt-2 w-full rounded border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-block rounded-md bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition"
          >
            Submit Progress
          </a>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className="max-w-4xl mx-auto mt-16 space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h3>

        {/* Comment Input */}
        <div className="flex items-start gap-4">
          <img
            src="https://i.pravatar.cc/40?img=11"
            alt="User"
            className="size-10 rounded-full"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 pr-12 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-3 text-orange-500 hover:text-orange-600">
              <PaperAirplaneIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* Top Students */}
        <div className="space-y-3">
          {topStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="size-10 rounded-full"
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {student.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: student.fire }).map((_, idx) => (
                  <FireIcon key={idx} className="size-4 text-orange-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureArticle;
