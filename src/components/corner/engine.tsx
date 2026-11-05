"use client";

import Script from "next/script";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element) => void };
  }
}

// Loads the vendored scroll-craft engine (never edited per project) and mounts
// it once on the body. Idempotent: React strict/dev double-invoke safe.
export function ScrollEngine() {
  return (
    <Script
      src="/scrollcraft/scrollcraft.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.ScrollCraft) window.ScrollCraft.mount(document.body);
      }}
    />
  );
}
