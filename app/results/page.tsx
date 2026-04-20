"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useGameState } from "@/hooks/useGameState";
import {
  curriculum,
  getLevelById,
  getScoreBand,
} from "@/lib/creditCurriculum";
import ScoreBadge from "@/components/ScoreBadge";
import ProgressBar from "@/components/ProgressBar";

function ResultsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const levelId = params.get("level");
  const { state, loaded } = useGameState();

  const level = levelId ? getLevelById(levelId) : null;
  const band = getScoreBand(state.creditScore);
  const tierLabel = band.label;
  const tierColor = band.color;

  const totalLessons = curriculum.reduce(
    (acc, l) => acc + l.lessons.length,
    0
  );
  const completedCount = state.completedLessons.length;

  const nextLesson = (() => {
    for (const lvl of curriculum) {
      if (state.creditScore < lvl.unlockScore) continue;
      const incomplete = lvl.lessons.find(
        (l) => !state.completedLessons.includes(l.id)
      );
      if (incomplete) return { level: lvl, lesson: incomplete };
    }
    return null;
  })();

  if (!loaded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, #4eb9ff 0%, #0a78f0 30%, #0558c9 100%)",
        }}
      >
        <div style={{ fontSize: 40 }}>🏆</div>
      </div>
    );
  }

  const headerBg = level
    ? `linear-gradient(160deg, ${tierColor}33, transparent)`
    : "linear-gradient(160deg, rgba(30,115,232,0.25), transparent)";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #4eb9ff 0%, #0a78f0 30%, #0558c9 100%)",
        padding: "18px 12px 48px",
        display: "flex",
        justifyContent: "center",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ width: "100%", maxWidth: 430 }}>
        <div
          style={{
            position: "relative",
            borderRadius: 30,
            padding: "28px 18px 22px",
            textAlign: "center",
            background: headerBg,
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              position: "absolute",
              left: 14,
              top: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            ← Home
          </button>

          <div style={{ paddingTop: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 6 }}>
              {level && state.completedLevels.includes(level.id) ? "🏆" : "⭐"}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 950,
                letterSpacing: "-0.03em",
                color: "#fff",
              }}
            >
              {level && state.completedLevels.includes(level.id)
                ? "Level Complete!"
                : "Nice Work!"}
            </h1>
            {level && (
              <p
                style={{
                  margin: "6px 0 0",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                Level {level.number} · {level.title}
              </p>
            )}
          </div>
        </div>

        <section
          style={{
            background: "linear-gradient(180deg,#0f3687 0%, #10357c 100%)",
            borderRadius: 28,
            padding: 20,
            marginBottom: 14,
            textAlign: "center",
            color: "#fff",
            boxShadow: "0 18px 36px rgba(8, 20, 54, 0.22)",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              margin: "0 0 12px",
            }}
          >
            Your Credit Score
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScoreBadge score={state.creditScore} size="lg" />
          </div>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 13,
              fontWeight: 700,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Tier: <strong style={{ color: "#fff" }}>{tierLabel}</strong> — keep
            it up to reach the next tier!
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg,#eaf4ff 0%, #dcecff 100%)",
              borderRadius: 22,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>📚</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 950,
                color: "#143268",
                lineHeight: 1,
              }}
            >
              {completedCount}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#55657f",
              }}
            >
              Lessons Done
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(180deg,#fff6ce 0%, #ffe79a 100%)",
              borderRadius: 22,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>🪙</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 950,
                color: "#5a3d03",
                lineHeight: 1,
              }}
            >
              {state.totalCoinsEarned}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#6b511d",
              }}
            >
              Coins Earned
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#fff",
            borderRadius: 22,
            padding: 16,
            marginBottom: 14,
            boxShadow: "0 10px 24px rgba(10, 34, 75, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 900, color: "#17356d" }}>
              Total Progress
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#55657f" }}>
              {completedCount} / {totalLessons}
            </span>
          </div>
          <ProgressBar
            current={completedCount}
            total={totalLessons}
            color="#1e73e8"
            height={12}
            showLabel={false}
          />
        </section>

        {level && (
          <section
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: 16,
              marginBottom: 14,
              boxShadow: "0 10px 24px rgba(10, 34, 75, 0.08)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: 15,
                fontWeight: 950,
                color: "#17356d",
              }}
            >
              {level.title} — Lessons
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {level.lessons.map((lesson) => {
                const done = state.completedLessons.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "4px 0",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{done ? "✅" : "⭕"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 800,
                          color: done ? "#17356d" : "#8895ae",
                        }}
                      >
                        {lesson.title}
                      </p>
                    </div>
                    {done && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 900,
                          color: "#15803d",
                          background: "rgba(16,185,129,0.12)",
                          padding: "3px 8px",
                          borderRadius: 999,
                        }}
                      >
                        Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section
          style={{
            background: "#fff",
            borderRadius: 22,
            padding: 16,
            marginBottom: 18,
            boxShadow: "0 10px 24px rgba(10, 34, 75, 0.08)",
          }}
        >
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: 15,
              fontWeight: 950,
              color: "#17356d",
            }}
          >
            📊 Score Tiers
          </h3>
          {[
            { label: "Very Poor", min: 300, max: 499, color: "#EF4444" },
            { label: "Poor", min: 500, max: 579, color: "#F97316" },
            { label: "Fair", min: 580, max: 669, color: "#F59E0B" },
            { label: "Good", min: 670, max: 739, color: "#84CC16" },
            { label: "Very Good", min: 740, max: 799, color: "#22C55E" },
            { label: "Exceptional", min: 800, max: 850, color: "#10B981" },
          ].map((tier) => {
            const isCurrentTier =
              state.creditScore >= tier.min && state.creditScore <= tier.max;
            return (
              <div
                key={tier.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 20,
                    borderRadius: 999,
                    background: tier.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    flex: 1,
                    color: isCurrentTier ? "#17356d" : "#8895ae",
                  }}
                >
                  {tier.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: isCurrentTier ? "#55657f" : "#b5bed0",
                  }}
                >
                  {tier.min}–{tier.max}
                </span>
                {isCurrentTier && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 950,
                      padding: "3px 8px",
                      borderRadius: 999,
                      background: `${tier.color}25`,
                      color: tier.color,
                    }}
                  >
                    You
                  </span>
                )}
              </div>
            );
          })}
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {nextLesson ? (
            <button
              type="button"
              onClick={() =>
                router.push(`/lesson/${nextLesson.lesson.id}`)
              }
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 18,
                border: 0,
                color: "#fff",
                fontSize: 15,
                fontWeight: 950,
                cursor: "pointer",
                background: "linear-gradient(135deg,#1e73e8,#0a56c6)",
                boxShadow: "0 10px 22px rgba(10, 86, 198, 0.35)",
              }}
            >
              Next: {nextLesson.lesson.title} →
            </button>
          ) : (
            <div
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 18,
                textAlign: "center",
                fontSize: 15,
                fontWeight: 950,
                color: "#ffd84d",
                border: "1px solid rgba(255,216,77,0.4)",
                background: "rgba(255,216,77,0.12)",
              }}
            >
              🏆 You&apos;ve completed all available lessons!
            </div>
          )}

          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 18,
              fontSize: 13,
              fontWeight: 900,
              color: "rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at top, #4eb9ff 0%, #0a78f0 30%, #0558c9 100%)",
          }}
        >
          <div style={{ fontSize: 40 }}>🏆</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
