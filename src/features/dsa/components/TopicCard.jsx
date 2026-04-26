import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TopicCard({ topic, list = false }) {
  return (
    <Card
      className={cn(
        "!overflow-hidden !rounded-[1.75rem] !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,#111111,#0b0b0b)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        list ? "w-full" : "h-full",
      )}
    >
      <CardHeader className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/76" variant="outline">
              {topic.category}
            </Badge>
            <CardTitle className="text-[1.65rem] tracking-[-0.04em] !text-white">
              {topic.title}
            </CardTitle>
          </div>
          <Badge className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70" variant="outline">
            {topic.lessons} lessons
          </Badge>
        </div>
        <CardDescription className="max-w-[34ch] !text-base !leading-8 !text-white/56">
          {topic.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-sm text-white/48">
          <span>Progress</span>
          <span>{topic.progress}%</span>
        </div>
        <ProgressBar
          className="h-2.5 rounded-full bg-white/10 [&_[data-slot=progress-indicator]]:bg-[linear-gradient(90deg,#5b5bf6,#61a5ff)]"
          value={topic.progress}
        />
      </CardContent>
    </Card>
  );
}
