import { AuthForm } from '../components/AuthForm'
import { AuthShell } from '../components/AuthShell'

export function LoginPage() {
  return (
    <AuthShell>
      <AuthForm mode="login" />
    </AuthShell>
  )
}
