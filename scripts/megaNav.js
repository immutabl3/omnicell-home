// NOTE: the original code regulary got confused
// and was jumpy/janky with new video beneath it.
// also, the previous nav wasn't responsive...
// it broke at several spots in serveral menus
// at several screen sizes and also hid content
// when there wasn't content to show
//
// this version treats the menu as a standard 
// hoverable (ddeply nested) dropdown nav, using 
// css and transitions to smooth out the user experience
//
// the offshoot of that is we no longer need jquery
// and its hover targeting, but since we're positioning
// elements absolutely horizontally, we need to tweak
// the menu heights on window resize

import signalWindow from 'signal-window';
import $ from './utils/querySelector';

const megaNav = $('#megaNav');

const MENU_CLASS = '.mega-nav__sub-menu';
const LIST_CLASS = '.mega-nav__list';

export default function() {
	if (!megaNav) return;

	const menus = $(MENU_CLASS, megaNav)
		.map(menu => {
			return {
				menu,
				lists: $(LIST_CLASS, menu),
			};
		});

	const maxListHeight = (memo, list) => {
		const height = list.offsetHeight;
		return Math.max(height, memo);
	};

	const measure = function() {
		menus.forEach(({ menu, lists }) => {
			const height = lists.reduce(maxListHeight, 0);
			menu.style.minHeight = `${height}px`;
		});
	};

	measure();
	signalWindow.on('resize', measure);
};
