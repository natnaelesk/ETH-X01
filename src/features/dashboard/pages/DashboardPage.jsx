import { ArrowRight, Brain, CheckCircle2, Flame } from "lucide-react";
import { Link } from "react-router-dom";

import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${data.profile.name}`}
        description="Everything in one place: streaks, practice, learning momentum, and a dashboard that keeps the next step obvious."
        actions={
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <Badge className="border border-white/10 bg-white/[0.05] px-3 py-1 text-white" variant="outline">
              {data.profile.level}
            </Badge>
            <p className="text-sm text-white/45">{data.profile.weeklyGoal}</p>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={Flame}
          label="Current streak"
          value={`${data.stats.streak} days`}
          delta="+2 days"
          description="steady momentum"
        />
        <StatCard
          icon={Brain}
          label="Total points"
          value={data.stats.points.toLocaleString()}
          delta="+120"
          description="since yesterday"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed challenges"
          value={data.stats.completed}
          delta="+4"
          description="this week"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TodayChallengeCard challenge={data.todayChallenge} />
        <ContinueLearningCard lesson={data.continueLearning} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-white">
          <CardHeader>
            <CardTitle>Mini leaderboard preview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {data.miniLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">#{entry.rank} {entry.user}</p>
                  <p className="text-xs text-white/40">Leaderboard position</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{entry.points.toLocaleString()}</p>
                  <p className="text-xs text-white/40">points</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] text-white">
          <CardHeader>
            <CardTitle>Focus blocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.focusBlocks.map((item) => (
              <Link
                key={item.title}
                className="block rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-4 transition hover:bg-white/5"
                to={item.href}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/55">{item.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/35">
                      {item.progress}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/45" />
                </div>
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              className="mt-2 w-full rounded-xl border-white/10 bg-white/[0.02] text-white hover:bg-white/5 hover:text-white"
            >
              <Link to="/profile">Open full profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-white">
        <CardHeader>
          <CardTitle>Consistency snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">Practice quality</p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">
              {data.stats.consistency}%
            </p>
            <p className="mt-2 text-sm text-white/55">You are showing up with healthy consistency this week.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">Best next move</p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">Finish 1 medium</p>
            <p className="mt-2 text-sm text-white/55">That keeps points, streak, and pattern retention moving together.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">Momentum</p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">Strong</p>
            <p className="mt-2 text-sm text-white/55">The dashboard is now ready to launch you into each learning flow.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
