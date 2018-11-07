import slideMenu from './overlay/slideMenu';

const searchButton = document.querySelector('#searchButton');
const searchBox = document.querySelector('#searchBox');

const BUTTON_CLASS = 'search-button--active';
const SLIDER_CLASS = 'search-slider--active';
const CLEAR_CLASS = 'search-slider__clear--active';

export default function() {
	if (!searchButton || !searchBox) return;
	
	const input = searchBox.querySelector('input');
	const clearButton = searchBox.querySelector('[type="clear"]');

	slideMenu({
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
		hasValue && !clearButton.classList.contains(CLEAR_CLASS) && clearButton.classList.add(CLEAR_CLASS);
		// remove the class
		!hasValue && clearButton.classList.contains(CLEAR_CLASS) && clearButton.classList.remove(CLEAR_CLASS);
	});

	clearButton.addEventListener('click', e => {
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