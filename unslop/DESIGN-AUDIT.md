# Cumbreal — Phase 1 design audit

Date: October 14, 2026, America/El_Salvador.

**Score: 43/100 — 13 passes out of 30 applicable checklist items (43.3%).**

The strongest assets are the restrained rose/obsidian/ivory palette, Aperture identity, and responsive route layouts. The biggest weaknesses are the missing rendered serif pairing, template hero composition, repeated marketing rhythm, low-contrast copy, and disconnected product states. All 30 checklist items are assessed below; none are excluded as N/A.

This is the current implementation baseline, not an approved design lane or a completed retheme. Source, styles, configuration, dependency manifest, and lockfile were not changed.

## Scope and method

- Read the Unslop audit skill and its anti-slop checklist.
- Started Next.js 14.2.35 at `http://127.0.0.1:3000` using installed Node. Restricted execution made asynchronous filesystem realpath calls fail with EPERM, causing Next to misreport installed TypeScript dependencies as missing. Interrupted its automatic install attempt. Retried with broader execution access; dev server started and rendered routes successfully.
- Used bundled `screenshot.mjs`, `slop-scan.mjs`, and `contrast-check.mjs`. Playwright was supplied through the existing bundled runtime via NODE_PATH; no project dependency was added. Browser plugin/skill is not available in this session. The capture scripts' installed-browser fallback was changed from Chrome to Edge in temporary copies outside project source because neither bundled Chromium nor Chrome was installed. No plugin files were edited.
- Captured landing at 375, 768, 1024, and 1440px, all with a 900px viewport height. First cold capture timed out during homepage compilation; retry succeeded.
- Preserved the scripts' original full-page captures. Added captures after scrolling each viewport to reveal `whileInView` content. The initial blank lower sections are a capture limitation, not evidence that users cannot reach that content.
- Captured login, signup, onboarding, institutions, dashboard, pathways, and evidence at 375 and 1440px. Inspected representative product screenshots and all four settled landing screenshots.
- Exercised mobile menu, full onboarding, demo login, pathway selection, and activity → evidence → verification → XP. Browser tests used fresh isolated contexts and synthetic local data. No external submission or real student data was used.
- Scored the rendered product and reachable domain source. Unused component-library scaffolding is distinguished from visible interface defects. A failure anywhere in the reviewed product fails that checklist item once; counts of occurrences do not increase its scoring weight.

## Scores by category

| Category | Pass / applicable | Score |
| --- | ---: | ---: |
| Typography | 1 / 5 | 20% |
| Spacing | 1 / 3 | 33.3% |
| Color | 4 / 5 | 80% |
| Surfaces | 1 / 3 | 33.3% |
| Icons and imagery | 3 / 3 | 100% |
| Motion | 0 / 4 | 0% |
| States and robustness | 1 / 3 | 33.3% |
| Layout | 2 / 4 | 50% |
| **Total** | **13 / 30** | **43.3%** |

Scores measure this plugin checklist, not security, scientific assessment validity, accessibility certification, or production readiness.

## Full checklist with evidence

### Typography

| ID | Result | Evidence |
| --- | --- | --- |
| T1 | FAIL | Reachable product uses normal 400 plus medium 500, semibold 600, and bold 700. Landing DOM confirms 400/500/600; dashboard bold scores are defined at `app/dashboard/page.tsx:111,196`, pathway score at `app/dashboard/pathways/page.tsx:119`. Four weights exceed the checklist's three-weight budget. Raw scan also flags four utility weights, though its scope includes unused UI files. |
| T2 | FAIL | At all four widths the hero's computed family is `__Inter_d8ebd1, __Inter_Fallback_d8ebd1, system-ui, sans-serif`, the same as body. `tailwind.config.ts:75` inserts `var(--font-playfair-display)` without a fallback into the serif stack. That variable is undefined, invalidating the declaration even though DM Serif Display's variable exists. `hero-1440.png` visibly shows sans-serif display type. Preserve the intended DM Serif Display + Inter pairing and fix its application. |
| T3 | FAIL | Hero computed font/line-height: 48/50.4px at 375px (1.05), 60/60px at 768px (1.0), and 72/72px at 1024/1440px (1.0), below the checklist's 1.1–1.3 heading range. See `components/cumbreal/hero.tsx:59` and `RENDERED-EVIDENCE.md`. This is a checklist judgment; deliberate tighter display leading can be reconsidered in the approved lane. |
| T4 | FAIL | Hero computed tracking is `normal`; `hero.tsx:59` has no tracking utility. Feature headings likewise lack negative tracking (`feature-evidence.tsx:35`, `feature-strengths.tsx:76`). Some dashboard headings already have `tracking-tight`. |
| T5 | PASS | The existing Tailwind size tiers produce distinct display, section-heading, body, and metadata levels: hero 48/60/72px and section headings 36/48px, with smaller UI/body tiers. Tiny 10/11px dashboard metadata deserves legibility review, but does not establish absence of a hierarchy. |

