const dashboardOverview = {
  profile: {
    name: "Mira Hassan",
    level: "Intermediate",
    weeklyGoal: "Developer learning workspace",
  },
  stats: {
    streak: 18,
    points: 4280,
    completed: 56,
    consistency: 84,
  },
  todayChallenge: {
    title: "Two Sum, then two variants",
    description:
      "Solve the classic pair-sum question, then extend it with sorted input and duplicate handling.",
    difficulty: "Medium",
    time: 25,
    points: 120,
    href: "/leetcode",
  },
  continueLearning: {
    title: "Hash Maps and Frequency Counting",
    description:
      "Revisit the patterns that unlock fast solutions for arrays and strings.",
    progress: 72,
    lessonsCompleted: 8,
    totalLessons: 12,
    href: "/dashboard/dsa",
  },
  miniLeaderboard: [
    { rank: 1, user: "Ava Chen", points: 12480 },
    { rank: 2, user: "Noah Kim", points: 11820 },
    { rank: 3, user: "Lina Patel", points: 10940 },
  ],
};

const workspaceContent = {
  dsa: {
    eyebrow: "DSA Topics",
    title: "Structured problem-solving tracks",
    description:
      "Move through arrays, graphs, trees, and dynamic programming with clearer weekly milestones and less random hopping.",
    primaryCta: { label: "Open challenge library", href: "/leetcode" },
    secondaryCta: { label: "View dashboard", href: "/dashboard" },
    highlights: [
      ["Current topic", "Sliding Window"],
      ["Completed lessons", "11 / 16"],
      ["Next milestone", "Pattern review"],
    ],
    checklist: [
      "Continue the arrays and sliding-window path.",
      "Review two solved problems before starting a new one.",
      "Finish one medium problem and log your notes.",
    ],
  },
  python: {
    eyebrow: "Python Track",
    title: "Beginner-friendly coding momentum",
    description:
      "Jump back into the crash course with short lessons, guided notes, and a steady path from syntax basics to problem solving.",
    primaryCta: { label: "Open Python course", href: "/python-crash-course" },
    secondaryCta: { label: "See progress", href: "/dashboard" },
    highlights: [
      ["Current lesson", "Loops and conditions"],
      ["Course pace", "3 lessons this week"],
      ["Best for", "Rebuilding fundamentals"],
    ],
    checklist: [
      "Resume the next crash-course lesson.",
      "Practice one notebook example from today’s topic.",
      "Pair Python basics with one easy algorithm problem.",
    ],
  },
  challenges: {
    eyebrow: "Daily Challenges",
    title: "One focused problem at a time",
    description:
      "Use the dashboard as your launchpad, then drop straight into the challenge flow that keeps your streak and pattern recognition moving.",
    primaryCta: { label: "Start today’s challenge", href: "/leetcode" },
    secondaryCta: { label: "Review DSA topics", href: "/dashboard/dsa" },
    highlights: [
      ["Difficulty", "Medium"],
      ["Time target", "25 min"],
      ["Reward", "180 pts"],
    ],
    checklist: [
      "Start today’s challenge before the streak window closes.",
      "Write one short reflection after solving.",
      "Compare your approach with a second pattern afterward.",
    ],
  },
  leaderboard: {
    eyebrow: "Leaderboard",
    title: "See how your consistency stacks up",
    description:
      "Use ranking as motivation, not pressure. The goal is visible progress, cleaner practice habits, and a stronger long-term curve.",
    primaryCta: { label: "Open challenge board", href: "/leetcode" },
    secondaryCta: { label: "Go to profile", href: "/dashboard/profile" },
    highlights: [
      ["Your rank", "#12"],
      ["This week", "+320 pts"],
      ["Gap to top 10", "145 pts"],
    ],
    checklist: [
      "Solve one more medium challenge to break into the top 10.",
      "Protect your streak to keep ranking momentum.",
      "Review top performers’ topic consistency each week.",
    ],
  },
  profile: {
    eyebrow: "Profile",
    title: "A cleaner view of your learning identity",
    description:
      "Track your current standing, keep your account details close, and jump into the public profile whenever you want the fuller record.",
    primaryCta: { label: "Open full profile", href: "/profile" },
    secondaryCta: { label: "Back to dashboard", href: "/dashboard" },
    highlights: [
      ["Role", "Member"],
      ["Current score", "4,820"],
      ["Focus", "Daily consistency"],
    ],
    checklist: [
      "Review your profile and completed challenges.",
      "Check whether your score reflects recent practice.",
      "Use the dashboard as your daily launch point.",
    ],
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDashboardOverview() {
  await delay(250);
  return dashboardOverview;
}

export async function getDashboardWorkspace(section) {
  await delay(200);
  return workspaceContent[section] || workspaceContent.dsa;
}
