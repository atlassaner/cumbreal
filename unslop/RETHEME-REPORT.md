# Cumbreal — corrected V2 delivery

October 15, 2026. **Design checklist: 43.3 → 100/100 (13/30 → 30/30).** See `DESIGN-AUDIT-V2.md` for the complete exit checklist and its practical limits.

## What changed

Applied the authorized **Editorial Cream & Cumbi** lane. Replaced the dark marketing template with a warm split hero, an original four-state Cumbi character, two useful explanatory sections, and an operable career explorer. Restored DM Serif Display, retained Inter, and removed the undefined font variable. Replaced faint copy with tested opaque foregrounds, standardized surfaces, and removed entrance cascades and broad transitions.

Rebuilt auth/onboarding/dashboard/evidence/institution screens around the same visual system. Inputs have visible associated labels and inline validation; controls have keyboard focus and practical touch targets. The Aperture remains an internal skills/progression visual. Dead marketing modules, modal, links, and unsupported academic/career metrics were removed.

Local profiles preserve identity, check a disposable local password against a salted PBKDF2 verifier, and isolate progress by profile ID. Onboarding contributes 50 starting XP, verified demo evidence contributes 100 XP once, and sidebar/overview share the same level/XP functions. Guest onboarding transfers into signup. Recovery from malformed progress is visible instead of crashing. Local profile deletion has explicit confirmation.

## Antigravity review

V2 supplied the brand direction; it did not supply verified accessibility. Tested 57 candidate color pairings and alpha cases. In particular, teal on cream, dark amber on cream, coral alerts on cream, both suggested foregrounds on vibrant teal, and /80 text were not safe general-purpose choices. Preserved the palette but corrected token roles. The review and exact arithmetic are in `V2-REVIEW.md` and `V2-CONTRAST-RESULTS.md`.

## Verification log

| Stage | Build | Fresh landing captures |
|---|---|---|
| Baseline | PASS | Prior Phase 1 evidence retained |
| Pass 1 — tokens/font stack | PASS | `screenshots/pass-1/{width}.png` |
| Pass 2 — typography/rhythm | PASS | `screenshots/pass-2/{width}.png` |
| Pass 3 — public shell/sections | PASS | `screenshots/pass-3/{width}.png` |
| Pass 4 — product states/motion | PASS | `screenshots/pass-4/{width}.png` |
| Pass 5 — cleanup, lint enabled | PASS | `screenshots/pass-5/{width}.png` |
| Final repairs and exit verification | PASS, including ESLint and types | `screenshots/final-build/{width}.png` and all product routes in `screenshots/final/` |

Each `{width}` is 375/768/1024/1440px. Mobile/desktop captures were visually inspected after each pass; all four final landing captures plus representative auth/product/institution/result captures were inspected. Browser plugin was unavailable; existing bundled Playwright and installed Edge were used. No npm dependencies were added and package/lockfile are unchanged.

Final explicit checks:

- `npm run build`: passes with lint enabled; all pages prerender.
- `npm run lint`: no warnings or errors.
- `npm run typecheck`: passes.
- Bundled static Unslop scan: no findings across 80 files.
- Bundled homepage contrast checker: 16 sampled pairs, no failures/manual-review exceptions.
- Expanded browser suite: **23 assertions pass; 40 route/viewport checks pass; 384 sampled text/background checks; zero recorded contrast failures, missing label associations, undersized targets, horizontal overflow, uncaught errors, or console errors.**
- Exercises signup confirmation, identity retention, onboarding/reward, honest empty state, salted password verifier, goal persistence, verification reward, no repeated UI reward, reduced motion, long mobile evidence, shared XP, reload persistence, two-account separation, incorrect password, returning login, damaged storage, career selection, keyboard focus, mobile menu, and guest-to-profile transfer.

The first stress run found SVG-title hydration errors; corrected the title to one string expression, added a site icon, and reran the full production suite. The final results, not the failed intermediate run, are stored in `V2-BROWSER-RESULTS.json`.

## Before and after

| | Before | After |
|---|---|---|
| Desktop landing | [Original](screenshots/landing-settled-1440.png) | [Corrected V2](screenshots/final-build/1440.png) |
| Mobile landing | [Original](screenshots/landing-settled-375.png) | [Corrected V2](screenshots/final-build/375.png) |
| Dashboard | [Original](screenshots/dashboard-1440.png) | [Corrected V2](screenshots/final/dashboard-1440.png) |
| Evidence | [Original](screenshots/dashboard-evidence-375.png) | [Corrected V2](screenshots/final/dashboard-evidence-375.png) |

## Known limitations and deployment boundary

- Cumbi reference JPEG was not available. Delivered new vector artwork, not a reproduction of the unseen image.
- Authentication/data remain browser-local. Local profile separation and password checks do not provide trusted server authorization or cross-device sync.
- Google access, recovery email, institutional contact delivery, and independent evidence review remain unavailable and clearly labeled. No simulated successful external submission.
- Career choices are educational examples, not validated personal matches or sourced labor-market predictions.
- Old demo storage keys remain separate; no unsafe automatic migration into new profiles. Existing demo data can be removed by clearing site data.
- Contrast/interaction tests are sampled, not a complete WCAG certification. Production release needs real integrations and their security/accessibility validation.
- No remote deployment or publication was performed.

## Review and rollback

Local branch: `unslop/retheme`. A baseline commit preserves the pre-redesign files. Changes remain reviewable in the working tree. Suggested implementation commit: `feat: apply corrected Editorial Cream and Cumbi redesign`.

Start with `npm run dev`, or `npm run build` and `npm start` for production-mode preview. `CLIENT-REPORT.html` provides a nontechnical before/after summary.