### Spacing

| ID | Result | Evidence |
| --- | --- | --- |
| S1 | PASS | Static scan finds three off-grid arbitrary pixel spacing values, all in unused `components/ui/navigation-menu.tsx` and `scroll-area.tsx`. No corresponding defect found in reachable app/domain imports. These are cleanup candidates, not rendered failures. |
| S2 | FAIL | Dashboard preview and all four feature sections use the same `py-24 lg:py-32` rhythm. See `dashboard-preview.tsx:16`, `feature-evidence.tsx:14`, `feature-strengths.tsx:14`, `feature-pathways.tsx:15`, `feature-bridge.tsx:15`. Settled 1440px capture shows five successive sections with similarly generous padding; mobile expands to a 7,912px document. |
| S3 | FAIL | At 375px, mobile menu button measures 28×23px; header student action 146×38px; preview Continue 118×32px. All fall below the checklist's 44×44px target. Measurements are in `RENDERED-EVIDENCE.md`; see `header.tsx:93-102` and `dashboard-preview.tsx:139`. This checklist threshold is not a claim that every target independently violates a particular WCAG criterion. |

### Color

| ID | Result | Evidence |
| --- | --- | --- |
| C1 | PASS | Main surfaces and actions use named Cumbreal colors. Stock blue/indigo primary-button and purple-blue gradient scan patterns were not flagged. |
| C2 | PASS | Rose remains the principal accent in hero, onboarding, and product screenshots. Neutral surfaces dominate. Semantic destructive colors are not treated as competing brand accents. |
| C3 | FAIL | Bundled checker flags seven unique solid-background color pairs below AA. Examples: “Panel interactivo” 3.72:1 and preview description 3.86:1, both requiring 4.5:1. See `CONTRAST-EVIDENCE.md` and details below. |
| C4 | PASS | Primary ink/surfaces are obsidian/ivory or charcoal, rather than pure black text on pure white. White cards use near-black obsidian ink. |
| C5 | PASS | Evidence status has words (“Sin evidencia”, “En revisión”, “Verificada”, “Rechazada”); verification adds a check. Goal selection pairs color with a check indicator. See `app/dashboard/evidence/page.tsx:13` and `onboarding-375.png`. |

### Surfaces

| ID | Result | Evidence |
| --- | --- | --- |
| R1 | PASS | The product does not apply one uniform radius everywhere: rounded full pills/progress rails, small icon containers, rounded-xl inputs, and rounded-2xl cards are distinct. Role consistency still needs refinement, but the checklist's uniform-container-radius tell is absent. |
| R2 | FAIL | Shadows have no shared elevation scale: marketing preview uses `0_20px_80px`, strengths `0_10px_50px`, auth `0_20px_80px` with different color/opacity, dashboard `0_10px_40px`, onboarding `0_30px_100px`. See `dashboard-preview.tsx:45`, `feature-strengths.tsx:25`, `app/(auth)/login/page.tsx:49`, `app/dashboard/page.tsx:76`, `app/onboarding/page.tsx:79`. Settled screenshots show repeated white cards floating with different shadow softness. |
| R3 | FAIL | Selected onboarding goal stacks border + shadow + ring (`app/onboarding/page.tsx:139`). Selected career card repeats this (`app/dashboard/pathways/page.tsx:107`); visible in `onboarding-375.png` and `dashboard-pathways-1440.png`. |

### Icons and imagery

| ID | Result | Evidence |
| --- | --- | --- |
| I1 | PASS | Lucide is the consistent UI icon system in reachable components; Aperture is a separate deliberate brand asset, not an inconsistent icon library. |
| I2 | PASS | No emoji used as the main UI icon system in reviewed screens. Plain check/arrow glyphs in status/copy are not treated as emoji artwork. |
| I3 | PASS | No irrelevant stock photos or placeholder image blocks in reviewed page bodies. Bolt's default social-preview image remains a separate metadata cleanup item (`app/layout.tsx`). |

### Motion

