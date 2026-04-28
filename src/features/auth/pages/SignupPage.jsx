import { AuthForm } from '../components/AuthForm'
import { AuthShell } from '../components/AuthShell'

export function SignupPage() {
  return (
    <AuthShell
      description="Create a mock account and move directly into the same dashboard, tracks, and challenge flow as every other visitor."
      title="Create an account for your neon-brutal learning setup."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  )
}
