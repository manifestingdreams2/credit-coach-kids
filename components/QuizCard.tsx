"use client";

import { useState } from "react";
import type { MCQuestion } from "@/lib/creditCurriculum";

type Props = {
  question: MCQuestion;
  onNext: (correct: boolean) => void;
};

export default function QuizCard({ question, onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = answered && selected === question.correctIndex;

  const letter = (i: number) => String.fromCharCode(65 + i);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">
      <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
        Multiple Choice
      </p>
      <h3 className="text-xl font-bold text-slate-800 leading-snug">
        {question.prompt}
      </h3>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          let style =
            "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
          if (answered && isCorrect) {
            style = "bg-emerald-100 border-emerald-400 text-emerald-800";
          } else if (answered && isSelected && !isCorrect) {
            style = "bg-rose-100 border-rose-400 text-rose-800";
          } else if (answered) {
            style = "bg-slate-50 border-slate-200 text-slate-500";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full flex items-start gap-3 text-left p-4 rounded-xl border-2 font-semibold transition-all active:scale-[0.99] ${style}`}
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-white/80 text-slate-500 text-xs font-bold flex items-center justify-center border border-slate-200">
                {letter(i)}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`rounded-2xl p-4 ${
            correct ? "bg-emerald-50" : "bg-rose-50"
          }`}
        >
          <p
            className={`text-sm font-bold mb-1 ${
              correct ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {correct ? "Correct!" : "Not quite."}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {answered && (
        <button
          type="button"
          onClick={() => onNext(correct)}
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 rounded-xl transition-colors active:scale-[0.99]"
        >
          Next
        </button>
      )}
    </div>
  );
}
