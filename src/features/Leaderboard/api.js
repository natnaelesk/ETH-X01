const leaderboardEntries = [
  { user: 'Ava Chen', completed: 92, points: 12480, weeklyPoints: 480, streak: 31 },
  { user: 'Noah Kim', completed: 87, points: 11820, weeklyPoints: 430, streak: 24 },
  { user: 'Lina Patel', completed: 81, points: 10940, weeklyPoints: 390, streak: 20 },
  { user: 'Mira Hassan', completed: 74, points: 10410, weeklyPoints: 320, streak: 18 },
  { user: 'Jon Tesfaye', completed: 70, points: 9880, weeklyPoints: 295, streak: 16 },
  { user: 'Sara Ali', completed: 64, points: 9320, weeklyPoints: 272, streak: 14 },
  { user: 'Daniel Okoro', completed: 61, points: 9010, weeklyPoints: 248, streak: 12 },
  { user: 'Fatima Nur', completed: 57, points: 8560, weeklyPoints: 225, streak: 10 },
]

function mockResponse(data, delay = 220) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay)
  })
}

export async function getLeaderboard(period = 'all-time') {
  const sorted = [...leaderboardEntries].sort((a, b) =>
    period === 'weekly' ? b.weeklyPoints - a.weeklyPoints : b.points - a.points,
  )

  const withRanks = sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
    points: period === 'weekly' ? entry.weeklyPoints : entry.points,
  }))

  return mockResponse(withRanks)
}
