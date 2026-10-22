# Accessibility review — Cumbreal public website refinement

Date: October 21, 2026. Scope: public hero, navigation, institutional pricing and summit footer. Review is local to the working project; no production deployment or target-phone verification is claimed.

## Evidence reviewed

- Source: `components/cumbreal/hero.tsx`, `header.tsx`, `footer.tsx`, `pricing-section.tsx`, `app/globals.css` and the existing document layout.
- Implementation screenshots: `outputs/website-refinement-2026-10-21/implementation/footer-375.png`, `footer-1440.png`, `hero-375.png` and `pricing-1440.png`.
- Implementation browser results: `outputs/website-refinement-2026-10-21/implementation/qa-results.json` and its verification script, run through bundled Playwright with installed Microsoft Edge.
- Pixel sampling: `outputs/website-refinement-2026-10-21/implementation/footer-pixel-contrast.json` and the script that samples the rendered background behind footer text.
- Final browser results and repeat pixel sampling: `outputs/website-refinement-2026-10-21/final/qa-results.json` and `final/footer-pixel-contrast.json`, inspected after the production build and final corrections.
- Claude Code Skills static accessibility scanner, followed by manual review of its findings.

## Completed implementation checks

All 11 recorded implementation checks passed, and all 11 passed again against the final build. The final route matrix contains 16 route/width combinations: home, institutions, privacy and the onboarding entry at 375, 768, 1024 and 1440 CSS pixels. Samples returned HTTP 200, Spanish document language, one main landmark and one h1, visible content, and no measured horizontal overflow, broken images, undersized links/buttons or browser runtime errors.

Recorded interactions verified mobile navigation opening, Escape closing with focus returned to the toggle, institutions navigation, free exploration reaching onboarding, the three proposed pricing actions, footer navigation, pathway selection, a visibly focused skip link, and reduced-motion rendering without continuous CSS animation. Additional 320px and 720px layout samples passed; 720px is a desktop reflow approximation for 200% zoom, not a native browser zoom test.

The revised header keeps its controlled mobile navigation node present while closed and hides it from display, focus and accessibility navigation. Its toggle has an explicit button type, accessible state and label. Escape is handled while focus is inside the header; the navigation is a disclosure, not a modal, and does not trap focus.

The summit is decorative: its image has empty alternative text inside an aria-hidden, pointer-inert visual layer. The hero's contour artwork and supporting arrow icons are also decorative. Core text renders without scroll entrances. Pricing uses named articles, headings, lists and labeled links; proposed services and currently available exploration are distinguished in visible copy.

## Contrast findings and correction status

The palette checker confirmed these normal-text pairs:

| Foreground / background | Ratio | AA normal text |
| --- | ---: | --- |
| Deep Teal `#28697A` / Cream `#F7F4EC` | 5.63:1 | Pass |
| Muted `#5A6B75` / Cream `#F7F4EC` | 5.04:1 | Pass |
| Ink `#22313A` / Amber `#F2AA2E` | 6.74:1 | Pass |

Standard brand Teal `#3B8078` on Cream is 4.20:1 and is not suitable for ordinary small text. The refined public surfaces use Deep Teal for those labels and links.

The first rendered footer probe identified one real failure: the unbacked secondary link, “Conocer el método,” measured 2.34:1, 2.60:1, 3.08:1 and 3.12:1 across the four widths. Other sampled footer text passed the applicable threshold. The current source changes this link to a bordered secondary button with a 96% Cream surface. The footer panel also uses 96% Cream; its fallback is opaque when backdrop filtering is unsupported. These surfaces avoid relying on blur alone to maintain text contrast.

**Final rendered verification passed.** The repeat footer probe checked 16 direct-text samples at each of the four widths, for 64 passing samples and zero failures. The corrected method link measured 5.44:1 at 375px, 5.45:1 at 768px and 5.49:1 at 1024px/1440px, above the 4.5:1 requirement. The browser selected the mobile summit asset at 375px and the desktop asset at the three larger widths. The earlier implementation screenshots and failed measurements remain useful historical evidence; the final directory records the corrected result.

## Static scanner interpretation

The final component scan covered 15 files and returned 51 warnings: 38 serious and 13 moderate. All were in five heuristic categories: per-file missing main/navigation/skip link, headings without an h1 inside a component, or status/alert roles without an explicit aria-live attribute.

Those counts are not 51 confirmed public-page violations. The scanner does not compose React components with their parent layouts, so it misses landmarks and the skip link provided elsewhere. It also does not account for the implicit live semantics of status and alert roles. Do not add duplicate main landmarks or h1 headings, or redundant live attributes, simply to clear these warnings. Final browser evidence is the relevant check for the composed pages.

## Remaining review limits and actual risks

- Perform real screen-reader navigation with a browser/assistive-technology combination such as NVDA and Edge. Automated checks do not establish announcement quality, reading order or every dynamic onboarding state.
- Check native 200%/400% zoom, custom text spacing, forced colors and the target phone/browser. The current desktop viewport matrix and zoom-equivalent reflow checks do not cover all of those conditions.
- Preserve the measured overlays and text colors if the summit image or crop changes. A future animated background needs its own contrast sampling, reduced-motion behavior and pause/stop/hide mechanism for automatic continuous motion lasting more than five seconds. This release uses a static image.

No confirmed blocker remains in the reviewed public surfaces after the corrected footer link passed the final rendered probe. This is a scoped accessibility review, not a full WCAG certification. Successful navigation and pricing checks do not establish production authentication, institutional reporting, payment processing or educational effectiveness; visible product copy correctly treats those services and prices as proposed or pending.
