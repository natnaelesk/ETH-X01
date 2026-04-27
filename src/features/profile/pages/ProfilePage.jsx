import { Mail } from 'lucide-react'
import { useAuth } from '../../../app/useAuth'
import { useMockResource } from '../../../hooks/useMockResource'
import { getProfile } from '../api'
import { Skeleton } from '../../../components/ui/skeleton'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-24 w-full rounded-[1.75rem] bg-black/40" />
      <div className="rounded-[2.25rem] border border-white/10 bg-black p-6">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Skeleton className="h-[340px] w-full rounded-[1.75rem] bg-black/40" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-[1.5rem] bg-black/40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProfilePage() {
  const { user } = useAuth()
  const { data, loading } = useMockResource(getProfile, [])

  if (loading || !data) {
    return <ProfileSkeleton />
  }

  const displayName = user?.name || data.summary.name
  const displayEmail = user?.email || data.summary.email
  const displayRole = user?.role || data.summary.role
  const displayScore = user?.score != null ? user.score.toLocaleString() : data.stats[1].value
  const displayLocation = data.summary.location.toUpperCase()

  const stats = data.stats.map((stat) =>
    stat.label === 'Points'
      ? { ...stat, value: displayScore }
      : stat,
  )

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
          Account
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Profile
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
          Review your learning snapshot, account details, and the story behind your progress.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card className="!border !border-white/10 !bg-black text-white">
            <CardContent className="!p-5">
              {/* REMOVED AVATAR */}

              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {displayName}
                </h2>
                <p className="text-sm text-white/58">{displayRole}</p>
                <Badge
                  className="rounded-full border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.24em] text-white/80"
                  variant="outline"
                >
                  {displayLocation}
                </Badge>
              </div>

              <p className="mt-6 text-sm leading-8 text-white/62">
                {data.summary.bio}
              </p>

              <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-black/60 px-4 py-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-white/42" />
                    <p className="text-sm text-white/52">Email</p>
                  </div>
                  <p className="text-sm font-medium text-white">{displayEmail}</p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <p className="text-sm text-white/52">Joined</p>
                  <p className="text-sm font-medium text-white">
                    {data.summary.joined}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-h-[152px] rounded-xl border border-white/10 bg-black/70 text-white"
              >
                <div className="flex h-full flex-col p-5">
                  <p className="text-sm font-medium text-white">
                    {stat.label}
                  </p>
                  <p className="mt-8 text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-auto pt-4 text-sm leading-6 text-white/42">
                    {stat.hint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}