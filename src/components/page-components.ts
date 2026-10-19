// Which component renders each page of the route map.
import type { PageKey } from '../lib/routes';
import Home from './home/Home.astro';
import Firm from './pages/Firm.astro';
import WhatWeDo from './pages/WhatWeDo.astro';
import People from './pages/People.astro';
import Contact from './pages/Contact.astro';
import Legal from './pages/Legal.astro';

export const pageComponents: Record<PageKey, any> = {
	home: Home,
	firm: Firm,
	whatWeDo: WhatWeDo,
	people: People,
	contact: Contact,
	legalNotice: Legal,
	privacy: Legal,
	cookies: Legal,
	regulatory: Legal,
};
