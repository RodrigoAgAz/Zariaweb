// Serves dist/ locally the way a static host would, applying dist/_headers (path rules with
// "*" wildcards), directory indexes and 404.html. Used for header checks and Lighthouse.
// Usage: node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = 'dist';
const port = Number(process.argv[2] ?? 4322);
const types = {
	'.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
	'.png': 'image/png', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.webp': 'image/webp', '.woff2': 'font/woff2',
	'.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

function parseHeaders(text) {
	const rules = [];
	let current = null;
	for (const line of text.split('\n')) {
		if (!line.trim() || line.trim().startsWith('#')) continue;
		if (!/^\s/.test(line)) rules.push((current = { pattern: line.trim(), headers: [] }));
		else if (current) {
			const i = line.indexOf(':');
			current.headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
		}
	}
	return rules.map((r) => ({ ...r, re: new RegExp(`^${r.pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`) }));
}

const rules = parseHeaders(await readFile(join(root, '_headers'), 'utf8').catch(() => ''));

createServer(async (req, res) => {
	const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
	let file = normalize(join(root, path));
	let status = 200;
	try {
		if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
		await stat(file);
	} catch {
		file = join(root, '404.html');
		status = 404;
	}
	for (const rule of rules) if (rule.re.test(path)) for (const [k, v] of rule.headers) res.setHeader(k, v);
	res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
	res.writeHead(status);
	res.end(await readFile(file));
}).listen(port, () => console.log(`Serving dist/ with _headers on http://localhost:${port}`));
