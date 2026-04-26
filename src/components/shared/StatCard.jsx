import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ icon: Icon, label, value, delta, description }) {
  return (
    <Card className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">{label}</p>
            <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
              {value}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/72">
                {delta}
              </span>
              {description ? <span className="text-xs text-white/40">{description}</span> : null}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/80">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
