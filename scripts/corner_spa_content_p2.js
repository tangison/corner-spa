// Corner Spa Landing Page Blueprint - content module (part 2: sections 7-13)

const P2 = [];

// ============ 7. BOOKING ENGINE & PAYMENTS ============
P2.push({ t: "h1", text: "7. Booking Engine and Payments" });
P2.push({ t: "h2", text: "7.1 Requirements" });
P2.push({ t: "p", text: "The booking engine is the machinery behind every Book button, so it must satisfy Corner Spa's specific needs before price comparisons matter: online booking with 24/7 self-service; pricing displayed in Namibian dollars; calendar and staff scheduling that can model a mixed team of seniors and supervised trainees; automated WhatsApp or SMS confirmations and reminders; deposit-taking to protect against no-shows; and gift-voucher issuance. The researched market offers four credible platforms at accessible cost, compared below." });
P2.push({ t: "table", caption: "Table 5: Booking platform comparison (published pricing, 2025/2026 - verify at signup)", widths: [16, 30, 30, 24], headers: ["Platform", "Pricing (published)", "Strengths", "Watch-outs for Corner Spa"], rows: [
  ["Fresha", "From 19.95 USD per month (StyleSeat, Oct 2026); large consumer marketplace", "Marketplace discovery; modern UX; subscription plus payment-processing model", "Processing fees per booking; confirm Namibian dollar settlement and payout timelines"],
  ["Booksy", "Published pricing varies by region; confirm current tiers at signup", "Strong salon heritage; marketing tools", "Confirm spa-specific features and Namibia availability"],
  ["Mangomint", "120 USD per month plus 10 USD per user (Mangomint, Aug 2026)", "Premium feature depth; highly rated support", "Highest entry cost; overkill at launch scale"],
  ["Vagaro", "From 30 USD per month (StyleSeat, Oct 2026)", "Marketplace plus full feature set at mid price", "Feature tiers add up; confirm regional payment support"],
]});
P2.push({ t: "fig", path: "assets/fig2_booking_pricing.png", caption: "Figure 2: Published entry-level monthly pricing for the three priced platforms (sources: StyleSeat 2026; Mangomint 2026)" });
P2.push({ t: "p", text: "Recommendation: pilot Fresha for launch economics and marketplace reach, running a structured two-week trial that tests the full guest journey (book, deposit, reminder, review) with Namibian payment methods, and keep Mangomint as the upgrade path once treatment volume justifies premium tooling. The final decision rule is operational, not aesthetic: whichever platform lets a guest book in under 60 seconds on a phone and reliably reminds them, at a cost the spa can carry, wins." });
P2.push({ t: "h2", text: "7.2 Payments, Deposits and Cancellation Policy" });
P2.push({ t: "p", text: "Accept the payment mix Windhoek actually uses: Visa and Mastercard cards (online and in-spa machine), electronic bank transfer (EFT), and the popular local mobile wallets such as PayToday and Bluewallet, with current provider coverage to be confirmed during setup; cash remains welcome in the spa. Require a deposit or card guarantee on bookings above a chosen threshold and on peak-hour slots; the researched spa operations consistently show deposits are the single most effective no-show protection. Publish one cancellation policy everywhere (for example: free rescheduling up to 24 hours before; deposits move once, then lapse) and repeat it in the booking flow, the FAQ and the WhatsApp confirmation message, so the rule is never a surprise. Gift vouchers are sold and redeemed through the booking platform where supported, with WhatsApp fallback for custom amounts." });

