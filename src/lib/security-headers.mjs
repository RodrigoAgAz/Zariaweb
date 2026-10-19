// After each build, writes the real Content-Security-Policy into dist/_headers: the union of
// the per-page <meta> policies Astro generates (with their script and style hashes), plus the
// directives a <meta> policy cannot carry (frame-ancestors).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function htmlFiles(dir) {
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...(await htmlFiles(p)));
		else if (e.name.endsWith('.html')) out.push(p);
	}
	return out;
}

export function securityHeaders() {
	return {
		name: 'zaria-security-headers',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const root = fileURLToPath(dir);
				const directives = new Map();
				for (const file of await htmlFiles(root)) {
					const html = await readFile(file, 'utf8');
					const m = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/);
					if (!m) throw new Error(`No CSP meta in ${file}`);
					for (const part of m[1].split(';')) {
						const [name, ...values] = part.trim().split(/\s+/);
						if (!name) continue;
						if (!directives.has(name)) directives.set(name, new Set());
						for (const v of values) directives.get(name).add(v);
					}
				}
				directives.set('frame-ancestors', new Set(["'none'"]));
				const csp = [...directives].map(([k, v]) => [k, ...v].join(' ')).join('; ');
				const path = join(root, '_headers');
				const headers = await readFile(path, 'utf8');
				await writeFile(path, headers.replace('Content-Security-Policy: __CSP__', `Content-Security-Policy: ${csp}`));
				logger.info(`Wrote CSP to _headers (${directives.size} directives).`);
			},
		},
	};
}
