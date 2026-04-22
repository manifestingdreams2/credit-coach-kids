"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

export type A11yPrefs = {
  narration: boolean;
  soundEffects: boolean;
  captions: boolean;
  largerText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
};

export const DEFAULT_PREFS: A11yPrefs = {
  narration: true,
  soundEffects: true,
  captions: true,
  largerText: false,
  highContrast: false,
  reducedMotion: false,
};

type Ctx = {
  prefs: A11yPrefs;
  setPref: <K extends keyof A11yPrefs>(key: K, value: A11yPrefs[K]) => void;
  speak: (text: string) => void;
  stop: () => void;
  speaking: boolean;
  supported: boolean;
};

const AccessibilityContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "credit-coach-kids-a11y-v1";

function readPrefs(): A11yPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
}

const PREFERRED_VOICE_NAMES = [
  "samantha",
  "karen",
  "moira",
  "susan",
  "zira",
  "aria",
  "jenny",
  "ava",
  "allison",
  "victoria",
  "google uk english female",
  "microsoft aria",
  "microsoft zira",
];

function pickBestVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  const english = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("en")
  );
  const pool = english.length > 0 ? english : voices;
  for (const needle of PREFERRED_VOICE_NAMES) {
    const hit = pool.find((v) => v.name.toLowerCase().includes(needle));
    if (hit) return hit;
  }
  const female = pool.find((v) =>
    /female|woman|girl/i.test(v.name)
  );
  if (female) return female;
  const defaultVoice = pool.find((v) => v.default);
  return defaultVoice ?? pool[0];
}

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_PREFS);
  const [mounted, setMounted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs(readPrefs());
    setMounted(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      loadVoices();
      try {
        window.speechSynthesis.addEventListener?.(
          "voiceschanged",
          loadVoices
        );
      } catch {
        // older Safari
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      return () => {
        try {
          window.speechSynthesis.removeEventListener?.(
            "voiceschanged",
            loadVoices
          );
        } catch {
          window.speechSynthesis.onvoiceschanged = null;
        }
        try {
          window.speechSynthesis.cancel();
        } catch {
          // noop
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // noop
    }
    const body = document.body;
    body.classList.toggle("a11y-large-text", prefs.largerText);
    body.classList.toggle("a11y-high-contrast", prefs.highContrast);
    body.classList.toggle("a11y-reduced-motion", prefs.reducedMotion);
  }, [prefs, mounted]);

  useEffect(() => {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // noop
    }
    setSpeaking(false);
  }, [pathname, supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !prefs.narration) return;
      const trimmed = text?.trim();
      if (!trimmed) return;
      const synth = window.speechSynthesis;
      try {
        synth.cancel();
      } catch {
        // noop
      }
      const utterance = new SpeechSynthesisUtterance(trimmed);
      const voice = pickBestVoice(voicesRef.current);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "en-US";
      }
      utterance.rate = 0.95;
      utterance.pitch = 1.08;
      utterance.volume = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      try {
        synth.speak(utterance);
      } catch {
        setSpeaking(false);
      }
    },
    [supported, prefs.narration]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // noop
    }
    setSpeaking(false);
  }, [supported]);

  const setPref: Ctx["setPref"] = useCallback(
    (key, value) => {
      setPrefs((p) => ({ ...p, [key]: value }));
      if (key === "narration" && value === false) {
        try {
          window.speechSynthesis?.cancel();
        } catch {
          // noop
        }
        setSpeaking(false);
      }
    },
    []
  );

  const value = useMemo<Ctx>(
    () => ({ prefs, setPref, speak, stop, speaking, supported }),
    [prefs, setPref, speak, stop, speaking, supported]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

const FALLBACK_CTX: Ctx = {
  prefs: DEFAULT_PREFS,
  setPref: () => {},
  speak: () => {},
  stop: () => {},
  speaking: false,
  supported: false,
};

export function useAccessibility(): Ctx {
  const ctx = useContext(AccessibilityContext);
  return ctx ?? FALLBACK_CTX;
}