// ============ 8. COMPETITOR TEARDOWN ============
P2.push({ t: "h1", text: "8. Competitor Teardown: Global Benchmarks and Local Wins" });
P2.push({ t: "h2", text: "8.1 Global Patterns Worth Copying" });
P2.push({ t: "table", caption: "Table 6: Global spa website patterns and their application to Corner Spa", widths: [24, 40, 36], headers: ["Site", "What it does well (from research)", "What Corner Spa adopts"], rows: [
  ["Aman Spas", "Meditative privacy and aesthetic minimalism; luxury conveyed through restraint", "Generous whitespace, one message per screen, no clutter"],
  ["Six Senses", "Positioned around measurable wellness outcomes", "Benefit-led treatment descriptions that name the outcome"],
  ["Four Seasons Spa", "Immersive hero imagery; location-specific pages", "Full-bleed hero of the real Windhoek space; suburb named for local SEO"],
  ["Exhale Spa", "Services organised by benefit (restore, recharge, renew)", "Benefit-first category framing in the menu"],
  ["Red Door Spa", "First-visit guide that reduces booking anxiety", "The 4.13 first-visit walkthrough"],
  ["Woodhouse Day Spa", "Virtual tour, etiquette guide, duration-plus-price menu", "Transparent menu format; etiquette covered in FAQ and guide"],
  ["Shibui Spa", "Scarcity and exclusivity raise perceived value", "Honest slot availability from the booking engine (real scarcity only)"],
  ["Massage Envy", "Membership value explained with total clarity", "Membership terms in a plain comparison table (4.11)"],
  ["Bliss Spa", "Brand personality makes luxury accessible", "Warm, sensory copy voice with local personality"],
]});
P2.push({ t: "h2", text: "8.2 Local Gaps Corner Spa Exploits" });
P2.push({ t: "p", text: "The Windhoek scan in Chapter 2 exposes five exploitable gaps. One: fully transparent online pricing is inconsistent across local competitors, so published NAD prices become an immediate differentiator. Two: no local spa visibly promises a WhatsApp response time, so a stated and kept promise claims the channel. Three: named-therapist transparency is rare; competitors show services, not people, so the staff section (4.8) will be the most distinctive section on the page. Four: nobody tells a story guests can retell; the training-lab narrative (a venture of the Oryx Institute, every treatment develops Namibian spa professionals under qualified supervision) gives Corner Spa a mission competitors cannot copy. Five: local SEO depth is shallow; a complete Google Business Profile with 200-plus reviews correlates with top-three local placement (Localo analysis cited by Shopify), which is an achievable two-year target in this market. The positioning conclusion is blunt: Corner Spa does not need to out-spend incumbents, it needs to out-clarity them." });

// ============ 9. SEO, SCHEMA & LOCAL VISIBILITY ============
P2.push({ t: "h1", text: "9. SEO, Schema and Local Visibility" });
P2.push({ t: "h2", text: "9.1 Technical and On-Page SEO" });
P2.push({ t: "p", text: "The page targets spa in Windhoek and its treatment-intent variants (massage Windhoek, couples spa Windhoek, facial Windhoek). Implementation: a title tag and H1 that carry the city keyword naturally; a meta description promising the differentiators; one H1 and a strict heading hierarchy; descriptive alt text on every image; and a URL structure that stays on one landing page with anchors for sections. Structured data (JSON-LD) marks the business as a DaySpa (under LocalBusiness greater HealthAndBeautyBusiness) with name, address, geo, telephone, opening hours, price range and sameAs social links, plus FAQPage schema on the FAQ block so questions can surface in search. Site performance is part of SEO: Core Web Vitals targets of LCP under 2.5 seconds, CLS under 0.1 and INP under 200 milliseconds, protected by compressed images and lazy-loaded galleries. The address, name and phone on the page must exactly match the Google Business Profile; NAP consistency is the hygiene factor of local search." });
P2.push({ t: "h2", text: "9.2 Google Business Profile Checklist" });
P2.push({ t: "table", caption: "Table 7: Google Business Profile setup checklist", widths: [26, 74], headers: ["Item", "Standard"], rows: [
  ["Primary category", "Day Spa; secondary categories: Massage Therapist, Facial Spa, Wellness Centre"],
  ["Description", "About 70 words naming treatments, suburb and booking channels (top profiles average 70-word descriptions)"],
  ["Photos", "Real photos of rooms, exterior, team and treatments; keep adding weekly (top profiles average 250 images)"],
  ["Reviews", "Velocity engine below; respond to 100% of reviews (88% of consumers reward responsiveness)"],
  ["Messaging", "Chat enabled and pointed at the WhatsApp line with the response-time promise"],
  ["Products / services", "Each signature treatment listed with price tier"],
  ["Posts", "One post per week at launch: offers, new therapists, voucher seasons"],
  ["Q&A", "Seed the top six questions from the FAQ; monitor weekly"],
  ["Booking link", "Direct link to the booking engine (or Corner Spa booking page)"],
]});
P2.push({ t: "h2", text: "9.3 The Review Engine" });
P2.push({ t: "p", text: "Reviews are the compounding asset of local visibility, so they get a system, not a hope. The mechanism: after each treatment, the WhatsApp thank-you flow sends a one-tap deep link to the Google review form while the experience is still warm; therapists hand guests a small card with a review QR code at checkout; and the spa asks, not begs, once per visit. Targets are set from research rather than fantasy: every 10 new reviews lifts profile conversions by roughly 3% (SOCi), and the 200-review threshold correlates with top-three local placement, which makes 200 reviews in 24 months the strategic goal and roughly eight to ten reviews a month the operating pace. The review response rule from Chapter 4.10 applies to every review without exception, and critical reviews get the same 24-hour courtesy, publicly demonstrating how the spa handles feedback." });
P2.push({ t: "h2", text: "9.4 Directories and Citations" });
P2.push({ t: "p", text: "Beyond Google, register and keep consistent: TripAdvisor (already a discovery surface for Windhoek wellness), Apple Business Connect, Facebook Business, and Namibian directories such as the Yellow Pages Namibia listings. Each citation repeats the identical NAP details; inconsistencies across directories quietly erode local ranking. Instagram deserves operational respect alongside the page: it is where Windhoek discovers lifestyle brands, so the profile links to the landing page and repurposes the gallery and signature-treatment photography." });

