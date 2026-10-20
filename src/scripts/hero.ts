// Hero corridor strip: the active corridor advances every 6.5s (its gold bar fills over that time);
// clicking one selects it and restarts the timer. Paused while the hero is off screen or the tab is
// hidden; no auto-advance under reduced motion.

const group = document.querySelector<HTMLElement>('[data-hero-corridors]');

if (group) {
	const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button'));
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const introPlays =
		document.documentElement.hasAttribute('data-intro') && !document.documentElement.classList.contains('no-intro');
	const STEP = 6500;
	let active = 0;
	let timer: number | undefined;
	let visible = true;
	let started = false;

	const select = (i: number) => {
		active = i;
		buttons.forEach((b, n) => {
			b.classList.remove('is-active');
			b.setAttribute('aria-pressed', String(n === i));
		});
		void buttons[i].offsetWidth; // restart the bar's fill animation
		buttons[i].classList.add('is-active');
	};
	const stop = () => {
		window.clearInterval(timer);
		timer = undefined;
	};
	const run = () => {
		stop();
		if (reduced || !started || !visible || document.hidden) return;
		timer = window.setInterval(() => select((active + 1) % buttons.length), STEP);
	};

	buttons.forEach((b, i) =>
		b.addEventListener('click', () => {
			select(i);
			run();
		}),
	);
	document.addEventListener('visibilitychange', run);
	const hero = document.getElementById('top');
	if (hero && 'IntersectionObserver' in window) {
		new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			run();
		}).observe(hero);
	}
	// Auto-advance starts when the strip has appeared: after the opening animation when it plays.
	window.setTimeout(
		() => {
			started = true;
			select(active);
			run();
		},
		introPlays ? 3500 : 1300,
	);
}
