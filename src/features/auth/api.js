function mockResponse(data, delay = 220) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay)
  })
}

function makeSession(credentials, fallbackName) {
  return {
    token: 'mock-session-token',
    user: {
      id: crypto.randomUUID(),
      name: credentials.name?.trim() || fallbackName,
      email: credentials.email?.trim() || 'mira@example.com',
      role: 'Learner',
    },
  }
}

export async function login(credentials) {
  return mockResponse(makeSession(credentials, 'Mira Hassan'))
}

export async function signup(credentials) {
  return mockResponse(makeSession(credentials, credentials.name?.trim() || 'New Learner'))
}
