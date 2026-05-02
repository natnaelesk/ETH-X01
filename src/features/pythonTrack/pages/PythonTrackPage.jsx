import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockResource } from "@/hooks/useMockResource";
import { cn } from "@/lib/utils";

import { getPythonTrack } from "../api";

function PythonCenterSkeleton() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-4 w-28 border-4 border-black bg-black/10" />
        <Skeleton className="h-8 w-48 border-4 border-black bg-black/10" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 w-full border-4 border-black bg-white"
          />
        ))}
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-32 border-4 border-black bg-black/10" />
        <Skeleton className="h-8 w-56 border-4 border-black bg-black/10" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 w-full border-4 border-black bg-[#FFFDF5]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function getStatusTone(status) {
  const normalized = String(status || "").toLowerCase();

  if (normalized.includes("complete")) return "bg-[#C4B5FD]";
  if (normalized.includes("progress")) return "bg-[#FFD93D]";
  if (normalized.includes("start") || normalized.includes("not")) {
    return "bg-[#FFFDF5]";
  }

  return "bg-white";
}

export function PythonTrackPage() {
  const { data, loading } = useMockResource(getPythonTrack, []);
  const featuredLesson = useMemo(
    () =>
      data?.find((lesson) => lesson.progress > 0 && lesson.progress < 100) ||
      data?.[1] ||
      data?.[0],
    [data],
  );
  const lessons = data || [];
  const lessonList = featuredLesson
    ? lessons.filter((lesson) => lesson.id !== featuredLesson.id)
    : lessons;
  const completedLessons = lessons.filter((lesson) => lesson.progress === 100).length;
  const activeLessons = lessons.filter(
    (lesson) => lesson.progress > 0 && lesson.progress < 100,
  ).length;
  const avgProgress = lessons.length
    ? Math.round(
        lessons.reduce((sum, lesson) => sum + lesson.progress, 0) /
          lessons.length,
      )
    : 0;

  const headerBadges = (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Badge
        className="rounded-full border-4 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[3px_3px_0px_0px_#000]"
        variant="outline"
      >
        {lessons.length} lessons
      </Badge>
      <Badge
        className="rounded-full border-4 border-black bg-[#FFD93D] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[3px_3px_0px_0px_#000]"
        variant="outline"
      >
        {completedLessons} completed
      </Badge>
    </div>
  );

  const continueLearningCard =
    loading || !data ? (
      <div className="mt-4 border-4 border-black bg-[#FFD93D] p-4 text-black shadow-[4px_4px_0px_0px_#000]">
        <p className="text-[10px] font-black uppercase tracking-[0.22em]">
          Loading
        </p>
        <p className="mt-2 text-sm font-bold">Fetching lessons...</p>
      </div>
    ) : featuredLesson ? (
      <div className="mt-4 border-4 border-black bg-[#FFD93D] p-4 text-black shadow-[4px_4px_0px_0px_#000]">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/80">
          {featuredLesson.level}
        </p>
        <h3 className="mt-2 text-base font-black uppercase leading-snug text-black sm:text-lg">
          {featuredLesson.title}
        </h3>
        <p className="mt-2 text-xs font-bold leading-6 text-black line-clamp-4">
          {featuredLesson.description}
        </p>

        <div className="mt-4 space-y-2 text-[10px]">
          <div className="flex flex-wrap gap-2">
            <span className="border-4 border-black bg-white px-2 py-1 font-black uppercase tracking-[0.12em] text-black shadow-[3px_3px_0px_0px_#000]">
              {featuredLesson.progress}%
            </span>
            <span className="border-4 border-black bg-[#C4B5FD] px-2 py-1 font-black uppercase tracking-[0.12em] text-black shadow-[3px_3px_0px_0px_#000]">
              {featuredLesson.duration} min
            </span>
            <span
              className={`border-4 border-black px-2 py-1 font-black uppercase tracking-[0.12em] text-black shadow-[3px_3px_0px_0px_#000] ${getStatusTone(featuredLesson.status)}`}
            >
              {featuredLesson.status}
            </span>
          </div>
        </div>

        <button
          className="neo-button mt-4 inline-flex w-full items-center justify-center gap-2 text-xs"
          type="button"
        >
          Continue lesson
        </button>
      </div>
    ) : (
      <div className="mt-4 border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
        <p className="text-xs font-bold text-black">No lessons available yet.</p>
      </div>
    );

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div
        className={cn(
          "flex flex-col gap-6",
          "lg:grid lg:h-[calc(100dvh-5.5rem)] lg:max-h-[calc(100dvh-5.5rem)] lg:min-h-0",
          "lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)_minmax(200px,280px)] lg:items-stretch lg:gap-6",
        )}
      >
        <aside className="order-1 min-h-0 lg:order-none">
          <div className="lg:sticky lg:top-24">
            <div className="neo-panel relative overflow-hidden border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000] sm:p-5">
              <div className="flex flex-col gap-2">
                <p className="neo-kicker w-fit bg-[#C4B5FD] text-[10px]">
                  Learning Track
                </p>
                <h1 className="neo-display text-2xl leading-tight text-black sm:text-3xl">
                  Python Crash Course
                </h1>
                <p className="text-xs font-bold leading-6 text-black sm:text-sm">
                  Simple lesson flow. Stay consistent with one highlighted lesson,
                  then continue down the list.
                </p>
                {!loading && data ? headerBadges : null}
              </div>
            </div>
          </div>
        </aside>

        <main
          className={cn(
            "order-3 min-h-0 lg:order-none lg:col-start-2 lg:row-start-1",
            "lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1",
          )}
        >
          {loading || !data ? (
            <PythonCenterSkeleton />
          ) : (
            <div className="space-y-8 pb-4 lg:space-y-10 xl:grid xl:grid-cols-[minmax(0,1fr)_min(320px,36%)] xl:items-start xl:gap-8 xl:space-y-0">
              <div className="space-y-4 xl:min-w-0">
                <div className="space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                    Lesson Path
                  </p>
                  <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                    All Lessons
                  </h2>
                </div>

                <div className="neo-panel divide-y-4 divide-black overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                  {lessonList.map((lesson) => (
                    <div
                      className="px-5 py-5 transition-colors hover:bg-[#FFF4B8] sm:px-6"
                      key={lesson.id}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/70">
                            {lesson.level}
                          </p>
                          <h3 className="mt-2 text-xl font-black uppercase text-black">
                            {lesson.title}
                          </h3>
                          <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-black">
                            {lesson.description}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                          <span className="border-4 border-black bg-[#FFFDF5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
                            {lesson.duration} min
                          </span>
                          <span
                            className={`border-4 border-black px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000] ${getStatusTone(lesson.status)}`}
                          >
                            {lesson.status}
                          </span>
                          <span className="border-4 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
                            {lesson.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!lessonList.length ? (
                    <div className="px-6 py-8">
                      <p className="text-sm font-bold text-black">
                        No extra lessons in the list yet.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="space-y-4 pb-2 xl:sticky xl:top-0">
                <div className="space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                    Progress
                  </p>
                  <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                    Learning Summary
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="neo-panel border-4 border-black bg-[#FFFDF5] p-5 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                      Total lessons
                    </p>
                    <p className="mt-2 text-2xl font-black uppercase text-black">
                      {lessons.length}
                    </p>
                  </div>
                  <div className="neo-panel border-4 border-black bg-[#C4B5FD] p-5 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                      Completed
                    </p>
                    <p className="mt-2 text-2xl font-black uppercase text-black">
                      {completedLessons}
                    </p>
                  </div>
                  <div className="neo-panel border-4 border-black bg-[#FFD93D] p-5 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                      In progress
                    </p>
                    <p className="mt-2 text-2xl font-black uppercase text-black">
                      {activeLessons}
                    </p>
                  </div>
                  <div className="neo-panel border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                      Avg progress
                    </p>
                    <p className="mt-2 text-2xl font-black uppercase text-black">
                      {avgProgress}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <aside className="order-2 min-h-0 lg:order-none lg:col-start-3 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <div className="neo-panel border-4 border-black bg-[#FFFDF5] p-4 shadow-[6px_6px_0px_0px_#000] sm:p-5">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
                  Featured
                </p>
                <h2 className="text-lg font-black uppercase leading-tight text-black sm:text-xl">
                  Continue Learning
                </h2>
              </div>
              {continueLearningCard}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
