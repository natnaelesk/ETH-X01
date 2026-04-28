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
    <Card className="neo-panel neo-panel-hover h-full !border-4 !border-black !bg-[#FFD93D] !text-black !shadow-[8px_8px_0px_0px_#000]">
      <CardHeader>
        <CardTitle className="text-2xl font-black uppercase">Today&apos;s Challenge</CardTitle>
        <CardDescription className="font-bold text-black">
          One focused problem to keep the streak alive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-black uppercase text-black">{challenge.title}</h3>
            <p className="text-sm font-bold leading-6 text-black">{challenge.description}</p>
          </div>
          <Badge className="rounded-full border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000]" variant="outline">
            {challenge.difficulty}
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
            <Clock3 className="h-4 w-4 text-black" />
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-black">Estimated time</p>
            <p className="text-base font-black uppercase text-black">{challenge.time} minutes</p>
          </div>
          <div className="border-4 border-black bg-[#C4B5FD] p-4 shadow-[4px_4px_0px_0px_#000]">
            <Target className="h-4 w-4 text-black" />
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-black">Points</p>
            <p className="text-base font-black uppercase text-black">{challenge.points}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t-4 border-black !bg-transparent">
        <Button asChild className="neo-button ml-auto">
          <Link to={challenge.href}>
          Start challenge
          <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