| ID | Result | Evidence |
| --- | --- | --- |
| M1 | FAIL | Hero staggers pill, heading, paragraph, actions, and fine print. Preview and four feature sections repeat opacity/translate entrances on text, panels, and rows. See `hero.tsx:43-103`, `dashboard-preview.tsx:19-43`, `feature-evidence.tsx:27-30,47-50,89-92`. The before-scroll captures hide most section content; settled captures reveal it. Initial script cannot audit these visuals adequately without scroll-through. |
| M2 | FAIL | Static scan finds 39 source lines containing `transition-all` across app, domain, and UI scaffolding. Reachable examples: `app/(auth)/login/page.tsx:83,112,120`, `hero.tsx:82,87`, `header.tsx:37,62,86`. See `SCAN-EVIDENCE.md`. |
| M3 | FAIL | Animations/transitions exist, but no `motion-reduce`, `prefers-reduced-motion`, or `useReducedMotion` handling found in reachable app/domain code. Bundled scan confirms no project-wide reduced-motion treatment. |
| M4 | FAIL | Hover color/transform treatment exists, but marketing and dashboard navigation have no deliberate focus-visible treatment. Reachable app/domain search finds focus customization only on auth inputs. See `header.tsx:58-64,93-102` and `app/dashboard/layout.tsx:129`. Browser-default focus may remain; this fails the checklist's intentional hover + focus styling requirement, not a claim of universal keyboard inoperability. |

### States and robustness

| ID | Result | Evidence |
| --- | --- | --- |
| X1 | FAIL | Auth has a generic error/loading state and evidence has a useful empty state, but new-user overview still presents measured-looking academic/cohort results with zero activities. Progress hydration has unhandled JSON parsing and no recovery UI (`lib/progress-context.tsx:15`). Institution submit only changes local success state (`app/institutions/page.tsx:7-9`). See `dashboard-1440.png` and `dashboard-evidence-375.png`. |
| X2 | PASS | Landing scrollWidth overflow = 0px at all four required widths. All seven additional routes have 0px overflow at 375 and 1440px. Populated evidence and onboarding result also pass at 375px. This is sampled-state coverage, not a guarantee for all future content. |
| X3 | FAIL | Auth has visible labels, but they have no `htmlFor` and inputs no matching `id`; they are siblings, not wrapped controls (`app/(auth)/login/page.tsx:72-83`, `signup/page.tsx:79-90`). Evidence and institution forms use placeholders without visible labels. Browser DOM check reports no associated label/ARIA name on all 12 initial form controls across these four forms. This corrects Phase 0's assumption that auth labels were associated. |

### Layout

| ID | Result | Evidence |
| --- | --- | --- |
| L1 | FAIL | `hero-1440.png` shows a full-viewport centered pill → headline → supporting paragraph → dual CTA → fine print → scroll line, over a radial glow/grid/oversized mark. It does not expose a usable product surface above the fold. The next section is a static marketing dashboard; cards appear later. This matches the checklist's template-hero family even though the immediate next section is not a three-card grid. |
| L2 | PASS | Despite repeated outer wrappers, internal structures vary: centered preview, evidence split, reversed strengths split, pathway connector/cards, bridge split. `landing-settled-1440.png` shows actual structural differences. Repeated padding is scored under S2, not counted again here. |
| L3 | FAIL | Landing pathway cards give Software/Data/Robotics equal width, surface, and typography (`feature-pathways.tsx:106-127`); overview repeats equal career cards (`app/dashboard/page.tsx:187-205`). See settled 768/1440 captures. The dedicated explorer does distinguish selection; that does not fix the landing/overview hierarchy. |
| L4 | PASS | Custom Aperture artwork, faint grid, warm tinted surfaces, and layered cards provide intentional depth. A new grain/noise asset is not required to satisfy this item; preserve restraint when removing unnecessary glow. |

## Contrast evidence and limitations

The checker reported **7 failing unique pairs out of 24 sampled**, with **4 additional gradient-background samples requiring manual review**. Representative reported ratios:

| Text sample | Ratio | Required |
| --- | ---: | ---: |
| Panel interactivo | 3.72 | 4.5 |
| Cada logro se registra… | 3.86 | 4.5 |
| 84% preview score | 4.16 | 4.5 |
| 87% preview affinity | 4.01 | 4.5 |
| Tu perfil muestra fuerte alineación… | 4.14 | 4.5 |
| Registro de actividad | 4.45 | 4.5 |
| Examen · Hace 2h | 4.43 | 4.5 |

These are the bundled tool's outputs, not exhaustive certified measurements. Its implementation drops foreground alpha from ratio calculations, skips foreground alpha below 0.5, and does not fully composite translucent ancestors. It also samples off-screen content without checking ancestor opacity. Therefore opacity-reduced copy is under-reported or inaccurately estimated; four gradient samples remain unresolved. Visible hero/footer text is especially dim in screenshots. C3 fails on unambiguous opaque text pairs even without those uncertain samples.

Keep the approved brand colors. Correct foreground/background pairing, opacity, surface placement, and where appropriate text size/weight; do not invent a replacement palette simply to chase the scan.

## Product-flow findings outside the design score

