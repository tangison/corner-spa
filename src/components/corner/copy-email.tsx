"use client";

import { useEffect, useRef, useState } from "react";

// Click-to-copy mailbox line, after the Collins footer pattern: the email
// sits as a quiet button, and a small "Email copied" confirmation fades in
// next to it. Clipboard writes need a secure context; on failure the button
// degrades to a mailto link swap so the address is still actionable.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setFallback(true);
    }
  }

  if (fallback) {
    return (
      <a className="copy-mail" href={`mailto:${email}`}>
        {email}
      </a>
    );
  }

  return (
    <span className="foot-hello-mail">
      <button type="button" className="copy-mail" onClick={copy}>
        {email}
      </button>
      <span className={`copy-ok${copied ? " show" : ""}`} role="status" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </span>
  );
}
