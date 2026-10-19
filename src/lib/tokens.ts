// {tokens} available to copy in src/content/pages/**: owner inputs, resolved to HTML. A missing
// input renders as a visible [TBC: …] in the page's language, and links to it are omitted.
import { emailHtml, esc, getSettings, valueHtml } from './content';
import { routes, url, type Lang } from './routes';

const missing = {
	en: {
		spainName: 'Spanish entity registered name',
		spainTaxId: 'NIF/CIF',
		spainRegistry: 'Registro Mercantil details',
		spainAddress: 'registered address',
		spainRegulatory: 'regulatory status of the Spanish entity',
		adgmName: 'ADGM entity legal name',
		adgmNumber: 'ADGM registration number',
		adgmAddress: 'ADGM entity address',
		adgmRegulatory: 'whether the ADGM entity is authorised by the FSRA, and for which activities',
		email: 'general contact email',
		domains: 'official email domains',
		hostingProvider: 'hosting provider',
		hostingLogs: 'log retention period, location and transfer safeguard',
		abuDhabiStreet: 'Abu Dhabi street address',
	},
	es: {
		spainName: 'denominación social de la entidad española',
		spainTaxId: 'NIF',
		spainRegistry: 'datos de inscripción en el Registro Mercantil',
		spainAddress: 'domicilio social',
		spainRegulatory: 'situación regulatoria de la entidad española',
		adgmName: 'denominación de la entidad de ADGM',
		adgmNumber: 'número de registro en ADGM',
		adgmAddress: 'dirección de la entidad de ADGM',
		adgmRegulatory: 'si la entidad de ADGM está autorizada por la FSRA, y para qué actividades',
		email: 'email general de contacto',
		domains: 'dominios de email oficiales',
		hostingProvider: 'proveedor de alojamiento',
		hostingLogs: 'plazo de conservación, ubicación y garantía de transferencia de los registros',
		abuDhabiStreet: 'dirección completa en Abu Dabi',
	},
} as const;

export async function pageTokens(lang: Lang): Promise<Record<string, string>> {
	const s = await getSettings();
	const m = missing[lang];
	const { spain, adgm } = s.entities;
	const domains = s.officialEmailDomains.length
		? listHtml(s.officialEmailDomains.map((d) => `@${esc(d)}`), lang)
		: valueHtml(null, m.domains);
	const link = (key: keyof typeof routes, label: string) => `<a href="${url(routes[key][lang])}">${esc(label)}</a>`;
	const labels = {
		en: { privacy: 'privacy notice', cookies: 'cookies page', regulatory: 'regulatory information', legal: 'legal notice', contact: 'contact page' },
		es: { privacy: 'política de privacidad', cookies: 'página de cookies', regulatory: 'información regulatoria', legal: 'aviso legal', contact: 'página de contacto' },
	}[lang];
	return {
		spainName: valueHtml(spain.legalName, m.spainName),
		spainTaxId: valueHtml(spain.taxId, m.spainTaxId),
		spainRegistry: valueHtml(spain.registry[lang], m.spainRegistry),
		spainAddress: valueHtml(spain.registeredAddress, m.spainAddress),
		spainRegulatory: valueHtml(spain.regulatoryStatement[lang], m.spainRegulatory),
		adgmName: valueHtml(adgm.legalName, m.adgmName),
		adgmNumber: valueHtml(adgm.registrationNumber, m.adgmNumber),
		adgmAddress: valueHtml(adgm.address, m.adgmAddress),
		adgmRegulatory: valueHtml(adgm.regulatoryStatement[lang], m.adgmRegulatory),
		email: emailHtml(s.email, m.email),
		domains,
		hostingProvider: valueHtml(s.hosting.provider, m.hostingProvider),
		hostingLogs: valueHtml(s.hosting.logDetails[lang], m.hostingLogs),
		privacyLink: link('privacy', labels.privacy),
		cookiesLink: link('cookies', labels.cookies),
		regulatoryLink: link('regulatory', labels.regulatory),
		legalLink: link('legalNotice', labels.legal),
		contactLink: link('contact', labels.contact),
	};
}

function listHtml(items: string[], lang: Lang): string {
	const and = lang === 'en' ? ' or ' : ' o ';
	if (items.length === 1) return items[0];
	return `${items.slice(0, -1).join(', ')}${and}${items.at(-1)}`;
}

export { missing as missingLabels };
