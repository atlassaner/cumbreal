const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = 'http://127.0.0.1:3200';
const outputDir = path.resolve(__dirname, '../../outputs/site-screenshots-2026-10-16');
const manifest = [];
const consoleProblems = [];

fs.mkdirSync(outputDir, { recursive: true });

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(root);
      if (response.ok) {
        console.log('Local site is ready.');
        return;
      }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error('The local site did not become ready on port 3200.');
}

async function capturePage(page, file, label) {
  await page.screenshot({ path: path.join(outputDir, file), fullPage: true });
  manifest.push({ file, label, url: page.url() });
}

async function captureElement(locator, file, label) {
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: path.join(outputDir, file) });
  manifest.push({ file, label, url: locator.page().url() });
}

async function goto(page, route) {
  await page.goto(root + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
}

(async () => {
  const server = spawn(process.execPath, [
    'node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3200'
  ], { cwd: path.resolve(__dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', chunk => process.stdout.write(chunk));
  server.stderr.on('data', chunk => process.stderr.write(chunk));
  server.on('exit', code => console.log(`Local server exited with code ${code}.`));

  let browser;
  try {
    await waitForServer();
    console.log('Launching Edge.');
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    console.log('Edge launched.');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      locale: 'es-SV'
    });
    const page = await context.newPage();
    page.on('console', message => {
      if (message.type() === 'error') consoleProblems.push({ url: page.url(), text: message.text() });
    });
    page.on('pageerror', error => consoleProblems.push({ url: page.url(), text: error.message }));

    await goto(page, '/');
    const homeSections = page.locator('main > section');
    await captureElement(homeSections.nth(0), '01-inicio-hero.png', 'Inicio — presentación principal');
    await captureElement(page.locator('#metodo'), '02-inicio-metodo.png', 'Inicio — sección El método');
    await captureElement(page.locator('#trayectorias'), '03-inicio-trayectorias.png', 'Inicio — sección Trayectorias');
    await captureElement(page.locator('footer'), '04-inicio-footer.png', 'Inicio — pie de página');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('button[aria-label="Abrir menú"]').click();
    await capturePage(page, '05-inicio-menu-movil.png', 'Inicio — menú móvil abierto');
    await page.setViewportSize({ width: 1440, height: 1000 });

    await goto(page, '/login');
    await capturePage(page, '06-ingresar.png', 'Ingresar');
    await goto(page, '/signup');
    await capturePage(page, '07-crear-perfil.png', 'Crear perfil');
    await goto(page, '/forgot-password');
    await capturePage(page, '08-recuperar-acceso.png', 'Recuperar acceso');

    await goto(page, '/institutions');
    await captureElement(page.locator('main > section').nth(0), '09-instituciones-propuesta.png', 'Instituciones — propuesta');
    await captureElement(page.locator('main > section').nth(1), '10-instituciones-formulario.png', 'Instituciones — formulario');
    await page.locator('#institution-name').fill('María López');
    await page.locator('#institution-email').fill('maria@example.test');
    await page.locator('#institution-organization').fill('Institución de demostración');
    await page.locator('#institution-population').fill('120 estudiantes de bachillerato');
    await page.getByRole('button', { name: /Probar el formulario/i }).click();
    await captureElement(page.locator('main > section').nth(1), '11-instituciones-confirmacion.png', 'Instituciones — confirmación del prototipo');

    await goto(page, '/privacy');
    await capturePage(page, '12-privacidad.png', 'Privacidad del prototipo');

    await goto(page, '/onboarding');
    await capturePage(page, '13-diagnostico-introduccion.png', 'Diagnóstico — introducción');
    await page.getByRole('button', { name: /Comenzar mis 18 actividades/i }).click();
    for (let block = 1; block <= 6; block += 1) {
      await page.getByText(new RegExp(`Bloque ${block} de 6`)).waitFor();
      await capturePage(page, `${String(13 + block).padStart(2, '0')}-diagnostico-bloque-${block}.png`, `Diagnóstico — bloque ${block} de 6`);
      const fieldsets = page.locator('fieldset');
      for (let index = 0; index < 3; index += 1) {
        const score = [5, 4, 2][index];
        await fieldsets.nth(index).locator(`input[value="${score}"]`).check();
      }
      await page.getByRole('button', { name: block === 6 ? /Ver mis resultados/i : /^Continuar$/i }).click();
    }
    await page.getByRole('heading', { name: /Un mapa para comenzar/i }).waitFor();
    await capturePage(page, '20-diagnostico-resultados.png', 'Diagnóstico — resultados y rutas recomendadas');
    const pathwaySelect = page.locator('#primary-pathway');
    await pathwaySelect.selectOption({ index: 1 });
    await capturePage(page, '21-diagnostico-ruta-elegida.png', 'Diagnóstico — trayectoria elegida y primer proyecto');
    await page.getByRole('button', { name: /Crear perfil y guardar resultado/i }).click();
    await page.waitForURL('**/signup');
    await page.locator('#name').fill('Ana Demostración');
    await page.locator('#email').fill('ana.demo@example.test');
    await page.locator('#password').fill('Cumbreal Demo 2026');
    await page.locator('#confirmation').fill('Cumbreal Demo 2026');
    await page.getByRole('button', { name: /Crear mi perfil local/i }).click();
    await page.waitForURL('**/dashboard');

    await goto(page, '/dashboard');
    await capturePage(page, '22-mi-espacio.png', 'Mi espacio — resumen y progreso');
    await goto(page, '/dashboard/pathways');
    const firstPathButton = page.locator('main button').filter({ hasText: /.+/ }).first();
    if (await firstPathButton.count()) await firstPathButton.click();
    await capturePage(page, '23-mi-espacio-trayectorias.png', 'Mi espacio — perfil y explorador de trayectorias');

    await goto(page, '/dashboard/evidence');
    await capturePage(page, '24-evidencias-vacio.png', 'Evidencias — estado inicial');
    await page.locator('#activity-title').fill('Página informativa para mi escuela');
    await page.locator('#activity-skill').fill('Diseño de interfaces');
    await page.locator('#activity-description').fill('Diseñé una página clara para compartir información útil con estudiantes y familias.');
    await page.getByRole('button', { name: /Registrar actividad/i }).click();
    await capturePage(page, '25-evidencias-actividad.png', 'Evidencias — actividad registrada');
    await page.getByLabel(/Describe o enlaza tu evidencia/i).fill('Prototipo: https://example.test/proyecto-escolar');
    await page.getByRole('button', { name: /Enviar evidencia/i }).click();
    await capturePage(page, '26-evidencias-en-revision.png', 'Evidencias — evidencia en revisión');
    await page.getByRole('button', { name: /Verificar en modo de prueba/i }).click();
    await capturePage(page, '27-evidencias-verificada.png', 'Evidencias — evidencia verificada y celebración');

    const summary = {
      generatedAt: new Date().toISOString(),
      viewport: '1440x1000, plus 390x844 for the mobile menu',
      count: manifest.length,
      screenshots: manifest,
      consoleProblems
    };
    fs.writeFileSync(path.join(outputDir, 'manifest.json'), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify({ outputDir, count: manifest.length, consoleProblems }, null, 2));
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
