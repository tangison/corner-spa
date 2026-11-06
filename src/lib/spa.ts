// Corner Spa - single source of truth.
// Facts mirror the owner's instructions exactly. Never invent what is not here.
// OWNER TO SUPPLY (kept in one block, omitted from the page until given):
//   secondPhone (second booking number), SOCIAL_LINKS, REVIEWS_URL.
// SPA.phone is used in structured data (JSON-LD) only. It must never be
// rendered as visible text on the page: WhatsApp buttons only.

import pricesJson from "../../prices.json";

export const SPA = {
  name: "Corner Spa",
  tagline: "The relaxation you deserve.",
  lead: "Massage, hot stone, foot spa, nails, waxing and lashes in Windhoek.",
  phone: "+264 81 623 4788", // JSON-LD / structured data only, never visible text
  whatsappNumber: "264816234788",
  quote: "Slow, quiet and unhurried.",
  currencyNote: "All prices in Namibian dollars.",
} as const;

// Owner to supply later. Referenced nowhere on the page until filled in.
export const OWNER_TO_SUPPLY = {
  secondPhone: "", // second booking number, stays empty until supplied
};

// ---------------- Location, hours, directions ----------------
export const ADDRESS = {
  street: "34 Schonlein Street",
  area: "Windhoek West",
  city: "Windhoek",
  country: "Namibia",
  plot: "on the Flexona Organizational Services plot",
};

export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city}, ${ADDRESS.country}`;

// Plain link to a Google Maps search for the address. No embed, no tracking.
export const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(ADDRESS_LINE);

export const TIME_ZONE = "Africa/Windhoek";

// Opening hours. `days` uses JS getDay() numbers (0 = Sunday).
export const HOURS: { label: string; short: string; days: number[]; open: string | null; close: string | null }[] = [
  { label: "Monday to Friday", short: "Mon to Fri", days: [1, 2, 3, 4, 5], open: "09:00", close: "18:00" },
  { label: "Saturday", short: "Sat", days: [6], open: "09:00", close: "16:00" },
  { label: "Sunday", short: "Sun", days: [0], open: null, close: null },
];

export const HOURS_LINE = "Mon to Fri 09:00 to 18:00 · Sat 09:00 to 16:00 · Sun closed";

// Schema.org opening hours specification (JSON-LD).
export const OPENING_HOURS_SPEC = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "16:00",
  },
];

export const SITE_URL = "https://spa.mendozer.com";

export const SITE_ADDRESSES = [
  { label: "spa.mendozer.com", href: "https://spa.mendozer.com" },
  { label: "oryxinstitute.org/corner-spa", href: "https://oryxinstitute.org/corner-spa" },
];

export const PARTNERS = [
  {
    name: "Oryx Institute",
    role: "Operations lead",
    line: "Corner Spa is the first project of Oryx Institute.",
    href: "https://oryxinstitute.org",
    siteLabel: "oryxinstitute.org",
  },
  {
    name: "Mendozer Investments",
    role: "Financing partner",
    line: "Corner Spa is a concept by Mendozer Investments.",
    href: "https://mendozer.com",
    siteLabel: "mendozer.com",
  },
] as const;

// Social profiles. Hidden everywhere until a real URL is filled in here.
export const SOCIAL_LINKS = {
  instagram: "", // e.g. https://instagram.com/cornerspa
  facebook: "", // e.g. https://facebook.com/cornerspa
};

// Google Business Profile link. The reviews section stays hidden until
// this is a real URL. There is no profile yet, so the site shows nothing.
export const REVIEWS_URL = "";

export function waLink(prefill: string): string {
  return `https://wa.me/${SPA.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
}

export const WA_PREFILL = {
  general:
    "Hi Corner Spa! I would like to book a treatment. What is available this week?",
  question:
    "Hi Corner Spa! I have a question about treatments and prices.",
  facial:
    "Hi Corner Spa! I would like to book a facial. Please send me the prices.",
};

export function waBookRow(name: string, detail?: string, price?: number): string {
  const bits = [`Hi Corner Spa! I would like to book the ${name.toLowerCase()}`];
  if (detail) bits.push(`(${detail.toLowerCase()})`);
  if (price) bits.push(`listed at N$ ${price}`);
  bits.push("What is available this week?");
  return bits.join(" ");
}

// ---------------- Prices (single source of truth: prices.json) ----------------
export type PriceRow = {
  name: string;
  detail?: string;
  price: number;
};

export type PriceGroup = { id: string; title: string; rows: PriceRow[] };

type PricesFile = {
  groups: PriceGroup[];
  facials: { note: string };
};

const pricesFile = pricesJson as PricesFile;

export const PRICE_GROUPS: PriceGroup[] = pricesFile.groups;

export const FACIALS_NOTE = pricesFile.facials.note; // "Ask us for prices"

export const ALL_PRICE_ROWS: PriceRow[] = PRICE_GROUPS.flatMap((g) => g.rows);

// Structured-data price range, derived from prices.json (not hand-typed).
const allPrices = ALL_PRICE_ROWS.map((r) => r.price);
export const PRICE_RANGE = `N$ ${Math.min(...allPrices)} - ${Math.max(...allPrices)}`;

