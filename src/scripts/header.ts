// Header behaviour: condense after 120px of scroll, and the phone menu as a focus-trapped dialog.

const header = document.querySelector<HTMLElement>('[data-header]');
const sentinel = document.querySelector<HTMLElement>('.hdr-sentinel');

if (header && sentinel && 'IntersectionObserver' in window) {
	new IntersectionObserver(([entry]) => {
		// Condensed once the sentinel (120px down the page) has scrolled above the viewport.
		header.classList.toggle('is-condensed', !entry.isIntersecting && entry.boundingClientRect.top < 0);
	}).observe(sentinel);
}

const menu = document.querySelector<HTMLElement>('[data-menu]');
const openBtn = document.querySelector<HTMLAnchorElement>('[data-menu-open]');
const closeBtn = document.querySelector<HTMLAnchorElement>('[data-menu-close]');

if (menu && openBtn && closeBtn) {
	const focusable = () =>
		Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
			(el) => el.offsetParent !== null,
		);

	const open = () => {
		menu.classList.add('is-open');
		openBtn.setAttribute('aria-expanded', 'true');
		document.body.style.overflow = 'hidden';
		focusable()[0]?.focus();
	};
	const close = (returnFocus = true) => {
		menu.classList.remove('is-open');
		openBtn.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';
		if (returnFocus) openBtn.focus();
	};

	openBtn.addEventListener('click', (e) => {
		e.preventDefault();
		open();
	});
	closeBtn.addEventListener('click', (e) => {
		e.preventDefault();
		close();
	});
	// Following a section link closes the menu and lets the browser scroll to it.
	menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => close(false)));

	menu.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
			return;
		}
		if (e.key !== 'Tab') return;
		const items = focusable();
		if (!items.length) return;
		const first = items[0];
		const last = items[items.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	});
}
