/** UI-only mock data for LeetCode-style challenges and leaderboard. */

export const leetcodeChallenges = [
  {
    id: "lc-001",
    date: "2026-05-02",
    patternTitle: "Arrays & Hashing",
    dayTitle: "Two Sum Variants",
    shortDescription:
      "Warm up with complement lookups and hash maps before tackling follow-ups with sorted arrays.",
    longDescription:
      "Given an array of integers, return indices of the two numbers such that they add up to a target. Extend the mental model to handle duplicates and sorted inputs without changing the core O(n) structure.",
    difficulty: "Easy",
    timeToSolve: "25 min",
  },
  {
    id: "lc-002",
    date: "2026-05-01",
    patternTitle: "Sliding Window",
    dayTitle: "Longest Substring Without Repeating",
    shortDescription:
      "Shrink and grow a window while tracking character frequency to nail linear-time string scans.",
    longDescription:
      "Maintain a sliding window over the string and update the maximum length whenever all characters inside the window are unique. Practice the invariant: expand right, contract left when a repeat appears.",
    difficulty: "Medium",
    timeToSolve: "35 min",
  },
  {
    id: "lc-003",
    date: "2026-04-30",
    patternTitle: "Binary Trees",
    dayTitle: "Level Order Traversal",
    shortDescription:
      "Use a queue to visit nodes layer by layer and build confidence with tree BFS patterns.",
    longDescription:
      "Return the level-order traversal of a binary tree’s node values. Focus on queue discipline: enqueue children only after dequeuing the current frontier.",
    difficulty: "Medium",
    timeToSolve: "30 min",
  },
  {
    id: "lc-004",
    date: "2026-04-29",
    patternTitle: "Graphs",
    dayTitle: "Number of Islands",
    shortDescription:
      "Flood-fill connected components on a grid and solidify DFS/BFS on implicit graphs.",
    longDescription:
      "Count distinct islands in a binary grid where adjacent land cells merge. Mark visited cells in-place or with a separate structure to avoid cycles.",
    difficulty: "Medium",
    timeToSolve: "40 min",
  },
  {
    id: "lc-005",
    date: "2026-04-28",
    patternTitle: "Dynamic Programming",
    dayTitle: "House Robber",
    shortDescription:
      "Choose a linear DP state that captures “take or skip” decisions along a street of houses.",
    longDescription:
      "Maximize loot without robbing two adjacent houses. Define dp[i] as the best score up to index i and relate it to dp[i-1] and dp[i-2].",
    difficulty: "Easy",
    timeToSolve: "28 min",
  },
];

export const leetcodeLeaderboard = [
  { id: "u-ava", name: "Ava Chen", score: 12480, avatar: "" },
  { id: "u-noah", name: "Noah Kim", score: 11820, avatar: "" },
  { id: "u-lina", name: "Lina Patel", score: 10940, avatar: "" },
  { id: "u-mira", name: "Mira Hassan", score: 10410, avatar: "" },
  { id: "u-jon", name: "Jon Tesfaye", score: 9880, avatar: "" },
  { id: "u-sam", name: "Sam Okonkwo", score: 9420, avatar: "" },
  { id: "u-ria", name: "Ria Nair", score: 9100, avatar: "" },
  { id: "u-leo", name: "Leo Martins", score: 8750, avatar: "" },
];

export function getChallengeById(id) {
  return leetcodeChallenges.find((c) => c.id === id) || null;
}
