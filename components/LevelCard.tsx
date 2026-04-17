"use client";

import { useState } from "react";
import type { Level } from "@/lib/creditCurriculum";
import LessonCard from "./LessonCard";

type Props = {
  level: Level;
  completedLessons: string[];
  creditScore: number;
  index?: number;
};

export default function LevelCard({
  level,
  completedLessons,
  creditScore,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const locked = creditScore < level.unlockScore;
  const completed = level.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const total = level.lessons.length;
  const allDone = total > 0 && completed === total;

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition-all ${
        locked ? "opacity-70" : "hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={() => !locked && setExpanded((p) => !p)}
        disabled={locked}
        aria-expanded={expanded}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div
          className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-xl font-bold text-white shadow ${
            locked
              ? "bg-slate-400"
              : allDone
              ? "bg-emerald-500"
              : "bg-violet-500"
          }`}
          aria-hidden
        >
          {locked ? "🔒" : allDone ? "🏆" : level.number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-800">
            Level {level.number} · {level.title}
          </h3>
          <p className="text-xs text-slate-500 truncate">{level.description}</p>
          <p className="text-xs font-semibold text-slate-600 mt-1">
            {locked
              ? `Unlock at score ${level.unlockScore}`
              : `${completed} / ${total} lessons`}
          </p>
        </div>
        {!locked && (
          <span
            className={`text-slate-400 transition-transform text-lg ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ⌄
          </span>
        )}
      </button>

      {expanded && !locked && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-2">
          {level.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              done={completedLessons.includes(lesson.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
