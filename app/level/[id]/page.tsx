"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getLevelById } from "@/lib/creditCurriculum";
import { useGameState } from "@/hooks/useGameState";
import LessonCard from "@/components/LessonCard";
import ProgressBar from "@/components/ProgressBar";

export default function LevelPage() {
  const params = useParams<{ id: string }>();
  const level = useMemo(
    () => (params?.id ? getLevelById(params.id) : undefined),
    [params]
  );
  const { state, loaded } = useGameState();

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-violet-50 to-violet-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-3 max-w-sm">
          <p className="text-4xl">🤔</p>
          <p className="font-bold text-slate-800">Level not found.</p>
          <Link
            href="/"
            className="inline-block bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold px-4 py-2 rounded-xl"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const completed = level.lessons.filter((l) =>
    state.completedLessons.includes(l.id)
  ).length;
  const locked = loaded && state.creditScore < level.unlockScore;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-violet-50 to-violet-100 px-4 py-6 pb-16">
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        <Link
          href="/"
          className="text-slate-500 font-bold text-sm hover:text-slate-800 self-start"
        >
          ← Home
        </Link>

        <div className="bg-white rounded-3xl shadow-sm p-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
            Level {level.number}
          </p>
          <h1 className="text-3xl font-extrabold text-slate-800">
            {level.title}
          </h1>
          <p className="text-slate-600">{level.description}</p>
          <ProgressBar
            current={completed}
            total={level.lessons.length}
            color="#8b5cf6"
            showLabel={false}
          />
          <p className="text-xs font-semibold text-slate-500">
            {completed} / {level.lessons.length} lessons complete
          </p>
        </div>

        {locked ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center space-y-2">
            <p className="text-4xl" aria-hidden>
              🔒
            </p>
            <p className="font-bold text-slate-800">Locked</p>
            <p className="text-sm text-slate-500">
              Reach a credit score of {level.unlockScore} to unlock.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {level.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                done={state.completedLessons.includes(lesson.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
