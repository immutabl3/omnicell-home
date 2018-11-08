import Baobab from 'baobab';
import $ from '../utils/querySelector';

export default function(container) {
	const tabPanels = $('[role="tabpanel"]', container);
	return new Baobab({
		// tracking x positions
		x: 0,
		panelsX: 0,
		
		// size
		width: window.innerWidth,
		// with the removal of "Line", we no
		// longer need to track height...this may
		// change if the height becomes dynamic
		// height: 250,

		// tracking what panel we're on
		panel: 0,
		nextPanel: 0,
		
		// dragging variables for exponential backoff
		dragging: false,
		startX: 0,

		// scrape the data out of the dom
		qty: tabPanels.length,
		panels: tabPanels
			.map(panel => {
				const image = $.attr(panel, 'data-image');
				const [title] = $('[aria-hidden="true"]', panel);
				return {
					panel,
					image,
					title: title.innerText,
				};
			}),
	}, {
		autoCommit: false,
		persistent: false,
		immutable: process.env.NODE_ENV !== 'development',
	});
};