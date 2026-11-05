import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { SITE_URL, SPA, WA_PREFILL, waLink } from "@/lib/spa";

export const metadata: Metadata = {
  title: "Privacy policy | Corner Spa",
  description:
    "How Corner Spa handles your information: the booking form writes a WhatsApp message on your device, and nothing is stored on this site.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Privacy policy">
          <div className="w prose">
            <p className="eyebrow">Privacy</p>
            <h1 className="serif">Privacy policy</h1>
            <p>
              Short and honest, because there is not much to say. This site is
              a quiet shopfront for a spa in Windhoek.
            </p>

            <h2>What the booking form does</h2>
            <p>
              The booking form runs entirely on your device. Your name,
              treatment and preferred day are arranged into a message, and that
              message is handed to WhatsApp on your own phone or computer. It
              is not sent to us, not saved in a database, and not stored on
              this site. If you close the page before sending, nothing remains.
            </p>

            <h2>What we never do</h2>
            <ul>
              <li>We do not keep a mailing list, because there is no list.</li>
              <li>We do not run advertising cookies or tracking pixels.</li>
              <li>We do not ask for card details or payment information here.</li>
              <li>We do not share anything, because nothing is collected.</li>
            </ul>

            <h2>WhatsApp and phone calls</h2>
            <p>
              Once your message reaches WhatsApp, or you call us, the
              conversation happens between you and the spa on those platforms
              and networks. Their own privacy terms apply to what they handle.
              We keep your booking conversation only so we can serve you well.
            </p>

            <h2>Questions</h2>
            <p>
              Ask us anything about this page. WhatsApp{" "}
              <a href={waLink(WA_PREFILL.question)} target="_blank" rel="noopener">
                {SPA.phone}
              </a>{" "}
              or call the same number during opening hours.
            </p>
            <p>Last reviewed: November 2026.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
