"use client";

import { useEffect } from "react";

// Registers the offline service worker (public/sw.js) in production only.
// The worker serves one branded page (public/offline.html) when a visitor
// opens the site with no connection. It never caches page content online.
export function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    if (window.location.protocol !== "https:") return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration is a quiet enhancement; nothing breaks without it.
    });
  }, []);
  return null;
}
