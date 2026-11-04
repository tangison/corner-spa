# BRIEF.md - Corner Spa scroll build

Status: **Self-authored under explicit creative delegation.** The user said "just
put it up", "add some nice scroll effects and scroll to top and all of that good
widget", and supplied a complete brand pack with an approved reference design
(reference-design.html), so the eight interview topics are answered from the pack
(brand/brand-notes.md, PROMPT.md, prices.json, contacts.json) and the approved
layout, with the remaining decisions marked authored.

## The eight topics

1. **Vibe**: "Ultra minimalist, like a gallery. Lots of white space, no
   decoration." (brand-notes.md, verbatim). Reference medium: the owner's own
   close-up photography of wet stone, sand and leaf, and a handwritten price list.
2. **Scroll journey** (from the approved reference structure, section order kept):
   hero statement, full-bleed breath, price list, quiet quote, gallery, the two
   partners, book. Last thing: the phone number and WhatsApp.
3. **Energy curve**: calm the whole way down, with one slower, deeper moment at
   the quote band. No loud section anywhere.
4. **Feeling stage by stage**: recognised (this is a quiet place) → informed
   (honest prices, nothing to decode) → stilled (the quote band) → trusting (real
   photos, real partners) → ready (one phone number, one WhatsApp). **The ONE
   moment**: the pinned sand band where "Slow, quiet and unhurried." assembles
   word by word while the ripples drift. Peak lives in the quote act.
5. **One thing no site does**: the price list is a scan of a real handwritten
   owner's list turned into honest, bookable rows where every row itself opens
   WhatsApp with the right words already typed.
6. **Range**: premium-minimal (brand names it).
7. **One world or scenes**: distinct quiet scenes, hard edges between sections,
   no camera flight. Grammar: chaptered editorial flow with one pinned peak.
8. **Assets**: the owner's real photos (assets/photos/), imagery
   (assets/imagery/), real textured logo marks (assets/logos/), flyers. No
   generation needed; no kie.ai spend.

## Feeling curve

| Beat | Section | Emotion | What causes it |
|---|---|---|---|
| Recognition | Hero | Recognised, exhale | Plain type on cream, mark floats gently |
| Breath | Leaf-and-stone band | Space | Full-bleed photo, layers part at different rates |
| Substance | Price list | Trust | Sticky photo beside honest N$ rows that book directly |
| **Peak** | Quote band | Stilled | Pin: ripples drift, line assembles word by word |
| Range | Gallery | Curiosity | Close-ups arrive in sequence, iris wipe once |
| Proof | The venture | Confidence | Two partners, one sentence each |
| Commitment | Book | Ready | Phone in Lora, form opens WhatsApp directly |

## The peak

"The moment the page went quiet and made me want to book." Lives in the quote
act (pin, span 2.4), which holds the largest scroll span on the page after the
hero's natural screen.

## Tell-someone sentence

It's the site where a spa price list feels like a gallery wall and booking is
one tap on WhatsApp.

## Authored silence

Sections between the peak and the close are deliberately device-light (staggered
entry only) so the close reads as resolution, not fatigue.

## Hard rules from the pack that outrank skill defaults

- Colours exactly #F5F3EE / #2B2726 / #A89076 (reference derives sand/mute/line
  tones from these; keep them).
- Fonts exactly Lora (headlines) + Montserrat Light (body).
- Real textured logo images only; never redraw, tint or overlay the rock mark.
- No em dashes anywhere. N$ prices exactly as prices.json. No invented
  statistics, no counters (pre-launch brand: no verified figures).
- Street address and second phone: omitted completely until supplied, kept in
  one marked block in src/lib/spa.ts.
- Never change the URL hash while embedded in oryxinstitute.org/corner-spa;
  in-page anchors scroll without history entries.
