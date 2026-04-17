"use client";

import { useEffect } from "react";
import { AVATARS } from "@/hooks/useGameState";

type Props = {
  selected: string;
  onSelect: (avatar: string) => void;
  open?: boolean;
  onClose?: () => void;
};

export default function AvatarPicker({
  selected,
  onSelect,
  open,
  onClose,
}: Props) {
  const asModal = typeof open === "boolean";

  useEffect(() => {
    if (!asModal || !open || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [asModal, open, onClose]);

  if (asModal && !open) return null;

  const grid = (
    <div className="grid grid-cols-4 gap-3">
      {AVATARS.map((a) => {
        const isSelected = a === selected;
        return (
          <button
            key={a}
            type="button"
            onClick={() => {
              onSelect(a);
              if (asModal && onClose) onClose();
            }}
            className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all active:scale-95 ${
              isSelected
                ? "bg-white/30 ring-4 ring-yellow-300 shadow-lg"
                : "bg-white/10 hover:bg-white/20 ring-1 ring-white/20"
            }`}
            aria-pressed={isSelected}
            aria-label={`Avatar ${a}`}
          >
            {a}
          </button>
        );
      })}
    </div>
  );

  if (asModal) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pick your avatar"
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Pick Your Avatar</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {AVATARS.map((a) => {
              const isSelected = a === selected;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    onSelect(a);
                    if (onClose) onClose();
                  }}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all active:scale-95 ${
                    isSelected
                      ? "bg-violet-100 ring-4 ring-violet-500"
                      : "bg-slate-50 hover:bg-slate-100 ring-1 ring-slate-200"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Avatar ${a}`}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-3">
        Your Avatar
      </h2>
      {grid}
    </div>
  );
}
