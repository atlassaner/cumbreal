# Cumbi v2.1 — reference replacement

October 15, 2026. Replaces the provisional mountain mascot introduced during the V2 retheme.

## Reference interpretation

Used the supplied standalone waving mascot and five-pose strip for character anatomy/personality, and the supplied eight-panel sheet for documentation structure. The pasted instructions number those references differently from the attachment order; their visual roles, rather than their ordinal numbers, were followed.

Preserved the eight-panel construction/rules/silhouette/poses/levels/palette/avatar/usage composition and nominal construction labels. Reconstructed the artwork as editable flat vectors rather than embedding the textured raster references. The model sheet is generated from the exact production paths used in the app, so it does not introduce a second character design.

## Replacement

- Wider, low-centered body with a rounded high summit on the viewer's left and a lower right shoulder shelf.
- Large white, flat-hooded eyes, aligned pupils, and a small smile close beneath the eyes.
- Soft mitten arms, short feet and rounded inverted-V foot cleft.
- Ember backpack visible in every full-body pose; no snowcap, exterior outline, gradient, raster texture, ground shadow, or bevel.
- Base welcoming wave; Curioso head tilt/question/folded hand; Celebrando raised arms/happy arc eyes; Leyendo open teal book; Explorando walking/waving pose.
- Curioso's hand uses negative space to distinguish the folded arm without adding an outline.
- Five gear variants: backpack, scarf, ice axe, rope, summit flag. These are available via the component's optional level prop and in standalone exports. The model-sheet level-five label follows the supplied reference; application progression terminology is unchanged.
- Header/footer/auth/dashboard avatars and the browser icon now use the new large-eyed character instead of the old teal snowcapped symbol.
- Hero uses the welcoming Base pose; existing contextual state choices elsewhere remain intact. Celebration keeps the existing reduced-motion fallback.

## Files

Production source:

- `components/cumbreal/cumbi-artwork.tsx`: shared anatomy, expressions, gear, silhouette variant.
- `components/cumbreal/cumbi.tsx`: accessible, responsive SVG wrapper; existing state/size/className API preserved, optional Base/level/decorative support added.
- `components/cumbreal/cumbi-logo.tsx`: cropped avatar from the same paths.
- `app/icon.svg`: exported compact icon.

Assets in `public/brand/cumbi/`:

- `base.svg`, `curioso.svg`, `celebrando.svg`, `leyendo.svg`, `explorando.svg`.
- `level-1.svg` through `level-5.svg`, plus `avatar.svg`.
- `cumbi-model-sheet-v2.1.svg`: scalable editable sheet.
- `cumbi-model-sheet-v2.1.png`: 2400×1680 preview.
- `cumbi-model-sheet-v2.1-4800.png`: **4800×3360** delivery image.
- `silhouette-32.png`, `64`, `96`, `168`, `288`: transparent exports at the stated actual character heights. The high-resolution sheet is a 2× render of its nominal SVG dimensions; the separate silhouette files provide true pixel-size checks.

Only these locked artwork colors are used: Amber #F2AA2E, Ember #F35524, Teal #3B8078, Ink #22313A, Cream #F7F4EC, White #FFFFFF. Sheet guide rules and explanatory labels retain neutral documentation styling. The art rules do not imply that decorative palette colors are approved for small UI text.

## Verification

- Production build includes ESLint and TypeScript validation.
- Browser plugin unavailable; used existing bundled Playwright and installed Edge. No dependencies added.
- Four fresh site captures at 375/768/1024/1440px; no horizontal overflow or duplicated SVG IDs.
- 11 production SVG exports checked for flat-vector content, the locked fill palette, backpack presence, and absence of raster images/strokes/gradients/filters.
- Checked career selection still updates, onboarding reaches celebration, and reduced-motion disables its jump.
- Visually reviewed the model sheet, desktop/mobile landing, and a 32/64/96/168/288px pose gallery.
- `CUMBI-REVISION-CHECKS.json` records the focused checks. This is not a new general accessibility certification or a rerun of the previous full product audit.

The first production attempts were interrupted by a stale Cumbreal dev process writing into the same generated .next folder. Verified and stopped only that process and its child, cleared only the project's generated cache, and rebuilt. No source rollback or data deletion was needed.

## Reproduce

With the existing bundled Playwright directory on NODE_PATH:

```powershell
node unslop/export-cumbi.cjs
node unslop/verify-pass.cjs cumbi-revision
node unslop/check-cumbi.cjs
```

Source reference images on the Desktop were read only and remain unchanged. No external publication was performed.
