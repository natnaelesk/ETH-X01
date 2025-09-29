// PythonAdminPanel.jsx
import React, { useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PythonAdminPanel = () => {
  const [formData, setFormData] = useState({
    day: "",
    title: "",
    topic: "",
    date: "",
    estimatedTime: "30 minutes",
    difficulty: "Beginner",
    shortDescription: "",
    objectives: "",
    instructions: "",
    example: "",
    youtubeLink: "",
    notebookLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const challengeData = {
        ...formData,
        day: parseInt(formData.day),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "pythonChallenges"), challengeData);

      alert("Python challenge posted successfully!");
      setFormData({
        day: "",
        title: "",
        topic: "",
        date: "",
        estimatedTime: "30 minutes",
        difficulty: "Beginner",
        shortDescription: "",
        objectives: "",
        instructions: "",
        example: "",
        youtubeLink: "",
        notebookLink: "",
      });
    } catch (error) {
      console.error("Error posting challenge:", error);
      alert("Error posting challenge: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Post Python Challenge</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        {/* Day + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Day Number *</label>
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Python Basics - Variables and Print"
          />
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium mb-1">Topic *</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Variables & Output"
          />
        </div>

        {/* Estimated Time + Difficulty */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Estimated Time</label>
            <select
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="15 minutes">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Short Description *</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Learn variables and print function"
          />
        </div>

        {/* Objectives */}
        <div>
          <label className="block text-sm font-medium mb-1">Learning Objectives *</label>
          <textarea
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Understand how to create variables and display output in Python"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium mb-1">Instructions *</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-2 border rounded font-mono text-sm"
            placeholder="1. Create a variable called 'name'...&#10;2. Create a variable called 'age'..."
          />
        </div>

        {/* Example Code */}
        <div>
          <label className="block text-sm font-medium mb-1">Example Code</label>
          <textarea
            name="example"
            value={formData.example}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded font-mono text-sm"
            placeholder={`name = "Alice"\nage = 25\nprint(f"Hello, my name is {name} and I am {age} years old.")`}
          />
        </div>

        {/* 🔗 YouTube Link */}
        <div>
          <label className="block text-sm font-medium mb-1">YouTube Link</label>
          <input
            type="url"
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* 🔗 Notebook Link */}
        <div>
          <label className="block text-sm font-medium mb-1">Notebook Link</label>
          <input
            type="url"
            name="notebookLink"
            value={formData.notebookLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://colab.research.google.com/..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Post Python Challenge
        </button>
      </form>
    </div>
  );
};

export default PythonAdminPanel;
