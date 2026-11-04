// content3.js — Chapters 12–15: design direction, checklist, roadmap, copy bank appendix
const { h1, h2, h3, para, r, lead, bullet, buildTable, tableTitle, tableNote } = require("./lib");

function chapters12to15() {
  const c = [];

  // ───────────────────────────── 12. DESIGN DIRECTION ─────────────────────────────
  c.push(h1("12. Design Direction and Photography Brief"));
  c.push(h2("12.1 Luxury minimal, in one page of rules"));
  c.push(para([
    r("The recommended direction is luxury minimal: the calm of the treatment room translated to the screen. "),
    r("The page runs on warm cream backgrounds, deep charcoal text and a single warm-gold accent reserved for the primary CTA and thin rules, with generous whitespace doing most of the designing. "),
    r("Two typefaces only: a display serif for headlines (Cormorant Garamond is a strong free option) and a clean sans-serif such as Inter for everything else, with body text never below 16 pixels on mobile. "),
    r("The palette below is the working set for both the site and the printed collateral, and the two figures in this document already follow it."),
  ]));
  c.push(tableTitle("Table 5: Working colour palette"));
  c.push(buildTable(
    ["Colour", "Hex", "Used for"],
    [
      ["Warm cream", "#F7F3EC", "Page background, cards"],
      ["Deep charcoal", "#2B241C", "Headlines, body text, dark bands"],
      ["Warm gold", "#B08050", "Primary CTA, thin accent rules, number chips"],
      ["Soft sand", "#E5DCC9", "Borders, dividers, skeleton lines"],
      ["WhatsApp green", "#4FAD52", "WhatsApp button and icon only"],
    ],
    [24, 18, 58],
    { zebra: true }
  ));
  c.push(tableNote("Gold is the only solid button colour on the page; green appears exclusively where the action is WhatsApp."));
  c.push(h2("12.2 Mobile-first, fast and accessible"));
  c.push(para([
    r("The site is designed at a 390-pixel phone width first and widened afterwards, because more than 60 percent of spa traffic is mobile and the sticky booking bar and floating WhatsApp button are mobile-native patterns. "),
    r("The speed budget is a page that is usable in under 3 seconds on mobile data: images in WebP or compressed JPEG under roughly 200 kilobytes, the hero image under 120 kilobytes, and no auto-playing video at launch. "),
    r("Accessibility is part of the aesthetic: contrast ratios meeting WCAG AA, descriptive alt text on every image, visible focus states for keyboard users, and font sizes that never require pinch-zoom. "),
    r("These are also exactly the checks Google's page-experience signals reward in local search."),
  ]));
  c.push(h2("12.3 The twelve-shot photo brief"));
  c.push(para([
    r("One half-day session with a local photographer covers the entire site, provided the shot list is agreed in advance:"),
  ]));
  c.push(bullet("1. Hero: the best treatment room in warm afternoon light, no people, wide."));
  c.push(bullet("2-3. Two additional rooms: nail and facial corners, styled and unoccupied."));
  c.push(bullet("4-6. Three therapist portraits: natural light, uniform, relaxed smile, chest-up."));
  c.push(bullet("7-8. Two treatment-in-progress shots with a consenting guest, hands and environment only."));
  c.push(bullet("9-10. Details: stones, folded towels, oil bottles, tea service on the tray."));
  c.push(bullet("11. The welcome corner with the reception QR card visible."));
  c.push(bullet("12. The entrance or signage from the street, for the Find Us page and Google profile."));
  c.push(para([
    r("Every shot is delivered in high resolution for print and a compressed web set; the same session refreshes the Google Business Profile, which rewards fresh photos with visibility."),
  ]));

  // ───────────────────────────── 13. CONTENT CHECKLIST ─────────────────────────────
  c.push(h1("13. Content Collection Checklist"));
  c.push(para([
    r("Nothing in chapters 6 to 12 can be built without inputs, so the venture should gather the assets below before build week. "),
    r("Each row names what good looks like and the owner best placed to supply it; the status column is filled as items land, and the build starts when every Phase 1 row is complete."),
  ]));
  c.push(tableTitle("Table 6: Pre-build asset checklist"));
  c.push(buildTable(
    ["Asset", "What good looks like", "Owner", "Status"],
    [
      ["Logo pack", "SVG or PNG, light and dark versions, favicon", "Oryx", "Pending"],
      ["Final treatment menu", "Names, durations, prices, categories, in NAD", "Oryx", "Pending"],
      ["Therapist bios (3-plus)", "Written per the chapter 9 anatomy, approved by each therapist", "Oryx", "Pending"],
      ["Therapist photos", "From the 12-shot session, consent on file", "Oryx + photographer", "Pending"],
      ["Space photography", "12 shots per the brief, web-compressed set", "Mendozer + photographer", "Pending"],
      ["WhatsApp business number", "Namibian number registered on WhatsApp Business, profile completed", "Oryx", "Pending"],
      ["Trading address and pin", "Exact address, Google Maps pin, parking note", "Mendozer", "Pending"],
      ["Opening hours", "Full week including holidays for year one", "Oryx", "Pending"],
      ["Policies", "Cancellation, etiquette, first-visit guide text", "Oryx", "Pending"],
      ["Booking platform account", "Fresha account, services loaded, widget tested", "Oryx + Mendozer", "Pending"],
      ["Payment rails", "DPO Pay merchant account or bank facility; PayToday business profile; card machine", "Mendozer", "Pending"],
      ["Domain and email", "Domain registered, hello@ mailbox live, TLS on", "Mendozer", "Pending"],
      ["Google Business Profile", "Claimed and verified profile, categories set", "Oryx", "Pending"],
      ["Analytics accounts", "GA4 property with the four events preconfigured", "Build team", "Pending"],
    ],
    [24, 42, 18, 16],
    { zebra: true }
  ));
  c.push(tableNote("Status values: Pending, In progress, or Delivered. Phase 2 build items (team page, vouchers, gallery) may lag Phase 1 without blocking launch."));

  // ───────────────────────────── 14. ROADMAP & KPIs ─────────────────────────────
  c.push(h1("14. Launch Roadmap and KPIs"));
  c.push(h2("14.1 Three phases to a full site"));
  c.push(lead("Phase 1 — Launch the landing page (weeks 1 to 3). ",
    "Build and ship the nineteen-block landing page with the Fresha widget live, the WhatsApp click-to-chat links and floating button, the Google Business Profile verified, GA4 events firing, and the announcement bar carrying the opening offer. This phase needs every Phase 1 row of Table 6 and produces a site that already takes bookings."));
  c.push(lead("Phase 2 — Deepen and prove (weeks 4 to 8). ",
    "Add the Treatments, Team, Gift Vouchers, Gallery and Policies pages; start the review engine with the reception QR cards; publish the first-visit guide; and switch the announcement bar to the first monthly special. By week 8 the site is complete by the chapter 5 inventory and the first 25 reviews should be landing."));
  c.push(lead("Phase 3 — Automate and extend (months 3 to 6). ",
    "Introduce a membership or monthly-ritual pilot, rotate packages seasonally, launch the newsletter with the promised monthly rhythm, and evaluate the WhatsApp Business Platform if volume crosses the thresholds in chapter 8. Content parity in a second language can also mirror the institute's bilingual practice if the venture elects it."));
  c.push(h2("14.2 What success is measured in"));
  c.push(para(
    "Five numbers, reviewed monthly against the register discipline the institute already practises, keep the site honest. Targets below are launch targets for the first six months, not industry claims.",
    { keepNext: true }
  ));
  c.push(tableTitle("Table 7: KPI targets for the first six months"));
  c.push(buildTable(
    ["Metric", "Definition", "Target", "Reviewed"],
    [
      ["Landing page conversion", "Share of visitors starting a booking or WhatsApp thread", "4-8 percent (weekly)", "GA4"],
      ["WhatsApp first response", "Median time to first human reply in opening hours", "Under 15 minutes", "Weekly log"],
      ["Google rating and count", "Public rating, total reviews", "4.7-plus from 25-plus reviews in 90 days", "Monthly"],
      ["Mobile speed", "Largest Contentful Paint on mid-range phone data", "Under 2.5 seconds", "Monthly"],
      ["Repeat bookings", "Share of guests returning within 60 days", "30 percent by month 6", "Fresha reports"],
    ],
    [22, 38, 24, 16],
    { zebra: true }
  ));
  c.push(tableNote("Conversion target follows the 2026 treatment-page benchmarks cited in chapter 3; all other targets are venture settings."));

  // ───────────────────────────── 15. APPENDIX: COPY BANK ─────────────────────────────
  c.push(h1("15. Appendix: Copy Bank and Message Scripts"));
  c.push(para(
    "Draft copy the team can lift and adapt; every line marked for replacement should be tuned to the venture's real voice before launch.",
    { keepNext: true }
  ));
  c.push(h2("15.1 Hero headlines (choose one)"));
  c.push(bullet("Windhoek moves fast. This corner doesn't."));
  c.push(bullet("An hour of calm on your corner — book in under a minute."));
  c.push(bullet("Wellness, trained to a standard. Corner Spa, an Oryx Institute live lab."));
  c.push(h2("15.2 CTA labels"));
  c.push(bullet("Primary: Book Your Treatment · Book now · Reserve my slot"));
  c.push(bullet("Secondary: Message us on WhatsApp · Ask us on WhatsApp"));
  c.push(bullet("Voucher: Buy a gift voucher · Give an hour of calm"));
  c.push(h2("15.3 WhatsApp scripts"));
  c.push(bullet("Greeting (auto): Hello from Corner Spa! We answer within 15 minutes during opening hours (Mon-Sat). Meanwhile, our treatment menu lives here: [link]. How can we help?"));
  c.push(bullet("Quick reply — massage: Our massages run 45, 60 and 75 minutes, from N$350. The fastest way to lock a slot is here: [booking link]. Which day suits you?"));
  c.push(bullet("Quick reply — voucher: Gift vouchers go from N$200 and reach the recipient on WhatsApp or email within minutes. Shall I prepare one, and for which value?"));
  c.push(bullet("Quick reply — hours and directions: We are at [address], easy parking behind the building. Open [hours]. Here is the pin: [link]."));
  c.push(bullet("Deposit request: Your slot is held! To confirm, a deposit of N$[amount] secures it — card via this secure link: [link], or PayToday to [number]. Free rescheduling up to 24 hours before."));
  c.push(bullet("24-hour reminder: See you tomorrow at [time]! Arrive ten minutes early, wear anything comfortable, and leave the rest to us. Reply here if anything changed."));
  c.push(bullet("Review request (24 hours after): Thank you for visiting Corner Spa! If the hour did what it promised, a Google review helps our little lab more than you know: [review link]."));
  c.push(h2("15.4 FAQ stubs to expand on the Policies page"));
  c.push(bullet("What happens at my first visit? Arrive ten minutes early; a short consultation covers pressure, focus areas and allergies before anything begins."));
  c.push(bullet("How does cancellation work? Free rescheduling up to 24 hours before your slot; later than that, deposits cover the therapist's reserved time."));
  c.push(bullet("Do you treat men, and expectant guests? Yes — several treatments are tailored for both; tell us at booking so we prepare the right room and products."));
  c.push(bullet("Which products do you use? We publish our product houses and patch-test on request; mention allergies at consultation and we adjust."));
  c.push(para(
    "This blueprint is a living document: as the register publishes Corner Spa's early results, the benchmarks in chapter 14 should be replaced with the venture's own numbers, and the blocks that measurably convert should earn more of the page.",
    { after: 60 }
  ));

  return c;
}

module.exports = { chapters12to15 };
