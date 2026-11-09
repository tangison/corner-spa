import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { DarkPage } from "@/components/corner/dark-page";
import {
  ADDRESS, ADDRESS_LINE, DIRECTIONS_URL, HOURS_LINE, ORGANISATIONS,
  SITE_URL, SPA, WA_PREFILL, waLink,
} from "@/lib/spa";

// Not in the sitemap and not for search engines: this page is for the
// people who wonder who stands behind the spa. Everything here is a fact
// already carried elsewhere on the site; nothing is invented.

export const metadata: Metadata = {
  title: "About | Corner Spa, Windhoek",
  description:
    "Corner Spa is a small day spa in Windhoek West: massage, hot stone, foot spa, nails and underarm waxing. The first project of Oryx Institute, a concept by Mendozer Investments.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  const oryx = ORGANISATIONS.oryx;
  const mendozer = ORGANISATIONS.mendozer;
  return (
    <>
      <DarkPage />
      <SiteHeader />
      <main id="top">
        <section aria-label="About Corner Spa">
          <div className="w prose">
            <p className="eyebrow">About</p>
            <h1 className="serif">About Corner Spa</h1>
            <p>
              Corner Spa is a small day spa at {ADDRESS.street},{" "}
              {ADDRESS.area}, {ADDRESS.city}. Massage, hot stone, foot spa,
              nails and underarm waxing, in rooms that stay quiet on purpose.
              Booking happens on{" "}
              <a href={waLink(WA_PREFILL.general)} target="_blank" rel="noopener">
                WhatsApp
              </a>
              , and the price list is the same on the wall and on this site.
            </p>

            <h2>The venture</h2>
            <p>
              Corner Spa is the first project of{" "}
              <a href={oryx.site.href} target="_blank" rel="noopener">
                {oryx.name}
              </a>
              , which runs the day-to-day operations, and a concept by{" "}
              <a href={mendozer.site.href} target="_blank" rel="noopener">
                {mendozer.name}
              </a>
              , the financing partner. Both names appear on the price list,
              because both stand behind the spa.
            </p>
            <p>
              Complaints and feedback are handled by the two organisations, on
              the spa number{" "}
              <a className="foot-tel" href={`tel:${SPA.phone.replace(/\s/g, "")}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                {SPA.phone}
              </a>{" "}
              or on the{" "}
              <a href="/contact#feedback">feedback form</a>.
            </p>

            <h2>Hours and finding us</h2>
            <p>
              {HOURS_LINE} (Windhoek time). The spa is at {ADDRESS_LINE},{" "}
              {ADDRESS.plot}.{" "}
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener">
                Get directions
              </a>
              .
            </p>
            <p className="note">
              More about the treatments: the{" "}
              <a href="/book">booking page</a> and the{" "}
              <a href="/">price list</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
