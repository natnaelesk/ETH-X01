import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { useAuth } from '../../../app/useAuth'

export function AuthForm({ mode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, signup } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const isSignup = mode === 'signup'
  const destination = location.state?.from?.pathname || '/'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      if (isSignup) {
        await signup(form)
      } else {
        await login(form)
      }

      navigate(destination, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialSignIn = async (provider) => {
    setIsSubmitting(true)
    try {
      const payload = {
        name: provider === 'google' ? 'Google Learner' : 'GitHub Learner',
        email: provider === 'google' ? 'google.user@ethx01.dev' : 'github.user@ethx01.dev',
        password: '',
      }
      await login(payload)
      navigate(destination, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="neo-panel w-full max-w-lg !rounded-none !border-4 !border-black !bg-white !text-black !shadow-[12px_12px_0px_0px_#000]">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="rounded-full border-4 border-black bg-[#FF6B6B] px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-black shadow-[4px_4px_0px_0px_#000]" variant="outline">
            {isSignup ? 'Create account' : 'Welcome back'}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-black uppercase text-black">
          {isSignup ? 'Start your ETH-X01 journey' : 'Sign in to your workspace'}
        </CardTitle>
        <CardDescription className="text-sm font-bold leading-6 text-black">
          {isSignup
            ? 'Create a mock account to unlock the dashboard, learning paths, and challenge flow.'
            : 'Pick up from your latest streak and continue the learning flow without friction.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup ? (
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-[0.18em] text-black" htmlFor="name">
                Full name
              </label>
              <Input
                className="neo-focus-ring h-14 border-4 border-black bg-[#FFFDF5] text-base font-bold text-black placeholder:text-black/50 shadow-[4px_4px_0px_0px_#000]"
                id="name"
                name="name"
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Mira Hassan"
                value={form.name}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-[0.18em] text-black" htmlFor="email">
              Email
            </label>
            <Input
              className="neo-focus-ring h-14 border-4 border-black bg-[#FFFDF5] text-base font-bold text-black placeholder:text-black/50 shadow-[4px_4px_0px_0px_#000]"
              id="email"
              name="email"
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="mira@example.com"
              type="email"
              value={form.email}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-[0.18em] text-black" htmlFor="password">
              Password
            </label>
            <Input
              className="neo-focus-ring h-14 border-4 border-black bg-[#FFFDF5] text-base font-bold text-black placeholder:text-black/50 shadow-[4px_4px_0px_0px_#000]"
              id="password"
              name="password"
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="••••••••"
              type="password"
              value={form.password}
            />
          </div>

          <div className="border-t-4 border-black pt-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black">
              Or continue with
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                className="neo-button-ghost h-12 w-full justify-center"
                disabled={isSubmitting}
                onClick={() => handleSocialSignIn('google')}
                type="button"
              >
                <span className="text-lg">G</span>
                Google
              </button>
              <button
                className="neo-button-ghost h-12 w-full justify-center"
                disabled={isSubmitting}
                onClick={() => handleSocialSignIn('github')}
                type="button"
              >
                <span className="text-lg">GH</span>
                GitHub
              </button>
            </div>
          </div>

          <Button className="neo-button h-14 w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'}
          </Button>
        </form>

        <div className="border-4 border-black bg-[#C4B5FD] p-4 text-sm font-bold text-black shadow-[4px_4px_0px_0px_#000]">
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <Link className="border-b-4 border-transparent font-black uppercase transition hover:border-black" to="/login">
                Sign in here
              </Link>
              .
            </p>
          ) : (
            <p>
              New here?{' '}
              <Link className="border-b-4 border-transparent font-black uppercase transition hover:border-black" to="/signup">
                Create an account
              </Link>
              .
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
