import { ArrowRight, Clock3, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
    case "Medium":
      return "border-amber-400/20 bg-amber-400/10 text-amber-100";
    case "Hard":
      return "border-rose-400/20 bg-rose-400/10 text-rose-100";
    default:
      return "border-white/10 bg-white/[0.05] text-white/75";
  }
}

export function ChallengeCard({ challenge }) {
  return (
    <Card className="!overflow-hidden !rounded-[1.75rem] !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#111111,#0b0b0b)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${getDifficultyClass(challenge.difficulty)}`}
                variant="outline"
              >
                {challenge.difficulty}
              </Badge>
              <Badge
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/68"
                variant="outline"
              >
                {challenge.track}
              </Badge>
            </div>
            <CardTitle className="text-[1.45rem] tracking-[-0.04em] !text-white">
              {challenge.title}
            </CardTitle>
          </div>
          <Badge
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70"
            variant="outline"
          >
            {challenge.points} pts
          </Badge>
        </div>
        <CardDescription className="!text-base !leading-8 !text-white/56">
          {challenge.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.15rem] border border-white/10 bg-black/25 px-4 py-4">
            <div className="flex items-center gap-2 text-white/38">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.22em]">Time</span>
            </div>
            <p className="mt-3 text-sm font-medium text-white">{challenge.time} minutes</p>
          </div>
          <div className="rounded-[1.15rem] border border-white/10 bg-black/25 px-4 py-4">
            <div className="flex items-center gap-2 text-white/38">
              <Target className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.22em]">Reward</span>
            </div>
            <p className="mt-3 text-sm font-medium text-white">{challenge.points} points</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="rounded-xl bg-white text-black hover:bg-white/90">
            Start challenge
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
