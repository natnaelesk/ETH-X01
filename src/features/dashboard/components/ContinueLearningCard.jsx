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
    <Card className="h-full border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] text-white">
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
        <CardDescription className="text-white/45">
          Pick up the next lesson without losing context.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/72">
                <BookOpen className="mr-2 h-3.5 w-3.5" />
                Recommended next
              </div>
              <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
              <p className="text-sm leading-6 text-white/58">{lesson.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-white/45">
            <span>Progress</span>
            <span>{formatPercent(lesson.progress)}</span>
          </div>
          <ProgressBar value={lesson.progress} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/45">Lessons done</p>
            <p className="mt-1 text-base font-semibold text-white">
              {lesson.lessonsCompleted}/{lesson.totalLessons}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/45">Focus mode</p>
            <p className="mt-1 text-base font-semibold text-white">Ready to resume</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-white/10 bg-black/20">
        <Button asChild className="ml-auto rounded-xl bg-white text-black hover:bg-white/90">
          <Link to={lesson.href}>
          Resume learning
          <PlayCircle className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
