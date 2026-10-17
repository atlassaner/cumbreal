# Cumbreal — Phase 0: architecture and readiness

Date: October 14, 2026 (America/El_Salvador).

## Scope and conclusion

Phase 0 establishes what exists, what is simulated, and what must be preserved before the Unslop audit. The supplied CODEX-UNSLOP-PROMPT.md is a planning brief; its claims were checked against source rather than assumed correct. Only this phase is delivered here. No design score, redesign, backend implementation, or deployment is claimed.

Cumbreal is an interactive browser-local prototype with reusable product flows. It is not yet ready for production delivery. The visual transformation is feasible with the current stack, but polishing the interface alone will not deliver authentication, isolated student records, validated career guidance, or institutional lead capture.

This report is based on source inspection and attempted tooling checks. Browser interactions, contrast, and responsive appearance remain unverified and belong to Phase 1.

## Workspace and stack

- Application root: `project/` inside the supplied workspace.
- No Git repository detected at the application root or its parents. There is no commit baseline or rollback history available here.
- No workspace AGENTS.md files found outside dependencies.
- Installed Next.js: **14.2.35** (`node_modules/next/package.json:3`). The older REFACTOR_PLAN.md description of Next 13 is stale.
- React 18.2.0, TypeScript 5.2.2, Tailwind 3.3.3; Framer Motion, Lucide, and Radix/shadcn available in the manifest.
- Supabase is declared, but no Supabase calls, environment configuration reads, or fetch calls were found in application/domain source. Its installation does not constitute an integrated backend.
- Commands declared: `dev`, `build`, `start`, `lint`, `typecheck` (`package.json`). No test script is declared.
- Netlify deployment configuration exists (`netlify.toml`); deployment has not been verified.

## Architecture map

```text
app/layout.tsx
  Inter + DM Serif Display; Spanish document language
  AuthProvider
    ProgressProvider
      /
        Header → Hero → DashboardPreview
        → Evidence / Strengths / Pathways / Bridge marketing sections
        → Footer + dormant OnboardingModal
      (auth)/layout.tsx
        /login
        /signup
      /onboarding       four-step wizard
      /dashboard       client-side session guard + sidebar/top bar
        /              overview: mixed local data and fixed metrics
        /pathways      selectable career cards, fixed career content
        /evidence      activity creation, note submission, demo review
      /institutions    pilot-interest form, local success state only

lib/auth-context.tsx       browser-local profile/session
lib/progress-context.tsx   browser-local activities/evidence and derived XP
components/cumbreal/      brand and marketing components
components/ui/            47 shadcn-style component files
```

There are eight page routes. Auth route groups do not appear in URLs. No server API routes or middleware were found in the source inventory.

## Product and data flows

| Flow | Current implementation | Delivery limitation |
| --- | --- | --- |
| Landing → student onboarding | Header and hero link directly to `/onboarding` | Signup can be bypassed |
| Signup → onboarding | Name/email stored in `cumbreal_session`; initial level 1 and 50 XP | No account creation service; password is not processed by provider |
| Login → dashboard | Email is used to generate a demo profile after simulated latency | Password ignored; an existing signup profile is replaced by a demo profile |
| Onboarding → dashboard | Goal and slider produce an illustrative affinity; a separate result is stored in `cumbreal_onboarding` | No validated assessment; profile category is always written as Tecnología even when displayed category differs |
| Evidence → XP | Create activity → submit note → verify/reject in same UI; verified evidence adds 100 XP | Self-review is a demo action; no reviewer role or server verification |
| Progress persistence | `cumbreal_progress` stores activities in localStorage | Shared across accounts in the same browser; not cleared by logout |
| Institutional inquiry | Submit prevents default and sets `sent=true` | Entered information is neither saved nor sent |

Evidence: `lib/auth-context.tsx:46`, `:74`, `:91`, `:124`; `lib/progress-context.tsx:10-20`; `app/onboarding/page.tsx:46-75`; `app/dashboard/evidence/page.tsx:7-13`; `app/institutions/page.tsx:7-9`.

