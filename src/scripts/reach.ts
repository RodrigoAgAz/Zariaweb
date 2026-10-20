// "Where we work": highlight one corridor on the route map (clicking it again shows all), and start
// the time-based route drawing when the map enters the viewport (browsers without scroll timelines).

const map = document.querySelector<HTMLElement>('[data-map]');
const toggle = document.querySelector<HTMLElement>('[data-corridor-toggle]');

if (map && toggle) {
	const buttons = Array.from(toggle.querySelectorAll<HTMLButtonElement>('button[data-group]'));
	buttons.forEach((button) =>
		button.addEventListener('click', () => {
			const group = button.dataset.group!;
			const next = map.dataset.sel === group ? 'all' : group;
			map.dataset.sel = next;
			buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.group === next)));
		}),
	);

	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				map.classList.add('is-in');
				io.disconnect();
			},
			{ threshold: 0.25 },
		);
		io.observe(map);
	} else {
		map.classList.add('is-in');
	}
}
