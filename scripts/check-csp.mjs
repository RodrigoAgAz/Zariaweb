// Loads every built page through scripts/serve.mjs (which applies _headers) and reports CSP
// violations, console errors, failed requests and any request to another origin.
// Usage: node scripts/check-csp.mjs [baseUrl]
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const base = (process.argv[2] ?? 'http://localhost:4322').replace(/\/$/, '');
async function pages(dir, prefix = '/') {
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		if (e.isDirectory() && !e.name.startsWith('_')) out.push(...(await pages(join(dir, e.name), `${prefix}${e.name}/`)));
		else if (e.name === 'index.html') out.push(prefix);
	}
	return out;
}
const routes = [...(await pages('dist')), '/this-page-does-not-exist/'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage();
const problems = [];
let current = '';
page.on('console', (m) => !(current.startsWith('/this-page') && /404/.test(m.text())) && (m.type() === 'error' || /Content Security Policy/i.test(m.text())) && problems.push(`${current}: console ${m.type()}: ${m.text()}`));
page.on('pageerror', (e) => problems.push(`${current}: page error: ${e.message}`));
page.on('requestfailed', (r) => problems.push(`${current}: request failed: ${r.url()}`));
page.on('request', (r) => !r.url().startsWith(base) && !r.url().startsWith('data:') && problems.push(`${current}: third-party request: ${r.url()}`));
let headersChecked = false;
for (const route of routes) {
	current = route;
	const response = await page.goto(base + route, { waitUntil: 'networkidle' });
	if (!headersChecked) {
		const h = response.headers();
		for (const name of ['content-security-policy', 'strict-transport-security', 'x-content-type-options', 'referrer-policy', 'permissions-policy'])
			console.log(`${name}: ${h[name] ? 'present' : 'MISSING'}`);
		headersChecked = true;
	}
}
const cookies = await page.context().cookies();
console.log(`${routes.length} pages loaded; cookies set: ${cookies.length}`);
console.log(problems.length ? problems.join('\n') : 'No CSP violations, console errors, failed or third-party requests.');
await browser.close();
process.exit(problems.length ? 1 : 0);
