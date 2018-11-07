// This is a David Walsh like simple image lazy load
// https://www.sitepoint.com/five-techniques-lazy-load-images-website-performance/
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

import $ from './utils/querySelector';

const THRESHOLD = 0.05;

export default function() {
	const images = $('[data-lazy-load]');

	const load = img => {
		// set the src
		$.attr(img, 'src', $.attr(img, 'data-lazy-load'));
		
		// on load
		img.onload = () => $.attr(img, 'data-lazy-load', 'done');
	};
	
	const onIntersection = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio < THRESHOLD) return;
			const img = entry.target;
			// remove it from being observed
			observer.unobserve(img);
			load(img);
		});
	};

	const intersectionObserver = new IntersectionObserver(onIntersection, {
		threshold: THRESHOLD,
		rootMargin: '0% 50%',
	});
	images.forEach(img => {
		intersectionObserver.observe(img);
	});
};
