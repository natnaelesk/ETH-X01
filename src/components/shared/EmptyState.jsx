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
    <Card className="neo-panel !rounded-none !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        {Icon ? (
          <div className="border-4 border-black bg-[#C4B5FD] p-4 text-black shadow-[4px_4px_0px_0px_#000]">
            <Icon className="h-6 w-6" />
          </div>
        ) : null}
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-black uppercase text-black">{title}</h3>
          <p className="text-sm font-bold leading-6 text-black">{description}</p>
        </div>
        {actionLabel ? (
          <Button className="neo-button-secondary" variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
