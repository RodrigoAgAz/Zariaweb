// "Where we work": start the time-based route drawing when the map enters the viewport (browsers
// without scroll timelines draw on that signal; the others draw with the scroll).

const map = document.querySelector<HTMLElement>('[data-map]');

if (map) {
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
