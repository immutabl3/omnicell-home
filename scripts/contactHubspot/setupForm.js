import $ from '../utils/querySelector';

const emailSalesModal = $('#emailSalesModal');

export default hbspt => {
	const portalId = $.attr(emailSalesModal, 'data-portalId');
	const formId = $.attr(emailSalesModal, 'data-formId');
	const sfdcCampaignId = $.attr(emailSalesModal, 'data-sfdcCampaignId');
	
	// create the hubspot form
	return new Promise(function(resolve) {
		const form = hbspt.forms.create({
			portalId,
			formId,
			sfdcCampaignId,
			onFormSubmit() {
				location.reload();
			} 	
		});

		form.onReady(() => resolve(form));
	});
};
