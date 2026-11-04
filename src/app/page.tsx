import { SiteHeader } from "@/components/corner/header";
import { FloatingWidgets } from "@/components/corner/widgets";
import { ScrollEngine } from "@/components/corner/engine";
import { EmbedGuard } from "@/components/corner/embed-guard";
import { TrackClicks } from "@/components/corner/track-clicks";
import { BookForm } from "@/components/corner/book-form";
import {
  MEDIA, PARTNERS, PRICE_GROUPS, SPA, SITE_ADDRESSES, SITE_URL,
  WA_PREFILL, waBookRow, waLink,
} from "@/lib/spa";

const daySpaJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: SPA.name,
  slogan: SPA.tagline,
  description:
    "Massage, hot stone, nails and waxing in Windhoek. The first project of Oryx Institute. A concept by Mendozer Investments.",
  telephone: SPA.phone,
  url: SITE_URL,
  priceRange: "N$ 70 - N$ 700",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(daySpaJsonLd) }}
      />

      <span data-sc-progress aria-hidden="true" />
      <SiteHeader />

      <main id="top">
        {/* 1 - Recognition: the hero speaks first. Entrance stagger on load. */}
        <section data-sc-act="flow" aria-label="Corner Spa">
          <div className="w">
            <div className="hero" data-sc-in data-sc-stagger="90">
              <h1 className="serif">{SPA.tagline}</h1>
              <p className="lead">{SPA.lead}</p>
              <div className="lead-cta">
                <a className="btn" href="#book" data-track="hero_book_click">
                  Book a treatment
                </a>
                <a
                  className="btn"
                  href={waLink(WA_PREFILL.general)}
                  target="_blank"
                  rel="noopener"
                  data-track="hero_whatsapp_click"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2 - Breath: first photograph. Layers part at slightly different rates. */}
        <section data-sc-act="flow" className="breath" aria-label="Leaf resting on stone">
          <figure
            data-sc-reveal="up"
            data-sc-reveal-at="0.12 0.6"
            style={{ margin: 0 }}
          >
            <div data-sc-parallax="-0.45">
              <img
                className="full"
                src={MEDIA.photos.leafAndPebble}
                alt="A dried leaf resting against a smooth stone"
                width={2400}
                height={1350}
                decoding="async"
              />
            </div>
          </figure>
        </section>

        {/* 3 - Substance: honest prices, sticky photo, every row books on WhatsApp. */}
        <section id="treatments" data-sc-act="flow" aria-label="Price list">
          <div className="w">
            <p className="eyebrow">Treatments</p>
            <h2 className="serif">Price list</h2>
            <div className="menu">
              <div className="menu-media" data-sc-parallax="-0.18">
                <img
                  src={MEDIA.photos.hotStonesBack}
                  alt="Hot stones placed along the back"
                  width={1919}
                  height={2400}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                {PRICE_GROUPS.map((g) => (
                  <div key={g.id} className="grp" data-sc-in data-sc-stagger="40">
                    <h3>{g.title}</h3>
                    {g.rows.map((r) => (
                      <div key={r.name} className="row">
                        <a
                          className="row-name"
                          href={waLink(waBookRow(r.name, r.detail, r.price))}
                          target="_blank"
                          rel="noopener"
                          data-track="row_wa_click"
                          data-track-detail={JSON.stringify({ treatment: r.name })}
                        >
                          {r.name}
                          {r.detail ? <small>{r.detail}</small> : null}
                        </a>
                        <span className="row-price">N$ {r.price}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <p className="note">{SPA.facialsNote}</p>
                <div className="menu-foot" data-sc-in>
                  <a
                    className="btn"
                    href={waLink(WA_PREFILL.general)}
                    target="_blank"
                    rel="noopener"
                    data-track="menu_wa_click"
                  >
                    Book on WhatsApp
                  </a>
                  <p className="note">Tap any treatment to book it in one message.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 - THE PEAK: pinned sand band. The ripples drift, the line assembles. */}
        <section
          data-sc-act="pin"
          data-sc-span="2.4"
          className="quote"
          aria-label="Slow, quiet and unhurried"
        >
          <div data-sc-stage>
            <div className="quote-media" data-sc-parallax="-0.5" aria-hidden="true">
              <img
                src={MEDIA.photos.sandRipples}
                alt=""
                width={2400}
                height={1350}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="quote-copy">
              <p className="serif" data-sc-cue="0.15 1 0.4 0.3" data-sc-kinetic="words">
                {SPA.quote}
              </p>
            </div>
          </div>
        </section>

        {/* 5 - Range: close-ups, in sequence. One iris wipe, once. */}
        <section data-sc-act="flow" aria-label="Gallery">
          <div className="w">
            <p className="eyebrow">Gallery</p>
            <div className="g" data-sc-stagger="70">
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a"
                  src={MEDIA.photos.blackPebbles}
                  alt="Two smooth black stones, one resting on the other"
                  width={1919}
                  height={2400}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a"
                  src={MEDIA.photos.facialCheek}
                  alt="Fingertips on the cheek during a facial"
                  width={1919}
                  height={2400}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="s"
                  src={MEDIA.photos.wetStone}
                  alt="A wet black stone with water droplets"
                  width={2400}
                  height={2400}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="s"
                  style={{ objectPosition: "left center" }}
                  src={MEDIA.photos.leafMacro}
                  alt="A dried leaf with fine veins"
                  width={2400}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }} className="c">
                <img
                  data-sc-reveal="iris"
                  data-sc-reveal-at="0.55 0.9"
                  className="c"
                  src={MEDIA.photos.towel}
                  alt="Soft cotton towel weave"
                  width={2400}
                  height={2400}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 6 - Proof: one venture, two partners. */}
        <section
          data-sc-act="flow"
          aria-label="The venture"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div className="w">
            <p className="eyebrow">The venture</p>
            <div className="pt" data-sc-in data-sc-stagger="80">
              {PARTNERS.map((p) => (
                <div key={p.name}>
                  <h3 className="serif">{p.name}</h3>
                  <p>
                    {p.role}. {p.line}
                  </p>
                  <a
                    className="a2"
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    data-track="partner_click"
                    data-track-detail={JSON.stringify({ partner: p.name })}
                  >
                    {p.siteLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 - Commitment: phone, WhatsApp, and a form that opens WhatsApp directly. */}
        <section
          id="book"
          data-sc-act="flow"
          className="book"
          aria-label="Book now"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div className="w">
            <p className="eyebrow">Book now</p>
            <a className="ph" href={SPA.phoneHref} data-track="phone_click">
              {SPA.phone}
            </a>
            <div className="book-cta">
              <a
                className="btn"
                href={waLink(WA_PREFILL.general)}
                target="_blank"
                rel="noopener"
                data-sc-magnet="0.22"
                data-track="book_wa_click"
              >
                WhatsApp
              </a>
            </div>
            <BookForm />
            <p>
              {SITE_ADDRESSES.map((a) => (
                <span key={a.label}>
                  <a href={a.href} target="_blank" rel="noopener">{a.label}</a>
                  <br />
                </span>
              ))}
            </p>
            <p>{SPA.currencyNote}</p>
          </div>
        </section>
      </main>

      <footer className="site">
        <div className="w">
          Corner Spa
          <br />
          First project of Oryx Institute. A concept by Mendozer Investments.
          <br />
          spa.mendozer.com · oryxinstitute.org/corner-spa
          <br />
          <a href="https://studio.tangison.com" target="_blank" rel="noopener">
            Made by Tangison Studio
          </a>
        </div>
      </footer>

      <FloatingWidgets />
      <EmbedGuard />
      <TrackClicks />
      <ScrollEngine />
    </>
  );
}
