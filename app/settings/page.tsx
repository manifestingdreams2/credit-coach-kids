"use client";

import Link from "next/link";
import { useAccessibility, type A11yPrefs } from "@/components/AccessibilityProvider";
import SpeakerButton from "@/components/SpeakerButton";

type ToggleItem = {
  key: keyof A11yPrefs;
  label: string;
  description: string;
  emoji: string;
};

const TOGGLES: ToggleItem[] = [
  {
    key: "narration",
    emoji: "🗣️",
    label: "Voice Narration",
    description: "Read lesson cards, quiz questions, and messages out loud.",
  },
  {
    key: "soundEffects",
    emoji: "🔔",
    label: "Sound Effects",
    description: "Play small game sounds when you earn coins or pass a lesson.",
  },
  {
    key: "captions",
    emoji: "💬",
    label: "Captions",
    description: "Always show text for everything that is spoken.",
  },
  {
    key: "largerText",
    emoji: "🔠",
    label: "Larger Text",
    description: "Make all text bigger and easier to read.",
  },
  {
    key: "highContrast",
    emoji: "🌓",
    label: "High Contrast",
    description: "Make colors darker and bolder for easier reading.",
  },
  {
    key: "reducedMotion",
    emoji: "🧘",
    label: "Reduced Motion",
    description: "Turn off animations and shaking movement.",
  },
];

