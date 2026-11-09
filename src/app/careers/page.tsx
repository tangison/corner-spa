import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { EmbedGuard } from "@/components/corner/embed-guard";
import { TrackClicks } from "@/components/corner/track-clicks";
import { ApplyForm } from "@/components/corner/apply-form";
import { HoursList } from "@/components/corner/open-now";
import { ScrollEngine } from "@/components/corner/engine";
import {
  ADDRESS_LINE, ADDRESS, CAREERS_EMAIL, CAREERS_ROLE, CAREERS_URL,
  CAREERS_WA_PREFILL, MAPS_APPLE, MAPS_GOOGLE, MEDIA, SITE_URL, SPA,
  waLink,
} from "@/lib/spa";

const TITLE = "Careers | Corner Spa, Windhoek";
const DESCRIPTION =
  "We are hiring a Multi-Talent Spa Specialist at Corner Spa in Windhoek West. Apply in under two minutes on WhatsApp or by email. Preferred: a cosmetology qualification.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CAREERS_URL },
  openGraph: {
    title: "We are hiring | Corner Spa, Windhoek",
    description: DESCRIPTION,
    url: CAREERS_URL,
    siteName: "Corner Spa",
    locale: "en_NA",
    type: "website",
    images: [
      {
        url: MEDIA.careersPoster,
        width: 1080,
        height: 1350,
        alt: "Corner Spa is hiring a Multi-Talent Spa Specialist in Windhoek West",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We are hiring | Corner Spa, Windhoek",
    description: DESCRIPTION,
    images: [MEDIA.careersPoster],
  },
};

const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: CAREERS_ROLE,
  description:
    "Deliver treatments from the Corner Spa menu - massage, hot stone massage, foot spa, nails, waxing and lashes - welcome and consult clients, keep the area, tools and linen hygienic, help with bookings and WhatsApp enquiries, and support the team in keeping a calm atmosphere. Preferred: a cosmetology qualification.",
  industry: "Spa and wellness",
  occupationalCategory: "Spa specialist",
  datePosted: "2026-11-09",
  directApply: false,
  hiringOrganization: {
    "@type": "Organization",
    name: "Corner Spa",
    sameAs: [SITE_URL, "https://oryxinstitute.org", "https://mendozer.com"],
  },
  jobLocation: {
    "@type": "Place",
    name: "Corner Spa",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.area,
      addressCountry: "NA",
    },
  },
  applicationContact: {
    "@type": "ContactPoint",
    contactType: "applications",
    email: CAREERS_EMAIL,
  },
  url: CAREERS_URL,
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <SiteHeader />

      <main id="top">
        {/* 1 - Hero: towel photo, washed to cream; two routes in. */}
        <section className="c-hero" aria-label="Careers at Corner Spa">
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
            <p className="c-label">Careers</p>
            <h1 className="serif">We are hiring.</h1>
            <p className="c-role-line">
              <span className="c-role-name">Multi-talent spa specialist</span>
            </p>
            <p className="lead">
              Join the team at Corner Spa in Windhoek West and help people
              leave feeling restored.
            </p>
            <div className="lead-cta">
              <a className="btn" href="#apply" data-track="careers_apply_scroll">
                Apply now
              </a>
              <a
                className="btn"
                href={`mailto:${CAREERS_EMAIL}?subject=Spa%20Specialist%20Application`}
                data-track="careers_email_click"
              >
                Email your CV
              </a>
            </div>
          </div>
        </section>

        {/* 2 - The role card. Unknowns stay [CONFIRM]: nothing invented. */}
        <section data-sc-act="flow" aria-label="The role" className="c-section">
          <div className="w">
            <p className="eyebrow">The role</p>
            <div className="c-card" data-sc-in>
              <h2 className="serif" style={{ fontSize: "clamp(24px, 3.4vw, 34px)" }}>
                {CAREERS_ROLE}
              </h2>
              <dl className="c-facts">
                <dt>Location</dt>
                <dd>Windhoek West</dd>
                <dt>Type</dt>
                <dd>[CONFIRM]</dd>
                <dt>Reports to</dt>
                <dd>[CONFIRM]</dd>
                <dt>Closing date</dt>
                {/* Owner has not set a closing date: the safe wording stays
                    until they confirm one. No deadline is invented. */}
                <dd>Open until filled</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 3 - About the role. */}
        <section data-sc-act="flow" aria-label="About the role">
          <div className="w">
            <p className="eyebrow">About the role</p>
            <div className="c-card" data-sc-in style={{ maxWidth: "760px" }}>
              <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "16px", lineHeight: 1.85 }}>
                You care for clients across our treatments with skill and
                consistency, from the first hello to the last goodbye. Some
                days that is a hot stone massage, some days a plain gel
                manicure, and the care is the same either way. You keep the
                room calm, the pace unhurried, and the small details right.
              </p>
            </div>
          </div>
        </section>

        {/* 4 - What you will do / What we are looking for. */}
        <section data-sc-act="flow" aria-label="Duties and requirements" className="c-section">
          <div className="w">
            <div className="c-two">
              <div className="c-card" data-sc-in>
                <h2 className="serif" style={{ fontSize: "24px" }}>What you will do</h2>
                <ul className="c-list">
                  <li>Deliver treatments from our menu</li>
                  <li>Welcome and consult clients</li>
                  <li>Keep the area, tools and linen hygienic</li>
                  <li>Help with bookings and WhatsApp enquiries</li>
                  <li>Support the team and keep a calm atmosphere</li>
                </ul>
              </div>
              <div className="c-card" data-sc-in>
                <h2 className="serif" style={{ fontSize: "24px" }}>What we are looking for</h2>
                <ul className="c-list">
                  <li>Preferred: cosmetology qualification</li>
                  <li>Experience in spa, skin and nail care</li>
                  <li>Multi-skilled across treatments</li>
                  <li>Professional, reliable, good with people</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5 - How to apply: three routes, all shown before the form. */}
        <section data-sc-act="flow" aria-label="How to apply" className="c-section">
          <div className="w">
            <p className="eyebrow">How to apply</p>
            <div className="c-routes">
              <div className="c-card c-route" data-sc-in>
                <h3 className="serif">The form, below</h3>
                <p>
                  Fill it in and it opens WhatsApp or your email app with the
                  message written. Under two minutes on a phone.
                </p>
              </div>
              <div className="c-card c-route" data-sc-in>
                <h3 className="serif">Email</h3>
                <p>
                  Send your CV to{" "}
                  <a href={`mailto:${CAREERS_EMAIL}?subject=Spa%20Specialist%20Application`}>
                    {CAREERS_EMAIL}
                  </a>
                  .
                </p>
              </div>
              <div className="c-card c-route" data-sc-in>
                <h3 className="serif">WhatsApp</h3>
                <p>
                  Message us{" "}
                  <a href={waLink(CAREERS_WA_PREFILL)} target="_blank" rel="noopener">
                    here
                  </a>{" "}
                  and say you are asking about the Spa Specialist role.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 - The form. */}
        <section data-sc-act="flow" aria-label="Apply" className="c-section" style={{ paddingBottom: "32px" }}>
          <div className="w">
            <p className="eyebrow">Apply now</p>
            <ApplyForm />
          </div>
        </section>

        {/* 7 - Visit us. */}
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
                  <a className="btn" href={MAPS_GOOGLE} target="_blank" rel="noopener" data-track="careers_maps_google">
                    Open in Google Maps
                  </a>
                  <a className="btn" href={MAPS_APPLE} target="_blank" rel="noopener" data-track="careers_maps_apple">
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
                  href={waLink(CAREERS_WA_PREFILL)}
                  target="_blank"
                  rel="noopener"
                  data-track="careers_wa_chat"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8 - Partner band, then the shared footer. */}
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
