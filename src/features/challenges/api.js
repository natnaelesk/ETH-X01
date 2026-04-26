const dailyChallenges = [
  {
    id: "two-sum",
    difficulty: "Easy",
    title: "Two Sum Refresh",
    description:
      "Warm up with pair-sum reasoning and clean hash-map lookup patterns before moving into variants.",
    time: 15,
    points: 90,
    track: "Arrays",
  },
  {
    id: "sliding-window",
    difficulty: "Medium",
    title: "Longest Repeating Character Replacement",
    description:
      "Practice window resizing and frequency tracking with a high-signal string problem.",
    time: 28,
    points: 140,
    track: "Sliding Window",
  },
  {
    id: "binary-tree",
    difficulty: "Medium",
    title: "Binary Tree Level Order Traversal",
    description:
      "Use queue-based BFS to strengthen tree traversal fluency and layered processing.",
    time: 25,
    points: 130,
    track: "Trees",
  },
  {
    id: "graph-components",
    difficulty: "Hard",
    title: "Count Connected Components",
    description:
      "Break the graph into visited regions and reinforce traversal structure under pressure.",
    time: 35,
    points: 190,
    track: "Graphs",
  },
];

const leaderboardEntries = [
  { rank: 1, user: "Ava Chen", completed: 92, points: 12480 },
  { rank: 2, user: "Noah Kim", completed: 87, points: 11820 },
  { rank: 3, user: "Lina Patel", completed: 81, points: 10940 },
  { rank: 4, user: "Mira Hassan", completed: 74, points: 10410 },
  { rank: 5, user: "Jon Tesfaye", completed: 70, points: 9880 },
];

function mockResponse(data, delay = 220) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay);
  });
}

export async function getChallenges() {
  return mockResponse({
    challenges: dailyChallenges,
    leaderboard: leaderboardEntries,
  });
}
