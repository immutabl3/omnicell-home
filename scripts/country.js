import $ from './utils/querySelector';
import modal from './overlay/modal';

const countryButton = $('#countryButton');
const countryModal = $('#countryModal');

export default function() {
	if (!countryButton || !countryModal) return;

	modal({
		button: countryButton,
		container: countryModal,
	});
};