import { cn } from "@/lib/utils";

export function SectionHeading({ label, title, description, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {label ? (
        <p className="neo-kicker">
          {label}
        </p>
      ) : null}
      <h2 className="neo-display mt-4 text-4xl sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm font-bold leading-7 text-black sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
