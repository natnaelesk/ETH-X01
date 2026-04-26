import { Brain, CheckCircle2, Flame } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockResource } from "@/hooks/useMockResource";
import { ContinueLearningCard } from "../components/ContinueLearningCard";
import { TodayChallengeCard } from "../components/TodayChallengeCard";
import { getDashboardOverview } from "../api";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 w-full rounded-[2rem] bg-white/6" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 w-full rounded-[1.5rem] bg-white/6" />
        <Skeleton className="h-32 w-full rounded-[1.5rem] bg-white/6" />
        <Skeleton className="h-32 w-full rounded-[1.5rem] bg-white/6" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-80 w-full rounded-[1.5rem] bg-white/6" />
        <Skeleton className="h-80 w-full rounded-[1.5rem] bg-white/6" />
      </div>
      <Skeleton className="h-56 w-full rounded-[1.5rem] bg-white/6" />
    </div>
  );
}

export function DashboardPage() {
  const { data, loading } = useMockResource(getDashboardOverview, []);

  if (loading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#121212,#0d0d0d)] px-6 py-7 sm:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/8 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/38">
              Overview
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-white sm:text-[3.25rem] sm:leading-[1]">
              Welcome back, {data.profile.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/56">
              Everything in one place: streaks, practice, learning momentum,
              and community ranking.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/76"
              variant="outline"
            >
              {data.profile.level}
            </Badge>
            <p className="text-sm text-white/42">{data.profile.weeklyGoal}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={Flame}
          label="Current streak"
          value={`${data.stats.streak} days`}
          delta="+2"
        />
        <StatCard
          icon={Brain}
          label="Total points"
          value={data.stats.points.toLocaleString()}
          delta="+120"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed challenges"
          value={data.stats.completed}
          delta="+4"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TodayChallengeCard challenge={data.todayChallenge} />
        <ContinueLearningCard lesson={data.continueLearning} />
      </div>

      <Card className="overflow-hidden !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,#121212,#0d0d0d)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <CardHeader>
          <CardTitle>Mini leaderboard preview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {data.miniLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-medium tracking-[-0.03em] text-white">
                    #{entry.rank} {entry.user}
                  </p>
                  <p className="mt-1 text-sm text-white/40">Leaderboard position</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-medium tracking-[-0.04em] text-white">
                    {entry.points.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-white/40">points</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
