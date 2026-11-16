"use client";

import { useEffect, useMemo, useState } from "react";
import { track, VOUCHER_OPEN_MIN, VOUCHER_PACKAGES } from "@/lib/spa";
import {
  buildVoucherMessage,
  isOpenAmount,
  validateFull,
  voucherCode,
  voucherWaLink,
  MESSAGE_NOTE_MAX,
  type VoucherFields,
} from "@/lib/voucher";

/* SPA-VOUCHERS order form. Deliberately shaped like a plain contact form:
   the visitor fills in their name and WhatsApp number, picks the voucher,
   writes who it is for, and Buy opens WhatsApp with the whole order ready
   to send. The spa takes it from there and builds the gift card by hand
   under the code the order carries. Filling in "their WhatsApp number"
   turns the delivery into a surprise automatically. Values survive a
   cancelled redirect, and a copy-my-order fallback covers phones where
   wa.me opens nothing. */

const STORE_KEY = "corner-spa-voucher-order";

const EMPTY: VoucherFields = {
  packageId: VOUCHER_PACKAGES[0]?.id ?? "open",
  amount: "",
  to: "",
  from: "",
  message: "",
  delivery: "me",
  recipientPhone: "",
  buyerPhone: "",
  company: "",
};

export function VoucherForm() {
  const [f, setF] = useState<VoucherFields>(EMPTY);
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);

  // One stable code per order session: it travels in the WhatsApp message
  // and goes on the gift card when the spa builds it by hand.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<VoucherFields> & { code?: string };
        setF((prev) => ({ ...prev, ...saved, company: "" }));
        if (saved.code) setCode(saved.code);
        sessionStorage.removeItem(STORE_KEY);
      } else {
        setCode(voucherCode());
      }
    } catch {
      setCode(voucherCode());
    }
  }, []);

  // Keep the order even if the visitor navigates away mid-typing.
  useEffect(() => {
    const save = () => {
      try {
        if (f.to || f.from || f.buyerPhone) {
          sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...f, code }));
        }
      } catch {
        /* storage unavailable: the builder still works */
      }
    };
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, [f, code]);

  // The order as the spa reads it: a filled-in "their WhatsApp" makes the
  // delivery a surprise; left empty, the voucher comes to the buyer.
  const order = useMemo<VoucherFields>(
    () => ({ ...f, delivery: f.recipientPhone.trim() ? "surprise" : "me" }),
    [f],
  );
  const errsFull = useMemo(() => validateFull(order), [order]);
  const fullValid = Object.keys(errsFull).length === 0;
  const open = isOpenAmount(f.packageId);

  const set = <K extends keyof VoucherFields>(k: K, v: VoucherFields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
  };

  const blur = () => {
    setTouched(true);
  };

  const pickPackage = (id: string) => {
    setF((p) => ({ ...p, packageId: id }));
    setTouched(false);
    track("voucher_package_pick", { package: id });
    document.getElementById("build")?.scrollIntoView();
  };

  const buy = () => {
    setTouched(true);
    if (!fullValid) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    if (f.company) return; // honeypot: silently drop bot submissions
    track("voucher_intent");
    const href = voucherWaLink(order, code);
    track("voucher_redirect");
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    window.open(href, "_blank", "noopener");
  };

  const copyOrder = async () => {
    const text = `${buildVoucherMessage(order, code)}\n(Or build the same voucher at https://spa.mendozer.com/vouchers)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track("voucher_copy");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        track("voucher_copy_legacy");
      } catch {
        setCopied(false);
      }
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const err = (k: keyof ReturnType<typeof validateFull>) =>
    touched ? errsFull[k] : undefined;

  return (
    <>
      {/* Packages: four made from the menu, plus the open voucher. */}
      <section id="packages" data-sc-act="flow" aria-label="Voucher packages" className="c-section">
        <div className="w">
          <p className="eyebrow">The packages</p>
          <div className="v-pkgs">
            {VOUCHER_PACKAGES.map((p) => (
              <div className="c-card v-pkg" data-sc-in key={p.id}>
                <h3 className="serif">{p.name}</h3>
                <p className="v-pkg-price">{`N$ ${p.price}`}</p>
                <ul>
                  {p.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="a2 v-pkg-use"
                  onClick={() => pickPackage(p.id)}
                  data-track={`voucher_pick_${p.id}`}
                >
                  Use this package
                </button>
              </div>
            ))}
            <div className="c-card v-pkg" data-sc-in>
              <h3 className="serif">Your own amount</h3>
              <p className="v-pkg-price">{`from N$ ${VOUCHER_OPEN_MIN}`}</p>
              <ul>
                <li>An open voucher toward any treatments on the menu</li>
                <li>They choose what to put it toward</li>
              </ul>
              <button
                type="button"
                className="a2 v-pkg-use"
                onClick={() => pickPackage("open")}
                data-track="voucher_pick_open"
              >
                Choose an amount
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The order form, shaped like a plain contact form. The gift card is
          built by hand at the spa once the WhatsApp order arrives. */}
      <section id="build" data-sc-act="flow" aria-label="Order a voucher" className="c-section">
        <div className="w">
          <p className="eyebrow">Order your voucher</p>
          <form
            className="c-form"
            noValidate
            onSubmit={(ev) => ev.preventDefault()}
            aria-label="Order a Corner Spa gift voucher"
          >
            <div className="c-hp" aria-hidden="true">
              <label>
                Company
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={f.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </label>
            </div>

            <label className="grp-label" htmlFor="v-from">
              Your name <span className="req">*</span>
            </label>
            <input
              id="v-from"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={f.from}
              onChange={(e) => set("from", e.target.value)}
              onBlur={blur}
              aria-invalid={touched && !!errsFull.from}
              aria-describedby={touched && errsFull.from ? "v-from-err" : undefined}
              required
            />
            <span className="c-error" id="v-from-err" role="alert">
              {touched ? errsFull.from : ""}
            </span>

            <label className="grp-label" htmlFor="v-bphone">
              Your WhatsApp number <span className="req">*</span>
            </label>
            <input
              id="v-bphone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+264 81 234 5678 or 081 234 5678"
              value={f.buyerPhone}
              onChange={(e) => set("buyerPhone", e.target.value)}
              onBlur={blur}
              aria-invalid={touched && !!err("buyerPhone")}
              aria-describedby={touched && err("buyerPhone") ? "v-bphone-err" : undefined}
              required
            />
            <span className="c-error" id="v-bphone-err" role="alert">
              {touched ? err("buyerPhone") : ""}
            </span>
            <span className="v-field-note">
              The one we confirm payment with and send the voucher to.
            </span>

            <label className="grp-label" htmlFor="v-pkg">
              Which voucher
            </label>
            <select
              id="v-pkg"
              value={f.packageId}
              onChange={(e) => set("packageId", e.target.value)}
            >
              {VOUCHER_PACKAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — N$ {p.price}
                </option>
              ))}
              <option value="open">Your own amount — open voucher</option>
            </select>

            {open && (
              <>
                <label className="grp-label" htmlFor="v-amount">
                  Amount (N$) <span className="req">*</span>
                </label>
                <input
                  id="v-amount"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={`N$ ${VOUCHER_OPEN_MIN} or more`}
                  value={f.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  onBlur={blur}
                  aria-invalid={touched && !!errsFull.amount}
                  aria-describedby={touched && errsFull.amount ? "v-amount-err" : undefined}
                  required
                />
                <span className="c-error" id="v-amount-err" role="alert">
                  {touched ? errsFull.amount : ""}
                </span>
              </>
            )}

            <label className="grp-label" htmlFor="v-to">
              For (their name) <span className="req">*</span>
            </label>
            <input
              id="v-to"
              type="text"
              autoComplete="off"
              placeholder="Their name, as it should read on the card"
              value={f.to}
              onChange={(e) => set("to", e.target.value)}
              onBlur={blur}
              aria-invalid={touched && !!errsFull.to}
              aria-describedby={touched && errsFull.to ? "v-to-err" : undefined}
              required
            />
            <span className="c-error" id="v-to-err" role="alert">
              {touched ? errsFull.to : ""}
            </span>

            <label className="grp-label" htmlFor="v-msg">
              A line to them <span className="req">(optional)</span>
            </label>
            <textarea
              id="v-msg"
              maxLength={MESSAGE_NOTE_MAX}
              placeholder="Happy birthday, my love. This one is for you."
              value={f.message}
              onChange={(e) => set("message", e.target.value)}
              aria-describedby="v-msg-count"
            />
            <span className="c-counter" id="v-msg-count">
              {f.message.length} / {MESSAGE_NOTE_MAX}
            </span>

            <label className="grp-label" htmlFor="v-rphone">
              Their WhatsApp number <span className="req">(optional)</span>
            </label>
            <input
              id="v-rphone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              placeholder="+264 81 234 5678 or 081 234 5678"
              value={f.recipientPhone}
              onChange={(e) => set("recipientPhone", e.target.value)}
              onBlur={blur}
              aria-invalid={touched && !!err("recipientPhone")}
              aria-describedby={touched && err("recipientPhone") ? "v-rphone-err" : undefined}
            />
            <span className="c-error" id="v-rphone-err" role="alert">
              {touched ? err("recipientPhone") : ""}
            </span>
            <span className="v-field-note">
              Only if the gift should go straight to them — we keep it a
              surprise. Leave it empty and the voucher comes to you.
            </span>

            <div className="c-actions">
              <button
                type="button"
                className="btn btn-solid"
                disabled={!fullValid}
                onClick={buy}
                data-track="voucher_wa_click"
              >
                Buy on WhatsApp
              </button>
            </div>

            <p className="c-fallback">
              <button
                type="button"
                className="a2"
                disabled={!fullValid}
                onClick={copyOrder}
                data-track="voucher_copy_click"
              >
                {copied ? "Copied" : "Copy my order"}
              </button>
            </p>

            <p className="c-privacy">
              Your details go straight to Corner Spa by WhatsApp. Nothing is
              stored on this site. We reply with the payment details, then
              build the gift card by hand under its code.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
