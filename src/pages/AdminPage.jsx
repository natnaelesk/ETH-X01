import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase";

const AdminPage = () => {
  const [patternTitle, setPatternTitle] = useState("");
  const [dayTitle, setDayTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [date, setDate] = useState("");
  const [timeToSolve, setTimeToSolve] = useState("");
  const [questions, setQuestions] = useState([
    { name: "", link: "" },
    { name: "", link: "" },
    { name: "", link: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleQuestionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patternTitle || !dayTitle || !shortDescription || !longDescription || !date || !timeToSolve) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "challenges"), {
        patternTitle,
        dayTitle,
        shortDescription,
        longDescription,
        difficulty,
        date,
        timeToSolve,
        questions,
        createdAt: Timestamp.now(),
      });

      setMessage("Challenge posted successfully!");
      setPatternTitle("");
      setDayTitle("");
      setShortDescription("");
      setLongDescription("");
      setDifficulty("Easy");
      setDate("");
      setTimeToSolve("");
      setQuestions([
        { name: "", link: "" },
        { name: "", link: "" },
        { name: "", link: "" },
      ]);
    } catch (error) {
      console.error("Error posting challenge:", error);
      setMessage("Failed to post challenge.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Post New Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Pattern Title (e.g. Sliding Window)"
          value={patternTitle}
          onChange={(e) => setPatternTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Day Title (e.g. Day 1)"
          value={dayTitle}
          onChange={(e) => setDayTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Long Description"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Time to solve (e.g. 30 mins)"
          value={timeToSolve}
          onChange={(e) => setTimeToSolve(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">Questions (3)</h4>
          {questions.map((q, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder={`Q${index + 1} Name`}
                value={q.name}
                onChange={(e) => handleQuestionChange(index, "name", e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
              <input
                type="url"
                placeholder="Link"
                value={q.link}
                onChange={(e) => handleQuestionChange(index, "link", e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          {loading ? "Posting..." : "Post Challenge"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default AdminPage;