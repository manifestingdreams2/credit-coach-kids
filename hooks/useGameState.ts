"use client";

import { useCallback, useEffect, useState } from "react";
import { curriculum } from "@/lib/creditCurriculum";

export const AVATARS = [
  "🦁",
  "🐼",
  "🦊",
  "🐯",
  "🦄",
  "🐸",
  "🦉",
  "🐙",
  "🦖",
  "🐉",
  "🦋",
  "🐬",
];

const STORAGE_KEY = "credit-coach-kids-v1";
const DEFAULT_AVATAR = AVATARS[0];
const MIN_SCORE = 300;
const MAX_SCORE = 850;
const START_SCORE = 500;

export type GameState = {
  creditScore: number;
  completedLessons: string[];
  completedLevels: string[];
  selectedAvatar: string;
  totalCoinsEarned: number;
};

const initialState: GameState = {
  creditScore: START_SCORE,
  completedLessons: [],
  completedLevels: [],
  selectedAvatar: DEFAULT_AVATAR,
  totalCoinsEarned: 0,
};

function clampScore(n: number) {
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, n));
}

function readStoredState(): GameState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Reads localStorage on mount; avoids hydration mismatch by starting with initialState on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readStoredState());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors
    }
  }, [state, loaded]);

  const adjustScore = useCallback((delta: number) => {
    setState((s) => ({ ...s, creditScore: clampScore(s.creditScore + delta) }));
  }, []);

  const setAvatar = useCallback((avatar: string) => {
    setState((s) => ({ ...s, selectedAvatar: avatar }));
  }, []);

  const resetProgress = useCallback(() => {
    setState(initialState);
  }, []);

  const markLessonComplete = useCallback(
    (lessonId: string, pointsEarned: number) => {
      setState((s) => {
        const alreadyDone = s.completedLessons.includes(lessonId);
        const newCompletedLessons = alreadyDone
          ? s.completedLessons
          : [...s.completedLessons, lessonId];

        const level = curriculum.find((lvl) =>
          lvl.lessons.some((l) => l.id === lessonId)
        );
        const levelNowComplete =
          level &&
          level.lessons.every((l) => newCompletedLessons.includes(l.id));

        const newCompletedLevels =
          levelNowComplete && level && !s.completedLevels.includes(level.id)
            ? [...s.completedLevels, level.id]
            : s.completedLevels;

        const pointsToAdd = alreadyDone ? 0 : pointsEarned;

        return {
          ...s,
          completedLessons: newCompletedLessons,
          completedLevels: newCompletedLevels,
          creditScore: clampScore(s.creditScore + pointsToAdd),
          totalCoinsEarned: s.totalCoinsEarned + pointsToAdd,
        };
      });
    },
    []
  );

  return {
    state,
    loaded,
    adjustScore,
    setAvatar,
    resetProgress,
    markLessonComplete,
  };
}
