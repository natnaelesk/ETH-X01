// PythonBulkUploader.jsx
import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";

// Sample Python challenges data (Python Crash Course inspired)
const pythonChallenges = [
  {
    "day": 3,
    "date": "2025-10-02",
    "title": "Python Operators - Arithmetic, Comparison, and Logical",
    "topic": "Operators",
    "estimatedTime": "30 minutes",
    "difficulty": "Beginner",
    "shortDescription": "Learn how to perform operations using Python's built-in operators.",
    "objectives": "1. Understand arithmetic, comparison, and logical operators. 2. Apply operators in real-world scenarios. 3. Write expressions using operators.",
    "instructions": "1. Explore Python's arithmetic operators (+, -, *, /, //, %, **). 2. Learn about comparison operators (==, !=, <, >, <=, >=). 3. Understand logical operators (and, or, not). 4. Practice using these operators in expressions.",
    "example": "x = 10\ny = 5\nprint(\"Addition:\", x + y)\nprint(\"Equality Check:\", x == y)\nprint(\"Logical AND:\", x > 5 and y < 10)",
    "youtubeLink": "https://www.youtube.com/watch?v=7BxUaeROVXI",
    "notebookLink": "https://colab.research.google.com/drive/your-notebook-link-here"
  },
  {
    "day": 4,
    "date": "2025-10-03",
    "title": "Conditional Statements in Python",
    "topic": "if, elif, else",
    "estimatedTime": "30 minutes",
    "difficulty": "Beginner",
    "shortDescription": "Learn how to make decisions in Python using conditional statements.",
    "objectives": "1. Understand how 'if', 'elif', and 'else' work. 2. Apply conditional logic in programs. 3. Create simple decision-making scripts.",
    "instructions": "1. Use 'if' statements to check conditions. 2. Use 'elif' for multiple conditions. 3. Use 'else' for fallback logic. 4. Practice nested conditionals.",
    "example": "age = 18\nif age >= 18:\n    print(\"You are an adult\")\nelif age >= 13:\n    print(\"You are a teenager\")\nelse:\n    print(\"You are a child\")",
    "youtubeLink": "https://www.youtube.com/watch?v=f4KOjWS_KZs", // short beginner tutorial
    "notebookLink": "https://colab.research.google.com/drive/your-day4-notebook-link-here"
  },
   {
    "day": 5,
    "date": "2025-10-04",
    "title": "Python Loops - for & while",
    "topic": "Loops & Iteration",
    "estimatedTime": "40 minutes",
    "difficulty": "Beginner",
    "shortDescription": "Learn how to repeat code efficiently using 'for' and 'while' loops in Python.",
    "objectives": "1. Understand 'for' loops and iterables. 2. Understand 'while' loops and conditions. 3. Practice using loops to automate tasks.",
    "instructions": "1. Write 'for' loops to iterate over lists or ranges. 2. Write 'while' loops to repeat actions until a condition is false. 3. Combine loops with conditionals for practical exercises.",
    "example": "for i in range(5):\n    print(i)\n\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1",
    "youtubeLink": "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", // concise tutorial <10 min
    "notebookLink": "https://colab.research.google.com/drive/your-day5-notebook-link-here"
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