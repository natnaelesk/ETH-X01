import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";

// Paste your full JSON here
const challenges = [
  {
    "patternTitle": "Binary Search",
    "dayTitle": "Day 12",
    "shortDescription": "Search boundaries and optimized search algorithms.",
    "difficulty": "Hard",
    "timeToSolve": "45 mins",
    "questions": [
      {
        "name": "Median of Two Sorted Arrays",
        "link": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
      },
      {
        "name": "Find Peak Element",
        "link": "https://leetcode.com/problems/find-peak-element/"
      },
      {
        "name": "Koko Eating Bananas",
        "link": "https://leetcode.com/problems/koko-eating-bananas/"
      }
    ],
    "createdAt": {
      "_seconds": 1752884825,
      "_nanoseconds": 0
    },
    "date": "2025-07-24",
    "dayNumber": 12,
    "longDescription": "This challenge is part of the Binary Search series. The goal is to strengthen your skills in Binary Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  },
  {
    "patternTitle": "Depth-First Search (DFS)",
    "dayTitle": "Day 13",
    "shortDescription": "Learn recursion and DFS through trees and graphs.",
    "difficulty": "Easy",
    "timeToSolve": "30 mins",
    "questions": [
      {
        "name": "Maximum Depth of Binary Tree",
        "link": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        "name": "Invert Binary Tree",
        "link": "https://leetcode.com/problems/invert-binary-tree/"
      },
      {
        "name": "Path Sum",
        "link": "https://leetcode.com/problems/path-sum/"
      }
    ],
    "createdAt": {
      "_seconds": 1752971225,
      "_nanoseconds": 0
    },
    "date": "2025-07-25",
    "dayNumber": 13,
    "longDescription": "This challenge is part of the Depth-First Search (DFS) series. The goal is to strengthen your skills in Depth-First Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  },
  {
    "patternTitle": "Depth-First Search (DFS)",
    "dayTitle": "Day 14",
    "shortDescription": "DFS on graphs and backtracking problems.",
    "difficulty": "Medium",
    "timeToSolve": "35 mins",
    "questions": [
      {
        "name": "Number of Islands",
        "link": "https://leetcode.com/problems/number-of-islands/"
      },
      {
        "name": "Clone Graph",
        "link": "https://leetcode.com/problems/clone-graph/"
      },
      {
        "name": "Letter Combinations of a Phone Number",
        "link": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      }
    ],
    "createdAt": {
      "_seconds": 1753057625,
      "_nanoseconds": 0
    },
    "date": "2025-07-26",
    "dayNumber": 14,
    "longDescription": "This challenge is part of the Depth-First Search (DFS) series. The goal is to strengthen your skills in Depth-First Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  },
  {
    "patternTitle": "Depth-First Search (DFS)",
    "dayTitle": "Day 15",
    "shortDescription": "Tougher backtracking and recursive patterns.",
    "difficulty": "Hard",
    "timeToSolve": "45 mins",
    "questions": [
      {
        "name": "Word Search",
        "link": "https://leetcode.com/problems/word-search/"
      },
      {
        "name": "Generate Parentheses",
        "link": "https://leetcode.com/problems/generate-parentheses/"
      },
      {
        "name": "N-Queens",
        "link": "https://leetcode.com/problems/n-queens/"
      }
    ],
    "createdAt": {
      "_seconds": 1753144025,
      "_nanoseconds": 0
    },
    "date": "2025-07-27",
    "dayNumber": 15,
    "longDescription": "This challenge is part of the Depth-First Search (DFS) series. The goal is to strengthen your skills in Depth-First Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  },
  {
    "patternTitle": "Breadth-First Search (BFS)",
    "dayTitle": "Day 16",
    "shortDescription": "Start of BFS: shortest paths and graph traversal.",
    "difficulty": "Easy",
    "timeToSolve": "30 mins",
    "questions": [
      {
        "name": "Binary Tree Level Order Traversal",
        "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      {
        "name": "Minimum Depth of Binary Tree",
        "link": "https://leetcode.com/problems/minimum-depth-of-binary-tree/"
      },
      {
        "name": "Word Ladder",
        "link": "https://leetcode.com/problems/word-ladder/"
      }
    ],
    "createdAt": {
      "_seconds": 1753230425,
      "_nanoseconds": 0
    },
    "date": "2025-07-28",
    "dayNumber": 16,
    "longDescription": "This challenge is part of the Breadth-First Search (BFS) series. The goal is to strengthen your skills in Breadth-First Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  },
  {
    "patternTitle": "Breadth-First Search (BFS)",
    "dayTitle": "Day 17",
    "shortDescription": "BFS on graphs: shortest path, grid traversal, and queue usage.",
    "difficulty": "Medium",
    "timeToSolve": "35 mins",
    "questions": [
      {
        "name": "Rotting Oranges",
        "link": "https://leetcode.com/problems/rotting-oranges/"
      },
      {
        "name": "Course Schedule",
        "link": "https://leetcode.com/problems/course-schedule/"
      },
      {
        "name": "Perfect Squares",
        "link": "https://leetcode.com/problems/perfect-squares/"
      }
    ],
    "createdAt": {
      "_seconds": 1753316825,
      "_nanoseconds": 0
    },
    "date": "2025-07-29",
    "dayNumber": 17,
    "longDescription": "This challenge is part of the Breadth-First Search (BFS) series. The goal is to strengthen your skills in Breadth-First Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  },
  {
    "patternTitle": "Breadth-First Search (BFS)",
    "dayTitle": "Day 18",
    "shortDescription": "Tough BFS patterns involving weighted graphs or state expansion.",
    "difficulty": "Hard",
    "timeToSolve": "45 mins",
    "questions": [
      {
        "name": "Word Ladder II",
        "link": "https://leetcode.com/problems/word-ladder-ii/"
      },
      {
        "name": "Swim in Rising Water",
        "link": "https://leetcode.com/problems/swim-in-rising-water/"
      },
      {
        "name": "Snakes and Ladders",
        "link": "https://leetcode.com/problems/snakes-and-ladders/"
      }
    ],
    "createdAt": {
      "_seconds": 1753403225,
      "_nanoseconds": 0
    },
    "date": "2025-07-30",
    "dayNumber": 18,
    "longDescription": "This challenge is part of the Breadth-First Search (BFS) series. The goal is to strengthen your skills in Breadth-First Search by solving real LeetCode problems. Make sure to understand the patterns deeply as they are essential for coding interviews."
  }
];

const BulkUploader = () => {
  const [status, setStatus] = useState("");

  const uploadAll = async () => {
    try {
      setStatus("Uploading...");

      for (const challenge of challenges) {
        // 🛡️ Skip if already uploaded (by date + dayTitle)
        const q = query(
          collection(db, "challenges"),
          where("date", "==", challenge.date),
          where("dayTitle", "==", challenge.dayTitle)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          console.log(`⏭️ Skipped ${challenge.dayTitle} (${challenge.date}) — already exists`);
          continue;
        }

        await addDoc(collection(db, "challenges"), {
          ...challenge,
          createdAt: new Date(), // optional override
        });

        console.log("✅ Uploaded:", challenge.dayTitle);
      }

      setStatus("✅ All challenges uploaded (or already existed).");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed. Check console.");
    }
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Bulk Upload Challenges</h2>
      <button
        onClick={uploadAll}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold"
      >
        Run Upload
      </button>
      <p className="mt-4 text-lg text-gray-700">{status}</p>
    </div>
  );
};

export default BulkUploader;
