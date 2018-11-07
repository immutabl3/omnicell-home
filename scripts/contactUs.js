import modal from './overlay/modal';

const contactButton = document.querySelector('#contactButton');
const contactModal = document.querySelector('#contactModal');

export default function() {
	if (!contactButton || !contactModal) return;
	
	modal({
		button: contactButton,
		container: contactModal,
	});
}