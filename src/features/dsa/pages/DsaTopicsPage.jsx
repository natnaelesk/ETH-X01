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
        <Skeleton key={index} className="h-[22rem] w-full border-4 border-black bg-[#FFD93D]" />
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
        className="neo-panel relative overflow-hidden bg-[#FFD93D] px-6 py-7 sm:px-8"
        eyebrow="Learning"
        title="DSA Topics"
        description="Browse foundational and advanced topics with progress tracking and a clean, high-signal layout."
        actions={
          <div className="flex items-center gap-2 border-4 border-black bg-white p-1 shadow-[4px_4px_0px_0px_#000]">
            <Button
              className="border-4 border-transparent bg-transparent font-black uppercase text-black hover:border-black hover:bg-[#FFD93D] hover:shadow-[4px_4px_0px_0px_#000] data-[variant=secondary]:border-black data-[variant=secondary]:bg-[#FF6B6B] data-[variant=secondary]:shadow-[4px_4px_0px_0px_#000]"
              onClick={() => setLayout("grid")}
              size="sm"
              variant={layout === "grid" ? "secondary" : "ghost"}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              className="border-4 border-transparent bg-transparent font-black uppercase text-black hover:border-black hover:bg-[#FFD93D] hover:shadow-[4px_4px_0px_0px_#000] data-[variant=secondary]:border-black data-[variant=secondary]:bg-[#FF6B6B] data-[variant=secondary]:shadow-[4px_4px_0px_0px_#000]"
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
