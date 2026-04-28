import { ArrowRight, Clock3, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "border-4 border-black bg-[#C4B5FD] text-black shadow-[4px_4px_0px_0px_#000]";
    case "Medium":
      return "border-4 border-black bg-[#FFD93D] text-black shadow-[4px_4px_0px_0px_#000]";
    case "Hard":
      return "border-4 border-black bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_#000]";
    default:
      return "border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000]";
  }
}

export function ChallengeCard({ challenge }) {
  return (
    <Card className="neo-panel neo-panel-hover !overflow-hidden !rounded-none !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] ${getDifficultyClass(challenge.difficulty)}`}
                variant="outline"
              >
                {challenge.difficulty}
              </Badge>
              <Badge
                className="rounded-full border-4 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
                variant="outline"
              >
                {challenge.track}
              </Badge>
            </div>
            <CardTitle className="text-[1.45rem] font-black uppercase tracking-[-0.04em] !text-black">
              {challenge.title}
            </CardTitle>
          </div>
          <Badge
            className="rounded-full border-4 border-black bg-[#FFD93D] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
            variant="outline"
          >
            {challenge.points} pts
          </Badge>
        </div>
        <CardDescription className="!text-base !font-bold !leading-8 !text-black">
          {challenge.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-4 border-black bg-[#FFFDF5] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center gap-2 text-black">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-[0.22em]">Time</span>
            </div>
            <p className="mt-3 text-sm font-black uppercase text-black">{challenge.time} minutes</p>
          </div>
          <div className="border-4 border-black bg-[#C4B5FD] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center gap-2 text-black">
              <Target className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-[0.22em]">Reward</span>
            </div>
            <p className="mt-3 text-sm font-black uppercase text-black">{challenge.points} points</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="neo-button">
            Start challenge
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
