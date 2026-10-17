# Proposed lane: Carta Vocacional

Status: proposed for review; not yet approved. No application source or configuration changed. The final `LANE.md` and ready-to-paste CSS/Tailwind token mapping will be written after explicit approval, as required by the Unslop interview workflow.

## Identity and audience

**Identity:** A Salvadoran school counselor's annotated atlas meets a student's evidence notebook.

**Mood:** grounded, precise, aspirational.

Cumbreal turns learning into evidence that helps students explore possible careers. The visual metaphor is a working document that gains meaning as evidence accumulates: clear headings, ruled divisions, dated entries, and an Aperture that records progress.

Primary audience: Salvadoran students aged 15–22. A representative scenario, not a researched persona: a student who has completed a class project and wants to understand what it demonstrates and what to try next. Institutional partners need to understand that same evidence loop quickly.

The supplied brief already provides the brand, audience, references, colors, typography, motion budget, language, and signature moment. Mood words and the density split below are proposed interpretations. No additional interview answers are invented as user statements.

Reference qualities come from the user's brief: Linear's information density, Notion's editorial hierarchy, Duolingo's visible progression, and Arc's confident dark surfaces. These are qualities to apply, not page layouts to copy or claims about their current interfaces.

## Palette

Exactly four primary roles, drawn from the locked brand palette:

| Role | Hex | Application |
| --- | --- | --- |
| Surface | `#070403` obsidian | Dominant page canvas |
| Ink | `#F8F6F3` ivory | Primary text on dark surfaces |
| Accent | `#DCB5C6` rose | Primary action, selected state, Aperture progression; approximately 5% visual allocation |
| Field | `#151314` charcoal | Product panels and grouped controls |

The remaining two existing colors remain support tokens: `#A66F85` rose-deep for restrained hover/active fills, and `#817B7A` slate for decorative rules or text only where its actual pairing passes contrast. They introduce no additional accent family. The locked palette takes precedence over the skill's hue-derivation guidance.

Ivory may also serve as a deliberate light document surface, paired with obsidian text. Public pages and product views remain predominantly dark; do not alternate dark/light for every section. Light document treatment is reserved for a specific evidence artifact if it materially improves understanding.

Verified opaque sRGB contrast arithmetic:

| Pair | Ratio | Use |
| --- | ---: | --- |
| Ivory on obsidian | 18.94:1 | Primary text |
| Ivory on charcoal | 17.15:1 | Panel text |
| Rose on obsidian | 11.16:1 | Interactive emphasis |
| Rose on charcoal | 10.10:1 | Selected state |
| Obsidian on rose-deep | 5.09:1 | Hovered filled-control text |
| Obsidian on ivory | 18.94:1 | Light document text |

Slate on charcoal is 4.45:1; slate on ivory is 3.86:1; rose-deep on ivory is 3.72:1. These combinations must not carry ordinary small text. Use existing high-contrast ink rather than altering the locked colors. Opacity, gradients, compositing, hover states, and disabled-state treatment require rendered verification; the arithmetic above does not certify the final interface.

## Typography

