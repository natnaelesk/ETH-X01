export function StepCard({ index, title, description }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-white/82">
        0{index + 1}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/56">{description}</p>
    </article>
  );
}
