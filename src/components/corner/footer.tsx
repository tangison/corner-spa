import {
  ADDRESS_LINE,
  DIRECTIONS_URL,
  HOURS_LINE,
  MEDIA,
  PARTNERS,
  SITE_ADDRESSES,
  SOCIAL_LINKS,
  waLink,
} from "@/lib/spa";
import { OpenNowBadge } from "@/components/corner/open-now";
import { CopyEmail } from "@/components/corner/copy-email";

// Shared footer on every page, laid out like the Collins footer: one quiet
// primary row, a "say hello" block with a click-to-copy mailbox, a visit
// block with the facts, a secondary row for the paperwork pages, and a
// closing brand band with the partner lockups and the legal line.
// WhatsApp-only for bookings (the phone number never renders as text, per
// the owner's instruction); info@mendozer.com is the general mailbox.
const PRIMARY = [
  { label: "Treatments", href: "/#treatments" },
  { label: "Book a treatment", href: "/book" },
  { label: "Gift vouchers", href: "/vouchers" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const SECONDARY = [
  { label: "About", href: "/about" },
  { label: "Price list (PDF)", href: "/price-list.pdf" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Booking terms", href: "/terms" },
  { label: "Brand", href: "/brand" },
];

export function SiteFooter() {
  const socials = Object.entries(SOCIAL_LINKS).filter(([, href]) => !!href);
  return (
    <footer className="site">
      <div className="w">
        <nav className="foot-primary" aria-label="Footer primary">
          {PRIMARY.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="foot-cols">
          <div className="foot-col">
            <p className="foot-label">Say hello</p>
            <p>
              <a href={waLink("Hi Corner Spa,")} target="_blank" rel="noopener">
                WhatsApp the spa
              </a>{" "}
              · <CopyEmail email="info@mendozer.com" />
            </p>
          </div>
          <div className="foot-col">
            <p className="foot-label">Visit</p>
            <p>{ADDRESS_LINE}</p>
            <p>
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener">
                Get directions
              </a>
            </p>
            <p>{HOURS_LINE}</p>
            <span className="foot-badge">
              <OpenNowBadge />
            </span>
            <p className="foot-addr">
              {SITE_ADDRESSES.map((s, i) => (
                <span key={s.href}>
                  {i > 0 && " · "}
                  <a href={s.href} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>

        <nav className="foot-secondary" aria-label="Footer secondary">
          {SECONDARY.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="foot-brand-band">
          <span className="foot-partners">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener"
                aria-label={p.name}
                data-track="partner_click"
                data-track-detail={JSON.stringify({ partner: p.name, from: "footer" })}
              >
                <img
                  src={p.name === "Oryx Institute" ? MEDIA.oryxLockup : MEDIA.mendozerLockup}
                  alt={`${p.name} logo`}
                  width={p.name === "Oryx Institute" ? 116 : 132}
                  height={p.name === "Oryx Institute" ? 40 : 52}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </span>
          <p className="foot-legal">
            First project of Oryx Institute. A concept by Mendozer Investments.
            {socials.length > 0 && (
              <>
                {" "}
                {socials.map(([name, href], i) => (
                  <span key={name}>
                    {i > 0 && " · "}
                    <a href={href} target="_blank" rel="noopener">
                      {name === "instagram" ? "Instagram" : "Facebook"}
                    </a>
                  </span>
                ))}
              </>
            )}{" "}
            ·{" "}
            <a href="https://studio.tangison.com" target="_blank" rel="noopener">
              Made by Tangison Studio
            </a>
            <span className="foot-copyright">
              {" "}· © {new Date().getFullYear()} Corner Spa, Windhoek.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
