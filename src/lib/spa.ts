// Corner Spa - single source of truth.
// Facts mirror PROMPT.md "Hard-coded facts" and prices.json exactly.
// OWNER TO SUPPLY (kept in one block, omitted from the page until given):
//   secondPhone, streetAddress. Never invent them.

export const SPA = {
  name: "Corner Spa",
  tagline: "The relaxation you deserve.",
  lead: "Massage, hot stone, nails and waxing in Windhoek.",
  phone: "+264 81 623 4788",
  phoneHref: "tel:+264816234788",
  whatsappNumber: "264816234788",
  quote: "Slow, quiet and unhurried.",
  facialsNote: "Facials: ask us for prices.",
  currencyNote: "All prices in Namibian dollars.",
} as const;

// Owner to supply later. Referenced nowhere on the page until filled in.
export const OWNER_TO_SUPPLY = {
  secondPhone: "", // second booking number
  streetAddress: "", // street address, Klein Windhoek
};

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

export function waLink(prefill: string): string {
  return `https://wa.me/${SPA.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
}

export const WA_PREFILL = {
  general:
    "Hi Corner Spa! I would like to book a treatment. What is available this week?",
  question:
    "Hi Corner Spa! I have a question about treatments and prices.",
};

export function waBookRow(name: string, detail?: string, price?: number): string {
  const bits = [`Hi Corner Spa! I would like to book the ${name.toLowerCase()}`];
  if (detail) bits.push(`(${detail.toLowerCase()})`);
  if (price) bits.push(`listed at N$ ${price}`);
  bits.push("What is available this week?");
  return bits.join(" ");
}

// ---------------- Prices (prices.json, final) ----------------
export type PriceRow = {
  name: string;
  detail?: string;
  price: number;
  confirm?: string; // reading the owner asked us to flag
};

export type PriceGroup = { id: string; title: string; rows: PriceRow[] };

export const PRICE_GROUPS: PriceGroup[] = [
  {
    id: "massage",
    title: "Massage",
    rows: [
      { name: "Full body massage with back and neck", detail: "60 min", price: 500 },
      {
        name: "Full body massage with hot stones on the back",
        detail: "60 min",
        price: 450,
        confirm: "duration partly cut off in the photo",
      },
      { name: "Relaxing lemon grass full body massage", price: 700 },
      { name: "Back, neck and scalp massage with hot stones", detail: "30 min", price: 250 },
    ],
  },
  {
    id: "nails",
    title: "Nails",
    rows: [
      { name: "Gel overlay", detail: "Hands and feet", price: 400 },
      { name: "Full cover gel with tips", detail: "Plain", price: 350 },
    ],
  },
  {
    id: "waxing",
    title: "Waxing",
    rows: [
      {
        name: "Combo",
        detail: "Hollywood and underarm",
        price: 400,
        confirm: "handwritten as 'Klax Combo', read as Wax Combo",
      },
      { name: "Upper lip", price: 70 },
      { name: "Chin", price: 70 },
      { name: "Half legs", price: 250 },
      { name: "Full legs", price: 400 },
      { name: "Underarms", price: 100 },
    ],
  },
];

export const ALL_PRICE_ROWS: PriceRow[] = PRICE_GROUPS.flatMap((g) => g.rows);

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

// Plain-English notes on the massage types we offer. Descriptions of the
// treatment types, not claims: prices stay exactly as prices.json.
export const MASSAGE_NOTES: { name: string; note: string }[] = [
  {
    name: "Full body massage",
    note: "Slow, even strokes across the whole body. The classic choice when everything feels tight.",
  },
  {
    name: "Hot stones on the back",
    note: "Smooth heated stones rest along the back. The warmth settles deep, held tension.",
  },
  {
    name: "Lemon grass full body",
    note: "Lemon grass oil used in the massage. The lemony scent is calm and light.",
  },
  {
    name: "Back, neck and scalp",
    note: "Focused work where tension gathers: back, neck and scalp. Thirty quiet minutes.",
  },
];

// Chat answers, built only from the facts above. Nothing invented.
export const CHAT_INTRO =
  "Hello. I can answer the usual questions. For anything else, WhatsApp us and a person takes over.";

export type ChatAnswer = { chips: string[]; text: string; wa?: string };

export const CHAT_ANSWERS: Record<string, ChatAnswer> = {
  book: {
    chips: ["Prices", "Where are you?", "Talk to a person"],
    text: "The quickest way is WhatsApp, or the booking form on this page. Choose a treatment, add your name and the day you prefer, and the message opens in WhatsApp ready to send.",
    wa: WA_PREFILL.general,
  },
  prices: {
    chips: ["Book", "Facials", "Where are you?"],
    text: "Massages from N$ 250. Full body massage with back and neck, 60 min, is N$ 500. Hot stones on the back is N$ 450. Lemon grass full body is N$ 700. Back, neck and scalp, 30 min, is N$ 250. Nails and waxing are on the price list. Facials: ask us for prices.",
  },
  facials: {
    chips: ["Book", "Prices"],
    text: "Facial prices are not fixed yet, so we say: ask us for prices. Send a WhatsApp and we tell you the same day.",
    wa: WA_PREFILL.question,
  },
  where: {
    chips: ["Book", "Talk to a person"],
    text: "We are in Windhoek, Namibia. The spa site is spa.mendozer.com, and oryxinstitute.org/corner-spa shows the same site.",
  },
  human: {
    chips: ["Prices", "Where are you?"],
    text: `Of course. WhatsApp is the fastest, or call ${SPA.phone} and we answer during opening hours.`,
    wa: WA_PREFILL.general,
  },
};

export function track(event: string, detail?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...detail, ts: Date.now() });
}
