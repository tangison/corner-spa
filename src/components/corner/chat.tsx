"use client";

import { useEffect, useRef, useState } from "react";
import { CHAT_ANSWERS, CHAT_INTRO, track, waLink, type ChatAnswer } from "@/lib/spa";

const TOP_CHIPS = ["How do I book?", "Prices", "Where are you?"];

const CHIP_KEY: Record<string, string> = {
  "How do I book?": "book",
  "Book": "book",
  "Prices": "prices",
  "Facials": "facials",
  "Where are you?": "where",
  "Talk to a person": "human",
};

// A small, honest helper: it answers the usual questions from the price list
// and the known facts, and hands everything else to WhatsApp. No pretending.
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatAnswer[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (chip: string) => {
    const key = CHIP_KEY[chip];
    if (!key) return;
    track("chat_chip_click", { topic: key });
    const a = CHAT_ANSWERS[key];
    setTurns((t) => [...t, a].slice(-4));
    requestAnimationFrame(() => {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight });
    });
  };

  return (
    <>
      <div
        className="float-chat-panel"
        role="dialog"
        aria-label="Corner Spa answers"
        ref={panelRef}
        hidden={!open}
      >
        <p className="chat-title">Corner Spa</p>
        <p className="chat-msg">{CHAT_INTRO}</p>
        {turns.map((t, i) => (
          <div key={i}>
            <p className="chat-msg">{t.text}</p>
            {t.wa ? (
              <p className="chat-msg">
                <a
                  href={waLink(t.wa)}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("chat_wa_click", { topic: t.text.slice(0, 24) })}
                >
                  Open WhatsApp with this ready
                </a>
              </p>
            ) : null}
            <div className="chat-chips">
              {t.chips.map((c) => (
                <button key={c} type="button" className="chat-chip" onClick={() => ask(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        ))}
        {turns.length === 0 && (
          <div className="chat-chips">
            {TOP_CHIPS.map((c) => (
              <button key={c} type="button" className="chat-chip" onClick={() => ask(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        className="float-btn wa"
        aria-expanded={open}
        aria-label={open ? "Close Corner Spa answers" : "Ask Corner Spa a question"}
        onClick={() => {
          track("chat_toggle_click", { open: !open });
          setOpen((v) => !v);
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path
              d="M21 12a8 8 0 1 0-3.1 6.3L21 19.5l-.9-3A8 8 0 0 0 21 12Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8.5 11h7M8.5 14h4.5" strokeLinecap="round" />
          </svg>
        )}
        <span className="float-label">{open ? "Close" : "Ask us"}</span>
      </button>
    </>
  );
}
