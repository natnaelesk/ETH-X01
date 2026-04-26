import { ArrowRight } from "lucide-react";

import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LessonCard({ lesson, featured = false }) {
  return (
    <Card
      className={cn(
        "!overflow-hidden !rounded-[1.75rem] !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#111111,#0b0b0b)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        featured ? "h-full" : "h-full",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {featured ? (
                <Badge
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/76"
                  variant="outline"
                >
                  Continue learning
                </Badge>
              ) : null}
              <Badge
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/68"
                variant="outline"
              >
                {lesson.level}
              </Badge>
            </div>
            <CardTitle className="text-[1.45rem] tracking-[-0.04em] !text-white">
              {lesson.title}
            </CardTitle>
          </div>
          <Badge
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70"
            variant="outline"
          >
            {lesson.duration} min
          </Badge>
        </div>
        <CardDescription className="!text-base !leading-8 !text-white/56">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-white/48">
          <span>Progress</span>
          <span>{lesson.progress}%</span>
        </div>
        <ProgressBar
          className="h-2.5 rounded-full bg-white/10 [&_[data-slot=progress-indicator]]:bg-[linear-gradient(90deg,#5b5bf6,#61a5ff)]"
          value={lesson.progress}
        />
        <div className="flex items-center justify-between rounded-[1.15rem] border border-white/10 bg-black/25 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">Status</p>
            <p className="mt-2 text-sm font-medium text-white">{lesson.status}</p>
          </div>
          <Button
            className="rounded-xl bg-white text-black hover:bg-white/90"
            variant={featured ? "default" : "default"}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
