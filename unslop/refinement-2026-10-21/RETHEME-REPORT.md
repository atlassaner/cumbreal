# Cumbreal — local public website refinement

October 21, 2026. The suitable presentation ideas are implemented locally: a more expressive Cumbi hero, clear proposed pricing cards and a cinematic summit footer. The Unslop polish then corrected a real background-contrast defect and improved the mobile journey labels.

**Final scoped checklist: 30/30 (100%), compared with 29/30 (96.7%) for the first new implementation.** The existing approved site already had a prior 30/30 audit. This score change describes fixing the newly introduced footer regression, not a claim that the original Cumbreal design was poor.

## What changed and why

| Area | Result |
| --- | --- |
| Hero | Existing Spanish headline, split layout and flat Cumbi remain. Contour artwork and an amber route make the learning journey concrete; a secondary method link gives visitors a lower-commitment next step. |
| Pricing | Reusable server-rendered `PricingSection` is used on institutions only. Cards read Gratis → proposed $250 four-week pilot → proposed $500/month institutional plan. Deep-teal labels, ruled rows, 48px tabular prices and aligned actions improve comparison. |
| Honest scope | Existing descriptions, up-to-100-student coverage, no platform billing, pending institutional panel/reporting, hypothetical $5 individual access and tailored-expansion wording are retained. Current capabilities use checks; proposed terms use arrows and explicit caveats. |
| Footer | Optimized teal/cream/amber summit poster, deliberate mobile crop, bounded scenic CTA and cream glass navigation panel. Existing real routes, privacy and contact email remain the only destinations. No fake social profiles or services. |
| Keyboard navigation | Menu toggle now has an explicit type and controlled hidden navigation node. Escape closes the disclosure and restores focus to the toggle. Shared focus and hover styles remain. |
| Unslop finish | Cream-backed footer method button fixes the measured contrast failure. A three-column mobile journey row and shorter amber trail prevent an awkward label wrap/crossing. Price typography returns to the existing 48px step. |

Files changed in the implementation: `components/cumbreal/hero.tsx`, `header.tsx`, `footer.tsx`, new `pricing-section.tsx`, `app/institutions/page.tsx`, scoped additions to `app/globals.css`, and two optimized images in `public/brand/landscapes/`. The approved lane and existing fonts, tokens, Cumbi source and product logic remain in place.

## How the approved lane was applied

- **Tokens:** retained the existing cream, ink, deep teal and amber system; no dependency or token migration was needed. The user's teal/amber brand takes precedence over generic single-accent advice.
- **Typography and spacing:** preserved DM Serif Display/Inter hierarchy and shared spacing; aligned prices to 48px and gave the three card actions a consistent lower edge.
- **Sections:** preserved the split hero, two substantive landing sections and interactive explorer. The scenic addition is confined to the footer, rather than a fixed page-wide canvas.
- **States and motion:** content is visible on first paint, hover/focus feedback stays restrained, and reduced motion is honored. No reveal cascade, Lenis scroll behavior, cursor-dependent information or perpetual visual effect was added.
- **Exit audit:** repeated screenshot, browser and contrast verification after the final polish. `DESIGN-AUDIT.md` contains all 30 checklist rows and the actual measured contrast correction.

This was a refinement of an approved design lane, not a new interview/retheme from scratch. User authorization to implement locally superseded a generic clean-index/commit workflow; the working changes were deliberately not staged, committed or pushed. Verification used baseline, first-implementation and final build/capture checkpoints; no separate build checkpoint is claimed for every individual CSS/token substep.

## Verification

Baseline production build passed after retrying outside the sandbox restriction that blocked creation of a generated `.next` directory (`EPERM mkdir`). First-implementation and final production builds also passed; final lint/type validation passed with the build. Standalone TypeScript checking and **11 existing diagnosis tests** passed. No new dependencies or educational algorithms were introduced.

Final browser results record **11/11 checks passing** over **16 route/viewport combinations**: home, institutions, privacy and onboarding entry at 375, 768, 1024 and 1440px. Checks cover visible Spanish content, one main/h1, no overflow/broken images/undersized targets, menu and Escape/focus behavior, pricing destinations, footer/hero navigation, pathway selection, skip-link focus, reduced motion, 320px reflow and a 200%-zoom-equivalent viewport. No browser runtime or local HTTP errors were recorded.

The ordinary color checker sampled **31 pairs** across home and institutions with no failures, but it cannot reliably see absolutely positioned image backgrounds. The deeper footer pixel test found the first implementation's method link at 2.34–3.12:1. After adding its cream-backed button surface, that control measures **5.44–5.49:1** across all four widths. Final footer sampling passes **64/64 text/width cases**, with **4.71:1** as the lowest sampled normal-text ratio.

The responsive image source is verified: **61,408 bytes on mobile**, **143,320 bytes at desktop widths**. These replace a roughly 2.2MB source PNG for web delivery. The source artwork remains available separately; it is an AI-generated CGI-style poster, not an editable 3D scene or a rendered MP4.

## Before, first implementation and final

Evidence root: `C:\Users\Eduardo\Downloads\cumbreal\outputs\website-refinement-2026-10-21`.

| View | Before | Final |
| --- | --- | --- |
| Home, 375px | `baseline/home/375.png` | `final/home-375.png` |
| Home, 768px | `baseline/home/768.png` | `final/home-768.png` |
| Home, 1024px | `baseline/home/1024.png` | `final/home-1024.png` |
| Home, 1440px | `baseline/home/1440.png` | `final/home-1440.png` |
| Institutions, 375px | `baseline/institutions/375.png` | `final/institutions-375.png` |
| Institutions, 768px | `baseline/institutions/768.png` | `final/institutions-768.png` |
| Institutions, 1024px | `baseline/institutions/1024.png` | `final/institutions-1024.png` |
| Institutions, 1440px | `baseline/institutions/1440.png` | `final/institutions-1440.png` |

`implementation/hero-375.png` and `implementation/footer-375.png` retain the version before the final polish. Final closeups are `final/hero-375.png`, `final/pricing-1440.png`, `final/footer-375.png` and `final/footer-1440.png`. Machine-readable evidence is `final/qa-results.json` and `final/footer-pixel-contrast.json`.

## Delivery boundaries

The user asked for implementation of suitable ideas followed by Unslop improvement. Dark/neon space styling, global WebGL/particles, external Helvetica, invented metrics/partners, lifetime discounts, fake social links and unbuilt services were deliberately excluded because they conflict with Cumbreal's identity or factual scope.

The website currently uses a static summit poster. The proposed paid video generation was not authorized as a separate cost decision and was not submitted. A future video needs creative/cost approval, export and loop inspection, image-background contrast rechecks, reduced-motion behavior and a pause/stop/hide mechanism if continuous automatic motion exceeds five seconds.

Verification is local desktop Edge with emulated widths, not a live Vercel deployment check or physical-phone sign-off. Native zoom, screen-reader combinations, forced colors, every authenticated workflow and all WCAG criteria remain outside this scoped pass. The earlier authentication/persistence and vocational-evidence limitations remain unchanged. Pixel sampling is stronger evidence for this scene than the generic color checker, but future image/crop/copy changes require another check.

README and previous audit files remain unchanged. No Git staging, commit, push or deployment is part of this delivery. This report and the matching scoped audit document the local result without claiming a production backend, paid institutional service or validated educational outcome.
