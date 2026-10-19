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
		// The body clips horizontal overflow, so also look for text that runs past the viewport edge.
		const overflow = await page.evaluate(() => {
			const page = document.documentElement.scrollWidth - window.innerWidth;
			const clipped = [...document.querySelectorAll('h1,h2,h3,p,li,a,dd,dt,address,span')].filter((el) => {
				if (el.closest('.zdev, .visually-hidden, .skip-link')) return false;
				const r = el.getBoundingClientRect();
				return r.width > 0 && (r.right > window.innerWidth + 0.5 || el.scrollWidth > el.clientWidth + 1);
			});
			return Math.max(page, clipped.length ? Math.max(1, ...clipped.map((el) => Math.ceil(Math.max(el.getBoundingClientRect().right - window.innerWidth, el.scrollWidth - el.clientWidth)))) : 0);
		});
		const slug = route.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
		const name = slug === '' ? 'en-home' : slug === 'es' ? 'es-home' : slug.startsWith('es/') ? slug.replace(/\//g, '-') : `en-${slug.replace(/\//g, '-')}`;
		const file = join(outDir, `${name.replace(/\.html$/, '')}--${width}.png`);
		await page.screenshot({ path: file, fullPage: true });
		console.log(`${file}${overflow > 0 ? `  HORIZONTAL OVERFLOW ${overflow}px` : ''}`);
	}
	await context.close();
}
await browser.close();
