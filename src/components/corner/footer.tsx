import { ADDRESS_LINE, DIRECTIONS_URL, HOURS_LINE, SOCIAL_LINKS } from "@/lib/spa";
import { OpenNowBadge } from "@/components/corner/open-now";

// Shared footer on every page: facts, hours, the street address with
// directions, both web addresses, quiet partner links, and the routes that
// make the site one connected whole. Social links appear here only once
// real URLs exist in SOCIAL_LINKS (src/lib/spa.ts).
export function SiteFooter() {
  const socials = Object.entries(SOCIAL_LINKS).filter(([, href]) => !!href);
  return (
    <footer className="site">
      <div className="w">
        <nav className="foot-nav" aria-label="Footer">
          <a href="/">Home</a>
          <a href="/book">Book a treatment</a>
          <a href="/contact">Contact</a>
          <a href="/#treatments">Price list</a>
          <a href="/price-list.pdf">Price list (PDF)</a>
          <a href="/privacy-policy">Privacy policy</a>
          <a href="/terms">Booking terms</a>
          <a href="/brand">Brand</a>
        </nav>
        Corner Spa
        <br />
        {ADDRESS_LINE}
        <br />
        <a href={DIRECTIONS_URL} target="_blank" rel="noopener">
          Get directions
        </a>
        <span className="foot-copy">
          <br />
          {HOURS_LINE}
        </span>
        <br />
        <span className="foot-badge">
          <OpenNowBadge />
        </span>
        <br />
        First project of Oryx Institute. A concept by Mendozer Investments.
        <br />
        {socials.length > 0 && (
          <>
            {socials.map(([name, href]) => (
              <span key={name}>
                <a href={href} target="_blank" rel="noopener">
                  {name === "instagram" ? "Instagram" : "Facebook"}
                </a>{" "}
                ·{" "}
              </span>
            ))}
            <br />
          </>
        )}
        <a href="https://studio.tangison.com" target="_blank" rel="noopener">
          Made by Tangison Studio
        </a>
        <span className="foot-copy">
          <br />© {new Date().getFullYear()} Corner Spa, Windhoek.
        </span>
      </div>
    </footer>
  );
}
