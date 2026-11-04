"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookButton, WhatsAppButton } from "@/components/spa/booking";
import {
  FAQS, GALLERY, MEMBERSHIPS, PACKAGES, SIGNATURES, SPA, TEAM, TEAM_GROUP_IMAGE,
  TESTIMONIALS, TREATMENT_CATEGORIES, VOUCHER_AMOUNTS, WA_PREFILL, formatNAD, track, waLink,
} from "@/lib/spa";
import {
  Award, BadgeCheck, Check, Clock, Gem, GraduationCap, HeartHandshake, Leaf,
  MapPin, MessageCircle, Navigation, Quote, ShieldCheck, Sparkles, Star, Wallet,
} from "lucide-react";

// ---------------- Hero ----------------
export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="absolute inset-0">
        <img
          src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/46a391521630.webp"
          alt="Warm, softly lit treatment suite at Corner Spa in Windhoek"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16201B]/85 via-[#16201B]/60 to-[#16201B]/25" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[88vh] max-w-xl flex-col justify-center py-24">
          <p className="mb-4 flex items-center gap-2 text-sm text-[#E4D9BF]">
            <MapPin className="h-4 w-4 text-[#C9A84C]" /> Klein Windhoek, Windhoek
            <span className="mx-2 text-white/30">|</span>
            <Star className="h-4 w-4 fill-[#C9A84C] text-[#C9A84C]" /> {SPA.rating} ({SPA.reviewCount} reviews)
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[#F7F3EC]">
            An hour to yourself,<br />in the heart of Windhoek
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#D8D3C6]">
            Slow, skilled treatments in a quiet Klein Windhoek sanctuary - transparent prices,
            senior-standard care, and booking that takes one tap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <BookButton event="hero_book_click" className="h-12 px-8 text-base">Book Your Treatment</BookButton>
            <WhatsAppButton prefill={WA_PREFILL.general} source="hero" event="hero_whatsapp_click"
              className="h-12 px-8 text-base text-[#7FE0A8] border-[#7FE0A8]/50 hover:bg-[#25D366]/15">
              WhatsApp Us
            </WhatsAppButton>
          </div>
          <p className="mt-6 text-sm text-[#B9B4A5]">
            Open today · {SPA.responsePromise}
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------- Trust bar ----------------
const TRUST_ITEMS = [
  { icon: Star, label: SPA.rating + " on Google", sub: SPA.reviewCount + " verified reviews" },
  { icon: ShieldCheck, label: "Senior-standard care", sub: "Documented hygiene protocol" },
  { icon: GraduationCap, label: "Oryx Institute venture", sub: "Pursuing NQA / NTA accreditation" },
  { icon: Leaf, label: "Considered products", sub: "Kind to skin, kind to Earth" },
  { icon: Wallet, label: "Transparent pricing", sub: "Every price published in NAD" },
];

export function TrustBar() {
  return (
    <section aria-label="Trust and credentials" className="border-y border-[#1F2923]/10 bg-[#F2EDE2]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <item.icon className="h-7 w-7 shrink-0 text-[#A98B36]" strokeWidth={1.6} />
            <div>
              <p className="text-sm font-medium text-[#1F2923]">{item.label}</p>
              <p className="text-xs text-[#6B6B5F]">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- About ----------------
export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <img
            src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cc193838c313.jpg"
            alt="A Corner Spa therapist performing a calm facial treatment"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
            loading="lazy"
          />
          <div className="absolute -bottom-6 -right-4 hidden sm:block rounded-2xl bg-[#1F2923] px-6 py-4 text-[#F7F3EC] shadow-xl">
            <p className="font-display text-3xl text-[#C9A84C]">Live lab</p>
            <p className="text-xs text-[#B9B4A5]">Oryx Institute&apos;s first venture</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">About Corner Spa</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Rest, restored to a craft</h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3A3F35]">
            <p>
              Corner Spa exists for one reason: to give Windhoek a place where an hour of care is
              delivered like a craft, not a commodity. Quiet rooms, considered products, and
              therapists trained to a documented standard.
            </p>
            <p>
              We are also the Oryx Institute&apos;s first live venture - a working wellness and
              service-operations lab where Namibia&apos;s next spa professionals train under
              qualified supervision. When you book, you experience senior-standard care and fund
              the making of the industry&apos;s next generation.
            </p>
            <p>
              Everything is stated plainly: prices in the open, therapists by name, and a
              supervised trainee clearly labelled as one. What you see is what you get.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <BookButton event="about_book_click">Book Your Treatment</BookButton>
            <WhatsAppButton prefill={WA_PREFILL.custom} source="about" event="wa_click">Ask a question</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Treatments ----------------
export function Treatments() {
  return (
    <section id="treatments" className="bg-[#F2EDE2] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">The menu</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Treatments & prices, in the open</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3A3F35]">
            Every treatment, duration and price in Namibian dollars - no &quot;prices on request&quot;.
            Unsure what to choose? Send one WhatsApp message and we will match you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TREATMENT_CATEGORIES.map((cat) => (
            <div key={cat.id} className="rounded-2xl border border-[#1F2923]/10 bg-[#FBF8F2] p-6 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl text-[#1F2923]">{cat.title}</h3>
                <span className="text-xs italic text-[#6B6B5F]">{cat.blurb}</span>
              </div>
              <ul className="mt-4 divide-y divide-[#1F2923]/8">
                {cat.items.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#1F2923]">{item.name}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-[#6B6B5F]">{item.benefit}</p>
                        <p className="mt-1 text-xs text-[#A98B36]">
                          {item.durations.map((d) => d.minutes + " min · " + formatNAD(d.price)).join("  /  ")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <BookButton treatmentId={item.id} event="book_click" className="h-8 px-4 text-xs">
                        Book This Ritual
                      </BookButton>
                      <a href={waLink("Hi Corner Spa! I would like to book the " + item.name + ". What is available this week?")}
                        target="_blank" rel="noopener"
                        onClick={() => track("wa_click", { source: "treatment", treatment: item.id })}
                        className="inline-flex h-8 items-center rounded-md border border-[#25D366]/50 px-4 text-xs font-medium text-[#128C4B] hover:bg-[#25D366]/10">
                        <MessageCircle className="mr-1.5 h-3.5 w-3.5" /> Ask
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-[#6B6B5F]">
          Prefer paper? <a href="#contact" className="underline underline-offset-2 text-[#A98B36]">Request the PDF menu</a> - we will WhatsApp it to you.
        </p>
      </div>
    </section>
  );
}

// ---------------- Signatures ----------------
export function Signatures() {
  return (
    <section id="signatures" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">Signature rituals</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Three treatments we are known for</h2>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {SIGNATURES.map((s) => (
          <article key={s.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#1F2923]/10 bg-[#FBF8F2] shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={s.image} alt={s.alt} loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-[#1F2923]/85 px-3 py-1 text-xs text-[#C9A84C]">
                {s.minutes} minutes
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-[#1F2923]">{s.name}</h3>
                <p className="text-lg font-semibold text-[#A98B36]">{formatNAD(s.price)}</p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3A3F35]">{s.description}</p>
              <ul className="mt-4 space-y-1.5">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-[13px] text-[#3A3F35]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7C8C43]" /> {inc}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-2">
                <BookButton event="signature_book_click" className="flex-1">
                  Reserve This Ritual
                </BookButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---------------- Team ----------------
const LEVEL_LABEL: Record<string, string> = {
  senior: "Senior Therapist",
  therapist: "Therapist",
  trainee: "Trainee · supervised",
};

export function Team() {
  return (
    <section id="team" className="bg-[#1F2923] py-20 sm:py-24 text-[#F7F3EC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C9A84C]">The team</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Hands you can put a name to</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#C9C4B4]">
              A spa is a people business. Here is exactly who will care for you - qualifications,
              languages, specialties and all. Guests may request any therapist when booking.
            </p>
          </div>
          <img src={TEAM_GROUP_IMAGE} alt="The Corner Spa therapy team" loading="lazy"
            className="h-28 w-auto rounded-xl object-cover shadow-lg" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <article key={m.id} className="flex flex-col overflow-hidden rounded-2xl bg-[#28352D] shadow-lg">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.image} alt={"Portrait of " + m.name + ", " + m.role} loading="lazy"
                  className="h-full w-full object-cover object-top" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className={"inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] " +
                  (m.level === "trainee" ? "bg-[#C9A84C]/20 text-[#E4D08F]" : "bg-[#7C8C43]/25 text-[#B9C68A]")}>
                  {LEVEL_LABEL[m.level]}
                </p>
                <h3 className="mt-2 font-display text-xl">{m.name}</h3>
                <p className="text-sm text-[#C9C4B4]">{m.specialties.join(" · ")}</p>
                <p className="mt-3 flex-1 text-[13px] italic leading-relaxed text-[#B9B4A5]">
                  &ldquo;{m.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#9B977F]">
                  <BadgeCheck className="mr-1 inline h-3.5 w-3.5 text-[#C9A84C]" />{m.credentials}
                </p>
                <p className="mt-2 text-xs text-[#9B977F]">
                  {m.languages.join(" / ")} · {m.years} {m.years === 1 ? "year" : "years"}
                </p>
                <div className="mt-4 flex gap-2">
                  <BookButton therapistId={m.id} event="book_click" className="h-9 flex-1 px-3 text-xs">
                    Book with {m.name.split(" ")[0]}
                  </BookButton>
                  <a href={waLink("Hi Corner Spa! I would like to book with " + m.name + ". What is available this week?")}
                    target="_blank" rel="noopener"
                    onClick={() => track("wa_click", { source: "team", therapist: m.id })}
                    aria-label={"WhatsApp " + m.name}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#25D366]/50 text-[#7FE0A8] hover:bg-[#25D366]/15">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[#9B977F]">
          Our trainees only ever work under the direct supervision of a senior therapist, and every
          booking confirmation names your therapist in advance. That is the Corner Spa standard -
          and the point of the lab.
        </p>
      </div>
    </section>
  );
}

// ---------------- Gallery ----------------
export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">The space</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Recognise the room when you walk in</h2>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <button key={g.src} type="button"
            onClick={() => track("gallery_expand", { index: i })}
            className={"group relative overflow-hidden rounded-xl " + (i % 7 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")}>
            <img src={g.src} alt={g.alt} loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
    </section>
  );
}

// ---------------- Reviews ----------------
export function Reviews() {
  return (
    <section id="reviews" className="bg-[#F2EDE2] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">Guest words</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">What Windhoek says</h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-sm">
            <p className="font-display text-4xl text-[#1F2923]">{SPA.rating}</p>
            <div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <p className="text-xs text-[#6B6B5F]">{SPA.reviewCount} Google reviews · we reply to every one</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl bg-[#FBF8F2] p-6 shadow-sm">
              <Quote className="h-6 w-6 text-[#C9A84C]" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-[#3A3F35]">{t.text}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium text-[#1F2923]">{t.name}</span>
                <span className="text-[#6B6B5F]"> · {t.treatment}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-[#C9A84C]/40 bg-[#FBF8F2] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-sm text-[#3A3F35]">
            Visited us? One minute of your time keeps a small Namibian business visible - we read
            and answer every single review.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="h-10 border-[#1F2923]/30 text-[#1F2923]">
              <a href="https://g.page/r/placeholder-review-link/review" target="_blank" rel="noopener"
                onClick={() => track("review_widget_click")}>
                <Star className="mr-2 h-4 w-4 text-[#C9A84C]" /> Leave a Google review
              </a>
            </Button>
            <BookButton event="reviews_book_click" className="h-10">Book Now</BookButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Packages & memberships ----------------
export function Packages() {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">Packages & memberships</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">More spa for your month</h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <div key={p.id} className="flex flex-col rounded-2xl border border-[#1F2923]/10 bg-[#FBF8F2] p-6 shadow-sm">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl text-[#1F2923]">{p.name}</h3>
              <span className="text-xs text-[#6B6B5F]">{p.minutes} min</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-[#A98B36]">
              {formatNAD(p.price)}
              <span className="ml-2 text-sm font-normal text-[#6B6B5F] line-through">{formatNAD(p.worth)}</span>
            </p>
            <ul className="mt-4 flex-1 space-y-2">
              {p.includes.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#3A3F35]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7C8C43]" /> {i}
                </li>
              ))}
            </ul>
            <BookButton event="package_click" className="mt-5">Claim This Package</BookButton>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {MEMBERSHIPS.map((m) => (
          <div key={m.id} className={"relative flex flex-col rounded-2xl border p-6 sm:p-8 " +
            (m.featured ? "border-[#C9A84C] bg-[#1F2923] text-[#F7F3EC] shadow-lg" : "border-[#1F2923]/10 bg-[#FBF8F2]")}>
            {m.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-medium text-[#1F2923]">
                Most loved
              </span>
            )}
            <div className="flex items-baseline justify-between gap-4">
              <h3 className={"font-display text-2xl " + (m.featured ? "text-[#F7F3EC]" : "text-[#1F2923]")}>{m.name}</h3>
              <p className="text-2xl font-semibold text-[#C9A84C]">{formatNAD(m.price)}<span className="text-sm font-normal">/mo</span></p>
            </div>
            <ul className="mt-4 flex-1 space-y-2">
              {m.terms.map((t) => (
                <li key={t} className={"flex items-start gap-2 text-sm " + (m.featured ? "text-[#D8D3C6]" : "text-[#3A3F35]")}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7C8C43]" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2">
              <BookButton event="membership_click" className="flex-1">Join This Month</BookButton>
              <WhatsAppButton prefill={"Hi Corner Spa! I have a question about the " + m.name + " membership."}
                source="packages" event="wa_click"
                className={m.featured ? "text-[#7FE0A8] border-[#7FE0A8]/40" : ""}>
                Enquire
              </WhatsAppButton>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[#6B6B5F]">
        Corporate wellness or group bookings (hens, birthdays, teams):
        <a href={waLink("Hi Corner Spa! I would like to enquire about a group or corporate booking.")} target="_blank" rel="noopener"
          onClick={() => track("wa_click", { source: "corporate" })}
          className="ml-1 underline underline-offset-2 text-[#A98B36]">WhatsApp us for a quote</a>.
      </p>
    </section>
  );
}

// ---------------- Vouchers ----------------
export function Vouchers() {
  return (
    <section id="vouchers" className="bg-[#F2EDE2] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">Gift vouchers</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Give an hour, not another candle</h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#3A3F35]">
            Digital vouchers arrive on WhatsApp or email within the hour - the last-minute gift
            hero. Physical vouchers are wrapped and ready at reception. Valid 12 months.
          </p>
          <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
            {VOUCHER_AMOUNTS.map((v) => (
              <div key={v} className="rounded-xl border border-[#C9A84C]/40 bg-[#FBF8F2] p-4 text-center shadow-sm">
                <p className="font-display text-2xl text-[#1F2923]">{formatNAD(v)}</p>
                <p className="mt-1 text-[11px] text-[#6B6B5F]">any treatment</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <BookButton event="voucher_click" className="h-12 px-8">Send a Gift</BookButton>
            <WhatsAppButton prefill={WA_PREFILL.voucher} source="vouchers" event="wa_click" className="h-12">
              Custom amount on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
        <div className="relative">
          <img src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de468b47a145.jpg"
            alt="Corner Spa gift voucher presentation with towels and orchid" loading="lazy"
            className="aspect-[5/6] w-full rounded-2xl object-cover shadow-lg" />
        </div>
      </div>
    </section>
  );
}

// ---------------- First visit guide ----------------
const FIRST_VISIT_STEPS = [
  { icon: Clock, title: "Arrive 15 minutes early", text: "Time for a short consultation, a robe, and a breath before anything begins." },
  { icon: HeartHandshake, title: "Tell us everything", text: "Pressure, trouble spots, allergies, pregnancy - the 5-minute consultation shapes the hour." },
  { icon: Sparkles, title: "Bring nothing", text: "Lockers, gowns, towels and products are all here. Phones sleep in the basket." },
  { icon: Gem, title: "Choose your after", text: "Tea on the terrace, or drift straight back into the day. Both are correct." },
];

export function FirstVisit() {
  return (
    <section id="first-visit" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">First visit</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Never had a spa day? Here is exactly how it goes</h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FIRST_VISIT_STEPS.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-[#1F2923]/10 bg-[#FBF8F2] p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1F2923] text-[#C9A84C]">
                <s.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="font-display text-3xl text-[#C9A84C]/60">{i + 1}</span>
            </div>
            <h3 className="mt-4 font-medium text-[#1F2923]">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B5F]">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- FAQ ----------------
export function Faq() {
  return (
    <section id="faq" className="bg-[#F2EDE2] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">Good to know</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Questions, answered plainly</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={"faq-" + i} className="border-[#1F2923]/15">
              <AccordionTrigger onClick={() => track("faq_open", { index: i })}
                className="text-left text-[15px] font-medium text-[#1F2923] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-[#3A3F35]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 text-center">
          <WhatsAppButton prefill={WA_PREFILL.custom} source="faq" event="wa_click">
            Still wondering? Ask on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// ---------------- Visit (map & hours) ----------------
export function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A98B36]">Find us</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#1F2923]">Klein Windhoek, off the noise</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3A3F35]">{SPA.addressLine}</p>
          <p className="mt-1 text-sm text-[#6B6B5F]">Free on-site parking · two minutes from the Nelson Mandela Ave strip.</p>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#1F2923]/10">
            {SPA.hours.map((h) => (
              <div key={h.days} className="flex items-center justify-between bg-[#FBF8F2] px-4 py-2.5 text-sm [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[#1F2923]/8">
                <span className="text-[#3A3F35]">{h.days}</span>
                <span className="font-medium text-[#1F2923]">{h.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="outline" className="h-11 border-[#1F2923]/30 text-[#1F2923]"
              onClick={() => track("directions_click")}>
              <a href="https://www.google.com/maps/search/?api=1&query=Klein+Windhoek,+Windhoek,+Namibia"
                target="_blank" rel="noopener">
                <Navigation className="mr-2 h-4 w-4" /> Get Directions
              </a>
            </Button>
            <WhatsAppButton prefill="Hi Corner Spa! Could you send me directions and parking info please?"
              source="visit" event="wa_click">
              Ask about parking
            </WhatsAppButton>
          </div>
        </div>
        <div className="min-h-[320px] overflow-hidden rounded-2xl border border-[#1F2923]/10 shadow-sm">
          <iframe
            title="Map - Corner Spa, Klein Windhoek, Windhoek"
            src="https://www.google.com/maps?q=Klein%20Windhoek%2C%20Windhoek%2C%20Namibia&z=14&output=embed"
            className="h-full w-full min-h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

// ---------------- Contact ----------------
export function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("");
  const [messageText, setMessageText] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    track("form_submit", { interest });
    const msg = [
      "Hi Corner Spa! Enquiry from the website:",
      `Name: ${name}`,
      `Contact: ${contact}`,
      interest ? `Interested in: ${interest}` : "",
      messageText ? `Message: ${messageText}` : "",
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    setDone(true);
  };

  return (
    <section id="contact" className="bg-[#1F2923] py-20 sm:py-24 text-[#F7F3EC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C9A84C]">Contact</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">One message, and we take it from here</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#C9C4B4]">
            WhatsApp is fastest. Phone works too. Either way you get a person, within{" "}
            <span className="text-[#C9A84C]">15 minutes during opening hours</span> - that is a promise we publish.
          </p>
          <div className="mt-8 space-y-4">
            <a href={waLink(WA_PREFILL.general)} target="_blank" rel="noopener"
              onClick={() => track("wa_click", { source: "contact" })}
              className="flex items-center gap-4 rounded-xl border border-[#25D366]/30 bg-[#28352D] p-4 hover:border-[#25D366]/60 transition-colors">
              <MessageCircle className="h-6 w-6 text-[#7FE0A8]" />
              <div>
                <p className="font-medium">WhatsApp {SPA.whatsappDisplay}</p>
                <p className="text-sm text-[#9B977F]">Chat to book - answered by staff, not bots</p>
              </div>
            </a>
            <a href={SPA.phoneHref} onClick={() => track("contact_call_click")}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#28352D] p-4 hover:border-[#C9A84C]/50 transition-colors">
              <Award className="h-6 w-6 text-[#C9A84C]" />
              <div>
                <p className="font-medium">{SPA.phone}</p>
                <p className="text-sm text-[#9B977F]">For same-day requests and questions you would rather ask aloud</p>
              </div>
            </a>
            <p className="text-sm text-[#9B977F]">Prefer email? <a className="underline underline-offset-2 hover:text-white" href={"mailto:" + SPA.email}>{SPA.email}</a></p>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-[#FBF8F2] p-6 sm:p-8 text-[#1F2923] shadow-xl">
          <h3 className="font-display text-2xl">Send a structured enquiry</h3>
          <p className="mt-1 text-sm text-[#6B6B5F]">Five seconds to fill; it opens in WhatsApp ready to send.</p>
          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ct-name">Your name</Label>
              <Input id="ct-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ct-contact">Phone / WhatsApp</Label>
              <Input id="ct-contact" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+264 ..." inputMode="tel" className="bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ct-interest">I am interested in</Label>
              <Input id="ct-interest" value={interest} onChange={(e) => setInterest(e.target.value)}
                placeholder="e.g. couples massage, vouchers, membership" className="bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ct-msg">Message (optional)</Label>
              <Textarea id="ct-msg" value={messageText} onChange={(e) => setMessageText(e.target.value)}
                placeholder="Anything we should know?" className="bg-white min-h-24" />
            </div>
            <Button type="submit" className="w-full h-12 bg-[#C9A84C] text-[#1F2923] hover:bg-[#B08F3E]">
              Send Enquiry
            </Button>
            {done && (
              <p className="rounded-lg bg-[#7C8C43]/15 px-4 py-3 text-sm text-[#3A4A22]">
                Thank you - your enquiry is open in WhatsApp. Press send and we will reply within 15 minutes during opening hours.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
