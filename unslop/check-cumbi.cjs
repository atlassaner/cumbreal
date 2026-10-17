const fs = require('node:fs');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const allowed = new Set(['#F2AA2E', '#F35524', '#3B8078', '#22313A', '#F7F4EC', '#FFFFFF']);
const results = { assets: [], viewports: [], errors: [], checks: [] };
const check = (name, value) => { assert.ok(value, name); results.checks.push(name); };
for (const name of fs.readdirSync('public/brand/cumbi').filter(n => n.endsWith('.svg') && !n.includes('model-sheet'))) {
  const source = fs.readFileSync('public/brand/cumbi/' + name, 'utf8');
  check(name + ': flat vectors, no raster, outline, gradient or filter', !/<(?:image|filter|linearGradient|radialGradient)\b|\bstroke=/.test(source));
  const fills = [...source.matchAll(/fill="(#[0-9a-fA-F]{6})"/g)].map(m => m[1].toUpperCase());
  check(name + ': locked colors only', fills.every(c => allowed.has(c)));
  check(name + ': ember backpack present', fills.includes('#F35524'));
  results.assets.push(name);
}
(async () => {
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3100'], { stdio: ['ignore', 'pipe', 'pipe'] });
  let browser;
  try {
    await new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('Readiness timeout')), 30000); server.stdout.on('data', d => { if (String(d).includes('Ready')) { clearTimeout(timer); resolve(); } }); server.on('exit', c => { clearTimeout(timer); reject(new Error('Server exited ' + c)); }); });
    browser = await chromium.launch({ channel: 'msedge' });
    const page = await browser.newPage();
    page.on('pageerror', e => results.errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') results.errors.push(m.text()); });
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:3100', { waitUntil: 'networkidle' });
      const state = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
        return { width: innerWidth, title: document.title, overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth), duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i), mascots: document.querySelectorAll('svg.cumbi').length };
      });
      check(width + ': rendered mascot with no overflow or duplicate SVG IDs', state.overflow === 0 && state.duplicateIds.length === 0 && state.mascots >= 5);
      results.viewports.push(state);
    }
    await page.getByRole('button', { name: /Ciencia de datos/ }).click();
    check('Career selector still works', await page.getByRole('heading', { name: 'Ciencia de datos', exact: true }).isVisible());
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto('http://127.0.0.1:3100/onboarding', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await page.getByRole('button', { name: 'Ver mi siguiente paso' }).click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    check('Reduced-motion celebration stays static', await page.locator('.cumbi-celebrate').evaluate(e => getComputedStyle(e).animationName) === 'none');
    await page.screenshot({ path: 'unslop/screenshots/cumbi-revision/onboarding-375.png', fullPage: true });
    const gallery = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const states = ['base', 'curioso', 'celebrando', 'leyendo', 'explorando'];
    const sheetResponse = await gallery.request.get('http://127.0.0.1:3100/brand/cumbi/cumbi-model-sheet-v2.1.svg');
    check('Scalable model sheet is served successfully', sheetResponse.ok() && sheetResponse.headers()['content-type'].includes('image/svg'));
    await gallery.setContent('<style>body{margin:32px;background:#F7F4EC;color:#22313A;font:16px Arial}section{display:flex;align-items:end;gap:26px;border-bottom:1px solid #ccc;padding:24px 0}figure{margin:0;text-align:center}img{display:block}</style>' + states.map(state => '<section><h2>' + state + '</h2>' + [32,64,96,168,288].map(size => '<figure><img src="http://127.0.0.1:3100/brand/cumbi/' + state + '.svg" width="' + size + '" height="' + size + '"/><figcaption>' + size + 'px</figcaption></figure>').join('') + '</section>').join(''));
    await gallery.locator('img').evaluateAll(async images => { await Promise.all(images.map(img => img.decode())); });
    await gallery.screenshot({ path: 'unslop/screenshots/cumbi-revision/pose-size-gallery.png', fullPage: true });
    check('No runtime or console errors', results.errors.length === 0);
    fs.writeFileSync('unslop/CUMBI-REVISION-CHECKS.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify({ assets: results.assets.length, checks: results.checks.length, viewports: results.viewports.length, errors: results.errors }, null, 2));
  } finally { if (browser) await browser.close(); server.kill(); }
})().catch(e => { console.error(e); process.exit(1); });
