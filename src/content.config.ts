import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const bilingual = z.object({ en: z.string(), es: z.string() });
const optionalBilingual = z.object({ en: z.string().nullable(), es: z.string().nullable() });

// Owner inputs (section 0 of the brief). `null` means "not supplied yet": visible text shows
// [TBC: …], and structured data, meta tags, links and the sitemap omit the field.
const settings = defineCollection({
	loader: file('src/content/settings.yaml'),
	schema: z.object({
		email: z.string().email().nullable(),
		officialEmailDomains: z.array(z.string()),
		madridPhotoWebRights: z.boolean(),
		offices: z.object({
			madrid: z.object({ phone: z.string().nullable() }),
			abuDhabi: z.object({
				streetAddress: z.string().nullable(),
				phone: z.string().nullable(),
			}),
		}),
		entities: z.object({
			spain: z.object({
				legalName: z.string().nullable(),
				taxId: z.string().nullable(),
				registry: optionalBilingual,
				registeredAddress: z.string().nullable(),
				regulatoryStatement: optionalBilingual,
			}),
			adgm: z.object({
				legalName: z.string().nullable(),
				registrationNumber: z.string().nullable(),
				address: z.string().nullable(),
				regulatoryStatement: optionalBilingual,
			}),
		}),
		hosting: z.object({
			provider: z.string().nullable(),
			logDetails: optionalBilingual,
		}),
	}),
});

const description = z.string().min(140).max(160);

// One entry per page per language: src/content/pages/{en,es}/<page>.yaml.
// Shared SEO fields are checked here (titles unique by construction, descriptions 140 to 160
// characters); the rest of each file is page specific and read by that page's component.
const pages = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
	schema: z
		.object({
			title: z.string(),
			description,
			h1: z.string(),
		})
		.passthrough(),
});

// One file per person, both languages in the same file. Display order is `order`.
const people = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './src/content/people' }),
	schema: ({ image }) =>
		z.object({
			order: z.number(),
			name: z.string(),
			photo: image().nullable(),
			title: bilingual,
			office: optionalBilingual,
			languages: optionalBilingual,
			bio: z.object({ en: z.array(z.string()).min(1), es: z.array(z.string()).min(1) }),
		}),
});

// Interface strings shared by every page (navigation, footer, labels): src/content/ui/<lang>.yaml.
const ui = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './src/content/ui' }),
	schema: z.object({ nav: z.record(z.string(), z.string()) }).passthrough(),
});

export const collections = { settings, pages, people, ui };
