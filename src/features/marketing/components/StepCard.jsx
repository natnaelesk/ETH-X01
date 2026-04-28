export function StepCard({ index, title, description }) {
  return (
    <article className="neo-panel neo-panel-hover rotate-[1deg] p-5">
      <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#C4B5FD] text-sm font-black text-black shadow-[4px_4px_0px_0px_#000]">
        0{index + 1}
      </div>
      <h3 className="mt-5 text-lg font-black uppercase text-black">{title}</h3>
      <p className="mt-3 text-sm font-bold leading-7 text-black">{description}</p>
    </article>
  );
}
