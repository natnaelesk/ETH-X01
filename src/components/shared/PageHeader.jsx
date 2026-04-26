import { cn } from "@/lib/utils";

export function PageHeader({ eyebrow, title, description, actions, className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] px-5 py-6 sm:px-7 sm:py-7",
        className,
      )}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/40">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-white sm:text-[2.8rem] sm:leading-[1]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? <div className="relative shrink-0">{actions}</div> : null}
      </div>
    </div>
  );
}
