import { REVIEWS_URL } from "@/lib/spa";

// Reviews section. Deliberately built but hidden: it renders nothing until
// a Google Business Profile URL is filled in (REVIEWS_URL in src/lib/spa.ts).
// There is no profile yet, so the site shows nothing. When the URL exists,
// this becomes a single honest link, never invented quotes or star ratings.
export function ReviewsSection() {
  if (!REVIEWS_URL) return null;
  return (
    <section data-sc-act="flow" aria-label="Reviews" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="w">
        <p className="eyebrow">Reviews</p>
        <p>
          Visited the spa? Read what guests say, or share your own visit, on
          our Google profile.
        </p>
        <a className="a2" href={REVIEWS_URL} target="_blank" rel="noopener">
          Read our reviews on Google
        </a>
      </div>
    </section>
  );
}
