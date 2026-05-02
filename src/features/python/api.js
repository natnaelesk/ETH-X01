/** UI-only mock data for the Python crash course track. */

export const pythonLessons = [
  {
    id: "python-basics",
    title: "Python Basics",
    description:
      "Start with variables, input, output, and syntax patterns that make the rest of the track feel approachable.",
    duration: 18,
    progress: 100,
    level: "Starter",
    status: "Completed",
    notes:
      "Key ideas: indentation defines blocks, dynamic typing keeps early examples short, and `print()` is your feedback loop.",
    quizPreview:
      "Placeholder: 3 multiple-choice questions on variables and `input()` will appear here after backend integration.",
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
    notes:
      "Practice `if` / `elif` / `else`, comparison operators, and truthiness. Sketch decision trees before coding.",
    quizPreview:
      "Placeholder: trace through nested conditions and predict outputs for sample snippets.",
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
    notes:
      "`range()`, loop invariants, and avoiding off-by-one errors. Prefer `for` when the iteration count is known.",
    quizPreview:
      "Placeholder: rewrite a `while` loop as a `for` loop and spot infinite-loop hazards.",
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
    notes:
      "Default arguments, scope, and docstrings. Each function should do one thing well.",
    quizPreview:
      "Placeholder: match signatures to behaviors and fix a shadowing bug in a small example.",
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
    notes:
      "Indexing, slicing, and list comprehensions. Watch for mutability when passing lists into functions.",
    quizPreview:
      "Placeholder: list comprehension drills and complexity intuition for common patterns.",
  },
];

export function getPythonLessonById(id) {
  return pythonLessons.find((l) => l.id === id) || null;
}
