// Which component renders each page of the route map.
import type { PageKey } from '../lib/routes';
import Home from './home/Home.astro';

export const pageComponents: Partial<Record<PageKey, any>> = {
	home: Home,
};
