// Reproducible exports from the production vectors, never from a separate mascot drawing.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { chromium } = require('playwright');
require.extensions['.tsx'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { Cumbi } = require('../components/cumbreal/cumbi.tsx');
const { CumbiLogo } = require('../components/cumbreal/cumbi-logo.tsx');
const { CumbiArtwork } = require('../components/cumbreal/cumbi-artwork.tsx');
const dir = 'public/brand/cumbi';
fs.mkdirSync(dir, { recursive: true });
const states = ['Base', 'Curioso', 'Celebrando', 'Leyendo', 'Explorando'];
const render = (element, name) => renderToStaticMarkup(element, { identifierPrefix: 'cumbi-' + name });
const draw = (state = 'Base', level = 1, silhouette = false, name = state + level) => render(React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg' }, React.createElement(CumbiArtwork, { state, level, silhouette })), name).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const svg = (body, width = 240, height = 240, viewBox = '0 0 240 240') => '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="' + viewBox + '">' + body + '</svg>';
for (const state of states) fs.writeFileSync(dir + '/' + state.toLowerCase() + '.svg', render(React.createElement(Cumbi, { state, size: 240 }), state));
for (let level = 1; level <= 5; level++) fs.writeFileSync(dir + '/level-' + level + '.svg', render(React.createElement(Cumbi, { state: 'Base', level, size: 240 }), 'level-' + level));
const avatar = render(React.createElement(CumbiLogo, { size: 240 }), 'avatar');
fs.writeFileSync(dir + '/avatar.svg', avatar);
// The app icon uses the official Cumbreal mark; mascot exports are profile assets.

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  try {
    const page = await browser.newPage();
    await page.setContent(svg(draw('Base', 1, true, 'measure')));
    const box = await page.locator('svg > g').evaluate(el => { const b = el.getBBox(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });
    const boxString = [box.x, box.y, box.width, box.height].join(' ');
    let counter = 0;
    const art = (x, y, size, state = 'Base', level = 1, silhouette = false) => '<svg x="' + x + '" y="' + y + '" width="' + size + '" height="' + size + '" viewBox="0 0 240 240">' + draw(state, level, silhouette, 'sheet-' + counter++) + '</svg>';
    const text = (x, y, content, size = 20, fill = '#22313A', extra = '') => '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + fill + '" ' + extra + '>' + content + '</text>';
    const panel = (x, y, w, h, label) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="16" fill="none" stroke="#D8D5C9"/>' + text(x + 24, y + 34, label, 20, '#3B8078', 'font-family="Consolas,monospace"');
    let sheet = '<rect width="2400" height="1680" fill="#F7F4EC"/>';
    sheet += text(32, 72, 'CUMBI', 72, '#22313A', 'font-weight="600"') + text(344, 60, 'Cumbreal / summit companion / model sheet v2.1 / 2026-10-15', 22, '#22313A', 'font-family="Consolas,monospace"');
    sheet += text(2368, 36, 'Organic rounded summit.', 20, '#3B8078', 'text-anchor="end"') + text(2368, 68, 'Soulful · Friendly · Adventurous', 20, '#3B8078', 'text-anchor="end"');
    sheet += panel(32, 100, 870, 600, '01 CONSTRUCTION / base pose');
    sheet += art(260, 160, 470);
    const guides = [['APEX 0%', 203], ['SHOULDER 18%', 273], ['EYE LINE 42%', 367], ['BODY SWELL 65%', 457], ['LEG CLEFT 82%', 523], ['GROUND 100%', 594]];
    for (const [label, y] of guides) sheet += text(58, y - 9, label, 17, '#5A6B75', 'font-family="Consolas,monospace"') + '<path d="M58 ' + y + 'H870" fill="none" stroke="#BBBDB4" stroke-dasharray="6 6"/>';
    sheet += text(467, 651, 'Wide hips · short rounded feet · one smooth contour', 18, '#22313A', 'text-anchor="middle"');
    sheet += panel(918, 100, 620, 600, '02 DESIGN RULES');
    const rules = [
      ['ROUNDED ASYMMETRIC SUMMIT', 'Soft high dome on viewer left; lower right shelf.'],
      ['LARGE FLAT-HOODED EYES', 'White half-capsules; pupils look the same way.'],
      ['CLOSE MICRO-SMILE', 'A tiny warm smile directly below the eye gap.'],
      ['SOFT MITTEN ARMS', 'Round nubs grow naturally from the contour.'],
      ['EMBER BACKPACK + SHORT FEET', 'Pack always visible; soft inverted-V foot gap.'],
      ['FLAT COLOR ONLY', 'No snowcap, outlines, gradients, texture or shadows.'],
    ];
    rules.forEach(([title, body], i) => { const y = 182 + i * 78; sheet += '<circle cx="954" cy="' + (y - 5) + '" r="17" fill="#22313A"/>' + text(954, y + 2, String(i + 1), 18, '#FFFFFF', 'text-anchor="middle"') + text(986, y, title, 18, '#22313A', 'font-weight="600"') + text(986, y + 26, body, 16, '#5A6B75'); });
    sheet += panel(1554, 100, 814, 600, '03 SILHOUETTE TEST / nominal SVG pixel heights');
    let x = 1566;
    for (const height of [288, 168, 96, 64, 32]) {
      const width = height * box.width / box.height;
      sheet += '<svg x="' + x + '" y="' + (483 - height) + '" width="' + width + '" height="' + height + '" viewBox="' + boxString + '">' + draw('Base', 1, true, 'silhouette-' + height) + '</svg>' + text(x + width / 2, 515, height + 'px', 18, '#5A6B75', 'text-anchor="middle"');
      x += width + 8;
    }
    ['Curioso', 'Celebrando', 'Leyendo', 'Explorando'].forEach((state, i) => { const px = 1600 + i * 185; sheet += art(px, 533, 112, state, 1, true) + text(px + 56, 669, state.toLowerCase(), 17, '#5A6B75', 'text-anchor="middle"'); });
    sheet += panel(32, 720, 2336, 320, '04 CORE POSES / consistent anatomy and proportions');
    const captions = ['por defecto', 'preguntas / pistas', 'logros', 'lecciones', 'trayectorias'];
    states.forEach((state, i) => { const px = 148 + i * 454; sheet += art(px, 768, 230, state) + text(px + 115, 998, state.toUpperCase(), 21, '#22313A', 'font-weight="600" text-anchor="middle"') + text(px + 115, 1025, captions[i], 18, '#5A6B75', 'text-anchor="middle"'); });
    sheet += panel(32, 1060, 2336, 310, '05 LEVELS / Cumbi gains gear as the student climbs');
    const levels = ['EXPLORADOR', 'APRENDIZ', 'INVESTIGADOR', 'ESPECIALISTA', 'MAESTRO'];
    const gear = ['mochila', '+ bufanda teal', '+ piolet', '+ cuerda', '+ bandera mayor'];
    levels.forEach((name, i) => { const px = 160 + i * 454; sheet += art(px, 1106, 210, 'Base', i + 1) + text(px + 105, 1325, '0' + (i + 1) + ' ' + name, 20, '#22313A', 'font-weight="600" text-anchor="middle"') + text(px + 105, 1351, gear[i], 18, '#5A6B75', 'text-anchor="middle"'); });
    sheet += panel(32, 1390, 870, 258, '06 PALETTE / solid flat colors');
    const palette = [['AMBER', '#F2AA2E'], ['EMBER', '#F35524'], ['TEAL', '#3B8078'], ['INK', '#22313A'], ['CREAM', '#F7F4EC'], ['WHITE', '#FFFFFF']];
    palette.forEach(([name, hex], i) => { const px = 56 + i * 139; sheet += '<rect x="' + px + '" y="1447" width="112" height="83" rx="12" fill="' + hex + '" stroke="#D8D5C9"/>' + text(px, 1558, name, 17, '#22313A', 'font-weight="600"') + text(px, 1587, hex, 17, '#22313A', 'font-family="Consolas,monospace"'); });
    sheet += panel(918, 1390, 620, 258, '07 AVATAR / default user profile');
    let ax = 938;
    for (const size of [200, 128, 64, 32]) { const raw = render(React.createElement(CumbiLogo, { size }), 'avatar-' + size).replace('<svg ', '<svg x="' + ax + '" y="' + (1630 - size) + '" '); sheet += raw + text(ax + size / 2, 1644, String(size), 14, '#22313A', 'text-anchor="middle"'); ax += size + 22; }
    sheet += panel(1554, 1390, 814, 258, '08 USAGE RULES');
    ['Preserve summit asymmetry and the soft right shoulder.', 'Use generous curves; keep eyes aligned and large.', 'Always include the ember backpack in full-body poses.', 'No ears, nose, whiskers, snowcap, outlines or 3D effects.', 'Keep the small smile close to the eyes. No gradients.', 'Check silhouette and foot cleft at 32px in real contexts.', 'Reduced motion: show the final pose without a jump.', 'No untested accessibility or production-readiness claims.'].forEach((line, i) => { sheet += text(1578, 1450 + i * 24, (i + 1) + '. ' + line, 16, '#22313A'); });
    const full = '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1680" viewBox="0 0 2400 1680" font-family="Arial,sans-serif">' + sheet + '</svg>';
    fs.writeFileSync(dir + '/cumbi-model-sheet-v2.1.svg', full);
    await page.setViewportSize({ width: 2400, height: 1680 });
    await page.setContent('<style>html,body{margin:0;background:#F7F4EC}</style>' + full);
    await page.screenshot({ path: dir + '/cumbi-model-sheet-v2.1.png', fullPage: true });
    const high = await browser.newPage({ viewport: { width: 2400, height: 1680 }, deviceScaleFactor: 2 });
    await high.setContent('<style>html,body{margin:0;background:#F7F4EC}</style>' + full);
    await high.screenshot({ path: dir + '/cumbi-model-sheet-v2.1-4800.png', fullPage: true });
    for (const height of [32, 64, 96, 168, 288]) {
      const width = Math.ceil(height * box.width / box.height);
      await page.setViewportSize({ width, height });
      await page.setContent('<style>html,body{margin:0;background:transparent;overflow:hidden}</style>' + svg(draw('Base', 1, true, 'pixel-' + height), width, height, boxString));
      await page.screenshot({ path: dir + '/silhouette-' + height + '.png', omitBackground: true });
    }
    fs.writeFileSync('unslop/CUMBI-EXPORT-METRICS.json', JSON.stringify({ sourceBounds: box, sheet: { width: 4800, height: 3360 }, states, silhouetteHeights: [32,64,96,168,288], palette: palette.map(p => p[1]) }, null, 2));
    console.log('Exported production SVGs, five gear levels, avatar, actual-pixel silhouettes, and 4800×3360 model sheet to ' + dir);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
