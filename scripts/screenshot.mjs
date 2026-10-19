// Screenshots every built page at 375, 768 and 1440 px wide into /screenshots.
// Usage: node scripts/screenshot.mjs [baseUrl] [filter]
//   baseUrl defaults to http://localhost:4321 (run `npx astro preview` first).
//   filter is an optional substring of the page path, e.g. "/es/".
import { readdir } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const filter = process.argv[3] ?? '';
const widths = (process.env.WIDTHS ?? '375,768,1440').split(',').map(Number);
const outDir = process.env.OUT ?? 'screenshots';

async function pages(dir, prefix = '/') {
	const out = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (entry.name.startsWith('_')) continue;
			out.push(...(await pages(join(dir, entry.name), `${prefix}${entry.name}/`)));
		} else if (entry.name === 'index.html') out.push(prefix);
		else if (entry.name === '404.html') out.push(`${prefix}404.html`);
	}
	return out;
}

const routes = (await pages('dist')).filter((p) => p.includes(filter)).sort();
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
for (const width of widths) {
	const context = await browser.newContext({
		viewport: { width, height: width < 600 ? 812 : width < 1000 ? 1024 : 900 },
		deviceScaleFactor: 1,
		reducedMotion: 'reduce',
	});
	const page = await context.newPage();
	for (const route of routes) {
		await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
		const slug = route.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
		const name = slug === '' ? 'en-home' : slug === 'es' ? 'es-home' : slug.startsWith('es/') ? slug.replace(/\//g, '-') : `en-${slug.replace(/\//g, '-')}`;
		const file = join(outDir, `${name.replace(/\.html$/, '')}--${width}.png`);
		await page.screenshot({ path: file, fullPage: true });
		console.log(`${file}${overflow > 0 ? `  HORIZONTAL OVERFLOW ${overflow}px` : ''}`);
	}
	await context.close();
}
await browser.close();
