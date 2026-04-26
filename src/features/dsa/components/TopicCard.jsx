import { ArrowUpRight, BookOpen, Target } from "lucide-react";

import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TopicCard({ topic, list = false }) {
  return (
    <Card
      className={cn(
        "overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        list ? "w-full" : "h-full",
      )}
    >
      <CardHeader className={cn(list ? "sm:grid-cols-[1.2fr_0.8fr]" : "")}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border border-white/10 bg-white/[0.05] text-white/78" variant="outline">
              {topic.category}
            </Badge>
            <CardTitle>{topic.title}</CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/72">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border border-white/10 bg-black/25 text-white/70" variant="outline">
            {topic.lessons} lessons
          </Badge>
          <Badge className="border border-white/10 bg-black/25 text-white/70" variant="outline">
            {topic.problems} problems
          </Badge>
        </div>
        <CardDescription className="text-white/55">{topic.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className={cn("grid gap-3", list ? "sm:grid-cols-2" : "grid-cols-2")}>
          <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-white/45">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.2em]">Pace</span>
            </div>
            <p className="mt-3 text-sm font-medium text-white">{topic.pace}</p>
          </div>
          <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-white/45">
              <Target className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.2em]">Next focus</span>
            </div>
            <p className="mt-3 text-sm font-medium text-white">{topic.nextFocus}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-white/45">
          <span>Progress</span>
          <span>{topic.progress}%</span>
        </div>
        <ProgressBar value={topic.progress} />
        </div>
      </CardContent>
    </Card>
  );
}
