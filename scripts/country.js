import modal from './overlay/modal';

const countryButton = document.querySelector('#countryButton');
const countryModal = document.querySelector('#countryModal');

export default function() {
	if (!countryButton || !countryModal) return;

	modal({
		button: countryButton,
		container: countryModal,
	});
};