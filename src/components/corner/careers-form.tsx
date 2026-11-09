"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SPA, track } from "@/lib/spa";

// Careers application form. No backend, no file upload: submit builds the
// ready-written message and opens WhatsApp or the email app. Typed values
// survive a reload (sessionStorage) and are cleared once the message is on
// its way. Everything is validated inline; nothing is invented for the
// applicant beyond the fields the spa asked for.

const WA_NUMBER = SPA.whatsappNumber; // 264816234788
const CAREERS_EMAIL = "careers@mendozer.com";
const STORAGE_KEY = "corner-spa-application";

const QUALIFICATIONS = [
  "Cosmetology qualification",
  "Other beauty or spa qualification",
  "No formal qualification yet",
] as const;

const TREATMENTS = [
  "Massage",
  "Hot stone",
  "Foot spa",
  "Nails",
  "Waxing",
  "Lashes",
  "Facials / skin care",
] as const;

const EXPERIENCE = [
  "Less than 1 year",
  "1 to 2 years",
  "3 to 5 years",
  "More than 5 years",
  "Prefer not to say",
] as const;

const NOTE_MAX = 400;
const MESSAGE_MAX = 1500;

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "qualification" | "consent", string>
>;

type Saved = {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  treatments: string[];
  experience: string;
  note: string;
};

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// Namibian phone: +264 followed by 9 digits, or a local 0-prefixed number.
function validPhone(v: string): boolean {
  const raw = v.replace(/[\s\-().]/g, "");
  return /^\+264\d{9}$/.test(raw) || /^0\d{9}$/.test(raw) || /^264\d{9}$/.test(raw);
}

function normalisePhone(v: string): string {
  return v.replace(/[\s\-().]/g, "");
}

