"use client";

import { useState } from "react";
import type { ScenarioQuestion } from "@/lib/creditCurriculum";

type Props = {
  question: ScenarioQuestion;
  onNext: (correct: boolean) => void;
};

export default function ScenarioCard({ question, onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const chosen = answered ? question.choices[selected] : null;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">
      <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
        What Would You Do?
      </p>
      <h3 className="text-xl font-bold text-slate-800 leading-snug">
        {question.prompt}
      </h3>

      <div className="space-y-2">
        {question.choices.map((c, i) => {
          const isSelected = selected === i;
          let style =
            "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
          if (answered && isSelected && c.correct) {
            style = "bg-emerald-100 border-emerald-400 text-emerald-800";
          } else if (answered && isSelected && !c.correct) {
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
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all active:scale-[0.99] ${style}`}
            >
              {c.text}
            </button>
          );
        })}
      </div>

      {answered && chosen && (
        <div
          className={`rounded-2xl p-4 ${
            chosen.correct ? "bg-emerald-50" : "bg-rose-50"
          }`}
        >
          <p
            className={`text-sm font-bold mb-1 ${
              chosen.correct ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {chosen.correct ? "Smart move." : "Here's what happens."}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {chosen.outcome}
          </p>
        </div>
      )}

      {answered && chosen && (
        <button
          type="button"
          onClick={() => onNext(chosen.correct)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-colors active:scale-[0.99]"
        >
          Next
        </button>
      )}
    </div>
  );
}
