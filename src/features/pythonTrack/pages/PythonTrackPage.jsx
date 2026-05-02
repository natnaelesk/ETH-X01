import { useMemo } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockResource } from "@/hooks/useMockResource";
import { getPythonTrack } from "../api";

function PythonSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-40 w-full border-4 border-black bg-[#C4B5FD]" />
      <Skeleton className="h-[20rem] w-full border-4 border-black bg-[#FFD93D]" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 w-full border-4 border-black bg-white"
          />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-24 w-full border-4 border-black bg-[#FFFDF5]"
          />
        ))}
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

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-8 sm:space-y-10">
        <PageHeader
          className="neo-panel relative overflow-hidden bg-white px-6 py-7 sm:px-8"
          eyebrow="Learning Track"
          title="Python Crash Course"
          description="Simple lesson flow. Stay consistent with one highlighted lesson, then continue down the list."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className="rounded-full border-4 border-black bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
                variant="outline"
              >
                {lessons.length} lessons
              </Badge>
              <Badge
                className="rounded-full border-4 border-black bg-[#FFD93D] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]"
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
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                  Featured
                </p>
                <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                  Continue Learning
                </h2>
              </div>

              {featuredLesson ? (
                <div className="neo-panel bg-[#FFD93D] p-6 sm:p-7">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/80">
                    {featuredLesson.level}
                  </p>
                  <h3 className="neo-display mt-3 text-3xl text-black sm:text-4xl">
                    {featuredLesson.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-black sm:text-base">
                    {featuredLesson.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="border-4 border-black bg-white px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                        Progress
                      </p>
                      <p className="mt-2 text-base font-black uppercase text-black">
                        {featuredLesson.progress}% complete
                      </p>
                    </div>
                    <div className="border-4 border-black bg-[#C4B5FD] px-4 py-4 shadow-[4px_4px_0px_0px_#000]">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                        Duration
                      </p>
                      <p className="mt-2 text-base font-black uppercase text-black">
                        {featuredLesson.duration} min
                      </p>
                    </div>
                    <div
                      className={`border-4 border-black px-4 py-4 shadow-[4px_4px_0px_0px_#000] ${getStatusTone(featuredLesson.status)}`}
                    >
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                        Status
                      </p>
                      <p className="mt-2 text-base font-black uppercase text-black">
                        {featuredLesson.status}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="neo-button" type="button">
                      Continue lesson 
                    </button>
                  </div>
                </div>
              ) : (
                <div className="neo-panel bg-white p-8">
                  <p className="text-sm font-bold text-black">
                    No lessons available yet.
                  </p>
                </div>
              )}
            </section>

            <section className="space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                  Lesson Path
                </p>
                <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                  All Lessons
                </h2>
              </div>

              <div className="neo-panel divide-y-4 divide-black overflow-hidden bg-white">
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
            </section>

            <section className="space-y-4 pb-2">
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
                  Progress
                </p>
                <h2 className="text-2xl font-black uppercase text-black sm:text-3xl">
                  Learning Summary
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="neo-panel bg-[#FFFDF5] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                    Total lessons
                  </p>
                  <p className="mt-2 text-2xl font-black uppercase text-black">
                    {lessons.length}
                  </p>
                </div>
                <div className="neo-panel bg-[#C4B5FD] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                    Completed
                  </p>
                  <p className="mt-2 text-2xl font-black uppercase text-black">
                    {completedLessons}
                  </p>
                </div>
                <div className="neo-panel bg-[#FFD93D] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                    In progress
                  </p>
                  <p className="mt-2 text-2xl font-black uppercase text-black">
                    {activeLessons}
                  </p>
                </div>
                <div className="neo-panel bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                    Avg progress
                  </p>
                  <p className="mt-2 text-2xl font-black uppercase text-black">
                    {avgProgress}%
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