// ============ 10. DESIGN SYSTEM, COPY & ACCESSIBILITY ============
P2.push({ t: "h1", text: "10. Design System, Copy and Accessibility" });
P2.push({ t: "h2", text: "10.1 Visual System" });
P2.push({ t: "p", text: "Spa colour psychology research (BethanyWorks) shows the field splits into calm palettes (soft blues and greens), warm-neutral luxury, and distinctive jewel tones. Corner Spa's recommended system: warm off-white and sand neutrals carrying roughly 60% of the surface, a deep forest green or charcoal for structure at 30%, and a restrained gold accent at 10% reserved for the primary CTA and key numbers, so the Book button is always the most high-contrast element on screen. Typography pairs a refined serif for display headlines (Cormorant or Playfair Display class) with a humanist sans-serif for body and interface text (Inter class), body size at least 16px on mobile, line height 1.6. Imagery rules: real spaces, real staff, natural light, diverse skin tones, minimal filtering; stock photography of models with stones on their backs is the instant credibility killer in this category." });
P2.push({ t: "h2", text: "10.2 Copy Voice" });
P2.push({ t: "p", text: "The voice is warm, sensory and specific, written in second person and short sentences. Benefit before process: a warm stone ritual that melts deep tension outperforms we offer hot stone massage therapy. Sensory verbs (melt, release, restore, drift) carry the page; jargon and medical claims are excluded; and every treatment line answers what the guest feels, not what the therapist does. The tone respects the training mission without oversharing: clarity about supervision builds trust, fear about trainees would destroy it, so phrasing stays at treatments delivered under qualified supervision. Numbers are written for scanning: durations, prices and promises stand out." });
P2.push({ t: "h2", text: "10.3 Accessibility and Performance" });
P2.push({ t: "p", text: "The page targets WCAG 2.2 AA as its floor: text contrast of at least 4.5 to 1 (check the gold-on-white pairings), visible keyboard focus states, alt text on all meaningful images, labelled form fields, a tap target of at least 44 by 44 pixels, and honouring the user's reduced-motion preference for any scrolling or parallax effects. Accessibility is also commercial: a calmer, clearer page converts every stressed visitor better. Performance budget: hero image compressed and preloaded, gallery lazy-loaded, no autoplaying heavy video on mobile, and a page weight target under roughly 2 MB on first load, tested on a mid-range phone on a typical Namibian mobile connection rather than on office Wi-Fi." });

