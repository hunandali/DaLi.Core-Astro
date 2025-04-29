import { openLink } from '../libs/_message';
import { APP } from '../config';

const elements = document.querySelectorAll('[data-alert-link]');
if (elements.length) {
	elements.forEach((el) => {
		const element = el as HTMLElement;
		const link = element.getAttribute('data-alert-link');
		if (!link) return;

		element.style.cursor = 'pointer';
		element.addEventListener('click', () => {
			openLink(link, APP.EXTERNAL_LINK_MESSAGE);
		});
	});
}
