import Baobab from 'baobab';
import generateLine from './generateLine';

export default function(container) {
	const tabPanels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
	return new Baobab({
		// tracking x positions
		x: 0,
		lineX: 0,
		panelsX: 0,
		
		// size
		width: window.innerWidth,
		height: 250,

		// tracking what panel we're on
		panel: 0,
		nextPanel: 0,
		
		// dragging variables for exponential backoff
		dragging: false,
		startX: 0,

		// generate a line based off the number of panels
		// we have...this keeps the line interesting
		// regardless of how many panels there are
		line: generateLine(tabPanels.length),

		// scrape the data out of the dom
		qty: tabPanels.length,
		panels: tabPanels
			.map(panel => {
				const image = panel.getAttribute('data-image');
				const title = panel.querySelector('[aria-hidden="true"]').innerText;
				return {
					panel,
					image,
					title,
				};
			}),
	});
};