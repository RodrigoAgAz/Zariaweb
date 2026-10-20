import { getEntry } from 'astro:content';
import type { Lang, PageKey } from './routes';

export async function getSettings() {
	const entry = await getEntry('settings', 'site');
	if (!entry) throw new Error('src/content/settings.yaml must define `site`.');
	return entry.data;
}
export type Settings = Awaited<ReturnType<typeof getSettings>>;

const fileNames: Record<PageKey, string> = {
	home: 'home',
	legalNotice: 'legal-notice',
	privacy: 'privacy',
	cookies: 'cookies',
	regulatory: 'regulatory',
};

/** Copy for one page in one language (src/content/pages/<lang>/<page>.yaml). */
export async function getPage<T = Record<string, any>>(key: PageKey, lang: Lang) {
	const entry = await getEntry('pages', `${lang}/${fileNames[key]}`);
	if (!entry) throw new Error(`Missing copy: src/content/pages/${lang}/${fileNames[key]}.yaml`);
	return entry.data as { title: string; description: string; h1: string } & T;
}

/** Interface strings for one language (src/content/ui/<lang>.yaml). */
export async function getUi(lang: Lang) {
	const entry = await getEntry('ui', lang);
	if (!entry) throw new Error(`Missing src/content/ui/${lang}.yaml`);
	return entry.data as Record<string, any> & { nav: Record<PageKey, string> };
}


const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Token values are HTML supplied by the page (already escaped); null means "not supplied". */
export type Tokens = Record<string, string | null>;

/**
 * Renders one paragraph of copy to HTML. Supports [text](url) links, *italic* and {tokens}.
 * Returns null when the copy needs a token whose value has not been supplied, so the caller
 * leaves that sentence out rather than showing a gap.
 */
export function inlineOptional(text: string, tokens: Tokens = {}): string | null {
	const names = [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
	for (const name of names) {
		if (!(name in tokens)) throw new Error(`Unknown token {${name}} in copy: "${text}"`);
		if (tokens[name] === null) return null;
	}
	return inline(text, tokens as Record<string, string>);
}

/** Renders one paragraph of copy to HTML. Supports [text](url) links, *italic* and {tokens}. */
export function inline(text: string, tokens: Record<string, string> = {}): string {
	let html = escape(text);
	html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
		const external = /^https?:/.test(href);
		return `<a href="${href}"${external ? ' rel="noopener"' : ''}>${label}</a>`;
	});
	html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
	html = typeset(html);
	html = html.replace(/\{(\w+)\}/g, (m, name) => {
		if (!(name in tokens)) throw new Error(`Unknown token ${m} in copy: "${text}"`);
		return tokens[name];
	});
	return html;
}

/**
 * Keeps hyphenated compounds ("cross-border", "sovereign-linked") on one line, so a line never
 * ends on a dangling hyphen. Only touches text between tags.
 */
export function typeset(html: string): string {
	return html.replace(/(<[^>]+>)|([^<]+)/g, (_m, tag, text) =>
		tag ? tag : text.replace(/([\p{L}\d]+(?:-[\p{L}\d]+)+)/gu, '<span class="nowrap">$1</span>'),
	);
}

/** An email address as a mailto link. */
export function emailHtml(email: string): string {
	return `<a href="mailto:${escape(email)}">${escape(email)}</a>`;
}

export const esc = escape;
