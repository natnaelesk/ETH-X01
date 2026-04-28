import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

export function StatCard({ label, value, delta, icon: Icon }) {
  return (
    <Card className="neo-panel neo-panel-hover h-full !rounded-none !border-4 !border-black !bg-white !text-black !shadow-[8px_8px_0px_0px_#000]">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">{label}</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-black uppercase tracking-tight text-black">{value}</p>
            {delta ? (
              <Badge className="rounded-full border-4 border-black bg-[#FFD93D] text-black shadow-[4px_4px_0px_0px_#000]" variant="outline">
                {delta}
              </Badge>
            ) : null}
          </div>
        </div>
        {Icon ? (
          <div className="border-4 border-black bg-[#C4B5FD] p-3 text-black shadow-[4px_4px_0px_0px_#000]">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
