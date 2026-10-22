# Cumbreal public website — scoped Unslop audit

October 21, 2026. **Final: 30/30 applicable checklist items pass (100%). First new implementation: 29/30 (96.7%).** This is a scoped design self-audit, not a WCAG certification, proof of educational effectiveness, or production-readiness assessment.

## Scope and scoring context

Reviewed the public hero, navigation, institutional pricing, summit footer, decorative assets and their shared styles against the approved `unslop/LANE.md`: Editorial Cream & Cumbi. The existing app uses React, Next.js and Tailwind; its current fonts and brand tokens were retained.

The pre-change approved site already recorded 30/30 in `unslop/DESIGN-AUDIT-V2.md`. The baseline captures show that established cream canvas, editorial type and flat Cumbi. This work did not transform a failing old design into a passing one. It added suitable presentation ideas, caught a contrast regression in the first new footer, then restored checklist compliance while improving the proposed pricing and brand scene.

The approved teal/amber brand overrides C2's generic single-accent suggestion. Amber remains the primary action emphasis; teal provides structure and landscape color. Cumbi remains flat vector artwork. A cinematic 3D-style landscape is used as a **static poster**, not an animated video.

## Category scores

| Category | First new implementation | Final |
| --- | ---: | ---: |
| Typography | 5/5 | 5/5 |
| Spacing | 3/3 | 3/3 |
| Color | 4/5 | 5/5 |
| Surfaces | 3/3 | 3/3 |
| Icons and imagery | 3/3 | 3/3 |
| Motion | 4/4 | 4/4 |
| States and robustness | 3/3 | 3/3 |
| Layout | 4/4 | 4/4 |
| **Total** | **29/30** | **30/30** |

## All 30 checklist items

“Implementation” means the first new version, before the final polish. PASS statements apply to the reviewed public scope and sampled states.

| ID | Implementation | Final | Evidence |
| --- | --- | --- | --- |
| T1 | PASS | PASS | DM Serif Display remains 400; Inter uses the existing 400/500/600 set. No extra display-weight system was introduced. |
| T2 | PASS | PASS | Existing serif heading/body sans pairing is visible in every final home and institutions capture. No external Helvetica or third font was added. |
| T3 | PASS | PASS | `app/globals.css` keeps body leading 1.6 and heading leading 1.15. Compact prices are display data, not body paragraphs. |
| T4 | PASS | PASS | Existing heading rule retains tracking −0.025em. Final hero and footer headlines show a consistent editorial hierarchy. |
| T5 | PASS | PASS | Clear metadata/body/subhead/display hierarchy. Final prices were aligned to the existing 48px display step rather than 44px. This was a refinement, not a failure of the whole initial hierarchy. |
| S1 | PASS | PASS | Margins and padding use shared Tailwind spacing on the 4px system. Explicit illustration dimensions and reserved heading-line height serve composition rather than arbitrary spacing. |
| S2 | PASS | PASS | Hero, open method band, dense explorer, pricing comparison and scenic footer have different rhythms. Existing substantive landing sections remain intact. |
| S3 | PASS | PASS | Final route matrix reports no undersized interactive targets. Shared links/buttons retain at least 44px targets; primary actions retain 48px minimum height. |
| C1 | PASS | PASS | Named cream, ink, deep teal and amber tokens remain the public palette. No stock blue/indigo primary theme or neon gradients. |
| C2 | PASS | PASS | Intentional user-approved teal structure plus amber actions. The pilot receives warm emphasis; other cards stay quiet. This documented brand exception supersedes the generic one-accent rule. |
| C3 | **FAIL** | **PASS** | First footer's unbacked “Conocer el método” link failed at all four widths. Final cream-backed button passes actual-background pixel sampling; all 64 sampled footer text/width cases pass. See contrast table below. |
| C4 | PASS | PASS | Basalto ink `#22313A` on cream or white; no pure black-on-white primary text pairing. |
| C5 | PASS | PASS | Current capabilities have text/checks; proposed conditions have explicit wording and arrows. Selected trajectories retain labels/checks and pressed state, not hue alone. |
| R1 | PASS | PASS | Existing 8px controls, 12px cards and 16px composed surfaces remain distinct. No universal pill or single-radius treatment. |
| R2 | PASS | PASS | Pricing uses borders and tint; the hero example drops the elevated shadow. Existing named elevations are retained elsewhere. |
| R3 | PASS | PASS | No border/ring/shadow selection stack was added. Independent keyboard focus outlines remain visible. |
| I1 | PASS | PASS | Lucide is the UI icon system; Cumbi and contour artwork are intentional brand assets. No new icon font. |
| I2 | PASS | PASS | No emoji substituted for controls or feature icons. Supporting icons are decorative to assistive technology. |
| I3 | PASS | PASS | Teal summit, amber route and cream mist match the subject and palette. No giant planet, unrelated stock video, or placeholder service imagery. |
| M1 | PASS | PASS | Public text renders on first paint. No scroll entrances, animation cascades, or hidden reveal wrappers. |
| M2 | PASS | PASS | No new `transition-all`; feedback targets border, background or color. Static scan reports no scoped tells. |
| M3 | PASS | PASS | Existing reduced-motion rule remains effective. Final browser check confirms visible content without continuous CSS animation. Footer is static. |
| M4 | PASS | PASS | Intentional button/link hover, offset focus outline, pricing focus-within border and tested skip-link focus. Mobile Escape closes the menu and returns focus to its toggle. |
| X1 | PASS | PASS | New pricing is static and explicitly proposed; mailto opens a user-controlled draft. No fake loading, payment, reporting or backend-success state. Existing pathway selection is exercised. |
| X2 | PASS | PASS | Zero overflow in 16 final route/viewport combinations; additional 320px and zoom-equivalent reflow checks pass. |
| X3 | PASS | PASS | No unlabelled form was introduced. Existing labeled onboarding entry remains reachable; pricing actions are links, not simulated checkout forms. |
| L1 | PASS | PASS | Desktop split hero retains Cumbi and a concrete working journey example. Contour lines reinforce the field-notebook identity. |
| L2 | PASS | PASS | Split hero, open ruled method, asymmetric explorer, institutional comparison and bounded footer scene use distinct compositions. |
| L3 | PASS | PASS | Pilot card has purposeful warm emphasis and an amber action; free and institutional cards remain secondary. No invented “best value” badge. |
| L4 | PASS | PASS | Layered contour artwork, fine rules, cream glass panel and the bounded summit provide intentional depth without a fixed WebGL background or particle field. |

