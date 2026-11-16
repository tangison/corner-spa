"use client";

import { useEffect, useRef, useState } from "react";
import { MEDIA, REVIEWS_URL, track } from "@/lib/spa";

/* SPA-REVIEWS carousel — the seven guest reviews from the owner's website
   pack (images/reviews, dark cards with gold frames), ported from
   js/reviews-carousel.js to a React island on the homepage. Same behaviour
   as the pack: swipes on phones, arrows on desktop, dots, auto-plays every
   five seconds and stops on touch, hover or focus; honours
   prefers-reduced-motion. The cards are near-black (#181510), so the band
   stays light: the spa's own sand-ripple photo washes in behind and the
   framed cards read like prints on cream. Every name and star count in the
   alt text comes from the pack itself — nothing is invented here. */

const SLIDES = [
  { src: "/images/reviews/review-1.jpg", alt: "Review from Takura, 4 stars: strong touch, helped with lower back pain." },
  { src: "/images/reviews/review-2.jpg", alt: "Review from Nelly Nelumbu, 5 stars: the ladies are gentle, patient and kind." },
  { src: "/images/reviews/review-3.jpg", alt: "Review from Maria Haipinge, 4 stars: welcoming drink and professional service." },
  { src: "/images/reviews/review-4.jpg", alt: "Anonymous review, 5 stars: the massage, keep up the good work." },
  { src: "/images/reviews/review-5.jpg", alt: "Review from Dr Shilcalepo, 5 stars: the facial and leg massage, I will come back." },
  { src: "/images/reviews/review-6.jpg", alt: "Review from Jason, 5 stars: the hot stones, the hands must be blessed." },
  { src: "/images/reviews/review-7.jpg", alt: "Anonymous review, 3 stars: foot spa was nice." },
];

const AUTOPLAY_MS = 5000;

export function ReviewsCarousel() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);

  // One effect owns the whole carousel behaviour, exactly like the pack:
  // dot marking on scroll, arrows, autoplay with the pack's stop/start rules.
  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const slides = Array.from(track.children) as HTMLElement[];

    const goTo = (i: number) => {
      const next = (i + slides.length) % slides.length;
      const s = slides[next];
      track.scrollTo({
        left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };
    const mark = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let d = Infinity;
      slides.forEach((s, i) => {
        const c = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
        if (c < d) {
          d = c;
          best = i;
        }
      });
      currentRef.current = best;
      setCurrent(best);
    };
    const onScroll = () => window.requestAnimationFrame(mark);

    let timer: number | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    const start = () => {
      if (reduced) return;
      stop();
      timer = window.setInterval(() => goTo(currentRef.current + 1), AUTOPLAY_MS);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    ["mouseenter", "focusin", "touchstart"].forEach((e) =>
      root.addEventListener(e, stop, { passive: true }),
    );
    ["mouseleave", "focusout"].forEach((e) => root.addEventListener(e, start));
    mark();
    start();
    return () => {
      stop();
      track.removeEventListener("scroll", onScroll);
      ["mouseenter", "focusin", "touchstart"].forEach((e) =>
        root.removeEventListener(e, stop),
      );
      ["mouseleave", "focusout"].forEach((e) => root.removeEventListener(e, start));
    };
  }, []);

  const step = (delta: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const next = (currentRef.current + delta + slides.length) % slides.length;
    const s = slides[next];
    track.scrollTo({
      left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={rootRef}
      data-sc-act="flow"
      aria-label="What our guests say"
      className="rev-band"
    >
      <img
        className="rev-band-bg"
        src={MEDIA.photos.sandRipples}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1600}
        loading="lazy"
        decoding="async"
      />
      <div className="rev-band-wash" aria-hidden="true" />
      <div className="w rev-band-inner" data-sc-in>
        <p className="eyebrow">Reviews</p>
        <h2 className="serif">What our guests say.</h2>
        <div className="cs-reviews">
          <button
            className="cs-reviews__btn cs-reviews__prev"
            type="button"
            aria-label="Previous review"
            data-track="reviews_prev"
            onClick={() => step(-1)}
          >
            &#8249;
          </button>
          <div className="cs-reviews__track" ref={trackRef}>
            {SLIDES.map((s) => (
              <figure className="cs-reviews__slide" key={s.src}>
                <img src={s.src} alt={s.alt} width={1200} height={1600} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <button
            className="cs-reviews__btn cs-reviews__next"
            type="button"
            aria-label="Next review"
            data-track="reviews_next"
            onClick={() => step(1)}
          >
            &#8250;
          </button>
          <div className="cs-reviews__dots" role="group" aria-label="Choose a review">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                className="cs-reviews__dot"
                type="button"
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === current}
                onClick={() => step(i - currentRef.current)}
              />
            ))}
          </div>
        </div>
        <p className="rev-more">
          Every card is a real guest review from our Google profile.{" "}
          <a
            href={REVIEWS_URL}
            target="_blank"
            rel="noopener"
            data-track="reviews_google"
            onClick={() => track("reviews_google_click")}
          >
            Read them all on Google
          </a>
          .
        </p>
      </div>
    </section>
  );
}
