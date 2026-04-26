const dsaTopics = [
  {
    id: "arrays",
    category: "Core",
    title: "Arrays",
    description:
      "Traversal, subarrays, prefix sums, and the patterns behind fast array solutions.",
    lessons: 12,
    progress: 68,
  },
    {
    id: "hash-maps",
    category: "Core",
    title: "Hash Maps",
    description:
      "Counting, caching, and constant-time lookup strategies for everyday problems.",
    lessons: 9,
    progress: 52,
  },
  {
    id: "trees",
    category: "Advanced",
    title: "Trees",
    description:
      "Binary tree recursion, traversal patterns, and balanced search structures.",
    lessons: 14,
    progress: 36,
  },
  {
    id: "graphs",
    category: "Advanced",
    title: "Graphs",
    description:
      "Breadth-first search, depth-first search, and connectivity-based problem solving.",
    lessons: 10,
    progress: 24,
  },
  {
    id: "stacks-queues",
    category: "Core",
    title: "Stacks and Queues",
    description:
      "Order-sensitive patterns, monotonic stacks, and queue-based traversal.",
    lessons: 8,
    progress: 81,
  },
  {
    id: "dynamic-programming",
    category: "Advanced",
    title: "Dynamic Programming",
    description:
      "Subproblem decomposition, memoization, and bottom-up optimization strategies.",
    lessons: 16,
    progress: 18,
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
