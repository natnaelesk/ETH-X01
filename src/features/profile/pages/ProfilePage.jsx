import { Mail } from 'lucide-react'
import { useMockResource } from '../../../hooks/useMockResource'
import { getProfile } from '../api'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-24 w-full border-4 border-black bg-[#FFD93D]" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-44 w-full border-4 border-black bg-white"
          />
        ))}
      </div>
    </div>
  )
}

export function ProfilePage() {
  const { data, loading } = useMockResource(getProfile, [])

  if (loading || !data) {
    return <ProfileSkeleton />
  }

  const displayName = data.summary.name
  const displayEmail = data.summary.email
  const displayRole = data.summary.role
  const displayLocation = data.summary.location.toUpperCase()
  const stats = data.stats

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="space-y-6">
        <div className="neo-panel relative overflow-hidden border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="neo-kicker w-fit bg-[#C4B5FD] text-[10px]">
                Account
              </p>
              <h1 className="neo-display text-3xl leading-tight text-black sm:text-4xl">
                Profile
              </h1>
              <p className="text-sm font-bold leading-7 text-black">
                {displayName} · {displayRole}
              </p>
              <Badge
                className="w-fit rounded-full border-4 border-black bg-[#FFD93D] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[3px_3px_0px_0px_#000]"
                variant="outline"
              >
                {displayLocation}
              </Badge>
            </div>

            <div className="border-4 border-black bg-[#FFFDF5] px-4 py-4 text-black shadow-[4px_4px_0px_0px_#000] sm:min-w-[320px]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-black" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black">
                    Email
                  </p>
                </div>
                <p className="text-sm font-black text-black">{displayEmail}</p>
              </div>
              <div className="mt-3 border-t-4 border-black pt-3">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-black">
                  Joined
                </p>
                <p className="mt-1 text-sm font-bold text-black">{data.summary.joined}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "neo-panel border-4 border-black bg-white p-5 text-black shadow-[6px_6px_0px_0px_#000]",
                index === 0 && "bg-[#FFE8EC]",
                index === 1 && "bg-[#FFF4B8]",
                index === 2 && "bg-[#EAE2FF]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-black/80">
                {stat.label}
              </p>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-black">
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-bold leading-6 text-black">
                {stat.hint}
              </p>
            </div>
          ))}

          <div className="neo-panel border-4 border-black bg-[#FFFDF5] p-5 text-black shadow-[6px_6px_0px_0px_#000] md:col-span-2 xl:col-span-3">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/70">
              Bio
            </p>
            <p className="mt-3 text-sm font-bold leading-7 text-black">
              {data.summary.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}