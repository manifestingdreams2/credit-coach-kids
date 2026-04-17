"use client";

import { useGameState } from "@/hooks/useGameState";
import { curriculum } from "@/lib/creditCurriculum";

export default function HomePage() {
  const { state, loaded } = useGameState();

  if (!loaded) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.phoneShell}>
          <div style={styles.loadingCard}>
            <img
              src="/logo/credit-coach-kids-icon.png"
              alt="Credit Coach Kids"
              style={styles.loadingIcon}
            />
            <div style={styles.loadingText}>Loading your game...</div>
          </div>
        </div>
      </main>
    );
  }

  const totalLessons = curriculum.reduce(
    (acc: number, level: any) => acc + level.lessons.length,
    0
  );
  const completedLessons = state.completedLessons.length;
  const completedLevels = state.completedLevels.length;
  const progressPct =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const nextLevel =
    curriculum.find((level: any) => state.creditScore < level.unlockScore) ??
    null;

  return (
    <main style={styles.appBg}>
      <div style={styles.phoneShell}>
        <div style={styles.topGlow} />
        <div style={styles.bottomGlow} />

        <section style={styles.screen}>
          <header style={styles.topBar}>
            <div style={styles.brandRow}>
              <img
                src="/logo/credit-coach-kids-icon.png"
                alt="Credit Coach Kids Icon"
                style={styles.brandIcon}
              />
              <div>
                <div style={styles.brandTitle}>
                  Credit Coach <span style={styles.brandAccent}>Kids</span>
                </div>
                <div style={styles.brandSub}>Money game mode</div>
              </div>
            </div>

            <div style={styles.coinPill}>🪙 {state.totalCoinsEarned}</div>
          </header>

          <section style={styles.coachCard}>
            <div style={styles.badge}>Coach Credit is here 🚀</div>

            <div style={styles.coachTop}>
              <div style={styles.coachCopy}>
                <h1 style={styles.heroTitle}>
                  Build your
                  <br />
                  <span style={styles.heroAccent}>credit power</span>
                </h1>

                <p style={styles.heroText}>
                  Play missions, earn coins, unlock levels, and grow smarter
                  money habits one choice at a time.
                </p>

                <button style={styles.primaryBtn}>Start Today’s Mission</button>
              </div>

              <div style={styles.mascotWrap}>
                <div style={styles.mascotHalo} />
                <img
                  src="/logo/coach-credit-mascot.png"
                  alt="Coach Credit mascot"
                  style={styles.mascot}
                />
              </div>
            </div>
          </section>

          <section style={styles.scorePanel}>
            <div style={styles.scoreHeader}>
              <span style={styles.scoreHeaderLabel}>Your Credit Power</span>
              <span style={styles.scoreHeaderTag}>{getScoreLabel(state.creditScore)}</span>
            </div>

            <div style={styles.scoreBubble}>
              <div style={styles.scoreValue}>{state.creditScore}</div>
              <div style={styles.scoreWord}>{getScoreLabel(state.creditScore)}</div>
            </div>

            <div style={styles.miniStats}>
              <MiniStat emoji="📚" value={completedLessons} label="Lessons" />
              <MiniStat emoji="🏆" value={completedLevels} label="Levels" />
              <MiniStat emoji="🧸" value={1} label="Avatar" />
            </div>

            <div style={styles.progressCard}>
              <div style={styles.progressTop}>
                <span style={styles.progressTitle}>Mission Progress</span>
                <span style={styles.progressCount}>
                  {completedLessons}/{totalLessons}
                </span>
              </div>

              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progressPct}%`,
                  }}
                />
              </div>

              <div style={styles.progressText}>
                Every lesson helps unlock bigger levels.
              </div>
            </div>
          </section>

          <section style={styles.quickCards}>
            <div style={styles.quickCardBlue}>
              <div style={styles.quickLabel}>Next Unlock</div>
              <div style={styles.quickValue}>
                {nextLevel ? nextLevel.title : "All Levels Open"}
              </div>
              <div style={styles.quickSub}>
                {nextLevel
                  ? `Unlock at score ${nextLevel.unlockScore}`
                  : "You unlocked everything!"}
              </div>
            </div>

            <div style={styles.quickCardYellow}>
              <div style={styles.quickLabel}>Reward Chest</div>
              <div style={styles.quickValue}>30 Coins</div>
              <div style={styles.quickSub}>Keep playing to earn more</div>
            </div>
          </section>

          <section style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>Choose Your Mission</div>
            <div style={styles.sectionPill}>{curriculum.length} worlds</div>
          </section>

          <section style={styles.levelStack}>
            {curriculum.map((level: any, index: number) => {
              const doneCount = level.lessons.filter((lesson: any) =>
                state.completedLessons.includes(lesson.id)
              ).length;

              const unlocked = state.creditScore >= level.unlockScore;
              const complete = doneCount === level.lessons.length;

              return (
                <div
                  key={level.id ?? index}
                  style={{
                    ...styles.levelCard,
                    ...(unlocked ? styles.levelCardOpen : styles.levelCardLocked),
                  }}
                >
                  <div
                    style={{
                      ...styles.levelBadge,
                      background: unlocked
                        ? levelColor(index)
                        : "linear-gradient(135deg,#94a3b8,#64748b)",
                    }}
                  >
                    {level.number ?? index + 1}
                  </div>

                  <div style={styles.levelBody}>
                    <div style={styles.levelTopRow}>
                      <div style={styles.levelTitle}>
                        {level.title ?? `Level ${index + 1}`}
                      </div>
                      <div
                        style={{
                          ...styles.statePill,
                          ...(complete
                            ? styles.statePillDone
                            : unlocked
                            ? styles.statePillOpen
                            : styles.statePillLocked),
                        }}
                      >
                        {complete
                          ? "Done"
                          : unlocked
                          ? "Play"
                          : `${level.unlockScore}`}
                      </div>
                    </div>

                    <div style={styles.levelDescription}>
                      {level.description ?? "A fun money mission is waiting."}
                    </div>

                    <div style={styles.levelFooter}>
                      <span style={styles.levelMeta}>
                        {doneCount}/{level.lessons.length} lessons
                      </span>
                      <span style={styles.levelMeta}>
                        {complete
                          ? "Completed"
                          : unlocked
                          ? "Unlocked"
                          : `Unlock at ${level.unlockScore}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <div style={styles.bottomSpacer} />
        </section>

        <nav style={styles.bottomNav}>
          <button style={{ ...styles.navBtn, ...styles.navBtnActive }}>
            <span style={styles.navIcon}>🏠</span>
            <span style={styles.navTextActive}>Home</span>
          </button>

          <button style={styles.navBtn}>
            <span style={styles.navIcon}>🎮</span>
            <span style={styles.navText}>Missions</span>
          </button>

          <button style={styles.navBtn}>
            <span style={styles.navIcon}>🎁</span>
            <span style={styles.navText}>Rewards</span>
          </button>

          <button style={styles.navBtn}>
            <span style={styles.navIcon}>{state.selectedAvatar}</span>
            <span style={styles.navText}>Avatar</span>
          </button>
        </nav>
      </div>
    </main>
  );
}

