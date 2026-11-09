"use client";

import React, { useMemo, useState } from "react";
import { ORGANISATIONS, SPA, track, waLink } from "@/lib/spa";

const RATING_WORDS = ["", "Not great", "Fine", "Good", "Loved it", "Perfect"];

// Feedback form, mirroring the printed Customer Review form: name optional,
// a rating, what you loved most, and any additional comments. There is no
// backend, so submit opens WhatsApp with the feedback written out; an email
// to Mendozer Investments is offered as the second route. Nothing is stored
// on this site and nothing fails silently.
export function FeedbackForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [loved, setLoved] = useState("");
  const [comments, setComments] = useState("");
  const [done, setDone] = useState(false);

  const message = useMemo(() => {
    const lines = ["Hi Corner Spa! Here is my feedback."];
    lines.push(`Rating: ${rating} of 5${RATING_WORDS[rating] ? ` (${RATING_WORDS[rating]})` : ""}`);
    if (loved.trim()) lines.push(`What I loved most: ${loved.trim()}`);
    if (comments.trim()) lines.push(`Comments: ${comments.trim()}`);
    lines.push(`From: ${name.trim() || "not given"}`);
    return lines.join("\n");
  }, [name, rating, loved, comments]);

  const mailto = `mailto:${ORGANISATIONS.mendozer.email}?subject=${encodeURIComponent(
    "Feedback about Corner Spa"
  )}&body=${encodeURIComponent(message)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;
    track("feedback_submit", { rating });
    window.open(waLink(message), "_blank", "noopener");
    setDone(true);
  };

  return (
    <form className="bk-form fb-form" onSubmit={submit} aria-label="Send feedback or a complaint">
      <label className="grp-label" htmlFor="fb-name">
        Your name <span aria-hidden="true">(optional)</span>
      </label>
      <input
        id="fb-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="First name is enough"
        autoComplete="name"
        enterKeyHint="next"
      />

      <fieldset className="fb-rating">
        <legend className="grp-label">Your visit, rated</legend>
        <div className="fb-scale" role="radiogroup" aria-label="Rating from 1 to 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              className={`fb-pip${rating >= n ? " on" : ""}`}
              onClick={() => setRating(n)}
            >
              {n}
              <span className="fb-word">{RATING_WORDS[n]}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <label className="grp-label" htmlFor="fb-loved">
        What you loved most <span aria-hidden="true">(optional)</span>
      </label>
      <input
        id="fb-loved"
        value={loved}
        onChange={(e) => setLoved(e.target.value)}
        placeholder="The massage, the quiet, a therapist"
        enterKeyHint="next"
      />

      <label className="grp-label" htmlFor="fb-comments">
        Anything else you want to tell us <span aria-hidden="true">(optional)</span>
      </label>
      <textarea
        id="fb-comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Praise, ideas, or a complaint. All of it is welcome."
        enterKeyHint="send"
      />

      <div className="bk-actions">
        <button type="submit" className="btn" disabled={rating < 1}>
          Send on WhatsApp
        </button>
        <a className="btn" href={mailto} onClick={() => track("feedback_email_click")}>
          Send by email
        </a>
      </div>

      {done && (
        <p className="bk-done" role="status">
          WhatsApp is open with your feedback written out. Press send and it
          reaches us. Thank you.
        </p>
      )}
      <p className="bk-privacy">
        Nothing is stored on this site. Your message opens in WhatsApp, or in
        your email app, ready to send to {SPA.name} via {ORGANISATIONS.mendozer.name}.
      </p>
    </form>
  );
}
