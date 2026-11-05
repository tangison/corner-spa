"use client";

import { useEffect } from "react";

// While embedded at oryxinstitute.org/corner-spa the page must never add
// history entries or change the URL hash, so pressing Back returns to the Oryx
// website. In-frame, anchor clicks scroll without touching the hash.
export function EmbedGuard() {
  useEffect(() => {
    if (window.self === window.top) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const t = document.getElementById(a.getAttribute("href")!.slice(1));
      if (t) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
