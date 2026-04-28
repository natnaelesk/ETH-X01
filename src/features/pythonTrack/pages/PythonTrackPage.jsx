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
      <Skeleton className="h-40 w-full border-4 border-black bg-[#C4B5FD]" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Skeleton className="h-[24rem] w-full border-4 border-black bg-[#FFD93D]" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[20rem] w-full border-4 border-black bg-white" />
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
        className="neo-panel relative overflow-hidden bg-[#C4B5FD] px-6 py-7 sm:px-8"
        eyebrow="Learning track"
        title="Python Track"
        description="A beginner-friendly sequence of lessons designed to feel calm, clear, and easy to continue."
        actions={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className="rounded-full border-4 border-black bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-black shadow-[4px_4px_0px_0px_#000]"
              variant="outline"
            >
              Beginner friendly
            </Badge>
            <p className="text-sm font-bold text-black">Developer learning workspace</p>
          </div>
        }
      />

      {loading || !data ? (
        <PythonSkeleton />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="neo-panel !overflow-hidden !rounded-none !border-4 !border-black !bg-[#FFD93D] !text-black !shadow-[8px_8px_0px_0px_#000]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-black">
                    Continue learning
                  </p>
                  <h2 className="neo-display mt-4 text-3xl">
                    Resume your Python momentum
                  </h2>
                  <p className="mt-4 max-w-xl text-base font-bold leading-8 text-black">
                    Move through the beginner track with a cleaner sequence, stronger
                    pacing, and one obvious next lesson.
                  </p>
                </div>
                <div className="hidden h-12 w-12 items-center justify-center border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000] lg:flex">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="border-4 border-black bg-white px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Lessons</p>
                  <p className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-black">
                    {lessons.length}
                  </p>
                </div>
                <div className="border-4 border-black bg-[#FF6B6B] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Completed</p>
                  <p className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-black">
                    {completedLessons}
                  </p>
                </div>
                <div className="border-4 border-black bg-[#C4B5FD] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Next lesson</p>
                  <p className="mt-3 text-sm font-black uppercase leading-6 text-black">
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
