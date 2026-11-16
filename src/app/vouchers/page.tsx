import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { EmbedGuard } from "@/components/corner/embed-guard";
import { TrackClicks } from "@/components/corner/track-clicks";
import { VoucherForm } from "@/components/corner/voucher-form";
import { HoursList } from "@/components/corner/open-now";
import { ScrollEngine } from "@/components/corner/engine";
import {
  ADDRESS, ADDRESS_LINE, MAPS_APPLE, MAPS_GOOGLE, MEDIA, SITE_URL,
  VOUCHER_OPEN_MIN, VOUCHER_PACKAGES, VOUCHERS_URL, VOUCHER_WA_PREFILL,
  VOUCHER_VALIDITY_MONTHS, waLink,
} from "@/lib/spa";

const TITLE = "Gift Vouchers | Corner Spa, Windhoek";
const DESCRIPTION =
  "Gift vouchers for Corner Spa in Windhoek West. Ready-made packages or any amount from N$ 200, personalised with their name and your message, ordered on WhatsApp in under two minutes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: VOUCHERS_URL },
  openGraph: {
    title: "The gift of quiet | Corner Spa, Windhoek",
    description: DESCRIPTION,
    url: VOUCHERS_URL,
    siteName: "Corner Spa",
    locale: "en_NA",
    type: "website",
    images: [
      {
        url: MEDIA.photos.peopleStonesRest,
        width: 1280,
        height: 1600,
        alt: "A Corner Spa gift voucher: massage, hot stone, foot spa and nails in Windhoek West",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The gift of quiet | Corner Spa, Windhoek",
    description: DESCRIPTION,
    images: [MEDIA.photos.peopleStonesRest],
  },
};

const voucherJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Corner Spa gift vouchers",
  url: VOUCHERS_URL,
  provider: {
    "@type": "DaySpa",
    name: "Corner Spa",
    sameAs: [SITE_URL, "https://oryxinstitute.org", "https://mendozer.com"],
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.area,
      addressCountry: "NA",
    },
  },
  itemListElement: [
    ...VOUCHER_PACKAGES.map((p) => ({
      "@type": "Offer",
      name: `${p.name} gift voucher`,
      description: p.includes.join(", "),
      price: p.price,
      priceCurrency: "NAD",
      availability: "https://schema.org/InStock",
      url: VOUCHERS_URL,
    })),
    {
      "@type": "Offer",
      name: "Open gift voucher — choose your own amount",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: VOUCHER_OPEN_MIN,
        priceCurrency: "NAD",
      },
      availability: "https://schema.org/InStock",
      url: VOUCHERS_URL,
    },
  ],
};

