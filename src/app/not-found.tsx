import { SiteFooter } from "@/components/corner/footer";
import { SPA } from "@/lib/spa";

export default function NotFound() {
  return (
    <>
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
          <p className="eyebrow">404</p>
          <h1 className="serif" style={{ fontSize: "clamp(30px, 5vw, 52px)", marginBottom: 16 }}>
            This page has drifted.
          </h1>
          <p className="lead" style={{ margin: "0 auto 32px", maxWidth: "34ch" }}>
            The page you were looking for is not here. The relaxation, however, is.
          </p>
          <a className="btn" href="/">
            Back to {SPA.name}
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
