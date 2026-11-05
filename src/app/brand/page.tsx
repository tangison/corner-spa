import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { MEDIA, SITE_URL } from "@/lib/spa";

export const metadata: Metadata = {
  title: "Brand | Corner Spa",
  description:
    "The Corner Spa brand kit: the three colours, the two fonts, and the rule that the real textured pebble logo is never redrawn or tinted.",
  alternates: { canonical: `${SITE_URL}/brand` },
};

const COLORS = [
  { hex: "#F5F3EE", name: "Warm off-white", use: "Background" },
  { hex: "#2B2726", name: "Charcoal", use: "Text, dark mode ground" },
  { hex: "#A89076", name: "Sand", use: "Accent bar and decoration" },
];

export default function BrandPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Brand">
          <div className="w prose">
            <p className="eyebrow">Brand</p>
            <h1 className="serif">The Corner Spa brand</h1>
            <p>
              A quiet reference for anyone making a status image, a flyer or a
              sign for the spa. Two fonts, three colours, one real logo.
            </p>

            <h2>Colours</h2>
            <div className="swatches">
              {COLORS.map((c) => (
                <div key={c.hex} className="swatch">
                  <div className="swatch-chip" style={{ background: c.hex }} />
                  <p>
                    {c.name}
                    <br />
                    {c.hex}
                    <br />
                    {c.use}
                  </p>
                </div>
              ))}
            </div>
            <p>
              One note on the sand accent: at small text sizes on the warm
              off-white we use a darkened tone of the same sand so the text
              stays readable. Decoration and the top bar carry the exact
              colour.
            </p>

            <h2>Fonts</h2>
            <p>
              Lora for headlines. Montserrat Light for body text. Two families,
              nothing else.
            </p>

            <h2>The logo</h2>
            <p>
              The mark is two pebbles in real rock texture. Use the real image
              files. Never redraw it flat, never tint it, never place an
              overlay on it.
            </p>
            <div className="logo-row">
              <div className="logo-cell">
                <img
                  src={MEDIA.markDark}
                  alt="Corner Spa pebble mark for light backgrounds"
                  width={80}
                  height={73}
                />
              </div>
              <div className="logo-cell dark">
                <img
                  src={MEDIA.markLight}
                  alt="Corner Spa pebble mark for dark backgrounds"
                  width={80}
                  height={73}
                />
              </div>
            </div>
            <p>
              On light backgrounds use the dark mark. On dark backgrounds use
              only the light mark. Files live in the brand pack under
              assets/logos, from favicon size up to print.
            </p>

            <h2>Voice</h2>
            <p>
              Calm, plain Namibian English. N$ prices. +264 phone numbers. No
              hype words, no exclamation marks, nothing the spa has not said
              itself.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
