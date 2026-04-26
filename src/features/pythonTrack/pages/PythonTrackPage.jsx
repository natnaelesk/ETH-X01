import { Sparkles } from "lucide-react";
import { useMemo } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockResource } from "@/hooks/useMockResource";
import { getPythonTrack } from "../api";
import { LessonCard } from "../components/LessonCard";

function PythonSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 w-full rounded-[2rem] bg-white/6" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Skeleton className="h-[24rem] w-full rounded-[1.75rem] bg-white/6" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[20rem] w-full rounded-[1.75rem] bg-white/6" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PythonTrackPage() {
  const { data, loading } = useMockResource(getPythonTrack, []);
  const featuredLesson = useMemo(
    () => data?.find((lesson) => lesson.progress > 0 && lesson.progress < 100) || data?.[1] || data?.[0],
    [data],
  );
  const lessons = data || [];
  const completedLessons = lessons.filter((lesson) => lesson.progress === 100).length;

  return (
    <div className="space-y-6">
      <PageHeader
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#121212,#0d0d0d)] px-6 py-7 sm:px-8"
        eyebrow="Learning track"
        title="Python Track"
        description="A beginner-friendly sequence of lessons designed to feel calm, clear, and easy to continue."
        actions={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/76"
              variant="outline"
            >
              Beginner friendly
            </Badge>
            <p className="text-sm text-white/42">Developer learning workspace</p>
          </div>
        }
      />

      {loading || !data ? (
        <PythonSkeleton />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="!overflow-hidden !rounded-[1.9rem] !border !border-white/10 !bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_24%),linear-gradient(180deg,#111111,#0b0b0b)] !text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
                    Continue learning
                  </p>
                  <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white">
                    Resume your Python momentum
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-white/56">
                    Move through the beginner track with a cleaner sequence, stronger
                    pacing, and one obvious next lesson.
                  </p>
                </div>
                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 lg:flex">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/35">Lessons</p>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">
                    {lessons.length}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/35">Completed</p>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">
                    {completedLessons}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/35">Next lesson</p>
                  <p className="mt-3 text-sm font-medium leading-6 text-white">
                    {featuredLesson.title}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <LessonCard featured lesson={featuredLesson} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