## Confirmed contrast regression and resolution

The ordinary rendered-color checker passed 16 home and 15 institutional pairs in the first implementation. It cannot reliably infer the pixels beneath text over an absolutely positioned image. A second test sampled the rendered footer background behind text, including overlays and the translucent panel. That test found the actual defect.

| Viewport | First “Conocer el método” | Final button | Normal-text requirement |
| --- | ---: | ---: | ---: |
| 375px | 2.34:1 — fail | 5.44:1 — pass | 4.5:1 |
| 768px | 2.60:1 — fail | 5.45:1 — pass | 4.5:1 |
| 1024px | 3.08:1 — fail | 5.49:1 — pass | 4.5:1 |
| 1440px | 3.12:1 — fail | 5.49:1 — pass | 4.5:1 |

Correction: `components/cumbreal/footer.tsx:21` uses the shared secondary button and `app/globals.css` supplies a 96% cream surface for `.summit-method-link`. The panel also uses 96% cream and falls back to opaque cream without backdrop-filter support. Final `footer-pixel-contrast.json` contains 16 text samples at each width, **64 passes and zero failures**. The lowest final sampled normal-text ratio is **4.71:1**. These are sampled results, not a guarantee for every possible future background or content change.

## Five opportunities addressed, ordered by impact

1. **Make the scenic footer action readable everywhere — C3, M4.** Replaced the unbacked secondary link with the cream-backed control; verified real rendered pixels after the final build.
2. **Keep the mobile journey legible — L1, S2.** Put the three short journey labels in a stable three-column row and shortened the amber trail so it stops above them. Compare implementation and final `hero-375.png`.
3. **Make proposed access easy to compare — L3, T5, C5.** Free / four-week pilot / institutional cards have aligned actions, ruled features and prominent prices; existing proposal limits and no-payment language remain visible.
4. **Make the summit an intentional page ending — I3, L4, C3.** Kept the scene within the footer, added a deliberate mobile crop and readable cream navigation surface, and retained only real destinations.
5. **Preserve simple, usable navigation — M4, X2.** Persistent controlled menu node, explicit toggle type/state and Escape/focus handling; no scroll hijacking or new interaction library.

Only item 1 was a failing checklist item in the first new implementation. The other items improve an already coherent design and should not be presented as invented baseline defects.

## Evidence and limits

Paths below are relative to `C:\Users\Eduardo\Downloads\cumbreal`.

- Before: `outputs/website-refinement-2026-10-21/baseline/home/{375,768,1024,1440}.png` and `baseline/institutions/{375,768,1024,1440}.png`.
- First new version: `outputs/website-refinement-2026-10-21/implementation/`, including hero, pricing and footer closeups and the first pixel-contrast result.
- Final: `outputs/website-refinement-2026-10-21/final/home-{375,768,1024,1440}.png` and `institutions-{375,768,1024,1440}.png`; all eight were visually inspected, alongside mobile hero and desktop pricing closeups.
- Final browser evidence: `outputs/website-refinement-2026-10-21/final/qa-results.json` — all 11 checks pass across home, institutions, privacy and onboarding entry at four widths; no recorded runtime/local HTTP errors, broken images or horizontal overflow.
- Final image-background evidence: `outputs/website-refinement-2026-10-21/final/footer-pixel-contrast.json`. At 375px, `currentSrc` selects the 61,408-byte mobile WebP; desktop widths select the 143,320-byte landscape WebP.
- Build evidence: baseline, first implementation and final production builds passed; final build includes lint/type validation. Standalone TypeScript checking and all 11 existing diagnosis tests also passed, as recorded by the implementing parent task.

Browser work used bundled Playwright with installed desktop Microsoft Edge because the Browser plugin was unavailable. Viewports are device emulation, not a physical target-phone test. The 720px reflow check is a 200% desktop-zoom equivalent, not native zoom. Screen-reader, forced-colors, custom text-spacing and every signed-in product state were not comprehensively tested here. This work does not re-certify prior persistence/account tests. It also does not validate career matching, demand, educational impact, production auth, institutional reporting or payments.

No paid video was generated, and no MP4 is claimed. Animated summit work remains a separate cost/creative approval. No dependency, commit, push or deployment was added by this refinement. Existing README and previous audit reports remain unchanged.
