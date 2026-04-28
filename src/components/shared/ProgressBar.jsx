import { cn } from "@/lib/utils";

export function ProgressBar({ value = 0, className }) {
  return (
    <div className={cn('h-3 overflow-hidden border-4 border-black bg-white', className)}>
      <div
        className="h-full bg-[#FF6B6B] transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
