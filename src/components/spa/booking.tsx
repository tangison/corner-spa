"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ALL_TREATMENTS, BOOKING_SLOTS, SPA, TEAM, TREATMENT_CATEGORIES, formatNAD, track, waLink } from "@/lib/spa";
import { MessageCircle, Phone, CalendarCheck, CheckCircle2 } from "lucide-react";

// ---------------- context ----------------
type BookingContextValue = {
  openBooking: (treatmentId?: string, therapistId?: string) => void;
  openWith: (prefill: string) => void;
};

const BookingContext = createContext<BookingContextValue>({
  openBooking: () => {},
  openWith: () => {},
});

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [treatmentId, setTreatmentId] = useState<string>("");
  const [therapistId, setTherapistId] = useState<string>("any");
  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [sent, setSent] = useState(false);

  const openBooking = useCallback((tid?: string, thid?: string) => {
    setTreatmentId(tid ?? "");
    setTherapistId(thid ?? "any");
    setSent(false);
    setOpen(true);
    track("book_modal_open", { treatment: tid ?? "none", therapist: thid ?? "any" });
  }, []);

  const openWith = useCallback((_prefill: string) => {
    // reserved for future direct-WhatsApp flows; booking modal is default
    openBooking();
  }, [openBooking]);

  const value = useMemo(() => ({ openBooking, openWith }), [openBooking, openWith]);

  const today = new Date().toISOString().split("T")[0];
  const treatment = ALL_TREATMENTS.find((t) => t.id === treatmentId);
  const therapist = TEAM.find((m) => m.id === therapistId);

  const message = () => {
    const lines = [
      "Hi Corner Spa! I would like to book:",
      `Treatment: ${treatment ? treatment.name : "Advise me"}`,
      `Date: ${date || "flexible"}`,
      `Time: ${slot || "flexible"}`,
      `Therapist: ${therapist ? therapist.name : "No preference"}`,
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
    ];
    return lines.join("\n");
  };

  const submit = () => {
    track("booking_submit", { treatment: treatmentId, date, slot, therapist: therapistId });
    setSent(true);
    window.open(waLink(message()), "_blank", "noopener");
  };

  const valid = !!treatmentId && !!date && !!slot && name.trim().length > 1;

  return (
    <BookingContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-[#FBF8F2] border-[#C9A84C]/40 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#1F2923]">
              {sent ? "Almost booked" : "Book your treatment"}
            </DialogTitle>
            <DialogDescription className="text-[#6B6B5F]">
              {sent
                ? "Your WhatsApp booking message is open - press send and we will confirm your slot within 15 minutes during opening hours."
                : "Pick a treatment, a time and leave the rest to us. Booking confirms on WhatsApp."}
            </DialogDescription>
          </DialogHeader>

          {sent ? (
            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3 rounded-lg border border-[#C9A84C]/50 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#7C8C43]" />
                <div className="text-sm text-[#3A3F35]">
                  <p className="font-medium text-[#1F2923]">{treatment?.name} - {date} {slot}</p>
                  <p className="mt-1 text-[#6B6B5F]">{therapist ? "with " + therapist.name : "with an available therapist"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild className="bg-[#25D366] text-white hover:bg-[#1FB357] h-11">
                  <a href={waLink(message())} target="_blank" rel="noopener" onClick={() => track("wa_click", { source: "booking_confirm" })}>
                    <MessageCircle className="mr-2 h-4 w-4" /> Resend on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-11 border-[#1F2923]/30 text-[#1F2923]">
                  <a href={SPA.phoneHref}><Phone className="mr-2 h-4 w-4" /> Or call {SPA.phone}</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-1">
              <div className="space-y-1.5">
                <Label htmlFor="bk-treatment" className="text-[#1F2923]">Treatment</Label>
                <Select value={treatmentId} onValueChange={(v) => setTreatmentId(v)}>
                  <SelectTrigger id="bk-treatment" className="w-full bg-white border-[#1F2923]/20 h-11">
                    <SelectValue placeholder="Choose a treatment" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {TREATMENT_CATEGORIES.map((cat) => (
                      <SelectGroup key={cat.id}>
                        <SelectLabel className="text-[#6B6B5F]">{cat.title}</SelectLabel>
                        {cat.items.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name} · {formatNAD(item.durations[0].price)}+
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="bk-date" className="text-[#1F2923]">Date</Label>
                  <Input id="bk-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)}
                    className="bg-white border-[#1F2923]/20 h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#1F2923]">Time</Label>
                  <Select value={slot} onValueChange={setSlot}>
                    <SelectTrigger className="w-full bg-white border-[#1F2923]/20 h-11">
                      <SelectValue placeholder="Slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {BOOKING_SLOTS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[#1F2923]">Therapist</Label>
                <Select value={therapistId} onValueChange={setTherapistId}>
                  <SelectTrigger className="w-full bg-white border-[#1F2923]/20 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">No preference</SelectItem>
                    {TEAM.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} · {m.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="bk-name" className="text-[#1F2923]">Your name</Label>
                  <Input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                    className="bg-white border-[#1F2923]/20 h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bk-phone" className="text-[#1F2923]">Phone / WhatsApp</Label>
                  <Input id="bk-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+264 ..."
                    className="bg-white border-[#1F2923]/20 h-11" inputMode="tel" />
                </div>
              </div>

              <Button disabled={!valid} onClick={submit} className="w-full h-12 text-base bg-[#C9A84C] text-[#1F2923] hover:bg-[#B08F3E]">
                <CalendarCheck className="mr-2 h-5 w-5" /> Confirm on WhatsApp
              </Button>
              <p className="text-center text-xs text-[#6B6B5F]">
                No prepayment here - a deposit link is only sent for 90+ minute bookings and peak slots.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}

// ---------------- CTA buttons ----------------
export function BookButton({
  treatmentId, therapistId, children, className = "", event,
}: {
  treatmentId?: string;
  therapistId?: string;
  children: React.ReactNode;
  className?: string;
  event?: string;
}) {
  const { openBooking } = useBooking();
  return (
    <Button
      onClick={() => {
        if (event) track(event, { treatment: treatmentId, therapist: therapistId });
        openBooking(treatmentId, therapistId);
      }}
      className={"h-11 px-6 text-sm font-medium bg-[#C9A84C] text-[#1F2923] hover:bg-[#B08F3E] " + className}
    >
      {children}
    </Button>
  );
}

export function WhatsAppButton({
  prefill, children, className = "", event, source,
}: {
  prefill: string;
  children: React.ReactNode;
  className?: string;
  event?: string;
  source?: string;
}) {
  return (
    <a
      href={waLink(prefill)}
      target="_blank"
      rel="noopener"
      onClick={() => { if (event) track(event, { source }); }}
      className={"inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-sm font-medium transition-colors border border-[#25D366]/60 text-[#128C4B] hover:bg-[#25D366]/10 " + className}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}