function MiniStat({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: number;
  label: string;
}) {
  return (
    <div style={styles.miniStat}>
      <div style={styles.miniStatEmoji}>{emoji}</div>
      <div style={styles.miniStatValue}>{value}</div>
      <div style={styles.miniStatLabel}>{label}</div>
    </div>
  );
}

function getScoreLabel(score: number) {
  if (score >= 740) return "STRONG";
  if (score >= 670) return "GOOD";
  if (score >= 580) return "BUILDING";
  return "GROWING";
}

function levelColor(index: number) {
  const colors = [
    "linear-gradient(135deg,#6d5efc,#4f46e5)",
    "linear-gradient(135deg,#2bb9ff,#0ea5e9)",
    "linear-gradient(135deg,#34d399,#10b981)",
    "linear-gradient(135deg,#f59e0b,#f97316)",
    "linear-gradient(135deg,#fb7185,#ef4444)",
  ];
  return colors[index % colors.length];
}

const styles: Record<string, React.CSSProperties> = {
  appBg: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #4eb9ff 0%, #0a78f0 30%, #0558c9 100%)",
    display: "flex",
    justifyContent: "center",
    padding: "18px 12px 24px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  phoneShell: {
    width: "100%",
    maxWidth: 430,
    minHeight: "100vh",
    position: "relative",
  },

  topGlow: {
    position: "absolute",
    top: -40,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    filter: "blur(50px)",
    pointerEvents: "none",
  },

  bottomGlow: {
    position: "absolute",
    bottom: 80,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    filter: "blur(45px)",
    pointerEvents: "none",
  },

  screen: {
    position: "relative",
    zIndex: 1,
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "6px 4px 14px",
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },

  brandIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    objectFit: "cover",
    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
    background: "#fff",
    flexShrink: 0,
  },

  brandTitle: {
    fontSize: 18,
    fontWeight: 950,
    color: "#fff9d9",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },

  brandAccent: {
    color: "#ffd84d",
  },

  brandSub: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 800,
    color: "rgba(255,255,255,0.82)",
  },

  coinPill: {
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.16)",
    color: "#fff",
    fontWeight: 900,
    fontSize: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    flexShrink: 0,
  },

  coachCard: {
    background: "linear-gradient(180deg,#fffaf0 0%, #fff6db 100%)",
    borderRadius: 30,
    padding: 18,
    boxShadow: "0 20px 40px rgba(11, 35, 80, 0.20)",
    marginBottom: 16,
    overflow: "hidden",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#eaf3ff",
    color: "#2864d8",
    fontWeight: 900,
    fontSize: 12,
    marginBottom: 14,
  },

  coachTop: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    alignItems: "center",
    textAlign: "left",
  },

  coachCopy: {
    width: "100%",
  },

  heroTitle: {
    margin: "0 0 12px",
    fontSize: 30,
    lineHeight: 1.02,
    fontWeight: 950,
    letterSpacing: "-0.05em",
    color: "#142d63",
  },

  heroAccent: {
    color: "#23aef6",
  },

  heroText: {
    margin: "0 0 14px",
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 700,
    color: "#57657f",
  },

  primaryBtn: {
    width: "100%",
    border: 0,
    borderRadius: 18,
    padding: "14px 16px",
    background: "linear-gradient(135deg,#ffcf43,#ffb200)",
    color: "#143268",
    fontWeight: 950,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(255,178,0,0.28)",
  },

  mascotWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 180,
  },

  mascotHalo: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(43,185,255,0.18) 0%, rgba(43,185,255,0) 70%)",
    filter: "blur(8px)",
  },

  mascot: {
    position: "relative",
    width: 185,
    height: 185,
    objectFit: "contain",
    filter: "drop-shadow(0 16px 24px rgba(22,50,97,0.18))",
  },

  scorePanel: {
    background: "linear-gradient(180deg,#0f3687 0%, #10357c 100%)",
    borderRadius: 30,
    padding: 18,
    boxShadow: "0 18px 36px rgba(8, 20, 54, 0.22)",
    color: "#fff",
    marginBottom: 16,
  },

  scoreHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },

  scoreHeaderLabel: {
    fontSize: 13,
    fontWeight: 950,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.92)",
  },

  scoreHeaderTag: {
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    fontSize: 12,
    fontWeight: 900,
    color: "#fff8ea",
  },

  scoreBubble: {
    width: 190,
    height: 190,
    margin: "0 auto 16px",
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 28%, #ff9e9e 0%, #f05869 58%, #dd314f 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 0 10px 18px rgba(255,255,255,0.18), 0 12px 24px rgba(0,0,0,0.14)",
  },

  scoreValue: {
    fontSize: 56,
    fontWeight: 950,
    lineHeight: 1,
    letterSpacing: "-0.05em",
    color: "#fff8ef",
  },

  scoreWord: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 950,
    letterSpacing: "0.08em",
    color: "#fff8ef",
  },

  miniStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 14,
  },

  miniStat: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: "12px 8px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  miniStatEmoji: {
    fontSize: 22,
    marginBottom: 5,
  },

  miniStatValue: {
    fontSize: 24,
    fontWeight: 950,
    lineHeight: 1,
    color: "#fff8ea",
  },

  miniStatLabel: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.82)",
  },

  progressCard: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 22,
    padding: 14,
    border: "1px solid rgba(255,255,255,0.08)",
  },

  progressTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: 900,
    color: "#fff8ea",
  },

  progressCount: {
    fontSize: 15,
    fontWeight: 900,
    color: "#fff8ea",
  },

  progressTrack: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    background: "rgba(255,255,255,0.18)",
    overflow: "hidden",
    marginBottom: 10,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg,#d7ff58 0%, #2ce0ff 100%)",
  },

  progressText: {
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
  },

  quickCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16,
  },

  quickCardBlue: {
    background: "linear-gradient(180deg,#eaf4ff 0%, #dcecff 100%)",
    borderRadius: 24,
    padding: 16,
    boxShadow: "0 10px 24px rgba(19, 58, 122, 0.08)",
  },

  quickCardYellow: {
    background: "linear-gradient(180deg,#fff6ce 0%, #ffe79a 100%)",
    borderRadius: 24,
    padding: 16,
    boxShadow: "0 10px 24px rgba(122, 91, 19, 0.08)",
  },

  quickLabel: {
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#5f6f8a",
    marginBottom: 8,
  },

  quickValue: {
    fontSize: 20,
    lineHeight: 1.1,
    fontWeight: 950,
    letterSpacing: "-0.03em",
    color: "#143268",
    marginBottom: 8,
  },

  quickSub: {
    fontSize: 13,
    lineHeight: 1.35,
    color: "#55657f",
    fontWeight: 700,
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
    padding: "0 4px",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 950,
    letterSpacing: "-0.03em",
    color: "#17356e",
  },

  sectionPill: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.76)",
    color: "#3c5fc4",
    fontSize: 12,
    fontWeight: 900,
  },

  levelStack: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  levelCard: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    borderRadius: 26,
    padding: 16,
    boxShadow: "0 10px 24px rgba(10, 34, 75, 0.08)",
  },

  levelCardOpen: {
    background: "#fff",
  },

  levelCardLocked: {
    background: "#f2f6ff",
  },

  levelBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: 950,
    flexShrink: 0,
    boxShadow: "0 10px 20px rgba(59, 130, 246, 0.18)",
  },

  levelBody: {
    flex: 1,
    minWidth: 0,
  },

  levelTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    marginBottom: 6,
  },

  levelTitle: {
    fontSize: 18,
    fontWeight: 950,
    color: "#17356d",
    letterSpacing: "-0.02em",
  },

  statePill: {
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    flexShrink: 0,
  },

  statePillOpen: {
    background: "#dcfce7",
    color: "#15803d",
  },

  statePillLocked: {
    background: "#e2e8f0",
    color: "#64748b",
  },

  statePillDone: {
    background: "#dbeafe",
    color: "#2563eb",
  },

  levelDescription: {
    fontSize: 14,
    lineHeight: 1.4,
    color: "#66758f",
    fontWeight: 700,
    marginBottom: 10,
  },

  levelFooter: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },

  levelMeta: {
    fontSize: 12,
    fontWeight: 900,
    color: "#405172",
  },

  bottomSpacer: {
    height: 100,
  },

  bottomNav: {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: 14,
    width: "calc(100% - 24px)",
    maxWidth: 406,
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(16px)",
    borderRadius: 28,
    padding: "10px 8px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    boxShadow: "0 12px 34px rgba(15, 23, 42, 0.16)",
    border: "1px solid rgba(255,255,255,0.7)",
    zIndex: 10,
  },

  navBtn: {
    border: 0,
    background: "transparent",
    borderRadius: 18,
    padding: "10px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    cursor: "pointer",
  },

  navBtnActive: {
    background: "#e8f2ff",
  },

  navIcon: {
    fontSize: 20,
    lineHeight: 1,
  },

  navText: {
    fontSize: 11,
    fontWeight: 800,
    color: "#64748b",
  },

  navTextActive: {
    fontSize: 11,
    fontWeight: 900,
    color: "#2563eb",
  },

  loadingPage: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #4eb9ff 0%, #0a78f0 30%, #0558c9 100%)",
    display: "flex",
    justifyContent: "center",
    padding: "18px 12px 24px",
  },

  loadingCard: {
    marginTop: 80,
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 28,
    padding: "22px 20px",
    display: "flex",
    alignItems: "center",
    gap: 14,
    backdropFilter: "blur(10px)",
  },

  loadingIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    objectFit: "cover",
    background: "#fff",
  },

  loadingText: {
    fontSize: 18,
    fontWeight: 900,
    color: "#fff",
  },
};