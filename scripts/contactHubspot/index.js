import once from 'lodash/once';
import loadHubspot from './loadHubspot';
import modal from '../overlay/modal';
import setupForm from './setupForm';
import queryForm from './queryForm';
import customizeForm from './customizeForm';

const emailSalesButton = document.querySelector('#emailSalesButton');
const emailSalesModal = document.querySelector('#emailSalesModal');

export default function() {
	if (!emailSalesButton || !emailSalesModal) return;

	const moveForm = function(form) {
		const [container] = emailSalesModal.children;
		container.appendChild(form.parentElement);
	};

	const init = function() {
		const path = emailSalesModal.getAttribute('data-hubspot');
		loadHubspot(path)
			.then(setupForm)
			.then(queryForm)
			.then(customizeForm)
			.then(moveForm);
	};

	modal({
		button: emailSalesButton,
		container: emailSalesModal,
		preActivate: once(init),
	});
};