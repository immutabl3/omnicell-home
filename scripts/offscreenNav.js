import slideMenu from './overlay/slideMenu';

const hamburger = document.querySelector('#hamburger');
const offscreenNav = document.querySelector('#offscreenNav');

const HAMBURGER_CLASS = 'is-active';
const NAV_CLASS = 'offscreen-nav--active';

export default function() {
	if (!hamburger || !offscreenNav) return;

	slideMenu({
		button: hamburger,
		buttonClass: HAMBURGER_CLASS,
		container: offscreenNav,
		containerClass: NAV_CLASS,
	});
};