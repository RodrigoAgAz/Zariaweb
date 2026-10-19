// Launch gate. Runs after every build and inspects the generated files.
// - production: fails if any "[TBC" placeholder remains anywhere in the output.
// - preview: always allowed, but every HTML page must carry <meta name="robots" content="noindex">.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

async function walk(dir) {
	const out = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) out.push(...(await walk(path)));
		else out.push(path);
	}
	return out;
}

const TEXT = /\.(html|xml|txt|json|webmanifest|js|css|svg)$/;
const NOINDEX = /<meta name="robots" content="noindex"/;

/** @param {{ build: 'preview' | 'production' }} options */
export function launchGate({ build }) {
	return {
		name: 'zaria-launch-gate',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const root = fileURLToPath(dir);
				const files = (await walk(root)).filter((f) => TEXT.test(f));
				const withTbc = [];
				const indexable = [];
				for (const file of files) {
					const text = await readFile(file, 'utf8');
					const rel = relative(root, file);
					const count = text.split('[TBC').length - 1;
					if (count) withTbc.push(`${rel} (${count})`);
					if (file.endsWith('.html') && !NOINDEX.test(text)) indexable.push(rel);
				}
				if (build === 'production') {
					if (withTbc.length) {
						throw new Error(
							`Launch gate: ${withTbc.length} file(s) still contain [TBC] placeholders. ` +
								`Supply the missing inputs in src/content/settings.yaml.\n  ${withTbc.join('\n  ')}`,
						);
					}
					logger.info('Launch gate passed: no [TBC] placeholders in the output.');
				} else {
					if (indexable.length) {
						throw new Error(`Launch gate: preview pages without noindex:\n  ${indexable.join('\n  ')}`);
					}
					logger.info(
						`Preview build: every page is noindex. ${withTbc.length} file(s) contain [TBC] placeholders.`,
					);
				}
			},
		},
	};
}
