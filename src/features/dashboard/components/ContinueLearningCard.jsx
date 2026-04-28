import { BookOpen, PlayCircle } from "lucide-react";
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
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatPercent } from "@/utils/format";

export function ContinueLearningCard({ lesson }) {
  return (
    <Card className="neo-panel neo-panel-hover h-full !border-4 !border-black !bg-[#C4B5FD] !text-black !shadow-[8px_8px_0px_0px_#000]">
      <CardHeader>
        <CardTitle className="text-2xl font-black uppercase">Continue Learning</CardTitle>
        <CardDescription className="font-bold text-black">
          Pick up the next lesson without losing context.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="rounded-full border-4 border-black bg-[#FFD93D] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
                <BookOpen className="mr-2 h-3.5 w-3.5" />
                Recommended next
              </div>
              <h3 className="text-lg font-black uppercase text-black">{lesson.title}</h3>
              <p className="text-sm font-bold leading-6 text-black">{lesson.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-bold uppercase text-black">
            <span>Progress</span>
            <span>{formatPercent(lesson.progress)}</span>
          </div>
          <ProgressBar value={lesson.progress} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-4 border-black bg-[#FFD93D] p-4 shadow-[4px_4px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Lessons done</p>
            <p className="mt-1 text-base font-black uppercase text-black">
              {lesson.lessonsCompleted}/{lesson.totalLessons}
            </p>
          </div>
          <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Focus mode</p>
            <p className="mt-1 text-base font-black uppercase text-black">Ready to resume</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t-4 border-black !bg-transparent">
        <Button asChild className="neo-button ml-auto">
          <Link to={lesson.href}>
          Resume learning
          <PlayCircle className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
