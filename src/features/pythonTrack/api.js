const pythonLessons = [
  {
    id: "python-basics",
    title: "Python Basics",
    description:
      "Start with variables, input, output, and syntax patterns that make the rest of the track feel approachable.",
    duration: 18,
    progress: 100,
    level: "Starter",
    status: "Completed",
  },
  {
    id: "conditions",
    title: "Conditions and Logic",
    description:
      "Build confidence with boolean flow, branching, and the simple logic patterns you will reuse everywhere.",
    duration: 22,
    progress: 76,
    level: "Starter",
    status: "Continue",
  },
  {
    id: "loops",
    title: "Loops and Iteration",
    description:
      "Practice `for` loops, `while` loops, and controlled repetition with small exercises that reinforce mental models.",
    duration: 24,
    progress: 58,
    level: "Core",
    status: "In progress",
  },
  {
    id: "functions",
    title: "Functions and Reuse",
    description:
      "Learn how to break code into reusable blocks with parameters, return values, and cleaner structure.",
    duration: 26,
    progress: 32,
    level: "Core",
    status: "Up next",
  },
  {
    id: "lists",
    title: "Lists and Collections",
    description:
      "Work with arrays, list traversal, and simple collection operations that connect naturally to DSA practice.",
    duration: 28,
    progress: 14,
    level: "Core",
    status: "Locked in sequence",
  },
];

function mockResponse(data, delay = 220) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay);
  });
}

export async function getPythonTrack() {
  return mockResponse(pythonLessons);
}
