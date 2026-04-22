"use client";

import { useState } from "react";
import type { MCQuestion } from "@/lib/creditCurriculum";
import SpeakerButton from "@/components/SpeakerButton";
import { useAccessibility } from "@/components/AccessibilityProvider";

type Props = {
  question: MCQuestion;
  onNext: (correct: boolean) => void;
};

function letter(i: number) {
  return String.fromCharCode(65 + i);
}

function spokenPrompt(question: MCQuestion): string {
  const opts = question.options
    .map((o, i) => `Option ${letter(i)}: ${o}.`)
    .join(" ");
  return `Question. ${question.prompt}. ${opts}`;
}

export default function QuizCard({ question, onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const { prefs } = useAccessibility();
  const answered = selected !== null;
  const correct = answered && selected === question.correctIndex;

  const feedbackSpoken = answered
    ? correct
      ? `Great job! Correct. ${question.explanation}`
      : `Not quite. ${question.explanation}`
    : "";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
          Multiple Choice
        </p>
        <SpeakerButton text={spokenPrompt(question)} label="Listen" />
      </div>

      <h3 className="text-xl font-bold text-slate-800 leading-snug">
        {question.prompt}
      </h3>

      <div className="space-y-2" role="radiogroup" aria-label="Answer choices">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          let style =
            "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
          let icon = "";
          if (answered && isCorrect) {
            style = "bg-emerald-100 border-emerald-500 text-emerald-900";
            icon = "✓";
          } else if (answered && isSelected && !isCorrect) {
            style = "bg-rose-100 border-rose-500 text-rose-900";
            icon = "✗";
          } else if (answered) {
            style = "bg-slate-50 border-slate-200 text-slate-500";
          }
          const choiceLabel = answered
            ? isCorrect
              ? `${letter(i)}: ${opt}. Correct answer.`
              : isSelected
              ? `${letter(i)}: ${opt}. Your answer, incorrect.`
              : `${letter(i)}: ${opt}.`
            : `${letter(i)}: ${opt}`;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={choiceLabel}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full flex items-start gap-3 text-left p-4 rounded-xl border-2 font-semibold transition-all active:scale-[0.99] ${style}`}
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                minHeight: 56,
              }}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-white/80 text-slate-600 text-xs font-bold flex items-center justify-center border border-slate-200">
                {letter(i)}
              </span>
              <span className="flex-1">{opt}</span>
              {icon && (
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-base ${
                    icon === "✓"
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {icon}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`rounded-2xl p-4 border-2 ${
            correct
              ? "bg-emerald-50 border-emerald-300"
              : "bg-rose-50 border-rose-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-white text-lg ${
                correct ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {correct ? "✓" : "✗"}
            </span>
            <p
              className={`text-base font-extrabold ${
                correct ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {correct ? "Great Job! Correct." : "Not quite. Try to remember…"}
            </p>
            <SpeakerButton
              text={feedbackSpoken}
              label="Listen"
              className="ml-auto"
            />
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {question.explanation}
          </p>
          {prefs.captions && (
            <p className="text-xs font-semibold text-slate-500 mt-2">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-slate-500 text-white px-2 py-0.5 rounded-full mr-2 align-middle">
                Caption
              </span>
              {feedbackSpoken}
            </p>
          )}
        </div>
      )}

      {answered && (
        <button
          type="button"
          onClick={() => onNext(correct)}
          aria-label={correct ? "Correct. Continue to next." : "Continue to next."}
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 rounded-xl transition-colors active:scale-[0.99]"
          style={{
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            minHeight: 48,
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}
