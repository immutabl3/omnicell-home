import $ from './utils/querySelector';
import modal from './overlay/modal';

const searchButton = $('#searchButton');
const searchBox = $('#searchBox');

const BUTTON_CLASS = 'search-button--active';
const SLIDER_CLASS = 'search-slider--active';
const CLEAR_CLASS = 'search-slider__clear--active';

export default function() {
	if (!searchButton || !searchBox) return;
	
	const [input] = $('input', searchBox);
	const [clearButton] = $('[type="clear"]', searchBox);

	modal({
		button: searchButton,
		buttonClass: BUTTON_CLASS,

		container: searchBox,
		containerClass: SLIDER_CLASS,

		postActivate: () => input.focus(),
		preDeactivate: () => input.blur(),
	});

	input.addEventListener('input', () => {
		const hasValue = !!input.value.length;
		// add the class
		clearButton && hasValue && !clearButton.classList.contains(CLEAR_CLASS) && clearButton.classList.add(CLEAR_CLASS);
		// remove the class
		clearButton && !hasValue && clearButton.classList.contains(CLEAR_CLASS) && clearButton.classList.remove(CLEAR_CLASS);
	});

	clearButton && clearButton.addEventListener('click', e => {
		// stop the submission
		e.preventDefault();
		// clear the value
		input.value = '';
		// hide the button again
		clearButton.classList.remove(CLEAR_CLASS);
		// re-focus the input
		input.focus();
	});
};