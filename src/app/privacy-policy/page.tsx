import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { ADDRESS_LINE, SITE_URL, WA_PREFILL, waLink } from "@/lib/spa";

// NOTE FOR THE OWNER: a lawyer must review this page before launch.
// It is written in plain language, not legalese, and it must be checked
// against Namibian data protection law before the spa opens.

export const metadata: Metadata = {
  title: "Privacy policy | Corner Spa, Windhoek",
  description:
    "How Corner Spa handles your information: booking messages on WhatsApp, consultation forms at the spa, and nothing stored on this site.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  openGraph: {
    title: "Privacy policy | Corner Spa, Windhoek",
    description:
      "Booking messages stay on WhatsApp, consultation forms stay with the spa. Plain-language privacy at Corner Spa.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [
      {
        url: "/media/hero-wide.jpg",
        width: 1510,
        height: 1041,
        alt: "Smooth wet stones and soft light at Corner Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy policy | Corner Spa, Windhoek",
    images: ["/media/hero-wide.jpg"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Privacy policy">
          <div className="w prose">
            <p className="eyebrow">Privacy</p>
            {/* A lawyer must review this page before launch. */}
            <h1 className="serif">Privacy policy</h1>
            <p>
              Short and honest, because there is not much to say. This site is
              a quiet shopfront for a spa in Windhoek. The responsible party
              for the spa is Mendozer Investments cc, Windhoek, Namibia.
            </p>

            <h2>What the booking form does</h2>
            <p>
              The booking form runs entirely on your device. Your name,
              treatment and preferred day are arranged into a message, and that
              message is handed to WhatsApp on your own phone or computer. It
              is not sent to us, not saved in a database, and not stored on
              this site. If you close the page before sending, nothing remains.
            </p>

            <h2>What we collect, and why</h2>
            <p>
              When you message us on WhatsApp, we see whatever you send: your
              name, your phone number, and the details of the booking. When you
              visit, we may ask you to fill in a short consultation and intake
              form. That can include health information, such as allergies,
              skin sensitivities, medication or pregnancy. We collect this for
              one reason only: to book your appointment and to give you a safe
              treatment.
            </p>

            <h2>How long we keep it, and who sees it</h2>
            <p>
              Booking conversations and consultation forms are kept for as long
              as we need them to serve you well, and then disposed of. Only
              Corner Spa staff see them. We do not sell your information, and
              we do not share it with anyone outside the spa.
            </p>

            <h2>What we never do</h2>
            <ul>
              <li>We do not keep a mailing list, because there is no list.</li>
              <li>We do not run advertising cookies or tracking pixels.</li>
              <li>We do not ask for card details or payment information here.</li>
              <li>We do not share anything with third parties for marketing.</li>
            </ul>

            <h2>Your choices</h2>
            <p>
              You can ask us at any time to show you what we have about you, to
              correct it, or to delete it. Say the word and we do it, subject
              to the records a business must keep by law.
            </p>

            <h2>WhatsApp and phone calls</h2>
            <p>
              Once your message reaches WhatsApp, the conversation happens
              between you and the spa on that platform. WhatsApp's own privacy
              terms apply to what they handle.
            </p>

            <h2>Hours and getting in touch</h2>
            <p>
              We answer during opening hours: Monday to Friday 09:00 to 18:00,
              Saturday 09:00 to 16:00, closed on Sunday. The spa is at{" "}
              {ADDRESS_LINE}.
            </p>

            <h2>Questions about your privacy</h2>
            <p>
              Send us a message on{" "}
              <a href={waLink(WA_PREFILL.question)} target="_blank" rel="noopener">
                WhatsApp
              </a>
              , or write to{" "}
              <a href="mailto:info@mendozer.com">info@mendozer.com</a> for
              legal and privacy requests.
            </p>
            <p>Last updated: November 2026.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
