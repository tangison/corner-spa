"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CAREERS_EMAIL, CAREERS_ROLE, SPA, track } from "@/lib/spa";

/* SPA-CAREERS form. No backend, no upload: it writes the application into
   a WhatsApp or email message and hands it to the visitor, ready to send.
   Everything validates inline, typed values survive a refresh, and a
   copy-my-application fallback covers phones where mailto does nothing. */

const TREATMENTS = [
  "Massage",
  "Hot stone",
  "Foot spa",
  "Nails",
  "Waxing",
  "Lashes",
  "Facials / skin care",
];

const QUALIFICATIONS = [
  "Cosmetology qualification",
  "Other beauty or spa qualification",
  "No formal qualification yet",
];

const EXPERIENCE = [
  "Less than a year",
  "1 to 2 years",
  "3 to 5 years",
  "More than 5 years",
];

const NOTE_MAX = 400;
const MESSAGE_MAX = 1500;
const STORE_KEY = "corner-spa-application";

type Fields = {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  treatments: string[];
  experience: string;
  note: string;
  consent: boolean;
  company: string; // honeypot: humans never see this field
};

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  qualification: "",
  treatments: [],
  experience: "",
  note: "",
  consent: false,
  company: "",
};

type Errors = Partial<Record<"name" | "email" | "phone" | "qualification" | "consent", string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please add your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) {
    e.email = "Please add an email we can reply to, like name@gmail.com.";
  }
  const digits = f.phone.replace(/[\s()-]/g, "");
  const okPhone = /^\+264\d{7,9}$/.test(digits) || /^0\d{8,9}$/.test(digits);
  if (!okPhone) {
    e.phone = "Use +264 or a local number, for example 081 234 5678.";
  }
  if (!f.qualification) e.qualification = "Choose the closest option.";
  if (!f.consent) e.consent = "Please tick the box so we may use your details.";
  return e;
}

/* One line per field, optional lines left out, under ~1,500 characters. */
function buildMessage(f: Fields): string {
  const lines: string[] = [
    `Hi Corner Spa, I would like to apply for the ${CAREERS_ROLE} position.`,
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    `Email: ${f.email.trim()}`,
    `Qualification: ${f.qualification}`,
  ];
  if (f.treatments.length > 0) lines.push(`Treatments: ${f.treatments.join(", ")}`);
  if (f.experience) lines.push(`Experience: ${f.experience}`);
  if (f.note.trim()) lines.push(`About me: ${f.note.trim()}`);
  lines.push("I am attaching my CV.");
  let msg = lines.join("\n");
  // Keep the fixed lines; shorten "About me" first if the message runs long.
  if (msg.length > MESSAGE_MAX) {
    const fixed = msg.replace(f.note.trim(), "");
    const room = MESSAGE_MAX - fixed.length - 1;
    const trimmedNote = f.note.trim().slice(0, Math.max(0, room));
    msg = msg.replace(f.note.trim(), trimmedNote + (trimmedNote.length < f.note.trim().length ? "…" : ""));
  }
  return msg;
}

function mailtoLink(f: Fields): string {
  const subject = `Spa Specialist Application - ${f.name.trim()}`;
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(f))}`;
}

function waLinkFor(f: Fields): string {
  return `https://wa.me/${SPA.whatsappNumber}?text=${encodeURIComponent(buildMessage(f))}`;
}

