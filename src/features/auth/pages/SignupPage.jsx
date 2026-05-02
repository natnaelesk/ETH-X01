import { AuthForm } from '../components/AuthForm'
import { AuthShell } from '../components/AuthShell'

export function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="signup" />
    </AuthShell>
  )
}
