import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

export function StatCard({ label, value, delta, icon: Icon }) {
  return (
    <Card className="!rounded-[1.5rem] !border !border-white/10 !bg-[linear-gradient(180deg,#121212,#0d0d0d)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-2">
          <p className="text-sm text-white/50">{label}</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
            {delta ? (
              <Badge className="border border-white/10 bg-white/[0.05] text-white/78" variant="outline">
                {delta}
              </Badge>
            ) : null}
          </div>
        </div>
        {Icon ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-white/70">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
