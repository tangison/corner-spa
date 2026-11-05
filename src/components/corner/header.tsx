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
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet={MEDIA.markLight}
              />
              <img src={MEDIA.markDark} alt="" width={160} height={146} />
            </picture>
            Corner Spa
          </a>
          <a className="btn" href="#book" onClick={() => track("nav_book_click")}>
            Book
          </a>
        </header>
      </div>
    </div>
  );
}
