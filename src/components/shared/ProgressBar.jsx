import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function ProgressBar({ value, className }) {
  return (
    <Progress
      className={cn("h-2 rounded-full bg-white/[0.06] [&_[data-slot=progress-indicator]]:bg-white", className)}
      value={value}
    />
  );
}
