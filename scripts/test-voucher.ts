// Corner Spa voucher logic tests — run with: bun scripts/test-voucher.ts
// Covers: code format, package price lines, the WhatsApp message (defaults,
// emoji, over-long notes, open-amount clamping), deep-link round-trip, and
// both validation tiers. Mirrors what scripts/verify-vouchers.py checks in
// the browser.
import {
  buildVoucherMessage,
  MESSAGE_MAX,
  MESSAGE_NOTE_MAX,
  packagePriceLine,
  validateCore,
  validateFull,
  voucherCode,
  voucherWaLink,
  type VoucherFields,
} from "../src/lib/voucher";

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail: string = "") {
  if (ok) {
    pass += 1;
    console.log(`PASS ${name}`);
  } else {
    fail += 1;
    console.log(`FAIL ${name}${detail ? "  — " + detail : ""}`);
  }
}

const base: VoucherFields = {
  packageId: "wind-down",
  amount: "",
  to: "Lena",
  from: "Targis",
  message: "Happy birthday, my love.",
  delivery: "me",
  recipientPhone: "",
  buyerPhone: "081 234 5678",
  company: "",
};

// ---------- code ----------
const code = voucherCode();
check("code format CS-G26-XXXX", /^CS-G\d{2}-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}$/.test(code), code);
check("code excludes ambiguous chars", !/[ILO01]/.test(code), code);
const code2 = voucherCode();
check("two codes differ (random source)", code !== code2, `${code} vs ${code2}`);
const seeded = voucherCode(() => 0); // first alphabet char, deterministic
check("seeded code deterministic", seeded === "CS-G26-A" + "AAAA".slice(0, 3) && seeded.endsWith("AAAA"), seeded);

// ---------- price lines ----------
check("wind-down line", packagePriceLine("wind-down", "") === "The wind-down — N$ 500", packagePriceLine("wind-down", ""));
check("slow afternoon line", packagePriceLine("slow-afternoon", "") === "The slow afternoon — N$ 720");
check("hot-stone treat line", packagePriceLine("hot-stone-treat", "") === "The hot-stone treat — N$ 580");
check("for two line", packagePriceLine("for-two", "") === "For two — N$ 800");
check("open clamps below minimum", packagePriceLine("open", "150") === "Open voucher — N$ 200", packagePriceLine("open", "150"));
check("open keeps valid amount", packagePriceLine("open", "950") === "Open voucher — N$ 950");

// ---------- message ----------
const msg = buildVoucherMessage(base, code);
const expectedLines = [
  "Hi Corner Spa, I would like to order a gift voucher.",
  `Voucher: The wind-down — N$ 500`,
  `Code: ${code}`,
  "For: Lena",
  "From: Targis",
  'Their card says: "Happy birthday, my love."',
  "Delivery: send the voucher to me and I will pass it on.",
  "My WhatsApp: 081 234 5678",
  "Please send me the payment details.",
];
check("message has every line in order", expectedLines.every((l) => msg.includes(l)), msg);
check("message under cap", msg.length <= MESSAGE_MAX, String(msg.length));

const surprise: VoucherFields = { ...base, delivery: "surprise", recipientPhone: "+264 81 987 6543" };
const msg2 = buildVoucherMessage(surprise, code);
check(
  "surprise delivery names their number",
  msg2.includes("Delivery: a surprise — send the voucher straight to their WhatsApp at +264 81 987 6543"),
);

const noMsg: VoucherFields = { ...base, message: "" };
check("no card-says line when message empty", !buildVoucherMessage(noMsg, code).includes("Their card says"));

// ---------- emoji + long message ----------
const emoji: VoucherFields = { ...base, message: "Happy birthday 🎂💛 — enjoy! 🌿", to: "Lena 🌸" };
const msgEmoji = buildVoucherMessage(emoji, code);
check("emoji survive the message", msgEmoji.includes("Happy birthday 🎂💛 — enjoy! 🌿") && msgEmoji.includes("For: Lena 🌸"));

const wa = voucherWaLink(emoji, code);
const decoded = decodeURIComponent(wa.split("text=")[1]);
check("wa.me link round-trips the message", decoded === msgEmoji, decoded.slice(0, 120));
check("wa.me targets the spa number", wa.startsWith("https://wa.me/264816234788?text="), wa.slice(0, 40));

const longNote = "x".repeat(MESSAGE_NOTE_MAX * 10);
const long: VoucherFields = { ...base, message: longNote };
const msgLong = buildVoucherMessage(long, code);
check("over-long note is shortened first", msgLong.length <= MESSAGE_MAX, String(msgLong.length));
check("fixed lines survive the trim", msgLong.includes("Hi Corner Spa, I would like to order a gift voucher.") && msgLong.includes("My WhatsApp: 081 234 5678"));

// ---------- validation ----------
check("core passes on filled form", Object.keys(validateCore(base)).length === 0);
const core1 = validateCore({ ...base, to: " " });
check("core wants a recipient", !!core1.to, core1.to);
const core2 = validateCore({ ...base, packageId: "open", amount: "150" });
check("core rejects amount under minimum", !!core2.amount, core2.amount);
const core3 = validateCore({ ...base, packageId: "open", amount: "200.5" });
check("core rejects non-whole amount", !!core3.amount, core3.amount);
const core4 = validateCore({ ...base, packageId: "open", amount: "480" });
check("core accepts whole amount >= min", Object.keys(core4).length === 0);

const full1 = validateFull({ ...base, buyerPhone: "123" });
check("full rejects bad buyer phone", !!full1.buyerPhone, full1.buyerPhone);
const full2 = validateFull({ ...base, buyerPhone: "+264816234788" });
check("full accepts +264 buyer phone", Object.keys(full2).length === 0);
const full3 = validateFull({ ...base, buyerPhone: "0812345678" });
check("full accepts local buyer phone", Object.keys(full3).length === 0);
const full4 = validateFull({ ...surprise, recipientPhone: "", buyerPhone: "081 234 5678" });
check("full requires recipient phone for surprise", !!full4.recipientPhone, full4.recipientPhone);
const full5 = validateFull(base);
check("full needs no recipient phone for send-to-me", Object.keys(full5).length === 0);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
