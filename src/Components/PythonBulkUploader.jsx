// PythonBulkUploader.jsx
import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";

// Sample Python challenges data (Python Crash Course inspired)
const pythonChallenges = [
  {
    day: 1,
    title: "Python Basics - Variables and Print",
    topic: "Variables & Output",
    date: "2024-01-15",
    estimatedTime: "30 minutes",
    difficulty: "Beginner",
    shortDescription: "Learn variables and print function",
    objectives: "Understand how to create variables and display output in Python",
    instructions: "1. Create a variable called 'name' and assign your name to it\n2. Create a variable called 'age' and assign your age to it\n3. Print a message that says: 'Hello, my name is [name] and I am [age] years old.'\n4. Try using different data types: string, integer, and float",
    example: "name = \"Alice\"\nage = 25\nprint(f\"Hello, my name is {name} and I am {age} years old.\")"
  },
  {
    day: 2,
    title: "Data Types and Basic Operations",
    topic: "Data Types & Operations",
    date: "2024-01-16",
    estimatedTime: "45 minutes",
    difficulty: "Beginner",
    shortDescription: "Learn about different data types and basic operations",
    objectives: "Understand strings, numbers, booleans and basic mathematical operations",
    instructions: "1. Create variables of different types: string, integer, float, boolean\n2. Perform basic math operations: addition, subtraction, multiplication, division\n3. Practice string concatenation and methods\n4. Create a simple calculator that adds two numbers",
    example: "# Numbers\nx = 10\ny = 3.5\nresult = x + y\n\n# Strings\nname = \"Python\"\ngreeting = \"Hello \" + name\n\n# Boolean\nis_fun = True"
  },
  {
    day: 3,
    title: "Lists and List Methods",
    topic: "Lists & Collections",
    date: "2024-01-17",
    estimatedTime: "40 minutes",
    difficulty: "Beginner",
    shortDescription: "Learn about Python lists and common operations",
    objectives: "Understand how to create, access, and manipulate lists in Python",
    instructions: "1. Create a list of your favorite fruits\n2. Add a new fruit to the list\n3. Remove a fruit from the list\n4. Sort the list alphabetically\n5. Print the first and last items in the list",
    example: "fruits = ['apple', 'banana', 'orange']\nfruits.append('grape')\nfruits.remove('banana')\nfruits.sort()\nprint(f\"First fruit: {fruits[0]}\")\nprint(f\"Last fruit: {fruits[-1]}\")"
  },
  {
    day: 4,
    title: "If Statements and Conditional Logic",
    topic: "Conditionals",
    date: "2024-01-18",
    estimatedTime: "35 minutes",
    difficulty: "Beginner",
    shortDescription: "Learn conditional statements and decision making",
    objectives: "Understand if, elif, else statements and comparison operators",
    instructions: "1. Create a program that checks if a number is positive, negative, or zero\n2. Check if a person is eligible to vote (age >= 18)\n3. Create a simple grade calculator (A: 90-100, B: 80-89, etc.)\n4. Check if a year is a leap year",
    example: "age = 20\nif age >= 18:\n    print(\"You can vote!\")\nelse:\n    print(\"You cannot vote yet.\")"
  },
  {
    day: 5,
    title: "For Loops and Range",
    topic: "Loops",
    date: "2024-01-19",
    estimatedTime: "40 minutes",
    difficulty: "Beginner",
    shortDescription: "Learn about for loops and iteration",
    objectives: "Understand how to use for loops with lists, strings, and range",
    instructions: "1. Print numbers from 1 to 10 using a for loop\n2. Iterate through a list of names and greet each person\n3. Calculate the sum of numbers from 1 to 100\n4. Print each character in your name on a new line",
    example: "# Print numbers 1-10\nfor i in range(1, 11):\n    print(i)\n\n# Greet each person\nnames = ['Alice', 'Bob', 'Charlie']\nfor name in names:\n    print(f\"Hello, {name}!\")"
  }
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