export function CareersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [treatments, setTreatments] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState(""); // honeypot: humans leave it empty
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [pending, setPending] = useState<"whatsapp" | "email" | null>(null);
  const [copied, setCopied] = useState(false);
  const [restored, setRestored] = useState(false);
  const confirmRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Restore a typed application after an accidental reload or back-nav.
  // One-time mount hydration from sessionStorage: the server rendered an
  // empty form, so the values can only be applied after mount. This is the
  // documented exception to set-state-in-effect (no loop, runs once).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        if (s.name) setName(s.name);
        if (s.email) setEmail(s.email);
        if (s.phone) setPhone(s.phone);
        if (s.qualification) setQualification(s.qualification);
        if (Array.isArray(s.treatments)) setTreatments(s.treatments);
        if (s.experience) setExperience(s.experience);
        if (s.note) setNote(s.note);
        setRestored(true);
      }
    } catch {
      // private mode or blocked storage: the form simply starts empty
    }
    // Saving switches on after the first paint either way.
    const t = setTimeout(() => setRestored(true), 350);
    return () => clearTimeout(t);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Keep sessionStorage in step while typing.
  useEffect(() => {
    if (!restored) return;
    try {
      const s: Saved = { name, email, phone, qualification, treatments, experience, note };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {}
  }, [name, email, phone, qualification, treatments, experience, note, restored]);

  const noteCount = note.length;
  const valid =
    name.trim().length > 0 &&
    validEmail(email) &&
    validPhone(phone) &&
    qualification !== "" &&
    consent;

  const message = useMemo(() => {
    const lines: string[] = [
      "Hi Corner Spa, I would like to apply for the Multi-Talent Spa Specialist position.",
      `Name: ${name.trim()}`,
      `Phone: ${normalisePhone(phone)}`,
      `Email: ${email.trim()}`,
      `Qualification: ${qualification}`,
    ];
    if (treatments.length) lines.push(`Treatments: ${treatments.join(", ")}`);
    if (experience) lines.push(`Experience: ${experience}`);
    if (note.trim()) lines.push(`About me: ${note.trim()}`);
    lines.push("I am attaching my CV.");
    let text = lines.join("\n");
    if (text.length > MESSAGE_MAX) {
      // The note is capped well below this; only a long note could reach it.
      text = text.slice(0, MESSAGE_MAX - 1) + "…";
    }
    return text;
  }, [name, phone, email, qualification, treatments, experience, note]);

  const subject = `Spa Specialist Application - ${name.trim() || "Spa Specialist"}`;
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message)}`;

  function validate(over: Partial<Record<string, string | boolean>> = {}): FieldErrors {
    const nm = (over.name ?? name) as string;
    const em = (over.email ?? email) as string;
    const ph = (over.phone ?? phone) as string;
    const q = (over.qualification ?? qualification) as string;
    const c = (over.consent ?? consent) as boolean;
    const e: FieldErrors = {};
    if (!nm.trim()) e.name = "Please enter your full name.";
    if (!validEmail(em)) e.email = "Enter a valid email address, like name@example.com.";
    if (!validPhone(ph))
      e.phone = "Enter a Namibian number, like +264 81 234 5678 or 081 234 5678.";
    if (!q) e.qualification = "Choose the option that fits best.";
    if (!c) e.consent = "Please tick the box so we may consider your application.";
    return e;
  }

  function refreshErrors(next: FieldErrors) {
    setErrors(next);
  }

  // Leaving a field counts as a try: inline errors appear on blur, so the
  // buttons' disabled state is never a mystery.
  const touchValidate = () => {
    setAttempted(true);
    refreshErrors(validate());
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setAttempted(true);
    const e = validate();
    refreshErrors(e);
    if (Object.keys(e).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    if (honey) return; // bot: nothing happens, nothing is sent anywhere
    track("careers_form_submit", {
      method: "preview",
      treatments: treatments.length,
      has_note: !!note.trim(),
    });
    setPending("whatsapp"); // the confirmation panel is method-neutral; Continue carries the choice
  };

  // The two submit buttons record the intended channel, then open the
  // confirmation panel. Continue performs the redirect.
  const startApply = (method: "whatsapp" | "email") => (ev: React.MouseEvent) => {
    ev.preventDefault();
    setAttempted(true);
    const e = validate();
    refreshErrors(e);
    if (Object.keys(e).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    if (honey) return; // bots go nowhere
    track("careers_form_submit", { method, treatments: treatments.length, has_note: !!note.trim() });
    setPending(method);
    setTimeout(() => confirmRef.current?.focus(), 30);
  };

  const continueRedirect = () => {
    if (!pending) return;
    // Continue is an anchor (rendered below): the browser performs the
    // navigation, WhatsApp in a new tab, mailto in the same tab. The panel
    // stays put long enough for the navigation to leave first.
    clearSaved();
    track("careers_continue_click", { method: pending });
    setTimeout(() => setPending(null), 1200);
  };

  const cancelRedirect = () => {
    setPending(null);
    setCopied(false);
    track("careers_form_cancel_redirect", { method: pending ?? "unknown" });
  };

  const clearSaved = () => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const copyMessage = async () => {
    track("careers_copy_click");
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = message;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {
        setCopied(false);
      }
      document.body.removeChild(ta);
    }
    setTimeout(() => setCopied(false), 4000);
  };

  const toggleTreatment = (t: string) => {
    setTreatments((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  };

  const fieldCls = (bad: boolean) => (bad ? "cf-input cf-bad" : "cf-input");

  return (
    <form
      className="cf"
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-label="Apply for the Multi-Talent Spa Specialist position"
    >
      {/* Honeypot: hidden from people, tempting for bots. */}
      <div className="cf-honey" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />
        </label>
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-name">
          Full name <span className="cf-req" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          className={fieldCls(!!errors.name)}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (attempted) refreshErrors(validate({ name: e.target.value }));
          }}
          onBlur={touchValidate}
          autoComplete="name"
          enterKeyHint="next"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
        />
        <p className="cf-err" id="cf-name-err" role="alert" hidden={!errors.name}>
          {errors.name}
        </p>
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-email">
          Email <span className="cf-req" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          className={fieldCls(!!errors.email)}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (attempted) refreshErrors(validate({ email: e.target.value }));
          }}
          onBlur={touchValidate}
          autoComplete="email"
          enterKeyHint="next"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
        />
        <p className="cf-err" id="cf-email-err" role="alert" hidden={!errors.email}>
          {errors.email}
        </p>
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-phone">
          Phone or WhatsApp <span className="cf-req" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-phone"
          className={fieldCls(!!errors.phone)}
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (attempted) refreshErrors(validate({ phone: e.target.value }));
          }}
          onBlur={touchValidate}
          placeholder="+264 81 234 5678"
          autoComplete="tel"
          enterKeyHint="next"
          required
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "cf-phone-err" : "cf-phone-hint"}
        />
        <p className="cf-hint" id="cf-phone-hint" hidden={!!errors.phone}>
          +264 or the local 0 number is fine.
        </p>
        <p className="cf-err" id="cf-phone-err" role="alert" hidden={!errors.phone}>
          {errors.phone}
        </p>
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-qualification">
          Qualification <span className="cf-req" aria-hidden="true">*</span>
        </label>
        <select
          id="cf-qualification"
          className={fieldCls(!!errors.qualification)}
          value={qualification}
          onChange={(e) => {
            setQualification(e.target.value);
            if (attempted) refreshErrors(validate({ qualification: e.target.value }));
          }}
          onBlur={touchValidate}
          required
          aria-required="true"
          aria-invalid={!!errors.qualification}
          aria-describedby={errors.qualification ? "cf-qual-err" : undefined}
        >
          <option value="" disabled>
            Choose one
          </option>
          {QUALIFICATIONS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
        <p className="cf-err" id="cf-qual-err" role="alert" hidden={!errors.qualification}>
          {errors.qualification}
        </p>
      </div>

      <fieldset className="cf-field cf-chips-field">
        <legend className="cf-label">
          Treatments you can deliver <span className="cf-opt">optional</span>
        </legend>
        <div className="cf-chips" role="group" aria-label="Treatments you can deliver">
          {TREATMENTS.map((t) => {
            const on = treatments.includes(t);
            return (
              <span key={t} className={`cf-chip${on ? " on" : ""}`}>
                <input
                  type="checkbox"
                  id={`cf-t-${t.replace(/[^a-z]/gi, "").toLowerCase()}`}
                  checked={on}
                  onChange={() => toggleTreatment(t)}
                />
                <label htmlFor={`cf-t-${t.replace(/[^a-z]/gi, "").toLowerCase()}`}>{t}</label>
              </span>
            );
          })}
        </div>
        <p className="cf-hint">Tick any you are confident with, or none.</p>
      </fieldset>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-experience">
          Years of experience <span className="cf-opt">optional</span>
        </label>
        <select
          id="cf-experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="" disabled>
            Choose one, or leave it open
          </option>
          {EXPERIENCE.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-note">
          About me <span className="cf-opt">optional</span>
        </label>
        <textarea
          id="cf-note"
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
          placeholder="A few lines about you and the work you love"
          rows={4}
          aria-describedby="cf-note-count"
        />
        <p className="cf-count" id="cf-note-count" aria-live="polite">
          {noteCount} / {NOTE_MAX}
        </p>
      </div>

      <div className="cf-field cf-consent">
        <label className="cf-consent-box" htmlFor="cf-consent">
          <input
            type="checkbox"
            id="cf-consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (attempted) refreshErrors(validate({ consent: e.target.checked }));
            }}
            onBlur={touchValidate}
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "cf-consent-err" : undefined}
          />
        </label>
        <label htmlFor="cf-consent">
          I agree that Corner Spa may use these details to consider my application.
        </label>
      </div>
      {errors.consent && (
        <p className="cf-err" id="cf-consent-err" role="alert" hidden={!errors.consent}>
          {errors.consent}
        </p>
      )}

      <div className="cf-actions">
        <button
          type="button"
          className="btn btn-solid"
          disabled={!valid}
          onClick={startApply("whatsapp")}
        >
          Apply on WhatsApp
        </button>
        <button
          type="button"
          className="btn"
          disabled={!valid}
          onClick={startApply("email")}
        >
          Apply by email
        </button>
      </div>
      <p className="cf-locked" aria-live="polite" hidden={valid}>
        Fill in the required fields to unlock the apply buttons.
      </p>

      {pending && (
        <div
          className="cf-confirm"
          role="group"
          aria-label="Confirm your application"
          ref={confirmRef}
          tabIndex={-1}
        >
          <p className="cf-confirm-title">Almost done.</p>
          <p>
            Your message is ready. Please attach your CV (PDF or Word) before you
            send it.
          </p>
          <div className="cf-confirm-actions">
            {pending === "whatsapp" ? (
              <a
                className="btn btn-solid"
                href={waHref}
                target="_blank"
                rel="noopener"
                onClick={continueRedirect}
              >
                Continue
              </a>
            ) : (
              <a
                className="btn btn-solid"
                href={mailHref}
                onClick={continueRedirect}
              >
                Continue
              </a>
            )}
            <button type="button" className="btn" onClick={copyMessage}>
              {copied ? "Copied" : "Copy my application"}
            </button>
            <button type="button" className="cf-back" onClick={cancelRedirect}>
              Back to the form
            </button>
          </div>
          {copied && (
            <p className="cf-copied" role="status">
              Copied. Paste it into the email or the WhatsApp chat and add your CV.
            </p>
          )}
          <p className="cf-confirm-where">
            {pending === "whatsapp"
              ? "Continue opens WhatsApp in a new tab with your application written."
              : "Continue opens your email app with the application written."}
          </p>
        </div>
      )}

      <p className="cf-privacy">Your details go straight to Corner Spa by WhatsApp or email.</p>
      <p className="cf-privacy">
        Prefer email the plain way?{" "}
        <a href={`mailto:${CAREERS_EMAIL}?subject=Spa%20Specialist%20Application`}>
          Email your CV to {CAREERS_EMAIL}
        </a>
        .
      </p>

      {/* No JavaScript: the form cannot compose, so hand over the address. */}
      <noscript>
        <p className="cf-privacy">
          JavaScript is off, so the form above cannot write your message. Email your
          CV to <a href={`mailto:${CAREERS_EMAIL}?subject=Spa%20Specialist%20Application`}>{CAREERS_EMAIL}</a>{" "}
          or WhatsApp {SPA.phone}.
        </p>
      </noscript>
    </form>
  );
}
