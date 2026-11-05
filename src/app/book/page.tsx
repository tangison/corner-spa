import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { EmbedGuard } from "@/components/corner/embed-guard";
import { TrackClicks } from "@/components/corner/track-clicks";
import { BookForm } from "@/components/corner/book-form";
import {
  MASSAGE_NOTES,
  SITE_ADDRESSES,
  SITE_URL,
  SPA,
  WA_PREFILL,
  waLink,
} from "@/lib/spa";

export const metadata: Metadata = {
  title: "Book a treatment | Corner Spa, Windhoek",
  description:
    "Choose a massage, nails or waxing treatment and book it on WhatsApp. The form opens WhatsApp with your booking written and ready to send.",
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: {
    title: "Book a treatment | Corner Spa, Windhoek",
    description:
      "Choose a treatment and book it on WhatsApp. The message opens written and ready to send.",
    url: `${SITE_URL}/book`,
    type: "website",
  },
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Book a treatment">
          <div className="w">
            <p className="eyebrow">Book now</p>
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
              <a className="btn" href={SPA.phoneHref} data-track="book_page_phone_click">
                {SPA.phone}
              </a>
            </div>

            <div className="menu-notes" style={{ marginTop: "48px" }}>
              <p className="eyebrow">The massages</p>
              {MASSAGE_NOTES.map((m) => (
                <div key={m.name} className="mnote">
                  <h2 className="serif">{m.name}</h2>
                  <p>{m.note}</p>
                </div>
              ))}
              <p className="note">Prices are exactly as on the price list. Facials: ask us for prices.</p>
            </div>

            <div style={{ marginTop: "48px" }}>
              <BookForm />
            </div>

            <p style={{ marginTop: "32px" }}>
              {SITE_ADDRESSES.map((a) => (
                <span key={a.label}>
                  <a href={a.href} target="_blank" rel="noopener">
                    {a.label}
                  </a>
                  <br />
                </span>
              ))}
            </p>
            <p>{SPA.currencyNote}</p>
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
