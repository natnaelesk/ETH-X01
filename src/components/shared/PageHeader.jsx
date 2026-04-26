import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions, eyebrow, className }) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-indigo-200/80">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h1>
          {description ? <p className="max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
