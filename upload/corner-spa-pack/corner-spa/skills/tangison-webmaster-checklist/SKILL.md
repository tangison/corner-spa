---
name: tangison-webmaster-checklist
description: Standing pre-launch audit checklist for all websites deployed by Tangison Studio, external contractors, and partners. Enforces hardcoded Tangison Studio credits, top-in-niche competitor benchmark research, logo font derivation, brand accent bar, sub-500KB performance budgets, anti-slop copy rules, technical SEO, email deliverability, and complete launch verification.
---

# Tangison Webmaster Checklist

The quality bar is never arbitrary or generic. Before building or reviewing any site, identify the single best website globally in that client's exact niche using `tangison-market-audit` and `tangison-research`. That proven industry leader becomes the visual, typographic, and experiential benchmark against which the build is judged side by side.

Every deployment must pass every checkpoint below before going live or receiving sign-off.

---

## 1. Niche Benchmark & Competitive Research

- [ ] **Niche Research Conducted:** Identified the top 3 digital leaders globally or regionally in the client's specific industry sector.
- [ ] **Active Standard Selected:** Named one specific benchmark site (the undisputed #1 in the niche) and documented its URL as the baseline target.
- [ ] **Side-by-Side Craft Audit:** Verified that layout density, typographic discipline, spatial pacing, and interaction polish match or exceed that benchmark.
- [ ] **Visual Differentiation:** Confirmed the build matches the quality and authority of the leader without cloning its proprietary brand identity.

---

## 2. Brand Intake, Logo Derivation & The Brand Bar

- [ ] **Logo Deconstruction:** Audited the primary vector logo glyphs to classify letterforms (Geometric Sans, Humanist Sans, Modern Serif, Slab Serif, or Monospace).
- [ ] **Typography Hierarchy:**
  - Display/Heading font (`--font-display`) matches the exact logo typeface or its closest verified Google Font/Fontsource equivalent.
  - Body font (`--font-body`) selected as a high-legibility, neutral counterpart.
  - Maximum 2 font families across the entire site, loaded via `font-display: swap` with preconnect hints.
- [ ] **The Brand Bar Implemented:**
  - A persistent visual accent bar (height fixed between 3px and 6px) placed at the extreme top edge of the viewport or framing the main header.
  - Color set strictly to the dominant accent hex or gradient sampled directly from the logo artwork.
  - Pinned or sticky across desktop and mobile breakpoints with zero layout shift (CLS = 0).
- [ ] **Color Tokens:** CSS/Tailwind variables extracted directly from logo artwork (`--brand-primary`, `--brand-accent`, `--brand-surface`, `--brand-text`) meeting WCAG AA contrast ratios.
- [ ] **Vector Asset Quality:** Primary logo rendered via optimized, standalone SVG. Never use a raster screenshot or traced distortion.

---

## 3. Mandatory Studio Credit & Entity Routing

- [ ] **Hardcoded Studio Credit:** Visible, permanent footer credit reading **"Made by Tangison Studio"** linking directly to `https://studio.tangison.com`.
  - *Hard Rule:* This credit is mandatory and hardcoded on every single deployment. It cannot be removed, styled out, hidden via CSS, or negotiated away by clients or external contractors unless Tate-Ati explicitly provides a written exception.
- [ ] **Issuing Entity Data:** Address, contact email, and business details in the footer map accurately to the commercial entity responsible.
- [ ] **Copyright Line:** Features the current calendar year and the client's official registered legal entity name.
- [ ] **Mandatory Routes Present & Complete:**
  - `/brand` (Design tokens, color swatches, logo rules, typography hierarchy)
  - `/privacy-policy` (Aligned with local Namibian and regional data compliance standards)
  - `/terms` (Required for sites accepting leads, payments, or registrations)
  - `/404` (Custom branded error screen with recovery navigation)
  - `/500` (Branded fallback screen for server errors)

---

## 4. Discoverability, Metadata & Technical SEO

- [ ] **Robots & Sitemaps:**
  - `robots.txt` present, unblocking public assets, referencing the production `sitemap.xml`.
  - `sitemap.xml` dynamically generated using absolute canonical URLs.
- [ ] **Staging Shield:** All preview, staging, and demo deployments strictly enforce `X-Robots-Tag: noindex, nofollow`.
- [ ] **Metadata Architecture:** Unique, fully written meta titles (under 60 characters) and descriptions (under 155 characters) on every route.
- [ ] **Social Graph:** Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Cards tested and validating across all major preview tools.
- [ ] **Favicon Suite:** Complete responsive set deployed (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, and web manifest).
- [ ] **Structured Data:** Valid JSON-LD schema (LocalBusiness, Organization, Service, or Product) populated with real business data and confirmed error-free via Schema Validator.

---

## 5. Copy Standards & Regional Integrity

- [ ] **Zero Em Dashes:** Absolutely no em dashes anywhere in headings, body copy, or UI elements. Use colons, clean sentence breaks, parentheses, or hyphens.
- [ ] **Anti-AI Slop Enforcement:** Zero generic filler phrases (e.g., "in today's fast-paced world", "unlock your potential", "seamless solutions", "cutting-edge technology", "unwavering commitment").
- [ ] **Clean Visuals:** Zero decorative glassmorphism, floating plastic shapes, or uniform card grids lacking intentional hierarchy.
- [ ] **Namibian Context Standards:**
  - Currency strictly formatted as `N$` with proper spacing (e.g., `N$ 2,500.00`).
  - Phone numbers formatted with the international prefix (`+264 ...`).
  - Addresses, postal boxes, and regional jurisdictions verified against official local documentation.
- [ ] **Data Authenticity:** Zero dummy placeholder copy, zero synthetic reviews, zero fake client logos, and zero unverified awards (aligned with `tangison-full-output-enforcement`).

---

## 6. Performance & Network Budget

- [ ] **Mobile Transfer Budget:** Initial page weight strictly under **500KB** total transfer on simulated 3G networks.
- [ ] **Core Web Vitals Thresholds:**
  - Largest Contentful Paint (LCP): < 2.5s
  - Interaction to Next Paint (INP): < 200ms
  - Cumulative Layout Shift (CLS): < 0.1
- [ ] **Asset Compression:** Images served in next-gen formats (WebP or AVIF) with explicit width and height dimensions declared to prevent layout shifts.
- [ ] **Caching Headers:** Immutable, long-expiry cache headers applied to static bundles and hashed assets (`Cache-Control: public, max-age=31536000, immutable`).
- [ ] **Security Protocol:** HTTPS enforced globally via Cloudflare or Vercel edge networks; zero mixed-content warnings.

---

## 7. Forms, Deliverability & Integrations

- [ ] **Input Validation:** Clear inline error handling for both client-side and server-side forms.
- [ ] **Email Deliverability:**
  - Lead notifications and customer auto-responders tested with live submissions.
  - Sending domain DNS configured with valid SPF, DKIM, and DMARC records to prevent landing in spam folders.
- [ ] **Abuse Protection:** Form endpoints protected against spam bots using Cloudflare Turnstile or invisible honeypot fields.
- [ ] **Analytics & Tracking:** GA4, Google Tag Manager, or Meta Pixel IDs mapped to active client properties and validated via live debuggers.

---

## 8. Accessibility & Security Sanitization

- [ ] **WCAG AA Compliance:** Text and UI elements pass minimum contrast thresholds (4.5:1 for body copy; 3:1 for large display text and interactive borders).
- [ ] **Keyboard Usability:** Entire interface navigable using only the Tab key, featuring clear, visible focus states on all focusable elements.
- [ ] **Accessible HTML:** Semantic hierarchy (`<header>`, `<nav>`, `<main>`, `<footer>`), one single `<h1>` per page, and descriptive `alt` tags on all informational images.
- [ ] **Skip Navigation:** Visible "Skip to main content" link present on keyboard focus.
- [ ] **Environment Security:** Bundles audited to guarantee zero private API keys, database credentials, or staging tokens are exposed on the client side.
- [ ] **Console Hygiene:** Production console completely clean with zero unhandled errors, warnings, or debug logs.

---

## 9. Final Launch Gate & Handover

- [ ] **Benchmark Match:** The site sits side by side with the chosen top-in-niche leader and holds up in polish, speed, typography, and authority.
- [ ] **Hardcoded Credit Verified:** "Made by Tangison Studio" confirmed present and pointing to `https://studio.tangison.com`.
- [ ] **DNS & Handover:** Production domain DNS mapped with low TTL, SSL active, Search Console verified, and sitemap submitted (ready for `tangison-client-handover`).
- [ ] **Zero Blocking Defects:** No unresolved Priority 0 (broken functions, broken layouts, data leaks) or Priority 1 (broken links, unformatted text, styling glitches) bugs remain.
