import type { Props } from '../layouts/LayoutDefault.astro';

import _brand from './_brand';
import _menus from './_menus';
import _footer from './_footer';

const layout: Omit<Props, 'title'> = {
	brand: _brand,
	menus: _menus,
	footerLinks: _footer,

	// layout: 'vertical',
	expanded: 'md',
	theme: 'light',
	placement: 'fixed-top'
};

export default layout;
