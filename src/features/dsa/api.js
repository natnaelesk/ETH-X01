const dsaTopics = [
  {
    id: "arrays",
    category: "Foundation",
    title: "Arrays & Hashing",
    description:
      "Build fast pattern recognition for indexing, frequency maps, prefix ideas, and common interview building blocks.",
    lessons: 14,
    progress: 72,
    problems: 38,
    pace: "4 solved this week",
    nextFocus: "Prefix sums",
  },
  {
    id: "two-pointers",
    category: "Patterns",
    title: "Two Pointers",
    description:
      "Practice left-right movement, sorted array tactics, and compact state transitions for cleaner solutions.",
    lessons: 9,
    progress: 58,
    problems: 21,
    pace: "2 mediums left",
    nextFocus: "Window boundaries",
  },
  {
    id: "stack-queue",
    category: "Core Logic",
    title: "Stacks & Queues",
    description:
      "Strengthen monotonic thinking, parsing flows, and stateful traversal through stack-driven problems.",
    lessons: 11,
    progress: 36,
    problems: 17,
    pace: "Early stage",
    nextFocus: "Monotonic stack",
  },
  {
    id: "trees",
    category: "Traversal",
    title: "Trees & Binary Search Trees",
    description:
      "Work through DFS, BFS, recursion confidence, and structural reasoning across classic tree patterns.",
    lessons: 16,
    progress: 64,
    problems: 29,
    pace: "Strong momentum",
    nextFocus: "Tree diameter",
  },
  {
    id: "graphs",
    category: "Advanced",
    title: "Graphs",
    description:
      "Learn graph traversal, connected components, shortest-path intuition, and problem decomposition.",
    lessons: 13,
    progress: 27,
    problems: 15,
    pace: "Recently started",
    nextFocus: "Topological sort",
  },
  {
    id: "dynamic-programming",
    category: "Advanced",
    title: "Dynamic Programming",
    description:
      "Break larger problems into reusable states and transitions with a calmer, more structured DP workflow.",
    lessons: 18,
    progress: 19,
    problems: 11,
    pace: "Warming up",
    nextFocus: "1D state design",
  },
];

function mockResponse(data, delay = 220) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay);
  });
}

export async function getTopics() {
  return mockResponse(dsaTopics);
}
