"use client";

import { useEffect, useRef, useState } from "react";
import { getScoreBand } from "@/lib/creditCurriculum";

type Size = "sm" | "md" | "lg";

type Props = {
  score: number;
  size?: Size;
};

const sizeMap: Record<Size, { wrap: string; num: string; label: string }> = {
  sm: { wrap: "w-20 h-20", num: "text-2xl", label: "text-[10px]" },
  md: { wrap: "w-28 h-28", num: "text-3xl", label: "text-xs" },
  lg: { wrap: "w-40 h-40", num: "text-5xl", label: "text-sm" },
};

export default function ScoreBadge({ score, size = "md" }: Props) {
  const [displayScore, setDisplayScore] = useState(score);
  const prevRef = useRef(score);

  useEffect(() => {
    const from = prevRef.current;
    const to = score;
    if (from === to) return;
    const duration = 700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(from + (to - from) * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const band = getScoreBand(score);
  const s = sizeMap[size];

  return (
    <div
      className={`${s.wrap} rounded-full shadow-lg flex flex-col items-center justify-center text-white ring-4 ring-white/60`}
      style={{
        background: `linear-gradient(135deg, ${band.color}, ${band.color}cc)`,
      }}
      aria-label={`Credit score ${score}, ${band.label}`}
    >
      <span className={`${s.num} font-extrabold leading-none tabular-nums`}>
        {displayScore}
      </span>
      <span
        className={`${s.label} font-bold uppercase tracking-widest mt-1 opacity-95`}
      >
        {band.label}
      </span>
    </div>
  );
}
