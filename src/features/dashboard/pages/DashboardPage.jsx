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
      <Skeleton className="h-40 w-full border-4 border-black bg-[#FFD93D]" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 w-full border-4 border-black bg-[#C4B5FD]" />
        <Skeleton className="h-32 w-full border-4 border-black bg-[#FF6B6B]" />
        <Skeleton className="h-32 w-full border-4 border-black bg-white" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-80 w-full border-4 border-black bg-[#FFD93D]" />
        <Skeleton className="h-80 w-full border-4 border-black bg-[#C4B5FD]" />
      </div>
      <Skeleton className="h-56 w-full border-4 border-black bg-white" />
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
      <section className="neo-panel relative overflow-hidden bg-[#FF6B6B] px-6 py-7 sm:px-8">
        <div className="neo-grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute right-6 top-6 h-20 w-20 rotate-6 border-4 border-black bg-[#FFD93D]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="neo-kicker bg-white">
              Overview
            </p>
            <h1 className="neo-display mt-4 text-4xl sm:text-[3.25rem] sm:leading-[1]">
              Welcome back, {data.profile.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-black">
              Everything in one place: streaks, practice, learning momentum,
              and community ranking.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className="rounded-full border-4 border-black bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-black shadow-[4px_4px_0px_0px_#000]"
              variant="outline"
            >
              {data.profile.level}
            </Badge>
            <p className="text-sm font-bold text-black">{data.profile.weeklyGoal}</p>
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

      <Card className="neo-panel overflow-hidden !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase text-black">Mini leaderboard preview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {data.miniLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="border-4 border-black bg-[#FFFDF5] px-5 py-4 shadow-[4px_4px_0px_0px_#000]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black uppercase tracking-[-0.03em] text-black">
                    #{entry.rank} {entry.user}
                  </p>
                  <p className="mt-1 text-sm font-bold text-black">Leaderboard position</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black uppercase tracking-[-0.04em] text-black">
                    {entry.points.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-bold text-black">points</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
