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
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <Skeleton className="h-[24rem] w-full border-4 border-black bg-[#FFD93D]" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[20rem] w-full border-4 border-black bg-white" />
            ))}
          </div>
        </div>
        <Skeleton className="h-[18rem] w-full border-4 border-black bg-white" />
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
  const activeLessons = lessons.filter((lesson) => lesson.progress > 0 && lesson.progress < 100).length;
  const avgProgress = lessons.length
    ? Math.round(lessons.reduce((sum, lesson) => sum + lesson.progress, 0) / lessons.length)
    : 0;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        className="neo-panel relative overflow-hidden bg-[#C4B5FD] px-6 py-7 sm:px-8"
        eyebrow="Learning track"
        title="Python Crash Course"
        description="Simple lesson flow. Pick a lesson and continue."
        actions={
          <div className="flex items-center gap-3">
            <Badge
              className="rounded-full border-4 border-black bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-black shadow-[4px_4px_0px_0px_#000]"
              variant="outline"
            >
              {lessons.length} lessons
            </Badge>
            <Badge
              className="rounded-full border-4 border-black bg-[#FFD93D] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-black shadow-[4px_4px_0px_0px_#000]"
              variant="outline"
            >
              {completedLessons} completed
            </Badge>
          </div>
        }
      />

      {loading || !data ? (
        <PythonSkeleton />
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="space-y-4">
            <Card className="neo-panel !overflow-hidden !rounded-none !border-4 !border-black !bg-[#FFD93D] !text-black !shadow-[8px_8px_0px_0px_#000]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-black">
                      Next lesson
                    </p>
                    <h2 className="neo-display mt-3 text-3xl">
                      {featuredLesson.title}
                    </h2>
                    <p className="mt-3 text-sm font-bold leading-7 text-black">
                      {featuredLesson.description}
                    </p>
                  </div>
                  <div className="hidden h-12 w-12 items-center justify-center border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000] lg:flex">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="border-4 border-black bg-white px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Progress</p>
                    <p className="mt-2 text-base font-black uppercase text-black">
                      {featuredLesson.progress}% complete
                    </p>
                  </div>
                  <div className="border-4 border-black bg-[#FF6B6B] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Duration</p>
                    <p className="mt-2 text-base font-black uppercase text-black">
                      {featuredLesson.duration} min
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

          <aside className="space-y-4">
            <div className="neo-panel bg-[#FFD93D] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black">
                Course stats
              </p>
              <p className="mt-2 text-2xl font-black uppercase text-black">
                Progress summary
              </p>
            </div>

            <div className="neo-panel bg-white p-4">
              <div className="space-y-3">
                <div className="border-4 border-black bg-[#FFFDF5] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Total lessons</p>
                  <p className="mt-2 text-xl font-black uppercase text-black">{lessons.length}</p>
                </div>
                <div className="border-4 border-black bg-[#C4B5FD] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Completed</p>
                  <p className="mt-2 text-xl font-black uppercase text-black">{completedLessons}</p>
                </div>
                <div className="border-4 border-black bg-[#FF6B6B] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">In progress</p>
                  <p className="mt-2 text-xl font-black uppercase text-black">{activeLessons}</p>
                </div>
                <div className="border-4 border-black bg-white px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-black">Avg progress</p>
                  <p className="mt-2 text-xl font-black uppercase text-black">{avgProgress}%</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

