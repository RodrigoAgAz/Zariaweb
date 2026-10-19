// @ts-check
import { defineConfig } from 'astro/config';
import { localWithSubsets } from './src/lib/font-provider.mjs';
import { launchGate } from './src/lib/launch-gate.mjs';

// ZARIA_BUILD: "preview" (default) or "production". Production fails if any [TBC] remains.
// ZARIA_BASE: path the site is served from. "/" in production; "/Zariaweb/" on the GitHub Pages preview.
const build = process.env.ZARIA_BUILD === 'production' ? 'production' : 'preview';
const base = process.env.ZARIA_BASE ?? '/';

// Unicode ranges match the Latin and Latin Extended subsets of the font files.
const LATIN =
	'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const LATIN_EXT =
	'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF';

export default defineConfig({
	// Pending the domain decision (zariacapital.es and/or .com). See README.
	site: 'https://zariacapital.es',
	base,
	trailingSlash: 'always',
	output: 'static',
	build: {
		format: 'directory',
		inlineStylesheets: 'never',
	},
	vite: {
		define: {
			'import.meta.env.ZARIA_BUILD': JSON.stringify(build),
		},
		build: {
			assetsInlineLimit: 0,
		},
	},
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"img-src 'self'",
				"font-src 'self'",
				"connect-src 'self'",
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'none'",
				'upgrade-insecure-requests',
			],
		},
	},
	// "Zaria Serif" is the one house family. Its files are EB Garamond (OFL) until the Perpetua
	// web licence is confirmed: switching means changing the four `src` paths below, nothing else.
	fonts: [
		{
			provider: localWithSubsets(),
			name: 'Zaria Serif',
			cssVariable: '--zc-font-face',
			fallbacks: ['Georgia', 'Times New Roman', 'serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/eb-garamond-latin-400-normal.woff2'], weight: '400', style: 'normal', unicodeRange: [LATIN], subset: 'latin' },
					{ src: ['./src/assets/fonts/eb-garamond-latin-400-italic.woff2'], weight: '400', style: 'italic', unicodeRange: [LATIN], subset: 'latin' },
					{ src: ['./src/assets/fonts/eb-garamond-latin-ext-400-normal.woff2'], weight: '400', style: 'normal', unicodeRange: [LATIN_EXT], subset: 'latin-ext' },
					{ src: ['./src/assets/fonts/eb-garamond-latin-ext-400-italic.woff2'], weight: '400', style: 'italic', unicodeRange: [LATIN_EXT], subset: 'latin-ext' },
				],
			},
		},
	],
	integrations: [launchGate({ build })],
});
