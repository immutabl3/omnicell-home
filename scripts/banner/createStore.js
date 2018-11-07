import Baobab, { monkey } from 'baobab';
import signalWindow from 'signal-window';

const parseLoops = str => str.split(',').map(str => str.trim());

export default function(container) {
	const { width } = signalWindow.dimensions();
	return new Baobab({
		isMobile: width < 576,
		
		mobilePosterLoaded: false,
		desktopPosterLoaded: false,
		
		mobilePosterLoading: false,
		desktopPosterLoading: false,
		
		mobilePoster: container.getAttribute('data-mobile-poster'),
		desktopPoster: container.getAttribute('data-desktop-poster'),
		
		mobileIdx: 0,
		desktopIdx: 0,

		mobileLoops: parseLoops(container.getAttribute('data-mobile-loops')),
		desktopLoops: parseLoops(container.getAttribute('data-desktop-loops')),

		// using monkeys to keep the views clean
		// since a lot of the above is just to check
		// states between mobile/desktop/assetload

		loading: monkey({
			cursors: {
				isMobile: 'isMobile',
				mobilePosterLoaded: 'mobilePosterLoaded',
				desktopPosterLoaded: 'desktopPosterLoaded',
			},
			get({
				isMobile,
				mobilePosterLoaded,
				desktopPosterLoaded,
			}) {
				return isMobile ? 
					!mobilePosterLoaded : 
					!desktopPosterLoaded;
			},
		}),

		poster: monkey({
			cursors: {
				isMobile: 'isMobile',
				mobilePoster: 'mobilePoster',
				desktopPoster: 'desktopPoster',
			},
			get({
				isMobile,
				mobilePoster,
				desktopPoster,
			}) {
				return isMobile ? 
					mobilePoster : 
					desktopPoster;
			},
		}),

		source: monkey({
			cursors: {
				isMobile: 'isMobile',
				mobileIdx: 'mobileIdx',
				desktopIdx: 'desktopIdx',
				mobileLoops: 'mobileLoops',
				desktopLoops: 'desktopLoops',
			},
			get({
				isMobile,
				mobileIdx,
				desktopIdx,
				mobileLoops,
				desktopLoops,
			}) {
				return isMobile ? 
					mobileLoops[mobileIdx] :
					desktopLoops[desktopIdx];
			},
		}),

		index: monkey({
			cursors: {
				isMobile: 'isMobile',
				mobileIdx: 'mobileIdx',
				desktopIdx: 'desktopIdx',
			},
			get({
				isMobile,
				mobileIdx,
				desktopIdx,
			}) {
				return isMobile ? 
					mobileIdx :
					desktopIdx;
			},
		}),

		loops: monkey({
			cursors: {
				isMobile: 'isMobile',
				mobileLoops: 'mobileLoops',
				desktopLoops: 'desktopLoops',
			},
			get({
				isMobile,
				mobileLoops,
				desktopLoops,
			}) {
				return isMobile ? 
					mobileLoops : 
					desktopLoops;
			},
		}),

		loop: monkey({
			cursors: {
				loops: 'loops',
			},
			get({ loops }) {
				return loops.length <= 1;
			},
		})
	});
};
