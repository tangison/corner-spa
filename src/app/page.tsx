import { BookingProvider } from "@/components/spa/booking";
import {
  AnnouncementBar, ExitIntentOffer, FloatingWhatsApp, SiteFooter, SiteHeader, StickyMobileBar,
} from "@/components/spa/chrome";
import {
  About, Contact, Faq, FirstVisit, Gallery, Hero, Packages, Reviews, Signatures, Team,
  Treatments, TrustBar, Visit, Vouchers,
} from "@/components/spa/sections";
import { FAQS, SPA } from "@/lib/spa";

const daySpaJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: SPA.name,
  description: "Day spa in Klein Windhoek, Windhoek offering massage, facials, body treatments, couples rituals and gift vouchers, with online and WhatsApp booking.",
  address: {
    "@type": "PostalAddress",
    streetAddress: SPA.addressLine,
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
  telephone: SPA.phone,
  priceRange: "N$280 - N$1,450",
  openingHours: ["Mo-Fr 09:00-19:00", "Sa 09:00-17:00", "Su 10:00-15:00"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SPA.rating,
    reviewCount: SPA.reviewCount,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <BookingProvider>
      <div className="flex min-h-screen flex-col bg-[#FBF8F2]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(daySpaJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1 pb-16 sm:pb-0">
          <Hero />
          <TrustBar />
          <About />
          <Treatments />
          <Signatures />
          <Team />
          <Gallery />
          <Reviews />
          <Packages />
          <Vouchers />
          <FirstVisit />
          <Faq />
          <Visit />
          <Contact />
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
        <StickyMobileBar />
        <ExitIntentOffer />
      </div>
    </BookingProvider>
  );
}