- **Working interaction:** create activity → submit evidence → verify produces a verified record and 100 additional XP, retained across route navigation. Dashboard total becomes 150 XP from a 50-XP seed; sidebar stays at 50 XP. See `RENDERED-EVIDENCE.md`.
- **Contradictory new-user state:** zero-affinity level-1 test profile still sees 87% affinity, a top-15% cohort claim, fixed academic scores, and 72% progress toward level 4. Screenshots and recorded body text demonstrate this without relying only on source.
- **Identity substitution:** completing onboarding without signup creates Eduardo's demo identity. The page displays “Tecnología y diseño” at 81%, but saved profile category is “Tecnología”. Demo login with `audit@example.test` and an arbitrary seven-character password routes to dashboard and seeds 420 XP. See `FLOW-EVIDENCE.md`.
- **Real interactions to preserve:** mobile menu opens and exposes Crear cuenta; onboarding reaches result/dashboard; selecting Ciencia de Datos updates the career detail heading; empty and populated evidence screens render without horizontal overflow.
- **No uncaught page errors** observed during the main route/evidence probe. This does not certify absence of console warnings, request errors, or errors in untested inputs.
- Footer's 15 placeholder links and alert-based password recovery remain confirmed source findings from Phase 0. OAuth/backend identity, account-isolated storage, authorized review, and institutional transmission remain delivery gaps. Do not replace them with simulated success messages that imply completion.
- Build/lint/typecheck were not repeated for this read-only audit. Phase 0 results remain historical; successful dev rendering does not establish production-build readiness.

## Top five fixes by visual impact

1. **Restore the intended typography and legibility.** Fix the invalid serif variable chain; verify DM Serif Display actually renders. Define heading tracking/leading and a weight budget. Assign readable ink/background pairs while retaining the palette. **T1–T4, C3.**
2. **Put the product in the first viewport.** Replace the centered promotional stack with a deliberate composition showing an honest onboarding/evidence/trajectory experience. Reduce the four feature sections to two purposeful sections and vary their density. Preserve Aperture as the signature element. **L1, L3, S2.**
3. **Make the dashboard describe the current student.** Replace unsupported academic/cohort claims with useful empty or explicitly illustrative states; show one consistent XP/level model across overview/sidebar and distinguish primary next action from secondary career options. **X1, L3.**
4. **Remove repetitive decoration.** Restrict entrance motion to purposeful transitions/progress/Aperture, provide reduced-motion behavior, replace broad transitions, and define a small elevation scale with one selection cue per surface. **M1–M3, R2–R3.**
5. **Make controls readable, reachable, and complete.** Associate visible labels, enlarge undersized mobile controls, style keyboard focus, and replace dead navigation/recovery behavior with honest working destinations/states. **S3, M4, X1, X3.**

## Screenshot inventory

All paths are relative to this report's directory (`unslop/`).

| Set | Paths |
| --- | --- |
| Bundled initial captures | `screenshots/375.png`, `768.png`, `1024.png`, `1440.png` |
| Scroll-settled landing — preferred for visual review | `screenshots/landing-settled-375.png`, `landing-settled-768.png`, `landing-settled-1024.png`, `landing-settled-1440.png` |
| Hero detail | `screenshots/hero-1440.png` |
| Auth | `screenshots/login-375.png`, `login-1440.png`, `signup-375.png`, `signup-1440.png` |
| Onboarding | `screenshots/onboarding-375.png`, `onboarding-1440.png`, `onboarding-diagnostic-375.png`, `onboarding-analysis-375.png`, `onboarding-result-375.png` |
| Institutions | `screenshots/institutions-375.png`, `institutions-1440.png` |
| Dashboard | `screenshots/dashboard-375.png`, `dashboard-1440.png` |
| Pathways | `screenshots/dashboard-pathways-375.png`, `dashboard-pathways-1440.png` |
| Evidence | `screenshots/dashboard-evidence-375.png`, `dashboard-evidence-1440.png`, `evidence-populated-375.png`, `evidence-verified-1440.png` |
| Mobile navigation | `screenshots/mobile-menu-375.png` |

Supporting reports: `SCAN-EVIDENCE.md`, `CONTRAST-EVIDENCE.md`, `RENDERED-EVIDENCE.md`, `FLOW-EVIDENCE.md`. The computed-serif-variable diagnostic and mobile-menu interaction are additionally recorded in the session's tool outputs and summarized above.

## Phase 2 handoff

Run the Unslop interview workflow using the supplied brief's existing brand answers. Produce the approved `LANE.md` and token-role decisions before retheming. The evidence supports preserving the palette, restoring the specified font pairing, retaining the Aperture and working evidence loop, and changing composition/legibility/state credibility first. Phase 1 makes no design-lane approval or implementation changes on the user's behalf.
