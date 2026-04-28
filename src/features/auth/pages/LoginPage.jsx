import { AuthForm } from '../components/AuthForm'
import { AuthShell } from '../components/AuthShell'

export function LoginPage() {
  return (
    <AuthShell
      description="Sign in to jump straight into the dashboard, daily challenges, and learning tracks without any gatekeeping."
      title="Jump back into a loud, focused coding workspace."
    >
      <AuthForm mode="login" />
    </AuthShell>
  )
}
