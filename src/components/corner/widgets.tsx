"use client";

import { useEffect, useState } from "react";
import { WA_PREFILL, track, waLink } from "@/lib/spa";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-3.5 2.63c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28s-1.44-.71-1.66-.79c-.22-.08-.38-.12-.54.12-.16.25-.62.79-.76.95-.14.16-.28.18-.52.06-.25-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.54-1.34-.76-1.83-.19-.43-.38-.44-.54-.45h-.14Z" />
    </svg>
  );
}

// Floating WhatsApp (direct hook, prefilled) + scroll-to-top widget.
export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    track("scroll_top_click");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="float-widgets">
      <button
        type="button"
        className={`float-btn float-top${showTop ? " show" : ""}`}
        onClick={toTop}
        aria-label="Scroll back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 19V5m0 0l-6 6m6-6l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <a
        className="float-btn wa"
        href={waLink(WA_PREFILL.general)}
        target="_blank"
        rel="noopener"
        aria-label="Book on WhatsApp"
        onClick={() => track("wa_float_click")}
      >
        <WhatsAppGlyph />
        <span className="float-label">WhatsApp</span>
      </a>
    </div>
  );
}
