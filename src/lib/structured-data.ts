import { getSettings } from './content';
import { absolute } from './routes';

/**
 * JSON-LD Organization. Fields the owner has not supplied are omitted, never filled with [TBC].
 */
export async function organizationJsonLd(site: URL | undefined) {
	const s = await getSettings();
	const origin = site ?? 'https://zariacapital.es';
	const spain = s.entities.spain;
	const data: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Zaria Capital',
		url: absolute('/', origin),
		logo: absolute('/logo.png', origin),
		address: [
			{
				'@type': 'PostalAddress',
				streetAddress: 'Calle Ayala 3',
				postalCode: '28001',
				addressLocality: 'Madrid',
				addressCountry: 'ES',
			},
			{
				'@type': 'PostalAddress',
				addressLocality: 'Abu Dhabi',
				addressCountry: 'AE',
			},
		],
	};
	if (spain.legalName) data.legalName = spain.legalName;
	if (spain.taxId) data.taxID = spain.taxId;
	if (s.email) data.email = s.email;
	return data;
}
