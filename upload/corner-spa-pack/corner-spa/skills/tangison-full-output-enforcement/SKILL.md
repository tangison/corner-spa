---
name: tangison-full-output-enforcement
description: Enforces complete, unabridged output whenever a request needs full files, full documents, complete implementations, exhaustive lists, or a full site/landing page build — no placeholder code, no skipped sections, no "rest follows the same pattern." Use whenever the user asks for a full file, a complete component set, an unabridged deliverable, or a whole page/site build, and whenever a long output risks being compressed or truncated to fit.
---

# Tangison Full-Output Enforcement

## Baseline

Treat every deliverable as production-critical. A partial output is a broken output. Do not optimize for brevity — optimize for completeness. If the user asks for a full file, deliver the full file. If they ask for 5 components, deliver 5. If they ask for a landing page, deliver every section of it. No exceptions.

## Limitations (this skill doesn't override)

- Token limits, safety constraints, missing source context, or scope boundaries the user actually gave.
- Split long outputs into clearly labeled continuation chunks rather than compressing — see "Handling long outputs" below.
- Never invent unavailable code, credentials, private APIs, project files, or brand assets to satisfy a request for complete output. This is the same rule as the writing standard in `tangison-documents`: never fabricate registration numbers, testimonials, logos, or facts to fill a gap. Completeness means finishing everything real, not padding with invented content.

## Banned output patterns

Hard failures — never produce these, in code or documents:

**In code blocks:** `// ...`, `// rest of code`, `// implement here`, `// TODO`, `/* ... */`, `// similar to above`, `// continue pattern`, `// add more as needed`, `<!-- rest of sections -->`, `<!-- add more sections as needed -->`, bare `...` standing in for omitted content.

**In prose:** "Let me know if you want me to continue," "I can add more if needed," "for brevity, I'll show just X," "the rest follows the same pattern," "similarly for the remaining," "and so on" (when replacing actual content), "I'll leave that as an exercise" / "I'll leave that for you to customize."

**Structural shortcuts:** outputting a skeleton or wireframe when a full implementation was requested; showing the first and last piece while skipping the middle; replacing repeated logic or repeated sections with one example plus a description; describing what something should contain instead of writing it.

## Execution process

1. **Scope** — read the full request. Count how many distinct deliverables are expected (files, functions, sections, components, answers). Lock that number before starting.
2. **Build** — generate every deliverable completely. No partial drafts, no "you can extend this later."
3. **Cross-check** — before responding, re-read the original request and compare your deliverable count against the locked scope count. If anything is missing, add it before responding.

## Handling long outputs

When a response approaches the token limit:

- Do not compress remaining sections to squeeze them in.
- Do not skip ahead to a conclusion or the footer.
- Write at full quality up to a clean breakpoint (end of a function, end of a file, end of a complete section/tag).
- End with: `[PAUSED — X of Y complete. Send "continue" to resume from: next section name]`
- On "continue," pick up exactly where you stopped — no recap, no re-outputting earlier content, no repetition.

## Domain profile: full landing page / site builds

When the deliverable is a complete landing page or site (not just a component), the scope count from Step 1 is never fewer than these 7 sections unless the user explicitly asked for less: nav, hero, social proof / trust element, features (3–5 minimum), testimonials or case studies, primary CTA, footer.

Required elements:
- Complete document from opening doctype/head through closing tag — proper meta tags, the project's established stack (per `tangison-web-ecosystem`: Next.js/Convex/Vercel/Cloudflare, Poppins typeface) unless the user specifies a different one for that build.
- Scroll/interaction JavaScript wired up, not stubbed.
- Every section has real, audience-appropriate content in the requested language — no placeholder or lorem ipsum text.
- Every section has full responsive classes across breakpoints.
- Every interactive element has hover/active states.
- Every image has lazy loading, alt text, and a valid source — never a placeholder src.
- Every icon is a real icon reference, not a described one.
- Stays inside the standing sub-500KB page-transfer budget (per `tech-stack`) — completeness never becomes an excuse to blow the performance budget; trim asset weight, not sections.

## Quick check before finalizing any response

- No banned pattern from the list above appears anywhere.
- Every item the user requested is present and finished.
- For a full build: the document is complete from open to close, and all required sections/elements above are present.
- Code blocks contain actual runnable code or complete markup — not descriptions of what it would contain.
- Nothing was shortened, summarized, or omitted to save space.
