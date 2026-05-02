import { Link, useParams } from "react-router-dom";

import { getPythonLessonById } from "../api";

function getStatusTone(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("complete")) return "bg-[#C4B5FD]";
  if (normalized.includes("progress")) return "bg-[#FFD93D]";
  if (normalized.includes("start") || normalized.includes("not")) {
    return "bg-[#FFFDF5]";
  }
  return "bg-white";
}

export function PythonLessonDetailPage() {
  const { id } = useParams();
  const lesson = getPythonLessonById(id);

  if (!lesson) {
    return (
      <section className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6">
        <div className="neo-panel border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000]">
          <p className="text-sm font-bold text-black">Lesson not found.</p>
          <Link className="neo-button mt-6 inline-flex" to="/python">
            Back to Python track
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <Link
          className="text-xs font-black uppercase tracking-[0.2em] text-black underline decoration-4 underline-offset-4"
          to="/python"
        >
          ← Python crash course
        </Link>
      </div>

      <div className="neo-panel border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] sm:p-8">
        <p className="neo-kicker w-fit bg-[#C4B5FD] text-[10px]">{lesson.level}</p>
        <h1 className="neo-display mt-3 text-2xl leading-tight text-black sm:text-3xl">
          {lesson.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="border-4 border-black bg-[#FFFDF5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
            {lesson.duration} min
          </span>
          <span
            className={`border-4 border-black px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000] ${getStatusTone(lesson.status)}`}
          >
            {lesson.status}
          </span>
          <span className="border-4 border-black bg-[#FFD93D] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000]">
            {lesson.progress}% complete
          </span>
        </div>

        <p className="mt-6 text-sm font-bold leading-7 text-black sm:text-base">
          {lesson.description}
        </p>

        <div className="mt-8 border-4 border-black bg-black shadow-[6px_6px_0px_0px_#000]">
          <div className="flex aspect-video items-center justify-center bg-[#1a1a1a]">
            <p className="px-6 text-center text-xs font-black uppercase tracking-[0.2em] text-white">
              Video placeholder — embed will connect via backend later
            </p>
          </div>
        </div>

        <div className="mt-8 border-4 border-black bg-[#FFFDF5] p-6 shadow-[4px_4px_0px_0px_#000]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
            Notes
          </p>
          <p className="mt-3 text-sm font-bold leading-7 text-black">{lesson.notes}</p>
        </div>

        <div className="mt-6 border-4 border-dashed border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
            Quiz
          </p>
          <p className="mt-3 text-sm font-bold leading-7 text-black">
            {lesson.quizPreview}
          </p>
          <button className="neo-button-secondary mt-6" type="button">
            Start quiz (UI only)
          </button>
        </div>
      </div>
    </section>
  );
}
