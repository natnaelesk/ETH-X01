import { LayoutGrid, List } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="space-y-6">
      <PageHeader
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#121212,#0d0d0d)] px-6 py-7 sm:px-8"
        eyebrow="Learning"
        title="DSA Topics"
        description="Browse foundational and advanced topics with progress tracking and a clean, high-signal layout."
        actions={
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1">
            <Button
              className="rounded-xl border-0 bg-transparent text-white/72 hover:bg-white/5 hover:text-white data-[variant=secondary]:bg-white/[0.08]"
              onClick={() => setLayout("grid")}
              size="sm"
              variant={layout === "grid" ? "secondary" : "ghost"}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              className="rounded-xl border-0 bg-transparent text-white/72 hover:bg-white/5 hover:text-white data-[variant=secondary]:bg-white/[0.08]"
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
