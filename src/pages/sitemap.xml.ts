// XML sitemap generated from the route map.
import type { APIRoute } from 'astro';
import { absolute, languages, routes } from '../lib/routes';
import { publishedKeys } from '../lib/published';

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? 'https://zariacapital.es';
	const urls = (await publishedKeys()).flatMap((key) =>
		languages.map((lang) => `<url><loc>${absolute(routes[key][lang], origin)}</loc></url>`),
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