export default function SettingsPage() {
  const { prefs, setPref, speak, supported } = useAccessibility();

  const sampleText =
    "Hi! I am Coach Credit. I can read the lessons out loud so you can learn and listen at the same time.";

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <Link href="/" style={styles.backLink} aria-label="Back to Home">
            ← Home
          </Link>
          <h1 style={styles.title}>Accessibility Settings</h1>
          <p style={styles.subtitle}>
            Pick what works best for you. Your choices are saved on this device.
          </p>
        </header>

        <section style={styles.card} aria-labelledby="voice-heading">
          <div style={styles.cardRow}>
            <div style={styles.cardCopy}>
              <h2 id="voice-heading" style={styles.cardTitle}>
                Try the voice
              </h2>
              <p style={styles.cardText}>
                {supported
                  ? "Tap Listen to hear a sample in your device's friendliest teacher voice."
                  : "This device or browser does not support voice narration. Captions still work everywhere."}
              </p>
            </div>
            {supported && (
              <SpeakerButton text={sampleText} label="Play sample" />
            )}
          </div>
          {prefs.captions && (
            <p style={styles.caption} aria-live="polite">
              <span style={styles.captionTag}>Caption</span> {sampleText}
            </p>
          )}
        </section>

        <section
          style={styles.card}
          aria-labelledby="toggles-heading"
        >
          <h2 id="toggles-heading" style={styles.cardTitle}>
            Turn features on or off
          </h2>
          <ul style={styles.toggleList}>
            {TOGGLES.map((item) => {
              const value = prefs[item.key];
              return (
                <li key={item.key} style={styles.toggleRow}>
                  <div style={styles.toggleCopy}>
                    <div style={styles.toggleHead}>
                      <span
                        style={styles.toggleEmoji}
                        aria-hidden="true"
                      >
                        {item.emoji}
                      </span>
                      <span style={styles.toggleLabel}>{item.label}</span>
                    </div>
                    <p style={styles.toggleDesc}>{item.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={value}
                    aria-label={`${item.label}: ${value ? "on" : "off"}`}
                    onClick={() => {
                      const next = !value;
                      setPref(item.key, next);
                      if (item.key === "narration" && next) {
                        speak("Narration is on.");
                      }
                    }}
                    style={{
                      ...styles.switch,
                      background: value ? "#16a34a" : "#cbd5e1",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        ...styles.switchKnob,
                        transform: value
                          ? "translateX(26px)"
                          : "translateX(2px)",
                      }}
                    />
                    <span className="sr-only">
                      {value ? "On" : "Off"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section style={styles.card} aria-labelledby="tips-heading">
          <h2 id="tips-heading" style={styles.cardTitle}>
            What these do
          </h2>
          <ul style={styles.tipsList}>
            <li>
              <strong>Voice Narration:</strong> Uses your device's built-in
              speech. We never upload anything.
            </li>
            <li>
              <strong>Captions:</strong> Always show the text of anything that
              is spoken out loud.
            </li>
            <li>
              <strong>Larger Text &amp; High Contrast:</strong> Make text and
              shapes easier to see.
            </li>
            <li>
              <strong>Reduced Motion:</strong> Turns off animation if movement
              feels busy.
            </li>
          </ul>
        </section>

        <div style={styles.footer}>
          <Link href="/" style={styles.primaryLink}>
            ← Back to the game
          </Link>
          <Link href="/legal" style={styles.secondaryLink}>
            Disclaimers &amp; Privacy
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #4eb9ff 0%, #0a78f0 30%, #0558c9 100%)",
    padding: "18px 12px calc(40px + env(safe-area-inset-bottom, 0px))",
    display: "flex",
    justifyContent: "center",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#102a5a",
  },
  shell: {
    width: "100%",
    maxWidth: 680,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  header: {
    background: "linear-gradient(180deg,#fffaf0 0%, #fff6db 100%)",
    borderRadius: 28,
    padding: "18px 18px 22px",
    boxShadow: "0 18px 36px rgba(11, 35, 80, 0.20)",
  },
  backLink: {
    display: "inline-block",
    marginBottom: 10,
    padding: "8px 12px",
    borderRadius: 999,
    background: "#eaf3ff",
    color: "#2864d8",
    fontSize: 12,
    fontWeight: 900,
    textDecoration: "none",
  },
  title: {
    margin: "0 0 6px",
    fontSize: 28,
    fontWeight: 950,
    letterSpacing: "-0.03em",
    color: "#142d63",
    lineHeight: 1.1,
  },
  subtitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 700,
    color: "#57657f",
    lineHeight: 1.45,
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    padding: "16px 18px",
    boxShadow: "0 10px 24px rgba(10, 34, 75, 0.10)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cardCopy: {
    flex: 1,
    minWidth: 180,
  },
  cardTitle: {
    margin: "0 0 4px",
    fontSize: 17,
    fontWeight: 950,
    color: "#17356d",
    letterSpacing: "-0.02em",
  },
  cardText: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: "#3a4b70",
    lineHeight: 1.45,
  },
  caption: {
    margin: 0,
    padding: "10px 12px",
    background: "#eef3ff",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 600,
    color: "#1e3a8a",
    lineHeight: 1.5,
  },
  captionTag: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 999,
    background: "#1e3a8a",
    color: "#fff",
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginRight: 8,
  },
  toggleList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 12px",
    background: "#f7f9ff",
    borderRadius: 16,
    border: "1px solid #e2e8f9",
  },
  toggleCopy: {
    flex: 1,
    minWidth: 0,
  },
  toggleHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  toggleEmoji: {
    fontSize: 20,
    lineHeight: 1,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: 900,
    color: "#17356d",
  },
  toggleDesc: {
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    color: "#55657f",
    lineHeight: 1.4,
  },
  switch: {
    position: "relative",
    width: 54,
    height: 30,
    borderRadius: 999,
    border: 0,
    cursor: "pointer",
    transition: "background 160ms ease-out",
    flexShrink: 0,
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
  },
  switchKnob: {
    position: "absolute",
    top: 3,
    width: 24,
    height: 24,
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    transition: "transform 160ms ease-out",
  },
  tipsList: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 14,
    fontWeight: 600,
    color: "#3a4b70",
    lineHeight: 1.55,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  footer: {
    marginTop: 6,
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  primaryLink: {
    padding: "12px 18px",
    borderRadius: 18,
    background: "linear-gradient(135deg,#ffcf43,#ffb200)",
    color: "#143268",
    fontSize: 15,
    fontWeight: 950,
    textDecoration: "none",
    boxShadow: "0 10px 22px rgba(255,178,0,0.28)",
  },
  secondaryLink: {
    padding: "12px 18px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.85)",
    color: "#2864d8",
    fontSize: 14,
    fontWeight: 900,
    textDecoration: "none",
    border: "1px solid rgba(38, 100, 216, 0.2)",
  },
};
