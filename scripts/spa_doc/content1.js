// content1.js — Chapters 1–6: summary, context, research basis, teardown, site map, anatomy
const { h1, h2, blockTitle, para, r, lead, bullet, buildTable, tableTitle, tableNote, figure } = require("./lib");

function chapters1to6() {
  const c = [];

  // ───────────────────────────── 1. EXECUTIVE SUMMARY ─────────────────────────────
  c.push(h1("1. Executive Summary"));
  c.push(para([
    r("Corner Spa is the Oryx Institute's first live lab for wellness and service operations, announced on 1 November 2026 as part of the institute's Ventures programme. "),
    r("Mendozer Investments CC, the multi-sector Namibian group, is working alongside the institute on the project. "),
    r("This blueprint answers the team's brief: research every single piece that belongs on a world-class spa website, from the smallest call-to-action (CTA) to the WhatsApp channel and the staff section, and specify it so the landing page can be built without guesswork."),
  ]));
  c.push(para([
    r("The research is consistent on one point: a spa website has exactly one job, which is to turn a stressed visitor into a booked guest. "),
    r("The best spa sites of 2025 and 2026, among them Exhale, Woodhouse and Red Door, all do four things well. They place a clear booking CTA above the fold and repeat it down the page. They publish benefit-led treatment menus with durations and prices in plain sight. They show real photographs of their actual rooms and staff instead of stock images. And they make contacting them effortless, which in Namibia means WhatsApp. "),
    r("Reported benchmarks for well-optimised treatment pages run at 4 to 8 percent conversion, while generic homepages often sit near 1 percent; the difference is structure, not budget."),
  ]));
  c.push(para([
    r("This document specifies a nineteen-block landing page organised into four jobs: capture attention, build desire and trust, convert to booking, and close and retain. "),
    r("It defines the CTA hierarchy (one primary Book Now button, WhatsApp as the ever-present secondary action), a full WhatsApp integration plan built on free click-to-chat links, team-page standards that turn first-timers into guests, and a technology stack chosen for a single-location Windhoek spa: Fresha for scheduling, DPO Pay and PayToday for payments in Namibian dollars, Google Business Profile for local discovery, and GA4 for measurement. "),
    r("The recommended design direction is luxury-minimal, with cream and warm gold tones and generous whitespace, built mobile-first because more than 60 percent of spa traffic is mobile."),
  ]));
  c.push(para([
    r("The closing chapters turn research into execution: a content collection checklist assigning every asset to an owner, a three-phase launch roadmap with the first phase deliverable in roughly three weeks, key performance targets, and an appendix of ready-to-adapt copy. "),
    r("Where a figure is illustrative rather than sourced, it is marked as such, and every genuinely unknown fact is flagged for the venture team to confirm."),
  ]));

  // ───────────────────────────── 2. PROJECT CONTEXT ─────────────────────────────
  c.push(h1("2. Project Context: Corner Spa, Oryx Institute and Mendozer"));

  c.push(h2("2.1 Corner Spa is a live lab, and that is a marketing asset"));
  c.push(para([
    r("The Oryx Institute describes itself as a new polytechnic for Namibia, working from Windhoek on research, practice, and companies that prove the work. "),
    r("It registered with BIPA on 25 October 2026 and is pursuing accreditation with the NQA and the NTA. "),
    r("Its Ventures programme opens small operating companies to test sectors: when the institute wants to understand a sector, it opens a company inside it, and, in its own words, the customers decide whether it works and the register publishes the result. "),
    r("Corner Spa, announced on 1 November 2026, is that first live lab for wellness and service operations."),
  ]));
  c.push(para([
    r("This matters for the website because it is a story no other spa in Windhoek can tell. "),
    r("Corner Spa is not just a place to buy a massage; it is a working classroom where service standards are trained, measured and published. "),
    r("The landing page should say this plainly in the brand story block and in the trust strip: an Oryx Institute live lab, where therapists are trained to a documented standard and guest feedback feeds teaching. "),
    r("Honesty about the model, framed confidently, converts curiosity into bookings and gives local media a reason to write about the opening."),
  ]));

  c.push(h2("2.2 Who does what on the project"));
  c.push(para([
    r("The Oryx Institute owns the venture: the brand story, the service-operations curriculum that trains the therapists, and the register that publishes results. "),
    r("Mendozer Investments CC, established in 2009 and operating across six sectors including Construction and Infrastructure, Technology and Systems, Cooling and Cold Chain, Logistics and Support Services, Fuel and Energy Distribution, and Tourism and Agriculture, brings the delivery muscle described in its own tagline, one team from the first brief to the delivered work. "),
    r("For a spa, that translates into premises fit-out, cooling and climate control for treatment rooms, field and telecom systems that keep connectivity stable, and logistics support."),
  ]));
  c.push(para([
    r("Two website decisions sit directly with the infrastructure partners. "),
    r("First, reliable connectivity: online booking, WhatsApp and a card terminal all fail silently on a dropped line, so the venture should specify a primary and a backup internet path for the premises from day one. "),
    r("Second, point-of-sale hardware: the booking platform, the card machine and the reception computer must work together before launch, which is a Mendozer Technology and Systems conversation, not an afterthought."),
  ]));

  c.push(h2("2.3 The local competitive set"));
  c.push(para([
    r("Windhoek already has an active wellness market. TripAdvisor's Windhoek listing for massage, spas and wellness centres currently features Nomad Wellness Collective, I AM Hair and Beauty, Chakra Body, Health and Skin Care Clinic, and Meraki Wellness, alongside hotel spas serving visitors. "),
    r("None of them can claim the teaching-spa positioning, which gives Corner Spa a clear lane. "),
    r("The practical lesson from the competitive scan is different: most local discovery happens on Google Maps, Facebook and WhatsApp word-of-mouth rather than on spa websites, so local search hygiene (chapter 11) and fast WhatsApp responses (chapter 8) will decide who wins the next booking. "),
    r("The website's job is to close the guest who has already heard the name."),
  ]));

  // ───────────────────────────── 3. RESEARCH BASIS ─────────────────────────────
  c.push(h1("3. Research Basis and Sources"));
  c.push(para([
    r("This blueprint was assembled in November 2026 from five strands of research, each chosen because it changes a build decision. "),
    r("First, a teardown of fifteen leading spa websites, including Exhale, Four Seasons Spa, Miraval, Red Door, Burke Williams, Shibui, Bliss, The Ritz-Carlton Spa, Massage Envy, Woodhouse Day Spa, Hand and Stone, Kohler Waters, Wi Spa, Aspira and The Spa at Equinox, as analysed in Bethany Works' 2025 review of best spa website designs, supplemented by the 2026 example collections from Colorlib and GlossGenius. "),
    r("Second, landing page conversion research focused on spa-adjacent businesses, principally the 2026 med spa landing page statistics from Webtonic and the optimisation guide from Sky Highway Marketing, which report the 4 to 8 percent benchmark used in this document."),
  ]));
  c.push(para([
    r("Third, WhatsApp integration practice, drawn from Infobip's 2026 guide to adding WhatsApp buttons to websites, covering click-to-chat link formats, widget placement and business-hour etiquette. "),
    r("Fourth, booking and payment infrastructure: the 2026 salon and spa software comparisons published by Boulevard, Booksy and Booking Pro, and, for Namibian rails specifically, DPO Pay by Network and PayToday, both of which actively serve Namibian merchants in Namibian dollars. "),
    r("Fifth, local search guidance from Google's own Business Profile documentation, plus direct reviews of oryxinstitute.org, mendozer.com and the TripAdvisor Windhoek spa listings. "),
    r("The limits are stated plainly: the venture has no operating data yet, so all prices, names and review counts in this document are illustrative placeholders to be replaced with real figures, and platform pricing should be re-verified at contract time."),
  ]));
  c.push(para([r("Sources consulted: bethanyworks.com (best spa website designs, 2025); blog.skyhighwaymarketing.com (med spa landing page optimisation, 2026); webtonic.io (med spa landing page statistics, 2026); colorlib.com and glossgenius.com (spa website example collections, 2026); infobip.com (WhatsApp website integration guide, 2026); joinblvd.com, biz.booksy.com and bookingpro.ai (spa software comparisons, 2026); dpogroup.com and site.paytoday.com.na (Namibian payment providers); support.google.com (Business Profile local ranking guidance); oryxinstitute.org; mendozer.com; tripadvisor.com (Windhoek spa listings).")], { after: 200 }));

  // ───────────────────────────── 4. WHAT THE BEST DO ─────────────────────────────
  c.push(h1("4. What the World's Best Spa Websites Do"));

  c.push(h2("4.1 Seven patterns worth copying"));
  c.push(lead("Pattern 1 — Benefit-led language. ",
    "Strong menus sell outcomes, not procedures: Exhale organises its whole site around restore, recharge and renew, and the teardown found the best menus write melt tension where weak menus write 60-minute Swedish massage. Corner Spa's copy should follow the same rule in every treatment card and menu row."));
  c.push(lead("Pattern 2 — Booking is never more than one tap away. ",
    "The leading sites put a booking CTA in the navigation, above the fold, at the end of every major section, and in a mobile bar that sticks while scrolling. Woodhouse goes further with detailed service menus that always show duration and price next to a booking path."));
  c.push(lead("Pattern 3 — Gift cards live in the main navigation. ",
    "Burke Williams treats gift cards as a first-class nav item, not a footer afterthought. Vouchers are a revenue stream and an acquisition channel, since the recipient is a first-time guest; chapter 6 gives Corner Spa's voucher block a matching weight."));
  c.push(lead("Pattern 4 — First-visit guides reduce booking anxiety. ",
    "Red Door and Wi Spa both publish a first-time visitor guide that walks a nervous newcomer through arrival, consultation and etiquette. A large share of spa hesitancy is not price but uncertainty; answering it on the page converts readers who would otherwise close the tab."));
  c.push(lead("Pattern 5 — Real photography everywhere. ",
    "Every strong site in the teardown uses custom photography of its actual rooms and staff. Generic candle-and-towel stock photos signal a template business; authenticity is the cheapest differentiator a new spa can buy, which is why chapter 12 includes a twelve-shot photo brief."));
  c.push(lead("Pattern 6 — Memberships and packages are visible. ",
    "Massage Envy's membership model with an aggressive booking CTA on every page, and Hand and Stone's first-time offers, show that recurring programmes belong on the landing page, not buried on a subpage. Packages also give undecided guests a simpler choice."));
  c.push(lead("Pattern 7 — Location and proof do the selling. ",
    "Hand and Stone wins on location-specific pages and local SEO, while the strongest trust sections pair a star rating with a review count above the fold. For a single-location spa in Windhoek, the same logic applies with Google Business Profile and named guest reviews."));

  c.push(h2("4.2 The ten mistakes weak spa sites make"));
  c.push(para(
    "The same research base is just as clear about what fails. The table below lists the ten recurring mistakes, which doubles as a review checklist for the Corner Spa build: a launch candidate that avoids all ten is ahead of most of the market.",
    { keepNext: true }
  ));
  c.push(tableTitle("Table 1: Ten common spa website mistakes and their corrections"));
  c.push(buildTable(
    ["Mistake", "What to do instead"],
    [
      ["Booking CTAs too subtle or buried", "One gold Book Now button visible in the header, hero, mid-page and bottom; plus a sticky mobile bar"],
      ["Generic stock photography", "One photo session covering rooms, therapists and details; no bought imagery"],
      ["Treatment menus hard to find", "Menu block on the landing page with prices; full menu one tap deeper"],
      ["Hidden or missing pricing", "Every treatment shows duration and price; packages show the saving"],
      ["Not mobile-first", "Design at 390 px first; more than 60 percent of spa traffic is mobile"],
      ["Weak trust signals", "Google rating and review count above the fold; named reviews mid-page"],
      ["Feature-language instead of benefit-language", "Write the outcome the guest feels, then the technical name"],
      ["Cluttered layouts that contradict the calm promise", "Generous whitespace, one idea per screen, two fonts maximum"],
      ["No direct booking integration", "Buttons open the live booking calendar, not a contact form"],
      ["Unclear positioning", "Say in one line who the spa is for and why it exists"],
    ],
    [42, 58],
    { zebra: true }
  ));
  c.push(tableNote("Compiled from the 2025-2026 spa design teardowns cited in chapter 3."));

  // ───────────────────────────── 5. SITE MAP ─────────────────────────────
  c.push(h1("5. Recommended Site Map and Page Inventory"));
  c.push(para([
    r("The landing page specified in chapter 6 does the heavy lifting, but a complete spa website needs a small set of supporting pages so that every deep question has a home. "),
    r("The inventory below keeps the site lean: seven pages, each with a single purpose, phased so that the launch effort concentrates on the pages that close bookings. "),
    r("Everything on this list can ship inside one website build; the phases only decide the order."),
  ]));
  c.push(tableTitle("Table 2: Page inventory with purpose and priority"));
  c.push(buildTable(
    ["Page", "Purpose", "Must-have elements", "Phase"],
    [
      ["Home (landing page)", "Convert first-time visitors", "The 19 blocks specified in chapter 6", "1"],
      ["Treatments", "Full menu with categories and prices", "Benefit-led descriptions, durations, prices, Book buttons per row", "1"],
      ["Team", "Introduce the therapists", "Profile cards, individual bio pages, Book-with-name links", "2"],
      ["Gift Vouchers", "Sell and deliver vouchers", "Value picker, WhatsApp or email delivery, terms", "2"],
      ["Gallery", "Show the real space", "8-12 real photos with captions", "2"],
      ["Find Us / Contact", "Remove arrival friction", "Map, hours table, parking note, WhatsApp and call buttons", "1"],
      ["Policies & FAQ", "Answer the anxious questions", "Cancellation, etiquette, first-visit guide, privacy", "2"],
    ],
    [22, 26, 38, 14],
    { zebra: true }
  ));
  c.push(tableNote("Phase 1 items ship with the landing page launch; Phase 2 within the following month."));

  // ───────────────────────────── 6. LANDING PAGE ANATOMY ─────────────────────────────
  c.push(h1("6. Landing Page Anatomy: Every Section Top to Bottom"));
  c.push(para([
    r("This chapter is the core of the blueprint. It specifies nineteen blocks in scroll order, grouped into four jobs: blocks 1 to 4 capture attention, blocks 5 to 11 build desire and trust, blocks 12 to 14 convert the decision, and blocks 15 to 19 close the visit and set up the next one. "),
    r("Figure 1 maps the full page. Each block below states its purpose, what it must contain, sample copy where wording matters, and the action it should trigger. "),
    r("Sample figures such as prices and review counts are illustrative placeholders; the venture team replaces them with real values from the checklist in chapter 13."),
  ]));
  c.push(...figure(
    "/home/z/my-project/download/corner-spa-assets/fig1_landing_page_anatomy.png",
    "Figure 1: Conversion anatomy of the Corner Spa landing page — nineteen blocks in four job groups",
    585, 880
  ));

  c.push(blockTitle("Block 1 — Announcement bar"));
  c.push(para([
    r("A single thin strip above the header that carries one live message at a time: an opening offer, seasonal hours or a new ritual. "),
    r("It exists to give returning visitors a reason to look twice, so keep it to one line, rotate it monthly and never stack two messages. "),
    r("Sample copy: Introductory month: 15 percent off your first treatment, booked before 30 November. "),
    r("Link it straight to the booking flow, not to a promotions page."),
  ]));

  c.push(blockTitle("Block 2 — Header and navigation"));
  c.push(para([
    r("Logo left; four links only (Treatments, Team, Gift Vouchers, Find Us); a WhatsApp icon; and one gold Book Now button on the right. "),
    r("Resist adding more links: navigation is where spa sites quietly leak visitors into reading instead of booking. "),
    r("The header shrinks and stays pinned on scroll so the booking button never leaves the screen, and on mobile it collapses into a hamburger with the Book Now button kept visible beside it."),
  ]));

  c.push(blockTitle("Block 3 — Hero with dual CTA"));
  c.push(para([
    r("A full-width photograph of the spa's real best room in warm light, with one headline of ten words or fewer, one supporting line, and two buttons: the primary gold Book Your Treatment, which opens the live booking calendar, and a secondary outline button, Message us on WhatsApp, which opens the prefilled chat from chapter 8. "),
    r("Under the buttons, one trust line: 4.9 out of 5 from 120-plus Google reviews (replace with the live count once real). "),
    r("Sample headline options are in the appendix; the hero must confirm within five seconds what this place is, where it is, and what to tap."),
  ]));

  c.push(blockTitle("Block 4 — Trust strip"));
  c.push(para([
    r("Three quiet stat chips directly under the hero: the Google rating with review count; certified therapists, trained to the Oryx standard; and an Oryx Institute live lab badge. "),
    r("Social proof placed this high shortens the trust decision before the visitor scrolls, which the med spa research identifies as one of the highest-leverage elements on the page. "),
    r("No invented awards and no clip-art certification logos: three true statements are enough."),
  ]));

  c.push(blockTitle("Block 5 — Brand story"));
  c.push(para([
    r("Two columns: a short story on the left, a real photograph on the right. "),
    r("This is where the live-lab positioning earns its keep: Corner Spa exists because the Oryx Institute believes service businesses are learned by running them, so every treatment funds training and every guest shapes the curriculum. "),
    r("Keep it under ninety words, name the neighbourhood, and end with a text link to the team page, Meet the people you will meet."),
  ]));

  c.push(blockTitle("Block 6 — Signature treatments"));
  c.push(para([
    r("Three cards, each with a real photo, a benefit-led name, one line of description, duration, price and a Book link. "),
    r("Illustrative opening trio: Corner Signature Full-Body Massage, 60 minutes, N$450; Radiance Facial, 60 minutes, N$480; Hot Stone Ritual, 75 minutes, N$650. "),
    r("Three is the right number: it reads as curation rather than a catalogue, and each card is one decision the visitor can make without scrolling sideways."),
  ]));

  c.push(blockTitle("Block 7 — Treatment menu with prices"));
  c.push(para([
    r("A compact menu list with dotted leaders between treatment names and prices, organised by category (Massage, Facials, Body, Hands and Feet), each row showing duration and price, closing with a link, View the full treatment menu. "),
    r("Transparent pricing is one of the strongest conversion signals in the research, and it filters enquiries before they reach WhatsApp, saving reception time. "),
    r("Prices here must match the booking platform to the rand."),
  ]));

  c.push(blockTitle("Block 8 — Why Corner Spa"));
  c.push(para([
    r("Four benefit tiles that answer the silent question, why this spa and not the one closer to me. "),
    r("Suggested tiles: qualified, supervised therapists; honest, published prices; calm private rooms in central Windhoek; and booking in under a minute on WhatsApp or online. "),
    r("Each tile is one short sentence, not a paragraph; the claims must be ones the venture can prove on request."),
  ]));

  c.push(blockTitle("Block 9 — Meet the therapists"));
  c.push(para([
    r("Three profile cards with real photographs, first names, roles and one specialty line, linking to the full team page. "),
    r("Guests, especially first-timers, book a person as much as a treatment; showing faces before the visit measurably reduces no-show anxiety. "),
    r("Chapter 9 specifies the full card anatomy and a sample bio; the photographs come from the same session as the gallery shots so lighting and wardrobe stay consistent."),
  ]));

  c.push(blockTitle("Block 10 — Gallery"));
  c.push(para([
    r("A six-to-eight photo grid of the actual space: treatment rooms, the welcome corner, details such as folded towels, stones and tea service. "),
    r("Captions should name what the guest is looking at, since naming rooms helps visitors imagine their own visit. "),
    r("Every image is compressed for speed (chapter 12) and regenerated, never lifted from stock libraries."),
  ]));

  c.push(blockTitle("Block 11 — Guest reviews"));
  c.push(para([
    r("Two or three short named quotes with first name and surname initial, each citing a specific detail such as the pressure of the massage or the quietness of the room, plus a Google reviews badge with the live count. "),
    r("The teardown found specific, named testimonials carry materially more trust than anonymous praise; until real reviews exist, this block stays empty rather than filled with invented quotes. "),
    r("The review-generation engine that fills it is specified in chapter 10."),
  ]));

  c.push(blockTitle("Block 12 — Packages and specials"));
  c.push(para([
    r("Two wide cards, refreshed monthly: for example a Desk Reset combining a 45-minute neck and back massage with an express facial (illustrative price N$520), and a Couples Ritual, 90 minutes (illustrative N$1,350). "),
    r("Packages simplify the choice for undecided guests and raise average ticket value; each card carries its own Book button so the decision and the action sit together."),
  ]));

  c.push(blockTitle("Block 13 — Gift vouchers"));
  c.push(para([
    r("One full-width card: Give an hour of calm. Digital vouchers from N$200, delivered to WhatsApp or email in minutes. "),
    r("Vouchers are both revenue and acquisition, because the recipient arrives as a first-time guest, which is why gift vouchers deserve main-navigation placement per pattern 3. "),
    r("The card states value options, delivery method and validity in one line each, with a Buy a voucher button that opens the voucher flow."),
  ]));

  c.push(blockTitle("Block 14 — How booking works"));
  c.push(para([
    r("Three steps in a row: choose your treatment online or on WhatsApp, any time; confirm your slot and therapist; arrive ten minutes early and we handle the rest. "),
    r("Under it, one reassurance line about the cancellation policy in plain words, for example free rescheduling up to 24 hours before. "),
    r("This block converts the hesitant majority who like the spa but fear a complicated process; it also pre-answers the FAQ that reception otherwise answers by phone."),
  ]));

  c.push(blockTitle("Block 15 — Find us, hours and map"));
  c.push(para([
    r("An embedded Google map beside the address, an hours table, a parking or access note, and two buttons: WhatsApp us and Get directions. "),
    r("The address and pin must be identical everywhere (website, Google Business Profile, Instagram bio) because inconsistency quietly kills map-pack ranking, as chapter 11 explains. "),
    r("Hours shown here must match the WhatsApp away-greeting and the booking platform's availability."),
  ]));

  c.push(blockTitle("Block 16 — FAQ"));
  c.push(para([
    r("Four to six expandable accordions answering the questions first-timers actually type: What should I wear and when should I arrive? How does cancellation work? Do you treat men and pregnant guests? Which products do you use, and what if I have allergies? How do I redeem a gift voucher? "),
    r("Accordion rows keep the page scannable while still hosting the full answers, and each answer ends with the relevant action link rather than a dead end."),
  ]));

  c.push(blockTitle("Block 17 — Newsletter opt-in"));
  c.push(para([
    r("A single email field and button with an honest promise: seasonal rituals and quiet-day offers, once a month, unsubscribe any time. "),
    r("The newsletter is the retention channel that offsets the spa's seasonal rhythm, and its value depends entirely on the promise being kept, so the frequency claim is binding. "),
    r("Entries land in a simple list the team actually exports monthly; an unopened mailing list is not an asset."),
  ]));

  c.push(blockTitle("Block 18 — Final CTA banner"));
  c.push(para([
    r("A dark charcoal band closing the page: one serif line, Ready to slow down? Windhoek moves fast. This corner doesn't. above the same dual buttons as the hero, Book Your Treatment and Message us on WhatsApp. "),
    r("Visitors who scroll this far are the warmest audience on the page, and the last impression should be the action itself, not a corporate paragraph."),
  ]));

  c.push(blockTitle("Block 19 — Footer"));
  c.push(para([
    r("Four columns: brand mark with one-line description and Instagram and Facebook links; Explore links mirroring the header; Visit with address, hours and map link; and Contact with the WhatsApp number, phone and email. "),
    r("A final legal row carries the privacy notice, terms, and the line Corner Spa is an Oryx Institute venture, which also keeps the institutional story crawlable for search engines. "),
    r("No empty columns and no dead links: the footer is the most-crawled block on any site."),
  ]));

  c.push(h2("6.1 The two floating elements"));
  c.push(para([
    r("Two elements ride above all nineteen blocks. The floating WhatsApp button sits bottom-right on every screen: 56 pixels, official WhatsApp green with a white icon, appearing after the visitor has scrolled about a third of the hero on mobile so it never competes with the primary CTA, and always at least 16 pixels clear of content. "),
    r("The sticky mobile booking bar pins to the bottom of the viewport on phones only, split roughly sixty-forty between Book Now and WhatsApp, and it hides itself when the booking widget is open so buttons never stack. "),
    r("Both are specified in detail in chapters 7 and 8."),
  ]));

  return c;
}

module.exports = { chapters1to6 };