export default function VouchersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(voucherJsonLd) }}
      />
      <SiteHeader />

      <main id="top">
        {/* 1 - Hero: towel photo, washed to cream, same as the careers page. */}
        <section className="c-hero" aria-label="Corner Spa gift vouchers">
          <img
            className="hero-bg"
            src={MEDIA.photos.towel}
            alt=""
            aria-hidden="true"
            width={1600}
            height={1600}
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero-wash" aria-hidden="true" />
          <div className="w c-hero-inner" data-sc-in data-sc-stagger="90">
            <p className="c-label">Gift vouchers</p>
            <h1 className="serif">The gift of quiet.</h1>
            <p className="lead">
              A Corner Spa voucher is a calm hour in someone&rsquo;s hands.
              Choose a package or your own amount, add their name and a line
              from you, and the order opens in WhatsApp ready to send.
            </p>
            <div className="lead-cta">
              <a className="btn" href="#build" data-track="vouchers_build_scroll">
                Build a voucher
              </a>
              <a className="btn" href="#packages" data-track="vouchers_packages_scroll">
                See the packages
              </a>
            </div>
          </div>
        </section>

        {/* 2 - How it works: three quiet steps, same shape as careers routes. */}
        <section data-sc-act="flow" aria-label="How it works" className="c-section">
          <div className="w">
            <p className="eyebrow">How it works</p>
            <div className="c-routes">
              <div className="c-card c-route" data-sc-in>
                <h3 className="serif">Choose</h3>
                <p>
                  Pick one of the packages below, or set your own amount from
                  N$ {VOUCHER_OPEN_MIN} toward anything on the menu.
                </p>
              </div>
              <div className="c-card c-route" data-sc-in>
                <h3 className="serif">Make it theirs</h3>
                <p>
                  Add their name, your name and a line to them. Your order
                  carries it all, with its own code.
                </p>
              </div>
              <div className="c-card c-route" data-sc-in>
                <h3 className="serif">Send on WhatsApp</h3>
                <p>
                  Your order opens in WhatsApp ready to send. We reply with
                  payment details, then make the gift card by hand under its
                  code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 - Packages + builder (client island). The card is built by
            hand at the spa; the page only takes the order. */}
        <VoucherForm />

        {/* 4 - Good to know: the terms the voucher carries. */}
        <section data-sc-act="flow" aria-label="Good to know" className="c-section">
          <div className="w">
            <p className="eyebrow">Good to know</p>
            <div className="c-card" data-sc-in style={{ maxWidth: "760px" }}>
              <ul className="c-list" style={{ marginTop: 0 }}>
                <li>
                  Vouchers are valid for {VOUCHER_VALIDITY_MONTHS} months from
                  the day they are issued.
                </li>
                <li>
                  Book in advance on WhatsApp and mention the voucher code, so
                  the room is ready.
                </li>
                <li>
                  Treatments are subject to availability; Sunday visits are by
                  appointment.
                </li>
                <li>
                  Vouchers are not refundable and cannot be exchanged for cash.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5 - Visit us, same facts as every page. */}
        <section data-sc-act="flow" aria-label="Visit us" className="c-section">
          <div className="w">
            <p className="eyebrow">Visit us</p>
            <div className="c-visit">
              <div className="c-card" data-sc-in>
                <h2 className="serif" style={{ fontSize: "20px" }}>Where we are</h2>
                <p className="fact">
                  {ADDRESS_LINE}
                  <br />
                  <span className="note">on the Flexona Organizational Services plot</span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <a className="btn" href={MAPS_GOOGLE} target="_blank" rel="noopener" data-track="vouchers_maps_google">
                    Open in Google Maps
                  </a>
                  <a className="btn" href={MAPS_APPLE} target="_blank" rel="noopener" data-track="vouchers_maps_apple">
                    Open in Apple Maps
                  </a>
                </div>
              </div>
              <div className="c-card" data-sc-in>
                <h2 className="serif" style={{ fontSize: "20px" }}>Hours</h2>
                <HoursList compact />
              </div>
              <div className="c-card" data-sc-in>
                <h2 className="serif" style={{ fontSize: "20px" }}>Talk to us</h2>
                <p className="fact">
                  Phone / WhatsApp:{" "}
                  <a href="tel:+264816234788">+264 81 623 4788</a>
                </p>
                <a
                  className="btn"
                  href={waLink(VOUCHER_WA_PREFILL)}
                  target="_blank"
                  rel="noopener"
                  data-track="vouchers_wa_chat"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6 - Partner band, then the shared footer. */}
      <section className="c-band" aria-label="About Corner Spa">
        <div className="w">
          <p className="c-band-line">
            First project of Oryx Institute. A concept by Mendozer Investments.
          </p>
          <div className="c-band-logos">
            <a className="c-band-logo" href="https://oryxinstitute.org" target="_blank" rel="noopener">
              <img src={MEDIA.oryxLockup} alt="Oryx Institute" width={154} height={50} loading="lazy" decoding="async" />
              <span>oryxinstitute.org</span>
            </a>
            <div className="c-band-divider" aria-hidden="true" />
            <a className="c-band-logo" href="https://mendozer.com" target="_blank" rel="noopener">
              <img src={MEDIA.mendozerLockup} alt="Mendozer Investments" width={184} height={46} loading="lazy" decoding="async" />
              <span>mendozer.com</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingWidgets />
      <EmbedGuard />
      <TrackClicks />
      <ScrollEngine />
    </>
  );
}
