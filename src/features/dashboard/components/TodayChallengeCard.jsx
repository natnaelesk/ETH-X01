import { ArrowRight, Clock3, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TodayChallengeCard({ challenge }) {
  return (
    <Card className="h-full !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#121212,#0d0d0d)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Today&apos;s Challenge</CardTitle>
        <CardDescription className="text-white/45">
          One focused problem to keep the streak alive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
            <p className="text-sm leading-6 text-white/58">{challenge.description}</p>
          </div>
          <Badge className="border border-white/10 bg-white/[0.06] text-white" variant="outline">
            {challenge.difficulty}
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Clock3 className="h-4 w-4 text-white/45" />
            <p className="mt-2 text-sm text-white/45">Estimated time</p>
            <p className="text-base font-semibold text-white">{challenge.time} minutes</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Target className="h-4 w-4 text-white/45" />
            <p className="mt-2 text-sm text-white/45">Points</p>
            <p className="text-base font-semibold text-white">{challenge.points}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-white/10 !bg-[#181818]">
        <Button asChild className="ml-auto rounded-xl bg-white text-black hover:bg-white/90">
          <Link to={challenge.href}>
          Start challenge
          <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
