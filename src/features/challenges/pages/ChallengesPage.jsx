import { Flame } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockResource } from "@/hooks/useMockResource";
import { getChallenges } from "../api";
import { ChallengeCard } from "../components/ChallengeCard";

function ChallengeSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 w-full rounded-[2rem] bg-white/6" />
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[20rem] w-full rounded-[1.75rem] bg-white/6" />
          ))}
        </div>
        <Skeleton className="h-[28rem] w-full rounded-[1.75rem] bg-white/6" />
      </div>
    </div>
  );
}

export function ChallengesPage() {
  const { data, loading } = useMockResource(getChallenges, []);
  const totalPoints = data?.challenges.reduce((sum, challenge) => sum + challenge.points, 0) || 0;

  return (
    <div className="space-y-6">
      <PageHeader
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#121212,#0d0d0d)] px-6 py-7 sm:px-8"
        eyebrow="Practice"
        title="Daily Challenges"
        description="Stay sharp with a curated set of coding challenges and a quick leaderboard pulse beside it."
        actions={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/76"
              variant="outline"
            >
              {data?.challenges?.length || 4} active problems
            </Badge>
            <p className="text-sm text-white/42">{totalPoints} points available today</p>
          </div>
        }
      />

      {loading || !data ? (
        <ChallengeSkeleton />
      ) : (
        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <div className="grid gap-4 md:grid-cols-2">
            {data.challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>

          <Card className="h-fit !overflow-hidden !rounded-[1.75rem] !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#111111,#0b0b0b)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="!text-white">Leaderboard preview</CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70">
                  <Flame className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="rounded-[1.15rem] border border-white/10 bg-black/25 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">#{entry.rank} {entry.user}</p>
                      <p className="mt-1 text-xs text-white/40">{entry.completed} completed</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{entry.points.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
