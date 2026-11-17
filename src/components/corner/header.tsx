"use client";

import { useEffect, useRef, useState } from "react";
import { MEDIA, track } from "@/lib/spa";

// One nav source for both surfaces: the inline row on desktop, the drawer
// under the sticky header on mobile. Same labels, same order, same events.
const NAV = [
  { label: "Treatments", href: "/#treatments", event: "nav_treatments_click" },
  { label: "Gift vouchers", href: "/vouchers", event: "nav_vouchers_click" },
  { label: "Careers", href: "/careers", event: "nav_careers_click" },
  { label: "Contact", href: "/contact", event: "nav_contact_click" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The drawer is a disclosure, not a modal: Esc closes it and hands focus
  // back to the button, a tap outside the header closes it, and the page
  // keeps scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className={`site-header${scrolled ? " scrolled" : ""}`} ref={rootRef}>
      <div className="w">
        <header className="site">
          <a
            className="brand"
            href="#top"
            onClick={() => track("brand_click")}
            aria-label="Corner Spa, back to top"
          >
            <img
              className="mark-img mark-dark"
              src={MEDIA.markDark}
              alt=""
              width={160}
              height={146}
            />
            <img
              className="mark-img mark-light"
              src={MEDIA.markLight}
              alt=""
              width={160}
              height={146}
            />
            Corner Spa
          </a>
          <nav className="header-nav" aria-label="Main">
            {NAV.map((l) => (
              <a key={l.href} className="nav-link" href={l.href} onClick={() => track(l.event)}>
                {l.label}
              </a>
            ))}
            <a className="btn" href="/book" onClick={() => track("nav_book_click")}>
              Book
            </a>
          </nav>
          <button
            ref={btnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </header>
      </div>
      <nav id="mobile-nav" className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
        <div className="w">
          {NAV.map((l) => (
            <a
              key={l.href}
              className="mnav-link"
              href={l.href}
              onClick={() => {
                track(l.event);
                setOpen(false);
              }}
            >
              {l.label}
            </a>
          ))}
          <p className="mnav-book">
            <a
              className="btn"
              href="/book"
              onClick={() => {
                track("nav_book_click");
                setOpen(false);
              }}
            >
              Book a treatment
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
}
