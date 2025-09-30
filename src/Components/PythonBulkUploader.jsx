// PythonBulkUploader.jsx
import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";

// Sample Python challenges data (Python Crash Course inspired)
const pythonChallenges = [
  {
    "day": 2,
    "date": "2025-9-30",
    "title": "Variables & Data Types",
    "topic": "Variables, data types & type casting",
    "estimatedTime": "60 minutes",
    "difficulty": "Beginner",
    "shortDescription": "Learn how to store data using variables and explore Python's basic data types.",
    "objectives": "1. Understand what variables are and why we use them. 2. Explore basic data types (int, float, str, bool). 3. Learn naming rules and conventions. 4. Practice converting between types (type casting).",
    "instructions": "1. Open the provided notebook and run cells in order. 2. Read comments & explanations. 3. Work through the included exercises. 4. Complete the quiz in the notebook. 5. Submit your code results.",
    "example": "age = 25\nname = \"Alice\"\nheight = 1.75\nprint(f\"{name} is {age} years old and {height}m tall\")\nconverted = int(\"10\") + 5\nprint(converted)",
    "youtubeLink": "https://www.youtube.com/watch?v=KeA39II7AO8",
    "notebookLink": "https://colab.research.google.com/drive/1XsSwhadpxBG4MRLLD50xmm7L1EFQZs5d?usp=sharing"
  },
];

const PythonBulkUploader = () => {
  const [status, setStatus] = useState("");

  const uploadAll = async () => {
    try {
      setStatus("Uploading Python challenges...");

      for (const challenge of pythonChallenges) {
        // Check if challenge already exists (by day number)
        const q = query(
          collection(db, "pythonChallenges"),
          where("day", "==", challenge.day)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          console.log(`⏭️ Skipped Day ${challenge.day} - ${challenge.title} (already exists)`);
          continue;
        }

        await addDoc(collection(db, "pythonChallenges"), {
          ...challenge,
          createdAt: new Date(),
        });

        console.log(`✅ Uploaded: Day ${challenge.day} - ${challenge.title}`);
      }

      setStatus("✅ All Python challenges uploaded (or already existed).");
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("❌ Upload failed. Check console.");
    }
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Bulk Upload Python Challenges</h2>
      <p className="mb-4 text-gray-600">This will upload 5 beginner Python challenges</p>
      <button
        onClick={uploadAll}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
      >
        Upload Python Challenges
      </button>
      <p className="mt-4 text-lg text-gray-700">{status}</p>
      
      {/* Preview of challenges */}
      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Challenges to be uploaded:</h3>
        <div className="space-y-3">
          {pythonChallenges.map((challenge, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold">Day {challenge.day}: {challenge.title}</h4>
              <p className="text-sm text-gray-600">{challenge.shortDescription}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  ⏱ {challenge.estimatedTime}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  ⭐ {challenge.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PythonBulkUploader;