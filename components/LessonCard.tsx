"use client";

import Link from "next/link";
import type { Lesson } from "@/lib/creditCurriculum";

type Props = {
  lesson: Lesson;
  done: boolean;
};

export default function LessonCard({ lesson, done }: Props) {
  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors active:scale-[0.99] ${
        done
          ? "bg-emerald-50 hover:bg-emerald-100"
          : "bg-violet-50 hover:bg-violet-100"
      }`}
    >
      <span className="text-xl" aria-hidden>
        {done ? "✅" : "📘"}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate">
          {lesson.title}
        </p>
        <p className="text-xs text-slate-500 truncate">{lesson.description}</p>
      </div>
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full text-white shrink-0 ${
          done ? "bg-emerald-500" : "bg-violet-500"
        }`}
      >
        {done ? "Replay" : "Start"}
      </span>
    </Link>
  );
}
