import megaNav from './megaNav';
import scrollTabs from './scrollTabs';
import TWEEN from '@tweenjs/tween.js';

megaNav();

const toTick = [
	time => TWEEN.update(time),
	...scrollTabs()
];

const tick = function(time) {
	requestAnimationFrame(tick);
	let idx = toTick.length;
	while (idx--) toTick[idx](time);
};
requestAnimationFrame(tick);
