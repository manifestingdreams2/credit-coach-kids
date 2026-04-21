import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimers & Privacy — Credit Coach Kids",
  description:
    "Educational use only. No financial advice. Parent/guardian notice and local-only data policy for Credit Coach Kids.",
};

export default function LegalPage() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <Link href="/" style={styles.backLink} aria-label="Back to Home">
            ← Home
          </Link>
          <h1 style={styles.title}>Disclaimers &amp; Privacy</h1>
          <p style={styles.subtitle}>
            Please read these notices before playing. They apply to every
            player and every device.
          </p>
        </header>

        <Section heading="📚 Educational Use Only">
          <p>
            This app is for <strong>educational purposes only</strong> and does
            not provide financial advice. Nothing in Credit Coach Kids should be
            treated as professional guidance for real-world money, credit, or
            lending decisions.
          </p>
        </Section>

        <Section heading="📈 No Guarantee of Outcomes">
          <p>
            Results and outcomes may vary. This app does not guarantee financial
            success or credit score improvements. Real credit scores depend on
            many factors outside of this game, including payment history,
            balances, and credit history length.
          </p>
        </Section>

        <Section heading="👨‍👩‍👧 Parent &amp; Guardian Notice">
          <p>
            This app is intended for educational use by children ages 8–14.
            Parents or guardians should supervise and guide children while using
            the app. Questions about real credit or personal finances should be
            directed to a qualified adult or professional.
          </p>
        </Section>

        <Section heading="🔒 Privacy (COPPA-style)">
          <p>
            <strong>
              We do not collect or store personal information from children.
            </strong>{" "}
            Credit Coach Kids does not ask for names, email addresses, phone
            numbers, birthdates, location, photos, or any other identifying
            information.
          </p>
          <p>
            Game progress, avatar selection, and in-game coin totals are stored
            <strong> locally on your device only</strong> (using your browser's{" "}
            <code style={styles.code}>localStorage</code>). This data never
            leaves your device and is not transmitted to us or any third party.
            Clearing your browser data will reset your progress.
          </p>
        </Section>

        <Section heading="🪙 In-App Currency">
          <p>
            Coins and rewards are part of the game experience and{" "}
            <strong>have no real-world monetary value</strong>. They cannot be
            exchanged, redeemed, sold, or traded for real money, goods, or
            services.
          </p>
        </Section>

        <Section heading="✅ Summary">
          <ul style={styles.list}>
            <li>Educational only — not financial advice.</li>
            <li>No guarantees about real credit scores.</li>
            <li>Designed for kids 8–14 with adult supervision.</li>
            <li>No personal data collected. Progress stays on-device.</li>
            <li>Coins are pretend — no cash value.</li>
          </ul>
        </Section>

        <div style={styles.footer}>
          <Link href="/" style={styles.primaryLink}>
            ← Back to the game
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{heading}</h2>
      <div style={styles.sectionBody}>{children}</div>
    </section>
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
  section: {
    background: "#fff",
    borderRadius: 22,
    padding: "16px 18px",
    boxShadow: "0 10px 24px rgba(10, 34, 75, 0.10)",
  },
  sectionTitle: {
    margin: "0 0 8px",
    fontSize: 17,
    fontWeight: 950,
    color: "#17356d",
    letterSpacing: "-0.02em",
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 1.55,
    fontWeight: 500,
    color: "#2c3c5f",
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 15,
    lineHeight: 1.5,
    color: "#2c3c5f",
  },
  code: {
    background: "#eef3ff",
    color: "#2864d8",
    padding: "1px 6px",
    borderRadius: 6,
    fontSize: 13,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  footer: {
    marginTop: 6,
    display: "flex",
    justifyContent: "center",
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
};
