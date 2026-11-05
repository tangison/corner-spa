import type { Metadata } from "next";
import { SiteHeader } from "@/components/corner/header";
import { SiteFooter } from "@/components/corner/footer";
import { FloatingWidgets } from "@/components/corner/widgets";
import { SITE_URL, SPA, WA_PREFILL, waLink } from "@/lib/spa";

export const metadata: Metadata = {
  title: "Booking terms | Corner Spa",
  description:
    "Simple booking terms for Corner Spa Windhoek: appointments are made on WhatsApp or by phone, prices are in Namibian dollars as listed.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-label="Booking terms">
          <div className="w prose">
            <p className="eyebrow">Terms</p>
            <h1 className="serif">Booking terms</h1>
            <p>
              Plain terms, so you know exactly how bookings work. No small
              print.
            </p>

            <h2>Making an appointment</h2>
            <p>
              Appointments are made on WhatsApp or by phone at {SPA.phone}.
              Your booking is confirmed when we answer you. The booking form on
              this site simply writes the WhatsApp message for you.
            </p>

            <h2>Prices</h2>
            <ul>
              <li>All prices are in Namibian dollars (N$) exactly as listed on the price list.</li>
              <li>Facial prices are not published yet: ask us for prices.</li>
              <li>Prices are per person and per session as described on the list.</li>
            </ul>

            <h2>Changing or cancelling</h2>
            <p>
              Plans change, we understand. Send us a WhatsApp with the same
              number you booked from and we will move or cancel your
              appointment. There is no fee for changing a booking in good time.
            </p>

            <h2>What our treatments are</h2>
            <p>
              Our treatments are for rest and relaxation. They are not medical
              treatment, and they do not replace advice from your doctor. If
              you have a health condition, are pregnant, or have sensitive
              skin, tell us when you book so we prepare the room properly.
            </p>

            <h2>Contact</h2>
            <p>
              WhatsApp{" "}
              <a href={waLink(WA_PREFILL.general)} target="_blank" rel="noopener">
                {SPA.phone}
              </a>{" "}
              or call the same number during opening hours. Corner Spa is the
              first project of Oryx Institute, a concept by Mendozer
              Investments.
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
