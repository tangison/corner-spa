"use client";

import { useEffect, useState } from "react";
import { HOURS, TIME_ZONE } from "@/lib/spa";

const DAY_INDEX = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Current weekday and minute-of-day in Africa/Windhoek, independent of the
// visitor's own time zone. Namibia stays on UTC+2 all year.
function windhoekNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = Math.max(0, DAY_INDEX.indexOf(get("weekday")));
  const minutes = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  return { day, minutes };
}

function openStatus(): { open: boolean; text: string } {
  const { day, minutes } = windhoekNow();
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const rule = HOURS.find((h) => h.days.includes(d));
    if (!rule || !rule.open) continue;
    const openM = toMinutes(rule.open);
    if (offset === 0) {
      const closeM = rule.close ? toMinutes(rule.close) : openM;
      if (minutes >= openM && minutes < closeM) {
        return { open: true, text: "Open now" };
      }
      if (minutes < openM) {
        return { open: false, text: `Closed, opens at ${rule.open}` };
      }
      // Past closing time: keep looking at the following days.
      continue;
    }
    return { open: false, text: `Closed, opens ${DAY_NAMES[d]} ${rule.open}` };
  }
  return { open: false, text: "Closed" };
}

// Small live badge: "Open now" or "Closed, opens at ...", recalculated
// every minute from the Africa/Windhoek opening hours.
export function OpenNowBadge() {
  const [status, setStatus] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    // Server render and first client render agree: an empty, quiet slot.
    return <span className="open-badge" data-pending="true" aria-hidden="true" />;
  }

  return (
    <span className={`open-badge${status.open ? " is-open" : ""}`} role="status">
      <span className="open-dot" aria-hidden="true" />
      {status.text}
    </span>
  );
}

// The weekly hours, with the live badge on top. Shown on the booking
// section, the /book page and in the footer.
export function HoursList({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "hours hours-compact" : "hours"}>
      <OpenNowBadge />
      <dl>
        {HOURS.map((h) => (
          <div key={h.label} className="hours-row">
            <dt>{compact ? h.short : h.label}</dt>
            <dd>
              {h.open && h.close
                ? `${h.open} to ${h.close}`
                : h.note
                  ? h.note
                  : "Closed"}
            </dd>
          </div>
        ))}
      </dl>
      <p className="hours-note">All times Windhoek time.</p>
    </div>
  );
}
