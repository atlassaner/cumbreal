# Cumbreal V2 — exit audit

October 15, 2026. **Unslop checklist score: 100/100 (30/30 sampled applicable items pass), up from 43.3/100 (13/30).** This is a design-checklist self-audit of the reviewed prototype, not an independent accessibility certification or production-security assessment.

## Method and scope

Original evidence remains in `DESIGN-AUDIT.md`. Applied the same checklist and rendered/source judgment used there, with the user's authorized V2 lane replacing the former brand constraints. All four final landing captures and representative mobile/desktop product screens were visually inspected. Browser plugin unavailable; used existing bundled Playwright with installed Edge, without adding dependencies.

`V2-STATIC-SCAN.md` reports no static findings across 80 source files. `V2-BUNDLED-CONTRAST.md` reports 16 sampled homepage color pairs, zero failures and zero gradient-review exceptions. The expanded browser probe composites alpha against ancestor surfaces and samples 384 text/background cases across 40 route/viewport combinations; these include repeat pairs at different widths, not 384 globally unique pairs. Zero sampled contrast failures, unassociated form controls, undersized rendered targets, or horizontal overflow. This does not certify every future content/state combination or all WCAG criteria.

## Checklist

| ID | Result | Evidence |
|---|---|---|
| T1 | PASS | Reachable UI uses weights 400/500/600; no font-bold or extra-heavy classes. DM Serif Display stays at 400. |
| T2 | PASS | Computed heading family resolves to DM Serif Display at all four landing widths; body Inter. `final-build-checks.json`, `tailwind.config.ts`. |
| T3 | PASS | Explicit final `h1[class],h2[class],h3[class]` rule enforces heading leading 1.15; body uses 1.6. |
| T4 | PASS | Heading tracking −0.025em applied globally and to serif utility. |
| T5 | PASS | Consistent Tailwind size hierarchy with 12/14 metadata/UI tiers, body 16/18, headings 24/30/36/48/64. See final screenshots. |
| S1 | PASS | Static scan clear. Previously flagged unused primitives now use equivalent canonical `top-px`/`p-px` for intentional 1px alignment; no arbitrary off-grid spacing values. |
| S2 | PASS | Hero 48/80px vertical padding, method 56/64px, explorer 64/80px; two explanatory sections with different density/composition. |
| S3 | PASS | Global interactive minimum 44×44, form controls 48px, radio labels provide full target. No small targets in 40 sampled combinations. |
| C1 | PASS | Exact V2 semantic cream/ink/teal/amber tokens replace the old palette; no stock primary-button or gradient tells flagged. |
| C2 | PASS | Amber is action/achievement emphasis; restrained teal provides structure. This intentional two-family user brand supersedes generic single-accent guidance. No unrelated competing accent theme. |
| C3 | PASS | Bundled homepage check 0 failures; expanded route checks 0 sampled failures, including alpha compositing. V2's originally failing pairings are not used for normal text. |
| C4 | PASS | Ink is #22313A on cream or white; no pure black/white primary pairing. |
| C5 | PASS | Explicit status words, check symbol, selected-option check, aria-current and pressed state. Color does not carry status alone. |
| R1 | PASS | Controls 8px, cards 12px, composed hero surface 16px; circles/pills reserved for appropriate shapes/tags. |
| R2 | PASS | Named card/elevated/achievement shadow scale; no arbitrary shadow strings on new cards. |
| R3 | PASS | Selected pathway and radio use border plus tint. Focus outline is distinct from selected-state decoration; no triple border+ring+shadow stacks. |
| I1 | PASS | Lucide UI icons; bespoke Cumbi and Aperture are deliberate brand/domain assets. |
| I2 | PASS | No emoji artwork substituted for the icon system. Plain check/warning text symbols accompany status text. |
| I3 | PASS | Original mountain-explorer vector matches the subject matter; no stock image/placeholder photo. Missing reference is disclosed, not claimed as reproduced. |
| M1 | PASS | Content immediately visible; no repeated scroll entrance wrappers. Celebration occurs only on relevant onboarding/evidence state. |
| M2 | PASS | Zero transition-all in app, components, or lib; static scan clear. |
| M3 | PASS | Reduced-motion CSS disables animation/transitions; browser assertion confirms Cumbi computed animation-name none. |
| M4 | PASS | Global explicit offset focus outline and deliberate hover feedback. Keyboard skip-link focus assertion and menu interaction pass. |
| X1 | PASS | Loading, empty, error, unavailable-service states; progress-storage recovery exercised; new students do not receive invented academic/cohort facts. |
| X2 | PASS | Zero horizontal overflow in 40 route/viewport combinations and long populated mobile evidence. |
| X3 | PASS | Form inputs have associated visible labels, including goal radios, confidence range, institutional fields, recovery and evidence notes; browser scan reports no missing association. |
| L1 | PASS | Desktop split hero with real brand character and concrete example; interactive pathway explorer follows; no centered radial-glow/template stack. |
| L2 | PASS | Varied split hero, open ruled process band, asymmetric selectable explorer, restrained footer. |
| L3 | PASS | Career possibilities use a selected navigation row plus one primary detail region; no equal-weight recommendation-card grid. Process steps are open rule-separated articles. |
| L4 | PASS | Warm layered surfaces and purposeful mountain silhouette establish depth; no decorative gradient dependency. |

## Category totals

Typography 5/5; spacing 3/3; color 5/5; surfaces 3/3; icons/imagery 3/3; motion 4/4; states 3/3; layout 4/4. **30/30 = 100%.**

## Visual evidence

- `screenshots/final-build/375.png`, `768.png`, `1024.png`, `1440.png`: final landing at every required width.
- `screenshots/final/home-{width}.png`: signed-in route probe captures.
- `screenshots/final/login-{width}.png`, `signup-{width}.png`, `forgot-password-{width}.png`, `onboarding-{width}.png`, `institutions-{width}.png`, `privacy-{width}.png`.
- `screenshots/final/dashboard-{width}.png`, `dashboard-pathways-{width}.png`, `dashboard-evidence-{width}.png`.
- `screenshots/final/onboarding-result.png`, `evidence-populated-375.png`: completed/populated states.
- In these filenames, `{width}` is 375, 768, 1024, or 1440. Raw measurements and all 23 assertions are in `V2-BROWSER-RESULTS.json`.

## Remaining limitations

This is a working local prototype with a tested design. Local access checks and PBKDF2 verifiers do not make browser storage a trusted authentication boundary. Google OAuth, reset email, institutional submission, server persistence, authorized review, and validated career inference remain unconnected. Those limitations are explicit in the interface and must be completed before a real student deployment.