// ---------------- Media ----------------
export const MEDIA = {
  markDark: "/media/logos/mark-dark.png",
  markLight: "/media/logos/mark-light.png",
  lockupStackedDark: "/media/logos/lockup-stacked-dark.png",
  lockupStackedLight: "/media/logos/lockup-stacked-light.png",
  photos: {
    leafAndPebble: "/media/photos/leaf-and-pebble.jpg",
    hotStonesBack: "/media/photos/hot-stones-back.jpg",
    sandRipples: "/media/photos/sand-ripples.jpg",
    blackPebbles: "/media/photos/black-pebbles.jpg",
    facialCheek: "/media/photos/facial-cheek.jpg",
    wetStone: "/media/photos/wet-stone.jpg",
    leafMacro: "/media/photos/leaf-macro.jpg",
    towel: "/media/photos/towel.jpg",
    // Photographs of people, shown with a warm monochrome treatment.
    peopleBackHands: "/media/photos/people-back-hands.jpg",
    peopleFacialCheek: "/media/photos/people-facial-cheek.jpg",
    peopleOilPour: "/media/photos/people-oil-pour.jpg",
    peopleStonesRest: "/media/photos/people-stones-rest.jpg",
  },
  heroWide: "/media/hero-wide.jpg",
} as const;

// Plain-English notes on the massage types on the menu. Descriptions of the
// treatment types, not claims: prices stay exactly as prices.json.
export const MASSAGE_NOTES: { name: string; note: string }[] = [
  {
    name: "Full body massage",
    note: "Forty minutes of slow, even strokes across the whole body. The classic choice when everything feels tight.",
  },
  {
    name: "Full body massage with hot stone",
    note: "The same quiet forty minutes, with smooth heated stones resting along the back. The warmth settles in slowly.",
  },
  {
    name: "Back, neck and shoulder massage",
    note: "Focused work where tension gathers: the back, the neck and the shoulders. Twenty five minutes, or thirty with hot stone.",
  },
  {
    name: "Couples massage",
    note: "Two tables in one quiet room, side by side. Forty five minutes for two people.",
  },
];

// Before your visit: shown near the booking form.
export const BEFORE_YOUR_VISIT = [
  "Arrive about 10 minutes early, so the treatment starts on time.",
  "Tell us about allergies, sensitive skin or pregnancy when you book.",
  "If you have a health condition, mention it on the consultation form when you arrive.",
];

// Chat answers, built only from the facts above. Nothing invented.
export const CHAT_INTRO =
  "Hello. I can answer the usual questions. For anything else, WhatsApp us and a person takes over.";

export type ChatAnswer = {
  chips: string[];
  text: string;
  wa?: string;
  link?: { label: string; href: string };
};

export const CHAT_ANSWERS: Record<string, ChatAnswer> = {
  book: {
    chips: ["Prices", "Where are you?", "Talk to a person"],
    text: "The quickest way is WhatsApp, or the booking form on this page. Choose a treatment, add your name and the day you prefer, and the message opens in WhatsApp ready to send.",
    wa: WA_PREFILL.general,
  },
  prices: {
    chips: ["Book", "Facials", "Where are you?"],
    text: "Massages from N$ 300. Full body massage, 40 min, is N$ 450, and with hot stone N$ 500. Couples massage, 45 min, is N$ 800. Foot spa from N$ 250, nails from N$ 50, waxing from N$ 70, lashes from N$ 70. Facials: ask us for prices. The full list is under Price list on the home page.",
  },
  facials: {
    chips: ["Book", "Prices"],
    text: "Facial prices are not fixed yet, so we say: ask us for prices. Send a WhatsApp and we tell you the same day.",
    wa: WA_PREFILL.facial,
  },
  where: {
    chips: ["Book", "Talk to a person"],
    text: `We are at ${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city}, ${ADDRESS.plot}. Monday to Friday 09:00 to 18:00, Saturday 09:00 to 16:00, closed on Sunday.`,
    link: { label: "Get directions", href: DIRECTIONS_URL },
  },
  human: {
    chips: ["Prices", "Where are you?"],
    text: "Of course. WhatsApp is the fastest way to reach a person. We answer during opening hours: Monday to Friday 09:00 to 18:00, Saturday 09:00 to 16:00.",
    wa: WA_PREFILL.general,
  },
};

// FAQ, kept to the five asked-for topics. Answers use only known facts.
export const FAQ: { q: string; a: string }[] = [
  {
    q: "How do cancellations work?",
    a: "Plans change, we understand. Send us a WhatsApp from the same number you booked with and we move or cancel your appointment. There is no fee for changing a booking in good time.",
  },
  {
    q: "What is a hot stone massage?",
    a: "Smooth stones are warmed in water and rest along the back while the massage carries on around them. The warmth is gentle and builds slowly. If you would rather stay without the stones, say so when you book and we do the same massage without them.",
  },
  {
    q: "Can I have a massage during pregnancy?",
    a: "Yes, with care. Tell us how far along you are when you book, and we adapt the treatment and the room for you. If anything is high risk, we ask you to check with your doctor or midwife first.",
  },
  {
    q: "How do I pay?",
    a: "You pay at the spa on the day of your visit, in Namibian dollars, exactly as listed on the price list. If you would like to know the ways to pay before you come, ask us on WhatsApp and we tell you directly.",
  },
  {
    q: "Can you remove lashes done somewhere else?",
    a: "Yes. Removing lashes we did not apply is N$ 100, and a refill on lashes done elsewhere is N$ 150. Removal of our own lashes is N$ 70.",
  },
];

export function track(event: string, detail?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...detail, ts: Date.now() });
}
