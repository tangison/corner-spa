"use client";

import { useEffect, useState } from "react";
import { MEDIA, track } from "@/lib/spa";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`site-header${scrolled ? " scrolled" : ""}`}>
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
            <a className="nav-link" href="/careers" onClick={() => track("nav_careers_click")}>
              Careers
            </a>
            <a className="btn" href="/book" onClick={() => track("nav_book_click")}>
              Book
            </a>
          </nav>
        </header>
      </div>
    </div>
  );
}
