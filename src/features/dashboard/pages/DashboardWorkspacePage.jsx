import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMockResource } from "@/hooks/useMockResource";
import { getDashboardWorkspace } from "../api";

const sectionByPath = {
  "/dashboard/dsa": "dsa",
  "/dashboard/python": "python",
  "/dashboard/challenges": "challenges",
  "/dashboard/leaderboard": "leaderboard",
  "/dashboard/profile": "profile",
};

export function DashboardWorkspacePage() {
  const location = useLocation();
  const section = sectionByPath[location.pathname] || "dsa";
  const { data, loading } = useMockResource(() => getDashboardWorkspace(section), [section]);

  if (loading || !data) {
    return <div className="h-72 rounded-[2rem] border border-white/10 bg-white/[0.03]" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
        actions={
          <Button
            asChild
            className="rounded-full bg-white px-5 text-black hover:bg-white/90"
          >
            <Link to={data.primaryCta.href}>
              {data.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {data.highlights.map(([label, value]) => (
          <Card
            key={label}
            className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] text-white"
          >
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">{label}</p>
              <p className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-white">
          <CardContent className="p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
              Suggested flow
            </p>
            <div className="mt-5 space-y-4">
              {data.checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-black/30 px-4 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <CheckCircle2 className="h-4 w-4 text-white/70" />
                  </div>
                  <p className="text-sm leading-7 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.016))] text-white">
          <CardContent className="flex h-full flex-col p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
              Quick actions
            </p>
            <h2 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">
              Keep your next step obvious
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/58">
              The dashboard should remove friction. Jump directly into the area you need,
              then come back here for your next decision.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                asChild
                className="justify-between rounded-xl bg-white px-4 text-black hover:bg-white/90"
              >
                <Link to={data.primaryCta.href}>
                  {data.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="justify-between rounded-xl border-white/10 bg-white/[0.02] px-4 text-white hover:bg-white/5 hover:text-white"
              >
                <Link to={data.secondaryCta.href}>
                  {data.secondaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
