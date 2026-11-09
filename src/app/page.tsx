import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { ScrollEngine } from "@/components/corner/engine";
import { EmbedGuard } from "@/components/corner/embed-guard";
import { TrackClicks } from "@/components/corner/track-clicks";
import { BookForm } from "@/components/corner/book-form";
import { ReviewsSection } from "@/components/corner/reviews";
import { HoursList } from "@/components/corner/open-now";
import {
  ADDRESS, ADDRESS_LINE, DIRECTIONS_URL, FACIALS_NOTE, MEDIA, OPENING_HOURS_SPEC,
  PARTNERS, PRICE_GROUPS, PRICE_RANGE, SITE_ADDRESSES, SITE_URL, SPA,
  WA_PREFILL, waBookRow, waLink,
} from "@/lib/spa";

const daySpaJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: SPA.name,
  slogan: SPA.tagline,
  description:
    "Massage, hot stone, foot spa, nails, waxing and lashes in Windhoek. The first project of Oryx Institute. A concept by Mendozer Investments.",
  telephone: SPA.phone, // structured data only, never shown as page text
  url: SITE_URL,
  priceRange: PRICE_RANGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
    addressLocality: ADDRESS.city,
    addressCountry: "NA",
  },
  openingHoursSpecification: OPENING_HOURS_SPEC,
  sameAs: [...SITE_ADDRESSES.map((a) => a.href), "https://mendozer.com"],
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
        {/* 1 - Recognition: the hero speaks first, over a full-bleed frame from
               the owner image pack, washed back to the cream ground. Entrance
               stagger on load. */}
        <section
          data-sc-act="flow"
          aria-label="Corner Spa"
          className="hero-media"
        >
          <img
            className="hero-bg"
            src={MEDIA.photos.heroStonesLeafWide}
            alt=""
            aria-hidden="true"
            width={1600}
            height={900}
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero-wash" aria-hidden="true" />
          <div className="w hero-inner">
            <div className="hero" data-sc-in data-sc-stagger="90">
              <h1 className="serif">{SPA.tagline}</h1>
              <p className="lead">{SPA.lead}</p>
              <div className="lead-cta">
                <a className="btn" href="/book" data-track="hero_book_click">
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
            <h2 className="serif">Price list</h2>
            <div className="menu">
              <div className="menu-media" data-sc-parallax="-0.18">
                <img
                  className="mono"
                  src={MEDIA.photos.hotStonesBack}
                  alt="Warm hands placing smooth dark stones along a back"
                  width={1279}
                  height={1600}
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
                <div className="grp" data-sc-in>
                  <h3>Facials</h3>
                  <div className="row">
                    <span className="row-name">{FACIALS_NOTE}</span>
                    <a
                      className="row-price a2"
                      href={waLink(WA_PREFILL.facial)}
                      target="_blank"
                      rel="noopener"
                      data-track="facial_wa_click"
                    >
                      Book
                    </a>
                  </div>
                </div>
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
                  <a className="a2" href="/price-list.pdf" data-track="price_pdf_click">
                    Price list (PDF)
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
                width={1600}
                height={900}
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

        {/* 5 - Range: treatments and still lifes from the owner pack, in
               sequence. One iris wipe, once. */}
        <section data-sc-act="flow" aria-label="Gallery">
          <div className="w">
            <p className="eyebrow">Gallery</p>
            <div className="g" data-sc-stagger="70">
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a mono"
                  src={MEDIA.photos.peopleBackHands}
                  alt="A therapist's hands resting on an oiled back during a full body massage"
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a mono"
                  src={MEDIA.photos.facialCheek}
                  alt="Fingertips resting on a cheek during a quiet facial"
                  width={1279}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "center 30%" }}
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }} className="s">
                <img
                  className="s"
                  src={MEDIA.photos.wetStone}
                  alt="A smooth dark stone resting in shallow water"
                  width={1600}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }} className="s">
                <img
                  className="s mono"
                  src={MEDIA.photos.couplesDetail}
                  alt="Two folded towels side by side, hands resting flat"
                  width={1280}
                  height={1600}
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
                  alt=""
                  aria-hidden="true"
                  width={1600}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "center 40%" }}
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a mono"
                  src={MEDIA.photos.peopleOilPour}
                  alt="A warm stone held flat against a shoulder"
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a mono"
                  src={MEDIA.photos.neckShoulder}
                  alt="A back, neck and shoulder massage working through a towel"
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }} className="s">
                <img
                  className="s"
                  src={MEDIA.photos.blackPebbles}
                  alt="Two smooth stones stacked one on the other"
                  width={1279}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }} className="s">
                <img
                  className="s"
                  src={MEDIA.photos.oilDrop}
                  alt=""
                  aria-hidden="true"
                  width={1600}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }} className="c">
                <img
                  className="c"
                  src={MEDIA.photos.leafMacro}
                  alt="The fine veins of a dried leaf"
                  width={1600}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a mono"
                  src={MEDIA.photos.fullbodyStones}
                  alt="Three heated stones resting along a back during a hot stone massage"
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure data-sc-in style={{ margin: 0 }}>
                <img
                  className="a mono"
                  src={MEDIA.photos.peopleStonesRest}
                  alt="Two therapists working side by side during a couples massage"
                  width={1280}
                  height={1600}
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
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="venture-logo"
                    data-track="partner_click"
                    data-track-detail={JSON.stringify({ partner: p.name })}
                  >
                    <img
                      src={p.name === "Oryx Institute" ? MEDIA.oryxLockup : MEDIA.mendozerLockup}
                      alt={`${p.name} logo`}
                      width={p.name === "Oryx Institute" ? 154 : 184}
                      height={p.name === "Oryx Institute" ? 50 : 46}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
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
            <p className="note" style={{ marginTop: "40px" }}>
              Making a flyer or a status image for the spa? The{" "}
              <a href="/brand">brand page</a> has the colours, the fonts and
              the real logo.
            </p>
          </div>
        </section>

        {/* 6b - Reviews: hidden until a Google Business Profile link exists. */}
        <ReviewsSection />

        {/* 7 - Commitment: WhatsApp, hours, directions, and a form that
               opens WhatsApp directly. The phone number is never printed. */}
        <section
          id="book"
          data-sc-act="flow"
          className="book"
          aria-label="Book now"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div className="w">
            <p className="eyebrow">Book now</p>
            <a
              className="ph"
              href={waLink(WA_PREFILL.general)}
              target="_blank"
              rel="noopener"
              data-track="book_wa_click"
            >
              Book on WhatsApp
            </a>
            <div className="book-facts">
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
                    data-track="directions_click"
                  >
                    Get directions
                  </a>
                  <span className="note"> · </span>
                  <a className="a2" href="/contact" data-track="home_contact_click">
                    More ways to reach us
                  </a>
                </p>
              </div>
              <div>
                <p className="grp-label">Hours</p>
                <HoursList />
              </div>
            </div>
            <BookForm />
            <p className="note">
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

      <SiteFooter />

      <FloatingWidgets />
      <EmbedGuard />
      <TrackClicks />
      <ScrollEngine />
    </>
  );
}