export function ApplyForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [modal, setModal] = useState<null | "wa" | "mail">(null);
  const [copied, setCopied] = useState(false);
  const continueRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Saved values survive a cancelled redirect; they clear once restored.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Fields>;
        setF((prev) => ({ ...prev, ...saved, consent: prev.consent || !!saved.consent }));
        sessionStorage.removeItem(STORE_KEY);
      }
    } catch {
      /* storage unavailable: the form still works */
    }
  }, []);

  // Keep the values even if the visitor navigates away mid-typing.
  useEffect(() => {
    const save = () => {
      try {
        if (f.name || f.email || f.phone) sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...f, consent: false }));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, [f]);

  const errs = useMemo(() => validate(f), [f]);
  const valid = Object.keys(errs).length === 0;

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (touched) setErrors(validate({ ...f, [k]: v }));
  };

  const blur = () => {
    setTouched(true);
    setErrors(errs);
  };

  const open = (channel: "wa" | "mail") => {
    setTouched(true);
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    if (f.company) return; // honeypot: silently drop bot submissions
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...f, consent: false }));
    } catch {
      /* ignore */
    }
    track("apply_intent", { channel });
    setModal(channel);
  };

  // Modal: focus lands on Continue, Escape cancels the redirect.
  useEffect(() => {
    if (!modal) return;
    continueRef.current?.focus();
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  const proceed = () => {
    if (!modal) return;
    const href = modal === "wa" ? waLinkFor(f) : mailtoLink(f);
    track("apply_redirect", { channel: modal });
    setModal(null);
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    if (modal === "wa") {
      window.open(href, "_blank", "noopener");
    } else {
      window.location.href = href;
    }
  };

  const copyApplication = async () => {
    const text = buildMessage(f);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track("apply_copy");
    } catch {
      // Clipboard API blocked (older browsers, in-app webviews): fall back to
      // a hidden textarea and the legacy execCommand path.
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        track("apply_copy_legacy");
      } catch {
        setCopied(false);
      }
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <form
      id="apply"
      className="c-form"
      noValidate
      onSubmit={(ev) => ev.preventDefault()}
      aria-label={`Apply for the ${CAREERS_ROLE} position`}
    >
      <div className="c-hp" aria-hidden="true">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" value={f.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      <label className="grp-label" htmlFor="ap-name">
        Full name <span className="req">*</span>
      </label>
      <input
        id="ap-name"
        type="text"
        autoComplete="name"
        value={f.name}
        onChange={(e) => set("name", e.target.value)}
        onBlur={blur}
        aria-invalid={touched && !!errs.name}
        aria-describedby={touched && errs.name ? "ap-name-err" : undefined}
        required
      />
      <span className="c-error" id="ap-name-err" role="alert">{touched ? errs.name : ""}</span>

      <label className="grp-label" htmlFor="ap-email">
        Email <span className="req">*</span>
      </label>
      <input
        id="ap-email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={f.email}
        onChange={(e) => set("email", e.target.value)}
        onBlur={blur}
        aria-invalid={touched && !!errs.email}
        aria-describedby={touched && errs.email ? "ap-email-err" : undefined}
        required
      />
      <span className="c-error" id="ap-email-err" role="alert">{touched ? errs.email : ""}</span>

      <label className="grp-label" htmlFor="ap-phone">
        Phone or WhatsApp <span className="req">*</span>
      </label>
      <input
        id="ap-phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="+264 81 234 5678 or 081 234 5678"
        value={f.phone}
        onChange={(e) => set("phone", e.target.value)}
        onBlur={blur}
        aria-invalid={touched && !!errs.phone}
        aria-describedby={touched && errs.phone ? "ap-phone-err" : undefined}
        required
      />
      <span className="c-error" id="ap-phone-err" role="alert">{touched ? errs.phone : ""}</span>

      <label className="grp-label" htmlFor="ap-qual">
        Qualification <span className="req">*</span>
      </label>
      <select
        id="ap-qual"
        value={f.qualification}
        onChange={(e) => set("qualification", e.target.value)}
        onBlur={blur}
        aria-invalid={touched && !!errs.qualification}
        aria-describedby={touched && errs.qualification ? "ap-qual-err" : undefined}
        required
      >
        <option value="">Choose one</option>
        {QUALIFICATIONS.map((q) => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>
      <span className="c-error" id="ap-qual-err" role="alert">{touched ? errs.qualification : ""}</span>

      <span className="grp-label" id="ap-treat-label">
        Treatments you are confident with <span className="req">(optional)</span>
      </span>
      <div className="c-chips" role="group" aria-labelledby="ap-treat-label">
        {TREATMENTS.map((t) => {
          const on = f.treatments.includes(t);
          return (
            <span key={t} className="c-chip" aria-pressed={on}>
              <input
                type="checkbox"
                checked={on}
                onChange={() =>
                  set("treatments", on ? f.treatments.filter((x) => x !== t) : [...f.treatments, t])
                }
                aria-label={t}
              />
              {t}
            </span>
          );
        })}
      </div>

      <label className="grp-label" htmlFor="ap-exp">
        Years of experience <span className="req">(optional)</span>
      </label>
      <select id="ap-exp" value={f.experience} onChange={(e) => set("experience", e.target.value)}>
        <option value="">Choose one</option>
        {EXPERIENCE.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))}
      </select>

      <label className="grp-label" htmlFor="ap-note">
        About me <span className="req">(optional)</span>
      </label>
      <textarea
        id="ap-note"
        maxLength={NOTE_MAX}
        value={f.note}
        onChange={(e) => set("note", e.target.value)}
        aria-describedby="ap-note-count"
      />
      <span className="c-counter" id="ap-note-count">
        {f.note.length} / {NOTE_MAX}
      </span>

      <div className="c-consent">
        <input
          id="ap-consent"
          type="checkbox"
          checked={f.consent}
          onChange={(e) => set("consent", e.target.checked)}
          onBlur={blur}
          aria-invalid={touched && !!errs.consent}
          aria-describedby={touched && errs.consent ? "ap-consent-err" : undefined}
          required
        />
        <label htmlFor="ap-consent">
          I agree that Corner Spa may use these details to consider my application.
        </label>
      </div>
      <span className="c-error" id="ap-consent-err" role="alert">{touched ? errs.consent : ""}</span>

      <div className="c-actions">
        <button
          type="button"
          className="btn btn-solid"
          disabled={!valid}
          onClick={() => open("wa")}
          data-track="apply_wa_click"
        >
          Apply on WhatsApp
        </button>
        <button
          type="button"
          className="btn"
          disabled={!valid}
          onClick={() => open("mail")}
          data-track="apply_mail_click"
        >
          Apply by email
        </button>
      </div>

      <p className="c-fallback">
        <button type="button" className="a2" onClick={copyApplication} data-track="apply_copy_click">
          {copied ? "Copied" : "Copy my application"}
        </button>
      </p>

      <p className="c-privacy">
        Your details go straight to Corner Spa by WhatsApp or email. Nothing is
        stored on this site. Without JavaScript you can still apply by email:{" "}
        <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Spa Specialist Application")}`}>
          {CAREERS_EMAIL}
        </a>
        .
      </p>

      {modal && (
        <div className="c-modal-back" onClick={() => setModal(null)}>
          <div
            className="c-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ap-modal-title"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="ap-modal-title" className="serif">Almost done.</h2>
            <p>
              Your message is ready. Please attach your CV (PDF or Word) before
              you send it.
            </p>
            <div className="c-actions">
              <button type="button" className="btn btn-solid" ref={continueRef} onClick={proceed}>
                Continue
              </button>
              <button type="button" className="btn" onClick={() => setModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