// ============ 11. BUILD BLUEPRINT ============
P2.push({ t: "h1", text: "11. Corner Spa Build Blueprint: Section Map and Wiring" });
P2.push({ t: "p", text: "This chapter compresses Chapters 4 to 10 into the implementable specification the build team works from: the section order, the contents of each block, the CTA wiring and the analytics events. Anchor IDs are stable strings (treatments, team, gallery, reviews, packages, vouchers, faq, visit, contact) so navigation, CTAs and tracking never drift." });
P2.push({ t: "table", caption: "Table 8: Section map with CTA wiring and tracking", widths: [16, 30, 30, 24], headers: ["Order / anchor", "Block", "Primary CTA (wiring)", "Tracked events"], rows: [
  ["0 / top", "Announcement bar + header with Book button", "Book Your Treatment (opens booking engine)", "promo_click, nav_book_click"],
  ["1 / hero", "Hero: headline, subline, trust cues, location line", "Book Your Treatment + WhatsApp Us (wa.me general prefill)", "hero_book_click, hero_whatsapp_click"],
  ["2 / trust", "Trust bar: rating, credentials, payment logos", "None (proof only)", "trustbar_view (scroll depth)"],
  ["3 / treatments", "Menu: 6 categories, prices in NAD, duration tiers", "Book This Ritual (deep link per treatment) + Ask on WhatsApp (prefill per treatment)", "treatment_view, book_click[treatment], wa_click[treatment]"],
  ["4 / signatures", "3 signature rituals with photography", "Reserve the [Ritual Name] (deep link)", "signature_book_click"],
  ["5 / team", "4-6 therapist cards with credentials and supervision labels", "Book with [First Name] (filtered deep link) + WhatsApp [First Name] (prefill)", "team_view, book_click[therapist], wa_click[therapist]"],
  ["6 / gallery", "8-12 real photos, lazy-loaded", "None (ends with Book strip)", "gallery_expand"],
  ["7 / reviews", "Aggregate rating, quote cards, Google reviews embed", "Book Now strip", "reviews_view, review_widget_click"],
  ["8 / packages", "Packages, membership table, corporate block", "Claim This Package / Enquire on WhatsApp", "package_click, membership_click"],
  ["9 / vouchers", "Voucher denominations, digital delivery", "Send a Gift (voucher flow) + WhatsApp custom", "voucher_click, wa_click[voucher]"],
  ["10 / faq", "Accordion, 8-12 questions, FAQPage schema", "Ask on WhatsApp (prefill: question topic)", "faq_open"],
  ["11 / visit", "Map, address, hours, tap-to-navigate", "Get Directions (Google Maps deep link)", "directions_click"],
  ["12 / contact", "WhatsApp-first contacts, short form, socials", "Send Enquiry (form) / WhatsApp", "form_submit, wa_click[contact]"],
  ["13 / footer", "Nav, policies, newsletter, credit line, Book", "Book Now", "footer_book_click, newsletter_optin"],
  ["float", "WhatsApp floating button; sticky mobile bar (Call / WhatsApp / Book); cookie notice; exit-intent", "Chat to book (wa.me) / Book Now", "wa_float_click, sticky_book_click, sticky_call_click, exit_intent_view, exit_intent_claim"],
]});
P2.push({ t: "p", text: "Content slots the client must supply before launch (currently placeholders in the build): 【street address, Windhoek】, 【phone number】, 【WhatsApp business number】, 【booking engine link】, 【final treatment names and NAD prices】, 【therapist names, roles and credentials】, 【Google Business Profile short link】, and 【payment methods confirmed with the provider】. Everything else in this blueprint is ready to build." });
P2.push({ t: "p", text: "Mobile flow notes: the sticky bar sits at the bottom where the thumb lives; no section exceeds roughly one and a half screen heights before a CTA appears; the booking engine opens in-page on mobile (modal) to avoid losing the visitor in a new tab; and the WhatsApp button stays clear of the sticky bar to prevent mis-taps. On desktop, the booking engine opens in a new tab so guests can keep the landing page open while choosing treatments." });

// ============ 12. LAUNCH CHECKLIST, KPIs & GROWTH LOOP ============
P2.push({ t: "h1", text: "12. Launch Checklist, KPIs and the 90-Day Growth Loop" });
P2.push({ t: "h2", text: "12.1 Pre-Launch Checklist" });
P2.push({ t: "bullets", items: [
  "Domain and hosting live with HTTPS; page weight and Core Web Vitals tested on a mid-range phone",
  "Booking engine fully configured: treatments, durations, NAD prices, staff rota including supervised trainees, deposit rules",
  "End-to-end booking test completed: book, pay deposit, receive confirmation, receive reminders, reschedule, cancel",
  "Every WhatsApp deep link tested on a real device with the correct prefilled text",
  "Google Business Profile verified: categories, 70-word description, 10+ photos, hours, messaging, booking link",
  "Analytics installed: GA4 events per Table 8, Meta pixel if advertising is planned, WhatsApp click tracking",
  "Schema markup validated (DaySpa, FAQPage) in Google's Rich Results test",
  "Policies published and linked: privacy, terms, cancellation",
  "Photography shot and selected: hero, 8-12 gallery images, 4-6 therapist portraits, signature treatments",
  "Soft opening completed with 10+ first Google reviews collected through the WhatsApp flow",
]});
P2.push({ t: "h2", text: "12.2 KPIs and Cadence" });
P2.push({ t: "table", caption: "Table 9: Launch KPI set (targets are internal hypotheses to be calibrated after month 1)", widths: [30, 40, 30], headers: ["KPI", "Definition", "Review cadence"], rows: [
  ["Booking conversion rate", "Completed bookings divided by landing page sessions", "Weekly"],
  ["Channel mix", "Share of bookings from booking engine, WhatsApp, phone, walk-in", "Weekly"],
  ["WhatsApp response time", "Median minutes from guest message to staff reply during opening hours", "Daily at launch"],
  ["Review velocity", "New Google reviews per month; average rating", "Monthly"],
  ["No-show and cancellation rate", "Share of bookings not honoured; deposits applied", "Monthly"],
  ["Repeat rate", "Share of guests with a second visit within 60 days (rebooking nudge effect)", "Monthly"],
  ["Voucher sales", "Vouchers sold per month, digital versus physical", "Monthly"],
  ["Direction requests", "GBP direction requests and map clicks (discovery health)", "Monthly"],
]});
P2.push({ t: "h2", text: "12.3 The 90-Day Growth Loop" });
P2.push({ t: "p", text: "The landing page is the engine room of a loop: local search and maps bring high-intent visitors (Chapter 3 shows 76% of local mobile searchers visit within a day); the page converts them with transparent prices, real staff and one-tap booking; the WhatsApp flows deliver reminders, thank-yous and review links; reviews raise the profile's ranking and conversion, which raises traffic; and the rebooking nudge plus membership offers turn first visits into habits. Each 30-day cycle reviews the KPI table, runs one CTA test from Chapter 5, refreshes gallery and post content, and adds newly qualified therapists to the team section. By day 90 the spa should know its true conversion baseline, its dominant booking channel, and its review pace, and every subsequent decision, from advertising to opening hours, is made on that evidence rather than opinion." });

