export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="neo-panel neo-panel-hover rotate-[-1deg] p-5">
      <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_#000]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-black uppercase text-black">{title}</h3>
      <p className="mt-3 text-sm font-bold leading-7 text-black">{description}</p>
    </article>
  );
}
