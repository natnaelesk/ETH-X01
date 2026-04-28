import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions, eyebrow, className }) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div className="space-y-2">
        {eyebrow ? (
          <p className="neo-kicker">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="neo-display text-4xl md:text-5xl">{title}</h1>
          {description ? <p className="max-w-2xl text-sm font-bold leading-6 text-black">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
