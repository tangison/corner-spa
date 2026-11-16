"use client";

import { useEffect, useRef, useState } from "react";
import { SPA } from "@/lib/spa";

/* SPA-BLACKFRIDAY pop-up — ported from the owner's website pack
   (js/black-friday-popup.js) to a React island mounted once in the root
   layout, so it runs on every page. Same behaviour as the pack: it shows
   only between START and END, once per visit, after DELAY_MS; closes with
   the X, Esc, or by tapping outside; the invisible band over the poster's
   "Book on WhatsApp" button opens WhatsApp. Everything runs client-side,
   so the dialog (and its poster image) never loads for visitors outside
   the window or after they have dismissed it once this visit. */

const START = "2026-11-16"; // first day to show
const END = "2026-11-30"; // last day to show
const DELAY_MS = 1500; // wait before showing
const IMAGE = "/images/black-friday-special.jpg"; // the poster
const SEEN_KEY = "cs-bf-seen";

export function BlackFridayPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (today < START || today > END) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable: the pop-up simply shows every visit */
    }
    if (seen) return;
    const timer = window.setTimeout(() => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const close = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    lastFocus.current?.focus();
    setOpen(false);
  };

  return (
    <div
      className="cs-bf is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Black Friday Special"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="cs-bf__dialog">
        <img
          className="cs-bf__img"
          src={IMAGE}
          alt="Corner Spa Black Friday Special: full body massage from N$150, waxing, foot spa N$200. Book on WhatsApp."
          width={864}
          height={1080}
        />
        <a
          className="cs-bf__book"
          href={`https://wa.me/${SPA.whatsappNumber}`}
          target="_blank"
          rel="noopener"
          aria-label="Book on WhatsApp"
          data-track="bf_whatsapp"
        />
        <button
          ref={closeRef}
          className="cs-bf__close"
          type="button"
          onClick={close}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
