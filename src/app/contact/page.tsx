import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { HoursList } from "@/components/corner/open-now";
import { DarkPage } from "@/components/corner/dark-page";
import {
  ADDRESS, DIRECTIONS_URL, OPENING_HOURS_SPEC, SITE_ADDRESSES,
  SITE_URL, SPA, WA_PREFILL, waLink,
} from "@/lib/spa";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact and location | Corner Spa",
  url: `${SITE_URL}/contact`,
  about: {
    "@type": "DaySpa",
    name: SPA.name,
    telephone: SPA.phone, // structured data only, never shown as page text
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
      addressLocality: ADDRESS.city,
      addressCountry: "NA",
    },
    openingHoursSpecification: OPENING_HOURS_SPEC,
  },
};

export const metadata: Metadata = {
  title: "Contact and location | Corner Spa, Windhoek",
  description:
    "Find Corner Spa at 34 Schonlein Street, Windhoek West, Windhoek. Opening hours, directions and WhatsApp booking. No phone tag: message us and we answer.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact and location | Corner Spa, Windhoek",
    description:
      "34 Schonlein Street, Windhoek West. Opening hours, directions and WhatsApp booking.",
    url: `${SITE_URL}/contact`,
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
    title: "Contact and location | Corner Spa, Windhoek",
    images: ["/media/hero-wide.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <DarkPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <SiteHeader />
      <main id="top">
        <section aria-label="Contact and location">
          <div className="w">
            <h1 className="serif">Come and find us</h1>
            <p className="lead">
              The spa is quiet on purpose, so we keep contact simple: one
              address, one WhatsApp, and the hours we are actually open.
            </p>

            <p className="type-moment">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener"
                data-track="contact_directions_click"
              >
                {ADDRESS.street},
                <br />
                {ADDRESS.area}
              </a>
            </p>
            <p className="note" style={{ marginTop: "6px" }}>
              {ADDRESS.plot}. Tap the address for directions.
            </p>

            <div className="book-facts" style={{ marginTop: "36px" }}>
              <div>
                <p className="grp-label">Where</p>
                <p className="fact">
                  {ADDRESS.city}, {ADDRESS.country}
                </p>
                <p className="note" style={{ marginTop: "20px" }}>
                  On the web:{" "}
                  {SITE_ADDRESSES.map((a, i) => (
                    <span key={a.label}>
                      <a href={a.href} target="_blank" rel="noopener">
                        {a.label}
                      </a>
                      {i < SITE_ADDRESSES.length - 1 ? " · " : null}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="grp-label">Hours</p>
                <HoursList />
              </div>
            </div>

            <div className="lead-cta" style={{ marginTop: "48px" }}>
              <a
                className="btn"
                href={waLink(WA_PREFILL.question)}
                target="_blank"
                rel="noopener"
                data-track="contact_wa_click"
              >
                Message us on WhatsApp
              </a>
              <a className="btn" href="/book" data-track="contact_book_click">
                Book a treatment
              </a>
            </div>

            <p className="note" style={{ marginTop: "24px", maxWidth: "52ch" }}>
              We answer during opening hours. For legal or privacy requests,
              email info@mendozer.com.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
