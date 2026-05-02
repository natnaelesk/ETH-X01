export function SectionTitle({ title, description, action }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
        {description ? <p className="text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
