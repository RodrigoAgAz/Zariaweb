// Which pages of the route map are published. Regulatory information appears only once there is
// something to say on it (an entity's details or regulatory sentence in src/content/settings.yaml).
import { getSettings } from './content';
import { allPages, pageKeys, type PageKey } from './routes';

export async function isPublished(key: PageKey): Promise<boolean> {
	if (key !== 'regulatory') return true;
	const { spain, adgm } = (await getSettings()).entities;
	return [
		spain.legalName, spain.taxId, spain.registeredAddress, spain.registry.en, spain.regulatoryStatement.en,
		adgm.legalName, adgm.registrationNumber, adgm.address, adgm.regulatoryStatement.en,
	].some(Boolean);
}

export async function publishedKeys(): Promise<PageKey[]> {
	const out: PageKey[] = [];
	for (const key of pageKeys) if (await isPublished(key)) out.push(key);
	return out;
}

export async function publishedPages() {
	const keys = await publishedKeys();
	return allPages().filter((p) => keys.includes(p.key));
}
