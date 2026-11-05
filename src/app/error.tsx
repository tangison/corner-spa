"use client";

// Branded 500 fallback. Next.js App Router renders this when a route
// throws at runtime. Recovery is quiet and honest, in brand voice.
export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "48px 24px",
      }}
    >
      <div>
        <p className="eyebrow">500</p>
        <h1 className="serif" style={{ fontSize: "clamp(30px, 5vw, 52px)", marginBottom: 16 }}>
          Something drifted.
        </h1>
        <p className="lead" style={{ margin: "0 auto 32px", maxWidth: "34ch" }}>
          This page did not load. It is not you, and the spa is fine. Try
          again, or WhatsApp us and we will take it from there.
        </p>
        <div className="lead-cta" style={{ justifyContent: "center" }}>
          <button type="button" className="btn" onClick={reset}>
            Try again
          </button>
          <a className="btn" href="/">
            Back to the spa
          </a>
        </div>
      </div>
    </main>
  );
}
