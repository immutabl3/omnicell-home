import $ from './utils/querySelector';
import modal from './overlay/modal';

const hamburger = $('#hamburger');
const offscreenNav = $('#offscreenNav');

const HAMBURGER_CLASS = 'is-active';
const NAV_CLASS = 'offscreen-nav--active';

export default function() {
	if (!hamburger || !offscreenNav) return;

	modal({
		button: hamburger,
		buttonClass: HAMBURGER_CLASS,
		container: offscreenNav,
		containerClass: NAV_CLASS,
	});
};