// ============ 13. SOURCES & ASSUMPTIONS ============
P2.push({ t: "h1", text: "13. Sources and Assumptions" });
P2.push({ t: "h2", text: "13.1 Sources Consulted" });
P2.push({ t: "bullets", items: [
  "mendozer.com - company profile, sectors, WhatsApp contact precedent (accessed November 2026)",
  "oryxinstitute.org - Oryx Institute model; Corner Spa announcement as first live lab, 18 October 2026 (accessed November 2026)",
  "Global Wellness Institute - Spa Industry page and 2024 Global Wellness Economy Monitor (spa count, revenue, growth; wellness economy size and projection)",
  "BrightLocal - Local Consumer Review Survey 2024/2025 and 35+ Local SEO Statistics (review behaviour, response effect, Google review usage)",
  "Shopify - Local SEO Statistics 2026 (97% research online; Localo profile data; SOCi traffic and review-lift figures; Google 76% visit-within-a-day)",
  "Shno - Local SEO Statistics 2026 compiling BirdEye 2025 Google Business Profile study (interaction mix: 48% website, 34% directions, 17% calls)",
  "BethanyWorks - Best Spa Website Designs 2025 (Stanford credibility figure, mobile traffic share, NNGroup click-cost, spa psychology patterns)",
  "Accelity - Landing page best practices (HubSpot 330,000-CTA personalisation study)",
  "CXL - How to build a high-converting landing page (structure, clarity, single-action rules)",
  "HubSpot - 26 Spa Website Examples (Aman, Six Senses and other spa site patterns)",
  "StyleSeat - Cloud-based salon software pricing (Fresha from 19.95 USD; Vagaro from 30 USD, Oct 2026)",
  "Mangomint - pricing page (120 USD per month plus 10 USD per user, Aug 2026)",
  "lifedayspa.co.za - Life Day Spa Windhoek details and review count",
  "TripAdvisor - Windhoek spas and wellness centres listings; meraki-wellness.netlify.app; hilton.com - Mondjila Wellness Centre",
  "SleekFlow, ChatMitra, WiseMelon, GetGabs - WhatsApp Business for salons and spas (channel behaviour, automation flows)",
]});
P2.push({ t: "h2", text: "13.2 Assumptions Requiring Client Confirmation" });
P2.push({ t: "bullets", items: [
  "Location is Windhoek, Namibia, inferred from both partner organisations; the exact street address is a placeholder until supplied",
  "All prices will be denominated in Namibian dollars (NAD); no Corner Spa price list exists yet",
  "Treatment names used in examples (Kalahari Stone Massage, Oryx Signature Ritual, Windhoek Sunset Couples Escape) are illustrative structures, not final offers",
  "Namibian payment wallet coverage (PayToday, Bluewallet) must be confirmed with the chosen booking and payment providers",
  "Fresha's fee structure and settlement for Namibian merchants must be confirmed in the pilot trial",
  "The response-time promise (15 minutes during opening hours) is a proposed standard for the spa to commit to operationally",
  "Statistics cited are global or US-market research applied as directional evidence for the Namibian market; where local data was unavailable, this is stated rather than assumed",
]});

module.exports = { P2 };
