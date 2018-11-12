import '@babel/polyfill';
import 'intersection-observer';
import signalWindow from 'signal-window';
import TWEEN from '@tweenjs/tween.js';
import banner from './banner';
import search from './search';
import contactUs from './contactUs';
import offscreenNav from './offscreenNav';
import country from './country';
import scrollTabs from './scrollTabs';
import megaNav from './megaNav';
import contactHubspot from './contactHubspot';
import lazyLoad from './lazyLoad';

const toTick = [
	// update tweens
	time => TWEEN.update(time),
	// update window
	() => signalWindow.tick(),
	// include our modules
	megaNav(),
	search(),
	contactUs(),
	country(),
	offscreenNav(),
	contactHubspot(),
	lazyLoad(),
	banner(),
	// check the scroll tabs
	...scrollTabs()
// remove anything thta isnt tickable
].filter(Boolean);

const tick = function(time) {
	requestAnimationFrame(tick);
	let idx = toTick.length;
	while (idx--) toTick[idx](time);
};
requestAnimationFrame(tick);
