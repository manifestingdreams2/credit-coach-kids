"use client";

import { useEffect, useRef, useState } from "react";
import type { FlashCard } from "@/lib/creditCurriculum";

type Props = {
  cards: FlashCard[];
  onComplete: () => void;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  ctaLabel?: string;
};

export default function FlashcardDeck({
  cards,
  onComplete,
  onIndexChange,
  initialIndex = 0,
  ctaLabel = "Start Quiz",
}: Props) {
  const safeInitial = Math.min(
    Math.max(0, initialIndex),
    Math.max(0, cards.length - 1)
  );
  const [index, setIndex] = useState(safeInitial);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  if (cards.length === 0) {
    return null;
  }

  const card = cards[index];
  const isLast = index === cards.length - 1;
  const isFirst = index === 0;

  const next = () => {
    if (isLast) {
      onComplete();
    } else {
      setIndex((i) => Math.min(cards.length - 1, i + 1));
    }
  };

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (startX === null || startY === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else if (!isFirst) prev();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>
          Card {index + 1} of {cards.length}
        </span>
        <span className="tabular-nums">
          {Math.round(((index + 1) / cards.length) * 100)}%
        </span>
      </div>

      <div className="flex gap-1.5" aria-hidden>
        {cards.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i <= index ? "bg-violet-500" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div
        role="group"
        aria-label={`Flash card ${index + 1} of ${cards.length}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="bg-gradient-to-br from-white to-violet-50 rounded-3xl shadow-lg p-6 min-h-[320px] flex flex-col justify-between select-none"
        style={{ touchAction: "pan-y" }}
      >
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          {card.emoji && (
            <div className="text-6xl leading-none" aria-hidden>
              {card.emoji}
            </div>
          )}
          <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">
            {card.title}
          </h2>
          <p className="text-lg leading-relaxed font-semibold text-slate-600 max-w-sm">
            {card.text}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={prev}
            disabled={isFirst}
            aria-label="Previous card"
            className="px-5 py-3 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={next}
            aria-label={isLast ? ctaLabel : "Next card"}
            className={`flex-1 px-5 py-3 rounded-2xl font-extrabold text-white shadow-md active:scale-[0.98] transition-all ${
              isLast
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110"
                : "bg-gradient-to-r from-violet-500 to-violet-600 hover:brightness-110"
            }`}
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {isLast ? `${ctaLabel} →` : "Next →"}
          </button>
        </div>
      </div>

      <p className="text-center text-xs font-semibold text-slate-400">
        Tip: swipe left or right, or use the buttons.
      </p>
    </div>
  );
}
