// content2.js — Chapters 7–11: CTA system, WhatsApp, team, trust content, tech stack
const { h1, h2, h3, para, r, lead, bullet, buildTable, tableTitle, tableNote, figure } = require("./lib");

function chapters7to11() {
  const c = [];

  // ───────────────────────────── 7. CTA SYSTEM ─────────────────────────────
  c.push(h1("7. CTA System and Conversion Strategy"));
  c.push(para([
    r("The research is blunt about calls-to-action: one primary action per screen, repeated consistently, beats three competing ones. "),
    r("Every extra CTA option introduces hesitation, and hesitation on a phone is a closed tab. "),
    r("Corner Spa therefore runs a strict three-level CTA hierarchy, summarised in Table 3, and every block in chapter 6 draws its buttons from these three levels and nothing else."),
  ]));
  c.push(tableTitle("Table 3: CTA hierarchy for the Corner Spa landing page"));
  c.push(buildTable(
    ["Level", "Button and styling", "Where it appears", "Copy examples"],
    [
      ["Primary", "Solid warm gold, dark text; one per screen", "Header, hero, mid-page after menus, final banner, sticky mobile bar", "Book Your Treatment; Book now"],
      ["Secondary", "White outline with WhatsApp green icon", "Hero, find-us block, final banner, floating button", "Message us on WhatsApp"],
      ["Tertiary", "Plain text link or phone icon", "Header, find-us block", "Call reception"],
    ],
    [14, 30, 30, 26],
    { zebra: true }
  ));
  c.push(tableNote("Styling values follow the palette in chapter 12; the gold button is the only solid-colour button on the page."));

  c.push(h2("7.1 Copy rules for every button"));
  c.push(lead("Be specific, never generic. ",
    "Button copy that names the action outperforms Submit every time in the conversion literature: Book Your Treatment tells the thumb exactly what happens next, and Book my free consultation beats Submit in study after study cited in the 2026 landing page guides. Vague labels read as forms; specific labels read as outcomes."));
  c.push(lead("Reduce anxiety under the button. ",
    "A microcopy line directly beneath a button removes the last hesitation: Book in under a minute. Free rescheduling up to 24 hours before. One sentence, no more, and it must state a policy the spa actually honours."));
  c.push(lead("One primary action per screen. ",
    "The gold button appears exactly once per viewport; where WhatsApp also appears, it is the outlined secondary. This keeps the hierarchy legible and matches the single-CTA principle that the 2026 research identifies as the difference between pages that book and pages that do not."));
  c.push(lead("Match the message when advertising. ",
    "If the spa later runs a promotion or social ad, the landing headline should echo the ad's promise word for word, the message-match rule. A visitor who taps a couples-ritual ad and lands on a generic hero has been given five exit doors before reading a word."));

  c.push(h2("7.2 Placement and measurement"));
  c.push(para([
    r("The primary button appears above the fold in the hero, again after the treatment menu (the moment desire peaks), and once more in the final banner, with the sticky mobile bar carrying it throughout the scroll on phones. "),
    r("Every button gets a GA4 event (book_now_click, whatsapp_click) so the team can see not just clicks but the block where each click happened. "),
    r("The working target: 4 to 8 percent of landing page visitors starting a booking, the benchmark reported for well-optimised treatment pages, measured weekly after launch. "),
    r("If the number sits below target, the fix sequence is copy first, contrast second, load speed third, never a redesign."),
  ]));

  // ───────────────────────────── 8. WHATSAPP DEEP DIVE ─────────────────────────────
  c.push(h1("8. WhatsApp Integration Deep Dive"));
  c.push(para([
    r("In Namibia, WhatsApp is not an alternative contact channel; it is where business happens. Guests expect to message a spa the way they message a friend, and the businesses that answer fastest win the booking. "),
    r("The strategy below starts free on the WhatsApp Business app with click-to-chat links, and only graduates to the paid Business Platform (API) when message volume genuinely demands automation. "),
    r("Figure 2 shows the full booking flow from tap to confirmed appointment."),
  ]));
  c.push(...figure(
    "/home/z/my-project/download/corner-spa-assets/fig2_whatsapp_booking_flow.png",
    "Figure 2: The six-step WhatsApp booking flow across three phases",
    585, 880
  ));

  c.push(h2("8.1 The click-to-chat link, precisely"));
  c.push(para([
    r("The foundation is a wa.me link: the spa's number in full international format without plus signs, zeros or punctuation, followed by an optional URL-encoded prefilled message. "),
    r("For a Namibian number 081 123 4567, the base is wa.me/264811234567; spaces become percent-20, apostrophes percent-27 and exclamation marks percent-21. "),
    r("A working example for the hero button:"),
  ]));
  c.push(para([
    r("https://wa.me/264811234567?text=Hi%20Corner%20Spa!%20I%27d%20like%20to%20book%20a%20treatment.",
    { size: 22, font: { ascii: "Courier New", eastAsia: "SimSun" } }),
  ], { after: 160 }));
  c.push(para([
    r("Different buttons should carry different prefilled texts, because the prefilled message is free context for reception: the hero button asks about booking, the voucher button says I would like to buy a gift voucher, and the reception QR code says Hi, I am at Corner Spa and would like to rebook. "),
    r("Each variant is one line of HTML; test every link on both a phone and a desktop before launch, as the integration guides recommend."),
  ]));

  c.push(h2("8.2 Placement and styling of the floating button"));
  c.push(para([
    r("The floating button is 56 pixels round, official WhatsApp green with the white glyph, fixed 16 pixels from the bottom-right corner on every screen. "),
    r("Recognisability beats brand purity here: guests see green and know instantly what it does. "),
    r("On mobile it fades in only after roughly a third of the hero has scrolled so it never covers the primary CTA, it carries an aria-label for screen readers, and it never overlaps the sticky booking bar, which reserves its corner. "),
    r("On desktop it can appear immediately."),
  ]));

  c.push(h2("8.3 Setting up WhatsApp Business properly"));
  c.push(para([
    r("The free WhatsApp Business app is the right tool at launch, but it must be set up like a shopfront rather than a spare phone. "),
    r("The business profile needs the exact trading name, the Day Spa category, the physical address, opening hours, the website link, and a catalog of the treatment menu with prices, so guests can browse without leaving the chat. "),
    r("Four built-in tools do most of the work:"),
  ]));
  c.push(bullet("Greeting message: an automatic first reply within seconds, naming opening hours, typical response time and a link to the treatment menu."));
  c.push(bullet("Away message: covers after-hours enquiries honestly, with the hours and the online booking link, so no message sits unanswered overnight."));
  c.push(bullet("Quick replies: saved shortcuts for the four most common requests, massage, facial, couples ritual and vouchers, each with price and a booking link, answered in two taps."));
  c.push(bullet("Labels: New enquiry, Booked, Deposit paid, Visited, Follow-up, so the chat list itself becomes a lightweight customer list."));
  c.push(para([
    r("Print a QR code for the reception desk that opens the rebook link above; a guest paying after a good massage is the cheapest lead the spa will ever get. "),
    r("The number used must be reachable by one accountable person per shift, and the Oryx service-operations curriculum should own the greeting scripts and tone, which keeps the channel on-brand and measurable."),
  ]));

  c.push(h2("8.4 Response standards and when to upgrade"));
  c.push(para([
    r("The standard to publish and keep: first reply within 15 minutes during opening hours. "),
    r("The auto-greeting covers the gap when reception is with a guest, and the away message covers the night. "),
    r("Upgrade to the WhatsApp Business Platform (API) when any of these is true: sustained volume beyond roughly 50 conversations a day, a need for multi-agent routing, or a need for templated outbound reminders at scale. "),
    r("The Platform charges per conversation and requires a business solution provider, so its pricing should be verified with Meta at decision time; until then it is unnecessary cost for a single-location spa. "),
    r("One boundary matters: WhatsApp carries conversations, never payment credentials. Deposits are paid through the link in chapter 11, and card details are never typed into chat."),
  ]));

  // ───────────────────────────── 9. TEAM SECTION ─────────────────────────────
  c.push(h1("9. Team and Staff Section Standards"));
  c.push(para([
    r("Spa bookings are personal. A first-time guest is not choosing a 60-minute slot; they are choosing whose hands they will lie under, and the teardown found that authentic staff photography and honest bios are among the strongest trust builders on spa sites. "),
    r("The team section therefore gets the same design care as the treatment menu, not a leftovers grid of cropped headshots."),
  ]));
  c.push(h2("9.1 Anatomy of a therapist profile"));
  c.push(para([
    r("Each profile card contains six elements: a real photograph in natural light with the spa's uniform; full name and role; specialty line; years of experience; languages spoken; and one human line in the therapist's own words. "),
    r("The bio should describe what it is like to be on the therapist's table, which the copywriting research identifies as the difference between a bio that blurs into nine thousand others and one a guest remembers. "),
    r("A sample, clearly marked for replacement with real details:"),
  ]));
  c.push(para([
    r("Sample bio (replace with a real team member): Ndapewa, Senior Massage Therapist. Trained through the Oryx Institute's service-operations programme, Ndapewa has spent eight years turning desk-stiff shoulders into quiet afternoons. Her deep-tissue pressure is firm but never a fight; she checks in once, then lets the silence work. Speaks English, Oshiwambo and Afrikaans. Books fastest for: Desk Reset and hot stone rituals.",
    { italics: true }),
  ], { after: 160 }));
  c.push(h2("9.2 Individual bio pages and the booking path"));
  c.push(para([
    r("Beyond the shared team page, each therapist gets a simple individual page at its own address such as cornerspa.na/team/ndapewa. "),
    r("This follows current practice for practitioner pages: a page whose main focus is one person can carry profile structured data, it wins searches for that person's name, and it gives referrers a linkable target in a way a twelve-person grid never can. "),
    r("Each bio page carries its own Book with [name] button that opens the booking platform with that therapist preselected, and the title tag reads the name and specialty, not just Profile. "),
    r("Decide the exit policy now: when a therapist leaves, their page is archived with a redirect to the team page rather than deleted, so links and search history do not rot."),
  ]));

  // ───────────────────────────── 10. TRUST CONTENT ─────────────────────────────
  c.push(h1("10. Trust Content: Reviews, Gallery and the First-Visit Guide"));

  c.push(h2("10.1 The review engine"));
  c.push(para([
    r("Reviews are the landing page's fuel, and they do not appear by hoping. "),
    r("The ask happens at the peak-delight moment, when tea is served after the treatment: a small card on the tray carries a QR code that opens the Google review form for Corner Spa, and the therapist says one sentence, if you enjoyed it, a Google review helps us enormously. "),
    r("A working target for the first ninety days is 25 or more reviews averaging 4.7 or higher; every review gets a reply within a day, including the critical ones, because replies are read by the next hundred guests. "),
    r("The landing page then displays the live count and two or three named quotes, refreshed monthly."),
  ]));

  c.push(h2("10.2 The gallery brief"));
  c.push(para([
    r("The gallery exists to answer one question: will I feel comfortable there? That is answered by real rooms, real light and real detail, never by stock candles. "),
    r("The photo session in chapter 12 feeds this block and the hero at once; captions name what is shown, and every image ships compressed for the mobile speed budget. "),
    r("Guest-facing treatment shots require consent, collected verbally at booking and honoured without exception; any guest can decline and still get the same warm service."),
  ]));

  c.push(h2("10.3 The first-visit guide"));
  c.push(para([
    r("Red Door and Wi Spa turn first-timer nerves into bookings by publishing exactly what will happen, and Corner Spa should do the same as part of the Policies and FAQ page, linked from the booking steps block. "),
    r("The guide answers, in order: what to wear and what to bring; arriving ten minutes early and why; the short consultation where pressure, allergies and focus areas are asked; what happens with phones and conversation during the treatment; tipping norms in Namibia; and how it feels afterwards, including drinking water and taking the evening slowly. "),
    r("This page also carries the etiquette and cancellation policies in plain words, which protects the therapists' schedules and pre-empts the awkward conversations."),
  ]));

  // ───────────────────────────── 11. TECH STACK ─────────────────────────────
  c.push(h1("11. Technology Stack and Integrations"));

  c.push(h2("11.1 Booking platform"));
  c.push(para([
    r("The booking platform is the operational heart of the website: every Book Now button, the calendar, deposits, no-show protection and the guest list live there. "),
    r("Table 4 compares the platforms most relevant to a single-location Namibian spa in 2026; pricing models change often, so figures are indicative and must be verified at contract time."),
  ]));
  c.push(tableTitle("Table 4: Booking platforms compared for a single-location spa (2026, indicative)"));
  c.push(buildTable(
    ["Platform", "Pricing model", "Strengths", "Fit for Corner Spa"],
    [
      ["Fresha", "Free core tools; card-processing and per-booking fees; partner marketplace", "120-plus countries incl. Southern Africa; clean widget; marketplace discovery; no-show protection", "Recommended: lowest start cost, proven in the region"],
      ["Booksy", "Subscription from about $19.95/month (solo)", "Strong mobile app and marketing tools", "Good fallback; monthly cost from day one"],
      ["Vagaro", "Subscription per staff count", "Solid all-rounder, US-centric", "Regional support weaker"],
      ["Mangomint", "Premium subscription (USD)", "Beautiful UX, deep automations", "Priced for larger multi-room spas"],
      ["Boulevard", "Premium subscription from about $176/month (list)", "Boutique med-spa polish", "Over-specified for launch"],
      ["Mindbody", "Subscription, class-oriented", "Fitness and class scheduling", "Built for gyms; heavy for a day spa"],
    ],
    [14, 26, 32, 28],
    { zebra: true }
  ));
  c.push(tableNote("Sources: 2026 comparisons by Boulevard, Booksy and Booking Pro cited in chapter 3; verify Namibia availability and current fees before signing."));
  c.push(para([
    r("Recommendation: start on Fresha. It carries no monthly base fee, its booking widget embeds directly under the landing page's Book Now buttons, its marketplace lists the spa where Windhoek visitors already search, and its card machine pairs with reception. "),
    r("The one action item before commitment: confirm Namibia onboarding and payout timelines with Fresha, and keep Booksy as the documented fallback."),
  ]));

  c.push(h2("11.2 Payments in Namibian dollars"));
  c.push(para([
    r("Three rails cover every guest. DPO Pay by Network is the established card gateway for Namibian merchants, accepting Visa, Mastercard, American Express and Diners in NAD, with online EFT and payment links issued from a dashboard; it powers website payments and deposit links. "),
    r("PayToday is Namibia's instant mobile payment app, familiar to local guests for quick transfers, and a card machine at reception completes the set. "),
    r("Policy: deposits through a DPO payment link secure peak slots and rituals above roughly N$500 (illustrative threshold), credited against the final bill, with the cancellation terms stated in the same message. "),
    r("Card details are never accepted inside WhatsApp chats."),
  ]));

  c.push(h2("11.3 Google Business Profile and local SEO"));
  c.push(para([
    r("For a single-location spa, the Google Business Profile is half the website: it owns the map pack where Windhoek wellness searches are decided, and reported analyses in 2026 attribute roughly a third of local ranking weight to profile signals alone. "),
    r("Launch-day tasks: claim and verify the profile; set the primary category to Day Spa with a second category for Massage Therapist if available; publish the identical name, address and phone used on the website; upload the first ten real photos; and post the opening offer. "),
    r("Weekly rhythm after launch: add photos, answer every review, and keep hours exact, including holidays. "),
    r("On the website itself, the technical basics are a LocalBusiness or DaySpa structured-data block with name, address, geo-coordinates, hours and price range; page titles built on real searches such as spa Windhoek, massage Windhoek and couples massage Windhoek; and one descriptive sentence per treatment type so search engines can rank the Treatments page."),
  ]));

  c.push(h2("11.4 Analytics, foundations and reliability"));
  c.push(para([
    r("GA4 runs from day one with four events that answer the only questions that matter: book_now_click, whatsapp_click, view_treatment and voucher_click, each attributed to the block it fired from. "),
    r("A Meta pixel is installed when the first ad budget is approved, not before. "),
    r("Foundations: a .na domain (verify availability of cornerspa.com.na or an equivalent), a hello@ email on the same domain, TLS on every page, and automated backups. "),
    r("Reliability is an infrastructure matter that sits with Mendozer: the booking system, WhatsApp Web and the card terminal all assume connectivity, so the premises need a primary line and a backup path (LTE failover is the usual answer) agreed before opening week."),
  ]));

  return c;
}

module.exports = { chapters7to11 };
