import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { EmbedGuard } from "@/components/corner/embed-guard";
import { TrackClicks } from "@/components/corner/track-clicks";
import { BookForm } from "@/components/corner/book-form";
import { HoursList } from "@/components/corner/open-now";
import {
  ADDRESS, ADDRESS_LINE, BEFORE_YOUR_VISIT, DIRECTIONS_URL, FAQ, MASSAGE_NOTES,
  SITE_URL, SPA, WA_PREFILL, waLink,
} from "@/lib/spa";

export const metadata: Metadata = {
  title: "Book a treatment | Corner Spa, Windhoek",
  description:
    "Choose a massage, foot spa, nails, waxing or lashes and book it on WhatsApp. The form opens WhatsApp with your booking written and ready to send.",
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: {
    title: "Book a treatment | Corner Spa, Windhoek",
    description:
      "Choose a treatment and book it on WhatsApp. The message opens written and ready to send.",
    url: `${SITE_URL}/book`,
    type: "website",
    images: [
      {
        url: "/media/hero-wide.jpg",
        width: 1510,
        height: 1041,
        alt: "Smooth wet stones and soft light at Corner Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a treatment | Corner Spa, Windhoek",
    images: ["/media/hero-wide.jpg"],
  },
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Book a treatment">
          <div className="w">
            <h1 className="serif">Book a treatment</h1>
            <p className="lead">
              Choose what you would like, add your name and the day you prefer.
              The message opens in WhatsApp written and ready to send. Nothing
              is stored on this site.
            </p>
            <div className="lead-cta">
              <a
                className="btn"
                href={waLink(WA_PREFILL.general)}
                target="_blank"
                rel="noopener"
                data-track="book_page_wa_click"
              >
                WhatsApp us
              </a>
              <a className="a2" href="/price-list.pdf" data-track="book_page_pdf_click">
                Price list (PDF)
              </a>
            </div>
            <p className="note" style={{ marginTop: "18px" }}>
              If WhatsApp does not open, the form below can copy the message
              for you instead.
            </p>

            <div className="book-facts" style={{ marginTop: "48px" }}>
              <div>
                <p className="grp-label">Where</p>
                <p className="fact">
                  {ADDRESS_LINE}
                  <br />
                  <span className="note">{ADDRESS.plot}</span>
                </p>
                <p>
                  <a
                    className="a2"
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener"
                    data-track="book_page_directions_click"
                  >
                    Get directions
                  </a>
                  <span className="note"> · </span>
                  <a className="a2" href="/contact" data-track="book_page_contact_click">
                    More ways to reach us
                  </a>
                </p>
              </div>
              <div>
                <p className="grp-label">Hours</p>
                <HoursList />
              </div>
            </div>

            <div className="menu-notes" style={{ marginTop: "64px" }}>
              <p className="eyebrow">The massages</p>
              {MASSAGE_NOTES.map((m) => (
                <div key={m.name} className="mnote">
                  <h2 className="serif">{m.name}</h2>
                  <p>{m.note}</p>
                </div>
              ))}
              <p className="note">Prices are exactly as on the price list. Facials: ask us for prices.</p>
            </div>

            <div className="before-visit">
              <p className="eyebrow">Before your visit</p>
              <ul>
                {BEFORE_YOUR_VISIT.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: "48px" }}>
              <BookForm />
            </div>

            <div className="faq">
              <h2 className="serif">Questions we hear often</h2>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p className="faq-a">{f.a}</p>
                </details>
              ))}
            </div>

            <p style={{ marginTop: "32px" }}>{SPA.currencyNote}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWidgets />
      <EmbedGuard />
      <TrackClicks />
    </>
  );
}
