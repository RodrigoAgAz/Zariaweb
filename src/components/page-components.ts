// Which component renders each page of the route map.
import type { PageKey } from '../lib/routes';
import Home from './home/Home.astro';
import Legal from './pages/Legal.astro';

export const pageComponents: Record<PageKey, any> = {
	home: Home,
	regulatory: Legal,
};
