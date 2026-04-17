"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGameState } from "@/hooks/useGameState";
import { getLessonById, getLevelForLesson } from "@/lib/creditCurriculum";
import QuizCard from "@/components/QuizCard";
import ScenarioCard from "@/components/ScenarioCard";
import ProgressBar from "@/components/ProgressBar";
import ScoreBadge from "@/components/ScoreBadge";

type Phase = "concept" | "questions" | "complete";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const lessonId = params?.id;
  const lesson = useMemo(
    () => (lessonId ? getLessonById(lessonId) : undefined),
    [lessonId]
  );
  const level = useMemo(
    () => (lessonId ? getLevelForLesson(lessonId) : undefined),
    [lessonId]
  );

  const { state, loaded, markLessonComplete } = useGameState();
  const [phase, setPhase] = useState<Phase>("concept");
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState(0);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-violet-100">
        <div className="text-4xl">📘</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-violet-50 to-violet-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-3 max-w-sm">
          <p className="text-4xl">🤔</p>
          <p className="font-bold text-slate-800">Lesson not found.</p>
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

  const total = lesson.questions.length;
  const currentQ = lesson.questions[qIndex];

  const handleAnswer = (correct: boolean) => {
    const nextCorrect = correctCount + (correct ? 1 : 0);
    setCorrectCount(nextCorrect);
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      return;
    }
    const perQuestion = nextCorrect * 5;
    const bonus = nextCorrect === total ? 15 : 0;
    const points = perQuestion + bonus;
    const alreadyDone = state.completedLessons.includes(lesson.id);
    const effectivePoints = alreadyDone ? 0 : points;
    const projected = Math.max(
      300,
      Math.min(850, state.creditScore + effectivePoints)
    );
    setPointsAwarded(effectivePoints);
    setFinalScore(projected);
    markLessonComplete(lesson.id, points);
    setPhase("complete");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-violet-50 to-violet-100 px-4 py-6 pb-16">
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-slate-500 font-bold text-sm hover:text-slate-800"
          >
            ← Home
          </Link>
          {phase === "questions" && (
            <div className="flex-1">
              <ProgressBar
                current={qIndex + 1}
                total={total}
                showLabel={false}
                height={8}
                color="#8b5cf6"
              />
            </div>
          )}
          {phase === "questions" && (
            <span className="text-xs font-bold text-slate-500 tabular-nums">
              {qIndex + 1} / {total}
            </span>
          )}
        </div>

        {phase === "concept" && (
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
                {level ? `Level ${level.number} · ${level.title}` : "Lesson"}
              </p>
              <h1 className="text-2xl font-extrabold text-slate-800">
                {lesson.title}
              </h1>
              <p className="text-sm font-semibold text-slate-500">
                {lesson.description}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-slate-700 leading-relaxed">{lesson.concept}</p>
            </div>
            <button
              type="button"
              onClick={() => setPhase("questions")}
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-2xl transition-colors active:scale-[0.99]"
            >
              Start Quiz
            </button>
          </div>
        )}

        {phase === "questions" && currentQ && (
          <>
            {currentQ.kind === "mcq" ? (
              <QuizCard
                key={qIndex}
                question={currentQ}
                onNext={handleAnswer}
              />
            ) : (
              <ScenarioCard
                key={qIndex}
                question={currentQ}
                onNext={handleAnswer}
              />
            )}
          </>
        )}

        {phase === "complete" && finalScore !== null && (
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5 text-center">
            <div className="text-5xl" aria-hidden>
              {correctCount === total
                ? "🏆"
                : correctCount >= total - 1
                ? "🎉"
                : "📘"}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                {correctCount === total
                  ? "Perfect Score!"
                  : correctCount >= total - 1
                  ? "Great Work!"
                  : "Lesson Complete"}
              </h2>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                You got {correctCount} of {total} correct
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Points Earned
              </p>
              <p className="text-4xl font-extrabold text-violet-600 tabular-nums">
                +{pointsAwarded}
              </p>
              {correctCount === total && pointsAwarded > 0 && (
                <p className="text-xs font-bold text-emerald-600">
                  Includes +15 perfect-lesson bonus
                </p>
              )}
              {pointsAwarded === 0 && (
                <p className="text-xs font-semibold text-slate-500">
                  Replay — no new points, just practice!
                </p>
              )}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                New Credit Score
              </p>
              <div className="flex justify-center">
                <ScoreBadge score={finalScore} size="md" />
              </div>
            </div>

            <div className="bg-violet-50 rounded-2xl p-4 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-1">
                Tip
              </p>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                {lesson.closingTip}
              </p>
            </div>

            <Link
              href="/"
              className="block w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-2xl transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
