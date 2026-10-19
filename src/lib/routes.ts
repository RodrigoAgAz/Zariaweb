// The route map: the single source of truth for page URLs in both languages.
// It drives page generation, the language switcher, hreflang links, navigation and the sitemap.
// Paths are written without the deployment base; use `url()` to make a link.

export const languages = ['en', 'es'] as const;
export type Lang = (typeof languages)[number];

export const routes = {
	home: { en: '/', es: '/es/' },
	firm: { en: '/firm/', es: '/es/firma/' },
	whatWeDo: { en: '/what-we-do/', es: '/es/que-hacemos/' },
	people: { en: '/people/', es: '/es/equipo/' },
	contact: { en: '/contact/', es: '/es/contacto/' },
	legalNotice: { en: '/legal-notice/', es: '/es/aviso-legal/' },
	privacy: { en: '/privacy/', es: '/es/privacidad/' },
	cookies: { en: '/cookies/', es: '/es/cookies/' },
	regulatory: { en: '/regulatory/', es: '/es/informacion-regulatoria/' },
} as const satisfies Record<string, Record<Lang, `/${string}`>>;

export type PageKey = keyof typeof routes;
export const pageKeys = Object.keys(routes) as PageKey[];

export const mainNav: PageKey[] = ['firm', 'whatWeDo', 'people', 'contact'];
export const legalNav: PageKey[] = ['legalNotice', 'privacy', 'cookies', 'regulatory'];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** A site-relative link to a path in the route map, with the deployment base applied. */
export function url(path: string): string {
	return `${base}${path}`;
}

/** The absolute production URL of a path (canonical, hreflang, sitemap, structured data). */
export function absolute(path: string, site: URL | string = 'https://zariacapital.es'): string {
	return new URL(path, site).href;
}

export function routeFor(key: PageKey, lang: Lang): string {
	return routes[key][lang];
}

/** Every generated page as { key, lang, path }. */
export function allPages() {
	return pageKeys.flatMap((key) => languages.map((lang) => ({ key, lang, path: routes[key][lang] })));
}
