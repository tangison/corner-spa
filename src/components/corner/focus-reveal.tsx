"use client";

import { useEffect } from "react";

// Keyboard users tab ahead of the scroll. The engine reveals [data-sc-in]
// sections when they enter the viewport, but a focused element deeper in
// the page can still be waiting on its observer: focus must never land on
// invisible content. This adds the engine's own reveal class on focus, so
// tabbing into a section reveals it exactly as scrolling into it would.
// It never touches the engine file; it only drives the same class.
export function FocusReveal() {
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Element | null;
      if (!t || typeof t.closest !== "function") return;
      // Reveal at once (no 620ms transition): focus must land on something
      // already visible, not on something still fading in.
      const now = (el: Element) => {
        el.classList.add("sc-in", "sc-in-now");
      };
      const host = t.closest("[data-sc-in]");
      if (host) now(host);
      const stag = t.closest("[data-sc-stagger]");
      if (stag) {
        now(stag);
        for (const kid of Array.from(stag.children)) now(kid);
      }
      if (t.matches("[data-sc-stagger] > *")) now(t);
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, []);
  return null;
}
