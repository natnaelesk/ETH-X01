import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon,
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        {Icon ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-slate-200">
            <Icon className="h-6 w-6" />
          </div>
        ) : null}
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {actionLabel ? (
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
