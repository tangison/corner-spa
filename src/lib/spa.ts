// Corner Spa - central data and helpers
// NOTE: names, prices, ratings and contact details are launch placeholders
// pending confirmation by the client (see blueprint Chapter 11).

export const SPA = {
  name: "Corner Spa",
  tagline: "An hour to yourself, in the heart of Windhoek",
  suburb: "Klein Windhoek, Windhoek, Namibia",
  addressLine: "Corner of Nelson Mandela Ave & Uhland St, Klein Windhoek, Windhoek",
  phone: "+264 61 000 000",
  phoneHref: "tel:+264610000000",
  whatsappNumber: "264810000000", // placeholder - replace with live business number
  whatsappDisplay: "+264 81 000 0000",
  email: "hello@cornerspa.na",
  hours: [
    { days: "Monday - Friday", time: "09:00 - 19:00" },
    { days: "Saturday", time: "09:00 - 17:00" },
    { days: "Sunday", time: "10:00 - 15:00" },
    { days: "Public holidays", time: "Closed" },
  ],
  rating: 4.9,
  reviewCount: 87,
  responsePromise: "We reply within 15 minutes during opening hours",
};

export function waLink(prefill: string): string {
  return `https://wa.me/${SPA.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
}

export const WA_PREFILL = {
  general: "Hi Corner Spa! I would like to book a treatment. What is available this week?",
  voucher: "Hi Corner Spa! I want to send a gift voucher - can you help me choose?",
  custom: "Hi Corner Spa! I have a question about treatments and prices.",
};

export const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Signature", href: "#signatures" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
  { label: "Vouchers", href: "#vouchers" },
  { label: "Contact", href: "#contact" },
];

// ---------------- Treatments ----------------
export type Treatment = {
  id: string;
  name: string;
  durations: { minutes: number; price: number }[];
  benefit: string;
};

export type TreatmentCategory = {
  id: string;
  title: string;
  blurb: string;
  items: Treatment[];
};

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  {
    id: "massage",
    title: "Massage",
    blurb: "Slow, deliberate pressure that lets the day go.",
    items: [
      { id: "swedish", name: "Swedish Massage", durations: [{ minutes: 45, price: 450 }, { minutes: 60, price: 550 }, { minutes: 90, price: 700 }], benefit: "Full-body flow that melts surface tension and calms the nervous system." },
      { id: "deep-tissue", name: "Deep Tissue Massage", durations: [{ minutes: 60, price: 650 }, { minutes: 90, price: 850 }], benefit: "Focused pressure that releases stubborn knots in back, neck and shoulders." },
      { id: "hot-stone", name: "Hot Stone Massage", durations: [{ minutes: 60, price: 700 }, { minutes: 90, price: 900 }], benefit: "Warm basalt stones sink heat into deep muscle - deep release without strain." },
      { id: "aromatherapy", name: "Aromatherapy Massage", durations: [{ minutes: 60, price: 620 }], benefit: "Choose your oil blend; leave with a clearer head than you came with." },
      { id: "prenatal", name: "Prenatal Massage", durations: [{ minutes: 60, price: 650 }], benefit: "Gentle, pregnancy-safe side-lying massage for back and hips." },
      { id: "express", name: "Express Back, Neck & Shoulders", durations: [{ minutes: 30, price: 350 }], benefit: "The lunch-hour reset that unravels a desk-bound upper body." },
    ],
  },
  {
    id: "facials",
    title: "Facials",
    blurb: "Skin that looks rested, not worked on.",
    items: [
      { id: "classic-glow", name: "Classic Glow Facial", durations: [{ minutes: 45, price: 480 }], benefit: "Cleanse, exfoliate and mask - the dependable radiance starter." },
      { id: "deep-cleanse", name: "Deep Cleanse Facial", durations: [{ minutes: 60, price: 620 }], benefit: "Congestion cleared with care; pores calmed, skin clarified." },
      { id: "hydrating", name: "Hydrating Facial", durations: [{ minutes: 60, price: 640 }], benefit: "A moisture drench for sun-tired Windhoek skin." },
      { id: "mens", name: "Men's Facial", durations: [{ minutes: 45, price: 480 }], benefit: "Built for beard lines and thicker skin - clean, sharp, unhurried." },
      { id: "brightening", name: "Brightening Ritual 90", durations: [{ minutes: 90, price: 850 }], benefit: "Our most complete facial: enzyme peel, mask, massage and LED finish." },
    ],
  },
  {
    id: "body",
    title: "Body Treatments",
    blurb: "Skin from the neck down, taken seriously.",
    items: [
      { id: "scrub", name: "Full Body Scrub", durations: [{ minutes: 45, price: 520 }], benefit: "Polished, silky skin from shoulders to ankles." },
      { id: "detox-wrap", name: "Detox Body Wrap", durations: [{ minutes: 60, price: 680 }], benefit: "Warm mineral wrap that draws the week out of you." },
      { id: "back-ritual", name: "Back Ritual", durations: [{ minutes: 45, price: 520 }], benefit: "A facial for your back: cleanse, exfoliate, mask and massage." },
    ],
  },
  {
    id: "hands-feet",
    title: "Hands & Feet",
    blurb: "Small details, quietly immaculate.",
    items: [
      { id: "manicure", name: "Classic Manicure", durations: [{ minutes: 45, price: 280 }], benefit: "Shaped, cuticle care and a flawless polish finish." },
      { id: "pedicure", name: "Classic Pedicure", durations: [{ minutes: 60, price: 340 }], benefit: "Soak, smooth and polish - tired feet, resurrected." },
      { id: "mani-pedi", name: "Mani + Pedi Combo", durations: [{ minutes: 90, price: 550 }], benefit: "The full detail work in one sitting, with refreshments." },
    ],
  },
  {
    id: "couples",
    title: "Couples",
    blurb: "Two beds, one quiet room, zero talking required.",
    items: [
      { id: "couples-swedish", name: "Couples Swedish Massage", durations: [{ minutes: 60, price: 1100 }], benefit: "Side by side in our couples room, with a glass of something cold after." },
      { id: "couples-escape", name: "Sunset Escape for Two", durations: [{ minutes: 90, price: 1450 }], benefit: "Massage, facial and foot ritual for two, timed to the golden hour." },
    ],
  },
  {
    id: "add-ons",
    title: "Add-ons",
    blurb: "Small upgrades with outsized payoff.",
    items: [
      { id: "scalp", name: "Scalp Massage", durations: [{ minutes: 20, price: 180 }], benefit: "Twenty minutes that switch the whole body off." },
      { id: "eye", name: "Reviving Eye Treatment", durations: [{ minutes: 20, price: 160 }], benefit: "De-puff, brighten and soften screen-tired eyes." },
      { id: "foot-ritual", name: "Warm Foot Ritual", durations: [{ minutes: 20, price: 170 }], benefit: "A warm soak and pressure-point finish before your treatment." },
    ],
  },
];

export const ALL_TREATMENTS: Treatment[] = TREATMENT_CATEGORIES.flatMap((c) => c.items);

// ---------------- Signature treatments ----------------
export type Signature = {
  id: string;
  name: string;
  price: number;
  minutes: number;
  description: string;
  includes: string[];
  image: string;
  alt: string;
};

export const SIGNATURES: Signature[] = [
  {
    id: "kalahari-stone",
    name: "Kalahari Stone Ritual",
    price: 950,
    minutes: 90,
    description: "Our answer to a week that went too fast. Smooth basalt stones, warmed and glided with long, slow strokes, carry heat deep into the muscle while the room stays hushed and dim. You will not remember the last time your shoulders felt like this.",
    includes: ["60-minute warm stone massage", "Warm foot ritual", "Scalp massage finish"],
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1da2aaf5f1c1.jpg",
    alt: "Therapist placing warm basalt stones on a guest's back during the Kalahari Stone Ritual",
  },
  {
    id: "oryx-signature",
    name: "Oryx Signature Ritual",
    price: 1350,
    minutes: 120,
    description: "The full Corner Spa experience in one unhurried visit, named for the animal that thrives where others wilt. Back ritual first to switch the body off, a brightening facial while you drift, and a warm foot finish that sends you home a little softer than you came.",
    includes: ["45-minute back ritual", "60-minute brightening facial", "Warm foot ritual", "Refreshments on the terrace"],
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/46a391521630.webp",
    alt: "Warm treatment suite prepared for the Oryx Signature Ritual",
  },
  {
    id: "sunset-escape",
    name: "Windhoek Sunset Couples Escape",
    price: 1450,
    minutes: 90,
    description: "Two beds, one private room, and ninety minutes in which nobody has to make small talk. Side-by-side massage and facial, a glass of something cold on the terrace afterwards, and the drive home entirely optional in spirit.",
    includes: ["Side-by-side 60-minute massage", "Express facial each", "Terrace refreshments"],
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b1f4cea0fa4b.jpg",
    alt: "Guest enjoying a hot stone massage during the couples escape",
  },
];

// ---------------- Team ----------------
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  level: "senior" | "therapist" | "trainee";
  specialties: string[];
  credentials: string;
  languages: string[];
  years: number;
  image: string;
  quote: string;
};

export const TEAM: TeamMember[] = [
  {
    id: "ndapewa",
    name: "Ndapewa Amukoto",
    role: "Senior Therapist",
    level: "senior",
    specialties: ["Deep tissue", "Hot stone", "Prenatal"],
    credentials: "NTA-recognised Beauty & Wellness qualification; 8 years in clinical and hotel spas",
    languages: ["English", "Oshiwambo", "Afrikaans"],
    years: 8,
    image: "/team/ther1.png",
    quote: "I match the pressure to the person, never the other way round.",
  },
  {
    id: "maria",
    name: "Maria Hailonga",
    role: "Senior Skin & Facial Specialist",
    level: "senior",
    specialties: ["Brightening facials", "Deep cleanse", "Skin advice"],
    credentials: "International facial therapy certification; 12 years specialising in skin",
    languages: ["English", "Afrikaans"],
    years: 12,
    image: "/team/ther4.png",
    quote: "Good skin is patience plus the right hands. I bring the hands.",
  },
  {
    id: "johannes",
    name: "Johannes Shipanga",
    role: "Massage Therapist",
    level: "therapist",
    specialties: ["Sports massage", "Deep tissue", "Express back ritual"],
    credentials: "Wellness & massage practitioner training; 5 years practice",
    languages: ["English", "Afrikaans", "Oshiwambo"],
    years: 5,
    image: "/team/ther2.png",
    quote: "You do not have to be an athlete to be treated like one.",
  },
  {
    id: "lena",
    name: "Lena Beukes",
    role: "Trainee Therapist - under supervision",
    level: "trainee",
    specialties: ["Swedish massage", "Manicure & pedicure"],
    credentials: "Oryx Institute live-lab trainee; every treatment supervised by a senior therapist",
    languages: ["English", "Afrikaans", "German"],
    years: 1,
    image: "/team/ther3.png",
    quote: "Every guest leaves with two therapists' worth of care.",
  },
];

export const TEAM_GROUP_IMAGE = "/team/teamgroup.png";

// ---------------- Gallery ----------------
export type GalleryImage = { src: string; alt: string };

export const GALLERY: GalleryImage[] = [
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/738367c5dbb1.jpg", alt: "Warm treatment room with soft lighting at Corner Spa" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/eec678e432fa.jpg", alt: "Bright, calm treatment suite" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/46a391521630.webp", alt: "Luxury spa suite with warm timber finish" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/68dfb22db81a.jpg", alt: "Dark, quiet treatment room prepared for a ritual" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cc193838c313.jpg", alt: "Esthetician performing a facial treatment" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e0e2bb95eccf.jpg", alt: "Guest with a warm clay mask and towel wrap" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d2a6058221ff.jpg", alt: "Hot stone massage in progress" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/183c3e97b2b3.jpg", alt: "Pedicure ritual with flower petals" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4557840b93de.jpg", alt: "Fresh pedicure polish finish" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b66dfef1c20a.jpg", alt: "Rolled towels, oils and orchid - treatment details" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6c2052a62c6e.jpg", alt: "Elegant spa lounge" },
  { src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6d859df764fa.jpg", alt: "Therapist performing a warm stone treatment" },
];

// ---------------- Reviews ----------------
export type Testimonial = { name: string; treatment: string; text: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Tulonga N.", treatment: "Kalahari Stone Ritual", text: "I arrived wound tighter than a spring and left feeling like warm butter. The room, the silence, the stones - everything worked." },
  { name: "Anna-Marie V.", treatment: "Brightening Ritual 90", text: "My skin has never looked this rested. Maria explained every step without any pushy product talk." },
  { name: "Pieter S.", treatment: "Deep Tissue 90", text: "Booked on WhatsApp in two minutes. Johannes found knots I have carried since varsity. Straight back next month." },
  { name: "Desmond H.", treatment: "Couples Escape", text: "Took my wife for our anniversary. Ninety minutes of quiet, then coffee on the terrace. She is still talking about it." },
  { name: "Elzanne B.", treatment: "Classic Pedicure", text: "The most thorough pedicure in Windhoek, and the foot ritual before it is worth every cent." },
  { name: "Maria K.", treatment: "Prenatal Massage", text: "Six months pregnant and finally sleeping again. They knew exactly how to position and support me." },
];

// ---------------- Packages & memberships ----------------
export const PACKAGES = [
  {
    id: "half-day-reset",
    name: "Half-Day Reset",
    price: 1250,
    worth: 1520,
    minutes: 180,
    includes: ["60-minute massage of your choice", "Classic Glow Facial", "Full body scrub", "Refreshments & terrace time"],
  },
  {
    id: "workweek-rescue",
    name: "Workweek Rescue",
    price: 780,
    worth: 970,
    minutes: 90,
    includes: ["Express back, neck & shoulders", "Reviving eye treatment", "Classic manicure"],
  },
  {
    id: "mothers-morning",
    name: "Mothers' Morning",
    price: 950,
    worth: 1170,
    minutes: 120,
    includes: ["Prenatal or Swedish massage", "Hydrating facial", "Warm foot ritual"],
  },
];

export const MEMBERSHIPS = [
  {
    id: "monthly-reset",
    name: "The Monthly Reset",
    price: 650,
    terms: ["One 60-minute massage per month", "10% off all add-ons and retail", "Unused visit rolls over one month", "Cancel any month with 14 days notice"],
    featured: true,
  },
  {
    id: "quarterly-glow",
    name: "The Seasonal Glow",
    price: 620,
    terms: ["One 60-minute facial per month", "10% off all add-ons", "Free skin consultation every quarter", "Cancel any month with 14 days notice"],
    featured: false,
  },
];

// ---------------- Vouchers ----------------
export const VOUCHER_AMOUNTS = [300, 500, 1000];

// ---------------- FAQ ----------------
export const FAQS = [
  { q: "How do I book?", a: "Three ways: tap any Book button for instant online booking, tap any WhatsApp button to chat with us, or call " + SPA.phone + ". Online booking shows live availability; WhatsApp is answered within 15 minutes during opening hours." },
  { q: "Do you require a deposit?", a: "Bookings of 90 minutes or more, and all peak-hour slots, require a 25% deposit or a card guarantee. The deposit moves once if you reschedule with more than 24 hours notice." },
  { q: "What is your cancellation policy?", a: "Free rescheduling or cancellation up to 24 hours before your appointment. Inside 24 hours the deposit is retained, because the therapist's time is reserved for you." },
  { q: "Where do I park?", a: "Free on-site parking directly in front of the spa, with additional street parking on the surrounding blocks in Klein Windhoek." },
  { q: "When should I arrive?", a: "15 minutes before your treatment. That gives time for a short consultation, a change into a robe, and a moment to exhale before anything begins." },
  { q: "What if I am pregnant or have a medical condition?", a: "Tell us when you book. Our prenatal massage is side-lying and pregnancy-safe, and our senior therapists will adapt any treatment. If you are unsure, ask on WhatsApp before booking." },
  { q: "Who will perform my treatment?", a: "A qualified senior therapist or therapist - or, for some services, a trainee working under direct supervision of a senior therapist. Your booking confirmation always names your therapist, and you can request a specific one." },
  { q: "How does gift voucher delivery work?", a: "Digital vouchers are delivered by WhatsApp or email within the hour - perfect for last-minute gifts. Physical vouchers can be collected at reception or couriered in Windhoek. Vouchers are valid for 12 months." },
  { q: "What is the Corner Spa training lab?", a: "Corner Spa is the Oryx Institute's first live venture: a working spa where Namibian wellness professionals train on real operations under qualified supervision. Every treatment supports that mission - you get senior-standard care, and the industry gets its next generation." },
];

// ---------------- Time slots for the booking modal ----------------
export const BOOKING_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:00"];

export function formatNAD(price: number): string {
  return "N$" + price.toLocaleString("en-NA");
}

// lightweight analytics event bus (wired for GA4/GTM at launch)
export function track(event: string, detail?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...detail, ts: Date.now() });
  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", event, detail ?? {});
  }
}
