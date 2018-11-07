import $ from './utils/querySelector';
import modal from './overlay/modal';

const contactButton = $('#contactButton');
const contactModal = $('#contactModal');

export default function() {
	if (!contactButton || !contactModal) return;
	
	modal({
		button: contactButton,
		container: contactModal,
	});
}