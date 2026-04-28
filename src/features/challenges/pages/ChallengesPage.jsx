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
      <Skeleton className="h-40 w-full border-4 border-black bg-[#FF6B6B]" />
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[20rem] w-full border-4 border-black bg-[#FFD93D]" />
          ))}
        </div>
        <Skeleton className="h-[28rem] w-full border-4 border-black bg-[#C4B5FD]" />
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
        className="neo-panel relative overflow-hidden bg-[#FF6B6B] px-6 py-7 sm:px-8"
        eyebrow="Practice"
        title="Daily Challenges"
        description="Stay sharp with a curated set of coding challenges and a quick leaderboard pulse beside it."
        actions={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className="rounded-full border-4 border-black bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-black shadow-[4px_4px_0px_0px_#000]"
              variant="outline"
            >
              {data?.challenges?.length || 4} active problems
            </Badge>
            <p className="text-sm font-bold text-black">{totalPoints} points available today</p>
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

          <Card className="neo-panel h-fit !overflow-hidden !rounded-none !border-4 !border-black !bg-[#C4B5FD] !text-black !shadow-[8px_8px_0px_0px_#000]">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="!text-2xl !font-black !uppercase !text-black">Leaderboard preview</CardTitle>
                <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000]">
                  <Flame className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="border-4 border-black bg-white px-4 py-4 shadow-[4px_4px_0px_0px_#000]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase text-black">#{entry.rank} {entry.user}</p>
                      <p className="mt-1 text-xs font-bold text-black">{entry.completed} completed</p>
                    </div>
                    <p className="text-sm font-black uppercase text-black">{entry.points.toLocaleString()}</p>
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