The root progress provider is independent of the authenticated user. Logout removes only the session key; a subsequent user can see the same activities. Progress hydration also parses JSON without error handling. These are concrete state-management issues to address before using real student data.

## Corrections to the supplied brief

| Brief claim | Verified state | Consequence for later work |
| --- | --- | --- |
| Several landing nav anchors do not exist | All five exist: método, trayectoria, orientación, instituciones, nosotros | Preserve working navigation; re-map anchors only when sections change |
| Sidebar points to missing strengths/settings pages | Current links target dashboard, pathways, evidence, onboarding, and the existing `#evidencias` anchor | Do not create unnecessary stub pages |
| XP never changes through user actions | Evidence verification awards 100 XP per verified activity | Preserve the working evidence loop and reconcile its display |
| All dashboard data is fixed | Greeting name, activity count, and total XP use local state; academic scores, cohort claims, career scores, and level progress remain fixed | Replace misleading fixed claims without discarding existing state integration |
| New users have no empty states | Evidence page already has an empty state | Extend empty-state treatment to overview widgets |
| Onboarding has one fixed affinity outcome | Page computes affinity from slider and category from goal | Preserve the illustrative input/result behavior; fix category persistence mismatch |
| Legacy modal is dead but still rendered | Imported and rendered with `open=false`; only open callbacks are passed to Header/Hero, which never invoke them | Remove modal, import, state, and obsolete callback props together in implementation phase |
| Around eight UI components are used | 47 UI files exist; no `@/components/ui/` imports found in app or domain components | Build a complete import/re-export reachability inventory before deleting files or packages |
| All current inputs have labels | Auth forms have labels; evidence and institution forms rely on placeholders | Audit accessible names throughout the product |

Navigation evidence: `components/cumbreal/header.tsx:13-17`; section IDs in `feature-evidence.tsx:14`, `feature-pathways.tsx:15`, `feature-strengths.tsx:14`, `feature-bridge.tsx:15`, `footer.tsx:22`; `app/dashboard/layout.tsx:21-27` and `app/dashboard/page.tsx:116`.

Modal evidence: `app/page.tsx:12-29`, `header.tsx:23`, `hero.tsx:13`. Progress evidence: `lib/progress-context.tsx:17-20` and `app/dashboard/page.tsx:35-55`.

## Confirmed problems to carry forward

1. **Template composition:** hero uses a radial glow, grid overlay, centered content, pills, dual actions, delayed entrance animations, and a scroll indicator (`components/cumbreal/hero.tsx:16-117`). This is source evidence; visual scoring is deferred.
2. **Fixed product claims:** preview displays Eduardo, 420 XP, and 87% affinity (`dashboard-preview.tsx:53`, `:63`, `:113`). Overview includes fixed academic scores, 83.6 average, 87% affinity, a top-15%-of-cohort statement, and 72% level progression (`app/dashboard/page.tsx:21-31`, `:67`, `:111`, `:124`, `:142`). No underlying measured cohort data was found.
3. **Inconsistent progression:** overview combines profile XP with evidence XP; sidebar uses profile XP only and a fixed level progress label (`app/dashboard/layout.tsx:116-118`). Onboarding and login assign different base XP values.
4. **Auth prototype behavior:** login fields are prefilled and recovery uses an alert (`app/(auth)/login/page.tsx:14-15`, `:94-97`). Signup has one password field; neither provider method validates a password. The dashboard guard is entirely client-side (`app/dashboard/layout.tsx:41-49`).
5. **Dead footer links:** twelve generated section links plus three legal links point to `#` (`components/cumbreal/footer.tsx:5-18`, `:52`, `:70-76`).
6. **Styling debt:** broad transitions, arbitrary shadows, repeated entrance animations, and varied radii occur across marketing, auth, onboarding, and dashboard. Inventory and review rendered evidence during Phase 1 before applying global replacements.
7. **Accessibility candidates:** opacity-reduced slate text, missing labels on evidence/institution fields, and an unnamed dashboard mobile menu button (`app/dashboard/layout.tsx:70-75`). Landing menu already has an aria-label. Contrast and keyboard behavior still require measurement.
8. **Brand metadata leak:** Open Graph and Twitter images still reference Bolt's default image (`app/layout.tsx`).
9. **Brand implementation detail:** repeated Aperture instances can emit the same SVG gradient ID (`components/cumbreal/aperture.tsx:69`). Preserve the component; consider per-instance IDs when enhancing it.

