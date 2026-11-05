import { SITE_ADDRESSES } from "@/lib/spa";

// Shared footer on every page: facts, both addresses, quiet partner and
// studio links, and the routes that make the site one connected whole.
export function SiteFooter() {
  return (
    <footer className="site">
      <div className="w">
        <nav className="foot-nav" aria-label="Footer">
          <a href="/">Home</a>
          <a href="/book">Book a treatment</a>
          <a href="/#treatments">Price list</a>
          <a href="/privacy-policy">Privacy policy</a>
          <a href="/terms">Booking terms</a>
          <a href="/brand">Brand</a>
        </nav>
        Corner Spa
        <br />
        First project of Oryx Institute. A concept by Mendozer Investments.
        <br />
        {SITE_ADDRESSES.map((a, i) => (
          <span key={a.label}>
            <a href={a.href} target="_blank" rel="noopener">
              {a.label}
            </a>
            {i < SITE_ADDRESSES.length - 1 ? " · " : null}
          </span>
        ))}
        <br />
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