Keep the two specified Google Fonts: [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) and [Inter](https://fonts.google.com/specimen/Inter). No third font is proposed.

| Slot | Treatment |
| --- | --- |
| Editorial headings | DM Serif Display 400; sentence case; tracking −0.02em; line-height 1.15–1.25 |
| Body and working UI | Inter 400/500/600; body line-height 1.6; concise UI labels may use 1.4 |
| Data and status | Inter with tabular numerals at 400/500; normal tracking; readable text labels alongside numbers |

The third slot uses tabular Inter rather than a new monospace family. Serif headlines remain the core editorial treatment, overriding the skill's generic sans-heading suggestion. Weight budget: three distinct values, 400/500/600. DM Serif Display stays at its real 400 weight; do not synthesize bold or italic.

Size scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64px. Body 16px; interface labels at least 14px; 12px reserved for nonessential metadata. Desktop hero 64px and mobile hero 48px, reducing only if real Spanish copy demands it. Never truncate important action or form labels to preserve a nominal size.

Repair the undefined font-variable chain and verify computed families before assessing the new composition. Font loading alone does not prove the heading uses the serif.

## Space, radius, depth

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px.
- Public page: balanced density. Desktop hero 64–96px vertical space, process section 64px, capability section 48–64px. Mobile section spacing 32–48px. Avoid a full-screen hero followed by five equally padded sections.
- Product: denser working views. Panel padding 24px desktop, 16px mobile; list-row spacing 12–16px; separate content groups by 24–32px. Keep comfortable form and tap spacing.
- Radius roles: 8px controls, 12px panels, 16px major composed containers. Full radius only for circular brand marks, dots, and genuine pill tags. Buttons use 8px corners.
- Primary depth cue: flat surface separation with 1px rules. Decorative rules may use low-opacity ivory. Essential control boundaries and focus indicators must meet applicable non-text contrast requirements.
- Selected controls: one deliberate border treatment, without stacked glow/ring/shadow. Keyboard focus may add a separate offset 2px rose outline so focus remains distinct from selection.
- Resting panels have no shadow. Reserve named shadow tokens for overlays only: `overlay` = `0 12px 32px rgb(7 4 3 / 0.32)`; `modal` = `0 24px 64px rgb(7 4 3 / 0.48)`. No glow elevation tier.

## Texture

**Deliberate editorial flatness:** dark planes, fine rules, meaningful timestamps, and typographic contrast. No grain asset, background grid, radial glow, or decorative blur is needed. The Aperture is a brand mark, not a page-sized watermark. Structure supplies the texture.

## First viewport and page composition

Desktop: approximately 5/12 text and 7/12 product surface. Left: a short serif statement, concrete explanation, and the student action. Right: a bounded, explicitly labeled interactive example with three views: Actividad → Evidencia → Trayectoria. Use synthetic example content, never the visitor's assumed identity or unexplained affinity scores. Keep interaction state in the demonstration; use an explicit action to begin the actual onboarding flow.

Mobile: stack the statement, primary action, and example in that order, with no decorative full-screen minimum height. Show the example as early as the available viewport permits. Keep institutional navigation available as a secondary link rather than a competing filled action.

Below the hero, use at most two explanatory sections:

1. **Cómo funciona:** record learning, explain evidence, explore the next step. Three concise steps separated by rules rather than three equal marketing cards.
2. **Tu siguiente paso:** show an evidence record and one useful next action. Secondary career possibilities can be compact rows, with uncertainty made explicit.

The demo is functional within prototype limits. It must not imply external evidence verification, scientifically validated guidance, account creation, or connected institutional services.

## Motion

Calm budget: 180ms ease-out color/opacity changes; 240ms onboarding-step transitions; at most 300ms initial progress-bar interpolation from actual state. No repeated text entrances or scroll-triggered reveal wrappers. Content is readable on first paint.

No `transition-all`. Name only changed properties. Reduced-motion disables transforms, opening/spinning effects, and progress interpolation; show completed static state immediately. Hover and keyboard focus remain legible without movement.

## Signature moment

Exactly one: **the Aperture opens when the student completes onboarding and sees the initial trajectory hypothesis.** Preserve the existing five-stage identity, but animate the iris geometry opening once over approximately 450ms; reveal the actual result concurrently, with no artificial analysis delay. The stage and copy must agree with stored state. Reduced-motion shows the final Aperture and result immediately. Static Aperture instances elsewhere reinforce identity without competing animation.

This single brand moment is the proposed exception to the calm microinteraction duration budget. It derives from the user's explicit signature-moment brief.

## Do / Don't

**Do**

1. Apply DM Serif Display to display headings and verify computed styles.
2. Pair obsidian/charcoal with readable ivory text and use rose for actual interaction/progression.
3. Separate meaningful evidence rows with rules and show real state-derived counts and timestamps.
4. Provide associated visible labels, at least 44×44px primary touch controls, and visible keyboard focus.
5. Make the current next action visually primary; render speculative career options as secondary content.

**Don't**

1. Rebuild the centered badge/headline/dual-CTA/glow hero.
2. Apply opacity-reduced slate text to ordinary small copy or use rose-deep small text on ivory.
3. Stack border, shadow, and ring to indicate selection.
4. Animate every text block or hide content pending scroll intersection.
5. Display invented academic scores, cohort rankings, demo identities, or externally verified success as student facts.

## Acceptance checks

1. **Identity and type:** screenshots at 375/768/1024/1440 show the revised composition; computed display family is DM Serif Display and body family is Inter; only weights 400/500/600 occur in reachable UI. All six locked colors remain unchanged.
2. **Legibility and controls:** rendered checks include alpha compositing, gradients, hover/focus, and all form routes; normal text passes 4.5:1 and large text 3:1. Forms have associated visible labels; primary touch controls reach 44×44px and keyboard focus is visible.
3. **Composition:** hero contains the labeled, operable example; at most two explanatory sections follow it; no equal three-card career grid or decorative full-screen hero. All links have real destinations.
4. **Motion and geometry:** zero reachable `transition-all`; reduced-motion produces immediate readable final content; no scroll-hidden sections; Aperture reveal occurs once per completion. No horizontal overflow at the four required widths, including populated states.
5. **State credibility:** a fresh student sees honest empty states and the correct identity; creating/verifying evidence updates one XP total in sidebar and overview; onboarding category/result persists consistently. Unconnected external services are clearly represented without fake completion states. Build, lint, and typecheck pass before delivery is claimed.

## Review and next step

Approve this proposed lane, request a specific adjustment, or ask for a meaningfully different direction within the same locked brand. On approval, write `unslop/LANE.md` with the finalized decisions and matching CSS/Tailwind tokens. Retheming remains a subsequent phase.
