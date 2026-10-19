// {tokens} available to copy in src/content/pages/**: owner inputs, resolved to HTML. A value that
// has not been supplied is null, and any sentence, row or section that needs it is left out.
import { emailHtml, esc, getSettings, type Tokens } from './content';
import { routes, url, type Lang } from './routes';
import { isPublished } from './published';

export async function pageTokens(lang: Lang): Promise<Tokens> {
	const s = await getSettings();
	const { spain, adgm } = s.entities;
	const text = (v: string | null | undefined) => (v ? esc(v) : null);
	const link = (key: keyof typeof routes, label: string) => `<a href="${url(routes[key][lang])}">${esc(label)}</a>`;
	const labels = {
		en: { privacy: 'privacy notice', cookies: 'cookies page', regulatory: 'regulatory information', legal: 'legal notice' },
		es: { privacy: 'política de privacidad', cookies: 'página de cookies', regulatory: 'información regulatoria', legal: 'aviso legal' },
	}[lang];
	return {
		spainName: text(spain.legalName),
		spainTaxId: text(spain.taxId),
		spainRegistry: text(spain.registry[lang]),
		spainAddress: text(spain.registeredAddress),
		spainRegulatory: text(spain.regulatoryStatement[lang]),
		adgmName: text(adgm.legalName),
		adgmNumber: text(adgm.registrationNumber),
		adgmAddress: text(adgm.address),
		adgmRegulatory: text(adgm.regulatoryStatement[lang]),
		email: s.email ? emailHtml(s.email) : null,
		hostingProvider: text(s.hosting.provider),
		hostingLogs: text(s.hosting.logDetails[lang]),
		privacyLink: link('privacy', labels.privacy),
		cookiesLink: link('cookies', labels.cookies),
		regulatoryLink: (await isPublished('regulatory')) ? link('regulatory', labels.regulatory) : null,
		legalLink: link('legalNotice', labels.legal),
	};
}
