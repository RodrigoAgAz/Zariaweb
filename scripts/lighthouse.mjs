// Runs Lighthouse (mobile and desktop) on every built page and writes HTML and JSON reports to
// reports/lighthouse/, plus reports/lighthouse-summary.md.
// Serve the build first: `npm run build:audit && npm run serve`, then `npm run lighthouse`.
// Usage: node scripts/lighthouse.mjs [baseUrl]
import { execFileSync } from 'node:child_process';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.argv[2] ?? 'http://localhost:4322').replace(/\/$/, '');
const chrome = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out = 'reports/lighthouse';
await mkdir(out, { recursive: true });

async function pages(dir, prefix = '/') {
	const list = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		if (e.isDirectory() && !e.name.startsWith('_')) list.push(...(await pages(join(dir, e.name), `${prefix}${e.name}/`)));
		else if (e.name === 'index.html') list.push(prefix);
	}
	return list;
}
const routes = (await pages('dist')).sort();
const name = (r) => (r === '/' ? 'en-home' : r === '/es/' ? 'es-home' : r.startsWith('/es/') ? `es-${r.slice(4, -1).replace(/\//g, '-')}` : `en-${r.slice(1, -1).replace(/\//g, '-')}`);

const rows = [];
for (const route of routes) {
	for (const form of ['mobile', 'desktop']) {
		const path = join(out, `${name(route)}-${form}`);
		const args = [
			'lighthouse', base + route, '--chrome-flags=--headless=new --no-sandbox',
			'--output=json', '--output=html', `--output-path=${path}`, '--quiet',
			...(form === 'desktop' ? ['--preset=desktop'] : []),
		];
		// Lighthouse occasionally fails to record a trace (NO_NAVSTART); retry up to twice.
		for (let attempt = 1; ; attempt++) {
			try {
				execFileSync('npx', args, { stdio: 'inherit', env: { ...process.env, CHROME_PATH: chrome } });
				break;
			} catch (error) {
				if (attempt === 3) throw error;
				console.log(`Retrying ${route} (${form})`);
			}
		}
		const lhr = JSON.parse(await readFile(`${path}.report.json`, 'utf8'));
		const c = lhr.categories;
		const a = lhr.audits;
		rows.push({
			route, form,
			perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100),
			bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100),
			lcp: (a['largest-contentful-paint'].numericValue / 1000).toFixed(2),
			cls: a['cumulative-layout-shift'].numericValue.toFixed(3),
			kb: Math.round(a['total-byte-weight'].numericValue / 1024),
		});
		console.log(JSON.stringify(rows.at(-1)));
	}
}
const table = [
	'| Page | Form | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | Weight (KB) |',
	'|---|---|---|---|---|---|---|---|---|',
	...rows.map((r) => `| ${r.route} | ${r.form} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.kb} |`),
].join('\n');
const fails = rows.filter((r) => r.form === 'mobile' && (r.perf < 95 || r.a11y < 95 || r.bp < 95 || r.seo < 95 || r.lcp >= 2 || r.cls >= 0.05 || r.kb >= 500));
await writeFile(
	'reports/lighthouse-summary.md',
	`# Lighthouse summary\n\nLighthouse ${JSON.parse(await readFile(`${join(out, `${name(routes[0])}-mobile`)}.report.json`, 'utf8')).lighthouseVersion}, run ${new Date().toISOString().slice(0, 10)} against \`${base}\`. Mobile uses Lighthouse's default simulated throttling (Moto G Power, slow 4G).\n\nTargets (mobile): every category 95 or more, LCP under 2.0 s, CLS under 0.05, page weight under 500 KB.\n\n${table}\n\n${fails.length ? `**${fails.length} mobile run(s) below target.**` : '**Every page meets every target on mobile.**'}\n`,
);
console.log(fails.length ? `${fails.length} mobile run(s) below target` : 'All mobile targets met');
