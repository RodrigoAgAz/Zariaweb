// Live local time for each office. Progressive: without JavaScript the element keeps its
// fallback text, e.g. "Madrid (CET/CEST)". No aria-live: the time is not announced as it changes.
const clocks = document.querySelectorAll<HTMLElement>('[data-clock-tz]');

function render() {
	const now = new Date();
	for (const el of clocks) {
		const tz = el.dataset.clockTz!;
		const time = new Intl.DateTimeFormat(document.documentElement.lang, {
			timeZone: tz,
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23',
		}).format(now);
		el.textContent = `${time} ${el.dataset.clockSuffix ?? ''}`.trim();
	}
	// Next update on the minute boundary.
	setTimeout(render, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50);
}

if (clocks.length) render();
