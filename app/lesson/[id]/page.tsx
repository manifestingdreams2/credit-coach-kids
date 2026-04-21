"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGameState } from "@/hooks/useGameState";
import {
  getLessonById,
  getLessonFlashcards,
  getLevelForLesson,
} from "@/lib/creditCurriculum";
import FlashcardDeck from "@/components/FlashcardDeck";
import QuizCard from "@/components/QuizCard";
import ScenarioCard from "@/components/ScenarioCard";
import ProgressBar from "@/components/ProgressBar";
import ScoreBadge from "@/components/ScoreBadge";

type Phase = "intro" | "cards" | "quiz" | "complete";

type ResumeMap = Record<
  string,
  { phase: Phase; cardIndex: number } | undefined
>;

const RESUME_KEY = "credit-coach-kids-lesson-resume-v1";

function readResume(): ResumeMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(RESUME_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ResumeMap;
  } catch {
    return {};
  }
}

function writeResume(map: ResumeMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RESUME_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const lessonId = params?.id ?? "";
  const lesson = useMemo(
    () => (lessonId ? getLessonById(lessonId) : undefined),
    [lessonId]
  );
  const level = useMemo(
    () => (lessonId ? getLevelForLesson(lessonId) : undefined),
    [lessonId]
  );
  const flashcards = useMemo(
    () => (lesson ? getLessonFlashcards(lesson) : []),
    [lesson]
  );

  const { state, loaded, markLessonComplete } = useGameState();
  const [phase, setPhase] = useState<Phase>("intro");
  const [cardIndex, setCardIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (!lessonId || restored) return;
    const map = readResume();
    const entry = map[lessonId];
    if (entry && (entry.phase === "cards" || entry.phase === "intro")) {
      setPhase(entry.phase);
      setCardIndex(Math.max(0, entry.cardIndex ?? 0));
    }
    setRestored(true);
  }, [lessonId, restored]);

  const persistResume = useCallback(
    (next: { phase: Phase; cardIndex: number }) => {
      if (!lessonId) return;
      const map = readResume();
      if (next.phase === "complete") {
        delete map[lessonId];
      } else {
        map[lessonId] = { phase: next.phase, cardIndex: next.cardIndex };
      }
      writeResume(map);
    },
    [lessonId]
  );

  useEffect(() => {
    if (!restored) return;
    persistResume({ phase, cardIndex });
  }, [phase, cardIndex, restored, persistResume]);

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

  const startCards = () => {
    setPhase("cards");
  };

  const startQuiz = () => {
    setQIndex(0);
    setCorrectCount(0);
    setPhase("quiz");
  };

  const reviewLesson = () => {
    setPhase("cards");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-violet-50 to-violet-100 px-4 py-6 pb-24">
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-slate-500 font-bold text-sm hover:text-slate-800"
          >
            ← Home
          </Link>
          {phase === "quiz" && (
            <>
              <div className="flex-1">
                <ProgressBar
                  current={qIndex + 1}
                  total={total}
                  showLabel={false}
                  height={8}
                  color="#8b5cf6"
                />
              </div>
              <span className="text-xs font-bold text-slate-500 tabular-nums">
                {qIndex + 1} / {total}
              </span>
            </>
          )}
        </div>

        {phase === "intro" && (
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
                {level ? `Level ${level.number} · ${level.title}` : "Lesson"}
              </p>
              <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">
                {lesson.title}
              </h1>
              <p className="text-sm font-semibold text-slate-500">
                {lesson.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-violet-50 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-1" aria-hidden>
                  🧠
                </p>
                <p className="text-2xl font-extrabold text-violet-600">
                  {flashcards.length}
                </p>
                <p className="text-xs font-bold text-violet-500 uppercase tracking-wider">
                  Flash Cards
                </p>
              </div>
              <div className="bg-sky-50 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-1" aria-hidden>
                  ❓
                </p>
                <p className="text-2xl font-extrabold text-sky-600">{total}</p>
                <p className="text-xs font-bold text-sky-500 uppercase tracking-wider">
                  Quiz Questions
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                How it works
              </p>
              <ol className="list-decimal list-inside text-sm font-semibold text-slate-700 space-y-1">
                <li>Read the flash cards to learn the idea.</li>
                <li>Then answer a short quiz to earn coins.</li>
                <li>Tap “Review Lesson” in the quiz if you need a reminder.</li>
              </ol>
            </div>

            <button
              type="button"
              onClick={startCards}
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-extrabold py-4 rounded-2xl transition-colors active:scale-[0.99] text-lg"
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Start Learning →
            </button>
          </div>
        )}

        {phase === "cards" && (
          <FlashcardDeck
            cards={flashcards}
            initialIndex={cardIndex}
            onIndexChange={setCardIndex}
            onComplete={startQuiz}
            ctaLabel="Start Quiz"
          />
        )}

        {phase === "quiz" && currentQ && (
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

            <button
              type="button"
              onClick={reviewLesson}
              className="self-center text-sm font-bold text-violet-600 hover:text-violet-800 underline underline-offset-4"
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              ← Review Lesson
            </button>
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

            <div className="bg-violet-50 rounded-2xl p-4 text-left space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                Recap
              </p>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                {lesson.closingTip}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={reviewLesson}
                className="w-full bg-white border-2 border-violet-300 text-violet-700 font-bold py-3 rounded-2xl hover:bg-violet-50 transition-colors active:scale-[0.99]"
                style={{
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Review Cards
              </button>
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 rounded-2xl transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
