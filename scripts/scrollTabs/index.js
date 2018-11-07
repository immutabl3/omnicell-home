import React from 'react';
import ReactDOM from 'react-dom';
import { lory } from 'lory.js';
import ScrollTabs from '../views/ScrollTabs';
import createStore from './createStore';
import parseX from './parseX';
import lerp from './lerp';
import { root } from 'baobab-react/higher-order';
import TWEEN from '@tweenjs/tween.js';

// TODO: put mount event back in

const scrollTab = function(container) {
	const mount = container.querySelector('[data-mount]');
	const store = createStore(container);

	container.prepend(mount);
	const RootedScrollTabs = root(store, ScrollTabs);
	ReactDOM.render(<RootedScrollTabs />, mount);

	const panels = container.querySelector('[data-panels]');
	const frame = container.querySelector('[data-frame]');
	const slides = frame.children[0].children[0];

	let animation;

	const isBackingStart = x => x > 0;
	const isBackingEnd = x => {
		const width = store.get('width');
		const qty = store.get('qty');
		const minX = (width * qty * -1) + width;
		return x < minX;
	};

	const calcExpBackoffStart = (x, amount = 5) => (Math.sqrt(x) * amount) || 0;
	const calcExpBackoffEnd = (x, amount = 5) => {
		const width = store.get('width');
		const qty = store.get('qty');

		const minX = (width * qty * -1) + width;
		const offset = Math.abs(x - minX);
		const backedOff = calcExpBackoffStart(offset, amount);
		return minX - backedOff;
	};
	
	const instance = lory(frame, {
		enableMouseEvents: true,
		classNameFrame: 'scroll-tabs__frame',
		classNameSlideContainer: 'scroll-tabs__slides',
	});

	const to = panel => {
		animation && animation.stop();

		const x = store.get('x');
		const width = store.get('width');
		animation = new TWEEN.Tween({ x })
			.to({ x: width * panel * -1 }, 450)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onUpdate(({ x }) => store.set('x', x))
			.onComplete(() => (animation = undefined))
			.start();
	};

	store.set('onSelect', idx => instance.slideTo(idx));

	container.addEventListener('on.lory.touchmove', parseX(slides, x => {
		const newX = isBackingStart(x) ? 
			calcExpBackoffStart(x) :
			isBackingEnd(x) ? 
				calcExpBackoffEnd(x) :
				x;
		store.set('x', newX);
	}));

	container.addEventListener('on.lory.touchstart', () => {
		store.merge({
			dragging: true,
			startX: store.get('x'),
		});
	});

	container.addEventListener('on.lory.touchend', () => {
		store.set('dragging', false);

		const panel = store.get('panel');
		// didn't change panels
		if (panel !== instance.returnIndex()) return;
		to(panel);
	});

	container.addEventListener('after.lory.slide', ({ detail }) => {
		const { currentSlide } = detail;
		store.set('panel', currentSlide);
		to(currentSlide);
	});

	container.addEventListener('on.lory.resize', () => {
		store.merge({
			width: window.innerWidth,
			panel: 0,
			nextPanel: 0,
			x: 0,
		});
	});

	store.select('panelsX').on('update', ({ data }) => {
		panels.style.transform = `translateX(${data.currentData}px)`;
	});

	const panelLerp = () => {
		const x = store.get('x');
		const panelsX = store.get('panelsX');
		const newX = lerp(x, panelsX, 0.25);
		if (newX === undefined) return;
		store.set('panelsX', newX);
	};

	const lineLerp = () => {
		const x = store.get('x');
		const lineX = store.get('lineX');
		const newX = lerp(x, lineX, 0.2);
		if (newX === undefined) return;
		store.set('lineX', newX);
	};

	return () => {
		panelLerp();
		lineLerp();
	};
};

const scrollTabs = document.querySelectorAll('[data-scroll-tabs]');

export default () => Array.from(scrollTabs).map(scrollTab);