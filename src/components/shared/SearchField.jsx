import { Search } from 'lucide-react'
import { cn } from "@/lib/utils";

export function SearchField({ className, ...props }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900/70 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm shadow-black/10 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
        {...props}
      />
    </div>
  )
}
