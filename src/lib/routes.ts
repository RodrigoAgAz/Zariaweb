// The route map: the single source of truth for page URLs. The site is English only (owner
// decision); `languages` is kept so page generation and copy lookup stay keyed by language.
// It drives page generation, navigation and the sitemap.
// Paths are written without the deployment base; use `url()` to make a link.

export const languages = ['en'] as const;
export type Lang = (typeof languages)[number];

export const routes = {
	home: { en: '/' },
	regulatory: { en: '/regulatory/' },
} as const satisfies Record<string, Record<Lang, `/${string}`>>;

export type PageKey = keyof typeof routes;
export const pageKeys = Object.keys(routes) as PageKey[];

// The site is one page (plus Regulatory information once there is something to put on it); the header links to sections of the home page
// (Contact lands on the footer, which carries the email).
export const homeSections = ['reach', 'services', 'founder', 'contact'] as const;
export type HomeSection = (typeof homeSections)[number];
export const legalNav: PageKey[] = ['regulatory'];

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
