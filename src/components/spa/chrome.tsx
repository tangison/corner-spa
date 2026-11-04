"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { BookButton, WhatsAppButton } from "@/components/spa/booking";
import { NAV_LINKS, SPA, WA_PREFILL, track, waLink } from "@/lib/spa";
import { MessageCircle, Menu, Phone, Star, X } from "lucide-react";

// ---------------- Announcement bar ----------------
export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="relative bg-[#1F2923] text-[#F7F3EC] text-center text-xs sm:text-sm py-2 px-10">
      <span>
        Opening Special - <strong className="text-[#C9A84C]">20% off your first treatment</strong>. Book via WhatsApp.
      </span>
      <a href={waLink("Hi Corner Spa! I would like to claim the 20% first-visit special.")} target="_blank" rel="noopener"
        onClick={() => track("promo_click", { placement: "announcement" })}
        className="ml-2 underline underline-offset-2 text-[#C9A84C] hover:text-[#DCC581]">
        Claim it
      </a>
      <button aria-label="Dismiss announcement" onClick={() => setHidden(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F7F3EC]/70 hover:text-white p-1">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ---------------- Header ----------------
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 w-full border-b border-[#1F2923]/10 bg-[#FBF8F2]/95 backdrop-blur transition-shadow " +
        (scrolled ? "shadow-[0_2px_16px_rgba(31,41,35,0.08)]" : "")
      }
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={"flex items-center justify-between gap-4 transition-all " + (scrolled ? "h-14" : "h-16")}>
          <a href="#top" className="flex items-center gap-2" aria-label="Corner Spa home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1F2923] text-[#C9A84C] font-display text-lg leading-none">C</span>
            <span className="font-display text-xl tracking-wide text-[#1F2923]">Corner Spa</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm text-[#3A3F35] hover:text-[#A98B36] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={SPA.phoneHref} className="hidden sm:inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm text-[#3A3F35] hover:text-[#A98B36]"
              onClick={() => track("header_call_click")}>
              <Phone className="h-4 w-4" /> <span className="hidden xl:inline">{SPA.phone}</span>
            </a>
            <BookButton event="nav_book_click" className="hidden sm:inline-flex">Book Now</BookButton>
            <button
              className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-[#1F2923]/15 text-[#1F2923]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-[#1F2923]/10 bg-[#FBF8F2] px-4 pb-4 pt-2">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="border-b border-[#1F2923]/5 py-3 text-[#3A3F35]">
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-4">
              <BookButton event="nav_book_click" className="flex-1">Book Now</BookButton>
              <WhatsAppButton prefill={WA_PREFILL.general} source="mobile_menu" className="flex-1" event="wa_click">WhatsApp</WhatsAppButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// ---------------- Floating WhatsApp ----------------
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={waLink(WA_PREFILL.general)}
      target="_blank"
      rel="noopener"
      aria-label="Chat to book on WhatsApp"
      onClick={() => track("wa_float_click")}
      className={
        "fixed right-4 bottom-20 sm:bottom-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 transition-all hover:bg-[#1FB357] " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none")
      }
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium pr-1">Chat to book</span>
    </a>
  );
}

// ---------------- Sticky mobile action bar ----------------
export function StickyMobileBar() {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#1F2923]/10 bg-[#FBF8F2]/97 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-3 h-16">
        <a href={SPA.phoneHref} onClick={() => track("sticky_call_click")}
          className="flex flex-col items-center justify-center gap-0.5 text-[#3A3F35]">
          <Phone className="h-5 w-5" /><span className="text-[11px]">Call</span>
        </a>
        <a href={waLink(WA_PREFILL.general)} target="_blank" rel="noopener" onClick={() => track("sticky_wa_click")}
          className="flex flex-col items-center justify-center gap-0.5 text-[#128C4B] border-x border-[#1F2923]/10">
          <MessageCircle className="h-5 w-5" /><span className="text-[11px]">WhatsApp</span>
        </a>
        <BookButton event="sticky_book_click" className="w-full rounded-none h-16 bg-[#C9A84C] text-[#1F2923] text-sm">
          Book Now
        </BookButton>
      </div>
    </div>
  );
}

// ---------------- Exit intent (desktop, once per session) ----------------
export function ExitIntentOffer() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window.sessionStorage.getItem("cs_exit_shown")) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !window.sessionStorage.getItem("cs_exit_shown")) {
        window.sessionStorage.setItem("cs_exit_shown", "1");
        setOpen(true);
        track("exit_intent_view");
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-[#FBF8F2] border-[#C9A84C]/40 text-center">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-[#1F2923]">Before you go -</DialogTitle>
          <DialogDescription className="text-[#6B6B5F]">
            first visits are 20% off this month. One quiet hour might fix a loud week.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 pt-2">
          <WhatsAppButton prefill="Hi Corner Spa! I would like to claim the 20% first-visit special."
            source="exit_intent" event="exit_intent_claim" className="w-full">
            Claim 20% Off on WhatsApp
          </WhatsAppButton>
          <Button variant="ghost" onClick={() => setOpen(false)} className="text-[#6B6B5F]">
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------- Footer ----------------
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#1F2923] text-[#D8D3C6]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-[#F7F3EC]">Corner Spa</p>
          <p className="mt-3 text-sm leading-relaxed text-[#B9B4A5]">
            {SPA.tagline}. A venture of the Oryx Institute, with operations by Mendozer.
          </p>
          <div className="mt-4 flex items-center gap-1 text-sm text-[#C9A84C]">
            <Star className="h-4 w-4 fill-[#C9A84C]" /> {SPA.rating} · {SPA.reviewCount} Google reviews
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">Visit</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{SPA.addressLine}</li>
            {SPA.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 text-[#B9B4A5]">
                <span>{h.days}</span><span className="text-[#D8D3C6]">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-white" href={SPA.phoneHref}>{SPA.phone}</a></li>
            <li><a className="hover:text-white" href={waLink(WA_PREFILL.general)} target="_blank" rel="noopener">WhatsApp {SPA.whatsappDisplay}</a></li>
            <li><a className="hover:text-white" href={"mailto:" + SPA.email}>{SPA.email}</a></li>
            <li className="text-[#B9B4A5]">{SPA.responsePromise}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a className="hover:text-white" href={l.href}>{l.label}</a></li>
            ))}
            <li><a className="hover:text-white" href="#faq">FAQ</a></li>
          </ul>
          <p className="mt-4 text-xs text-[#8B887B]">Policies: privacy · terms · cancellation</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8B887B]">
          <p>© {new Date().getFullYear()} Corner Spa. All rights reserved.</p>
          <p>A venture of the Oryx Institute · Operations by Mendozer</p>
        </div>
      </div>
    </footer>
  );
}
