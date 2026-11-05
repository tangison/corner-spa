"use client";

import { useEffect } from "react";
import { track } from "@/lib/spa";

// Delegated analytics for server-rendered anchors: any element carrying
// [data-track] reports an event when clicked. Keeps page.tsx a pure server
// component (no event handlers serialized to client props).
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-track]");
      if (!el) return;
      const event = el.getAttribute("data-track");
      if (!event) return;
      let detail: Record<string, string> | undefined;
      const raw = el.getAttribute("data-track-detail");
      if (raw) {
        try {
          detail = JSON.parse(raw) as Record<string, string>;
        } catch {
          detail = undefined;
        }
      }
      track(event, detail);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
