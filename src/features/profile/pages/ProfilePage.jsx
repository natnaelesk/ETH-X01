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
      <Skeleton className="h-24 w-full border-4 border-black bg-[#FFD93D]" />
      <div className="border-4 border-black bg-[#FFFDF5] p-6 shadow-[8px_8px_0px_0px_#000]">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Skeleton className="h-[340px] w-full border-4 border-black bg-[#C4B5FD]" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full border-4 border-black bg-white" />
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
        <p className="neo-kicker">
          Account
        </p>
        <h1 className="neo-display text-4xl sm:text-5xl">
          Profile
        </h1>
        <p className="max-w-2xl text-sm font-bold leading-7 text-black sm:text-base">
          Review your learning snapshot, account details, and the story behind your progress.
        </p>
      </section>

      <section className="neo-panel relative overflow-hidden bg-[#FFD93D] p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card className="neo-panel !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]">
            <CardContent className="!p-5">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                  {displayName}
                </h2>
                <p className="text-sm font-bold text-black">{displayRole}</p>
                <Badge
                  className="rounded-full border-4 border-black bg-[#C4B5FD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
                  variant="outline"
                >
                  {displayLocation}
                </Badge>
              </div>

              <p className="mt-6 text-sm font-bold leading-8 text-black">
                {data.summary.bio}
              </p>

              <div className="mt-6 border-4 border-black bg-[#FFFDF5] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center justify-between gap-4 border-b-4 border-black pb-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-black" />
                    <p className="text-sm font-bold uppercase text-black">Email</p>
                  </div>
                  <p className="text-sm font-black text-black">{displayEmail}</p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <p className="text-sm font-bold uppercase text-black">Joined</p>
                  <p className="text-sm font-black text-black">
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
                className="min-h-[152px] border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_#000]"
              >
                <div className="flex h-full flex-col p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">
                    {stat.label}
                  </p>
                  <p className="mt-8 text-4xl font-black uppercase tracking-tight text-black">
                    {stat.value}
                  </p>
                  <p className="mt-auto pt-4 text-sm font-bold leading-6 text-black">
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