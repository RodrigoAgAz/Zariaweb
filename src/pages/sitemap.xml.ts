// XML sitemap generated from the route map, with each page's language alternates.
// (@astrojs/sitemap's i18n option cannot pair pages whose slugs differ by language.)
import type { APIRoute } from 'astro';
import { absolute, languages, routes } from '../lib/routes';
import { publishedKeys } from '../lib/published';

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? 'https://zariacapital.es';
	const urls = (await publishedKeys()).flatMap((key) =>
		languages.map((lang) => {
			const alternates = [
				...languages.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${absolute(routes[key][l], origin)}"/>`),
				`<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(routes[key].en, origin)}"/>`,
			].join('');
			return `<url><loc>${absolute(routes[key][lang], origin)}</loc>${alternates}</url>`;
		}),
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
