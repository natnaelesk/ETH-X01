import { Search } from 'lucide-react'
import { cn } from "@/lib/utils";

export function SearchField({ className, ...props }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
      <input
        className="neo-focus-ring h-12 w-full border-4 border-black bg-white pl-10 pr-4 text-sm font-bold uppercase tracking-[0.1em] text-black placeholder:text-black/50 shadow-[6px_6px_0px_0px_#000] outline-none transition focus:bg-[#FFD93D]"
        {...props}
      />
    </div>
  )
}
