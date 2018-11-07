import banner from './banner';
import search from './search';
import contactUs from './contactUs';
import offscreenNav from './offscreenNav';
import country from './country';
import scrollTabs from './scrollTabs';
import megaNav from './megaNav';
import TWEEN from '@tweenjs/tween.js';

banner();
search();
contactUs();
offscreenNav();
country();
megaNav();

const toTick = [
	time => TWEEN.update(time),
	...scrollTabs()
].filter(Boolean);

const tick = function(time) {
	requestAnimationFrame(tick);
	let idx = toTick.length;
	while (idx--) toTick[idx](time);
};
requestAnimationFrame(tick);
