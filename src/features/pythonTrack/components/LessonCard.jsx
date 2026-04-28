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
        "neo-panel neo-panel-hover !overflow-hidden !rounded-none !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]",
        featured ? "h-full" : "h-full",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {featured ? (
                <Badge
                  className="rounded-full border-4 border-black bg-[#FF6B6B] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
                  variant="outline"
                >
                  Continue learning
                </Badge>
              ) : null}
              <Badge
                className="rounded-full border-4 border-black bg-[#C4B5FD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
                variant="outline"
              >
                {lesson.level}
              </Badge>
            </div>
            <CardTitle className="text-[1.45rem] font-black uppercase tracking-[-0.04em] !text-black">
              {lesson.title}
            </CardTitle>
          </div>
          <Badge
            className="rounded-full border-4 border-black bg-[#FFD93D] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
            variant="outline"
          >
            {lesson.duration} min
          </Badge>
        </div>
        <CardDescription className="!text-base !font-bold !leading-8 !text-black">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm font-bold uppercase text-black">
          <span>Progress</span>
          <span>{lesson.progress}%</span>
        </div>
        <ProgressBar
          className="h-3 bg-white"
          value={lesson.progress}
        />
        <div className="flex items-center justify-between border-4 border-black bg-[#FFFDF5] px-4 py-3 shadow-[4px_4px_0px_0px_#000]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Status</p>
            <p className="mt-2 text-sm font-black uppercase text-black">{lesson.status}</p>
          </div>
          <Button
            className="neo-button"
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
