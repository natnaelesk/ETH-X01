import { cn } from "@/lib/utils";

export function ProgressBar({ value = 0, className }) {
  return (
    <div className={cn('h-2 overflow-hidden rounded-full bg-white/10', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
