import { ProgressBar } from "@/components/shared/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TopicCard({ topic, list = false }) {
  return (
    <Card
      className={cn(
        "neo-panel neo-panel-hover !overflow-hidden !rounded-none !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]",
        list ? "w-full" : "h-full",
      )}
    >
      <CardHeader className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <Badge className="rounded-full border-4 border-black bg-[#FFD93D] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]" variant="outline">
              {topic.category}
            </Badge>
            <CardTitle className="text-[1.65rem] font-black uppercase tracking-[-0.04em] !text-black">
              {topic.title}
            </CardTitle>
          </div>
          <Badge className="rounded-full border-4 border-black bg-[#C4B5FD] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]" variant="outline">
            {topic.lessons} lessons
          </Badge>
        </div>
        <CardDescription className="max-w-[34ch] !text-base !font-bold !leading-8 !text-black">
          {topic.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-sm font-bold uppercase text-black">
          <span>Progress</span>
          <span>{topic.progress}%</span>
        </div>
        <ProgressBar
          className="h-3 bg-white"
          value={topic.progress}
        />
      </CardContent>
    </Card>
  );
}
