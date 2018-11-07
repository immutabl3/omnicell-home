import React from 'react';
import ReactDOM from 'react-dom';
import signalWindow from 'signal-window';
import Banner from '../views/Banner';
import createStore from './createStore';
import { root } from 'baobab-react/higher-order';
import posterLoader from './posterLoader';
import $ from '../utils/querySelector';

// we need a dynamicly swappable video between 
// mobile and desktop that can also loop a 
// series of videos or loop just itself with a 
// 2x dynamic poster image and a side-by-side 
// layout on desktop

const container = $('#banner');

export default function() {
	if (!container) return;

	const [mount] = $('[data-mount]', container);
	const store = createStore(container);

	const RootedBanner = root(store, Banner);
	ReactDOM.render(<RootedBanner />, mount);

	store.set('onEnded', () => {
		const isMobile = store.get('isMobile');
		const index = store.get('index');
		const loops = store.get('loops');
		const nextIndex = loops[index + 1] ? index + 1 : 0;
		store.set(isMobile ? 'mobileIdx' : 'desktopIdx', nextIndex);
	});

	const loadPoster = posterLoader(store);
	const mobilePosterLoader = loadPoster('mobilePosterLoaded', 'mobilePosterLoading', 'mobilePosterLoaded', 'mobilePoster');
	const desktopPosterLoader = loadPoster('desktopPosterLoaded', 'desktopPosterLoading', 'desktopPosterLoaded', 'desktopPoster');

	store.select('isMobile').on('update', ({ data }) => {
		const isMobile = data.currentData;
		isMobile ? mobilePosterLoader() : desktopPosterLoader();
	});

	signalWindow.on('resize', ({ width }) => {
		store.set('isMobile', width < 576);
	});

	// lets kick it off
	const isMobile = store.get('isMobile');
	isMobile ? mobilePosterLoader() : desktopPosterLoader();

	return () => store.commit();
};