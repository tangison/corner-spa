import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { ADDRESS_LINE, DIRECTIONS_URL, HOURS_LINE, SITE_URL, WA_PREFILL, waLink } from "@/lib/spa";

// NOTE FOR THE OWNER: a lawyer must review this page before launch.
// No fees, deposits or penalties are promised anywhere on this page. If the
// spa ever wants a cancellation fee or a deposit, decide that with the
// lawyer and add it here deliberately.

export const metadata: Metadata = {
  title: "Booking terms | Corner Spa, Windhoek",
  description:
    "Simple booking terms for Corner Spa Windhoek: appointments are made on WhatsApp, payment happens at the spa on the day, prices in Namibian dollars as listed.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Booking terms | Corner Spa, Windhoek",
    description:
      "Plain booking terms: arrive 10 minutes early, pay on the day, change or cancel with a WhatsApp message.",
    url: `${SITE_URL}/terms`,
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
    title: "Booking terms | Corner Spa, Windhoek",
    images: ["/media/hero-wide.jpg"],
  },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Booking terms">
          <div className="w prose">
            <p className="eyebrow">Terms</p>
            {/* A lawyer must review this page before launch. The owner must
                decide on any fees, deposits or cancellation windows before
                then; nothing like that is promised here. */}
            <h1 className="serif">Booking terms</h1>
            <p>
              Plain terms, so you know exactly how bookings work. No small
              print.
            </p>

            <h2>Making an appointment</h2>
            <p>
              Appointments are made on{" "}
              <a href={waLink(WA_PREFILL.general)} target="_blank" rel="noopener">
                WhatsApp
              </a>
              . Your booking is confirmed when we answer you. The booking form
              on this site simply writes the WhatsApp message for you. We
              answer during opening hours: {HOURS_LINE} (Windhoek time).
            </p>

            <h2>Before you come</h2>
            <p>
              Please arrive about 10 minutes before your appointment, so your
              treatment can start on time. If you arrive late, we will still
              welcome you, but the time left in the room may be shorter,
              because the next guest may be waiting.
            </p>

            <h2>Changing or cancelling</h2>
            <p>
              Plans change, we understand. Send us a WhatsApp with the same
              number you booked from and we will move or cancel your
              appointment. There is no fee for changing a booking in good time.
            </p>

            <h2>Prices and payment</h2>
            <ul>
              <li>All prices are in Namibian dollars (N$) exactly as listed on the price list.</li>
              <li>Payment happens at the spa, on the day of your visit.</li>
              <li>Facial prices are not published yet: ask us for prices.</li>
              <li>Prices are per person and per session as described on the list.</li>
            </ul>

            <h2>Health and the consultation form</h2>
            <p>
              When you arrive you may be asked to fill in a short consultation
              and intake form: allergies, skin sensitivities, medication,
              pregnancy. Please answer it honestly, because it is how we keep
              the treatment safe for you. Our treatments are for rest and
              relaxation. They are not medical treatment, and they do not
              replace advice from your doctor.
            </p>

            <h2>Where to find us</h2>
            <p>
              The spa is at {ADDRESS_LINE}, on the Flexona Organizational
              Services plot.{" "}
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener">
                Get directions
              </a>
              . Corner Spa is the first project of Oryx Institute, a concept by
              Mendozer Investments.
            </p>

            <h2>Questions</h2>
            <p>
              Message us on{" "}
              <a href={waLink(WA_PREFILL.question)} target="_blank" rel="noopener">
                WhatsApp
              </a>{" "}
              during opening hours and a person answers.
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