## Preserve during transformation

- Obsidian `#070403`, charcoal `#151314`, ivory `#F8F6F3`, rose `#DCB5C6`, rose-deep `#A66F85`, slate `#817B7A` (`tailwind.config.ts`). Rose remains a restrained accent.
- DM Serif Display headlines and Inter UI/body (`app/layout.tsx`).
- Five-stage Aperture identity and level names (`components/cumbreal/aperture.tsx:12-18`).
- Spanish Latin American UI copy.
- Working routes, goal/slider onboarding, activity/evidence transitions, and locally derived XP.
- Existing dependencies unless a specific implementation need justifies an addition. No dependencies added in Phase 0.

## Validation baseline and limits

| Check | Observed result |
| --- | --- |
| Source and route inventory | Completed |
| Working-tree baseline | Unavailable: folder is not a Git repository |
| `npm` by default shell lookup | Not available on PATH; installed Node/npm located under `C:\Program Files\nodejs` |
| Next lint wrapper | Dependency preflight reported missing TypeScript packages even though package files exist, then attempted automatic installation; installation was interrupted. Manifest and lockfile remained unchanged |
| Direct ESLint check | Failed with two `react/no-unescaped-entities` errors at `app/onboarding/page.tsx:202` |
| Production build | Failed: Google Fonts DNS lookup (`ENOTFOUND fonts.googleapis.com`) and permission errors creating `.next/types/app/...` directories |
| Typecheck | Initial concurrent run failed on missing generated `.next/types` files. Final direct `tsc --noEmit --incremental false` completed successfully after the build attempts ended |
| Browser render / four viewports / contrast | Not performed in Phase 0; no screenshot or accessibility pass claimed |

Build attempts overlapped and touched the same generated `.next` directory. That can affect generated-type checks; do not attribute the missing-type errors solely to application source. Re-run build, then typecheck sequentially after fixing environment access. `next.config.js` also sets `eslint.ignoreDuringBuilds=true`, so a build alone will not certify lint cleanliness.

No product source, styles, configuration, manifest, or lockfile was intentionally edited. Next tooling touched generated build artifacts. The audit skill was read to prepare the handoff; its scored audit was not executed.

## Phase 1 handoff

1. Establish a reversible source baseline (Git or a source-only snapshot) before implementation work.
2. Restore reliable runtime checks: use the installed Node/npm path, resolve dependency preflight and generated-directory access, and allow the existing font fetches or intentionally self-host the same fonts in a later implementation change. Run build and typecheck sequentially.
3. Start the dev server and verify rendering. If startup fails, document the prerequisite error before attempting a visual audit.
4. Run Unslop audit capture/scans at 375, 768, 1024, and 1440px. Inspect each screenshot and measure contrast. Include auth, onboarding, dashboard, evidence empty/populated states, pathways, and institutions in the product review.
5. Write `unslop/DESIGN-AUDIT.md` with checklist IDs, evidence, scores, screenshots, and prioritized fixes. This Phase 0 report is not a substitute for that artifact.
6. Use the supplied brand answers as input to Phase 2's design lane. Apply that approved lane in Phase 3, preserving current behavior and correcting the state issues above.

The design phases can deliver a credible prototype. A real student pilot additionally needs server-backed identity, per-user persistence, authorized evidence review, honest assessment semantics, and a functioning institutional contact channel. Track those explicitly rather than implying they are delivered by a retheme or decorative OAuth/reset controls.
