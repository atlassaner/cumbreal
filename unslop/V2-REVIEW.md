# Antigravity V2 — reviewed, stress-tested, corrected

October 15, 2026. User authorized validation and implementation of the corrected V2 redesign. The previous Carta Vocacional proposal was not approved and is superseded by `LANE.md`.

## Verdict

V2 is useful design direction, not a verified audit or a production-readiness guarantee. Its brand evolution and most remediation items are actionable. Several accessibility claims are numerically false, some cleanup instructions are stale, and the referenced mascot asset is unavailable. These were corrected before applying the redesign.

## Claims tested

| V2 claim/instruction | Test result | Applied correction |
|---|---|---|
| Teal #3B8078 is 4.52:1 AA on cream | Actual ratio 4.204:1 | Deep teal #28697A for small text on cream; standard teal may be white-text button fill |
| Amber-dark #C88515 is 4.5:1 for labels | Actual ratio 2.801:1 on cream | Decorative/fill use only; ink for achievement labels |
| White or ink can be used on vibrant teal | White 3.181:1; ink 4.209:1 | No ordinary-text button on vibrant teal; reserve it for illustration |
| Coral alert is AA on cream | Actual ratio 3.893:1 | Error messages use ink plus explicit words/symbols; coral reserved for decoration |
| Body opacity is safe at /80 | Muted/80 on cream 3.391:1; teal/80 3.013:1 | Opaque text only for ordinary copy; validate actual pair and compositing |
| Success green is AA | 4.622:1 on cream, but 4.287:1 on mist | No universal AA status-color claim; status words use ink |
| Ink is 12.2:1 on cream | Confirmed 12.182:1 | Preserve exact colors |
| Muted ink is 4.6:1 on cream | Actual 5.035:1; 4.670:1 on mist | Keep opaque muted ink |
| Undefined Playfair variable breaks serif | Confirmed against source and browser | Removed variable, verified computed DM Serif Display |
| Sidebar strengths/settings dead links need removal | Current routes already existed or pointed to valid anchors | Rebuilt essential navigation without unnecessary stubs |
| Cumbi reference exists at appDataDir/relative JPEG | Not present at stated paths, Downloads matches, or Antigravity filename search | Original code-native mountain explorer, four operational poses; no claim of fidelity to unseen artwork |
| Build certifies zero ESLint errors | Baseline configuration skipped lint | Enabled lint during build and also ran explicit lint/typecheck |
| Retheme produces a production application | No connected backend, OAuth, recovery email, institutional channel, or reviewer roles | Deliver an honest functional local prototype; do not claim external integrations |

`v2-contrast-stress.cjs` reproduces all 57 foreground/background cases and alpha cases in `V2-CONTRAST-RESULTS.md` without dependencies.

## Architectural stress findings and remedies

- Old login ignored passwords and replaced identities with a seeded demo. New local profiles preserve the entered identity and validate a salted PBKDF2-derived local password verifier. Plain passwords are not stored. This remains local prototype access, not a server-backed security boundary.
- Old progress was shared across every account in the browser. New progress is keyed by the stable profile ID and is gated during hydration so a previous profile's activities do not render for the next user.
- Old sidebar and overview disagreed about XP. Both now use profile starting XP plus the same derived evidence total and the same level calculation. Onboarding awards 50 starting XP; verified demo evidence contributes 100 XP once per record; levels advance every 250 XP.
- Repeating onboarding does not accumulate starting rewards. Guest onboarding transfers its chosen goal into signup without assigning Eduardo or another identity. No career-match percentage is inferred from confidence.
- Malformed progress storage produces a recoverable empty state with a clear message; deliberate new activity can replace damaged progress. Storage write failures show an error. Profile deletion requires explicit in-UI confirmation and deletes that profile's progress only.
- Recovery, Google access, and institutional forms explicitly report that their remote services are unavailable. They do not simulate successful delivery.
- Old data keys are not migrated automatically into the new local-profile format. The new UI avoids reintroducing untrusted demo identities or browser-wide records. Legacy keys remain in the browser until the user clears site data.

## Execution changes from V2

1. Kept exact palette values, but corrected their permitted text/surface roles.
2. Used semantic controls, associated visible labels, keyboard outlines, explicit touch targets, immediate content visibility, and a CSS reduced-motion override. The new flows do not need Framer Motion; no motion dependency was added.
3. Used one selected border plus light tint. Keyboard focus is separate from selection.
4. Replaced numerical “recommended match” claims with useful activity/evidence examples because no model or data supports personalized rankings.
5. Cumbi title originally used multiple JSX text nodes. Production stress tests exposed SVG-title hydration failures; changed it to one string expression and added a matching site icon. Final checks rerun against the corrected build.
6. Kept the initial audit and screenshots intact. Git branch `unslop/retheme` contains a local baseline commit; implementation changes are available as a working diff.

## Run

Use installed Node/npm on PATH. From the project root:

```powershell
npm run build
npm run lint
npm run typecheck
node unslop/v2-contrast-stress.cjs
node unslop/v2-browser-stress.cjs
```

Browser scripts require the already bundled Playwright module through NODE_PATH and installed Edge. They start a temporary production server on 127.0.0.1:3100 and close it afterward. `verify-pass.cjs` builds and captures four widths; its `capture-only` option reuses an existing build. No project dependency additions were needed.

See `RETHEME-REPORT.md` for final verification, score, screenshots, and remaining delivery limitations.
