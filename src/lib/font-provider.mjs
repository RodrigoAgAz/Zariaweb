// Astro's local font provider, plus a `subset` label on each variant so that <Font preload>
// can preload only the regular Latin file (the local provider leaves subsets unlabelled).
import { fontProviders } from 'astro/config';

export function localWithSubsets() {
	const inner = fontProviders.local();
	return {
		name: 'local-with-subsets',
		init: (context) => inner.init?.(context),
		resolveFont(options) {
			const { fonts } = inner.resolveFont(options);
			const variants = options.options?.variants ?? [];
			return {
				fonts: fonts.map((face, i) => ({ ...face, meta: { ...face.meta, subset: variants[i]?.subset } })),
			};
		},
	};
}
