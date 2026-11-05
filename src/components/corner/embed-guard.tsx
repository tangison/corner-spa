"use client";

import { useEffect } from "react";

// While embedded at oryxinstitute.org/corner-spa the page must never add
// history entries or change the URL hash, so pressing Back returns to the
// Oryx website. In-frame, anchor links scroll without touching the hash, and
// internal page links (booking, policies) open on the real site in a new tab.
export function EmbedGuard() {
  useEffect(() => {
    if (window.self === window.top) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"], a[href^="/"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href")!;
      e.preventDefault();
      if (href.startsWith("#")) {
        const t = document.getElementById(href.slice(1));
        if (t) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        }
      } else {
        window.open(a.href, "_blank", "noopener");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
