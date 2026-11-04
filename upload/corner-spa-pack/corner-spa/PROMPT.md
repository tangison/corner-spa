# Prompt for the AI agent: Corner Spa website

Build and finish the Corner Spa website. Start from reference-design.html: the layout and look are approved, so keep them. Everything in the "Hard-coded facts" section is final. Use it exactly as written and do not ask for it again.

## Hard-coded facts
- Business: Corner Spa, Windhoek, Namibia
- Tagline: The relaxation you deserve.
- Booking phone: +264 81 623 4788
- WhatsApp: https://wa.me/264816234788
- Site addresses (show both on the page): spa.mendozer.com and oryxinstitute.org/corner-spa
- Relationship: Corner Spa is the first project of Oryx Institute, and a concept by Mendozer Investments. Mendozer Investments is the financing partner. Oryx Institute is the operations lead.
- Footer line 1: First project of Oryx Institute. A concept by Mendozer Investments.
- Footer line 2: spa.mendozer.com · oryxinstitute.org/corner-spa
- Footer credit: Made by Tangison Studio, linking to https://studio.tangison.com
- Colours: #F5F3EE (background), #2B2726 (text), #A89076 (accent). Nothing else.
- Fonts: Lora (headlines), Montserrat Light (body)
- Logo: always use the real textured logo images in assets/logos/ (the rock texture is the brand). You may switch to the light version on dark backgrounds, but never redraw it as a flat vector, never tint it and never put an overlay on it.

## Prices (final, from the owner's handwritten list)
Use prices.json exactly, formatted as N$ 500. Groups: massage, nails, waxing. Facials have no price yet: show "Facials: ask us for prices." Two readings are marked "confirm" in prices.json: keep them as shown and list them in your final reply for the owner to confirm.

## Still to come from the owner
A second booking number and the street address. Until they are supplied, leave them out completely. Never invent them and never show a placeholder. Keep them in one clearly marked block so the owner can add them in one place.

## How the two addresses work
spa.mendozer.com is the real site. oryxinstitute.org/corner-spa shows the same site as a full-screen iframe (use oryx-embed/index.html and follow oryx-embed/README.md). Visitors see only the spa site. Allow framing by oryxinstitute.org through a frame-ancestors header. Pressing Back must return to the Oryx website: while embedded, never change the URL hash and never push history entries, so use scrolling instead of hash links.

## Connect the three
Link Mendozer Investments, Oryx Institute and Corner Spa to each other. On the spa site, add a quiet link to each partner's official website. Research the correct URLs from official sources and never guess them. Add a link back to the spa from the partner pages as well if you have access to them, and list any you cannot reach.

## Research
Research Mendozer Investments and Oryx Institute from official sites, Namibian business registries and credible news. Use only verifiable facts. List anything you could not verify at the end of your reply.

## Assets
- assets/logos/: marks, wordmark, stacked and horizontal lockups (dark and light), avatars, favicons
- assets/photos/: the owner's real close-up photos (hot stones, facial, black pebbles, leaf, sand, towel). Use these first. A few carry a faint dotted overlay in the lower part, so replace them with clean versions when available.
- assets/imagery/ and assets/generated/: more photographs. Images in assets/generated/ are made separately from IMAGE-BRIEF.md. Use them as they arrive and fall back to assets/imagery/ until then. Every image is a close-up with plenty of empty space.
- assets/style-references/: the tone and texture to match.
- brand/brand-notes.md and contacts.json repeat the facts above.
- skills/: the Tangison skills. Apply them where they do not conflict with this prompt. This prompt wins.
No stock photos.

## Design
Ultra minimalist, like a gallery. No sliders, popups, animations or icon grids. Mobile first, fast, accessible, dark mode.

## Content (calm, plain Namibian English; N$ prices, +264 phones, Windhoek addresses)
1. Hero: The relaxation you deserve.
2. Price list: massage, nails, waxing and facials, from prices.json.
3. Gallery: close-up images only.
4. One venture, two partners: Mendozer Investments and Oryx Institute.
5. Book now: phone and WhatsApp, and both addresses.
6. Footer: as in the hard-coded facts.

## Technical
Static HTML and CSS, minimal JavaScript. SEO and Open Graph tags with Namibia local-business schema, favicon, 404 page. No em dashes anywhere. Deliver files ready to host.
