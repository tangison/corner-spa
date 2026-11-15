// Corner Spa - gift voucher logic, kept pure: code generation, validation and
// the WhatsApp message builder. No browser APIs here, so the message builder
// can be unit-tested directly (scripts/verify-vouchers.mjs) exactly as the
// page runs it. The UI layer (voucher-form.tsx) only wires this to inputs.
import {
  SPA,
  VOUCHER_OPEN_MIN,
  VOUCHER_PACKAGES,
  type VoucherPackage,
} from "@/lib/spa";

export type VoucherDelivery = "me" | "surprise";

export type VoucherFields = {
  packageId: string; // a VOUCHER_PACKAGES id, or "open" for an open voucher
  amount: string; // open vouchers only; kept as text while typing
  to: string;
  from: string;
  message: string;
  delivery: VoucherDelivery;
  recipientPhone: string; // surprise deliveries only
  buyerPhone: string;
  company: string; // honeypot: humans never see this field
};

export const MESSAGE_MAX = 1500;
export const MESSAGE_NOTE_MAX = 200;

// Unambiguous alphabet for the printable code: no I, L, O, 0 or 1, which read
// as each other when a code is read out over WhatsApp or typed from a photo.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const YEAR_TAG = `G${new Date().getFullYear() % 100}`; // e.g. "G26" in 2026

/* Corner Spa voucher code: CS-G26-XXXX. Issued by the spa on payment; the
   same code travels with the WhatsApp order so nothing is double-issued. */
export function voucherCode(rand: () => number = Math.random): string {
  let out = "";
  for (let i = 0; i < 4; i += 1) {
    out += CODE_ALPHABET[Math.floor(rand() * CODE_ALPHABET.length)];
  }
  return `CS-${YEAR_TAG}-${out}`;
}

export function findPackage(id: string): VoucherPackage | undefined {
  return VOUCHER_PACKAGES.find((p) => p.id === id);
}

export function isOpenAmount(id: string): boolean {
  return id === "open";
}

/* The voucher line as the spa reads it in WhatsApp: name and price, or the
   open amount clamped to the owner's minimum. */
export function packagePriceLine(id: string, amount: string): string {
  if (isOpenAmount(id)) {
    const n = Math.max(VOUCHER_OPEN_MIN, Math.floor(Number(amount) || 0));
    return `Open voucher — N$ ${n}`;
  }
  const p = findPackage(id);
  return p ? `${p.name} — N$ ${p.price}` : "";
}

export type VoucherErrors = Partial<
  Record<"amount" | "to" | "from" | "recipientPhone" | "buyerPhone", string>
>;

function phoneOk(raw: string): boolean {
  const digits = raw.replace(/[\s()-]/g, "");
  return /^\+264\d{7,9}$/.test(digits) || /^0\d{8,9}$/.test(digits);
}

/* Core validity: everything the voucher itself needs. Printing and copying
   wait for this; a buyer can print a gift before settling payment details. */
export function validateCore(f: VoucherFields): VoucherErrors {
  const e: VoucherErrors = {};
  if (isOpenAmount(f.packageId)) {
    const n = Number(f.amount);
    if (!Number.isFinite(n) || n < VOUCHER_OPEN_MIN || Math.floor(n) !== n) {
      e.amount = `Choose a whole amount of N$ ${VOUCHER_OPEN_MIN} or more.`;
    }
  }
  if (!f.to.trim()) e.to = "Who is it for? Add their name.";
  if (!f.from.trim()) e.from = "Add your name so they know it is from you.";
  return e;
}

/* Full validity: everything the WhatsApp order needs, core included. */
export function validateFull(f: VoucherFields): VoucherErrors {
  const e = validateCore(f);
  if (f.delivery === "surprise" && !phoneOk(f.recipientPhone)) {
    e.recipientPhone =
      "Use +264 or a local number for them, like 081 234 5678.";
  }
  if (!phoneOk(f.buyerPhone)) {
    e.buyerPhone = "Use +264 or a local number, like 081 234 5678.";
  }
  return e;
}

/* One line per fact, optional lines left out, under ~1,500 characters.
   If the personal message pushes the order past the cap, that message is
   shortened first and every fixed line survives. */
export function buildVoucherMessage(f: VoucherFields, code: string): string {
  const lines: string[] = [
    "Hi Corner Spa, I would like to order a gift voucher.",
    `Voucher: ${packagePriceLine(f.packageId, f.amount)}`,
    `Code: ${code}`,
    `For: ${f.to.trim()}`,
    `From: ${f.from.trim()}`,
  ];
  if (f.message.trim()) lines.push(`Their card says: "${f.message.trim()}"`);
  if (f.delivery === "surprise") {
    lines.push(
      `Delivery: a surprise — send the voucher straight to their WhatsApp at ${f.recipientPhone.trim()}`,
    );
  } else {
    lines.push("Delivery: send the voucher to me and I will pass it on.");
  }
  lines.push(`My WhatsApp: ${f.buyerPhone.trim()}`);
  lines.push("Please send me the payment details.");
  let msg = lines.join("\n");
  const personal = f.message.trim();
  if (msg.length > MESSAGE_MAX && personal) {
    const withoutPersonal = msg.replace(personal, "");
    const room = MESSAGE_MAX - withoutPersonal.length - 4; // quotes + ellipsis
    const trimmed = personal.slice(0, Math.max(0, room));
    msg = msg.replace(
      personal,
      `${trimmed}${trimmed.length < personal.length ? "…" : ""}`,
    );
  }
  return msg;
}

export function voucherWaLink(f: VoucherFields, code: string): string {
  return `https://wa.me/${SPA.whatsappNumber}?text=${encodeURIComponent(
    buildVoucherMessage(f, code),
  )}`;
}
