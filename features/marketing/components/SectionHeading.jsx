import { cn } from "@/lib/utils";

export function SectionHeading({ label, title, description, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {label ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
          {label}
        </p>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
