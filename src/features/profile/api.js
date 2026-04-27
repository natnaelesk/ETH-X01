const profileData = {
  summary: {
    name: 'Mira Hassan',
    role: 'Backend Engineer',
    location: 'Mogadishu, Somalia',
    email: 'mira@example.com',
    joined: 'January 2026',
    bio: 'Focused on sharpening data structures, clean problem solving, and Python fluency.',
    photoURL: '',
  },
  stats: [
    { label: 'Streak', value: '18 days', hint: 'Steady momentum from daily practice.' },
    { label: 'Points', value: '4,280', hint: 'Built across challenges and consistency.' },
    { label: 'Completed', value: '56', hint: 'Finished problems across active tracks.' },
    { label: 'Rank', value: '#4', hint: 'Very close to the next leaderboard jump.' },
  ],
  focusAreas: [
    'Keep the daily challenge streak alive through the weekend.',
    'Finish one more graph problem before switching topics.',
    'Review Python lesson notes after each challenge session.',
  ],
  milestones: [
    { label: 'Weekly topic', value: 'Graphs' },
    { label: 'Next target', value: 'Top 10 leaderboard' },
    { label: 'Practice pace', value: '4 sessions this week' },
  ],
}

function mockResponse(data, delay = 220) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay)
  })
}

export async function getProfile() {
  return mockResponse(profileData)
}
