import { BookOpen, LayoutGrid, List, Sparkles, Target } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockResource } from "@/hooks/useMockResource";
import { getTopics } from "../api";
import { TopicCard } from "../components/TopicCard";

function TopicsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-[22rem] w-full rounded-[1.75rem] bg-white/6" />
      ))}
    </div>
  );
}

export function DsaTopicsPage() {
  const [layout, setLayout] = useState("grid");
  const { data, loading } = useMockResource(getTopics, []);

  const topics = useMemo(() => data || [], [data]);
  const totalLessons = topics.reduce((sum, topic) => sum + topic.lessons, 0);
  const averageProgress = topics.length
    ? Math.round(topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Learning"
        title="DSA Topics"
        description="Browse structured tracks with clearer progress signals, cleaner grouping, and the same premium dashboard rhythm."
        actions={
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
            <Button
              className="rounded-xl border-0"
              onClick={() => setLayout("grid")}
              size="sm"
              variant={layout === "grid" ? "secondary" : "ghost"}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              className="rounded-xl border-0"
              onClick={() => setLayout("list")}
              size="sm"
              variant={layout === "list" ? "secondary" : "ghost"}
            >
              <List className="h-4 w-4" />
              List
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">Topic library</p>
              <BookOpen className="h-4 w-4 text-white/45" />
            </div>
            <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
              {topics.length}
            </p>
            <p className="mt-2 text-sm text-white/55">Structured areas ready to explore.</p>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">Lesson coverage</p>
              <Target className="h-4 w-4 text-white/45" />
            </div>
            <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
              {totalLessons}
            </p>
            <p className="mt-2 text-sm text-white/55">Lessons distributed across core and advanced tracks.</p>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">Average progress</p>
              <Sparkles className="h-4 w-4 text-white/45" />
            </div>
            <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
              {averageProgress}%
            </p>
            <div className="mt-3">
              <Badge className="border border-white/10 bg-white/[0.05] text-white/78" variant="outline">
                Momentum looks healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <TopicsSkeleton />
      ) : topics.length ? (
        <div className={layout === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
          {topics.map((topic) => (
            <TopicCard key={topic.id} list={layout === "list"} topic={topic} />
          ))}
        </div>
      ) : (
        <EmptyState
          description="No topics are available right now. Try changing the filter or check back later."
          title="No topics found"
        />
      )}
    </div>
  )
}
