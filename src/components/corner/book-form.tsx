"use client";

import React, { useMemo, useState } from "react";
import {
  ALL_PRICE_ROWS,
  PRICE_GROUPS,
  SPA,
  track,
  waLink,
} from "@/lib/spa";

function rowLabel(r: { name: string; detail?: string; price: number }) {
  const bits = [r.name];
  if (r.detail) bits.push(`(${r.detail})`);
  bits.push(`N$ ${r.price}`);
  return bits.join(" ");
}

// Inline booking form. No backend, no popup: submit composes the booking
// message and opens WhatsApp directly (hooks straight into wa.me).
export function BookForm() {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState("");
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const message = useMemo(() => {
    const lines = ["Hi Corner Spa! I would like to book a treatment."];
    if (treatment) lines.push(`Treatment: ${treatment}`);
    if (when.trim()) lines.push(`Preferred day or time: ${when.trim()}`);
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    if (note.trim()) lines.push(`Note: ${note.trim()}`);
    return lines.join("\n");
  }, [name, treatment, when, note]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    track("booking_form_submit", { treatment, has_note: !!note.trim() });
    window.open(waLink(message), "_blank", "noopener");
    setDone(true);
  };

  return (
    <form className="bk-form" onSubmit={submit} aria-label="Book a treatment on WhatsApp">
      <label className="grp-label" htmlFor="bk-name">Your name</label>
      <input
        id="bk-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        autoComplete="name"
        required
      />

      <label className="grp-label" htmlFor="bk-treatment">Treatment</label>
      <select
        id="bk-treatment"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
        required
      >
        <option value="" disabled>
          Choose from the price list
        </option>
        {PRICE_GROUPS.map((g) => (
          <optgroup key={g.id} label={g.title}>
            {g.rows.map((r) => (
              <option key={r.name} value={rowLabel(r)}>
                {rowLabel(r)}
              </option>
            ))}
          </optgroup>
        ))}
        <optgroup label="Facials">
          <option value="Facial (price on request)">Facial (ask us for prices)</option>
        </optgroup>
        <optgroup label="Not sure">
          <option value="Advise me">Advise me</option>
        </optgroup>
      </select>

      <label className="grp-label" htmlFor="bk-when">
        Preferred day or time <span aria-hidden="true">(optional)</span>
      </label>
      <input
        id="bk-when"
        value={when}
        onChange={(e) => setWhen(e.target.value)}
        placeholder="e.g. Saturday morning"
      />

      <label className="grp-label" htmlFor="bk-note">
        Anything we should know <span aria-hidden="true">(optional)</span>
      </label>
      <textarea
        id="bk-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Pressure, allergies, occasion"
      />

      <div className="bk-actions">
        <button type="submit" className="btn">
          Send on WhatsApp
        </button>
        <a
          className="btn"
          href={waLink(
            ALL_PRICE_ROWS.length
              ? "Hi Corner Spa! I have a question before I book."
              : "Hi Corner Spa!"
          )}
          target="_blank"
          rel="noopener"
          onClick={() => track("booking_form_question_click")}
        >
          Just ask a question
        </a>
      </div>

      {done && (
        <p className="bk-done" role="status">
          WhatsApp is open with your booking. Press send and we take it from there.
        </p>
      )}
      <p className="bk-privacy">
        Your message opens in WhatsApp straight away. Nothing is stored on this
        site, and we answer {SPA.phone.replace("+264", "on +264")} during opening hours.
      </p>
    </form>
  );
}
