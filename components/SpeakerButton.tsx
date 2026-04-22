"use client";

import { useAccessibility } from "@/components/AccessibilityProvider";

type Props = {
  text: string;
  label?: string;
  variant?: "solid" | "ghost";
  className?: string;
};

export default function SpeakerButton({
  text,
  label = "Listen",
  variant = "solid",
  className = "",
}: Props) {
  const { speak, stop, speaking, supported, prefs } = useAccessibility();

  if (!supported) return null;

  const active = speaking;
  const disabled = !prefs.narration;

  const baseClass =
    "inline-flex items-center justify-center gap-1.5 rounded-full font-bold text-sm px-3 py-2 transition-colors active:scale-[0.97]";
  const variantClass =
    variant === "solid"
      ? "bg-violet-100 hover:bg-violet-200 text-violet-800"
      : "bg-white/10 hover:bg-white/20 text-white";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const ariaLabel = disabled
    ? `${label} — narration is off. Turn it on in Settings.`
    : active
    ? "Stop reading aloud"
    : `${label}. Read aloud`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={() => {
        if (disabled) return;
        if (active) stop();
        else speak(text);
      }}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${disabledClass} ${className}`}
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        minHeight: 44,
        minWidth: 44,
      }}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {active ? "⏹" : disabled ? "🔇" : "🔊"}
      </span>
      <span>{active ? "Stop" : label}</span>
    </button>
  );
}
